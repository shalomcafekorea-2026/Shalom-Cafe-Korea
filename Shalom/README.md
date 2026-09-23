# Shalom Café Korea — Website

A single-page restaurant site (React + TypeScript + Vite + Tailwind CSS v4) for Shalom Café Korea in Goa, Camarines Sur.

## What's in this update

Your original project was already well-built (nice animations, serif/sans type pairing, warm color palette). The main problem was that the Hero, About, and Gallery sections pointed at image files that didn't exist, so those areas were showing broken images. This pass:

- **Fixed all broken images** — cropped real dish photography out of your menu PDFs (`Shalom.zip` menu pages) for the hero banner, About section, and a 6-photo gallery, saved as optimized JPEGs in `public/images/site/`.
- **Added a proper favicon** (cropped from your logo) and an Open Graph / social-share image, so links shared on Messenger/Facebook show a real preview card instead of nothing.
- **Added SEO basics**: meta description, Open Graph/Twitter tags, and `Restaurant` structured data (schema.org) so Google can show your address, phone, and cuisine type directly in search results.
- **Fixed the Google Maps embed** — it was pointing at generic placeholder coordinates; it now embeds a live search for your actual address, no API key required.
- **Added hover captions** to the gallery photos.
- **Moved the raw scanned menu-PDF pages** (39 MB of PNGs) out of `public/` into `menu-source/` at the project root, since the site already has an interactive menu — this keeps the deployed site light and fast. They're kept in the repo in case you want them later (e.g. a downloadable PDF menu); delete the folder if you don't need it.

Everything else (menu data, copy, layout, animations) is untouched — this was mostly a "make it actually work, and make it fast + shareable" pass, not a redesign.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy: GitHub → Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Shalom Cafe Korea site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Import into Vercel**
   - Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
   - Vercel auto-detects Vite. Defaults are correct:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click **Deploy**. You'll get a live `*.vercel.app` URL in about a minute.
   - Add a custom domain later under **Project → Settings → Domains** if you have one.

3. **Every future `git push` to `main` auto-deploys** — Vercel builds a preview for every branch/PR and promotes `main` to production automatically.

## Editing content

Everything editable lives near the top of `src/App.tsx`, clearly labeled:
- `menuCategories` — your menu items, prices, descriptions
- `galleryImages` — the 6 gallery photos
- `reviews`, `faqs` — testimonials and FAQ
- `PHONE`, `FB_URL`, `ADDRESS` — contact details

## Optional: Supabase

You mentioned Supabase — the site doesn't need a database to work as-is (it's fully static). It becomes useful if you want to add something dynamic, e.g.:
- A **contact / reservation form** that saves inquiries to a table (instead of just `tel:`/Facebook links)
- **Live specials or announcements** editable without redeploying
- **Real review submissions** instead of the hardcoded list

If you want one of these, let me know which and I'll wire it up (Supabase client + a table + a simple form) — happy to do that next.
