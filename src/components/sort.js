import AbstractComponent from "../abstract-component.js";

const SortType = {
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
  BY_DEFAULT: `default`,
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.BY_DEFAULT;
  }

  getTemplate() {
    return (
      `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.BY_DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
      </ul>`
    );
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}

export {SortType};
