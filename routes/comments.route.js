const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const CommentsController = require("../controllers/comments.controller");

const commentsController = new CommentsController();

// 게시글 내 댓글 조회
router.get("/posts/:postId/comments", commentsController.findComment);

// 댓글 작성 : 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 작성 가능
router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentsController.cerateComment
);

// 댓글 수정
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentsController.updateComment
);

//댓글 삭제
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentsController.deleteComment
);

module.exports = router;
