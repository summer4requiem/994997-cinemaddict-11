import {createUserRank} from "./components/user-rank.js";
import {createNavigation} from "./components/navigation";
import {createCardSection} from "./components/card-section.js";
import {createMostCommented} from "./components/most-commented.js";
import {createTopRated} from "./components/top-rated.js";
import {createFilmCard} from "./components/film-card.js";
import {createShowMoreButton} from "./components/show-more-button.js";
import {generateNavigation} from "./mock/navigation.js";
import {generateFilms, generateDetails} from "./mock/film-card.js";
import {createBlockComments} from "./components/comment.js";
import {generateComments} from "./mock/comments.js";
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
const comments = generateComments(FILM_COUNT);
const popupDetails = generateDetails();


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

renderHtml(document.body, createPopUp(popupDetails[0]));

const filmDetails = document.querySelector(`.film-details`);
renderHtml(filmDetails, createBlockComments(comments));
renderHtml(filmsSection, createTopRated());
renderHtml(filmsSection, createMostCommented());
