/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require("path");
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
    ignore: ["/user/login", "/user/register", '/ws', '/upload/*', '/app/public/*'], // 需要忽略的接口
  };

  // 文件静态路径
  config.static = {
    prefix: '/app/public', //访问前缀
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: true,
  };

  config.multipart = {
    mode: "file",
    tmpdir: path.join(appInfo.baseDir, "/app/public/uploads/"),
    cleanSchedule: {
      cron: '0 30 4 * * *',  // 自动清除时间
    },
    checkFile: (ctx, file) => {
      const invalidChars = /[<>:"\/\\|?*]/g; // 定义不允许出现在文件名中的字符
      if (invalidChars.test(file.filename)) {
        throw new Error(`Invalid filename: ${file.filename}`);
      }
      // 进一步的检查可以根据需要添加
    },
    fileSize: "5mb",
    whitelist: [".png", ".jpeg", ".jpg"], // 设置允许上传的文件类型
  }

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  config.watcher = {
    ignore: [
      /.*\.log$/,
      /.*\.d\.ts$/,
      /.*\.map$/,
    ], // 忽略的文件
  }

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
      timestamps: false, // 默认true，会自动添加createdAt、updatedAt两个字段
      paranoid: true,
      underscored: true, // 下划线风格
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
