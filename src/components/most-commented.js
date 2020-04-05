export const createMostCommented = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      <article class="film-card">
        <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
        <p class="film-card__rating">2.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1964</span>
          <span class="film-card__duration">1h 21m</span>
          <span class="film-card__genre">Comedy</span>
        </p>
        <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
        <a class="film-card__comments">465 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
        </form>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">Made for Each Other</h3>
        <p class="film-card__rating">5.8</p>
        <p class="film-card__info">
          <span class="film-card__year">1939</span>
          <span class="film-card__duration">1h 32m</span>
          <span class="film-card__genre">Comedy</span>
        </p>
          <img src="./images/posters/made-for-each-other.png" alt="" class="film-card__poster">
          <p class="film-card__description">John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…</p>
          <a class="film-card__comments">56 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>
    </div>
  </section>`
  );
};
