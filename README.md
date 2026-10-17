# Dr. Muhammad Zohaib Jan — Executive Leadership Portfolio

Public website for Dr. Muhammad Zohaib Jan, Senior Manager / AI Architect at EY Australia. The page features public engineering projects, research and enterprise leadership experience.

The site is a responsive, accessible static experience hosted through GitHub Pages.

## Ask Dr. Zohaib

The site includes a privacy-conscious public knowledge assistant. It runs entirely in the browser, uses only curated public information and requires no API key or paid service. It deliberately refuses requests for private, confidential or NDA-protected details.

## Files and local preview

- `index.html`: portfolio content and accessible page structure.
- `styles.css`: layout and visual styling.
- `script.js`: browser interactions and the curated public-information assistant.
- `robots.txt` and `sitemap.xml`: crawler guidance.

From the repository root, run `python -m http.server 8000` and open `http://localhost:8000`. The site uses static files and needs no package install or backend credentials.

## Editing

Update professional claims in the page and the assistant's curated knowledge together. Test the mobile layout, navigation and keyboard interaction after editing. The assistant matches curated information locally; it is not an external LLM service or a source of private work history. GitHub Pages build/deployment is managed by the repository's Pages configuration.

## Public project provenance

Jetson Edge Vision and FieldWise RAG are newly recreated reference implementations. Project cards link their source, tests and validation limits. They contain no employer/client source or inherited deployment metrics. Broader product case studies link to https://beyondhuman.dev/.

When editing `script.js` or `styles.css`, also change the asset version query in `index.html` so visitors receive refreshed assets. Keep the GitHub Pages build/deployment enabled; it publishes this site.
