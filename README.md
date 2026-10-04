# W-A Mobile Mechanic

Premium static website for W-A Mobile Mechanic. Vanilla HTML/CSS/JS, no build step.

## Brand facts used
Source: supplied business flyer.
- Business: W-A Mobile Mechanic
- Tagline: “We Come To You!”
- Phone: 281-300-2809
- Diagnostic fee: $70
- Services: diagnostics/check engine, brakes (pads & rotors), oil changes, tune ups, radiators & cooling systems, fuel system repairs, transmission service, suspension & steering, batteries, exhaust repairs.
- Missing from supplied material and intentionally left as placeholders: owner name, email, website/domain, exact service area, hours.

## Gallery
Put real work photos in `/gallery/` and name them `photo-1.jpg` through `photo-8.jpg`.
The three supplied work photos are already included as `photo-1.jpg` to `photo-3.jpg`, with black screenshot bars cropped away.
To add/remove photos, edit `GALLERY_IMAGES` at the top of `assets/js/main.js`.

## Hero image
The current hero uses `assets/images/hero-work.jpg`, generated from the supplied real work photography rather than AI or unrelated stock.
If you prefer an Unsplash hero, download a verified photo from Unsplash and save it at that exact path.

## Phone, email, form
- Phone appears in `index.html` as `281-300-2809` / `+12813002809`.
- Email is not present in the supplied flyer. Replace `[EMAIL]` in `assets/js/main.js` if using mailto fallback.
- Set `FORM_ENDPOINT` at the top of `assets/js/main.js` to your Formspree-compatible endpoint.
- Replace `[SERVICE AREA]`, `[PLACEHOLDER]`, `[YOUR-DOMAIN]` only after the business confirms those details.

## Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <my repo URL>
git push -u origin main
```

Then in Vercel:
1. Add New Project → Import the GitHub repo.
2. Framework Preset: **Other**.
3. No build command. No output directory; deploy the repository root.
4. Deploy.
5. Add custom domain in Vercel → Settings → Domains.
6. Update canonical URL, Open Graph URL, `sitemap.xml`, and JSON-LD with the real domain.
7. Every future push to `main` auto-deploys.
