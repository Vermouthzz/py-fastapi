/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sqeulize: {
    enable: true,
    package: "egg-sequelize",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  websocket: {
    enable: true,
    package: "egg-websocket-plugin",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
};
