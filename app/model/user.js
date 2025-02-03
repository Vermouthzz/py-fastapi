module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define("user", {
    id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
    user_name: {
      type: STRING(30),
      allowNull: false,
      unique: false,
      defaultValue: "普通用户",
      comment: "用户名",
    },
    account: {
      type: STRING(30),
      allowNull: false,
      unique: true,
      comment: "账号",
    },
    password: { type: STRING(200), allowNull: false, comment: "密码" },
    avatar: {
      type: STRING(200),
      allowNull: true,
      defaultValue: "",
      comment: "头像",
    },
    created_at: DATE,
    updated_at: DATE,
  }, {
    // 禁用软删除
    paranoid: false,
  });

  return User;
};
