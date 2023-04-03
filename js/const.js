const SHOW_MESSAGE_CONTAINER_DURATION = 5000;
const MAX_HOUSING_PRICE = 100000;
const ADS_COUNT = 10;
const DEBOUNCE_TIMEOUT_DELAY = 500;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_FILE_PATH = 'img/muffin-grey.svg';

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const MIN_PRICE_BY_HOUSING_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const CENTER_OF_TOKYO = {
  lat: 35.68323,
  lng: 139.75364
};

const HOUSING_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const FILTER_PRICE_VALUES = {
  low: 10000,
  high: 50000
};

export {
  MIN_PRICE_BY_HOUSING_TYPE,
  MAX_HOUSING_PRICE,
  ROOMS_CAPACITY,
  CENTER_OF_TOKYO,
  HOUSING_TYPES,
  SHOW_MESSAGE_CONTAINER_DURATION,
  ADS_COUNT,
  FILTER_PRICE_VALUES,
  DEBOUNCE_TIMEOUT_DELAY,
  DEFAULT_AVATAR_FILE_PATH,
  FILE_TYPES
};
