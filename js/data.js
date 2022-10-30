import {getRandomPositiveIntegerNumber, getRandomPositiveFloatNumber} from './utils.js';

function getDescriptionOfSimilarAdNearby(photoNumber) {
  const photoNumberWithZero = photoNumber < 10 ? `0${photoNumber}` : photoNumber;
  const latitude = getRandomPositiveFloatNumber(35.65000, 35.70000, 5);
  const longitude = getRandomPositiveFloatNumber(139.70000, 139.80000, 5);
  const housesTypeList = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const photosList = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];

  return {
    author: {
      avatar: `img/avatars/user${photoNumberWithZero}.png`,
    },
    offer: {
      title: 'Самый лучший дом в Токио',
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveIntegerNumber(0, 100000),
      type: housesTypeList[getRandomPositiveIntegerNumber(0, housesTypeList.length - 1)],
      rooms: getRandomPositiveIntegerNumber(1, 10),
      guests: getRandomPositiveIntegerNumber(1, 10),
      checkin: '12:00',
      checkout: '14:00',
      features: featuresList.slice(0, getRandomPositiveIntegerNumber(1, featuresList.length)),
      description: 'Помещение просторное, светлое с панорамным видом на Токио',
      photos: photosList.slice(0, getRandomPositiveIntegerNumber(1, photosList.length))
    },
    location: {
      lat: latitude,
      lng: longitude
    }
  };
}

function createArrayOfSimilarAdsNearby(objectsCount) {
  const ads = [];

  for (let i = 1; i <= objectsCount; i++) {
    ads.push(getDescriptionOfSimilarAdNearby(i));
  }

  return ads;
}

export {createArrayOfSimilarAdsNearby};
