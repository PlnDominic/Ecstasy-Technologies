export function createCommutesClass(google: any) {
  const MAX_NUM_DESTINATIONS = 10;
  const BIAS_BOUND_DISTANCE = 0.5;
  const HOUR_IN_SECONDS = 3600;
  const MIN_IN_SECONDS = 60;

  const STROKE_COLORS = {
    active: {
      innerStroke: '#4285F4',
      outerStroke: '#185ABC',
    },
    inactive: {
      innerStroke: '#BDC1C6',
      outerStroke: '#80868B',
    },
  };

  const MARKER_ICON_COLORS = {
    active: {
      fill: '#EA4335',
      stroke: '#C5221F',
      label: '#FFF',
    },
    inactive: {
      fill: '#F1F3F4',
      stroke: '#9AA0A6',
      label: '#3C4043',
    },
  };

  const DestinationOperation = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
  };

  const TravelMode = {
    DRIVING: 'DRIVING',
    TRANSIT: 'TRANSIT',
    BICYCLING: 'BICYCLING',
    WALKING: 'WALKING',
  };

  function hideElement(el: HTMLElement, focusEl?: HTMLElement) {
    el.style.display = 'none';
    if (focusEl) focusEl.focus();
  }

  function showElement(el: HTMLElement, focusEl?: HTMLElement) {
    el.style.display = 'flex';
    if (focusEl) focusEl.focus();
  }

  function handleScrollButtonClick(this: any, e: any) {
    const multiplier = 1.25;
    const direction = e.target.dataset.direction;
    const destinationPanelEl = this.destinationPanelEl;
    const cardWidth = destinationPanelEl.list.firstElementChild.offsetWidth;

    destinationPanelEl.container.scrollBy({
      left: direction * cardWidth * multiplier,
      behavior: 'smooth',
    });
  }

  function handlePanelScroll(destinationPanelEl: any) {
    return function () {
      const position = destinationPanelEl.container.scrollLeft;
      const scrollWidth = destinationPanelEl.container.scrollWidth;
      const width = destinationPanelEl.container.offsetWidth;

      if (scrollWidth > width) {
        if (position === 0) {
          destinationPanelEl.scrollLeftButton.classList.remove('visible');
        } else {
          destinationPanelEl.scrollLeftButton.classList.add('visible');
        }

        if (Math.ceil(position + width) >= scrollWidth) {
          destinationPanelEl.scrollRightButton.classList.remove('visible');
        } else {
          destinationPanelEl.scrollRightButton.classList.add('visible');
        }
      }
    };
  }

  function generateDestinationTemplate(destination: any) {
    const travelModeIconName = destination.travelModeEnum.toLowerCase();
    return `
      <div class="destination" tabindex="0" role="button">
        <div class="destination-content">
          <div class="metadata">
            <span class="travel-icon">${travelModeIconName}</span>
            ${destination.distance}
            <span>→</span>
            <span class="location-marker">${destination.label}</span>
          </div>
          <div class="address">To
            <abbr title="${destination.name}">${destination.name}</abbr>
          </div>
          <div class="destination-eta">${destination.duration}</div>
        </div>
      </div>

      <div class="destination-controls">
        <a class="directions-button" href="${destination.url}" target="_blank"
           aria-label="Link to directions in Google Maps">
          ↗
        </a>
        <button class="edit-button" aria-label="Edit Destination">
          Edit
        </button>
      </div>`;
  }

  function convertDurationValueAsString(durationValue: number) {
    if (!durationValue) {
      return '';
    }
    if (durationValue < MIN_IN_SECONDS) {
      return '<1 min';
    }
    if (durationValue > HOUR_IN_SECONDS * 10) {
      return '10+ hours';
    }
    const hours = Math.floor(durationValue / HOUR_IN_SECONDS);
    const minutes = Math.floor((durationValue % HOUR_IN_SECONDS) / 60);
    const hoursString = hours > 0 ? hours + ' h' : '';
    const minutesString = minutes > 0 ? minutes + ' min' : '';
    const spacer = hoursString && minutesString ? ' ' : '';
    return hoursString + spacer + minutesString;
  }

  class Commutes {
    private configuration: any;
    private mapContainer: HTMLElement;
    private commutesMap: any;
    private activeDestinationIndex: number | undefined;
    private origin: any;
    private destinations: any[];
    private markerIndex: number;
    private lastActiveEl: any;
    private commutesEl: any;
    private destinationPanelEl: any;
    private destinationModalEl: any;
    private markerIconConfig: any;
    private originMarkerIcon: any;
    private destinationMarkerIcon: any;
    private bikeLayer: any;
    private publicTransitLayer: any;

    constructor(configuration: any, mapContainer: HTMLElement) {
      this.configuration = configuration;
      this.mapContainer = mapContainer;
      this.activeDestinationIndex = undefined;
      this.origin = configuration.mapOptions.center;
      this.destinations = configuration.destination || [];
      this.markerIndex = 0;
      this.lastActiveEl = null;

      this.commutesEl = {
        map: mapContainer,
        initialStatePanel: document.querySelector('.commutes-initial-state'),
        destinationPanel: document.querySelector('.commutes-destinations'),
        modal: document.querySelector('.commutes-modal-container'),
      };

      this.destinationPanelEl = {
        addButton: this.commutesEl.destinationPanel.querySelector('.add-button'),
        container: this.commutesEl.destinationPanel.querySelector('.destinations-container'),
        list: this.commutesEl.destinationPanel.querySelector('.destination-list'),
        scrollLeftButton: this.commutesEl.destinationPanel.querySelector('.left-control'),
        scrollRightButton: this.commutesEl.destinationPanel.querySelector('.right-control'),
        getActiveDestination: () => this.commutesEl.destinationPanel.querySelector('.destination.active'),
      };

      this.destinationModalEl = {
        title: this.commutesEl.modal.querySelector('h2'),
        form: this.commutesEl.modal.querySelector('form'),
        destinationInput: this.commutesEl.modal.querySelector('input[name="destination-address"]'),
        errorMessage: this.commutesEl.modal.querySelector('.error-message'),
        addButton: this.commutesEl.modal.querySelector('.add-destination-button'),
        deleteButton: this.commutesEl.modal.querySelector('.delete-destination-button'),
        editButton: this.commutesEl.modal.querySelector('.edit-destination-button'),
        cancelButton: this.commutesEl.modal.querySelector('.cancel-button'),
        getTravelModeInput: () => this.commutesEl.modal.querySelector('input[name="travel-mode"]:checked'),
      };

      this.markerIconConfig = {
        path: 'M10 27c-.2 0-.2 0-.5-1-.3-.8-.7-2-1.6-3.5-1-1.5-2-2.7-3-3.8-2.2-2.8-3.9-5-3.9-8.8C1 4.9 5 1 10 1s9 4 9 8.9c0 3.9-1.8 6-4 8.8-1 1.2-1.9 2.4-2.8 3.8-1 1.5-1.4 2.7-1.6 3.5-.3 1-.4 1-.6 1Z',
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new google.maps.Point(15, 29),
        scale: 1.2,
        labelOrigin: new google.maps.Point(10, 9),
      };

      this.originMarkerIcon = {
        ...this.markerIconConfig,
        fillColor: MARKER_ICON_COLORS.active.fill,
        strokeColor: MARKER_ICON_COLORS.active.stroke,
      };

      this.destinationMarkerIcon = {
        ...this.markerIconConfig,
        fillColor: MARKER_ICON_COLORS.inactive.fill,
        strokeColor: MARKER_ICON_COLORS.inactive.stroke,
      };

      this.bikeLayer = new google.maps.BicyclingLayer();
      this.publicTransitLayer = new google.maps.TransitLayer();

      this.initMapView();
      this.initDestinations();
      this.initCommutesPanel();
      this.initCommutesModal();
    }

    private initMapView() {
      const mapOptionConfig = this.configuration.mapOptions;
      this.commutesMap = new google.maps.Map(this.mapContainer, mapOptionConfig);

      this.configuration.defaultTravelModeEnum = this.parseTravelModeEnum(
        this.configuration.defaultTravelMode
      );
      this.setTravelModeLayer(this.configuration.defaultTravelModeEnum);
      this.createMarker(this.origin);
    }

    private initDestinations() {
      if (!this.configuration.initialDestinations) return;
      // Implementation would go here - similar to original
    }

    private initCommutesPanel() {
      const addCommutesButtonEls = document.querySelectorAll('.add-button');
      addCommutesButtonEls.forEach((addButton) => {
        addButton.addEventListener('click', () => {
          this.destinationModalEl.title.innerHTML = 'Add destination';
          hideElement(this.destinationModalEl.deleteButton);
          hideElement(this.destinationModalEl.editButton);
          showElement(this.destinationModalEl.addButton);
          this.showModal();
          const travelModeEnum =
            this.configuration.defaultTravelModeEnum || TravelMode.DRIVING;
          const travelModeId = travelModeEnum.toLowerCase() + '-mode';
          const form = document.forms.namedItem('destination-form') as HTMLFormElement | null;
          if (form && form[travelModeId]) {
            form[travelModeId].checked = true;
          }
        });
      });

      this.destinationPanelEl.scrollLeftButton.addEventListener(
        'click',
        handleScrollButtonClick.bind(this)
      );
      this.destinationPanelEl.scrollRightButton.addEventListener(
        'click',
        handleScrollButtonClick.bind(this)
      );
    }

    private initCommutesModal() {
      // Modal initialization logic
      this.destinationModalEl.cancelButton.addEventListener('click', () => {
        this.hideModal();
      });
    }

    private parseTravelModeEnum(travelModeString: string) {
      switch (travelModeString) {
        case 'DRIVING':
          return TravelMode.DRIVING;
        case 'BICYCLING':
          return TravelMode.BICYCLING;
        case 'PUBLIC_TRANSIT':
          return TravelMode.TRANSIT;
        case 'WALKING':
          return TravelMode.WALKING;
        default:
          return null;
      }
    }

    private setTravelModeLayer(travelModeEnum: string) {
      switch (travelModeEnum) {
        case TravelMode.BICYCLING:
          this.publicTransitLayer.setMap(null);
          this.bikeLayer.setMap(this.commutesMap);
          break;
        case TravelMode.TRANSIT:
          this.bikeLayer.setMap(null);
          this.publicTransitLayer.setMap(this.commutesMap);
          break;
        default:
          this.publicTransitLayer.setMap(null);
          this.bikeLayer.setMap(null);
      }
    }

    private createMarker(location: any, label?: string) {
      const isOrigin = label === undefined;
      const markerIconConfig = isOrigin
        ? this.originMarkerIcon
        : this.destinationMarkerIcon;
      const labelColor = isOrigin
        ? MARKER_ICON_COLORS.active.label
        : MARKER_ICON_COLORS.inactive.label;
      const labelText = isOrigin ? '●' : label;

      const mapOptions: any = {
        position: location,
        map: this.commutesMap,
        label: {
          text: labelText,
          fontFamily: 'Arial, sans-serif',
          color: labelColor,
          fontSize: '16px',
        },
        icon: markerIconConfig,
      };

      if (isOrigin) {
        mapOptions.label.className += ' origin-pin-label';
        mapOptions.label.fontSize = '20px';
      }

      return new google.maps.Marker(mapOptions);
    }

    private showModal() {
      this.lastActiveEl = document.activeElement;
      showElement(this.commutesEl.modal, this.destinationModalEl.destinationInput);
    }

    private hideModal(focusEl?: HTMLElement) {
      hideElement(this.commutesEl.modal, focusEl || this.lastActiveEl);
    }
  }

  return Commutes;
}
