import {EMOTIONS} from "../constants.js";
import AbstractComponent from "../abstract-component.js";

export default class BlockComments extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
    this._element = null;
  }

  _createCommentsMarkup(comment) {
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
  }

  _createEmojiMarkup(emotions) {
    return emotions.map((emoji) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
            <label class="film-details__emoji-label" for="emoji-${emoji}">
            <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}">
           </label>
      `);
    })
    .join(`\n`);
  }

  _createBlockComments(movies) {
    const comments = movies.comments;
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
  }

  getTemplate() {
    return this._createBlockComments(this._comments);
  }
}
