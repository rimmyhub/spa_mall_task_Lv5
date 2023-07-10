const { Posts } = require("../models");
const { Op, Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
});

class PostsRepository {
  findAllPost = async () => {
    return await Posts.findAll({
      attributes: [
        "postId",
        "userId",
        "title",
        "createdAt",
        "updatedAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Posts.postId)"
          ),
          "likeCount",
        ],
      ],
      order: [["likeCount", "DESC"]],
    });
  };

  findPost = async ({ postId }) => {
    return await Posts.findOne({
      attributes: [
        "postId",
        "userId",
        "title",
        "content",
        "createdAt",
        "updatedAt",
      ],
      where: { postId },
    });
  };

  createPost = async ({ postId, userId, title, content }) => {
    return await Posts.create({
      postId,
      UserId: userId,
      title,
      content,
    });
  };

  findById = async ({ postId }) => {
    return await Posts.findOne({ where: { postId } });
  };

  updatePost = async ({ postId, userId, title, content }) => {
    await Posts.update(
      { title, content }, // title과 content 컬럼을 수정합니다.
      {
        where: {
          [Op.and]: [{ postId }, { UserId: userId }],
        },
      }
    );
  };

  deletePost = async ({ postId, userId }) => {
    await Posts.destroy({
      where: {
        [Op.and]: [{ postId }, { UserId: userId }],
      },
    });
  };
}

module.exports = PostsRepository;
