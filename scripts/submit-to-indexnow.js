/**
 * IndexNow Manual Submission Script
 * 
 * Usage:
 *   node scripts/submit-to-indexnow.js
 * 
 * This script submits all your main pages to IndexNow for instant indexing
 */

const INDEXNOW_KEY = '5948f41e55e64a64a003272f4c15024c';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecstasy-geospatial.vercel.app';

// Main pages to submit
const PAGES = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/portfolio',
  '/contact',
];

async function submitToIndexNow() {
  console.log('🚀 IndexNow Submission Script');
  console.log('================================\n');
  
  // Step 1: Verify key file is accessible
  console.log('Step 1: Verifying IndexNow key file...');
  const keyUrl = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
  
  try {
    const keyResponse = await fetch(keyUrl);
    if (!keyResponse.ok) {
      console.error('❌ Error: Key file not accessible at:', keyUrl);
      console.error('   Make sure the file is deployed to your website');
      process.exit(1);
    }
    
    const keyContent = await keyResponse.text();
    if (keyContent.trim() !== INDEXNOW_KEY) {
      console.error('❌ Error: Key file content does not match');
      process.exit(1);
    }
    
    console.log('✅ Key file verified\n');
  } catch (error) {
    console.error('❌ Error verifying key file:', error.message);
    process.exit(1);
  }
  
  // Step 2: Submit URLs
  console.log('Step 2: Submitting URLs to IndexNow...\n');
  
  const urlList = PAGES.map(page => `${BASE_URL}${page}`);
  
  const payload = {
    host: new URL(BASE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: keyUrl,
    urlList: urlList
  };
  
  console.log('URLs to submit:');
  urlList.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  console.log();
  
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    
    if (response.ok) {
      console.log('✅ SUCCESS! All URLs submitted to IndexNow');
      console.log('\nWhat happens next:');
      console.log('  • Bing will be notified instantly');
      console.log('  • Other search engines (Yandex, Naver, Seznam) also notified');
      console.log('  • Your pages should be crawled within hours');
      console.log('  • Check Bing Webmaster Tools for indexing status\n');
    } else {
      const errorText = await response.text();
      console.error('❌ Submission failed:', response.status);
      console.error('   Response:', errorText);
      
      if (response.status === 400) {
        console.error('\n   Common causes:');
        console.error('   • Invalid URL format');
        console.error('   • Key file not accessible');
        console.error('   • Malformed request');
      } else if (response.status === 403) {
        console.error('\n   Key verification failed');
        console.error('   • Ensure key file is accessible at:', keyUrl);
      } else if (response.status === 422) {
        console.error('\n   URLs not valid');
        console.error('   • Check that all URLs are accessible');
      }
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    process.exit(1);
  }
}

// Run the script
submitToIndexNow();
