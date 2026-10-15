# Saughat by Bajo — website

Static site (HTML/CSS/JS, no build step). Design language: NEXUS Output Registry (cream `#FFF9E9`, coral `#FF795F`, sage `#D7DFAE`, deep green `#173F2C`, Georgia + Avenir Next, 5px rhythm, pill buttons).

## Structure
```
index.html   css/styles.css   js/main.js   assets/img/   .github/workflows/pages.yml
```

## Publish on GitHub Pages
1. Create a repo (e.g. `saughat-by-bajo`) and push this folder to `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Push again. Site goes live at `https://<username>.github.io/saughat-by-bajo/`.

Custom domain: add a `CNAME` file containing your domain, then set DNS.

## Edit
- WhatsApp number: `WA` in `js/main.js`.
- Colours/spacing: `:root` in `css/styles.css`.
- Only publish claims you can document (see brand brief): no "organic", lab-test or certification claims without proof.
