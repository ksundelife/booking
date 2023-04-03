import {isEscapeKey} from './utils.js';

const getMessagePopupAction = (element) => {
  if (element) {
    element.remove();
    element.removeEventListener('click', formPopupHandler);
    window.removeEventListener('keydown', formPopupHandler);
  }
};

function formPopupHandler(evt) {
  const errorPopupElement = document.querySelector('.error');
  const successPopupElement = document.querySelector('.success');

  switch (evt.type) {
    case 'click':
      getMessagePopupAction(errorPopupElement);
      getMessagePopupAction(successPopupElement);
      break;
    case 'keydown':
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        getMessagePopupAction(errorPopupElement);
        getMessagePopupAction(successPopupElement);
      }
      break;
    default:
      getMessagePopupAction(errorPopupElement);
      getMessagePopupAction(successPopupElement);
      break;
  }
}

const showAdFormPopup = (type) => {
  const adFormPopupTemplateElement = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const adFormPopupElement = adFormPopupTemplateElement.cloneNode(true);

  document.querySelector('body').append(adFormPopupElement);

  adFormPopupElement.addEventListener('click', formPopupHandler);
  window.addEventListener('keydown', formPopupHandler);
};

export {showAdFormPopup};
