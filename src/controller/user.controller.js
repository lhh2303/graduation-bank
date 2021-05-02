const service = require('../service/user.service')
class UserController {
    async create(ctx, next) {
        // 获取用户请求传递参数

        const user = ctx.request.body

        // 查询数据
        const result = await service.create(user)
        // console.log(ctx.request.password1)
        // 返回数据
        
        ctx.body = {
            meta: {
                status: 200,
            },
            msg: "注册成功",
        };
       
       
    }
}

module.exports = new UserController()