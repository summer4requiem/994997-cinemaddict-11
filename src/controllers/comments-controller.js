import {renderHtml, remove} from "../utils/common.js";
import CommentsComponent from "../components/comments.js";

export default class CommentController {
  constructor(container, commentsModel, commentsComponent) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentComponent = null;
    this._commentsComponent = commentsComponent;
  }

  render(comment) {
    this._commentComponent = new CommentsComponent(comment);
    renderHtml(this._container, this._commentComponent);

    this._commentComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      const comments = this._commentsModel.onDeleteComment(comment.id);
      remove(this._commentComponent);
      this._commentsComponent.rerender(comments);
    });
  }
}
