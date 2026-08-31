# viswalahiri.github.io

Terminal-style portfolio for Viz Hejeebu, served by GitHub Pages at
[viswalahiri.github.io](https://viswalahiri.github.io). Vanilla HTML/CSS/JS —
no build step; push to `main` and Pages deploys it.

## Editing content

All content lives in **`js/data.js`** (bio, experience, projects, skills,
certs, contact). Edit that file only for content updates.

## One-time setup

- **Resume** — *(pending)* drop the PDF at
  `assets/Viswalahiri_Hejeebu_Resume.pdf` (exact name) and push. The `resume`
  command detects it automatically; until then it shows an email fallback.
- **Booking** — done. `CALENDLY_URL` in `js/data.js` points at
  `calendly.com/lahiri-coffee-chat/30min` and opens in a modal over the
  terminal.

## Stealth mode

`STEALTH_MODE` in `js/data.js` controls whether the current role names its
employer. While it is `true`, the site shows an unnamed AI lab, marked
`[confidential]`, across the experience command, `about`, the virtual
filesystem path, tab completion, and the resume link.

**Switching modes:** set `STEALTH_MODE = false` and push. That is the only
edit required, and it can be made from anywhere, including GitHub's web
editor. Set it back to `true` to hide the employer again.

Because this repo is public, the identity used when revealing is stored
base64-encoded rather than plaintext. That is obfuscation, not encryption:
it keeps the name out of search engines, GitHub code search, scrapers, and a
casual read of the source, but it will not stop anyone who deliberately
decodes it. To regenerate the blob (e.g. after a job change):

```sh
python3 -c "import base64,json;print(base64.b64encode(json.dumps({'key':'acme','aliases':['partner'],'company':'Acme','via':'via Partner Co','location':'City, ST'},separators=(',',':')).encode()).decode())"
```

Paste the result into `CURRENT_ROLE_ENCODED` in `js/data.js`. For zero trace
instead, set that constant to an empty string and type the real values in only
when you reveal — the site stays stealthy whenever no company name resolves.

Two things the flag cannot reach: the `<noscript>` block in `index.html`
(static markup, deliberately names no current employer) and git history.

While stealth is on, the `resume` command serves
`assets/Viswalahiri_Hejeebu_Resume_Confidential.pdf` (a redacted PDF), so a
resume naming the employer is never served by a site that is hiding it. If
that file is absent, `resume` falls back to email rather than exposing the
real PDF.

## Security note

`index.html` ships a Content-Security-Policy meta tag. If you ever edit the
inline JSON-LD block in `index.html`, recompute its hash and update the
`sha256-…` value in the CSP:

```sh
python3 -c "import hashlib,base64,re;s=open('index.html').read();print('sha256-'+base64.b64encode(hashlib.sha256(re.search(r'<script type=\"application/ld\+json\">(.*?)</script>',s,16).group(1).encode()).digest()).decode())"
```

New external domains (scripts, frames, APIs) must also be added to the CSP.

## Local development

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

(A server is needed because the site uses ES modules; opening `index.html`
directly via `file://` won't work.)

## Layout

```
index.html        page shell, SEO meta, noscript fallback
css/style.css     theme, CRT flourish, responsive rules
js/terminal.js    terminal emulator (input, history, tab completion)
js/commands.js    command registry incl. easter eggs
js/fs.js          virtual filesystem (cd/ls/cat navigation layer)
js/github.js      live PR data for `projects` (cache + snapshot fallback)
js/data.js        ALL content + config
js/main.js        boot
```

The virtual filesystem in `js/fs.js` is generated from `js/data.js`
(experience roles and projects become files), so it stays in sync with
content edits automatically.
