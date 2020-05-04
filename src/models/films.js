export default class Films {
  constructor() {
    this._films = [];
    this._dataChangeHandlers = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateFilms(id, film) {
    const index = this._films.findIndex((it) => it === id);
    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandlers(handlers) {
    this._dataChangeHandlers.push(handlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

}
