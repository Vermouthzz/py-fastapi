'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT } = Sequelize;
    await queryInterface.createTable("words", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      word: { type: STRING(50), allowNull: false },
      symbols: { type: STRING(50), allowNull: false },
      part: { type: STRING(50), allowNull: false },
      mean: { type: STRING(255), allowNull: false },
      ex: { type: STRING(500), allowNull: false },
      tran: { type: STRING(500), allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("words");
  },
};
