import {pristine} from './form-validate.js';
import {MAX_HOUSING_PRICE, MIN_PRICE_BY_HOUSING_TYPE} from './const.js';

const adFormElement = document.querySelector('.ad-form');
const housingPriceSliderElement = adFormElement.querySelector('.ad-form__slider');
const housingTypeElement = adFormElement.querySelector('#type');
const housingPriceElement = adFormElement.querySelector('#price');

noUiSlider.create(housingPriceSliderElement, {
  range: {
    min: 0,
    max: MAX_HOUSING_PRICE,
  },
  start: MIN_PRICE_BY_HOUSING_TYPE[housingTypeElement.value],
  step: 1,
  connect: 'lower',
});

housingPriceSliderElement.noUiSlider.on('update', () => {
  housingPriceElement.value = Number(housingPriceSliderElement.noUiSlider.get()).toFixed(0);
  pristine.validate(housingPriceElement);
});
