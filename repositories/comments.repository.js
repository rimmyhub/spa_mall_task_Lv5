const { Comments } = require("../models");
const { Op } = require("sequelize");

class CommentsRepository {
  findComment = async ({ postId }) => {
    return await Comments.findAll({
      where: { PostId: postId },
      attributes: [
        "commentId",
        "PostId",
        "UserId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]], // 내림차순 정렬
    });
  };

  createComment = async ({ userId, postId, comment }) => {
    return await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
  };

  findById = async ({ commentId }) => {
    return await Comments.findOne({ where: { commentId } });
  };

  updateComment = async ({ comment, userId, commentId }) => {
    await Comments.update(
      { comment }, // comment 를 수정합니다
      {
        where: {
          [Op.and]: [{ commentId }, { UserId: userId }],
        },
      }
    );
  };

  deleteComment = async ({ userId, commentId }) => {
    await Comments.destroy({
      where: {
        [Op.and]: [{ commentId }, { UserId: userId }],
      },
    });
  };
}

module.exports = CommentsRepository;
