# Ecstasy Technologies Social Studio: Playbook

This is the operating manual for the scheduled social-media Routines. Read it in full before doing anything.

## Accounts
- **TikTok:** @dominic.software_dev (Dominic.dev), the founder's account. Social GPT account_id is shown by `get_publish_options`. Higgsfield TikTok connector `83cbd201-4c45-4da0-869a-7e3c14b2568e` is used only for photo posts, which need a widget, so they can't be published from Claude Code.
- **Instagram:** @ecstasytechnologies, via Social GPT `publish_post(platform="instagram")`.

## Schedule (Africa/Accra, GMT)
- **Sunday 17:00:** the weekly batch Routine generates 7 posts for Mon–Sun and asks Dominic to approve them.
- **Daily 19:00:** the posting Routine publishes that day's **approved** item.
- Mix: **even split** between photo carousels and videos (4 of one, 3 of the other, alternating week to week).

## Hard rules
1. **Consent:** never publish anything Dominic has not explicitly approved for that specific item. Approval is recorded in the queue file (`approved: true`). For TikTok direct posts, `privacy_level` must be the one Dominic chose. His standing choice is `PUBLIC_TO_EVERYONE`, but use whatever the queue file records.
2. **Honesty:** only use real projects from `data/projects.json` on `origin/main` and live captures of those real sites. No invented stats, quotes, testimonials, client results or reviews. Never scroll into or crop in a client's own testimonial section. Fictional illustrative stories (e.g. "Ama's shop") must be clearly generic and must not be attributed to a real client.
3. **Branding:** always write the full name **"Ecstasy Technologies"** (never "Ecstasy" alone). Contact: **WhatsApp +233 54 285 5399** (it is a WhatsApp number; "WhatsApp us" + "Call us"). Website: **www.ecstasytechnologies.com**.
4. **Style:** **carousels use a white background** (Apple-like: Inter font, #1D1D1F ink, #86868B muted, dark phone frames, soft shadows, accent colour matched to the featured client). Videos may be dark (see `video/scene4.html`) or white (see `video/scene.html`).
5. **Disclosure:** mark TikTok posts as commercial content → "Your brand" (`brand_organic_toggle: true`). `is_aigc: false` (code-rendered graphics + real screenshots).
6. **Carousels are separate photos, never a slideshow video.**
7. Dominic is camera-shy: no talking-head content. Photos of him are fine (see `carousel/assets/dom-*.jpg`); new photos only if he sends them.

## Content formats
| Format | Type | How |
|---|---|---|
| "Rate this website 1–10" | carousel (6 slides) | `carousel/rate.html` (+ `rrate.js`). Swap the client's mobile crops into `assets/`. |
| "Meet the developer" / project showcase | carousel (5 slides) | `carousel/slides.html` (+ `rslides.js`). |
| "POV: it's 2 AM and your business is still open" | video 9:16 | adapt `video/scene4.html` (dark, story) |
| Pain → fix ("Get found / organised / booked") | video 9:16 | `video/scene3.html` |
| Full-service ("We build websites / software / apps") | video 9:16 | `video/scene.html` |
| Chat ("Done.") | video 9:16 | `video/scene2.html` |
| Before/after, tips, October-style offers | carousel or video | build from the templates above |

Vary the featured client every post. Real clients with good live sites include Kings Towers Hotel, Persis Luxury Beauty World, Gusty Women Foundation, Thrive Edu, Solani Construction (desktop only: its mobile site was erroring on 2026-10-08), Michelle Mayers Skincare & Spa, Jokran Hotel, Mankind Foundation Ghana, Bubbly Kids Academy, Clems Akinaabi and Cassvo (App Store screenshots). Check each site is up with a fresh capture before featuring it.

## Pipeline
- **Captures:** `carousel/mcap.js` (mobile, 390px @2x) and `video/capture.js` (desktop). Chromium: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Playwright: `require('/opt/node22/lib/node_modules/playwright')`.
- **Render carousel:** `node rrate.js` / `node rslides.js` → PNG → convert to JPEG (TikTok rejects PNG). TikTok 1080×1920, Instagram 1080×1350.
- **Render video:** `node render.js v full <scene>` (frames), then `CFG=… python3 music*.py`, `python3 synth.py`, mix with ffmpeg (music volume ~0.28–0.4 under SFX), encode H.264 + AAC, 9:16 1080×1920. Always render contact sheets (`node render.js v sheet <scene>`) and look at them before the full render.
- **Hosting for publishing:** commit media to branch `claude/social-media-posting-routines-5ss432` under `social-media/<slug>/` and use `https://cdn.jsdelivr.net/gh/PlnDominic/Ecstasy-Technologies@<short-sha>/social-media/<slug>/<file>` (raw.githubusercontent serves the wrong content-type; Social GPT rejects it). Never commit to `main` for this.

## Weekly batch (Sunday 17:00)
1. `git fetch origin main claude/social-media-posting-routines-5ss432`; work on the branch; read `data/projects.json` from `origin/main`.
2. Pull the last week's performance with Social GPT (`list_videos sort=recent`, `get_growth_summary`) and note what worked.
3. Plan 7 posts (Mon–Sun) with an even carousel/video mix and a different client each day. Write captions: hook line, 1–2 lines of honest detail, a question CTA, WhatsApp + website, and 4–5 targeted hashtags (#GhanaTech #WebDesignGhana #AccraBusiness #KumasiBusiness #EcstasyTechnologies, etc.).
4. Render everything, review the contact sheets, and fix anything off.
5. Commit the media + `queue/<YYYY>-W<ww>.json` (format below) with every item `approved: false`; push.
6. Send Dominic the previews (SendUserFile) and a short list (day, format, client, caption hook). Ask him to reply e.g. "approve all" or "approve 1,3,5; change 2: …".
7. On his reply, apply changes, set `approved: true` on the approved items (record `privacy_level` if he states one, else `PUBLIC_TO_EVERYONE` as his standing choice), commit and push.

## Daily post (19:00)
1. Fetch the branch; open the current week's queue file; find today's item.
2. If it is missing or `approved` isn't true: post nothing and send a short notification.
3. **Video:** `get_publish_options` (fresh token), then `publish_post` on TikTok (direct, the recorded privacy_level, brand_organic_toggle true, is_aigc false) and on Instagram (reel, share_to_feed true), using the jsDelivr URL. `user_expressly_consented`/`user_previewed_content` = true only because the queue file records his approval of this exact item. Poll `get_publish_status`; record the URLs in the queue file (`posted`), commit, push.
4. **Carousel:** can't be auto-published from Claude Code. Send Dominic the TikTok + Instagram JPEGs and the caption (SendUserFile, status proactive) with "ready to post"; mark `notified` in the queue.
5. Finish with a one-line summary.

## Queue file format (`queue/2026-W42.json`)
```json
{
  "week": "2026-W42",
  "items": [
    {
      "day": "2026-10-12",
      "slug": "w42-mon-rate-kings",
      "format": "carousel",
      "client": "Kings Towers Hotel",
      "files": { "tiktok": ["social-media/w42-mon-rate-kings/tt-1.jpg"], "instagram": ["social-media/w42-mon-rate-kings/ig-1.jpg"] },
      "caption": "…",
      "approved": false,
      "privacy_level": "PUBLIC_TO_EVERYONE",
      "status": "pending",
      "posted": {}
    }
  ]
}
```
