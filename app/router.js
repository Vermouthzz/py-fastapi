/**
 * @param {Egg.Application} app - egg application
 */
const Word = require("./router/word");
module.exports = (app) => {
  const { router, controller } = app;
  Word(app);
};
