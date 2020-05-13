export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  setComments(films) {
    this._comments = [];
    films.forEach((film) => {
      film.comments.forEach((comment) => {
        this._comments.push(Object.assign({}, comment, {filmId: film.id}));
      });
    });
  }

  addFilm(film) {
    this._films = [].concat(film, this._films);
    this._callHandlers(this._dataChangeHandlers);
  }

  getComments(film) {
    return this._comments.filter((comment) => comment.filmId === film.id);
  }

  getCommentsAll() {
    return this._comments;
  }

  updateComments(comments, filmId) {
    this._comments = this._comments.filter((comment) => comment.filmId !== filmId);
    this._comments = [].concat(this._comments, comments);
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
