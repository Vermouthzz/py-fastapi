module.exports = (app) => {
  const { router, controller } = app;
  // router.get("/user", controller.user.index);
  // router.get('/user/:id', controller.user.getUserById);
  router.post("/user/register", controller.user.register);
  router.post("/user/login", controller.user.login);
  // router.put('/user/:id', controller.user.updateUser);
  // router.delete('/user/:id', controller.user.deleteUser);
};
