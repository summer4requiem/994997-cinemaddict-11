const getRandomNumber = (min, max) => {
  return min + (Math.random() * (max - min));
};
const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export {getRandomNumber, getRandomArrayItem};
