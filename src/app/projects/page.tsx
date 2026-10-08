import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Our Projects | Ecstasy Technologies - Software Company in Ghana',
  description:
    'Browse websites, web applications, mobile apps, and business software built by Ecstasy Technologies for clients across Ghana and beyond.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Our Projects | Ecstasy Technologies',
    description:
      'Websites, web applications, mobile apps, and business software built by Ecstasy Technologies.',
    url: '/projects',
    images: ['/logo.png'],
  },
};

export default function Projects() {
  return <ProjectsClient />;
}
