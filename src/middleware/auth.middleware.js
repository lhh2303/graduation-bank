const jwt = require("jsonwebtoken")

const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
    // 获取用户名密码
    const { name, password } = ctx.request.body

    // 判断用户名和密码不能为看空
    if (!name || !password || name === "" || password === "") {
        // const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        // return ctx.app.emit('error', error, ctx)
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "账号密码不能为空",
        };
    }
    // 判断未被注册过
    const result = await service.getUserByName(name)
    const user = result[0]
    // console.log(result)
    if (!user) {
        // const error = new Error(errorType.USER_DOESE_NOT_EXISTS)
        // return ctx.app.emit('error', error, ctx)
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "账号未注册",
        };
    }
    // 判断密码
    if (md5password(password) !== user.password) {
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "密码错误",
        };
    }
    ctx.user = user
    await next()
}

const verifyAuth = async (ctx, next) => {
    // 获取tokon

    const authorization = ctx.headers.authorization
    if (!authorization) {
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "未授权",
        };
    }
    const token = authorization.replace('Bearer ', '')
    // 验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        ctx.user = result
        await next()

    } catch (err) {
        return ctx.body = {
            meta: {
                status: 400,
            },
            msg: "未授权",
        };
    }
}
const verifyPermission = async (ctx, next) => {
    await next()
}
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}