import PageController from "./controllers/page-controller.js";
import CardSectionComponent from "./components/card-section.js";
import {generateFilms} from "./mock/film-card.js";
import {renderHtml} from "./utils/common.js";
import {FILMS_AMOUNT} from "./utils/constants.js";
import UserRankComponent from "./components/user-rank.js";
import FilmsModel from "./models/films.js";
import FilterController from "./controllers/filters.js";

const siteMainElement = document.querySelector(`.main`);
const films = generateFilms(FILMS_AMOUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const userProfile = new UserRankComponent();
renderHtml(siteHeaderElement, userProfile);

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const cardSection = new CardSectionComponent();
const pageControl = new PageController(cardSection, filmsModel);

renderHtml(siteMainElement, cardSection);
pageControl.render(films);


const totalFilmsSection = document.querySelector(`.footer__statistics`);
totalFilmsSection.innerHTML = films.length + ` total films amount`;
