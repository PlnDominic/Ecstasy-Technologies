# Ecstasy Technologies - Promotional Video

A professional promotional video created with Remotion for Ecstasy Technologies.

## Video Structure

The video is **15 seconds** long (450 frames at 30fps) and consists of 4 scenes:

1. **Hero Scene** (4 seconds)
   - Company logo animation
   - Company name and tagline
   - Service category icons (Websites, Web Apps, Mobile Apps, Business Software)

2. **Services Scene** (5 seconds)
   - "Our Services" title
   - 6 service cards with descriptions:
     - Custom Software Development
     - Web Application Development
     - Mobile App Development
     - UI/UX Design
     - Digital Transformation
     - Cloud Solutions

3. **Projects Scene** (4 seconds)
   - "Featured Projects" title
   - 3 project showcase cards:
     - Lavimac Royal Hotel (Website)
     - Dynamic Shipping & Logistics (Web Application)
     - Obotan Credit Union App (Mobile App)
   - Company statistics (50+ Projects, 30+ Clients, 5+ Years)

4. **Outro Scene** (3 seconds)
   - Call to action: "Ready to Transform Your Business?"
   - "Get in Touch" button
   - Contact information (Website, Email, Location)

## Technical Specifications

- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30fps
- **Duration**: 15 seconds (450 frames)
- **Format**: MP4

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

```bash
cd video
npm install
```

### Development

Preview the video in the Remotion Studio:

```bash
npm run dev
```

This will start the Remotion Studio at `http://localhost:3000` where you can:
- Preview all scenes individually
- Adjust timing and animations
- Test different compositions

### Rendering

Build the final video:

```bash
npm run build
```

The rendered video will be saved to `video/out/video.mp4`.

## Project Structure

```
video/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx              # Compositions and folders
│   ├── PromoVideo.tsx        # Main video with transitions
│   └── scenes/
│       ├── HeroScene.tsx     # Hero/intro scene
│       ├── ServicesScene.tsx # Services showcase
│       ├── ProjectsScene.tsx # Projects showcase
│       └── OutroScene.tsx    # CTA/outro scene
├── package.json
├── tsconfig.json
└── README.md
```

## Animations & Transitions

Following Remotion best practices:

- **Spring animations** for natural motion
- **Interpolate** for smooth value transitions
- **TransitionSeries** for scene transitions:
  - Fade transitions between Hero → Services and Projects → Outro
  - Slide transition (from-right) between Services → Projects
- **Staggered animations** for service cards and project cards

## Customization

### Colors

The video uses the following color scheme (matching the website):
- Background: Dark gradients (#000000 to #1a1a2e)
- Primary accents: Purple (#8B5CF6), Blue (#3B82F6), Green (#10B981), Yellow (#F59E0B)
- Text: White (#FFFFFF) and Gray (#9CA3AF)

### Timing

To adjust scene durations, modify the `durationInFrames` values in:
- `src/Root.tsx` - for individual scene compositions
- `src/PromoVideo.tsx` - for the main video sequence

## License

Proprietary - Ecstasy Technologies
