const UsersService = require("../services/usets.service");

class UsersController {
  usersService = new UsersService();

  signUp = async (req, res) => {
    const { nickname, password, confirm } = req.body;

    const { code, data } = await this.usersService.signUp({
      nickname,
      password,
      confirm,
    });
    res.status(code).json({ data });
  };

  logIn = async (req, res) => {
    const { nickname, password } = req.body;

    const { code, data, token } = await this.usersService.logIn({
      nickname,
      password,
    });
    res.cookie("authorization", `Bearer ${token}`);
    res.status(code).json({ data });
  };
}

module.exports = UsersController;
