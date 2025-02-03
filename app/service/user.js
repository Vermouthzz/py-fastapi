const { Service } = require("egg");

class UserService extends Service {
  async getUserInfo() { }

  async login() {
    const { ctx } = this;
    const { account, password } = ctx.request.body;
    const loginRes = await ctx.model.User.findOne({ where: { account, password } });
    if (!loginRes) {
      ctx.body = {
        code: 400,
        message: "账号或密码错误",
      };
      return;
    }
    const token = ctx.generateToken({ user_id: loginRes.id });

    Reflect.deleteProperty(loginRes, "password");
    Reflect.deleteProperty(loginRes, "id");
    ctx.body = {
      code: 200,
      data: {
        token,
        userinfo: loginRes,
      },
    };
  }

  async register() {
    const { ctx } = this;

    const { account, password, username } = ctx.request.body;
    const registerRes = await ctx.model.User.create({ account, password });
    if (!registerRes) {
      ctx.body = {
        code: 400,
        message: "注册失败",
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: {
        msg: "注册成功",
      },
    };
  }
}

module.exports = UserService;
