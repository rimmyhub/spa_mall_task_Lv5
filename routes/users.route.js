const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const router = express.Router();
const UsersController = require("../controllers/users.contraller");

const usersController = new UsersController();

// 회원가입
router.post("/signup", usersController.signUp);

// 로그인
router.post("/login", usersController.logIn);

module.exports = router;
