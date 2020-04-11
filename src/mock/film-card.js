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

const text = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`,
  `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`
];

const user = [`John Doe`, `Tim Macoveev`, `John Tim`, `Kirill Maceev`, `Doe Tim`];
const emoji = [`angry.png`, `puke.png`, `smile.png`, `sleeping.png`];


const title = getRandomArrayItem([...titles]);
const generateFilm = () => {
  return {
    title: Object.values(title)[0],
    posterSrc: getRandomArrayItem(posters),
    rating: getRandomNumber(1, 10).toFixed(1),
    release: `2012г`,
    duration: `1h 2m`,
    genre: getRandomArrayItem(genres),
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isAdded: Math.random() > 0.5,
    comments: {
      text: getRandomArrayItem(text),
      author: getRandomArrayItem(user),
      date: `12/12/2020`,
      time: ` 22:22`,
      emoji: getRandomArrayItem(emoji)
    },
    filmDetails: {
      director: `Mann Anne`,
      writers: `Anne Wigton`,
      country: `Spanish`,
    }
  };
};


const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {
  generateFilm,
  generateFilms
};
