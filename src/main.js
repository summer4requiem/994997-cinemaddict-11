import {createUserRank} from "./components/user-rank.js";
import {createNavigation} from "./components/navigation";
import {createCardSection} from "./components/card-section.js";
import {createFilmCard, createfilmExtra} from "./components/film-card.js";
import {createShowMoreButton} from "./components/show-more-button.js";
import {generateNavigation} from "./mock/navigation.js";
import {generateFilms} from "./mock/film-card.js";
import {createBlockComments} from "./components/comment.js";
import {createPopUp} from "./components/popup.js";


const MENU_ITEM = 4;
const FILMS_AMOUNT = 15;
const FILM_COUNT = 5;
const FILM_AMOUNT_BY_BUTTON = 5;


const renderHtml = (container, htmlData, place = `beforeend`) => {
  container.insertAdjacentHTML(place, htmlData);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
renderHtml(siteHeaderElement, createUserRank());

const generateNav = generateNavigation(MENU_ITEM);
const movies = generateFilms(FILMS_AMOUNT);
const totalFilmsAmount = `total films amount ` + movies.length;

const topRating = movies.filter((movie) => movie.rating > 7.5).slice(0, 2);

const mostComment = movies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);


renderHtml(siteMainElement, createNavigation(generateNav));
renderHtml(siteMainElement, createCardSection());

const filmListContainer = siteMainElement.querySelector(`.films-list__container`);

movies.slice(0, FILM_COUNT).forEach((movie) => renderHtml(filmListContainer, createFilmCard(movie)));
let currentVisibleFilms = FILM_COUNT;

const filmsSection = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);

renderHtml(filmsList, createShowMoreButton());
const loadMoreButton = filmsSection.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevVisibleFilms = currentVisibleFilms;
  currentVisibleFilms = currentVisibleFilms + FILM_AMOUNT_BY_BUTTON;

  movies.slice(prevVisibleFilms, currentVisibleFilms).forEach((item) => renderHtml(filmListContainer, createFilmCard(item)));
  if (currentVisibleFilms >= movies.length) {
    loadMoreButton.remove();
  }
});

renderHtml(filmsSection, createfilmExtra(topRating, `Top rated`));
renderHtml(filmsSection, createfilmExtra(mostComment, `Most commented`));

renderHtml(document.body, createPopUp(movies[0]));
const totalFilmsSection = document.querySelector(`.footer__statistics`);

const filmDetails = document.querySelector(`.film-details`);
renderHtml(filmDetails, createBlockComments(movies[0]));
renderHtml(totalFilmsSection, totalFilmsAmount);
