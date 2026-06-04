import CommutesWidget from '@/components/CommutesWidget';
import { Metadata } from 'next';
import './commutes.css';

export const metadata: Metadata = {
  title: 'Commute Time Estimator | Ecstasy Technologies',
  description: 'Estimate commute times and get directions to multiple destinations with our interactive map tool.',
};

export default function CommutesPage() {
  const config = {
    defaultTravelMode: 'DRIVING' as const,
    distanceMeasurementType: 'IMPERIAL' as const,
    mapOptions: {
      center: { lat: 6.4610857, lng: -2.3172324 }, // Default center (Ghana)
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 14,
      zoomControl: true,
      maxZoom: 20,
      mapId: '',
    },
  };

  return (
    <div className="commutes-page-wrapper">
      <CommutesWidget config={config} />
    </div>
  );
}
