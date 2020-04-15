import NavigationComponent from "./components/navigation.js";
import CardSectionComponent from "./components/card-section.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import UserRankComponent from "./components/user-rank.js";
import FilmExtraComponent from "./components/film-extra.js";
import FilmCardComponent from "./components/film-card.js";
import {generateNavigation} from "./mock/navigation.js";
import {generateFilms} from "./mock/film-card.js";
import BlockCommentsComponent from "./components/comment.js";
import PopUpComponent from "./components/popup.js";
import {renderHtml, RenderPosition} from "./utils.js";
import {MENU_ITEM, FILMS_AMOUNT, FILM_COUNT, FILM_AMOUNT_BY_BUTTON} from "./constants.js";


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
renderHtml(siteHeaderElement, new UserRankComponent().getElement(), RenderPosition.BEFOREEND);


const generateNav = generateNavigation(MENU_ITEM);
const movies = generateFilms(FILMS_AMOUNT);

const totalFilmsAmount = `total films amount ` + movies.length;

const topRating = movies.filter((movie) => movie.rating > 7.5).slice(0, 2);

const mostComment = movies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);

renderHtml(siteMainElement, new NavigationComponent(generateNav).getElement(), RenderPosition.BEFOREEND);
renderHtml(siteMainElement, new CardSectionComponent().getElement(), RenderPosition.BEFOREEND);

const filmListContainer = siteMainElement.querySelector(`.films-list__container`);

movies.slice(0, FILM_COUNT).forEach((movie) => renderHtml(filmListContainer, new FilmCardComponent(movie).getElement(), RenderPosition.BEFOREEND));


const filmsSection = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);

renderHtml(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = filmsSection.querySelector(`.films-list__show-more`);
let currentVisibleFilms = FILM_COUNT;

loadMoreButton.addEventListener(`click`, () => {
  const prevVisibleFilms = currentVisibleFilms;
  currentVisibleFilms = currentVisibleFilms + FILM_AMOUNT_BY_BUTTON;

  movies.slice(prevVisibleFilms, currentVisibleFilms).forEach((item) => renderHtml(filmListContainer, new FilmCardComponent(item).getElement(), RenderPosition.BEFOREEND));
  if (currentVisibleFilms >= movies.length) {
    loadMoreButton.remove();
  }
});


renderHtml(filmsSection, new FilmExtraComponent(topRating, `Top rated`).getElement(), RenderPosition.BEFOREEND);
renderHtml(filmsSection, new FilmExtraComponent(mostComment, `Most commented`).getElement(), RenderPosition.BEFOREEND);
renderHtml(document.body, new PopUpComponent(movies[0]).getElement(), RenderPosition.BEFOREEND);

const totalFilmsSection = document.querySelector(`.footer__statistics`);
const filmDetails = document.querySelector(`.film-details`);
renderHtml(filmDetails, new BlockCommentsComponent(movies[0]).getElement(), RenderPosition.BEFOREEND);
renderHtml(totalFilmsSection, totalFilmsAmount);
