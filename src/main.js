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
import {renderHtml} from "./utils.js";
import {MENU_ITEM, FILMS_AMOUNT, FILM_COUNT, FILM_AMOUNT_BY_BUTTON, ESC_BUTTON} from "./constants.js";


const renderFilm = (filmBoard, film) => {
  const showPopUp = () => {
    renderHtml(document.body, popUp.getElement());
    renderHtml(topContainer, new BlockCommentsComponent(film).getElement());
  };

  const deletePopUp = () => {
    popUp.getElement().remove();
    popUp.removeElement();
    document.removeEventListener(`click`, showPopUp);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_BUTTON) {
      popUp.getElement().remove();
      popUp.removeElement();
    }
  };

  const filmCard = new FilmCardComponent(film);
  const popUp = new PopUpComponent(film);

  const topContainer = popUp.getElement().querySelector(`.form-details__top-container`);
  const cardPoster = filmCard.getElement().querySelector(`.film-card__poster`);
  const cardTitle = filmCard.getElement().querySelector(`.film-card__title`);
  const cardComments = filmCard.getElement().querySelector(`.film-card__comments`);
  const onPopupBtnClose = popUp.getElement().querySelector(`.film-details__close-btn`);

  cardPoster.addEventListener(`click`, showPopUp);
  cardTitle.addEventListener(`click`, showPopUp);
  cardComments.addEventListener(`click`, showPopUp);

  onPopupBtnClose.addEventListener(`click`, deletePopUp);
  document.addEventListener(`keydown`, onEscKeyDown);

  renderHtml(filmBoard, filmCard.getElement());
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const userProfile = new UserRankComponent();

renderHtml(siteHeaderElement, userProfile.getElement());

const generateNav = generateNavigation(MENU_ITEM);
const movies = generateFilms(FILMS_AMOUNT);


const totalFilmsAmount = `total films amount ` + movies.length;

const topRating = movies.filter((movie) => movie.rating > 7.5).slice(0, 2);

const mostComment = movies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);

renderHtml(siteMainElement, new NavigationComponent(generateNav).getElement());
renderHtml(siteMainElement, new CardSectionComponent().getElement());

const filmListContainer = siteMainElement.querySelector(`.films-list__container`);


movies.slice(0, FILM_COUNT)
  .forEach((movie) => {
    renderFilm(filmListContainer, movie);
  });

const filmsSection = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);

renderHtml(filmsList, new ShowMoreButtonComponent().getElement());

const loadMoreButton = filmsSection.querySelector(`.films-list__show-more`);
let currentVisibleFilms = FILM_COUNT;

loadMoreButton.addEventListener(`click`, () => {
  const prevVisibleFilms = currentVisibleFilms;
  currentVisibleFilms = currentVisibleFilms + FILM_AMOUNT_BY_BUTTON;

  movies.slice(prevVisibleFilms, currentVisibleFilms).forEach((item) => renderFilm(filmListContainer, item));
  if (currentVisibleFilms >= movies.length) {
    loadMoreButton.remove();
  }
});

const topRatingList = new FilmExtraComponent(topRating, `Top rated`);
const mostCommentList = new FilmExtraComponent(mostComment, `Most commented`);

renderHtml(filmsSection, topRatingList.getElement());
renderHtml(filmsSection, mostCommentList.getElement());

const totalFilmsSection = document.querySelector(`.footer__statistics`);
renderHtml(totalFilmsSection, totalFilmsAmount);
