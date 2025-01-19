/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sqeulize: {
    enable: true,
    package: "egg-sequlize",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  websocket: {
    enable: true,
    package: "egg-websocket",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
};
