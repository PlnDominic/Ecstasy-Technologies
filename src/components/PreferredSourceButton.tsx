'use client';

import React, { useEffect } from 'react';

/**
 * Google "Add to Preferred Sources" button.
 * Loads Google's publisher library and renders the official button so
 * visitors can add ecstasytechnologies.com as a preferred source on Google.
 * Docs: https://developers.google.com/search/docs/appearance/preferred-sources
 */
export default function PreferredSourceButton() {
  useEffect(() => {
    // Load Google's preferred sources library once
    if (document.querySelector('script[src="https://news.google.com/swg/js/v1/publisher.js"]')) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://news.google.com/swg/js/v1/publisher.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div
      // Custom attribute rendered verbatim by React; the loaded Google
      // library scans the DOM for it and swaps in its styled button.
      {...{ 'google-add-preferred-source-btn': '' }}
      data-theme="dark"
      data-lang="en"
    />
  );
}
