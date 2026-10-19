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
    id: 'project-1-lavimac-royal-hotel',
    text: 'For Lavimac Royal Hotel we built a luxury hotel website with online booking, a high-resolution room gallery, and integrated payment processing. #WebDevelopment',
    image: '/Lavimac royal hotel website.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-7-dominic-kudom-portfolio',
    text: 'Sometimes the case study is closer to home. Our own portfolio site: interactive UI, a project showcase, dark and light mode, and SEO built in from the start.',
    image: '/Dominic Kudom Portfolio.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-18-solani-construction',
    text: 'For Solani Construction Limited we built a professional website showcasing their services, project portfolio, and team, with inquiry forms built right in. #WebDevelopment',
    image: '/Solani Construction.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-54-kings-towers-hotel',
    text: 'Kings Towers Hotel sits in Ahinsan, Kumasi, with a serene, scenic setting for guests. We built the website to match that. #WebDevelopment',
    image: '/project-images/tagett-1793000000101.webp',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-51-thrive-edu',
    text: 'Thrive EDU is an international education NGO helping schools and communities build the systems that make quality learning stick. We built their web application.',
    image: '/project-images/tagett-1793000000102.webp',
  },
  {
    id: 'project-6-emson-hotel',
    text: 'For Emson Hotel we built an elegant website with room bookings, an availability checker, and event planning services, all in one place. #WebDevelopment',
    image: '/Emson hotel website.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-13-nevrol-ventures',
    text: 'A professional business website for Nevrol Ventures: company overview, services, portfolio, and inquiry forms, built with a modern UI. #WebDevelopment',
    image: '/Nevrol Ventures.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-21-persis-luxury-beauty',
    text: 'For Persis Luxury Beauty World we built a high-end site to match the brand: a full product catalog, collections and lookbooks, and an online shopping experience.',
    image: '/Persis Luxury Beauty World.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-8-hotel-management-system',
    text: 'A comprehensive hotel management system we built: reservations, room allocation, housekeeping, billing, and staff management, all in one platform. #BusinessSoftware',
    image: '/Hotel Management System Software Web App.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-14-jokran-hotel',
    text: 'For Jokran Hotel we built an elegant website with online booking, a room gallery, amenities showcase, and guest services information. #WebDevelopment',
    image: '/Jokran Hotel.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-22-royal-home-comfort',
    text: 'Royal Home Comfort needed a site that covers both property listings and their home comfort services. We built one with a client inquiry system built in.',
    image: '/Royal Home Comfort.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'seasonal-year-end-review',
    text: 'End of year is a good time to look at what slowed your team down in the past twelve months. If the answer involves your software, let us know what needs fixing.',
  },
  {
    id: 'project-9-aaron-freeman-portfolio',
    text: 'For Aaron Freeman, an urban and environmental planner, we built a portfolio to showcase his sustainable city planning projects and community leadership work.',
    image: '/Aaron Freeman.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-15-peravic-lodge',
    text: 'For Peravic Lodge we built a welcoming website with an accommodations gallery, amenities showcase, and booking information for guests. #WebDevelopment',
    image: '/Peravic Lodge.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-20-mankind-foundation',
    text: 'Mankind Foundation Ghana needed a site that communicates their mission clearly: programs, impact stories, and a real way for people to donate or volunteer.',
    image: '/Mankind Foundation Ghana.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'dev-tip-9',
    text: 'A dropdown with forty options is not a feature, it is a search bar you forgot to build. #UIUX',
  },
  {
    id: 'why-us-8',
    text: 'We do not disappear after the invoice. If something breaks six months in, you can still reach the person who built it.',
  },
  {
    id: 'service-business-3',
    text: 'If your team has three different spreadsheets for one process, that is not a workflow, that is a warning sign. #BusinessSoftware',
  },
  {
    id: 'cta-contact-6',
    text: "Not sure where to start? Tell us what your business does and what is slow about it right now. We will take it from there. → ecstasytechnologies.com/contact",
  },
  {
    id: 'web-basics-opening-hours',
    text: 'If customers have to message you just to find your opening hours or prices, your website is not doing its job. Put the basics where people can see them. #WebDesign',
  },
  {
    id: 'project-2-dynamic-shipping',
    text: 'Dynamic Shipping & Logistics needed one system for shipment tracking, inventory, delivery scheduling, and customer notifications. We built a logistics management platform that brings it together. #BusinessSoftware',
    image: '/Dynamic Shipping and Logistics.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'mobile-not-small-website',
    text: 'A mobile app is not a smaller website. Design it around the one thing your users do every day, and cut the rest. #MobileApps',
  },
  {
    id: 'project-3-obotan-credit-union',
    text: 'A secure mobile banking app for Obotan Credit Union members: account management, fund transfers, bill payments, and transaction history, all from the phone. #MobileApps',
    image: '/Obotan Coorperative Credit  Union Banking App.jpg',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-16-nhyiraba-hotel',
    text: 'Nhyiraba Hotel guests can check real-time room availability, book online, and pay with MTN Mobile Money. A hotel booking app built for how guests in Ghana actually pay. #WebApp',
    image: '/Nhyiraba Hotel.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'build-for-monday-morning',
    text: 'Before building a feature, ask who will use it on a Monday morning and what they are trying to finish. That one question saves more time than any framework.',
  },
  {
    id: 'project-19-michelle-mayers-spa',
    text: 'An elegant, luxury website for Michelle Mayers Skincare & Spa, with treatments, a product catalog, online appointment booking, and a before and after gallery. #WebDesign',
    image: '/Michelle Mayers Skincare Spa.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'whatsapp-orders-to-system',
    text: "Taking orders on WhatsApp works until it doesn't. When messages get buried, orders get missed. A simple order system keeps every request in one place, with a status your whole team can see. #BusinessSoftware",
  },
  {
    id: 'website-on-mobile-data',
    text: 'Most of your customers will open your website on mobile data, not office Wi-Fi. If it takes ages to load, they leave before they see what you offer. Test it on your own phone today. #WebDesign',
  },
  {
    id: 'ui-one-main-action',
    text: 'Every screen should have one main thing you want people to do. If everything is bold, nothing stands out.',
  },
  {
    id: 'q4-plan-for-january',
    text: "Planning next year's budget? If a website, app or system is on your list for January, scope it now so you start the year building, not planning. → ecstasytechnologies.com/contact",
  },
  {
    id: 'project-12-amor-de-dios-drilling',
    text: 'We built the website for Amor De Dios Drilling & Construction, showing their drilling and civil construction services, project portfolio and company profile, with service request forms built in. #WebDevelopment',
    image: '/Amor De Dios Drilling and Civil Construction.png',
    instagramUnsafeAspectRatio: true,
  },
  {
    id: 'project-23-aspee-product-catalog',
    text: 'Another look at our work for Aspee Pharmaceuticals: a professional site with their product catalog, healthcare solutions, a research and development section, and a route for distribution inquiries. #WebDesign',
    image: '/Aspee.jpg',
    instagramUnsafeAspectRatio: true,
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
