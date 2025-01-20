module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Word = app.model.define("word", {
    word_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word_name: { type: STRING(255), allowNull: false },
    n_interpretation: { type: TEXT, allowNull: true },
    v_interpretation: { type: TEXT, allowNull: true },
    adj_interpretation: { type: TEXT, allowNull: true },
  });
};
