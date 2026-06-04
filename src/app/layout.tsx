import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import Script from 'next/script'

// Note: Dynamic imports might be needed if we run into issues with server components
// const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ecstasytechnologies.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ecstasy Technologies | Best Software Development Company in Ghana',
  description: 'Leading software development company in Ghana specializing in custom web applications, mobile apps, hotel management systems, e-commerce solutions, and enterprise software. Transform your business with innovative digital solutions.',
  keywords: [
    'software development Ghana',
    'best software company Ghana',
    'web development Ghana',
    'mobile app development Ghana',
    'custom software Ghana',
    'software development company Accra',
    'enterprise software Ghana',
    'hotel management system Ghana',
    'e-commerce development Ghana',
    'business software Ghana',
    'web design Ghana',
    'software solutions Ghana',
    'IT services Ghana',
    'software company Accra',
    'app development Ghana'
  ],
  authors: [{ name: 'Ecstasy Technologies' }],
  creator: 'Ecstasy Technologies',
  publisher: 'Ecstasy Technologies',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5.0, minimum-scale=0.5',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [{ url: '/logo.png', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: siteUrl,
    siteName: 'Ecstasy Technologies',
    title: 'Best Software Development Company in Ghana',
    description: 'Leading software development company in Ghana delivering custom web applications, mobile apps, and enterprise solutions for businesses of all sizes.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1208,
        height: 995,
        alt: 'Ecstasy Technologies logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecstasy Technologies | Best Software Development Company in Ghana',
    description: 'Leading software development company in Ghana delivering innovative digital solutions.',
    images: [`${siteUrl}/logo.png`],
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ecstasy Technologies',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Leading software development company in Ghana specializing in custom web applications, mobile apps, hotel management systems, and enterprise software solutions. We serve businesses across Ghana including Accra, Kumasi, and nationwide.',
    slogan: 'Transform Your Business with Innovative Software Solutions',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GH',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Ghana',
      },
      {
        '@type': 'City',
        name: 'Accra',
      },
      {
        '@type': 'City',
        name: 'Kumasi',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'GH',
      availableLanguage: ['English'],
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web Application Development',
          description: 'Tailored web applications built with modern technologies like React, Next.js, and Node.js for businesses in Ghana',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for iOS and Android',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hotel Management Software',
          description: 'Complete hotel management systems with booking, inventory, and staff management',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Development',
          description: 'Full-featured online stores with payment integration and inventory management',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Enterprise Software Solutions',
          description: 'Custom enterprise applications for logistics, banking, real estate, and more',
        },
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Web Development',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Website Development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Application Development',
              },
            },
          ],
        },
      ],
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '5-10',
    },
    knowsAbout: [
      'React Development',
      'Next.js Development',
      'Node.js Development',
      'TypeScript',
      'Mobile App Development',
      'Web Development',
      'Software Engineering',
      'Cloud Computing',
      'Database Management',
      'API Development',
      'UI/UX Design',
      'Ghana Software Development',
      'Accra Tech Services',
    ],
    keywords: 'software development Ghana, web development Accra, mobile app development Ghana, custom software Ghana, hotel management system, e-commerce Ghana, enterprise software',
    sameAs: [
      'https://www.linkedin.com/company/ecstasy-software-services',
      'https://twitter.com/ecstasysoftware',
      'https://www.facebook.com/ecstasysoftware',
    ],
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, minimum-scale=0.5" />
        <meta name="google-site-verification" content="dOJwZHiE4_O_v9dR4A28VuQ55KBM1rVwrfXQ91Q7dQw" />
        <meta name="msvalidate.01" content="8F3C5AD81BA9112CBF9D5D448A450497" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RCT4LZB7QD"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RCT4LZB7QD');
            `,
          }}
        />
        
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 
