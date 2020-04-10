import {
  getRandomNumber,
  getRandomArrayItem
} from "../utils.js";

const titles = new Set([{
  "Dance": `The Dance of Life`
}, {
  "Aviator": `The Aviator`
}, {
  "Silence": `The Silence`
}, {
  "Killers": `Killers of the Flower Moon`
}, {
  "Shine": `The source of light`
}]);

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const genres = [
  `Action`,
  `Adventure`,
  `Drama`,
  `Horror`,
  `Mystery`,
  `Saga`,
];

const title = getRandomArrayItem([...titles]);
const generateFilm = () => {
  return {
    title: Object.values(title)[0],
    posterSrc: getRandomArrayItem(posters),
    rating: getRandomNumber(1, 10).toFixed(1),
    year: `2012`,
    duration: `1h 2m`,
    genre: getRandomArrayItem(genres),
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isAdded: Math.random() > 0.5,
  };
};

const generateFilmDetails = () => {
  return {
    title: Object.values(title)[0],
    posterSrc: getRandomArrayItem(posters),
    rating: getRandomNumber(1, 10).toFixed(1),
    date: `2012`,
  };
};

const generateDetails = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmDetails);
};


const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {
  generateFilm,
  generateFilms,
  generateDetails
};
