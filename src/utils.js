const getRandomNumber = (min, max) => min + (Math.random() * (max - min));

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderHtml = (container, component, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


export {getRandomNumber, getRandomArrayItem, getRandomInt, createElement, renderHtml, remove, RenderPosition};
