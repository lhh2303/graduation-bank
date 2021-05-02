const Router = require('koa-router')
const {
    create,
    remove,
    list,
    unadoptlist
} = require('../controller/adopt.controller')
const {
    verifyAuth
   
} = require('../middleware/auth.middleware')
const adoptRouter = new Router({ prefix: '/adopt' })

adoptRouter.post('/add/:petId', verifyAuth, create)
adoptRouter.delete('/remove/:petId', verifyAuth,remove)
adoptRouter.get('/petsunadoptlist/petsunadoptlist', verifyAuth, unadoptlist)

adoptRouter.get('/',verifyAuth,list)
module.exports = adoptRouter