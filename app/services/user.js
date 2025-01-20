const { Service } = require('egg');

class UserService extends Service {
  async getUserInfo(ctx) { }

  async login(ctx) {
    const { account, password } = ctx.request.body;
    const loginRes = await ctx.model.User.findOne({ account, password });
    if (!loginRes) {
      ctx.body = {
        code: 400,
        message: "账号或密码错误",
      };
      return;
    }
    const tokn = await ctx.app.jwt.sign({ account }, "1234567890");
    return {
      code: 200,
      data: {
        token: "1234567890",
      },
    };
  }

  async register(ctx) {
    const { account, password } = ctx.request.body;
    const registerRes = await ctx.model.User.create({ account, password });
    if (!registerRes) {
      ctx.body = {
        code: 400,
        message: "注册失败",
      };
      return;
    }
    return {
      code: 200,
      data: {
        msg: "注册成功",
      },
    };
  }
}

module.exports = UserService;
