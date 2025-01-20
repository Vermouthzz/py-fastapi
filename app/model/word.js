module.exports = (app) => {
  const { STRING, INTEGER, DATE, Text } = app.Sequelize;

  const Word = app.model.define("word", {
    word_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word_name: { type: STRING(255), allowNull: false },
    n_interpretation: { type: Text, allowNull: true },
    v_interpretation: { type: Text, allowNull: true },
    adj_interpretation: { type: Text, allowNull: true },
  });
};
