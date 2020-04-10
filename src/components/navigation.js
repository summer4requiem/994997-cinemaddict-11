const createNavigationMarkup = (navItem, isActive) => {
  const {name, count} = navItem;
  return (
    `<a href="#${name}"class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}">${name}
   <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createNavigation = (navItems) => {
  const itemsMarkup = navItems.map((it, i) => createNavigationMarkup(it, i === 0)).join(`\n`);

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
};
export {createNavigationMarkup, createNavigation};
