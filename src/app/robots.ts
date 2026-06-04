import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ecstasytechnologies.com'
  
  return {
    rules: [
      // Allow all AI crawlers and search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
      // Explicitly allow OpenAI's GPTBot (ChatGPT)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
      // Explicitly allow Google-Extended (Bard/Gemini)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
      // Explicitly allow Anthropic's Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
      // Explicitly allow CCBot (Common Crawl - used by many AI platforms)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
      // Explicitly allow Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
      // Explicitly allow Cohere
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/', '/client-portal/', '/time-tracking/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
