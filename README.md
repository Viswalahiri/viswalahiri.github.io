# viswalahiri.github.io

Terminal-style portfolio for Viz Hejeebu, served by GitHub Pages at
[viswalahiri.github.io](https://viswalahiri.github.io). Vanilla HTML/CSS/JS —
no build step; push to `main` and Pages deploys it.

## Editing content

All content lives in **`js/data.js`** (bio, experience, projects, skills,
certs, contact). Edit that file only for content updates.

## One-time setup

- **Resume** — drop the PDF at `assets/Viswalahiri_Hejeebu_Resume.pdf`
  (exact name). The `resume` command finds it automatically.
- **Booking** — create a Calendly account, add an event type (e.g.
  "Intro chat — 30 min"), connect Google Calendar, then paste the event link
  into `CALENDLY_URL` in `js/data.js`. Until then, `book` falls back to email.

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
js/data.js        ALL content + config
js/main.js        boot
```
