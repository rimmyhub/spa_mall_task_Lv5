const jwt = require("jsonwebtoken");
const UsersRepository = require("../repositories/users.repository");

class UsersService {
  usersRepository = new UsersRepository();

  signUp = async ({ nickname, password, confirm }) => {
    try {
      const isExistUser = await this.usersRepository.findNickname({ nickname });
      if (isExistUser) {
        return { code: 409, data: "이미 존재하는 닉네임 입니다." };
      } else if (password !== confirm) {
        return { code: 400, data: "비밀번호와 확인이 일치하지 않습니다." };
      }
      const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,}$/;
      if (!nicknameRegex.test(nickname)) {
        return { code: 412, data: "닉네임의 형식이 일치하지 않습니다." };
      }

      const passwordRegex = new RegExp(`^(?!.*${nickname})(?=.*\\d).{4,}$`);
      if (!passwordRegex.test(password)) {
        return { code: 412, data: "패스워드 형식이 일치하지 않습니다." };
      }

      await this.usersRepository.createUser({ nickname, password, confirm });
      return { code: 201, data: "회원가입이 완료되었습니다." };
    } catch (error) {
      return { code: 400, data: "요청한 데이터 형식이 올바르지 않습니다." };
    }
  };

  logIn = async ({ nickname, password }) => {
    const user = await this.usersRepository.findNickname({ nickname });
    if (!user || password !== user.password) {
      return { code: 412, data: "닉네임 또는 패스워드를 확인해주세요." };
    }
    try {
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.JWT_SECRET_KEY
      );
      return { code: 200, data: "로그인에 성공하였습니다.", token };
    } catch (error) {
      return { code: 400, data: "로그인에 실패하였습니다." };
    }
  };
}

module.exports = UsersService;
