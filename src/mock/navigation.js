const navItemsTitle = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateNavigation = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched);
  const addedFilms = films.filter((film) => film.isAdded);
  const favoriteFilms = films.filter((film) => film.isFavorite);

  const navItemsCount = [0, watchedFilms.length, addedFilms.length, favoriteFilms.length];

  return navItemsTitle.map((it, i) => {
    return {
      name: it,
      count: navItemsCount[i]
    };
  });
};

export {generateNavigation};
