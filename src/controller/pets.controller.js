const service = require('../service/pet.service')
class PetController {
    async create(ctx, next) {
        // 获取数据
        const typename=ctx.request.body.typename
        const age = ctx.request.body.age
        const owner_id = ctx.request.body.owner_id
        const type = ctx.request.body.type
        const type_id = ctx.request.body.type_id
        const nickname = ctx.request.body.nickname
        const isvaccin = ctx.request.body.isvaccin
        const isadopt = ctx.request.body.isadopt
        // console.log(age, owner_id, type, type_id, nickname, isvaccin, isadopt)
         const result = await service.create(age, owner_id, type, type_id, nickname, isvaccin, isadopt)
        // console.log(result)
        ctx.body = {
            meta: {
                status: 200,
            },
            msg: "宠物添加成功",
        };


    }

    async detail(ctx, next) {
        // 获取id
        
        const petId = ctx.params.petId

        // 根据id去查询数据库
        const result = await service.getPetById(petId)
        ctx.body = result
    }
    async list(ctx, next) {
        // 获取{offset，size} 
        const { offset, size } = ctx.query
        // 查询
        console.log(1)
        const result = await service.getPetList(offset, size)
        ctx.body = result
    }
    async update(ctx, next) {
        const { petId } = ctx.params
        const age = ctx.request.body.age
        const owner_id = ctx.request.body.owner_id
        const type = ctx.request.body.type
        const type_id = ctx.request.body.type_id
        const nickname = ctx.request.body.nickname
        const isvaccin = ctx.request.body.isvaccin
        const isadopt = ctx.request.body.isadopt
        const result = await service.update(age, owner_id, type, type_id, nickname, isvaccin, isadopt, petId)
        ctx.body = result
    }
    async remove(ctx, next) {
        const { petId } = ctx.params
        const result = await service.remove(petId)
        ctx.body = result
    }
    async typelist(ctx,next){
        const { offset, size } = ctx.query
        const { typename } = ctx.params
        // 查询
        // console.log(typename,offset, size)
        const result = await service.getPetsTypeList(typename,offset, size)
        ctx.body = result
    }
    async firsttype(ctx,next){
        const result = await service.getPetsType1List()
        ctx.body = result
    }
    async secondetype(ctx,next){
        const   type_pid  = ctx.params.type_pid
         console.log(type_pid)
        const result = await service.getPetsType2List(type_pid)
        ctx.body = result
    }
    async petlist(ctx,next){
        console.log(1)
        const result = await service.getPetAllList()
        ctx.body = result
    }
}

module.exports = new PetController()