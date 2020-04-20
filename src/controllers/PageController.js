import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilms from "../components/no-films.js";
import SortComponent from "../components/sort.js";
import FilmsContainer from "../components/films-container.js";
import FilmExtraComponent from "../components/film-extra.js";
import FilmCardComponent from "../components/film-card.js";
import PopUpComponent from "../components/popup.js";
import BlockCommentsComponent from "../components/comment.js";
import {renderHtml, RenderPosition} from "../utils.js";
import {FILM_COUNT, FILM_AMOUNT_BY_BUTTON, ESC_BUTTON} from "../constants.js";

const renderFilm = (filmBoard, film) => {
  const comments = new BlockCommentsComponent(film);

  const showPopUp = () => {
    renderHtml(document.body, popUp);
    renderHtml(topContainer, comments);
    onPopupBtnClose.addEventListener(`click`, deletePopUp);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const deletePopUp = () => {
    popUp.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
    onPopupBtnClose.removeEventListener(`click`, deletePopUp);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_BUTTON) {
      popUp.getElement().remove();
    }
  };

  const filmCard = new FilmCardComponent(film);
  const popUp = new PopUpComponent(film);

  const topContainer = popUp.getElement().querySelector(`.form-details__top-container`);
  const cardPoster = filmCard.getElement().querySelector(`.film-card__poster`);
  const cardTitle = filmCard.getElement().querySelector(`.film-card__title`);
  const cardComments = filmCard.getElement().querySelector(`.film-card__comments`);
  const onPopupBtnClose = popUp.getElement().querySelector(`.film-details__close-btn`);

  cardPoster.addEventListener(`click`, showPopUp);
  cardTitle.addEventListener(`click`, showPopUp);
  cardComments.addEventListener(`click`, showPopUp);

  renderHtml(filmBoard, filmCard);
};

const renderBoard = (boardComponent, films) => {
  if (films.length === 0) {
    renderHtml(boardComponent, new NoFilms());
    return;
  }

  let main = document.querySelector(`.main`);

  let filmsList = boardComponent.getElement().querySelector(`.films-list`);

  renderHtml(boardComponent.getElement(), new SortComponent(), RenderPosition.AFTERBEGIN);
  renderHtml(filmsList, new FilmsContainer());

  let filmsListContainer = filmsList.querySelector(`.films-list__container`);

  films.slice(0, FILM_COUNT)
  .forEach((movie) => {
    renderFilm(filmsListContainer, movie);
  });

  const showMoreButton = new ShowMoreButtonComponent();
  renderHtml(filmsList, showMoreButton);

  let currentVisibleFilms = FILM_COUNT;

  showMoreButton.setShowMoreBtnClickHandler(() =>{
    const prevVisibleFilms = currentVisibleFilms;
    currentVisibleFilms = currentVisibleFilms + FILM_AMOUNT_BY_BUTTON;

    films.slice(prevVisibleFilms, currentVisibleFilms).forEach((item)=>
      renderFilm(filmsListContainer, item));
    if (currentVisibleFilms >= films.length) {
      showMoreButton.removeElement();
    }
  });

  let filmsSection = main.querySelector(`.films`);

  const renderExtraBoard = (extraMovies, title) => {
    const filmExtraBlock = new FilmExtraComponent(title);
    const filmContainer = filmExtraBlock.getElement().querySelector(`.films-list__container`);
    extraMovies.forEach((movie) => {
      renderFilm(filmContainer, movie);
    });
    renderHtml(filmsSection, filmExtraBlock);
  };

  const topRating = films.filter((movie) => movie.rating > 7.5).slice(0, 2);
  renderExtraBoard(topRating, `Top rating`);

  const mostComment = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
  renderExtraBoard(mostComment, `Most commented`);
};


export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    renderBoard(this._container, films);
  }
}
