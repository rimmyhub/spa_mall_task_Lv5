const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();

  findLike = async (req, res) => {
    const { postId } = req.params;

    const { code, data } = await this.likesService.findLike({ postId });
    res.status(code).json({ data });
  };

  createLike = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const { unlike, like, code, data } = await this.likesService.createLike({
      userId,
      postId,
    });
    res.status(code).json({ data, like, unlike });
  };
}

module.exports = LikesController;
