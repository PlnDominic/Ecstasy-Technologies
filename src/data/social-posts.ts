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
];
