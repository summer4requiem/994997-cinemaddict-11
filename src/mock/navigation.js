const navItemsTitle = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateNavigation = () => {
  return navItemsTitle.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateNavigation};
