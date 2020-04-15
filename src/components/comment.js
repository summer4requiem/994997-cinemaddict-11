import {EMOTIONS} from "../constants.js";
import {createElement} from "../utils.js";

const createCommentsMarkup = (comment) => {
  return comment.map(({author, text, date, emoji, time}) => {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
        </span>
        <div>
           <p class="film-details__comment-text">${text}</p>
           <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date} ${time}</span>
        <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  })
  .join(`\n`);
};

const createEmojiMarkup = (emotions) => {
  return emotions.map((emoji) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
          <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}">
         </label>
    `);
  })
  .join(`\n`);
};

const createBlockComments = (movies) => {
  const comments = movies.comments;
  const commentMarkup = createCommentsMarkup(comments);
  const emojiMarkup = createEmojiMarkup(EMOTIONS);

  return (
    `<div class="form-details__bottom-container">
       <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
         ${commentMarkup}
        </ul>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>
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
};

export default class BlockComments {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createBlockComments(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
