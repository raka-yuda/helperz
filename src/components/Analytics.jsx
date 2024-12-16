'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      {(process.env.NODE_ENV === "production") &&
        <Script
          strategy="afterInteractive"
          src={process.env.UMAMI_SCRIPT_URL}
          data-website-id={process.env.UMAMI_WEBSITE_ID}
        />
      }
    </>
  );
}