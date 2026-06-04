'use client';

import { useEffect, useRef, useState } from 'react';

interface MapOptions {
  center: { lat: number; lng: number };
  fullscreenControl?: boolean;
  mapTypeControl?: boolean;
  streetViewControl?: boolean;
  zoom?: number;
  zoomControl?: boolean;
  maxZoom?: number;
  mapId?: string;
}

interface CommutesConfig {
  defaultTravelMode: 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING';
  distanceMeasurementType: 'METRIC' | 'IMPERIAL';
  mapOptions: MapOptions;
  initialDestinations?: Array<{
    placeId: string;
    travelMode: string;
  }>;
}

interface CommutesWidgetProps {
  config?: Partial<CommutesConfig>;
}

export default function CommutesWidget({ config }: CommutesWidgetProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultConfig: CommutesConfig = {
    defaultTravelMode: 'DRIVING',
    distanceMeasurementType: 'IMPERIAL',
    mapOptions: {
      center: { lat: 6.4610857, lng: -2.3172324 },
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 14,
      zoomControl: true,
      maxZoom: 20,
      mapId: '',
    },
    ...config,
  };

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key is not configured');
      return;
    }

    if (typeof window === 'undefined') return;

    const loadScript = () => {
      if ((window as any).google?.maps) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&solution_channel=GMP_QB_commutes_v3_c`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setError('Failed to load Google Maps');
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current) return;

    const initCommutes = () => {
      if (!(window as any).google?.maps) return;

      const Commutes = require('./commutes-logic').createCommutesClass(
        (window as any).google
      );
      new Commutes(defaultConfig, mapContainerRef.current);
    };

    initCommutes();
  }, [isLoaded, defaultConfig]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="commutes-container" style={{ height: '100vh', width: '100%' }}>
      <main className="commutes">
        <div className="commutes-map" aria-label="Map">
          <div className="map-view" ref={mapContainerRef}></div>
        </div>

        <div className="commutes-info">
          <div className="commutes-initial-state">
            <svg
              aria-label="Directions Icon"
              width="53"
              height="53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41 20H18.6c-9.5 0-10.8 13.5 0 13.5h14.5C41 33.5 41 45 33 45H17.7"
                stroke="#D2E3FC"
                strokeWidth="5"
              />
              <path
                d="M41 22c.2 0 .4 0 .6-.2l.4-.5c.3-1 .7-1.7 1.1-2.5l2-3c.8-1 1.5-2 2-3 .6-1 .9-2.3.9-3.8 0-2-.7-3.6-2-5-1.4-1.3-3-2-5-2s-3.6.7-5 2c-1.3 1.4-2 3-2 5 0 1.4.3 2.6.8 3.6s1.2 2 2 3.2c.9 1 1.6 2 2 2.8.5.9 1 1.7 1.2 2.7l.4.5.6.2Zm0-10.5c-.7 0-1.3-.2-1.8-.7-.5-.5-.7-1.1-.7-1.8s.2-1.3.7-1.8c.5-.5 1.1-.7 1.8-.7s1.3.2 1.8.7c.5.5.7 1.1.7 1.8s-.2 1.3-.7 1.8c-.5.5-1.1.7-1.8.7Z"
                fill="#185ABC"
              />
              <path d="m12 32-8 6v12h5v-7h6v7h5V38l-8-6Z" fill="#4285F4" />
            </svg>
            <div className="description">
              <h1 className="heading">Estimate commute time</h1>
              <p>See travel time and directions for places nearby</p>
            </div>
            <button className="add-button" autoFocus>
              <svg
                aria-label="Add Icon"
                width="24px"
                height="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span className="label">Add destination</span>
            </button>
          </div>

          <div className="commutes-destinations">
            <div className="destinations-container">
              <div className="destination-list"></div>
              <button className="add-button">
                <svg
                  aria-label="Add Icon"
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                <div className="label">Add destination</div>
              </button>
            </div>
            <button
              className="left-control hide"
              data-direction="-1"
              aria-label="Scroll left"
            >
              <svg
                width="24px"
                height="24px"
                xmlns="http://www.w3.org/2000/svg"
                data-direction="-1"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
              </svg>
            </button>
            <button
              className="right-control hide"
              data-direction="1"
              aria-label="Scroll right"
            >
              <svg
                width="24px"
                height="24px"
                xmlns="http://www.w3.org/2000/svg"
                data-direction="1"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      <div className="commutes-modal-container">
        <div
          className="commutes-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-edit-heading"
        >
          <div className="content">
            <h2 id="add-edit-heading" className="heading">
              Add destination
            </h2>
            <form id="destination-form">
              <input
                type="text"
                id="destination-address-input"
                name="destination-address"
                placeholder="Enter a place or address"
                autoComplete="off"
                required
              />
              <div className="error-message" role="alert"></div>
              <div className="travel-modes">
                <input
                  type="radio"
                  name="travel-mode"
                  id="driving-mode"
                  value="DRIVING"
                  aria-label="Driving travel mode"
                />
                <label htmlFor="driving-mode" className="left-label" title="Driving travel mode">
                  <svg aria-label="Driving icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
                    <circle cx="7.5" cy="14.5" r="1.5" />
                    <circle cx="16.5" cy="14.5" r="1.5" />
                  </svg>
                </label>
                <input
                  type="radio"
                  name="travel-mode"
                  id="transit-mode"
                  value="TRANSIT"
                  aria-label="Public transit travel mode"
                />
                <label htmlFor="transit-mode" title="Public transit travel mode">
                  <svg aria-label="Public transit icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zm5.66 3H6.43c.61-.52 2.06-1 5.57-1 3.71 0 5.12.46 5.66 1zM11 7v3H6V7h5zm2 0h5v3h-5V7zm3.5 10h-9c-.83 0-1.5-.67-1.5-1.5V12h12v3.5c0 .83-.67 1.5-1.5 1.5z" />
                    <circle cx="8.5" cy="14.5" r="1.5" />
                    <circle cx="15.5" cy="14.5" r="1.5" />
                  </svg>
                </label>
                <input
                  type="radio"
                  name="travel-mode"
                  id="bicycling-mode"
                  value="BICYCLING"
                  aria-label="Bicycling travel mode"
                />
                <label htmlFor="bicycling-mode" title="Bicycling travel mode">
                  <svg aria-label="Bicycling icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
                  </svg>
                </label>
                <input
                  type="radio"
                  name="travel-mode"
                  id="walking-mode"
                  value="WALKING"
                  aria-label="Walking travel mode"
                />
                <label htmlFor="walking-mode" className="right-label" title="Walking travel mode">
                  <svg aria-label="Walking icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7" />
                  </svg>
                </label>
              </div>
            </form>
            <div className="modal-action-bar">
              <button className="delete-destination-button hide" type="reset">
                Delete
              </button>
              <button className="cancel-button" type="reset">
                Cancel
              </button>
              <button className="add-destination-button" type="button">
                Add
              </button>
              <button className="edit-destination-button hide" type="button">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .commutes {
          align-content: stretch;
          color: #202124;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          font-family: Arial, sans-serif;
          height: 100%;
          min-height: 256px;
          min-width: 360px;
          overflow: auto;
          width: 100%;
        }

        .commutes-info {
          flex: 0 0 110px;
          max-width: 100%;
          overflow: hidden;
        }

        .commutes-initial-state {
          border-radius: 8px;
          border: 1px solid #dadce0;
          display: flex;
          height: 98px;
          margin-top: 8px;
          padding: 0 16px;
        }

        .commutes-initial-state svg {
          align-self: center;
        }

        .commutes-initial-state .description {
          align-self: center;
          flex-grow: 1;
          padding: 0 16px;
        }

        .commutes-initial-state .description .heading {
          font: 22px/28px Arial, sans-serif;
          margin: 0;
        }

        .commutes-initial-state .description p {
          color: #5f6368;
          font: 13px/20px Arial, sans-serif;
          margin: 0;
        }

        .commutes-initial-state .add-button {
          align-self: center;
          background-color: #1a73e8;
          border-color: #1a73e8;
          border-radius: 4px;
          border-style: solid;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          fill: #fff;
          padding: 8px 16px 8px 8px;
          white-space: nowrap;
        }

        .commutes-initial-state .add-button .label {
          font: normal 600 15px/24px Arial, sans-serif;
          padding-left: 8px;
        }

        .commutes-map {
          flex: 1;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .commutes-map .map-view {
          background-color: rgb(229, 227, 223);
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        .commutes-destinations {
          display: none;
          position: relative;
          width: 100%;
        }

        .commutes-modal-container {
          align-items: center;
          background-color: rgba(0, 0, 0, 0.4);
          display: none;
          height: 100%;
          justify-content: center;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
        }

        .commutes-modal {
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
            0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12);
          height: 256px;
          position: absolute;
          width: 360px;
        }

        .hide {
          display: none;
        }

        /* Additional styles would be imported from a CSS module or global stylesheet */
      `}</style>
    </div>
  );
}
