'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. Users 모델에서
      this.hasMany(models.Posts, { // 2. Posts 모델에게 1:N 관계 설정
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'UserId', // 4. Posts 모델의 UserId 컬럼과 연결
      });
    }
  }

  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false, 
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      confirm: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, //models는 fn("now")라고 굳이 안써도 됨
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, //models는 fn("now")라고 굳이 안써도 됨
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};