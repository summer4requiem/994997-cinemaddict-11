import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilms from "../components/no-films.js";
import SortComponent from "../components/sort.js";
import FilmsContainer from "../components/films-container.js";
import FilmExtraComponent from "../components/film-extra.js";
import {renderHtml, RenderPosition, remove} from "../utils.js";
import {SortType} from "../components/sort.js";
import {FILM_COUNT, FILM_AMOUNT_BY_BUTTON} from "../constants.js";
import MovieController from "./movie-controller.js";


const renderFilms = (filmsListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};

const getSortedFilms = (films, sortType, from, to) =>{
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
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmsControllers = [];
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new SortComponent();
    this._filmsContainer = new FilmsContainer();

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._currentVisibleFilms = FILM_COUNT;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    const container = this._container.getElement();

    if (films.length === 0) {
      renderHtml(container, this.noFilmsComponent);
      return;
    }

    let filmsList = container.querySelector(`.films-list`);

    renderHtml(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    renderHtml(filmsList, this._filmsContainer);

    const filmsListElement = this._filmsContainer.getElement();
    const newFilms = renderFilms(filmsListElement, this._films.slice(0, this._currentVisibleFilms), this._onDataChange, this._onViewChange);

    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._renderShowMoreButton();


    const renderExtraBoard = (extraMovies, title) => {
      const filmExtraBlock = new FilmExtraComponent(title);

      let main = document.querySelector(`.main`);
      let filmsSection = main.querySelector(`.films`);

      let filmsExtraList = filmExtraBlock.getElement().querySelector(`.films-list__container`);
      renderHtml(filmsSection, filmExtraBlock);
      renderFilms(filmsExtraList, extraMovies);
    };

    const topRating = this._films.filter((movie) => movie.rating > 7.5).slice(0, 2);
    renderExtraBoard(topRating, `Top rating`);

    const mostComment = this._films.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    renderExtraBoard(mostComment, `Most commented`);
  }

  _renderShowMoreButton() {
    if (this._currentVisibleFilms >= this._films.length) {
      return;
    }

    const container = this._container.getElement();
    renderHtml(container, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setShowMoreBtnClickHandler(() => {
      const prevVisibleFilms = this._currentVisibleFilms;
      const filmsListElement = this._filmsContainer.getElement();

      this._currentVisibleFilms += FILM_AMOUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevVisibleFilms, this._currentVisibleFilms);
      const newFilms = renderFilms(filmsListElement, sortedFilms, this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._currentVisibleFilms >= this._films.length) {
        this._currentVisibleFilms = this._films.length;
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }

  _onViewChange() {
    // this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._currentVisibleFilms = FILM_COUNT;
    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._currentVisibleFilms);
    const filmsListElement = this._filmsContainer.getElement();

    this._filmsContainer.getElement().innerHTML = ``;

    const newFilms = renderFilms(filmsListElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = newFilms;

    this._renderShowMoreButton();
  }
}
