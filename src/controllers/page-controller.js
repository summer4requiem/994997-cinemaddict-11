import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilms from "../components/no-films.js";
import SortComponent from "../components/sort.js";
import FilmsContainer from "../components/films-container.js";
import FilmExtraComponent from "../components/film-extra.js";
import FilmCardComponent from "../components/film-card.js";
import PopUpComponent from "../components/popup.js";
import BlockCommentsComponent from "../components/comment.js";
import {renderHtml, RenderPosition, remove} from "../utils.js";
import {SortType} from "../components/sort.js";
import {FILM_COUNT, FILM_AMOUNT_BY_BUTTON, ESC_BUTTON} from "../constants.js";

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new SortComponent();
    this._filmsContainer = new FilmsContainer();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  renderFilm(filmBoard, film) {
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
  }

  renderFilms(FilmsListElement, films) {
    films.forEach((it) => {
      this.renderFilm(FilmsListElement, it);
    });
  }

  getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.BY_DATE:
        sortedFilms = showingFilms.sort((a, b) => a.release - b.release);
        break;
      case SortType.BY_RATING:
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.BY_DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }


  render(films) {
    if (films.length === 0) {
      renderHtml(this._container, this.noFilmsComponent);
      return;
    }

    let main = document.querySelector(`.main`);

    let filmsList = this._container.getElement().querySelector(`.films-list`);

    renderHtml(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);
    renderHtml(filmsList, this._filmsContainer);

    let filmsListContainer = filmsList.querySelector(`.films-list__container`);

    films.slice(0, FILM_COUNT)
      .forEach((movie) => {
        this.renderFilm(filmsListContainer, movie);
      });

    renderHtml(filmsList, this._showMoreButtonComponent);

    let currentVisibleFilms = FILM_COUNT;
    this._showMoreButtonComponent.setShowMoreBtnClickHandler(() => {
      const prevVisibleFilms = currentVisibleFilms;
      currentVisibleFilms = currentVisibleFilms + FILM_AMOUNT_BY_BUTTON;

      const sortedFilms = this.getSortedFilms(films, this._sortComponent.getSortType(), prevVisibleFilms, currentVisibleFilms);

      this.renderFilms(this._filmsContainer.getElement(), sortedFilms);

      if (currentVisibleFilms >= films.length) {
        currentVisibleFilms = films.length;
        remove(this._showMoreButtonComponent);
      }
    });

    let filmsSection = main.querySelector(`.films`);

    const renderExtraBoard = (extraMovies, title) => {
      const filmExtraBlock = new FilmExtraComponent(title);
      const filmContainer = filmExtraBlock.getElement().querySelector(`.films-list__container`);
      extraMovies.forEach((movie) => {
        this.renderFilm(filmContainer, movie);
      });
      renderHtml(filmsSection, filmExtraBlock);
    };

    const topRating = films.filter((movie) => movie.rating > 7.5).slice(0, 2);
    renderExtraBoard(topRating, `Top rating`);

    const mostComment = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    renderExtraBoard(mostComment, `Most commented`);


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedFilms = this.getSortedFilms(films, sortType, 0, FILM_COUNT);

      this._filmsContainer.getElement().innerHTML = ``;
      this.renderFilms(this._filmsContainer.getElement(), sortedFilms);
    });
  }
}
