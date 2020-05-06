import {formatTime} from "../utils/common.js";
import {getRandomNumber, getRandomArrayItem, getRandomInt} from "../utils/common.js";
import {EMOTIONS} from "../utils/constants.js";

const titles = [`The Dance of Life`, `The Aviator`, `The Silence`, `Killers of the Flower Moon`, `The source of light`];

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

const comments = [
  `Are you supposed to retract your finger if you trigger it?`,
  `Pulling away your finger like that after it's been stabbed seems like a great way to cause more damage`,
  `Own that shit. Hahaha`,
  `Happy cake day! Where's my slice?`,
  `true that`,
  `Look at that plaster on his finger lmao`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Cras aliquet varius magna, non porta ligula feugiat eget Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Fusce tristique felis at fermentum pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Aliquam id orci ut lectus varius viverra Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante Lorem ipsum dolor sit amet, consectetur adipiscing elit`
];


const users = [`John Doe`, `Tim Macoveev`, `John Tim`, `Kirill Maceev`, `Doe Tim`];

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      return {
        text: getRandomArrayItem(comments),
        author: getRandomArrayItem(users),
        date: `12/12/2020`,
        time: ` 22:22`,
        emoji: getRandomArrayItem(EMOTIONS)
      };
    });
};


const generateFilm = () => {
  return {
    id: String(new Date() + Math.random()),
    title: getRandomArrayItem(titles),
    posterSrc: getRandomArrayItem(posters),
    rating: getRandomNumber(1, 10).toFixed(1),
    release: getRandomInt(0, Date.now()),
    duration: formatTime(getRandomInt(-7200000, 0)),
    description: getRandomArrayItem(descriptions),
    genre: getRandomArrayItem(genres),
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isAdded: Math.random() > 0.5,
    comments: generateComments(getRandomInt(0, 15)),
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

export {generateFilm, generateFilms};
