module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Words = app.model.define("words", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word: { type: STRING(50), allowNull: false },
    symbols: { type: STRING(50), allowNull: false },
    part: { type: STRING(50), allowNull: false },
    mean: { type: STRING(255), allowNull: false },
    ex: { type: STRING(500), allowNull: false },
    tran: { type: STRING(500), allowNull: false }
  }, {
    // 禁用软删除
    paranoid: false,
  });


  return Words
};
