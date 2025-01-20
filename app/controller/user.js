const { Controller } = require("egg");
const { default: userServices } = require("../services/user");

class UserController extends Controller {
  async userinfo() {
    const { ctx } = this;
    return userServices.getUserInfo(ctx);
  }
}

module.exports = UserController;
