const errorType = require('../constants/error-types')
const errorHandler = (error, ctx) => {
    
    let status, message
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = "用户名或者密码不能为空"
            break
        case errorType.NAME_ALREADY_EXISTS:
            status = 409 //请求冲突 
            message = "用户名存在"
            break
        case errorType.USER_DOESE_NOT_EXISTS:
            status = 400 //参数错误 
            message = "用户名不存在"
            break
        case errorType.PASSWORD_IS_INCORRECT:
            status = 400 //参数错误 
            message = "密码不正确"
            break
        case errorType.UNAUTHORIZATION:
            status = 401 //参数错误 
            message = "未授权"
            break
        default:
            status = 404
            message = "NOT FOUND"
    }
    ctx.body = {
        name: "woshinidie",
        message,
        status,
      };

    
}

module.exports = errorHandler