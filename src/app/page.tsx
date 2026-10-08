import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Ecstasy Technologies | Custom Software Development in Ghana',
  description:
    'Ecstasy Technologies builds websites, mobile apps, and business software for companies in Ghana. See our work and start your project today.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Ecstasy Technologies | Custom Software Development in Ghana',
    description:
      'We build websites, mobile apps, and business software for companies in Ghana.',
    url: '/',
    images: ['/logo.png'],
  },
};

export default function Home() {
  return <HomeClient />;
}
