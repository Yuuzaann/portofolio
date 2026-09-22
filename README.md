# Arya Permadi — Portfolio

A static, single-page developer portfolio. No build step, no framework — plain HTML/CSS/JS, deployed as-is to GitHub Pages.

## Structure

```
/
├── index.html          # page markup (semantic, data attributes bind content)
├── css/styles.css       # design system: tokens, layout, components, dark mode
├── js/data.js            # all editable content lives here
├── js/main.js            # renders data.js into the DOM + interactivity
├── assets/                 # optimized images (webp) and icons
├── CNAME                    # custom domain for GitHub Pages — do not remove
├── robots.txt
└── sitemap.xml
```

## Updating content

You do not need to touch `index.html` to add or change a project, skill, or achievement.
Everything lives in **`js/data.js`** as plain JavaScript objects:

- `profile` — name, role, tagline, summary, photos
- `focus` — the "how I work" rows in About
- `skills` — grouped by category
- `projects` — add an object to the array; set `featured: true` for the larger card treatment
- `achievements` — certificates
- `social` — icon links (`icon` must match a key in `ICONS` inside `js/main.js`: `github`, `instagram`, `x`, `tiktok`)
- `contact.formAction` — the Formspree endpoint

Save the file and refresh — no build step required.

## Why no Tailwind build

The original repo shipped `input.css`/`output.css` but no `tailwind.config.js` or `package.json`,
so the build wasn't reproducible by anyone who cloned it. This version replaces the Tailwind
build with a single hand-written `css/styles.css` using CSS custom properties — same result,
one less moving part, nothing to install to preview or edit the site.

## Images

Source images were re-exported as compressed WebP (originals were up to 1.3 MB each; the whole
`assets/` folder is now under 300 KB). If you add a new project screenshot, keep it under ~150 KB
and prefer WebP.

## Deployment

Nothing changes about deployment — this is still a static site served by GitHub Pages using the
existing `CNAME`. Push to the branch GitHub Pages is configured to serve from.
