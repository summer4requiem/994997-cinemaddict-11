import PageController from "./controllers/page-controller.js";
import CardSectionComponent from "./components/card-section.js";
import {generateFilms} from "./mock/film-card.js";
import {renderHtml} from "./utils.js";
import NavigationComponent from "./components/navigation.js";
import {FILMS_AMOUNT} from "./constants.js";
import UserRankComponent from "./components/user-rank.js";

const siteMainElement = document.querySelector(`.main`);
const movies = generateFilms(FILMS_AMOUNT);

renderHtml(siteMainElement, new NavigationComponent(movies));

const userProfile = new UserRankComponent();

const siteHeaderElement = document.querySelector(`.header`);
renderHtml(siteHeaderElement, userProfile);


const cardSection = new CardSectionComponent();
const pageControl = new PageController(cardSection);

renderHtml(siteMainElement, cardSection);
pageControl.render(movies);


// const totalFilmsSection = document.querySelector(`.footer__statistics`);
// const totalFilmsAmount = `total films amount ` + movies.length;
// renderHtml(totalFilmsSection, totalFilmsAmount);
