const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require("../controllers/posts.controller");

const postsController = new PostsController();

// 게시글 전체 목록 조회
router.get("/posts", postsController.findAllPost);

// 게시글 상세 조회
router.get("/posts/:postId", postsController.findPost);

// 게시글 생성
router.post("/posts", authMiddleware, postsController.createPost);

// 게시글 수정
router.put("/posts/:postId", authMiddleware, postsController.updatePost);

// 게시글 삭제
router.delete("/posts/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
