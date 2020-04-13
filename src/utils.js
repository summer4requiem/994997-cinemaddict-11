const getRandomNumber = (min, max) => min + (Math.random() * (max - min));

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export {getRandomNumber, getRandomArrayItem, getRandomInt};
