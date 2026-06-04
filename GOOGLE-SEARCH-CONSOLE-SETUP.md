# Google Search Console Setup Guide

## 🚨 Issue Identified

Your website is currently experiencing indexing issues because of a **domain mismatch**:

- **Your canonical URL**: `https://ecstasy-geospatial.vercel.app` (no www)
- **What you submitted**: `https://www.ecstasy-geospatial.vercel.app` (with www)
- **Result**: Google sees a redirect and won't index the page

---

## ✅ Solution

You need to use the **non-www** version in Google Search Console.

### Step 1: Add Correct Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Select **"URL prefix"** (not Domain)
4. Enter: `https://ecstasy-geospatial.vercel.app` (NO www)
5. Click "Continue"

### Step 2: Verify Ownership

Choose one of these verification methods:

#### Option A: HTML File Upload (Already Done)
- You already have `/public/google52c115b81962557c.html`
- This should work automatically once you add the correct property

#### Option B: HTML Tag (Already Done)
- Verification meta tag is already in your layout.tsx:
  ```html
  <meta name="google-site-verification" content="dOJwZHiE4_O_v9dR4A28VuQ55KBM1rVwrfXQ91Q7dQw" />
  ```

### Step 3: Submit Sitemap

After verification:
1. In Google Search Console, go to "Sitemaps" (left sidebar)
2. Enter: `sitemap.xml` (just the filename, NOT the full URL)
3. Click "Submit"

**DO NOT use:**
- ❌ `https://www.ecstasy-geospatial.vercel.app/sitemap.xml`
- ❌ `https://ecstasy-geospatial.vercel.app/sitemap.xml`

**Use only:**
- ✅ `sitemap.xml`

Google Search Console will automatically prepend your verified domain.

---

## 🔍 Understanding www vs non-www

Your website is configured to use the **non-www** version as the canonical URL. This means:

### What happens now:
- ✅ `https://ecstasy-geospatial.vercel.app` → Main site (canonical)
- 🔄 `https://www.ecstasy-geospatial.vercel.app` → Redirects to non-www

### This is GOOD because:
1. **Consistency**: All URLs point to one canonical version
2. **SEO**: Prevents duplicate content issues
3. **Link equity**: All backlinks consolidate to one domain
4. **Standard practice**: Most Vercel sites use non-www

---

## 📋 Current Configuration

### Your Base URL Settings:

**In Code:**
```typescript
// src/app/layout.tsx
metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ecstasy-geospatial.vercel.app')
```

**In Environment:**
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=https://ecstasy-geospatial.vercel.app
```

**In Sitemap:**
```typescript
// src/app/sitemap.ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecstasy-geospatial.vercel.app'
```

**In Robots.txt:**
```
Sitemap: https://ecstasy-geospatial.vercel.app/sitemap.xml
```

---

## 🎯 Do You Want to Use www Instead?

If you prefer to use **www.ecstasy-geospatial.vercel.app** as your primary domain:

### Option 1: Change in Vercel Dashboard (Recommended)
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" → "Domains"
4. Set `www.ecstasy-geospatial.vercel.app` as primary
5. Configure `ecstasy-geospatial.vercel.app` to redirect to www

### Option 2: Update Code (If using custom domain)
1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_BASE_URL=https://www.ecstasy-geospatial.vercel.app
   ```
2. Rebuild and redeploy
3. Update Google Search Console with www version

---

## 🚀 Recommended Next Steps

### Immediate Actions:

1. **[ ] Add correct property in Google Search Console**
   - Use: `https://ecstasy-geospatial.vercel.app` (no www)
   - Verification should be automatic

2. **[ ] Submit sitemap**
   - Just enter: `sitemap.xml`
   - Wait for Google to process (24-48 hours)

3. **[ ] Request indexing for key pages**
   - Go to URL Inspection tool
   - Enter: `https://ecstasy-geospatial.vercel.app/`
   - Click "Request Indexing"
   - Repeat for: `/about`, `/services`, `/projects`, `/contact`

### Within 24-48 Hours:

4. **[ ] Check sitemap status**
   - Should show "Success" with number of discovered pages
   - Expected: 6 pages (home, about, services, projects, portfolio, contact)

5. **[ ] Verify robots.txt**
   - Visit: https://ecstasy-geospatial.vercel.app/robots.txt
   - Should be accessible and show AI crawler rules

### Within 1 Week:

6. **[ ] Monitor indexing progress**
   - Check "Pages" report in Search Console
   - Should see pages moving from "Discovered" to "Indexed"

7. **[ ] Check for errors**
   - Review "Coverage" report
   - Fix any errors that appear

---

## 🧪 Testing Your Current Setup

Run these tests to verify everything is working:

### Test 1: Sitemap Accessibility
```bash
# Should return XML with your pages
https://ecstasy-geospatial.vercel.app/sitemap.xml
```

**Expected:** XML file listing all pages

### Test 2: Robots.txt
```bash
# Should show AI crawler rules
https://ecstasy-geospatial.vercel.app/robots.txt
```

**Expected:** Text file with crawler rules and sitemap reference

### Test 3: Canonical Tag
View source of homepage:
```html
<link rel="canonical" href="https://ecstasy-geospatial.vercel.app/" />
```

**Expected:** Points to non-www version

### Test 4: Google Verification
```bash
# Should return Google verification code
https://ecstasy-geospatial.vercel.app/google52c115b81962557c.html
```

**Expected:** Verification code text

---

## 📊 What to Expect After Fixing

### Day 1:
- ✅ Google Search Console verification successful
- ✅ Sitemap submitted and processing
- ⏳ "Sitemap is being processed"

### Day 2-3:
- ✅ Sitemap shows discovered pages (6 pages)
- ✅ First pages start indexing
- ⏳ "Page is discovered - currently not indexed"

### Week 1:
- ✅ Most pages indexed
- ✅ Pages appear in "Coverage" report as "Valid"
- ⏳ Starting to appear in search results

### Week 2-4:
- ✅ All pages indexed
- ✅ Search impressions start showing in Performance report
- ✅ May start appearing in ChatGPT/AI searches

---

## 🔧 Troubleshooting

### Problem: Sitemap still shows 0 pages

**Solution:**
1. Verify you're using the non-www domain
2. Check sitemap URL directly in browser
3. Resubmit sitemap
4. Wait 24-48 hours for processing

### Problem: "Sitemap could not be read"

**Possible causes:**
- Wrong domain (www vs non-www)
- Sitemap not generated (check build logs)
- Deployment issue

**Solution:**
1. Visit sitemap URL directly: `https://ecstasy-geospatial.vercel.app/sitemap.xml`
2. If it loads, resubmit to Search Console
3. If it doesn't load, check Vercel deployment logs

### Problem: "Page with redirect"

**Solution:**
- You're checking the wrong domain
- Use the canonical domain (non-www)
- Google will only index the final destination after redirect

### Problem: Verification failed

**Solution:**
1. Check verification file is in `/public` folder
2. Verify it's deployed to production
3. Try alternative verification method (DNS or meta tag)

---

## 🎯 Custom Domain Setup (Future)

If you plan to use a custom domain like `ecstasygeospatial.com`:

### Step 1: Update Environment
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=https://ecstasygeospatial.com
```

### Step 2: Configure in Vercel
1. Add custom domain in Vercel dashboard
2. Update DNS records with your registrar
3. Wait for SSL certificate (automatic)

### Step 3: Update Google Search Console
1. Add new property for custom domain
2. Verify ownership
3. Submit sitemap again
4. Set up 301 redirect from old domain (Vercel does this automatically)

---

## 📞 Support

If you continue to have issues:

1. **Check Vercel Deployment:**
   - Ensure latest build deployed successfully
   - Check deployment logs for errors

2. **Verify DNS:**
   - Use [DNS Checker](https://dnschecker.org/)
   - Ensure domain resolves correctly

3. **Test Locally:**
   ```bash
   npm run build
   npm run start
   # Visit http://localhost:3000/sitemap.xml
   ```

4. **Contact Vercel Support:**
   - If deployment issues persist
   - They can help with domain configuration

---

## ✅ Quick Checklist

Before contacting support, verify:

- [ ] Using correct domain in Search Console (no www)
- [ ] Sitemap accessible at: `https://ecstasy-geospatial.vercel.app/sitemap.xml`
- [ ] Robots.txt accessible at: `https://ecstasy-geospatial.vercel.app/robots.txt`
- [ ] Verification file/tag present
- [ ] Latest code deployed to Vercel
- [ ] No build errors in Vercel dashboard
- [ ] Waited at least 24 hours after submission

---

**Last Updated:** January 2025  
**Status:** Ready for resubmission with correct domain  
**Your Canonical Domain:** `https://ecstasy-geospatial.vercel.app` (no www)

---

## 🎉 Success Indicators

You'll know it's working when Google Search Console shows:

```
✅ Property verified: https://ecstasy-geospatial.vercel.app
✅ Sitemap status: Success
✅ Discovered pages: 6
✅ Valid pages: Increasing
✅ Coverage: All pages indexed
✅ Performance: Impressions and clicks appearing
```

Good luck! 🚀
