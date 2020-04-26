import AbstractComponent from "./abstract-component.js";

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;
  }

  _createFilmCard(card) {
    const {title, rating, duration, comments, description, genre, release, isWatched, isFavorite, isAdded, posterSrc} = card;
    const activeLink = `film-card__controls-item--active`;
    const watchlistButtonInactiveClass = isWatched ? activeLink : ``;
    const favoriteButtonInactiveClass = isFavorite ? activeLink : ``;
    const addWatchlistButtonInactiveClass = isAdded ? activeLink : ``;

    return (
      `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release} год</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonInactiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${favoriteButtonInactiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${addWatchlistButtonInactiveClass}">Mark as favorite</button>
      </form>
       </article>`
    );
  }

  getTemplate() {
    return this._createFilmCard(this._card);
  }

  setPopupShowingClickHandler(handler) {
    const cardPoster = this.getElement().querySelector(`.film-card__poster`);
    const cardTitle = this.getElement().querySelector(`.film-card__title`);
    const cardComments = this.getElement().querySelector(`.film-card__comments`);

    cardPoster.addEventListener(`click`, handler);
    cardTitle.addEventListener(`click`, handler);
    cardComments.addEventListener(`click`, handler);
  }

  setAddToWatchClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setAlreadyWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
