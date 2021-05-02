const Router = require('koa-router')
const {
    add,
    list,
    remove
} = require('../controller/goods.controller')
const {
    verifyAuth
   
} = require('../middleware/auth.middleware')
const goodsRouter = new Router({ prefix: '/goods' })

goodsRouter.post('/add', verifyAuth, add)

goodsRouter.get('/list',verifyAuth,list)
goodsRouter.delete('/remove/:g_id', verifyAuth,remove)
module.exports = goodsRouter