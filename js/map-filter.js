import {FILTER_PRICE_VALUES, DEBOUNCE_TIMEOUT_DELAY} from './const.js';
import {markersLayer} from './map.js';
import {insertBalloonsOnMap} from './ads.js';
import {ADS_COUNT} from './const.js';
import {debounce} from './utils.js';

const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElements = mapFiltersElement.querySelectorAll('#housing-features > input');

const getFilterAdByType = (ad, type) => type === 'any' || ad.offer.type === type;

const getFilterAdByPrice = (ad, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return ad.offer.price < FILTER_PRICE_VALUES.low;
    case 'middle':
      return ad.offer.price >= FILTER_PRICE_VALUES.low && ad.offer.price <= FILTER_PRICE_VALUES.high;
    case 'high':
      return ad.offer.price > FILTER_PRICE_VALUES.high;
  }
};

const getFilterAdByRoomsCount = (ad, roomsCount) => roomsCount === 'any' || ad.offer.rooms === Number(roomsCount);

const getFilterAdByGuestsCount = (ad, guestsCount) => guestsCount === 'any' || ad.offer.guests === Number(guestsCount);

const getFilterAdByFeatures = (ad, features) => {
  if (!features.length) {
    return true;
  }

  if (!ad.offer.features) {
    return false;
  }

  return features.every((feature) => ad.offer.features.includes(feature));
};

const getSelectedFeatures = (features) => {
  const selectedFeaturesValues = [];
  Array.from(features).forEach((feature) => {
    if (feature.checked) {
      selectedFeaturesValues.push(feature.value);
    }
  });

  return selectedFeaturesValues;
};

const filterSimilarAdsNearby = (ads) => {
  const filteredAds = [];

  for (const ad of ads) {
    if (filteredAds.length >= ADS_COUNT) {
      break;
    }

    if (
      getFilterAdByType(ad, housingTypeElement.value) &&
      getFilterAdByPrice(ad, housingPriceElement.value) &&
      getFilterAdByRoomsCount(ad, housingRoomsElement.value) &&
      getFilterAdByGuestsCount(ad, housingGuestsElement.value) &&
      getFilterAdByFeatures(ad, getSelectedFeatures(housingFeaturesElements))
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

const mapFilterHandler = (ads) => {
  markersLayer.clearLayers();
  insertBalloonsOnMap(filterSimilarAdsNearby(ads));
};

const setFilterAdsContent = (ads) => {
  mapFiltersElement.addEventListener('change', debounce(() => mapFilterHandler(ads), DEBOUNCE_TIMEOUT_DELAY));
};

export {setFilterAdsContent};
