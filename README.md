<p align="center">
    <a href="https://typesetter.io"><img src=".github/assets/logo.png" alt="Typesetter"></a>
    <br>
    <br>
    <a href="https://typesetter.io">typesetter.io</a>
</p>
<br>
<br>
<p align="center">
    <img src="https://github.com/TypesetterIO/typesetter.io/actions/workflows/pages.yml/badge.svg" alt="status">
</p>

The source for [typesetter.io](https://typesetter.io).

## Requirements

[Vite+](https://viteplus.dev) (`vp`).

## Development

```sh
vp install      # install dependencies
vp dev          # dev server with live reload, prints its URL
vp check --fix  # format and lint
vp build        # production build in dist/
vp preview      # serve dist/
```

## Adding a page

List the new HTML file in `build.rolldownOptions.input` in `vite.config.js`. Tailwind CSS 4 finds the classes in it without configuration.

## Deployment

Every push to any branch runs `vp check`, builds the site, and deploys it to GitHub Pages through `.github/workflows/pages.yml`. A formatting or lint failure stops the deploy.
