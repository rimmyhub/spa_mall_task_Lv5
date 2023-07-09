const PostsService = require("../services/posts.service");

class PostsController {
  postsService = new PostsService();

  findAllPost = async (req, res) => {
    const { code, data } = await this.postsService.findAllPost();
    res.status(code).json({ data });
  };

  findPost = async (req, res) => {
    const { postId } = req.params;
    const { code, data } = await this.postsService.findPost({ postId });
    res.status(code).json({ data });
  };

  createPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, title, content } = req.body;

    const { code, data } = await this.postsService.createPost({
      userId,
      postId,
      title,
      content,
    });
    res.status(code).json({ data });
  };

  updatePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const { code, data } = await this.postsService.updatePost({
      postId,
      userId,
      title,
      content,
    });
    res.status(code).json({ data });
  };

  deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const { code, data } = await this.postsService.deletePost({
      postId,
      userId,
    });
    res.status(code).json({ data });
  };
}

module.exports = PostsController;
