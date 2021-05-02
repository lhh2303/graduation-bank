const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
    // 获取用户名和密码
    const { name, password } = ctx.request.body
    // 判断用户名和密码不能为看空
    if (!name || !password || name === "" || password === "") {
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "账号密码不能为空",
        };
    }
    // 判断未被注册过
    const result = await service.getUserByName(name)
    // console.log(result)
    if (result.length) {
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "账号已存在",
        };
    }
    // console.log("注册1")
    await next()
}

const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body
    ctx.request.body.password = md5password(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}