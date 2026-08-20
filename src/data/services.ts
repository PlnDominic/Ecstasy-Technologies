// Single source of truth for service listings, service detail pages,
// sitemap generation, and the services JSON-LD in layout.tsx.

export interface ServiceDetail {
  num: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  technologies: string[];
  relatedProjects: { title: string; category: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: ServiceDetail[] = [
  {
    num: '01',
    slug: 'web-design-development',
    name: 'Web Design & Development',
    tagline: 'Websites built for performance, clarity, and conversion.',
    description:
      'Bespoke websites built for performance, clarity, and conversion — from marketing sites to full e-commerce platforms. Every site is designed around your customer\'s journey and built on a technical foundation that keeps it fast, secure, and easy to update.',
    features: [
      'Responsive across all devices',
      'E-commerce & payment systems',
      'Content management systems',
      'SEO-first architecture',
    ],
    useCases: [
      'Business & marketing websites',
      'Hotel & hospitality booking sites',
      'Online stores with catalog and checkout',
      'Landing pages for campaigns and launches',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    relatedProjects: [
      { title: 'Lavimac Royal Hotel', category: 'Website' },
      { title: 'Emson Hotel', category: 'Website' },
    ],
    faqs: [
      {
        q: 'How long does a website take to build?',
        a: 'A marketing or hotel website typically takes 3–6 weeks from kickoff to launch, depending on scope and how quickly content and feedback come back to us.',
      },
      {
        q: 'Do you handle hosting and domains?',
        a: 'Yes — we can set up hosting, domain configuration, and SSL for you, or work with your existing provider.',
      },
    ],
  },
  {
    num: '02',
    slug: 'web-applications',
    name: 'Web Applications',
    tagline: 'Scalable systems that power real business operations.',
    description:
      'Complex, scalable systems that power real business operations — logistics dashboards to booking platforms to SaaS tools. We design the data model and workflows around how your team actually works, not the other way around.',
    features: [
      'Progressive web apps',
      'Real-time data & notifications',
      'Workflow automation',
      'Third-party API integrations',
    ],
    useCases: [
      'Logistics & fleet tracking dashboards',
      'Booking and reservation platforms',
      'Internal operations tools',
      'Customer-facing SaaS products',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    relatedProjects: [
      { title: 'Dynamic Shipping & Logistics', category: 'Web Application' },
      { title: 'Hotel Management System', category: 'Web Application' },
    ],
    faqs: [
      {
        q: 'Can you integrate with our existing tools?',
        a: 'Yes — we regularly integrate with payment processors, mapping APIs, SMS/email providers, and existing internal systems via API.',
      },
      {
        q: 'What happens after launch?',
        a: 'We offer ongoing support and a post-launch bug-fix warranty — see our guarantee on the Services page.',
      },
    ],
  },
  {
    num: '03',
    slug: 'mobile-apps',
    name: 'Mobile Apps',
    tagline: 'Native and cross-platform apps users actually enjoy.',
    description:
      'Native and cross-platform mobile applications that users actually enjoy — built for speed, reliability, and retention, from first onboarding screen to app-store submission.',
    features: [
      'iOS & Android development',
      'Cross-platform (React Native)',
      'Offline capability',
      'Push notifications',
    ],
    useCases: [
      'Mobile banking & fintech apps',
      'Booking and loyalty apps',
      'Field-service and logistics apps',
      'Consumer apps with offline support',
    ],
    technologies: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    relatedProjects: [
      { title: 'Obotan Credit Union Banking App', category: 'Mobile App' },
    ],
    faqs: [
      {
        q: 'iOS, Android, or both?',
        a: 'We build cross-platform with React Native by default, which ships to both iOS and Android from a single codebase. We also do native development where a project needs it.',
      },
      {
        q: 'Do you handle app store submission?',
        a: 'Yes, we manage the App Store and Google Play submission process, including store listing assets.',
      },
    ],
  },
  {
    num: '04',
    slug: 'business-software',
    name: 'Business Software',
    tagline: 'Management systems engineered to fit your workflows.',
    description:
      'Custom management systems, ERPs, and operational tools engineered to fit your workflows — not the other way around. We start from how your business actually runs, not a generic template.',
    features: [
      'Hotel & property management',
      'School management systems',
      'Inventory & order systems',
      'Financial reporting tools',
    ],
    useCases: [
      'Hotel & property management systems',
      'School / academy management systems',
      'Inventory and order-tracking systems',
      'Financial and operational reporting',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    relatedProjects: [
      { title: 'Hotel Management System', category: 'Business Software' },
      { title: 'Nhyiraba HMS', category: 'Business Software' },
    ],
    faqs: [
      {
        q: 'Can this replace our spreadsheets and paper processes?',
        a: 'Yes — this is exactly what we specialise in. We map your current process first, then build a system that removes the manual steps without disrupting the parts that already work.',
      },
      {
        q: 'Can staff be trained on the new system?',
        a: 'Yes, training and documentation for your team is included as part of launch.',
      },
    ],
  },
  {
    num: '05',
    slug: 'gis-solutions',
    name: 'GIS Solutions',
    tagline: 'Geospatial software for location-based decisions.',
    description:
      'Geospatial software for organisations that need to visualise, analyse, and act on location data at scale — from interactive maps to full location-intelligence platforms.',
    features: [
      'Interactive mapping',
      'Location-based services',
      'Geospatial data analysis',
      'GIS web applications',
    ],
    useCases: [
      'Route and territory mapping',
      'Asset and land tracking',
      'Delivery and logistics zoning',
      'Location-based analytics dashboards',
    ],
    technologies: ['React', 'Node.js', 'Google Maps API', 'PostgreSQL/PostGIS'],
    relatedProjects: [
      { title: 'Dynamic Shipping & Logistics', category: 'Web Application' },
    ],
    faqs: [
      {
        q: 'What mapping data can you work with?',
        a: 'We work with Google Maps and OpenStreetMap-based data, as well as custom geospatial datasets you provide.',
      },
    ],
  },
  {
    num: '06',
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    tagline: 'Interface design that turns complexity into clarity.',
    description:
      'User research, wireframing, and interface design that turns complex systems into intuitive, memorable experiences — for both new products and existing systems that need a redesign.',
    features: [
      'User research & personas',
      'Wireframing & prototyping',
      'Design systems',
      'Usability testing',
    ],
    useCases: [
      'New product design from scratch',
      'Redesigns of existing web or mobile apps',
      'Design systems for growing product teams',
      'Usability audits of existing interfaces',
    ],
    technologies: ['Figma', 'Design systems', 'Prototyping'],
    relatedProjects: [
      { title: 'Dominic Kudom Portfolio', category: 'Website' },
    ],
    faqs: [
      {
        q: 'Do you design without building, or only as part of a full build?',
        a: 'Both — we take standalone design engagements as well as full design-and-build projects.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find(s => s.slug === slug);
}
