const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require('../app/config')
class AuthContorller {
    async login(ctx, next) {
        const { id, name } = ctx.user
        // token
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        ctx.body = {
            id,
            name,
            token,
            meta: {
                status: 200,
            },
            msg: "登入成功",
        }
    }
    async success(ctx,next){
        ctx.body='授权成功'
    }
}

module.exports = new AuthContorller()