# Shalom Café Korea — Website

A React + Vite + Tailwind CSS site for Shalom Café Korea (Goa, Camarines Sur), with an
interactive menu, a real-photo gallery of the printed menu, and an optional
"Send us a message" form backed by Supabase.

## What's in here

- `src/App.tsx` — the entire site (one file, organized into clearly labeled
  sections: Navbar, Hero, About, Menu, Gallery, Reviews, FAQ, Contact, Footer).
  Menu items, prices, reviews, FAQs and contact details are all plain data
  arrays near the top of the file — edit those directly, no need to touch the
  markup.
- `public/img/` — optimized WebP/PNG images (cropped and compressed from the
  original menu photos). Each menu category shows its real printed menu page
  as a tappable photo (opens in a lightbox) right next to the interactive
  item list.
- `src/lib/supabase.ts` — a small Supabase client used only by the contact
  form. If you don't set up Supabase, the form still renders; submitting it
  just tells the visitor to call/message you directly instead of crashing.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Deploying with GitHub + Vercel

1. Push this folder to a new GitHub repository.
2. In Vercel: **Add New Project** → import that repo. Vercel auto-detects
   Vite; the defaults (`npm run build`, output directory `dist`) work as-is.
3. If you're using the contact form, add the two Supabase environment
   variables (below) under **Project Settings → Environment Variables**
   before your first deploy, then redeploy.
4. Every push to your main branch will auto-deploy.

## Setting up the contact form with Supabase (optional)

The "Send Us a Message" form on the Contact section writes rows into a
Supabase table. If you skip this section entirely, the rest of the site
works fine — the form will just show a friendly note asking people to call
or message you on Facebook instead.

**1. Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is enough).

**2. Create the table.** In the Supabase dashboard, open the SQL Editor and run:

```sql
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  message text not null
);

-- Enable Row Level Security
alter table public.messages enable row level security;

-- Allow anyone (using the public anon key) to submit a message,
-- but NOT read, update, or delete existing messages.
create policy "Anyone can submit a message"
  on public.messages
  for insert
  to anon
  with check (true);
```

You'll read your messages from the Supabase **Table Editor** (or connect a
tool like a Slack/email webhook via Supabase Database Webhooks if you want
notifications — optional, not set up here).

**3. Get your API credentials.** In Supabase: **Project Settings → API** —
copy the **Project URL** and the **anon public** key (not the service role
key; never put that in frontend code).

**4. Add them as environment variables:**

- **Local development:** copy `.env.example` to `.env` and fill in the two
  values.
- **Vercel:** Project Settings → Environment Variables → add
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the same values, for
  the Production (and Preview, if you want) environment. Redeploy after
  adding them.

That's it — the form will start saving submissions to your `messages` table.

## Editing content

Everything editable lives near the top of `src/App.tsx`:

| What | Where |
|---|---|
| Menu items & prices | `menuCategories` array |
| Menu category photos | `images` field inside each category in `menuCategories` |
| Gallery photos | `galleryImages` array |
| Customer reviews | `reviews` array |
| FAQ | `faqs` array |
| Phone / delivery number / Facebook / address | the constants just below the FAQ data (`PHONE`, `DELIVERY_PHONE`, `FB_URL`, `ADDRESS`) |

To swap an image, drop the new file into `public/img/` and update the
matching `src` path. Keep new photos reasonably compressed (WebP or
optimized JPEG, ideally under ~300KB each) so the site stays fast on mobile
data.

## Notes

- The Google Maps embed in the Contact section is centered on Goa, Camarines
  Sur generally — for an exact pin, open Google Maps, search your address,
  click **Share → Embed a map**, and swap in that `src` URL.
- Lucide icon set, Tailwind v4 (via `@tailwindcss/vite`, no separate config
  file needed), and TypeScript are all pre-wired — no additional setup
  required beyond `npm install`.
