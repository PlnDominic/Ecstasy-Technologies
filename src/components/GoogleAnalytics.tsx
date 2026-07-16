'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_EVENT, ConsentValue, getStoredConsent } from './CookieConsent';

const GA_MEASUREMENT_ID = 'G-RCT4LZB7QD';

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getStoredConsent() === 'granted');

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentValue>).detail;
      setConsented(detail === 'granted');
    };

    window.addEventListener(CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
