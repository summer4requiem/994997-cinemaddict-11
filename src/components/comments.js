// переписано
import {
  EMOTIONS
} from "../utils/constants.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {
  formatCommentDate
} from '../utils/common.js';

const parseFormData = (formData) => {
  return {
    id: String(new Date() + Math.random()),
    comment: `ff`,
    date: Date.now(),
    emotion: formData.get(`comment-emoji`)
  };
};

export default class Comments extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._element = null;
    this._currentEmoji = EMOTIONS[0];
    this._commentDeleteClickHandler = null;
    this._commentAddClickHandler = null;
    this.getData = this.getData.bind(this);
  }

  _createCommentsMarkup(comment) {
    return comment.map(({id, author, text, date, emoji}) => {
      return (
        `<li data-id="${id}"class="film-details__comment">
        <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
        </span>
        <div>
           <p class="film-details__comment-text">${text}</p>
           <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
      );
    })
  .join(`\n`);
  }

  _createEmojiMarkup(emotions) {
    return emotions.map((emoji, index) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${index === 0 ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-${emoji}">
            <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}">
		 </label>`
      );
    })
      .join(`\n`);
  }

  getTemplate() {
    const comments = this._film.comments;
    const commentMarkup = this._createCommentsMarkup(comments);
    const emojiMarkup = this._createEmojiMarkup(EMOTIONS);

    return (
      `<div class="form-details__bottom-container">
         <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
           ${commentMarkup}
          </ul>
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            <img src="./images/emoji/${this._currentEmoji}.png" alt="" width="55" height="55">
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
            ${emojiMarkup}
            </div>
          </div>
        </section>
        </div>`
    );
  }

  setOnCommentDeleteClick(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        button.disabled = true;
        button.textContent = `Deleting...`;
        const commentId = button.closest(`.film-details__comment`).dataset.id;

        handler(commentId, button);
      }));

    this._commentDeleteClickHandler = handler;
  }

  setOnCommentAddClick(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keypress`, (event) => {
      if (event.ctrlKey && event.key === `Enter`) {
        const text = event.target.value;
        const emoji = this._currentEmoji;

        handler({
          id: String(new Date() + Math.random()),
          author: `New John`,
          date: formatCommentDate(new Date()),
          emoji,
          text,
        });
      }
    });
    this._commentAddClickHandler = handler;
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return {
      comment: parseFormData(formData),
      movie: this._movie
    };
  }

  setOnEmojisClick() {
    this.getElement().querySelector(`.film-details__new-comment`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.name !== `comment-emoji`) {
          return;
        }
        this._currentEmoji = evt.target.value;
        this.getElement().querySelector(`.film-details__add-emoji-label img`).src = `./images/emoji/` + evt.target.value + `.png`;
      });
  }

  recoveryListeners() {
    this.setOnCommentDeleteClick(this._commentDeleteClickHandler);
    this.setOnCommentAddClick(this._commentAddClickHandler);
    this.setOnEmojisClick();
  }
}
