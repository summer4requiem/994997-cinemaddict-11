import FilmCardComponent from "../components/film-card.js";
import PopUpComponent from "../components/pop-up.js";
import {renderHtml, remove, replace} from "../utils/common.js";
import {ESC_BUTTON} from "../utils/constants.js";
import CommentsComponent from "../components/comments.js";

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
    this._film = null;

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
    this._film = film;
    const oldFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(this._film);

    this._filmCardComponent.setAddToWatchClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, this._film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setAlreadyWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, this._film, {
        isAdded: !film.isAdded,
      }));
    });

    this._filmCardComponent.setAddToFavoritesClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, this._film, {
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
    this._popUpComponent = new PopUpComponent(this._film);
    this._commentsComponent = new CommentsComponent(this._film);

    const topContainer = this._popUpComponent.getElement().querySelector(`.form-details__top-container`);
    renderHtml(document.body, this._popUpComponent);
    renderHtml(topContainer, this._commentsComponent);
    this._commentsComponent.setOnEmojisClick();

    this._popUpComponent.setOnCloseButtonClick(this._removePopUp);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._popUpComponent.setOnAddToWatchlistClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatched: !this._film.isWatched,
      }));
    });

    this._popUpComponent.setOnAlreadyWatchedClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isAdded: !this._film.isAdded,
      }));
    });

    this._popUpComponent.setOnAddToFavoritesClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite,
      }));
    });

    this._popUpComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._commentsComponent.getData();
      this._onDataChange(this, this._comments, data);
    });
    this._commentsComponent.setOnCommentDeleteClick(this._onCommentDelete.bind(this));
    this._commentsComponent.setOnCommentAddClick(this._onCommentAdd.bind(this));
  }

  _onCommentDelete(id) {
    this._film.comments = this._film.comments.filter((comment) => comment.id !== id);
    this._commentsComponent.rerender();
  }


  _onCommentAdd(newComment) {
    this._film.comments.push(newComment);
    this._commentsComponent.rerender();
  }

  destroy() {
    this._popUpComponent = new PopUpComponent(this._film);
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
    // document.removeEventListener(`keydown`, this._onEscKeyDown);
    // this._popUpComponent.removeEventListener(`click`, this._removePopUp);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ESC_BUTTON) {
      remove(this._popUpComponent);
    }
  }
}
