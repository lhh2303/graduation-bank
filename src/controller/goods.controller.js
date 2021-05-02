const service = require('../service/goods.service')
class GoodsController {
    async add(ctx, next) {
        const g_typeId = ctx.request.body.g_typeId
        const goodsname = ctx.request.body.goodsname
        const price = ctx.request.body.price
        const introduce = ctx.request.body.introduce
        const brand = ctx.request.body.brand

        const result = await service.add(g_typeId, goodsname, price, introduce, brand)
        // console.log(result)
        ctx.body = result
    }
    async list(ctx, next) {
        const { offset, size } = ctx.query
        const result = await service.getGoodstList(offset, size)
        ctx.body = result
    }
    async remove(ctx,next){
        const g_id= ctx.params.g_id
        // console.log(g_id)
        const result = await service.remove(g_id)
        ctx.body = result
    } 
}

module.exports = new GoodsController()