"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT } = Sequelize;
    await queryInterface.createTable("words", {
      word_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      word_name: { type: STRING(255), allowNull: false },
      n_interpretation: { type: TEXT, allowNull: true },
      v_interpretation: { type: TEXT, allowNull: true },
      adj_interpretation: { type: TEXT, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("words");
  },
};
