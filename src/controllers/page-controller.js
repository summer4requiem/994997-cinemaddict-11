import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilms from "../components/no-films.js";
import SortComponent from "../components/sort.js";
import FilmsContainer from "../components/films-container.js";
import FilmExtraComponent from "../components/film-extra.js";
import {renderHtml, RenderPosition, remove} from "../utils/common.js";
import {SortType} from "../components/sort.js";
import {FILM_COUNT, FILM_AMOUNT_BY_BUTTON} from "../utils/constants.js";
import FilmController from "./film-controller.js";


const renderFilms = (filmsListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmsListElement, onDataChange, onViewChange);
    filmController.render(film);
    return filmController;
  });
};


const getSortedFilms = (films, sortType, from, to) => {
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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showedFilmsControllers = [];
    this._currentVisibleFilms = FILM_COUNT;
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new SortComponent();
    this._filmsContainer = new FilmsContainer();

    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      renderHtml(container, this.noFilmsComponent);
      return;
    }

    let filmsList = container.querySelector(`.films-list`);
    // const filmsListElement = this._filmsContainer.getElement();

    renderHtml(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    renderHtml(filmsList, this._filmsContainer);


    this._renderFilms(films.slice(0, this._currentVisibleFilms));

    this._renderShowMoreButton();

    const renderExtraBoard = (extraMovies, title) => {
      const filmExtraBlock = new FilmExtraComponent(title);

      let main = document.querySelector(`.main`);
      let filmsSection = main.querySelector(`.films`);
      let filmsExtraList = filmExtraBlock.getElement().querySelector(`.films-list__container`);
      renderHtml(filmsSection, filmExtraBlock);
      renderFilms(filmsExtraList, extraMovies, this._onDataChange, this._onViewChange);
    };

    const topRating = films.filter((movie) => movie.rating > 7.5).slice(0, 2);
    renderExtraBoard(topRating, `Top rating`);

    const mostComment = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    renderExtraBoard(mostComment, `Most commented`);
  }

  _renderFilms(films) {
    const filmsListElement = this._filmsContainer.getElement();
    const newFilms = renderFilms(filmsListElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    this._currentVisibleFilms = this._showedFilmsControllers.length;
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(FILM_COUNT);
  }


  _renderShowMoreButton() {
    if (this._currentVisibleFilms >= this._filmsModel.getFilms().length) {
      return;
    }

    const container = document.querySelector(`.films-list`);
    renderHtml(container, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setShowMoreBtnClickHandler(() => {
      const prevVisibleFilms = this._currentVisibleFilms;
      const filmsListElement = this._filmsContainer.getElement();

      this._currentVisibleFilms += FILM_AMOUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), this._sortComponent.getSortType(), prevVisibleFilms, this._currentVisibleFilms);
      const newFilms = renderFilms(filmsListElement, sortedFilms, this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._currentVisibleFilms >= this._filmsModel.getFilms().length) {
        this._currentVisibleFilms = this._filmsModel.getFilms().length;
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((movieController) => {
      movieController.setDefaultView();
    });
  }

  _onSortTypeChange(sortType) {
    this._renderShowMoreButton();
    this._currentVisibleFilms = FILM_COUNT;

    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._currentVisibleFilms);

    this._removeFilms();
    this._renderFilms(sortedFilms);
  }

}
