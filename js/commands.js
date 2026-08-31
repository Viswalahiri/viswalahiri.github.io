import { escapeHtml } from './terminal.js';
import {
  CONFIG, CONTACT, ABOUT, EXPERIENCE, PROJECTS, PROJECTS_SNAPSHOT_DATE,
  GITHUB_USER, SKILLS, CERTS, EDUCATION,
} from './data.js';
import { fetchContributions, prUrl, repoUrl } from './github.js';
import { buildFS, VFS } from './fs.js';

const BANNER_ART = String.raw`
 __      _______ ______
 \ \    / /_   _|___  /
  \ \  / /  | |    / /
   \ \/ /   | |   / /
    \  /   _| |_ / /__
     \/   |_____/_____|
`;

// Contact / resume / book live in the persistent top bar, so the chips stay
// focused on content and the first screen stays uncluttered.
const CHIP_COMMANDS = ['about', 'experience', 'projects', 'skills', 'certs', 'contact'];

export function printBanner(term) {
  term.print(`<pre class="banner-art">${escapeHtml(BANNER_ART.replace(/^\n/, ''))}</pre>`);
  term.print(
    `<span class="bold">${escapeHtml(CONTACT.name)}</span> <span class="dim">— ${escapeHtml(CONTACT.title)} · ${escapeHtml(CONTACT.location)}</span>`
  );
  term.print('GPU &amp; TPU clusters · distributed training · high-throughput inference', 'dim');
  term.spacer();
  term.print(
    `<span class="accent">›</span> 5+ years shipping large-scale ML systems · led teams of 3–4`
  );
  term.print(
    `<span class="accent">›</span> ~$280k/mo inference cost removed · $4.2M pipeline surfaced · $6.7M at-risk revenue identified`
  );
  term.print(
    `<span class="accent">›</span> kubernetes-sigs contributor — ${term.cmdToken('projects', 'Kueue, JobSet, LWS')}`
  );
  term.spacer();
  term.print(
    `<span class="chips">${CHIP_COMMANDS.map(
      (c) => `<button class="chip" data-cmd="${c}">${c}</button>`
    ).join('')}</span>`
  );
  term.print(
    `<span class="dim">Type a command,</span> ${term.cmdToken('help')} <span class="dim">for all of them, or explore like a shell:</span> ${term.cmdToken('ls')}`
  );
  term.spacer();
}

// ---------- experience helpers ----------

function findRole(arg) {
  const q = arg.toLowerCase();
  const n = Number.parseInt(q, 10);
  if (!Number.isNaN(n) && n >= 1 && n <= EXPERIENCE.length) return EXPERIENCE[n - 1];
  return EXPERIENCE.find(
    (r) => r.key === q || r.aliases.includes(q) || r.company.toLowerCase().includes(q)
  );
}

function printRoleList(term) {
  term.print('<span class="section-title">Career journey</span> <span class="dim">(newest first)</span>');
  term.spacer();
  EXPERIENCE.forEach((r, i) => {
    const via = r.via ? ` <span class="dim">(${escapeHtml(r.via)})</span>` : '';
    term.print(
      `<span class="xp-row">${term.cmdToken(`experience ${i + 1}`, `[${i + 1}]`)} ` +
      `<span class="bold">${escapeHtml(r.company)}</span>${via}<br>` +
      `<span class="xp-sub">${escapeHtml(r.title)} · <span class="xp-dates">${escapeHtml(r.dates)}</span></span></span>`
    );
  });
  term.spacer();
  // Example uses the resolved current role's key so it is correct in both
  // stealth and revealed modes — never hardcode an employer name here.
  term.print(
    `<span class="dim">Drill in with</span> ${term.cmdToken('experience 1')} <span class="dim">or</span> ` +
    `${term.cmdToken(`experience ${EXPERIENCE[0].key}`)}<span class="dim">, etc.</span>`
  );
}

function printRole(term, role) {
  const i = EXPERIENCE.indexOf(role);
  const via = role.via ? ` <span class="dim">${escapeHtml(role.via)}</span>` : '';
  term.print(
    `<span class="section-title">${escapeHtml(role.company)}</span>${via} <span class="dim">· ${escapeHtml(role.location)}</span>`
  );
  term.print(`${escapeHtml(role.title)} · <span class="xp-dates">${escapeHtml(role.dates)}</span>`);
  if (role.confidential) {
    term.print(
      '<span class="confidential">[confidential]</span> <span class="dim">employer name withheld while this engagement is active — happy to share directly.</span>'
    );
  }
  term.spacer();
  term.print(escapeHtml(role.summary));
  term.spacer();
  for (const b of role.bullets) term.print(`<span class="accent">›</span> ${escapeHtml(b)}`, 'indent');
  term.spacer();
  const nav = [];
  if (i > 0) nav.push(term.cmdToken(`experience ${i}`, '↑ newer'));
  if (i < EXPERIENCE.length - 1) nav.push(term.cmdToken(`experience ${i + 2}`, '↓ older'));
  nav.push(term.cmdToken('experience', 'back to list'));
  term.print(`<span class="dim">${nav.join(' &nbsp;·&nbsp; ')}</span>`);
}

// ---------- projects helpers ----------

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

function findProject(arg) {
  const q = arg.toLowerCase();
  return PROJECTS.find(
    (p) => p.key === q || p.aliases.includes(q) || p.name.toLowerCase().includes(q)
  );
}

function prLine(project, pr, kind) {
  const glyph = kind === 'merged'
    ? '<span class="pr-merged">✔</span>'
    : '<span class="pr-open">●</span>';
  const when = kind === 'merged'
    ? `merged ${fmtDate(pr.date)}`
    : `updated ${fmtDate(pr.date)}`;
  return (
    `${glyph} <a href="${prUrl(project, pr.number)}" target="_blank" rel="noopener">#${pr.number}</a> ` +
    `${escapeHtml(pr.title)} <span class="dim">· ${when}</span>`
  );
}

function statsLine(term, project, r) {
  // A zero count renders dim rather than in its status color, so an empty
  // bucket doesn't read as a red flag next to real numbers.
  const cls = (n, on) => (n ? on : 'dim');
  return (
    `<span class="${cls(r.merged.length, 'pr-merged')}">✔ ${r.merged.length} merged</span> <span class="dim">·</span> ` +
    `<span class="${cls(r.open.length, 'pr-open')}">● ${r.open.length} in progress</span> ` +
    `&nbsp;<span class="dim">→</span> ${term.cmdToken(`projects ${project.key}`)}`
  );
}

async function printProjectsOverview(term) {
  term.print('<span class="section-title">Open source</span> <span class="dim">· active contributor to kubernetes-sigs</span>');
  term.spacer();
  const probe = term.print('querying api.github.com…', 'dim');
  const results = await Promise.all(PROJECTS.map((p) => fetchContributions(p)));
  probe.remove();

  PROJECTS.forEach((p, i) => {
    term.print(`${term.cmdToken(`projects ${p.key}`, p.name)} <span class="dim">— ${escapeHtml(p.tagline)}</span>`);
    term.print(statsLine(term, p, results[i]), 'indent');
    term.spacer();
  });

  term.print(`Full repo list: ${term.link(CONTACT.github)}`);
  if (results.some((r) => !r.live)) {
    term.print(
      `<span class="dim">GitHub API unreachable — showing a snapshot from ${fmtDate(PROJECTS_SNAPSHOT_DATE)}.</span>`
    );
  }
}

async function printProjectDetail(term, project) {
  term.print(
    `<span class="section-title">${escapeHtml(project.name)}</span> ` +
    `<span class="dim">· ${escapeHtml(`${project.org}/${project.repo}`)}</span>`
  );
  term.print(escapeHtml(project.blurb));
  term.spacer();
  term.print(`<span class="accent bold">My focus</span>&nbsp; ${escapeHtml(project.focus)}`);
  term.print(`<span class="accent bold">Repo</span>&nbsp;&nbsp;&nbsp;&nbsp; ${term.link(repoUrl(project), `github.com/${project.org}/${project.repo}`)}`);
  term.spacer();

  const probe = term.print('querying api.github.com…', 'dim');
  const r = await fetchContributions(project);
  probe.remove();

  term.print(`<span class="section-title">Merged</span> <span class="dim">(${r.merged.length})</span>`);
  if (r.merged.length) {
    for (const pr of r.merged) term.print(prLine(project, pr, 'merged'), 'indent');
  } else {
    term.print('nothing merged here yet — first one is in review ↓', 'indent dim');
  }
  term.spacer();

  term.print(`<span class="section-title">In progress</span> <span class="dim">(${r.open.length})</span>`);
  if (r.open.length) {
    for (const pr of r.open) term.print(prLine(project, pr, 'open'), 'indent');
  } else {
    term.print('nothing open right now', 'indent dim');
  }
  term.spacer();

  const allPRs = `${repoUrl(project)}/pulls?q=${encodeURIComponent(`is:pr author:${GITHUB_USER}`)}`;
  const nav = PROJECTS.filter((p) => p !== project)
    .map((p) => term.cmdToken(`projects ${p.key}`));
  nav.push(term.cmdToken('projects', 'back to list'));
  term.print(`${term.link(allPRs, 'view these PRs on GitHub')} <span class="dim">&nbsp;·&nbsp; ${nav.join(' &nbsp;·&nbsp; ')}</span>`);
  if (!r.live) {
    term.print(
      `<span class="dim">GitHub API unreachable — showing a snapshot from ${fmtDate(PROJECTS_SNAPSHOT_DATE)}.</span>`
    );
  }
}

// ---------- calendly ----------

let calendlyLoaded = false;

function openCalendly(url) {
  return new Promise((resolve, reject) => {
    if (calendlyLoaded) {
      window.Calendly.initPopupWidget({ url });
      resolve();
      return;
    }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.onload = () => {
      calendlyLoaded = true;
      window.Calendly.initPopupWidget({ url });
      resolve();
    };
    script.onerror = () => reject(new Error('failed to load Calendly'));
    document.head.appendChild(script);
  });
}

// ---------- nvidia-smi easter egg ----------

const NVIDIA_SMI = String.raw`
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 580.65.06        Driver Version: 580.65.06        CUDA Version: 13.0       |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|=========================================+======================+======================|
|   0  NVIDIA H100 80GB HBM3          On  | 00000000:1A:00.0 Off |                    0 |
| N/A  61C    P0             688W /  700W |  79642MiB /  81559MiB |     99%     Default |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   PID   Type   Process name                                        GPU Memory    |
|=======================================================================================|
|    0  1337     C    vllm serve viz/career-v5 --tensor-parallel-size 8    42318MiB     |
|    0  2020     C    torchrun --nnodes 64 pretrain_ambition.py            31337MiB     |
|    0  4242     C    python answer_recruiter_emails.py --batch-size 128    5987MiB     |
+---------------------------------------------------------------------------------------+
`;

// ---------- virtual filesystem rendering ----------

// `prefix` is the listed directory's ~-path, so tokens stay clickable even
// after the visitor cds elsewhere.
function lsEntries(term, dir, prefix) {
  return dir.children
    .map((c) =>
      c.type === 'dir'
        ? term.cmdToken(`cd ${prefix}/${c.name}`, `${c.name}/`, 'fs-dir')
        : term.cmdToken(`cat ${prefix}/${c.name}`, c.name, 'fs-file')
    )
    .join('&nbsp;&nbsp;');
}

// ---------- registration ----------

export function registerCommands(term) {
  const vfs = new VFS(buildFS());

  // Bare filenames/dirs run from the current directory: `google` inside
  // ~/experience opens that role; `experience` (the dir) cds into it — but
  // registered commands always win, so this only fires for unmatched words.
  term.unknownHandler = async (word) => {
    const r = vfs.resolve(word);
    if (!r) return false;
    if (r.node.type === 'dir') await term.exec(`cd ${word}`, { echo: false });
    else await term.exec(r.node.cmd, { echo: false });
    return true;
  };

  // Tab completion on the first word also offers the cwd's entries.
  term.extraCompletions = () => vfs.cwd().children.map((c) => c.name);

  term.register('help', {
    desc: 'list available commands',
    run: (_args, t) => {
      const visible = [...t.commands.entries()].filter(([, s]) => !s.hidden);
      const width = Math.max(...visible.map(([n]) => n.length)) + 3;
      t.print('<span class="section-title">Available commands</span>');
      t.spacer();
      for (const [name, spec] of visible) {
        const pad = '&nbsp;'.repeat(width - name.length);
        t.print(`  ${t.cmdToken(name)}${pad}<span class="dim">${escapeHtml(spec.desc)}</span>`);
      }
      t.spacer();
      t.print(
        `<span class="dim">This is a real filesystem — try</span> ${t.cmdToken('cd experience')} <span class="dim">then</span> ${t.cmdToken('ls')}<span class="dim">, or run a file by name.</span>`
      );
      t.print('<span class="dim">Tips: Tab completes, ↑/↓ recall history, Ctrl+L clears. A few commands are undocumented…</span>');
    },
  });

  term.register('about', {
    desc: 'who I am & current focus',
    run: (_args, t) => {
      for (const line of ABOUT) t.print(line ? escapeHtml(line) : '');
    },
  });

  term.register('experience', {
    desc: 'career journey — experience <n> for details',
    aliases: ['exp', 'work'],
    completeArgs: () => EXPERIENCE.map((r) => r.key),
    run: (args, t) => {
      if (!args.length) {
        printRoleList(t);
        return;
      }
      const role = findRole(args.join(' '));
      if (role) printRole(t, role);
      else {
        t.print(
          `<span class="error">no such role: ${escapeHtml(args.join(' '))}</span> — try ${t.cmdToken('experience')} for the list`
        );
      }
    },
  });

  term.register('projects', {
    desc: 'open-source work — projects <name> to dig in',
    aliases: ['oss', 'kueue', 'jobset', 'lws'],
    completeArgs: () => PROJECTS.map((p) => p.key),
    run: async (args, t, invokedAs) => {
      // `kueue`, `jobset`, `lws` work as direct commands too
      const direct = PROJECTS.find((p) => p.key === invokedAs);
      const query = direct ? direct.key : args.join(' ');
      if (!query) {
        await printProjectsOverview(t);
        return;
      }
      const project = findProject(query);
      if (project) await printProjectDetail(t, project);
      else {
        t.print(
          `<span class="error">no such project: ${escapeHtml(query)}</span> — try ` +
          PROJECTS.map((p) => t.cmdToken(`projects ${p.key}`)).join('<span class="dim">, </span>')
        );
      }
    },
  });

  term.register('skills', {
    desc: 'technical skills by category',
    run: (_args, t) => {
      t.print('<span class="section-title">Skills</span>');
      t.spacer();
      for (const group of SKILLS) {
        t.print(`<span class="accent bold">${escapeHtml(group.category)}</span>`);
        if (group.groups) {
          const pad = Math.max(...group.groups.map((g) => g.name.length)) + 2;
          for (const sub of group.groups) {
            t.print(
              `<span class="skill-sub">${escapeHtml(sub.name)}</span>` +
              '&nbsp;'.repeat(pad - sub.name.length) +
              escapeHtml(sub.items),
              'indent skill-row'
            );
          }
        } else {
          t.print(escapeHtml(group.items), 'indent');
        }
        t.spacer();
      }
    },
  });

  term.register('certs', {
    desc: 'certifications & awards',
    aliases: ['awards', 'certifications'],
    run: (_args, t) => {
      t.print('<span class="section-title">Certifications</span>');
      for (const c of CERTS.certifications) t.print(`<span class="accent">›</span> ${escapeHtml(c)}`, 'indent');
      t.spacer();
      t.print('<span class="section-title">Awards</span>');
      for (const a of CERTS.awards) t.print(`<span class="accent">›</span> ${escapeHtml(a)}`, 'indent');
    },
  });

  term.register('education', {
    desc: 'where I studied',
    aliases: ['edu'],
    run: (_args, t) => {
      t.print(
        `<span class="bold">${escapeHtml(EDUCATION.school)}</span> <span class="dim">· ${escapeHtml(EDUCATION.location)}</span>`
      );
      t.print(`${escapeHtml(EDUCATION.degree)} · <span class="dim">${escapeHtml(EDUCATION.years)}</span>`);
    },
  });

  term.register('contact', {
    desc: 'how to reach me',
    aliases: ['email'],
    run: (_args, t) => {
      const row = (label, value) =>
        t.print(
          `<span class="contact-key">${escapeHtml(label)}</span>${'&nbsp;'.repeat(10 - label.length)}${value}`
        );
      t.print('<span class="section-title">Contact</span>');
      t.spacer();
      row('email', `<a href="mailto:${CONTACT.email}">${escapeHtml(CONTACT.email)}</a>`);
      row('phone', `<a href="${CONTACT.phoneHref}">${escapeHtml(CONTACT.phone)}</a>`);
      row('linkedin', t.link(CONTACT.linkedin, CONTACT.linkedin.replace('https://', '')));
      row('github', t.link(CONTACT.github, CONTACT.github.replace('https://', '')));
      row('location', `${escapeHtml(CONTACT.location)} <span class="dim">· ${escapeHtml(CONTACT.citizenship)}</span>`);
      t.spacer();
      t.print(`<span class="dim">Or grab 30 minutes on my calendar:</span> ${t.cmdToken('book')}`);
    },
  });

  term.register('resume', {
    desc: 'view / download my resume (PDF)',
    aliases: ['cv'],
    run: async (_args, t) => {
      let available = true;
      try {
        const res = await fetch(CONFIG.RESUME_PATH, { method: 'HEAD' });
        available = res.ok;
      } catch {
        available = false;
      }
      if (available) {
        t.print(
          `<span class="accent">›</span> <a href="${CONFIG.RESUME_PATH}" target="_blank" rel="noopener">open resume</a>` +
          ` &nbsp;·&nbsp; <a href="${CONFIG.RESUME_PATH}" download>download PDF</a>`
        );
      } else {
        t.print(
          `<span class="dim">Resume upload in flight (rsync at 99%…). Meanwhile:</span> ` +
          `<a href="mailto:${CONTACT.email}?subject=Resume%20request">email me</a> <span class="dim">and I'll send it over.</span>`
        );
      }
    },
  });

  term.register('book', {
    desc: 'book time with me',
    aliases: ['schedule', 'meet'],
    run: async (_args, t) => {
      if (!CONFIG.CALENDLY_URL) {
        t.print(
          `<span class="dim">Booking is warming up (cold start). Meanwhile, the fastest path is email:</span> ` +
          `<a href="mailto:${CONTACT.email}?subject=Let's%20chat">${CONTACT.email}</a>`
        );
        return;
      }
      t.print('Opening the calendar…', 'dim');
      try {
        await openCalendly(CONFIG.CALENDLY_URL);
      } catch {
        t.print(
          `<span class="error">Couldn't load the scheduler.</span> Book directly at ${t.link(CONFIG.CALENDLY_URL)} ` +
          `or email <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.`
        );
      }
    },
  });

  term.register('ls', {
    desc: 'list directory contents',
    aliases: ['ll', 'dir'],
    completeArgs: () => vfs.cwd().children.map((c) => c.name),
    run: (args, t) => {
      const target = args.find((a) => !a.startsWith('-'));
      let node = vfs.cwd();
      let prefix = vfs.path();
      if (target) {
        const r = vfs.resolve(target);
        if (!r) {
          t.print(`ls: cannot access '${escapeHtml(target)}': No such file or directory`, 'error');
          return;
        }
        node = r.node;
        prefix = ['~', ...r.dirStack.map((n) => n.name)].join('/');
      }
      if (node.type === 'file') t.print(t.cmdToken(`cat ${prefix}/${node.name}`, node.name, 'fs-file'));
      else t.print(lsEntries(t, node, prefix));
    },
  });

  term.register('cd', {
    desc: 'change directory — try cd experience',
    completeArgs: () =>
      vfs.cwd().children.filter((c) => c.type === 'dir').map((c) => c.name).concat('..', '~'),
    run: (args, t) => {
      const err = vfs.cd(args[0] ?? '');
      if (err) {
        t.print(escapeHtml(err), 'error');
        return;
      }
      t.setPrompt(`visitor@viz:${vfs.path()}$`);
      const here = vfs.cwd();
      if (here.children?.length) t.print(lsEntries(t, here, vfs.path()));
    },
  });

  term.register('cat', {
    desc: 'print a file — try cat skills.md',
    completeArgs: () => vfs.cwd().children.filter((c) => c.type === 'file').map((c) => c.name),
    run: async (args, t) => {
      const target = args.find((a) => !a.startsWith('-'));
      if (!target) {
        t.print(`usage: cat &lt;file&gt; — try ${t.cmdToken('ls')} first`, 'dim');
        return;
      }
      const r = vfs.resolve(target);
      if (!r) {
        t.print(`cat: ${escapeHtml(target)}: No such file or directory`, 'error');
        return;
      }
      if (r.node.type === 'dir') {
        t.print(`cat: ${escapeHtml(target)}: Is a directory — try ${t.cmdToken(`cd ${r.node.name}`)}`);
        return;
      }
      if (r.node.name.endsWith('.pdf')) {
        t.print(`cat: ${escapeHtml(r.node.name)}: binary file — try ${t.cmdToken('resume')} instead`);
        return;
      }
      await t.exec(r.node.cmd, { echo: false });
    },
  });

  term.register('clear', {
    desc: 'clear the terminal (Ctrl+L)',
    aliases: ['cls'],
    run: (_args, t) => t.clear(),
  });

  // ---------- hidden / easter eggs ----------

  term.register('sudo', {
    hidden: true,
    run: (args, t) => {
      if (args.join(' ').includes('rm -rf')) {
        t.print('Absolutely not. This cluster has uptime to protect.', 'error');
      } else {
        t.print('visitor is not in the sudoers file. This incident will be reported.');
      }
    },
  });

  term.register('nvidia-smi', {
    hidden: true,
    run: (_args, t) => t.print(`<pre>${escapeHtml(NVIDIA_SMI.trim())}</pre>`),
  });

  term.register('vim', {
    hidden: true,
    aliases: ['nano', 'emacs', 'vi'],
    run: (_args, t) => {
      t.print(`You're already inside a terminal you can't exit. ${t.cmdToken('help')} is your :q`);
    },
  });

  term.register('whoami', {
    hidden: true,
    run: (_args, t) => t.print('visitor <span class="dim">— but the interesting one here is</span> <span class="cmd" data-cmd="about">viz</span>'),
  });

  term.register('exit', {
    hidden: true,
    aliases: ['logout', 'quit'],
    run: async (_args, t) => {
      t.print('logout');
      t.print('Connection to viz closed.', 'dim');
      await new Promise((r) => setTimeout(r, 900));
      t.print('…just kidding. You can check out any time you like, but you can never leave.', 'dim');
      t.spacer();
      printBanner(t);
    },
  });

  term.register('history', {
    hidden: true,
    run: (_args, t) => {
      t.history.slice(0, -1).forEach((h, i) => t.print(`&nbsp;&nbsp;${i + 1}&nbsp;&nbsp;${escapeHtml(h)}`));
    },
  });

  term.register('echo', {
    hidden: true,
    run: (args, t) => t.print(escapeHtml(args.join(' '))),
  });

  term.register('pwd', {
    hidden: true,
    run: (_args, t) => t.print(escapeHtml(vfs.sysPath())),
  });

  term.register('hello', {
    hidden: true,
    aliases: ['hi', 'hey'],
    run: (_args, t) => t.print(`Hey there! 👋 Type ${t.cmdToken('help')} to look around.`),
  });
}
