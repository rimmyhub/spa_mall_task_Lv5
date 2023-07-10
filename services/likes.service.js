const LikesRepository = require("../repositories/likes.repository");

class LikesService {
  likesRepository = new LikesRepository();

  findLike = async ({ postId }) => {
    try {
      const likes = await this.likesRepository.findLike({ postId });

      return { code: 200, data: likes };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  createLike = async ({ userId, postId }) => {
    try {
      const existLike = await this.likesRepository.findById({ userId, postId });

      if (existLike) {
        const unlike = await existLike.destroy();
        const downCount = await this.likesRepository.countLike({
          postId,
          userId,
        });
        return { code: 200, data: downCount, unlike };
      }

      const like = await this.likesRepository.createLike({ userId, postId });
      const upCount = await this.likesRepository.countLike({ postId, userId });
      return { code: 200, data: upCount, like };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };
}

module.exports = LikesService;
