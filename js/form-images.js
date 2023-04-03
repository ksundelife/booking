import {FILE_TYPES, DEFAULT_AVATAR_FILE_PATH} from './const.js';

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview > img');
const houseImageChooserElement = document.querySelector('#images');
const houseImagePreviewBoxElement = document.querySelector('.ad-form__photo');

const isImageTypeCorrect = (fileName, types) => types.some((imageType) => fileName.endsWith(imageType));

const setPreviewImageSrc = (element, file) => {
  element.src = URL.createObjectURL(file);
};

const resetImage = () => {
  avatarChooserElement.value = '';
  houseImageChooserElement.value = '';
  avatarPreviewElement.src = DEFAULT_AVATAR_FILE_PATH;
  houseImagePreviewBoxElement.textContent = '';
};

avatarChooserElement.addEventListener('change', () => {
  const avatarFile = avatarChooserElement.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  if (isImageTypeCorrect(avatarFileName, FILE_TYPES)) {
    setPreviewImageSrc(avatarPreviewElement, avatarFile);
  }
});

houseImageChooserElement.addEventListener('change', () => {
  const houseImageFile = houseImageChooserElement.files[0];
  const houseImageFileName = houseImageFile.name.toLowerCase();

  if (isImageTypeCorrect(houseImageFileName, FILE_TYPES)) {
    houseImagePreviewBoxElement.textContent = '';

    const houseImagePreviewElement = document.createElement('img');

    setPreviewImageSrc(houseImagePreviewElement, houseImageFile);

    houseImagePreviewElement.style.maxWidth = '100%';
    houseImagePreviewElement.style.height = 'auto';

    houseImagePreviewBoxElement.append(houseImagePreviewElement);
  }
});

export {resetImage};
