module.exports = (app) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Word = app.model.define("word", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word: { type: STRING(255), allowNull: false },
  });
};
