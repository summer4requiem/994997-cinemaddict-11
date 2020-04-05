import {createUserRank} from "./components/user-rank.js";
import {createNavigation} from "./components/navigation";
import {createCardSection} from "./components/card-section.js";
import {createMostCommented} from "./components/most-commented.js";
import {createTopRated} from "./components/top-rated.js";
import {createFilmCard} from "./components/film-card.js";
import {createShowMoreButton} from "./components/show-more-button.js";


const CARD_COUNT = 5;

const renderHtml = (container, htmlData, place = `beforeend`) => {
  container.insertAdjacentHTML(place, htmlData);
};


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


renderHtml(siteHeaderElement, createUserRank());
renderHtml(siteMainElement, createNavigation());
renderHtml(siteMainElement, createCardSection());

const filmListContainer = siteMainElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  renderHtml(filmListContainer, createFilmCard());
}

const filmsSection = siteMainElement.querySelector(`.films`);

const filmsList = siteMainElement.querySelector(`.films-list`);
renderHtml(filmsList, createShowMoreButton());
renderHtml(filmsSection, createTopRated());
renderHtml(filmsSection, createMostCommented());
