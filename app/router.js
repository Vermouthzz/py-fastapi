/**
 * @param {Egg.Application} app - egg application
 */
// const Word = require("./router/word");
const interaction = require("./router/interaction");
const upload = require("./router/upload");
const User = require("./router/user");
module.exports = (app) => {
  const { router, controller } = app;
  // Word(app);
  User(app);
  interaction(app);
  upload(app)
};
