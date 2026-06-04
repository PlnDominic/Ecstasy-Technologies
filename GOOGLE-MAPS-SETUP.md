# Google Maps API Setup Guide

## Overview
This guide will help you set up the Google Maps API for the Commutes Widget feature in your application.

## Prerequisites
- A Google Cloud Platform account
- Billing enabled on your Google Cloud project

## Step-by-Step Setup

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "Ecstasy Technologies")
5. Click "Create"

### 2. Enable Required APIs
Navigate to the [APIs & Services](https://console.cloud.google.com/apis/dashboard) page and enable the following APIs:

1. **Maps JavaScript API**
   - Go to: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
   - Click "Enable"

2. **Places API**
   - Go to: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
   - Click "Enable"

3. **Directions API**
   - Go to: https://console.cloud.google.com/apis/library/directions-backend.googleapis.com
   - Click "Enable"

4. **Geocoding API** (Optional but recommended)
   - Go to: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com
   - Click "Enable"

### 3. Create API Credentials
1. Go to [Credentials page](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Your API key will be created and displayed

### 4. Secure Your API Key (IMPORTANT!)
1. After creating the key, click on the key name to edit it
2. Under "Application restrictions":
   - For development: Select "HTTP referrers"
   - Add: `http://localhost:3000/*`
   - For production: Add your domain: `https://ecstasy-geospatial.vercel.app/*`
   - Or your custom domain: `https://ecstasygeospatial.com/*`

3. Under "API restrictions":
   - Select "Restrict key"
   - Choose the following APIs:
     - Maps JavaScript API
     - Places API
     - Directions API
     - Geocoding API (if enabled)

4. Click "Save"

### 5. Add API Key to Your Project
1. Open `.env.local` file in your project root
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. Save the file

### 6. Enable Billing (Required)
Google Maps requires billing to be enabled:
1. Go to [Billing](https://console.cloud.google.com/billing)
2. Link a billing account to your project
3. Google provides $200 monthly credit which covers most development needs

## Usage Limits & Pricing

### Free Tier Monthly Credits
- $200 free credit per month
- Covers approximately:
  - 28,000 map loads
  - 40,000 geocoding requests
  - 40,000 directions requests

### Typical Usage for Commutes Widget
- **Map loads**: Each page visit loads the map once
- **Places Autocomplete**: Charged per session (when user types destination)
- **Directions**: Charged per request (when calculating route)

### Cost Estimation
For a small to medium website:
- ~1,000 visits/month = ~$7-15/month (usually covered by free credit)

## Testing Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: http://localhost:3000/commutes

3. You should see:
   - A map centered on the default location
   - "Estimate commute time" heading
   - "Add destination" button

4. Click "Add destination" and search for a location
5. The autocomplete should show suggestions
6. After adding a destination, you should see the route on the map

## Troubleshooting

### Error: "This page can't load Google Maps correctly"
- Check if billing is enabled
- Verify the API key is correct in `.env.local`
- Ensure the required APIs are enabled

### Error: "The Google Maps JavaScript API is not loaded"
- Check your browser console for detailed errors
- Verify the API key has proper restrictions set

### Error: "This API project is not authorized to use this API"
- Go back to APIs & Services and enable the missing API

### Autocomplete Not Working
- Ensure Places API is enabled
- Check API key restrictions aren't blocking requests

### No Routes Displayed
- Ensure Directions API is enabled
- Check browser console for errors

## Security Best Practices

1. **Never commit `.env.local` to version control** (already in .gitignore)
2. **Use HTTP referrer restrictions** for production
3. **Regularly monitor usage** in Google Cloud Console
4. **Set up billing alerts** to avoid unexpected charges
5. **Rotate API keys** if they're accidentally exposed

## Additional Resources

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
- [Support & Community](https://developers.google.com/maps/support)

## Need Help?

If you encounter issues:
1. Check the browser console for detailed error messages
2. Review the Google Cloud Console logs
3. Verify all APIs are enabled
4. Ensure billing is active
5. Check API key restrictions match your domain

## Accessing the Commutes Widget

Once setup is complete, you can access the widget at:
- Development: http://localhost:3000/commutes
- Production: https://ecstasy-geospatial.vercel.app/commutes
- Custom domain: https://ecstasygeospatial.com/commutes

## Customizing the Widget

You can customize the default location by editing `src/app/commutes/page.tsx`:

```typescript
const config = {
  defaultTravelMode: 'DRIVING' as const, // or 'TRANSIT', 'BICYCLING', 'WALKING'
  distanceMeasurementType: 'IMPERIAL' as const, // or 'METRIC'
  mapOptions: {
    center: { lat: YOUR_LAT, lng: YOUR_LNG }, // Change to your preferred location
    zoom: 14, // Adjust zoom level (1-20)
  },
};
```
