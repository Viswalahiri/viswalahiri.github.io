// Terminal emulator core: prompt rendering, history, tab completion, output.

export function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export class Terminal {
  constructor() {
    this.output = document.getElementById('output');
    this.input = document.getElementById('cmd-input');
    this.preCaret = document.getElementById('pre-caret');
    this.caret = document.getElementById('caret');
    this.postCaret = document.getElementById('post-caret');
    this.terminalEl = document.getElementById('terminal');
    this.promptEl = document.querySelector('#input-line .prompt');
    this.promptText = 'visitor@viz:~$';
    this.unknownHandler = null;   // async (word, args) => handled?
    this.extraCompletions = null; // () => extra first-token candidates

    this.commands = new Map();   // name -> {desc, hidden, run, completeArgs?}
    this.aliases = new Map();    // alias -> name
    this.history = [];
    this.historyIndex = -1;
    this.draft = '';

    // Start visually unfocused; the input's focus event lifts this.
    this.terminalEl.classList.add('blurred');
    this.#wireEvents();
  }

  register(name, spec) {
    this.commands.set(name, spec);
    for (const a of spec.aliases ?? []) this.aliases.set(a, name);
  }

  // ---- output ----

  print(html = '', cls = '') {
    const el = document.createElement('div');
    el.className = `line ${cls}`.trim();
    if (html === '') el.innerHTML = '&nbsp;';
    else el.innerHTML = html;
    this.output.appendChild(el);
    return el;
  }

  spacer() { this.print('<span></span>', 'spacer'); }

  clear() { this.output.innerHTML = ''; }

  scrollToBottom() {
    document.getElementById('input-line').scrollIntoView({ block: 'end' });
  }

  // Render a clickable command token.
  cmdToken(cmd, label = cmd, cls = '') {
    const classes = cls ? `cmd ${cls}` : 'cmd';
    return `<span class="${classes}" role="button" tabindex="0" data-cmd="${escapeHtml(cmd)}">${escapeHtml(label)}</span>`;
  }

  setPrompt(text) {
    this.promptText = text;
    if (this.promptEl) this.promptEl.textContent = text;
  }

  link(href, label = href) {
    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
  }

  // ---- execution ----

  async exec(raw, { echo = true } = {}) {
    const text = raw.trim();
    if (echo) {
      this.print(
        `<span class="prompt">${escapeHtml(this.promptText)}</span>${escapeHtml(raw)}`,
        'echo'
      );
    }
    if (text) {
      if (this.history[this.history.length - 1] !== text) this.history.push(text);
      this.historyIndex = this.history.length;

      const [word, ...args] = text.split(/\s+/);
      const name = this.aliases.get(word.toLowerCase()) ?? word.toLowerCase();
      const spec = this.commands.get(name);
      if (spec) {
        await spec.run(args, this, word.toLowerCase());
      } else if (this.unknownHandler && (await this.unknownHandler(word, args))) {
        // handled as a filesystem entry
      } else {
        this.print(
          `<span class="error">command not found: ${escapeHtml(word)}</span> — type ${this.cmdToken('help')} for a list of commands`
        );
      }
    }
    this.scrollToBottom();
  }

  // ---- input handling ----

  #wireEvents() {
    this.input.addEventListener('keydown', (e) => this.#onKeyDown(e));
    for (const ev of ['input', 'keyup', 'click', 'select']) {
      this.input.addEventListener(ev, () => this.#syncDisplay());
    }
    this.input.addEventListener('focus', () => this.terminalEl.classList.remove('blurred'));
    this.input.addEventListener('blur', () => this.terminalEl.classList.add('blurred'));

    // Click/tap anywhere in the terminal focuses the input,
    // unless the user is selecting text or clicking a link/button.
    this.terminalEl.addEventListener('click', (e) => {
      if (e.target.closest('a, button, [data-cmd]')) return;
      if (String(window.getSelection())) return;
      this.focus();
    });

    // Delegate clicks (and Enter/Space) on clickable command tokens.
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-cmd]');
      if (t) this.exec(t.dataset.cmd);
    });
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('[data-cmd]')) {
        e.preventDefault();
        this.exec(e.target.dataset.cmd);
      }
    });
  }

  #onKeyDown(e) {
    if (e.key === 'Enter') {
      const value = this.input.value;
      this.input.value = '';
      this.#syncDisplay();
      this.exec(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.#historyStep(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.#historyStep(1);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.#complete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.clear();
    } else if (e.key === 'c' && e.ctrlKey && !String(window.getSelection())) {
      // shell-style ^C: abandon the current line
      this.print(
        `<span class="prompt">${escapeHtml(this.promptText)}</span>${escapeHtml(this.input.value)}^C`,
        'echo'
      );
      this.input.value = '';
      this.#syncDisplay();
      this.scrollToBottom();
    }
  }

  #historyStep(dir) {
    if (!this.history.length) return;
    if (this.historyIndex === this.history.length) this.draft = this.input.value;
    const next = this.historyIndex + dir;
    if (next < 0 || next > this.history.length) return;
    this.historyIndex = next;
    this.input.value =
      next === this.history.length ? this.draft : this.history[next];
    this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    this.#syncDisplay();
  }

  #complete() {
    const value = this.input.value;
    const parts = value.split(/\s+/);
    let candidates = [];
    let stem = '';

    if (parts.length <= 1) {
      stem = (parts[0] ?? '').toLowerCase();
      candidates = [...this.commands.entries()]
        .filter(([name, spec]) => !spec.hidden && name.startsWith(stem))
        .map(([name]) => name);
      if (this.extraCompletions) {
        candidates.push(
          ...this.extraCompletions().filter((n) => n.toLowerCase().startsWith(stem))
        );
      }
    } else {
      const name = this.aliases.get(parts[0].toLowerCase()) ?? parts[0].toLowerCase();
      const spec = this.commands.get(name);
      if (!spec?.completeArgs) return;
      stem = parts[parts.length - 1].toLowerCase();
      candidates = spec.completeArgs().filter((c) => c.startsWith(stem));
    }

    candidates = [...new Set(candidates)];
    if (!candidates.length) return;
    if (candidates.length === 1) {
      parts[parts.length - 1] = candidates[0];
      this.input.value = parts.join(' ') + ' ';
    } else {
      // extend to the longest common prefix, then list options
      let prefix = candidates[0];
      for (const c of candidates) {
        while (!c.startsWith(prefix)) prefix = prefix.slice(0, -1);
      }
      if (prefix.length > stem.length) {
        parts[parts.length - 1] = prefix;
        this.input.value = parts.join(' ');
      } else {
        this.print(candidates.map((c) => escapeHtml(c)).join('&nbsp;&nbsp;'), 'dim');
        this.scrollToBottom();
      }
    }
    this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    this.#syncDisplay();
  }

  #syncDisplay() {
    const v = this.input.value;
    const pos = this.input.selectionStart ?? v.length;
    this.preCaret.textContent = v.slice(0, pos);
    const under = v.charAt(pos);
    this.caret.innerHTML = under ? escapeHtml(under) : '&nbsp;';
    this.postCaret.textContent = under ? v.slice(pos + 1) : v.slice(pos);
  }

  focus() {
    this.input.focus({ preventScroll: true });
  }
}
