import {addOrRemoveClassName} from './utils.js';

const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const adFormSliderElement = document.querySelector('.ad-form__slider');
const mapElement = document.querySelector('.map__canvas');

const changeMapChildElementActivity = (value) => {
  const mapChildElements = mapElement.childNodes;
  mapChildElements.forEach((el) => {
    el.style.display = value;
  });
};

const changeFormElementsActivity = (elementsArray, activity) => {
  Object.values(elementsArray).forEach((value) => {
    value.disabled = activity;
  });
};

const changeMapFilterActivity = (action, deactivationClassName, fieldsActivity) => {
  addOrRemoveClassName(mapFiltersElement, action, deactivationClassName);
  changeFormElementsActivity(mapFiltersElement.children, fieldsActivity);
};

const changeAdFormActivity = (action, deactivationClassName, fieldsActivity) => {
  addOrRemoveClassName(adFormElement, action, deactivationClassName);
  changeFormElementsActivity(adFormElement.children, fieldsActivity);
};

const deactivateAdsPage = () => {
  changeMapChildElementActivity('none');
  adFormSliderElement.setAttribute('disabled', true);
  changeAdFormActivity('add', 'ad-form--disabled', true);
  changeMapFilterActivity('add', 'ad-form--disabled', true);
};

const activateAdsPage = () => {
  changeMapChildElementActivity('block');
  adFormSliderElement.removeAttribute('disabled');
  changeAdFormActivity('remove', 'ad-form--disabled', false);
  changeMapFilterActivity('remove', 'ad-form--disabled', false);
};

export {
  deactivateAdsPage,
  activateAdsPage
};
