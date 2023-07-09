const PostsRepository = require("../repositories/posts.repository");

class PostsService {
  postsRepository = new PostsRepository();

  findAllPost = async () => {
    try {
      const post = await this.postsRepository.findAllPost();
      return { code: 200, data: post };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  findPost = async ({ postId }) => {
    try {
      const post = await this.postsRepository.findPost({ postId });

      if (!post) {
        return { code: 404, data: "해당 게시글을 찾을 수 없습니다." };
      }

      return { code: 200, data: post };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  createPost = async ({ postId, userId, title, content }) => {
    try {
      const post = await this.postsRepository.createPost({
        postId,
        userId,
        title,
        content,
      });

      return { code: 200, data: post };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  updatePost = async ({ postId, userId, title, content }) => {
    // 게시글을 조회합니다.
    try {
      const existsPost = await this.postsRepository.findById({
        postId,
      });

      if (!existsPost) {
        return { code: 404, data: "게시글이 존재하지 않습니다." };
      } else if (existsPost.UserId !== userId) {
        return { code: 401, data: "게시글을 수정할 권한이 없습니다." };
      }
    } catch (error) {
      return { code: 500, data: error.message };
    }

    // 게시글의 권한을 확인하고, 게시글을 수정합니다.
    try {
      await this.postsRepository.updatePost({
        postId,
        userId,
        title,
        content,
      });
      return { code: 200, data: "게시글을 수정하였습니다." };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  deletePost = async ({ postId, userId }) => {
    // 게시글을 조회합니다.
    try {
      const existsPost = await this.postsRepository.findById({
        postId,
      });

      if (!existsPost) {
        return { code: 404, data: "게시글이 존재하지 않습니다" };
      } else if (existsPost.UserId !== userId) {
        return { code: 401, data: "게시글을 삭제할 권한이 없습니다." };
      }
    } catch (error) {
      return { code: 500, data: error.message };
    }

    // 게시글의 권한을 확인하고, 게시글을 삭제합니다.
    try {
      await this.postsRepository.deletePost({ postId, userId });

      return { code: 200, data: "게시글을 삭제하였습니다." };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };
}

module.exports = PostsService;
