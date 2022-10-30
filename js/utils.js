function getRandomPositiveIntegerNumber(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloatNumber(min, max, decimalPlaces = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(decimalPlaces);
}

export {getRandomPositiveIntegerNumber, getRandomPositiveFloatNumber};
