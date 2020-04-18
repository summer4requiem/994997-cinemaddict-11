import {createElement} from "../utils.js";

export default class Navigations {
  constructor(navItems) {
    this._navItems = navItems;
    this._element = null;
  }

  _createNavigation(navItem, isActive) {
    const mainLink = `All movies`;
    const {name, count} = navItem;
    const linkHref = name.toLowerCase().split(` `)[0];
    const isMainLink = name === mainLink;
    return (
      `<a href="#${linkHref}"class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}">
      ${name}${isMainLink ? `` : `<span class="main-navigation__item-count">${count}</span>`}
       </a>`
    );
  }

  _createNavigationMarkup(navItems) {
    const itemsMarkup = navItems.map((it, i) => this._createNavigation(it, i === 0)).join(`\n`);
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
         ${itemsMarkup}
       </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
       </nav>
        <ul class="sort">
          <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" class="sort__button">Sort by date</a></li>
          <li><a href="#" class="sort__button">Sort by rating</a></li>
       </ul>`
    );
  }

  getTemplate() {
    return this._createNavigationMarkup(this._navItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
