import {getMaxNumberInArray, isFieldEmpty, changeSelectValue} from './utils.js';
import {sendData} from './api.js';
import {resetAdForm} from './form-reset.js';
import {showAdFormPopup} from './form-popup.js';
import {
  MIN_PRICE_BY_HOUSING_TYPE,
  MAX_HOUSING_PRICE,
  ROOMS_CAPACITY
} from './const.js';
import {insertBalloonsOnMap} from './ads.js';
import {markersLayer} from './map.js';

const adFormElement = document.querySelector('.ad-form');
const adTitleElement = adFormElement.querySelector('#title');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const housingTypeElement = adFormElement.querySelector('#type');
const housingPriceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const adFormSubmitBtnElement = adFormElement.querySelector('.ad-form__submit');
const resetBtnElement = adFormElement.querySelector('.ad-form__reset');

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
});

Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});

Pristine.setLocale('ru');

const validateAdFormTitle = (value) => value.length >= 30 && value.length <= 100;

const validateAdFormRooms = () => ROOMS_CAPACITY[roomNumberElement.value].includes(capacityElement.value);

const getCapacityErrorMessage = () => {
  let errorMessage = '';
  if (roomNumberElement.value === '100') {
    errorMessage = 'Не для гостей';
  } else {
    errorMessage = `
      Не более
      ${getMaxNumberInArray(ROOMS_CAPACITY[roomNumberElement.value])}
      ${roomNumberElement.value === '1' ? 'гостя' : 'гостей'}
    `;
  }
  return errorMessage;
};

const isAdFormValid = () => pristine.validate();

const validateAdFormType = () => {
  if (!isFieldEmpty(housingPriceElement)) {
    pristine.validate(housingPriceElement);
    return;
  }
  housingPriceElement.placeholder = `От ${MIN_PRICE_BY_HOUSING_TYPE[housingTypeElement.value]} руб.`;
};

const validateAdFormPrice = () => MIN_PRICE_BY_HOUSING_TYPE[housingTypeElement.value] <= +housingPriceElement.value;

const getHousingPriceErrorMessage = () => `Не менее ${MIN_PRICE_BY_HOUSING_TYPE[housingTypeElement.value]} руб.`;

const validateAdFormPriceMax = () => +housingPriceElement.value <= MAX_HOUSING_PRICE;

const getHousingPriceErrorMessageMax = () => `Не более ${MAX_HOUSING_PRICE} руб.`;

pristine.addValidator(adTitleElement, validateAdFormTitle, 'От 30 до 100 символов');
pristine.addValidator(housingPriceElement, validateAdFormPrice, getHousingPriceErrorMessage);
pristine.addValidator(housingPriceElement, validateAdFormPriceMax, getHousingPriceErrorMessageMax);
pristine.addValidator(capacityElement, validateAdFormRooms, getCapacityErrorMessage);

roomNumberElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});

housingTypeElement.addEventListener('change', () => {
  validateAdFormType();
});

timeInElement.addEventListener('change', () => {
  changeSelectValue(timeInElement.value, timeOutElement);
});

timeOutElement.addEventListener('change', () => {
  changeSelectValue(timeOutElement.value, timeInElement);
});

const changeAdFormSubmitActivity = (status) => {
  if (status) {
    adFormSubmitBtnElement.removeAttribute('disabled');
    return;
  }
  adFormSubmitBtnElement.setAttribute('disabled', true);
  adFormSubmitBtnElement.blur();
};

const resetAdFormHandler = (ads) => {
  resetAdForm();
  markersLayer.clearLayers();
  insertBalloonsOnMap(ads);
};

const sendAdFormData = (ads) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isAdFormValid()) {
      changeAdFormSubmitActivity(false);
      sendData(
        () => {
          resetAdFormHandler(ads);
          showAdFormPopup('success');
          changeAdFormSubmitActivity(true);
        },
        () => {
          showAdFormPopup('error');
          changeAdFormSubmitActivity(true);
        },
        new FormData(adFormElement)
      );
    }
  });
};

const resetAll = (ads) => {
  resetBtnElement.addEventListener('click', () => resetAdFormHandler(ads));
};

export {
  pristine,
  sendAdFormData,
  resetAll
};
