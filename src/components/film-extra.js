import {createFilmCard} from "./film-card.js";
import {createElement} from "../utils.js";

export const createfilmExtra = (filmCard, title) => {
  const filmExtraMarkUp = filmCard.map((it) => createFilmCard(it)).join(`\n`);
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    ${filmExtraMarkUp}
    </div>
  </section>`
  );
};

export default class FilmExtra {
  constructor(films, title) {
    this._films = films;
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createfilmExtra(this._films, this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
