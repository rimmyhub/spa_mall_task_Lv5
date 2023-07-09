const CommentsService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentsService();

  findComment = async (req, res) => {
    const { postId } = req.params;

    const { code, data } = await this.commentsService.findComment({ postId });
    res.status(code).json({ data });
  };

  cerateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    const { code, data } = await this.commentsService.createComment({
      userId,
      postId,
      comment,
    });

    res.status(code).json({ data });
  };

  updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;

    const { code, data } = await this.commentsService.updateComment({
      commentId,
      userId,
      comment,
    });
    res.status(code).json({ data });
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const { code, data } = await this.commentsService.deleteComment({
      commentId,
      userId,
    });
    res.status(code).json({ data });
  };
}

module.exports = CommentsController;
