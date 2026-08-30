// Live GitHub contribution data for the `projects` command.
// One search-API request per repo, cached in sessionStorage; falls back to
// the baked snapshot in data.js when the API is unreachable or rate-limited.

import { GITHUB_USER } from './data.js';

const CACHE_TTL_MS = 10 * 60 * 1000;

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function cacheSet(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable — live fetch still works, just uncached */
  }
}

// Returns { merged: [{number,title,date}], open: [...], live: boolean }.
// Closed-but-unmerged PRs are omitted.
export async function fetchContributions(project) {
  const cacheKey = `prs:${project.org}/${project.repo}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { ...cached, live: true };

  try {
    const q = encodeURIComponent(
      `repo:${project.org}/${project.repo} type:pr author:${GITHUB_USER}`
    );
    const res = await fetch(
      `https://api.github.com/search/issues?q=${q}&per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();

    const merged = [];
    const open = [];
    for (const item of body.items ?? []) {
      const mergedAt = item.pull_request?.merged_at;
      const pr = {
        number: item.number,
        title: item.title,
        date: (mergedAt ?? item.updated_at ?? '').slice(0, 10),
      };
      if (mergedAt) merged.push(pr);
      else if (item.state === 'open') open.push(pr);
    }
    merged.sort((a, b) => b.date.localeCompare(a.date));

    const data = { merged, open };
    cacheSet(cacheKey, data);
    return { ...data, live: true };
  } catch {
    return { ...project.fallback, live: false };
  }
}

export function prUrl(project, number) {
  return `https://github.com/${project.org}/${project.repo}/pull/${number}`;
}

export function repoUrl(project) {
  return `https://github.com/${project.org}/${project.repo}`;
}
