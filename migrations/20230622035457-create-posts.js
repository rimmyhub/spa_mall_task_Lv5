'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false, // NULL 이 없게 한다
        autoIncrement: true, // 기본키가 생략된 경우에는 테이블에 입력된 기본키 중 가장 큰 값에 1이 증가된 값으로 입력
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER
      },
      UserId: { //user 테이블과 연관됨
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
        references: { //특정한 테이블을 지정할때
          model: 'Users', // Users 모델을 참조합니다.
          key: 'userId', // Users 모델의 userId를 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Users 모델의 userId가 삭제되면(회원탈퇴), Posts 모델의 데이터가 삭제됩니다.
      },
      nickname: {
        allowNull: false, 
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false, 
        type: Sequelize.STRING,
      },
      content: {
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
    await queryInterface.dropTable('Posts');
  }
};