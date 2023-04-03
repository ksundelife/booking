import {CENTER_OF_TOKYO} from './const.js';

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  CENTER_OF_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setInAddressFieldLatLng = (lat, lng) => {
  document.querySelector('#address').value = `${lat}, ${lng}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    setInAddressFieldLatLng(CENTER_OF_TOKYO.lat, CENTER_OF_TOKYO.lng);
  })
  .setView(CENTER_OF_TOKYO, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  setInAddressFieldLatLng(evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5));
});

const markersLayer = L.layerGroup().addTo(map);

const createMapBalloon = (location, icon, content) => {
  const marker = L.marker(
    location,
    {
      icon,
    },
  );
  marker
    .addTo(markersLayer)
    .bindPopup(content);
};

const resetMap = () => {
  map.setView(CENTER_OF_TOKYO, 12);
  map.closePopup();
  mainPinMarker.setLatLng(CENTER_OF_TOKYO);
};

export {
  createMapBalloon,
  pinIcon,
  markersLayer,
  resetMap
};
