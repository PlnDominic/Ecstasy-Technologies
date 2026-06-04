/**
 * IndexNow Utility
 * Instantly notify search engines about URL changes
 * 
 * Supported Search Engines:
 * - Bing
 * - Yandex
 * - Naver
 * - Seznam
 */

const INDEXNOW_KEY = '5948f41e55e64a64a003272f4c15024c';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ecstasytechnologies.com';

// IndexNow endpoints (all search engines share the protocol)
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow', // Main endpoint (notifies all)
  'https://www.bing.com/indexnow',     // Bing specific
];

interface IndexNowResponse {
  success: boolean;
  endpoint?: string;
  error?: string;
}

/**
 * Submit a single URL to IndexNow
 * @param url - The URL to submit (can be relative or absolute)
 * @returns Promise with submission result
 */
export async function submitUrlToIndexNow(url: string): Promise<IndexNowResponse> {
  try {
    // Normalize URL to absolute
    const absoluteUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
    
    // Use the main IndexNow endpoint (notifies all search engines)
    const endpoint = INDEXNOW_ENDPOINTS[0];
    
    const payload = {
      host: new URL(BASE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [absoluteUrl]
    };

    console.log('📤 Submitting to IndexNow:', absoluteUrl);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('✅ Successfully submitted to IndexNow:', absoluteUrl);
      return { 
        success: true, 
        endpoint 
      };
    } else {
      const errorText = await response.text();
      console.error('❌ IndexNow submission failed:', response.status, errorText);
      return { 
        success: false, 
        error: `HTTP ${response.status}: ${errorText}` 
      };
    }
  } catch (error) {
    console.error('❌ IndexNow submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Submit multiple URLs to IndexNow at once
 * @param urls - Array of URLs to submit (can be relative or absolute)
 * @returns Promise with submission results
 */
export async function submitMultipleUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse[]> {
  // Submit all URLs in parallel
  const submissions = urls.map(url => submitUrlToIndexNow(url));
  return Promise.all(submissions);
}

/**
 * Submit all main pages to IndexNow
 * Use this to quickly notify search engines about your entire site
 */
export async function submitAllPagesToIndexNow(): Promise<IndexNowResponse[]> {
  const mainPages = [
    '/',
    '/about',
    '/services',
    '/projects',
    '/portfolio',
    '/contact',
  ];

  console.log('📤 Submitting all main pages to IndexNow...');
  const results = await submitMultipleUrlsToIndexNow(mainPages);
  
  const successCount = results.filter(r => r.success).length;
  console.log(`✅ IndexNow submission complete: ${successCount}/${results.length} successful`);
  
  return results;
}

/**
 * Get the IndexNow key file URL for verification
 */
export function getIndexNowKeyUrl(): string {
  return `${BASE_URL}/${INDEXNOW_KEY}.txt`;
}

/**
 * Verify that the IndexNow key file is accessible
 */
export async function verifyIndexNowKey(): Promise<boolean> {
  try {
    const keyUrl = getIndexNowKeyUrl();
    console.log('🔍 Verifying IndexNow key at:', keyUrl);
    
    const response = await fetch(keyUrl);
    if (response.ok) {
      const content = await response.text();
      const isValid = content.trim() === INDEXNOW_KEY;
      
      if (isValid) {
        console.log('✅ IndexNow key is valid and accessible');
      } else {
        console.error('❌ IndexNow key content mismatch');
      }
      
      return isValid;
    } else {
      console.error('❌ IndexNow key file not accessible:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Error verifying IndexNow key:', error);
    return false;
  }
}
