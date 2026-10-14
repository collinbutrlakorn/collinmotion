# CollinMotion

The home for Collin Butrlakorn's creative work: short films, photography and shorts.

Plain HTML, CSS and JavaScript. No build step. Hosted on GitHub Pages.

## Logo

`assets/logo/cb-original.png` is the original. `cb-sun.png` (yellow face, ink shadow) is the one the site uses; `cb-paper.png` is a pale version for dark backgrounds.

## Adding work

Everything on the site comes from `assets/js/content.js`. Add a film, a photo series or a short there, drop any images into `media/`, commit, and push. Instructions are at the top of that file.

## Previewing locally

```
python3 -m http.server 8000
```

then open http://localhost:8000.

## Domain

`CNAME` makes GitHub Pages serve the site at collinmotion.com. At the registrar, point the domain at GitHub:

- four `A` records on `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- a `CNAME` record on `www` pointing to `collinbutrlakorn.github.io`

Then in the repo under Settings, Pages, turn on Enforce HTTPS once it's available.
