# iPhone Duo — cinematic 3D product experience

A responsive, static-exportable Next.js concept landing page using React Three Fiber, Three.js, GSAP ScrollTrigger and Tailwind CSS.

## Requirements
- Node.js 20.9+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
# iPhone Duo Showcase

A GSAP-powered website showcasing the iPhone Duo concept.

Live demo:
https://clever-zuccutto-bbd33b.netlify.app

## Production build
```bash
npm run build
```
The site is configured with `output: "export"` and exports static files to `out/`, suitable for static hosting such as Vercel, Netlify, Cloudflare Pages or GitHub Pages (configure the base path if deploying under a subpath).

## Project structure
- `app/` — Next.js App Router, metadata and global styling
- `components/Experience.tsx` — product storytelling, navigation, scroll-triggered reveals
- `components/PhoneScene.tsx` — procedural 3D phone models rendered with React Three Fiber

## Notes
- No backend is required.
- The phones are procedural concept models built from Three.js geometry, not official Apple assets or photorealistic CAD models. Replace them with licensed, optimized `.glb` models for a more realistic production result.
- Feature values are illustrative concept copy. Review and replace before presenting as factual product specifications.
- For best performance, use compressed GLB models and KTX2 textures, keep mobile device pixel ratio capped, and preserve the reduced-motion accommodation.
- `mailto:hello@example.com` is a placeholder contact address.
# iphone-duo
# iphone-duo
