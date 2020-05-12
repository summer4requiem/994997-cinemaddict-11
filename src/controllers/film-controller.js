import FilmCardComponent from "../components/film-card.js";
import PopUpComponent from "../components/popup.js";
import {renderHtml, remove, replace} from "../utils/common.js";
import {ESC_BUTTON} from "../utils/constants.js";
import BlockCommentsComponent from "../components/comment.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this.id = null;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmInfo = null;

    this._filmCardComponent = null;
    this._popUpComponent = null;
    this._comments = null;
    this.creatingComment = null;

    this._removePopUp = this._removePopUp.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._showPopup = this._showPopup.bind(this);
  }

  render(film) {
    this.id = film.id;
    this._filmInfo = film;
    const oldFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(this._filmInfo);
    this._commentsComponent = new BlockCommentsComponent(this._filmInfo);

    this._filmCardComponent.setAddToWatchClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, this._filmInfo, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setAlreadyWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, this._filmInfo, {
        isAdded: !film.isAdded,
      }));
    });

    this._filmCardComponent.setAddToFavoritesClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, this._filmInfo, {
        isFavorite: !film.isFavorite,
      }));
    });

    if (!oldFilmComponent) {
      renderHtml(this._container, this._filmCardComponent);
    } else {
      replace(this._filmCardComponent, oldFilmComponent);
    }

    this._filmCardComponent.setPopupShowingClickHandler(this._showPopup);
  }

  _showPopup() {
    this._popUpComponent = new PopUpComponent(this._filmInfo);
    this._commentsComponent = new BlockCommentsComponent(this._filmInfo);
    const topContainer = this._popUpComponent.getElement().querySelector(`.form-details__top-container`);
    renderHtml(document.body, this._popUpComponent);
    renderHtml(topContainer, this._commentsComponent);
    this._commentsComponent.setonEmojisClick();

    this._popUpComponent.setOnCloseButtonClick(this._removePopUp);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._popUpComponent.setOnAddToWatchlistClick(() => {
      this._onDataChange(this, this._filmInfo, Object.assign({}, this._filmInfo, {
        isWatched: !this._filmInfo.isWatched,
      }));
    });

    this._popUpComponent.setOnAlreadyWatchedClick(() => {
      this._onDataChange(this, this._filmInfo, Object.assign({}, this._filmInfo, {
        isAdded: !this._filmInfo.isAdded,
      }));
    });

    this._popUpComponent.setOnAddToFavoritesClick(() => {
      this._onDataChange(this, this._filmInfo, Object.assign({}, this._filmInfo, {
        isFavorite: !this._filmInfo.isFavorite,
      }));
    });

    this._popUpComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._commentsComponent.getData();
      this._onDataChange(this, this._comments, data);
    });
    this._commentsComponent.setOnCommentDeleteClick(() => this._onDataChange(this, this._comments, null));
  }

  destroy() {
    this._popUpComponent = new PopUpComponent(this._filmInfo);
    remove(this._popUpComponent);
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._popUpComponent) {
      remove(this._popUpComponent);
    }
  }

  _removePopUp() {
    remove(this._popUpComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._popUpComponent.removeEventListener(`click`, this._removePopUp);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ESC_BUTTON) {
      remove(this._popUpComponent);
    }
  }
}
