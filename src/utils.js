const getRandomNumber = (min, max) => min + (Math.random() * (max - min));

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderHtml = (container, element, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {getRandomNumber, getRandomArrayItem, getRandomInt, createElement, renderHtml};
