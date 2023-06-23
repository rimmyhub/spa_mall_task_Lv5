'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false, // NULL 이 없게 한다
        autoIncrement: true, // 기본키가 생략된 경우에는 테이블에 입력된 기본키 중 가장 큰 값에 1이 증가된 값으로 입력
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      confirm: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now") // Now라고 써도 되는데 sequelize에서 잘 안되는 이슈가 있어 fn("now")로 씀
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now") // Now라고 써도 되는데 sequelize에서 잘 안되는 이슈가 있어 fn("now")로 씀
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};