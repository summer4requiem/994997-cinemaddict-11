import {getRandomArrayItem} from "../utils.js";

const text = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`,
  `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`
];

const user = [`John Doe`, `Tim Macoveev`, `John Tim`, `Kirill Maceev`, `Doe Tim`];
const emoji = [`angry.png`, `puke.png`, `smile.png`, `sleeping.png`];

const generateComment = () => {
  return {
    text: getRandomArrayItem(text),
    author: getRandomArrayItem(user),
    date: `12/12/2020 `,
    time: ` 22:22`,
    emoji: getRandomArrayItem(emoji)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
