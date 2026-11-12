# Ecstasy Technologies Social Studio: Playbook

This is the operating manual for the scheduled social-media Routines. Read it in full before doing anything.

## Accounts
- **TikTok:** @dominic.software_dev (Dominic.dev), the founder's account. Social GPT account_id is shown by `get_publish_options`. Higgsfield TikTok connector `83cbd201-4c45-4da0-869a-7e3c14b2568e` is used only for photo posts, which need a widget, so they can't be published from Claude Code.
- **Instagram:** @ecstasytechnologies, via Social GPT `publish_post(platform="instagram")`.

## Schedule (Africa/Accra, GMT)
- **Sunday 17:00:** the weekly batch Routine generates 7 fresh posts for Mon–Sun and pushes them unapproved.
- **Monday 08:12:** a scheduled task in Dominic's main session shows him the week and records his approval.
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

## Content strategy (research, Nov 2026)
Learned from the top posts of web-design and tech creators (@thesethhoffman, @tiffintech, @cowebsitedesigner, @buildingwithmikayla, @notionhq, @flux.academy) and from our own best posts.

**What worked for them:**
- **Bold "you won't like this" claim, then a fix in steps.** Seth's Squarespace SEO tutorial got 37K views and 198 shares. Show the steps on screen.
- **Relatable fail or funny moment.** Seth's 22-second "AI fail" got 32K views and 627 shares (8.9% engagement). Funny and relatable clips get shared the most.
- **Huge-contrast fact hook plus "share this with someone".** Tiff in Tech's quantum video got 671K views. Only use facts that have a source.
- **A series with a comment keyword.** For example "Day 3 of redesigning…" plus "Comment REDESIGN". These get the most comments, but the views were small for that creator.
- **Customer story in two parts.** Notion's coffee-roaster feature got about 30K views per part.

**What worked for us:**
- The biggest reach (5.9K views) came from a real person talking in **Twi** with a local creator tag (Kwaku September).
- The highest engagement (16–21%) came from **personal posts and photos of Dominic**.
- Our animated showcase videos have had low engagement (about 1%).

**Rules from now on:**
1. Rotate formats every week and never use the same one twice in a row. The formats are: tutorial-in-steps (`scene9`), relatable humour or chat (`scene10`), Rate-this-website (`scene7`), mistakes list (`scene8`), client story or showcase (`scene3`/5/6), and a personal or behind-the-scenes photo carousel of Dominic.
2. The hook is in the first second, as text on screen. No logo intro. Open with a bold claim, a question, or something people relate to.
3. One CTA per post, and rotate it: "Comment WEBSITE", "Tag someone who needs this", "Save this", or "WhatsApp +233 54 285 5399".
4. Every week, at least one post has a human in it: photos of Dominic, or the influencer partner. When possible, add a Twi version or Twi captions for local reach (Dominic writes or approves any Twi; never machine-translate).
5. Keep captions short, put the hook in the first line, and use 3–5 hashtags.
6. No made-up stats. Any number needs a real source.

## Buying psychology (standing rule, Dominic, Nov 2026)
Every video and post must use what motivates people to buy. Plan each piece against this list before building it. All of it must stay honest: no invented stats, quotes, scarcity or results.

1. **Pattern interrupt + open loop (0 to 2s).** Open with a question or a frustration the viewer feels ("Still taking orders in DMs?", "Hard to buy? You lose the sale."). Close the loop at the end (Zeigarnik effect).
2. **Loss aversion.** Show what a business loses when it has no site or a hard-to-use one (a lost order, a customer who leaves). Frame it as a question or a scenario, never a made-up number.
3. **Problem, then solution, then outcome.** Name the problem first, show the real fix on a real live site, end on the benefit for the customer ("customers find, add and pay"), not a feature list.
4. **Specific and concrete.** Real features, real names, real prices shown on the client's own site. Specific beats vague.
5. **Authority and proof.** Show real client sites we built and say "built by Ecstasy Technologies". Use real social proof only (real clients, real live links). Never invent testimonials, counts or ratings.
6. **Ease and low friction.** One call to action only, and make it feel easy: "One message is all it takes." The action is WhatsApp +233 54 285 5399.
7. **Contrast.** Before and after, hard versus easy, DMs versus a website.
8. **Rule of three.** Three steps, three benefits (find, add, pay; browse, turn, order).
9. **"You" language and benefits.** Talk to the business owner ("your customers", "your orders"), and turn features into benefits.
10. **Peak and end.** Make the strongest moment the last one: brand name spoken clearly, contact on screen, one CTA.
11. **Distinctiveness (Von Restorff).** One bold colour or element per video that stands out.
12. **Scarcity, urgency, discounts and prices of our own services:** only if Dominic confirms they are real. Ask him first. Never fabricate.
13. **Reciprocity.** Give a useful tip in the video (what to put on a site), not just a pitch.

Checklist before sending previews: hook is a question or frustration, one loss or contrast moment, a real proof visual, one CTA that feels easy, the brand name spoken slowly and clearly, nothing invented.

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
3. **Fresh content only.** List every `slug` and `social-media/` folder used in all existing `queue/*.json` files and every client featured in the last 3 weeks' queue files. Never reuse an earlier slug or media folder, and never re-queue an old item. Pick clients not featured in the last 3 weeks (cycle through all real clients in `data/projects.json` with a live site before repeating one), and vary the format and hook too. Slugs and folders use this week's prefix (`w<ww>-<day>-<format>-<client>`).
4. Plan 7 posts (Mon–Sun) with an even carousel/video mix and a different client each day. Write captions: hook line, 1–2 lines of honest detail, a question CTA, WhatsApp + website, and 4–5 targeted hashtags (#GhanaTech #WebDesignGhana #AccraBusiness #KumasiBusiness #EcstasyTechnologies, etc.).
5. Take fresh captures, render everything new, review the contact sheets, and fix anything off. This takes real time; do not skip it. If an item can't be rendered (site down, capture fails), pick a different client or leave that day empty. Never fall back to old media.
6. Commit the new media + `queue/<YYYY>-W<ww>.json` (format below) with every item `approved: false`; push.
7. Send Dominic the previews (SendUserFile) and a short numbered list (day, format, client, caption hook) for reference. **Do not wait for his reply in the batch session.** Approval happens in Dominic's main Claude session every Monday morning, where a scheduled task shows him the week and records his answer. End the batch session once pushed.

## Monday approval (in Dominic's main session, 08:12)
1. Fetch the branch and open the current ISO week's queue file.
2. Send Dominic one contact-sheet image of the week (first slide or a frame of each item) and a numbered list: day, format, client, caption hook.
3. Ask him to reply "approve all" or e.g. "approve 1,3,5; change 2: ...". Never treat silence or a scheduled message as approval.
4. On his reply, apply changes, set `approved: true` on the approved items (`privacy_level` as he states, else `PUBLIC_TO_EVERYONE`, his standing choice), commit and push.

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
