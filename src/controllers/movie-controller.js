import FilmCardComponent from "../components/film-card.js";
import PopUpComponent from "../components/popup.js";
import {renderHtml, remove} from "../utils.js";
import {ESC_BUTTON} from "../constants.js";
import BlockCommentsComponent from "../components/comment.js";


const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmCardComponent = null;
    this._popUpComponent = null;
    this._comments = null;
    this._mode = Mode.DEFAULT;
    this._removePopUp = this._removePopUp.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }


  render(film) {
    this._comments = new BlockCommentsComponent(film);
    this._filmCardComponent = new FilmCardComponent(film);
    this._popUpComponent = new PopUpComponent(film);

    this._filmCardComponent.setPopupShowingClickHandler(() => {
      this._mode = Mode.POPUP;
      const topContainer = this._popUpComponent.getElement().querySelector(`.form-details__top-container`);
      renderHtml(document.body, this._popUpComponent);
      renderHtml(topContainer, this._comments);
      this._comments.setonEmojisClick();

      this._popUpComponent.setOnCloseButtonClick(this._removePopUp);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    renderHtml(this._container, this._filmCardComponent);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopUp();
    }
  }


  _removePopUp() {
    this._mode = Mode.DEFAULT;
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
