const adFormElement = document.querySelector('.ad-form');
const timeInElement = adFormElement.querySelector('#timein');
const timeInOptionElements = timeInElement.querySelectorAll('option');

const timeInHandler = (evt) => {
  timeInOptionElements.forEach((option) => {
    if (evt.target.value !== option.value) {
      option.removeAttribute('selected');
      return;
    }
    option.setAttribute('selected', true);
  });
};

timeInElement.addEventListener('change', timeInHandler);
