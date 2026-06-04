# Open Graph Image Guide - Fix Link Preview

## 🖼️ The Problem

When you share your website link on:
- WhatsApp
- Facebook
- LinkedIn  
- Twitter
- Slack
- Discord

**It should show:**
```
┌─────────────────────────────────┐
│  [Preview Image]                │
│                                 │
│  Ecstasy Technologies   │
│  Leading software development...│
│  ecstasy-geospatial.vercel.app │
└─────────────────────────────────┘
```

**But currently shows:** Just a link, no image ❌

**Why:** The `og-image.png` file is missing!

---

## ✅ The Solution (3 Options)

---

## OPTION 1: Quick Fix - Use Existing Screenshot (5 minutes)

### Step 1: Take a Screenshot
1. Open your website: https://ecstasy-geospatial.vercel.app
2. Make browser window 1200px wide (right size for OG image)
3. Take a screenshot of the hero section
4. Crop to exactly **1200 x 630 pixels**

### Step 2: Save as og-image.png
```
Save to: /public/og-image.png
Format: PNG
Size: 1200 x 630 pixels
File size: Under 1MB
```

### Step 3: Deploy
```bash
git add public/og-image.png
git commit -m "Add Open Graph image for link previews"
git push
```

**Done! ✅ This will work immediately.**

---

## OPTION 2: Create Professional OG Image with Canva (15 minutes)

### Step 1: Go to Canva
1. Visit: https://www.canva.com
2. Sign up (free account is fine)
3. Search for: "Facebook Post" or "Open Graph" template
4. Or use custom size: 1200 x 630 px

### Step 2: Design Your OG Image

**Recommended Layout:**

```
┌─────────────────────────────────────────────┐
│                                             │
│         Ecstasy Technologies         │
│     Leading Software Development Company    │
│                 in Ghana                    │
│                                             │
│  Web Apps • Mobile Apps • Enterprise Software
│                                             │
│        ecstasy-geospatial.vercel.app        │
│                                             │
└─────────────────────────────────────────────┘
```

**Design Guidelines:**
```
✅ Dark background (matches your site)
✅ White or bright text (high contrast)
✅ Your logo (if you have one)
✅ Main headline: Company name
✅ Subheadline: What you do
✅ Location: "Ghana"
✅ Services: Key offerings
✅ Website URL
✅ Professional look
✅ Not too much text
```

**Colors to Use:**
```
Background: Dark (#000000 or #0a0a0a)
Primary text: White (#ffffff)
Accent: Purple/Blue gradient (your brand colors)
```

**Fonts:**
```
Headline: Bold, modern (Inter, Montserrat, Poppins)
Body: Clean, readable (Inter, Roboto)
Size: Large enough to read on mobile
```

### Step 3: Download
1. Click "Share" → "Download"
2. Format: PNG
3. Size: Custom 1200 x 630 px
4. Quality: High
5. Save as: `og-image.png`

### Step 4: Save to Project
```
Copy to: /public/og-image.png
```

### Step 5: Deploy
```bash
git add public/og-image.png
git commit -m "Add professional Open Graph image"
git push
```

---

## OPTION 3: Use Online OG Image Generator (10 minutes)

### Recommended Free Tools:

1. **OG Image Playground**
   - URL: https://og-playground.vercel.app/
   - Create custom OG images with code
   - Export as PNG

2. **Social Image Generator**
   - URL: https://www.bannerbear.com/demos/og-image-generator/
   - Fill in text
   - Download image

3. **Cloudinary OG Image Generator**
   - URL: https://og-image-gen.vercel.app/
   - Simple form
   - Generate and download

### Example: Using OG Image Playground

1. Visit: https://og-playground.vercel.app/
2. Enter text:
   ```
   Title: Ecstasy Technologies
   Subtitle: Leading Software Development Company in Ghana
   Description: Custom Web Apps, Mobile Apps & Enterprise Software
   ```
3. Choose template
4. Download as PNG (1200x630)
5. Save to `/public/og-image.png`

---

## 🎨 OG Image Best Practices

### Size & Format
```
✅ Size: 1200 x 630 pixels (required)
✅ Aspect ratio: 1.91:1
✅ Format: PNG or JPG
✅ File size: Under 1MB (ideally under 300KB)
✅ Resolution: 72 DPI is fine for web
```

### Content
```
✅ Show company name prominently
✅ Include what you do
✅ Add location (Ghana)
✅ Keep text large and readable
✅ Use high contrast colors
✅ Don't overcrowd with information
✅ Test on mobile (text should be readable)
```

### Design
```
✅ Professional look
✅ Match brand colors
✅ Use your logo if you have one
✅ Simple, clean layout
✅ Not too much text (15 words max)
✅ Readable from thumbnail size
```

### What to Avoid
```
❌ Text too small
❌ Too much information
❌ Low contrast (hard to read)
❌ Blurry images
❌ Copyrighted images
❌ Wrong dimensions
❌ File size too large
```

---

## 📱 Testing Your OG Image

### After deploying, test on these platforms:

### 1. Facebook Debugger (Best for testing)
```
URL: https://developers.facebook.com/tools/debug/

Steps:
1. Paste your URL
2. Click "Debug"
3. See preview
4. Click "Scrape Again" if needed

Expected result:
✅ Image shows (1200x630)
✅ Title appears
✅ Description appears
✅ No warnings
```

### 2. Twitter Card Validator
```
URL: https://cards-dev.twitter.com/validator

Steps:
1. Paste your URL
2. Click "Preview card"
3. See how it looks on Twitter

Expected result:
✅ Large image card
✅ Title and description
```

### 3. LinkedIn Post Inspector
```
URL: https://www.linkedin.com/post-inspector/

Steps:
1. Paste your URL
2. Click "Inspect"
3. See preview

Expected result:
✅ Image displays
✅ Correct metadata
```

### 4. Real-World Testing

**WhatsApp:**
```
1. Open WhatsApp Web or app
2. Start a chat (can be to yourself)
3. Paste your URL
4. Wait 2-3 seconds
5. Should see image preview ✅
```

**Slack:**
```
1. Open Slack
2. Paste URL in any channel
3. Should see preview ✅
```

**iMessage / SMS:**
```
1. Open Messages
2. Paste URL
3. Should see preview (iOS only) ✅
```

---

## 🐛 Troubleshooting

### Issue: Image Not Showing After Deploy

**Cause:** Cached old version

**Solution 1: Clear Cache on Platforms**
```
Facebook:
1. Go to Facebook Debugger
2. Paste URL
3. Click "Scrape Again"
4. Clears Facebook's cache

LinkedIn:
1. Add ?v=2 to URL
   Example: yoursite.com?v=2
2. Share the URL with version parameter
3. Or use LinkedIn Post Inspector

Twitter:
Do nothing, Twitter updates quickly
```

**Solution 2: Add Version Parameter**
```typescript
// In layout.tsx, add:
images: [
  {
    url: '/og-image.png?v=1', // Add version
    width: 1200,
    height: 630,
    alt: '...'
  }
]

// Increment v=2, v=3 each time you update image
```

---

### Issue: Image Shows But Looks Bad

**Problem:** Wrong size

**Solution:**
```
1. Check image is exactly 1200 x 630 px
2. Re-export at correct size
3. Replace og-image.png
4. Clear cache on platforms
```

---

### Issue: Image Not Loading

**Problem:** File not deployed or wrong path

**Solution:**
```
1. Check file exists:
   /public/og-image.png

2. Check it's deployed:
   Visit: https://yoursite.com/og-image.png
   Should show the image

3. Check browser console for errors

4. Verify path in layout.tsx:
   url: '/og-image.png' (correct)
   NOT url: 'og-image.png' (wrong)
```

---

## 🎯 Recommended Quick Template

If you want something simple and professional right now, use this text layout:

```
═══════════════════════════════════════════════
                                               
        Ecstasy Technologies           
                                               
     Leading Software Development Company      
                 in Ghana                      
                                               
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       
                                               
    • Custom Web Applications                  
    • Mobile App Development                   
    • Enterprise Software Solutions            
                                               
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       
                                               
      ecstasy-geospatial.vercel.app           
                                               
═══════════════════════════════════════════════
```

**Design this in Canva with:**
- Dark gradient background (black to dark blue)
- White text
- Purple/blue accents
- Your logo (if available)
- Professional font

---

## 📋 Complete Checklist

### Creating the Image
- [ ] Choose creation method (Screenshot, Canva, or Generator)
- [ ] Create image at exactly 1200 x 630 pixels
- [ ] Include: Company name, tagline, services, location
- [ ] Use high contrast colors
- [ ] Keep text large and readable
- [ ] Export as PNG under 1MB
- [ ] Save as `og-image.png`

### Adding to Project
- [ ] Place file in `/public/og-image.png`
- [ ] Verify path is correct
- [ ] Commit and push to deploy
- [ ] Wait for Vercel deployment (1-2 min)

### Testing
- [ ] Visit: https://yoursite.com/og-image.png (should show image)
- [ ] Test in Facebook Debugger
- [ ] Test in Twitter Card Validator
- [ ] Test in LinkedIn Inspector
- [ ] Test by sharing on WhatsApp
- [ ] Test on Slack
- [ ] All showing correctly ✅

### Optimization
- [ ] Image looks good on mobile
- [ ] Text is readable at small size
- [ ] File size under 300KB
- [ ] No warnings in validators
- [ ] Matches brand identity

---

## 🎨 Design Inspiration

### Good OG Image Examples:

**Tech Companies:**
```
Style: Dark background, bold text, minimal
Example: Vercel, Next.js, Tailwind CSS

What works:
✅ Simple and clean
✅ Clear value proposition
✅ Readable text
✅ Professional look
```

**Service Companies:**
```
Style: Show services, location, contact
Example: Local businesses, agencies

What works:
✅ Clear what you do
✅ Where you're located
✅ How to contact
```

**For Your Company:**
```
Style: Tech-focused, Ghana proud, professional

Include:
✅ Company name (large)
✅ "Leading Software Development Company in Ghana"
✅ Key services (3-4 max)
✅ Website URL
✅ Optional: Your logo
✅ Optional: "Est. 2023"
```

---

## 💡 Pro Tips

### 1. Keep It Simple
```
Don't try to show everything
3-4 key pieces of information max
Large, readable text
Plenty of white/negative space
```

### 2. Mobile-First
```
Most people will see this on mobile
Make sure text is readable at small size
Test on your phone
```

### 3. Update Regularly
```
Update OG image when:
- Rebrand
- Major service changes
- Achievements (e.g., "50+ Projects")
- Awards or certifications
```

### 4. A/B Test
```
Try different designs
See which gets more clicks
Social media analytics can show this
```

### 5. Consistency
```
Use same style across:
- OG image
- Social media posts
- Website design
This builds brand recognition
```

---

## 🚀 Quick Start (Right Now)

### Absolute Fastest Method (5 minutes):

1. **Screenshot your homepage**
   ```
   1. Open: https://ecstasy-geospatial.vercel.app
   2. Screenshot the hero section
   3. Crop to 1200 x 630 px
   ```

2. **Or use project image**
   ```
   Use one of your existing project images:
   /public/Lavimac royal hotel website.png
   /public/Dynamic Shipping and Logistics.png
   
   Resize to 1200 x 630 px
   ```

3. **Save and deploy**
   ```bash
   # Save as /public/og-image.png
   git add public/og-image.png
   git commit -m "Add Open Graph preview image"
   git push
   ```

4. **Wait 2 minutes for deployment**

5. **Test**
   ```
   Paste link on WhatsApp
   Should now show image! ✅
   ```

---

## 📝 Code Already in Place

Your `layout.tsx` already has OG configuration:

```typescript
openGraph: {
  type: 'website',
  locale: 'en_GH',
  url: 'https://ecstasygeospatial.com',
  siteName: 'Ecstasy Technologies',
  title: 'Best Software Development Company in Ghana',
  description: '...',
  images: [
    {
      url: '/og-image.png',  // ← Just need to add this file!
      width: 1200,
      height: 630,
      alt: 'Ecstasy Technologies - Best Software Development Company in Ghana',
    },
  ],
},
twitter: {
  card: 'summary_large_image',
  title: '...',
  description: '...',
  images: ['/og-image.png'],  // ← Same file
},
```

**All you need:** Add the image file!

---

## ✅ Summary

**Problem:** Link previews not showing image

**Cause:** Missing `/public/og-image.png`

**Solution:** 
1. Create image (1200 x 630 px)
2. Save as `/public/og-image.png`
3. Deploy

**Time:** 5-15 minutes depending on method

**Result:** Beautiful link previews everywhere! 🎉

---

**Choose your method and create it now!** 

**Recommended:** Start with screenshot method (5 min), then create professional version later in Canva.

🎨 **Need help with design?** I can guide you through Canva step-by-step!
