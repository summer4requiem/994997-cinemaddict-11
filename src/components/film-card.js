
export const createFilmCard = (card) => {
  const {title, rating, duration, genre, year, isWatched, isFavorite, isAdded, posterSrc} = card;

  const watchlistButtonInactiveClass = isWatched ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;
  const addWatchlistButtonInactiveClass = isAdded ? `` : `card__btn--disabled`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">3 comments</>
      <form class="film-card__controls">
        <button class="film-card__controls-item button ${watchlistButtonInactiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button ${addWatchlistButtonInactiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteButtonInactiveClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};
