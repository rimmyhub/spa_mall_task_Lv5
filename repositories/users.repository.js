const { sequelize } = require("../models");
const { Users } = sequelize.models;

class UsersRepository {
  findNickname = async ({ nickname }) => {
    return await Users.findOne({ where: { nickname } });
  };

  createUser = async ({ nickname, password, confirm }) => {
    return await Users.create({ nickname, password, confirm });
  };
}

module.exports = UsersRepository;
