const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
const adsCanvasMap = document.querySelector('#map-canvas');

const HOUSING_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

function createAdFeatureTemplate(feature) {
  return `<li class="popup__feature popup__feature--${feature}"></li>`;
}

function createAdPhotoTemplate(photoSrc) {
  return `<img src="${photoSrc}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
}

function renderAdContentList(content, listDomElement, createTemplateAction) {
  listDomElement.textContent = '';
  content.forEach((el) => listDomElement.insertAdjacentHTML('beforeend', createTemplateAction(el)));
}

function isAdDescription(element, description) {
  if (description.length === 0) {
    element.querySelector('.popup__description').classList.add('hidden');
    return;
    // return (element.querySelector('.popup__description').style.display = 'none');
  }
  element.querySelector('.popup__description').classList.remove('hidden');
  return (element.querySelector('.popup__description').textContent = description);
}

function renderArrAdsContentData(adsContent) {
  const adsFragment = document.createDocumentFragment();

  adsContent.forEach(({ author, offer }) => {
    const adsElement = adsTemplate.cloneNode(true);
    const adFeatureList = adsElement.querySelector('.popup__features');
    const adPhotoList = adsElement.querySelector('.popup__photos');

    adsElement.querySelector('.popup__avatar').src = author.avatar;
    adsElement.querySelector('.popup__title').textContent = offer.title;
    adsElement.querySelector('.popup__text--address').textContent = offer.address;
    adsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    adsElement.querySelector('.popup__type').textContent = HOUSING_TYPES[offer.type];
    adsElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    renderAdContentList(offer.features, adFeatureList, createAdFeatureTemplate);
    isAdDescription(adsElement, offer.description);
    renderAdContentList(offer.photos, adPhotoList, createAdPhotoTemplate);

    adsFragment.appendChild(adsElement);
  });

  adsCanvasMap.appendChild(adsFragment);
}

export { renderArrAdsContentData };

// function createHtmlOfSimilarAdsNearby(adsQuantity) {
//   const arrayOfSimilarAdsNearby = createArrayOfSimilarAdsNearby(adsQuantity);
//   const similarAdsNearbyTemplate = document.querySelector('#card').content.querySelector('.popup');
//   const similarAdsNearbyFragment = document.createDocumentFragment();

//   const housesTypesMap = {
//     flat: 'Квартира',
//     bungalow: 'Бунгало',
//     house: 'Дом',
//     palace: 'Дворец',
//     hotel: 'Отель'
//   };

//   for (let i = 0; i < arrayOfSimilarAdsNearby.length; i++) {
//     const newSimilarAdNearby = similarAdsNearbyTemplate.cloneNode(true);

//     newSimilarAdNearby.querySelector('.popup__title').textContent = arrayOfSimilarAdsNearby[i].offer.title;
//     newSimilarAdNearby.querySelector('.popup__text--address').textContent = arrayOfSimilarAdsNearby[i].offer.address;
//     newSimilarAdNearby.querySelector('.popup__text--price').textContent = `${arrayOfSimilarAdsNearby[i].offer.price} ₽/ночь`;

//     newSimilarAdNearby.querySelector('.popup__text--capacity').textContent = `${arrayOfSimilarAdsNearby[i].offer.rooms} комнаты для ${arrayOfSimilarAdsNearby[i].offer.guests} гостей`;

//     newSimilarAdNearby.querySelector('.popup__text--time').textContent = `Заезд после ${arrayOfSimilarAdsNearby[i].offer.rooms} , выезд до ${arrayOfSimilarAdsNearby[i].offer.guests}`;

//     newSimilarAdNearby.querySelector('.popup__features').textContent = arrayOfSimilarAdsNearby[i].offer.features;

//     if (arrayOfSimilarAdsNearby[i].offer.description) {
//       newSimilarAdNearby.querySelector('.popup__description').textContent = arrayOfSimilarAdsNearby[i].offer.description;
//     } else {
//       newSimilarAdNearby.querySelector('.popup__description').style.display = 'none';
//     }

//     newSimilarAdNearby.querySelector('.popup__avatar').src = arrayOfSimilarAdsNearby[i].author.avatar;
//     newSimilarAdNearby.querySelector('.popup__type').textContent = housesTypesMap[arrayOfSimilarAdsNearby[i].offer.type];

//     const housePhotoImgTag = newSimilarAdNearby.querySelector('.popup__photos').firstElementChild;
//     newSimilarAdNearby.querySelector('.popup__photos').innerHTML = '';
//     for (let j = 0; j < arrayOfSimilarAdsNearby[i].offer.photos.length; j++) {
//       const housePhoto = housePhotoImgTag.cloneNode(true);
//       housePhoto.src = arrayOfSimilarAdsNearby[i].offer.photos[j];
//       newSimilarAdNearby.querySelector('.popup__photos').appendChild(housePhoto);
//     }
//     similarAdsNearbyFragment.appendChild(newSimilarAdNearby);
//   }
//   return similarAdsNearbyFragment;
// }