// Single source of truth for the blog listing, individual post pages,
// sitemap generation, and BlogPosting JSON-LD.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  category: string;
  readTime: string;
  author: string;
  body: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'signs-your-business-needs-custom-software',
    title: '7 Signs Your Business Has Outgrown Spreadsheets',
    excerpt:
      'Spreadsheets are a great starting point for a growing business - until they aren\'t. Here\'s how to tell when it\'s time to move to purpose-built software.',
    date: '2026-02-10',
    category: 'Business Software',
    readTime: '6 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          'Almost every business we work with started the same way: a spreadsheet, a shared folder, maybe a WhatsApp group for coordination. That\'s not a failure - it\'s the right way to start. The problem is knowing when to stop.',
          'Below are the signs we look for when a client asks us whether it\'s time to build something custom.',
        ],
      },
      {
        heading: '1. Two people are editing the same file and one version always wins',
        paragraphs: [
          'If your team is emailing spreadsheets back and forth, or you\'ve ever had to ask "whose version is the real one?", you\'ve already paid the cost of not having a shared system - you just paid it in confusion instead of money.',
        ],
      },
      {
        heading: '2. Reporting takes a person, not a click',
        paragraphs: [
          'If getting a simple answer - this month\'s bookings, current stock levels, which invoices are overdue - requires someone to manually compile numbers from several sheets, that time is a recurring cost that compounds every month.',
        ],
      },
      {
        heading: '3. Your process only works because one person remembers all the steps',
        paragraphs: [
          'Spreadsheets don\'t enforce a process - people do, from memory. That works until that person is on leave, or leaves the company. Software encodes the process so it survives staff changes.',
        ],
      },
      {
        heading: '4. Customers are asking for things a spreadsheet can\'t do',
        paragraphs: [
          'Online booking, real-time availability, self-service account access - these are now baseline expectations in hospitality, retail, and financial services. A spreadsheet has no way to expose itself safely to a customer.',
        ],
      },
      {
        heading: '5. Mistakes are getting expensive',
        paragraphs: [
          'A double-booked hotel room, a missed reorder point, a payment recorded twice - spreadsheet errors are cheap when the business is small and get expensive fast as it grows.',
        ],
      },
      {
        heading: '6. You\'re duplicating data entry across tools',
        paragraphs: [
          'If your team types the same customer or order details into more than one place, that\'s a sign the tools around you aren\'t talking to each other - and a sign you need software that connects them.',
        ],
      },
      {
        heading: '7. Growth feels harder than it should',
        paragraphs: [
          'The clearest sign is this: opening a second branch, hiring a second shift, or doubling order volume shouldn\'t double your admin work. If it does, your systems - not your team - are the bottleneck.',
        ],
      },
      {
        heading: 'What comes next',
        paragraphs: [
          'None of this means throwing out your spreadsheets overnight. It means starting with the one process that\'s causing the most pain, and building a small, purpose-built tool around it. That\'s how most of the business systems we\'ve built - including hotel and school management systems now used daily by our clients - started.',
        ],
      },
    ],
  },
  {
    slug: 'what-makes-a-good-hotel-management-system',
    title: 'What Makes a Good Hotel Management System (And What to Avoid)',
    excerpt:
      'Booking engines, housekeeping, billing - a hotel management system touches every part of daily operations. Here\'s what actually matters when choosing or building one.',
    date: '2026-03-04',
    category: 'Hospitality',
    readTime: '7 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          'We\'ve built hotel management systems for properties ranging from boutique hotels to multi-property operations. The requests all sound different at first, but the systems that actually get used every day share a small set of traits.',
        ],
      },
      {
        heading: 'It has to work at the front desk under pressure',
        paragraphs: [
          'A system that\'s elegant in a demo but slow at 11pm with a queue of guests checking in is a system staff will find workarounds for. Front-desk speed - check-in, room assignment, billing - should be the first thing tested, not the last.',
        ],
      },
      {
        heading: 'One source of truth for availability',
        paragraphs: [
          'The single most damaging failure mode in hotel software is a double-booking caused by two systems (say, a website widget and the front-desk system) not sharing the same live availability data. Room inventory needs one source of truth that every booking channel reads from.',
        ],
      },
      {
        heading: 'Housekeeping status should update the booking system automatically',
        paragraphs: [
          'When housekeeping marks a room clean, front desk should see it instantly - not after someone walks over or sends a message. This single integration removes a huge amount of daily friction.',
        ],
      },
      {
        heading: 'Reporting your manager actually reads',
        paragraphs: [
          'Occupancy rate, revenue per available room, upcoming arrivals - these numbers should be one click away, not a monthly export-and-clean-up job. If reporting requires manual work, it stops happening regularly.',
        ],
      },
      {
        heading: 'What to avoid',
        paragraphs: [
          'Be cautious of systems that are hard to customise to your property\'s specific room types, rate plans, or seasonal pricing - generic templates rarely survive contact with a real hotel\'s operations for long. And be wary of any system without a working offline mode; front-desk operations can\'t stop because the internet did.',
        ],
      },
      {
        heading: 'Starting small',
        paragraphs: [
          'The hotel systems we\'ve delivered - including for Lavimac Royal Hotel, Emson Hotel, and Nhyiraba Hotel - all started from the same place: mapping the property\'s actual daily workflow before writing a line of code, then building around it.',
        ],
      },
    ],
  },
  {
    slug: 'web-vs-mobile-app-which-does-your-business-need',
    title: 'Website, Web App, or Mobile App? How to Choose',
    excerpt:
      'Not every business idea needs a mobile app - and not every mobile app idea should skip the website. Here\'s a practical way to decide.',
    date: '2026-04-01',
    category: 'Strategy',
    readTime: '5 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          'One of the first questions we ask every new client isn\'t "what should we build" - it\'s "what does the user need to do, and where are they when they need to do it?" The answer usually points to one of three directions.',
        ],
      },
      {
        heading: 'Start with a website if...',
        paragraphs: [
          'Your goal is to be found, explain what you do, and convert visitors into enquiries or bookings. Most businesses - including service businesses, hotels, and schools - need this first, and it should be fast, mobile-friendly, and easy to update.',
        ],
      },
      {
        heading: 'Move to a web application if...',
        paragraphs: [
          'Users need to log in, manage ongoing data, or perform recurring tasks - booking dashboards, inventory systems, client portals. A web app runs in the browser, works on any device, and doesn\'t require an app-store install, which lowers the barrier for users to actually use it.',
        ],
      },
      {
        heading: 'Build a mobile app if...',
        paragraphs: [
          'Users need offline access, push notifications, or device features like camera and GPS, or they\'ll be opening the tool multiple times a day and want it one tap away on their home screen. Mobile banking, delivery tracking, and loyalty apps fall here.',
        ],
      },
      {
        heading: 'A common mistake: building the mobile app first',
        paragraphs: [
          'App-store approval, updates, and device fragmentation add real overhead. Unless offline access or push notifications are core to the product from day one, a web app validated with real users is usually the faster, cheaper way to prove the idea - before committing to native mobile.',
        ],
      },
      {
        heading: 'They\'re not mutually exclusive',
        paragraphs: [
          'Most of the systems we\'ve delivered combine more than one: a public website for discovery, a web application for day-to-day operations, and - where it earns its complexity - a mobile app for the parts of the workflow that genuinely need it.',
        ],
      },
    ],
  },
  {
    slug: 'true-cost-of-custom-software-ghana',
    title: 'The True Cost of Custom Software (And What Actually Drives It)',
    excerpt:
      'Software quotes can look wildly different for what sounds like the same project. Here\'s what actually determines cost - and how to budget realistically.',
    date: '2026-05-06',
    category: 'Business Software',
    readTime: '6 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          '"How much will it cost?" is almost always the first question, and it\'s a fair one. But the honest answer is always "it depends" - so here\'s what it actually depends on.',
        ],
      },
      {
        heading: 'Scope, not size, drives cost',
        paragraphs: [
          'A five-page marketing website and a five-screen booking system with payments, notifications, and an admin dashboard are both "small" by page count, but wildly different in cost - because cost tracks the number of workflows and edge cases, not the number of screens.',
        ],
      },
      {
        heading: 'Integrations add real cost',
        paragraphs: [
          'Every third-party connection - a payment gateway, an SMS provider, a mapping API, an existing internal system - adds design, testing, and error-handling work beyond the integration itself. A project with three integrations isn\'t three times harder, but it\'s meaningfully more than one.',
        ],
      },
      {
        heading: 'Data migration is often underestimated',
        paragraphs: [
          'If you\'re moving off spreadsheets or an old system, getting existing records into clean, usable shape in the new system is frequently a bigger task than building the new features themselves.',
        ],
      },
      {
        heading: 'Ongoing cost is part of the real number',
        paragraphs: [
          'Hosting, domain renewal, and maintenance are recurring costs that outlast the build. A cheap build with no plan for support is often more expensive over two years than a slightly higher upfront investment with a maintenance plan attached.',
        ],
      },
      {
        heading: 'How we quote',
        paragraphs: [
          'We scope projects around the specific workflows involved, not a generic price list, because two projects that sound similar rarely cost the same. We accept payment via Mobile Money (MTN, Vodafone, AirtelTigo) and bank transfer, typically structured in milestones tied to project phases. Reach out for a free, honest assessment of what your project would actually take.',
        ],
      },
    ],
  },
  {
    slug: 'launching-website-checklist',
    title: 'The Pre-Launch Checklist We Run on Every Website',
    excerpt:
      'Before any site we build goes live, it goes through the same checklist. Here it is - steal it for your own launch.',
    date: '2026-06-12',
    category: 'Web Development',
    readTime: '5 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          'A launch is not "the code works." It\'s the point where real customers, search engines, and payment providers start depending on the site. This is the checklist we run through before that happens.',
        ],
      },
      {
        heading: 'Findable',
        paragraphs: [
          'A sitemap.xml and robots.txt so search engines can crawl the site properly. Canonical tags on every page so search engines know which URL is the "real" one. Submission to Google Search Console so indexing is tracked, not assumed.',
        ],
      },
      {
        heading: 'Trustworthy at a glance',
        paragraphs: [
          'A real favicon so the site doesn\'t look abandoned in a browser tab. A visible, working contact email and a tap-to-call phone number on mobile - not a contact form as the only option. Working links to any social profiles that are actually listed, and nothing linking to an account that doesn\'t exist yet.',
        ],
      },
      {
        heading: 'Usable on a bad connection',
        paragraphs: [
          'Compressed images - this alone is often the single biggest speed win available on a content-heavy site. Clear error messages on every form field, so a failed submission tells the visitor exactly what to fix instead of silently failing.',
        ],
      },
      {
        heading: 'Compliant',
        paragraphs: [
          'A cookie consent banner if analytics are in use, plus a Privacy Policy and Terms of Service that actually reflect what the site does - not a generic template copied from elsewhere.',
        ],
      },
      {
        heading: 'Ready to answer the questions people actually have',
        paragraphs: [
          'Opening hours, clear payment methods, and - where relevant - a guarantee or warranty statement. These sound minor individually, but together they\'re often the difference between a visitor who converts and one who leaves to "think about it."',
        ],
      },
      {
        heading: 'The takeaway',
        paragraphs: [
          'None of these items are hard individually. The value is in running through all of them, every time, instead of assuming the last launch covered it. That discipline is what separates a site that quietly loses trust from one that earns it.',
        ],
      },
    ],
  },
  {
    slug: 'what-makes-a-good-ngo-nonprofit-website',
    title: 'What a Good NGO or Foundation Website Actually Needs',
    excerpt:
      'Nonprofits have a different website job than a business: build trust with a stranger fast enough that they donate, volunteer, or share. Here\'s what that takes.',
    date: '2026-10-08',
    category: 'Nonprofit',
    readTime: '5 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          'We\'ve built websites for several NGOs and foundations - including Gusty Women Foundation, Mankind Foundation Ghana, Thrive Edu, and community platforms like Obuasi Links and the Bia East District site. The brief is always different, but the job the website has to do is the same: turn a stranger\'s attention into trust, fast, because most visitors won\'t stay long enough to be persuaded slowly.',
        ],
      },
      {
        heading: 'Lead with mission, not mission statement',
        paragraphs: [
          'Every one of these sites puts the mission and vision near the top, in plain language, before any history or structure. A visitor deciding whether to donate or volunteer is asking "what does this organisation actually do," not "when was it founded." Answer that question in the first screen.',
        ],
      },
      {
        heading: 'Programs need to be concrete, not aspirational',
        paragraphs: [
          'A generic "we empower communities" page doesn\'t build trust. Showing specific programs and initiatives - what they are, who they\'re for - gives a visitor something real to evaluate. This is one of the most-used sections on both Gusty Women Foundation\'s and Mankind Foundation Ghana\'s sites.',
        ],
      },
      {
        heading: 'Impact stories do more work than statistics alone',
        paragraphs: [
          'Numbers matter, but a named story - one person, one program, one outcome - is what visitors actually remember and share. We build dedicated impact-story sections for exactly this reason, separate from the general programs page.',
        ],
      },
      {
        heading: 'Make the ask obvious and frictionless',
        paragraphs: [
          'Donation and volunteer sign-up need to be one click from anywhere on the site, not buried three menus deep. If someone has read enough to be convinced, the next step should already be in front of them.',
        ],
      },
      {
        heading: 'Community and district platforms have a different job: being useful',
        paragraphs: [
          'Not every mission-driven site is asking for a donation. Obuasi Links and the Bia East District platform exist to serve their communities directly - resource directories, service listings, and in the district\'s case, geographic mapping data. The design bar there is usefulness and findability, not persuasion.',
        ],
      },
      {
        heading: 'Keep it current',
        paragraphs: [
          'A programs page or impact section that hasn\'t changed in a year quietly signals that the organisation has gone quiet too, even if the work hasn\'t stopped. News and events updates are a small section but one of the easiest places to lose a visitor\'s trust if left stale.',
        ],
      },
    ],
  },
  {
    slug: 'what-makes-a-good-school-management-system',
    title: 'What Makes a Good School Management System',
    excerpt:
      'Fees, attendance, exam results, and parent communication all have to work together without extra admin. Here\'s what we\'ve learned building school systems.',
    date: '2026-10-09',
    category: 'Education',
    readTime: '5 min read',
    author: 'Ecstasy Technologies',
    body: [
      {
        paragraphs: [
          'A school website and a school management system solve two completely different problems, and it\'s worth separating them. Bubbly Kids Academy\'s site is about admissions and first impressions - programs, methodology, a gallery, a way to enquire. The MoldGold School Management System we built is about what happens after a student is already enrolled: the daily operational load a school carries every term.',
        ],
      },
      {
        heading: 'Records need one home, not three',
        paragraphs: [
          'Student records, staff records, and academic history are often spread across admissions forms, a separate staff file, and whatever the previous system left behind. MoldGold\'s system brings all of it into one place, so a teacher or administrator isn\'t cross-referencing three sources to answer a simple question about a student.',
        ],
      },
      {
        heading: 'Fee collection has to match how parents actually pay',
        paragraphs: [
          'A fee and payment module that doesn\'t reflect the school\'s actual billing terms - termly fees, part-payments, different rates per grade - creates more manual reconciliation than it saves. This is one of the modules worth scoping carefully before any code is written, not after.',
        ],
      },
      {
        heading: 'Exam results shouldn\'t be a spreadsheet exercise every term',
        paragraphs: [
          'Compiling results by hand across classes and subjects is exactly the kind of repetitive, error-prone work software should remove. An exam and results module that staff trust enough to stop keeping a parallel spreadsheet "just in case" is the real measure of success here.',
        ],
      },
      {
        heading: 'Parents want visibility, not a portal to learn',
        paragraphs: [
          'A parent and teacher communication portal only gets used if it\'s simpler than a phone call or a WhatsApp message - attendance, results, and announcements that a parent can check in seconds, not a system that needs training to navigate.',
        ],
      },
      {
        heading: 'Attendance tracking feeds everything else',
        paragraphs: [
          'Daily attendance sounds like a small feature, but it quietly underpins reporting, fee policies tied to attendance, and early flags for students who need support. It\'s worth getting right early rather than retrofitting later.',
        ],
      },
      {
        heading: 'The dashboard is for the person who has five minutes',
        paragraphs: [
          'Head teachers and administrators don\'t have time to dig through modules to understand how the term is going. A reports and analytics dashboard that surfaces enrollment, fee collection, and attendance trends at a glance is what turns a system from a record-keeper into a management tool.',
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
