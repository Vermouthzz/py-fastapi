/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1736758304366_8346";

  // add your middleware config here
  config.middleware = ["authToken"];
  config.authToken = {
    enable: true,
    ignore: ["/api/login", "/api/register", "/ws"], // 需要忽略的接口
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: "lhw5201314",
    match: /^\/api/,
    enable: true,
  };

  config.sequelize = {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    database: "egg-word",
    username: "root",
    password: "123456",
    timezone: "+08:00", // 中国时区
    define: {
      freezeTableName: true, // 默认false，当为false的时候， sequelize会自动将表名设置为复数，例如model:User表名就是users
      timestamps: true, // 默认true，会自动添加createdAt、updatedAt两个字段
      createdAt: "created_at", // 将createdAt字段映射到created_at
      updatedAt: "updated_at",
      deletedAt: "deleted_at", // 软删除
      paranoid: true,
      underscored: true, // 下划线风格
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
