import {resetMap}from './map.js';
import {pristine} from './form-validate.js';
import {resetImage} from './form-images.js';

const filterFormElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const adFormSliderElement = document.querySelector('.ad-form__slider');

const resetAdForm = () => {
  filterFormElement.reset();
  adFormElement.reset();
  pristine.reset();
  adFormSliderElement.noUiSlider.reset();
  resetMap();
  resetImage();
};

export {resetAdForm};
