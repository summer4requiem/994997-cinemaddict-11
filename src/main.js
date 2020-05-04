import PageController from "./controllers/page-controller.js";
import CardSectionComponent from "./components/card-section.js";
import {generateFilms} from "./mock/film-card.js";
import {renderHtml} from "./utils.js";
import NavigationComponent from "./components/navigation.js";
import {FILMS_AMOUNT} from "./constants.js";
import UserRankComponent from "./components/user-rank.js";
import FilmsModel from "./models/films.js";

const siteMainElement = document.querySelector(`.main`);
const films = generateFilms(FILMS_AMOUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

renderHtml(siteMainElement, new NavigationComponent(films));

const userProfile = new UserRankComponent();

const siteHeaderElement = document.querySelector(`.header`);
renderHtml(siteHeaderElement, userProfile);


const cardSection = new CardSectionComponent();
const pageControl = new PageController(cardSection, filmsModel);

renderHtml(siteMainElement, cardSection);
pageControl.render(films);


const totalFilmsSection = document.querySelector(`.footer__statistics`);
totalFilmsSection.innerHTML = films.length + ` total films amount`;
