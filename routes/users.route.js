const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const router = express.Router();

// 회원가입
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;
  const isExistUser = await Users.findOne({ where: { nickname } });

  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
  } else if (password !== confirm) {
    return res
      .status(400)
      .json({ message: "비밀번호와 확인이 일치하지 않습니다." });
  }
  // 닉네임 유효성 검사 : 닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9), 한글로 구성
  const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,}$/;
  if (!nicknameRegex.test(nickname)) {
    res.status(412).json({
      errorMessage: "닉네임의 형식이 일치하지 않습니다.",
    });
    return;
  }

  // 비밀번호 유효성 검사 : 비밀번호는 최소 4자 이상이어야 하며, 닉네임과 같은 값이 포함될 수 없음, 비밀번호에 숫자가 최소한 하나 이상 포함
  const passwordRegex = new RegExp(`^(?!.*${nickname})(?=.*\\d).{4,}$`);
  if (!passwordRegex.test(password)) {
    res.status(412).json({
      errorMessage: "패스워드 형식이 일치하지 않습니다.",
    });
    return;
  }

  // Users 테이블에 사용자를 추가합니다.
  try {
    await Users.create({ nickname, password, confirm });
    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    // 예외케이스에서 처리하지 못한 에러
    res.status(400).json({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  const user = await Users.findOne({ where: { nickname } });

  // user가 존재하지 않거나 user를 찾았지만, user의 비밀번호와 입력한 비밀번호가 다를때
  if (!user || password !== user.password) {
    res.status(412).json({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
    });
    return;
  }

  try {
    //jwt를 생성하고
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "로그인에 성공하였습니다." }); //response 할당
  } catch (error) {
    res.status(400).json({
      errorMessage: "로그인에 실패하였습니다.", // 예외 케이스에서 처리하지 못한 에러
    });
  }
});

module.exports = router;
