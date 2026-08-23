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
];
