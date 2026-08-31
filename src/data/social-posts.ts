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
  /**
   * Set true only when this image's aspect ratio falls outside
   * Instagram's supported range (roughly 4:5 to 1.91:1 — see
   * https://developers.facebook.com/docs/instagram-platform/content-publishing).
   * Most of our project screenshots are wider than that (~2:1), which
   * Instagram's API rejects outright with a 400 (code 36003, "Invalid
   * aspect ratio") rather than silently cropping — see the incident this
   * flag fixes. Facebook has no such restriction, so this only affects
   * pickTodaysImagePost() below; Facebook still posts every image post
   * via pickTodaysPost(). When adding a new project-highlight post,
   * check the image's actual pixel dimensions and set this true if
   * width/height is under 0.8 or over 1.91.
   */
  instagramUnsafeAspectRatio?: boolean;
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
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-49-obuasi-links',
    text: 'Obuasi Links needed a professional home online for their NGO work in the Obuasi community. We built a website that does exactly that.',
    image: '/project-images/tagett-1782571570217.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-47-aspee-pharma',
    text: 'For Aspee Pharmaceuticals we built a TypeScript, React, and Next.js platform with a performance-first architecture and a clean component-based design. #WebDevelopment',
    image: '/project-images/tagett-1782569436979.webp',
    instagramUnsafeAspectRatio: true,
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
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-36-royal-ecclesia',
    text: 'Built a full church management system for Royal Ecclesia: member records, attendance tracking, and event coordination, all in one dashboard. #BusinessSoftware',
    image: '/project-images/tagett-1782222344067.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-4-building-dev-manager',
    text: 'A construction project management platform we built: timelines, budget tracking, document management, and a stakeholder communication portal, all in one place.',
    image: '/Building Development Web App.jpg',
    instagramUnsafeAspectRatio: true,
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
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-48-glow-healthy',
    text: 'Glow Healthy needed a wellness platform that felt as vibrant as the brand. We built a mobile-first site with a services showcase, lifestyle content, and a booking flow. #WebDevelopment',
    image: '/project-images/tagett-1782224340328.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-46-raynelle-portfolio',
    text: 'A clean, responsive portfolio site for Ms. Raynelle Nana Yaa Boadu, built with a custom brand design and a modern layout from the ground up.',
    image: '/project-images/tagett-1782571185662.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-44-gusty-women-foundation',
    text: 'Built a Next.js website for the Gusty Women Foundation to showcase their mission, programs, and impact stories, with a clear path for people to get involved.',
    image: '/project-images/tagett-1782570849082.webp',
  },
  {
    id: 'project-43-autosphere-imports',
    text: 'For Autosphere Imports, a Ghana-based car dealership, we built a vehicle catalogue and listings site with a clean enquiry system and a design built around the brand.',
    image: '/project-images/tagett-1782570881710.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'dev-tip-3',
    text: "The best software feature is often the one users never notice, because it just works. That is the standard we build to, not the one that just demos well.",
  },
  {
    id: 'why-us-2',
    text: 'We are a small team, which means the person scoping your project is the same one who ships it. No handoffs, no lost context.',
  },
  {
    id: 'service-web-2',
    text: 'A website is not done at launch. It should keep earning its place: fast, findable, and easy to update as your business changes. #WebDevelopment',
  },
  {
    id: 'cta-contact-3',
    text: "Tell us what is slowing your business down, whether it is a manual process, an outdated site, or no system at all, and we will help you fix it. → ecstasytechnologies.com/contact",
  },
  {
    id: 'project-53-cassvo',
    text: "Cassvo is Ghana's trusted reviews and ratings platform, connecting businesses all over the country with the people who use them. #WebDevelopment",
    image: '/project-images/tagett-1787596523517.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-5-pro-realty',
    text: 'For Pro Realty we built a full real estate platform: property listings, virtual tours, appointment scheduling, and a client management system, all in one place. #WebDevelopment',
    image: '/Pro Realty Properties Web App.png',
  },
  {
    id: 'project-10-bubbly-kids-academy',
    text: "A vibrant website for Bubbly Kids Academy, built to showcase their programs, admissions, teaching methodology, and hands-on learning approach.",
    image: '/Bubbly kids academy.png',
  },
  {
    id: 'project-11-clems-akinaabi',
    text: 'For Clems Akinaabi, a bag manufacturer, we built a complete offline inventory management system: order processing, customer tracking, and a product catalog. #BusinessSoftware',
    image: '/Clems Akinaabi Company Limited.png',
  },
  {
    id: 'dev-tip-4',
    text: 'A feature request is not a spec. Part of our job is turning "we need this" into something that actually fits how your team works day to day.',
  },
  {
    id: 'service-mobile-3',
    text: 'From concept to app store, we handle the full build: design, development, testing, and launch. #MobileApps #SoftwareDevelopment',
  },
  {
    id: 'why-us-3',
    text: 'We have built for hotels, schools, NGOs, and retailers. Different industries, same approach: understand the workflow first, then build the software around it.',
  },
  {
    id: 'seasonal-planning-ahead',
    text: 'The businesses that plan their software needs early are the ones that are not scrambling later. If something on your roadmap needs a custom build, start the conversation now.',
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

// Instagram has no text-only post type, so it can't just use
// pickTodaysPost() — plenty of queue entries have no image. This runs
// the same deterministic day-of-year rotation, but only over the
// image-bearing subset (excluding any marked instagramUnsafeAspectRatio
// — see that field's docs above), so Instagram always has something
// postable instead of skipping on days the shared rotation lands on a
// text-only entry, or erroring on one whose image Instagram's API
// rejects outright. Facebook (and X, if resumed) keep using
// pickTodaysPost() as-is, so a given day's Facebook and Instagram
// posts can differ — that's expected, not a bug.
export function pickTodaysImagePost(): SocialPost | null {
  const imagePosts = socialPosts.filter((post) => post.image && !post.instagramUnsafeAspectRatio);
  if (imagePosts.length === 0) return null;
  const dayOfYear = Math.floor(Date.now() / 86_400_000);
  return imagePosts[dayOfYear % imagePosts.length];
}
