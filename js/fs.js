// Virtual filesystem mirroring the site's commands, so the terminal can be
// explored like a real shell: cd experience, ls, cat skills.md, etc.
// Every file maps to an existing command (node.cmd) — the FS is a navigation
// layer, not a second content store.

import { EXPERIENCE, PROJECTS } from './data.js';

const stripExt = (name) => name.replace(/\.[a-z0-9]+$/i, '');

export function buildFS() {
  return {
    name: '~',
    type: 'dir',
    children: [
      { name: 'about.txt', type: 'file', cmd: 'about' },
      {
        name: 'experience',
        type: 'dir',
        children: EXPERIENCE.map((r) => ({
          name: `${r.key}.md`,
          type: 'file',
          cmd: `experience ${r.key}`,
        })),
      },
      {
        name: 'projects',
        type: 'dir',
        children: PROJECTS.map((p) => ({
          name: `${p.key}.md`,
          type: 'file',
          cmd: `projects ${p.key}`,
        })),
      },
      { name: 'skills.md', type: 'file', cmd: 'skills' },
      { name: 'certs.txt', type: 'file', cmd: 'certs' },
      { name: 'education.txt', type: 'file', cmd: 'education' },
      { name: 'contact.vcf', type: 'file', cmd: 'contact' },
      { name: 'resume.pdf', type: 'file', cmd: 'resume' },
    ],
  };
}

export class VFS {
  constructor(root) {
    this.root = root;
    this.stack = []; // dirs below root, innermost last
  }

  cwd() {
    return this.stack[this.stack.length - 1] ?? this.root;
  }

  path() {
    return ['~', ...this.stack.map((n) => n.name)].join('/');
  }

  sysPath() {
    return `/home/viz${this.stack.map((n) => `/${n.name}`).join('')}`;
  }

  // Resolve a path string relative to cwd (or absolute via ~, /, /home/viz).
  // Segment matching is case-insensitive and the file extension is optional.
  // Returns { node, dirStack } or null.
  resolve(input) {
    const trimmed = String(input).trim();
    const segs = trimmed.split('/').filter(Boolean);
    let stack;
    if (/^[~/]/.test(trimmed)) {
      stack = [];
      if (segs[0] === '~') segs.shift();
      else {
        if (segs[0] === 'home') segs.shift();
        if (segs[0] === 'viz') segs.shift();
      }
    } else {
      stack = [...this.stack];
    }

    let file = null;
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      if (seg === '.') continue;
      if (seg === '..') {
        stack.pop();
        continue;
      }
      const dir = stack[stack.length - 1] ?? this.root;
      const q = seg.toLowerCase();
      const child =
        dir.children.find((c) => c.name.toLowerCase() === q) ??
        dir.children.find((c) => stripExt(c.name).toLowerCase() === q);
      if (!child) return null;
      if (child.type === 'dir') {
        stack.push(child);
      } else {
        if (i !== segs.length - 1) return null; // file mid-path
        file = child;
      }
    }
    return { node: file ?? stack[stack.length - 1] ?? this.root, dirStack: stack };
  }

  // Returns an error string, or null on success.
  cd(input) {
    if (!input || input === '~') {
      this.stack = [];
      return null;
    }
    const r = this.resolve(input);
    if (!r) return `cd: ${input}: No such file or directory`;
    if (r.node.type !== 'dir') return `cd: ${input}: Not a directory`;
    this.stack = r.dirStack;
    return null;
  }
}
