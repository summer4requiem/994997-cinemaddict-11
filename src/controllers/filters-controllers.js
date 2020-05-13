// переписано
import FiltersComponent from "../components/filters.js";
import {
  renderHtml,
  replace
} from "../utils/common.js";

export default class FiltersController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const oldComponent = this._filterComponent;
    this._filterComponent = new FiltersComponent(this._filmsModel);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (!oldComponent) {
      renderHtml(container, this._filterComponent);
    } else {
      replace(this._filterComponent, oldComponent);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._filterComponent.rerender();
  }

  _onDataChange() {
    this.render();
  }
}
