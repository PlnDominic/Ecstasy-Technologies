// ── Social post queue ──
// The rotation of content the automated posting routine pulls from. Add,
// remove, or reorder entries freely — the routine cycles through them in
// order and wraps back to the top once it reaches the end, so the list
// never "runs out." Keep entries under ~260 characters so there's room
// for X to append link-shortened URLs without truncating.

export interface SocialPost {
  /** Stable id — used only for your own reference when editing this file. */
  id: string;
  text: string;
  /**
   * Optional path to an image, relative to the site root (e.g.
   * "/project-images/foo.webp" — matching an entry's "image" field in
   * data/projects.json). When set, Facebook posts this as a photo post
   * instead of a plain text post. Leave unset for text-only posts.
   */
  image?: string;
}

export const socialPosts: SocialPost[] = [
  {
    id: 'intro-1',
    text: "We build web apps, mobile apps, and business software that actually fit how your team works. Let's talk about your project → ecstasytechnologies.com",
  },
  {
    id: 'service-web',
    text: 'From landing pages to full web applications, we design and ship software that looks sharp and holds up in production. #WebDevelopment',
  },
  {
    id: 'service-uiux',
    text: "Good UI/UX isn't decoration. It's the difference between users staying and users bouncing. That's the bar we design to. #UIUX #ProductDesign",
  },
  {
    id: 'service-mobile',
    text: 'Need a mobile app that your users actually want to open twice? That is what we do. #MobileApps #SoftwareDevelopment',
  },
  {
    id: 'cta-contact',
    text: "Got an idea for a web or mobile product? We'd love to hear it. Reach out and let's scope it together → ecstasytechnologies.com/contact",
  },
  {
    id: 'service-business',
    text: 'Spreadsheets and sticky notes are not a system. If your business is outgrowing them, we build the custom software to replace them. #BusinessSoftware',
  },
  {
    id: 'social-proof-1',
    text: 'Clients come to us with an idea and a deadline. They leave with software their team actually uses. That is the whole job.',
  },
  {
    id: 'dev-tip-1',
    text: 'A good rule for any product: if your team cannot explain what a feature does in one sentence, users will not figure it out either.',
  },
  {
    id: 'why-us-1',
    text: 'We are not a factory that ships templates. Every project starts with understanding how your business actually runs, then we build around that.',
  },
  {
    id: 'service-mobile-2',
    text: 'Your customers are on their phones more than your website. If your business does not have a mobile app yet, that is worth a conversation. #MobileApps',
  },
  {
    id: 'service-uiux-2',
    text: 'Great design is not about making things pretty. It is about removing every extra click between a user and what they came to do. #UIUX',
  },
  {
    id: 'seasonal-q4-planning',
    text: 'Q4 planning season: if a custom software project is on next year\'s roadmap, now is the time to start scoping it, not January.',
  },
  {
    id: 'web-performance',
    text: 'A slow website costs you customers before they even see what you offer. Performance is not optional, it is part of the product. #WebDevelopment',
  },
  {
    id: 'support-1',
    text: 'Launch day is not the finish line. We stick around for updates, fixes, and the next feature, not just the first version.',
  },
  {
    id: 'security-1',
    text: 'Custom software should not mean cutting corners on security. We build with that in mind from day one, not as an afterthought. #SoftwareDevelopment',
  },
  {
    id: 'scalability-1',
    text: 'Built for 100 users today does not mean built for 10,000 tomorrow. We design software that can grow with your business.',
  },
  {
    id: 'discovery-process',
    text: 'Before we write a line of code, we spend time understanding your workflow. Good software starts with good questions.',
  },
  {
    id: 'dev-tip-2',
    text: 'If a bug only shows up in production, that is not bad luck, that is a gap in your testing. We treat both as part of the build. #WebDevelopment',
  },
  {
    id: 'cta-contact-2',
    text: 'Not sure if your idea needs a website, an app, or both? Send us the details and we will help you figure out the right build. → ecstasytechnologies.com/contact',
  },

  // ── Project highlights ──
  // Real work from data/projects.json, paired with the project's actual
  // screenshot. Keep these grounded in what that file actually says about
  // each project — no invented client quotes, results, or numbers.
  {
    id: 'project-52-beccas-luxe',
    text: "Built the website for Becca's Luxe, a custom souvenir studio in Accra crafting personalized keepsakes for weddings, christenings, and corporate milestones. #WebDevelopment",
    image: '/project-images/tagett-1787310108287.webp',
  },
  {
    id: 'project-50-tagett',
    text: 'Tagett is our own internal client management tool, built to keep projects, communication, and productivity in one place. Sometimes the best case study is the tool we use every day.',
    image: '/project-images/tagett-1787293301377.webp',
  },
  {
    id: 'project-49-obuasi-links',
    text: 'Obuasi Links needed a professional home online for their NGO work in the Obuasi community. We built a website that does exactly that.',
    image: '/project-images/tagett-1782571570217.webp',
  },
  {
    id: 'project-47-aspee-pharma',
    text: 'For Aspee Pharmaceuticals we built a TypeScript, React, and Next.js platform with a performance-first architecture and a clean component-based design. #WebDevelopment',
    image: '/project-images/tagett-1782569436979.webp',
  },
  {
    id: 'project-45-local-drop-shipping',
    text: 'A full marketplace build for Local Drop Shipping GH: storefront, vendor and buyer dashboards, and order management, all in one Next.js application. #WebDevelopment',
    image: '/project-images/tagett-1782570005106.webp',
  },
  {
    id: 'project-39-bia-east',
    text: 'For Bia East District we built a digital platform with GIS mapping, a community resource directory, and a full service listing. Government and community projects need software too.',
    image: '/project-images/tagett-1781969724443.webp',
  },
  {
    id: 'project-36-royal-ecclesia',
    text: 'Built a full church management system for Royal Ecclesia: member records, attendance tracking, and event coordination, all in one dashboard. #BusinessSoftware',
    image: '/project-images/tagett-1782222344067.webp',
  },
  {
    id: 'project-4-building-dev-manager',
    text: 'A construction project management platform we built: timelines, budget tracking, document management, and a stakeholder communication portal, all in one place.',
    image: '/Building Development Web App.jpg',
  },
  {
    id: 'project-17-nhyiraba-hms',
    text: 'Built a full hotel management system for Nhyiraba: real-time room status, guest check-in and checkout, reservations, and billing, all in one system. #BusinessSoftware',
    image: '/Nhyiraba HMS.png',
  },
  {
    id: 'project-24-moldgold-school',
    text: 'For MoldGold we built a school management system covering academics, student records, fee collection, and communication between parents and teachers.',
    image: '/Moldgold School.png',
  },
];

// Picks the same entry all day, deterministically, no matter how many
// times a scheduled job happens to fire — and wraps around once the
// rotation reaches the end. Shared by every platform's posting route so
// they all agree on "today's post" without duplicating this logic.
export function pickTodaysPost(): SocialPost | null {
  if (socialPosts.length === 0) return null;
  const dayOfYear = Math.floor(Date.now() / 86_400_000); // days since epoch, stable per day
  return socialPosts[dayOfYear % socialPosts.length];
}

/** Looks up a specific post by id — used by the manual-override query param on the posting routes. */
export function findPostById(id: string): SocialPost | null {
  return socialPosts.find((post) => post.id === id) ?? null;
}
