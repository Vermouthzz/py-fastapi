
module.exports = (app) => {
  const { router, controller } = app;
  router.post('/upload/avatar', controller.upload.uploadAvatar);
}