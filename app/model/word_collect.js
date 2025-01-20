module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const WordCollect = app.model.define('word_collect', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word_id: {type: INTEGER, allowNull: false },
    user_id: {type: INTEGER, allowNull: false },
    created_at: DATE,
    updated_at: DATE,
  });


  return WordCollect;
}