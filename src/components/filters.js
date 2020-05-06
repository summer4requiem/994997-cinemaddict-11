import AbstractComponent from "./abstract-component.js";

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _createFilterMarkup(filter, isChecked) {
    const {name, count} = filter;
    const mainLink = `All movies`;
    const isMainLink = name === mainLink;

    return (
      `<a href="#${name}" id="${name}" class="main-navigation__item main-navigation__item ${isChecked ? `checked` : ``}">
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
    return this._createFilterTemplate(this._filters);
  }


  setFilterChangeHandler(handler) {
    let selectedA;
    const highlight = (a) => {
      const active = `main-navigation__item--active`;

      if (selectedA) {
        selectedA.classList.remove(active);
      }
      selectedA = a;
      selectedA.classList.add(active);
    };

    const navLinks = this.getElement().querySelector(`.main-navigation__items`);
    navLinks.addEventListener(`click`, (event) => {
      if (event.target.tagName !== `A`) {
        return;
      }
      const filterName = event.target.id;
      highlight(event.target);
      handler(filterName);
    });
  }
}
