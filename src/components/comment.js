const createCommentsMarkup = (comment) => {
  const {comments: {author, date, time, emoji, text}} = comment;
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
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
};

const createBlockComments = (comments) => {
  const commentMarkup = comments.map((it, i) => createCommentsMarkup(it, i)).join(`\n`);
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
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
      </div>`
  );
};
export {createBlockComments};
