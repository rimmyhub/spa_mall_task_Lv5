const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const LikesController = require("../controllers/likes.controller");

const likesController = new LikesController();

//좋아요 조회
router.get("/posts/:postId/like", likesController.findLike);

//좋아요 만들기
router.post("/posts/:postId/like", authMiddleware, likesController.createLike);

module.exports = router;
