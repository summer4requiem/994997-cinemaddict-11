const FilterType = {
  All: `All movies`,
  WATCHLIST: `Watchlist`,
  HISYORY: `History`,
  FAVORITES: `Favorites`,
};


const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return films.filter((movie) => movie.isWatched);
    case FilterType.HISYORY:
      return films.filter((movie) => movie.isAdded);
    case FilterType.FAVORITES:
      return films.filter((movie) => movie.isFavorite);

  }
  return films;
};


export {getFilmsByFilter, FilterType};
