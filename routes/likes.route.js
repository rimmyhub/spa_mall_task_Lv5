const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { Likes } = require("../models");

//좋아요 조회
router.get("/posts/:postId/like", async (req, res) => {
  const likes = await Likes.findAll({
    attributes: ["likeId", "PostId", "UserId", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]], // 내림차순 정렬
  });

  return res.status(200).json({ data: likes });
});

//좋아요 만들기
router.post("/posts/:postId/like", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;

  try {
    const existingLike = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });

    if (existingLike) {
      await Likes.destroy({
        where: {
          UserId: userId,
          PostId: postId,
        },
      });
      res.status(200).json({
        liked: false,
      });
    } else {
      await Likes.create({
        UserId: userId,
        PostId: postId,
      });
      res.status(200).json({
        liked: true,
      });
    }
  } catch (error) {
    console.error("오류가 발생했습니다.", error);
    res.status(500).json({ message: "오류가 발생했습니다." });
  }
});

module.exports = router;
