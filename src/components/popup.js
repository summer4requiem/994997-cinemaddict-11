import AbstractSmartComponent from "./abstract-smart-component.js";
// import FilmCard from "./film-card.js";


export default class PopUp extends AbstractSmartComponent {
  constructor(fullCard) {
    super();
    this._fullCard = fullCard;
    this._element = null;
    this._setCloseButtonClickHandler = null;
  }

  _createPopUpMarkup(moreInfo) {
    const {title, rating, release, description, posterSrc, isWatched, isAdded, isFavorite, filmDetails: {director, writers, country}} = moreInfo;
    return (
      `<section class="film-details">
         <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
          <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
          </div>
        <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${posterSrc}" alt="${title}">
          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${release}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">1h 18m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Horror</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>
          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatched ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAdded ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
      </section>
    </div>
  </form>
  </section>`
    );
  }

  getTemplate() {
    return this._createPopUpMarkup(this._fullCard);
  }

  recoveryListeners() {
    this.setOnCloseButtonClick(this._submitHandler);
    this._subscribeOnEvents();
  }

  setOnCloseButtonClick(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }


  setOnAddToWatchlistClick(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
  }

  setOnAlreadyWatchedClick(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
  }

  setOnAddToFavoritesClick(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
  }
}
