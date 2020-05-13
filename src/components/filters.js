import AbstractSmartComponent from "./abstract-smart-component.js";
import {
  getFilmsByFilter
} from "../utils/filter-utils.js";
import {
  FilterType
} from "../utils/filter-utils.js";

export default class Filters extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._filterChangeHandler = null;
  }

  _getFilters() {
    const allFilms = this._filmsModel.getFilmsAll();
    return Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._filmsModel.activeFilterType,
      };
    });
  }

  _createFilterMarkup(filter, isChecked) {
    const {
      name,
      count
    } = filter;
    const mainLink = `All movies`;
    const isMainLink = name === mainLink;

    return (
      `<a href="#${name}" id="${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">
      ${name}${isMainLink ? `` : `<span class="main-navigation__item-count">${count}</span>`}
       </a>`
    );
  }

  _createFilterTemplate(filters) {
    const filtersMarkup = filters.map((it) => this._createFilterMarkup(it, it.checked)).join(`\n`);

    return (
      `<nav class="main-navigation">
       <div class="main-navigation__items">
       ${filtersMarkup}
       </div>
     <a href="#stats" class="main-navigation__additional">Stats</a>
     </nav>`
    );
  }

  getTemplate() {
    return this._createFilterTemplate(this._getFilters());
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
  }

  setFilterChangeHandler(handler) {
    const navLinks = this.getElement().querySelector(`.main-navigation__items`);
    navLinks.addEventListener(`click`, (event) => {
      if (event.target.tagName !== `A`) {
        return;
      }
      const filterName = event.target.id;
      handler(filterName);
    });
    this._filterChangeHandler = handler;
  }
}
