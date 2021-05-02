const service = require('../service/adopt.service')
class AdoptController{
    async create(ctx,next){
     
        const petId = ctx.params.petId
        const petType = ctx.request.body.petType
        const price = ctx.request.body.price
        const isadopt = ctx.request.body.isadopt
        const result = await service.create(petId,petType,price,isadopt)
        console.log(255)
        ctx.body = {
            meta: {
                status: 200,
            },
            msg: "宠物寄养成功",
        };
    }
    async remove(ctx,next){
        const { petId } = ctx.params
        const result = await service.remove(petId)
        ctx.body = {
            meta: {
                status: 200,
            },
            msg: "宠物删除成功",
        };
    }
    async list(ctx,next){
        const result = await service.getAdoptList()
        ctx.body = result
    }
    async unadoptlist(ctx,next){
        // const type_pid = ctx.request.body.type_pid
        // const type_id = ctx.request.body.type_id

        const { type_pid, type_id } = ctx.query
        const result = await service.getunAdoptList(type_pid,type_id)
        ctx.body = result
    }
}

module.exports = new AdoptController()