const Router = require('koa-router')
const {
    create,
    detail,
    list,
    update,
    remove,
    typelist,
    firsttype,
    secondetype,
    petlist
} = require('../controller/pets.controller')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')
const userRouter = new Router({ prefix: '/pets' })

userRouter.post('/add', verifyAuth, create)
userRouter.get('/list',verifyAuth,list)

userRouter.get('/typename/:typename',verifyAuth,typelist)
userRouter.get('/petlist/petlist/petlist',verifyAuth,petlist)


userRouter.get('/:petId', verifyAuth, detail)

userRouter.get('/firsttype/firsttype',verifyAuth,firsttype)
userRouter.get('/secondetype/:type_pid',verifyAuth,secondetype)


userRouter.put('/:petId', verifyAuth, verifyPermission,update)
userRouter.delete('/:petId', verifyAuth, verifyPermission,remove)
module.exports = userRouter