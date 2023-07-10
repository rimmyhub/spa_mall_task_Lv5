const { sequelize } = require("../models");

const { Likes } = sequelize.models;

class LikesRepository {
  findLike = async ({ postId }) => {
    return await Likes.findAll({
      where: { PostId: postId },
      attributes: ["likeId", "PostId", "UserId", "createdAt", "updatedAt"],
      order: [["likeCount", "DESC"]], // 내림차순 정렬
    });
  };

  findById = async ({ userId, postId }) => {
    return await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });
  };

  countLike = async ({ postId }) => {
    const like = await Likes.count({ where: { PostId: postId } });
    return like;
  };

  createLike = async ({ userId, postId }) => {
    const like = await Likes.create(
      { UserId: userId, PostId: postId },
      { returning: true }
    );
    return like;
  };
}

module.exports = LikesRepository;
