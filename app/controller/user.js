const { Controller } = require("egg");

class UserController extends Controller {
  async userinfo() {
    const { ctx, app } = this;
    return ctx.service.user.getUserInfo();
  }
  async login() {
    const { ctx, app } = this;
    return ctx.service.user.login();
  }
  async register() {
    const { ctx, app } = this;
    return ctx.service.user.register();
  }
}

module.exports = UserController;
