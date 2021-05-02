const connection = require('../app/database')

class GoodsService {
    async add(g_typeId,goodsname,price,introduce,brand) {
        const statement = `INSERT INTO goods(g_typeId,goodsname,price,introduce,brand) VALUES (?,?,?,?,?);`
        const result =await connection.execute(statement,[g_typeId,goodsname,price,introduce,brand])
       
        return result
    }
    async getGoodstList(offset, size){
        const statement = `
        SELECT g.g_typeId,g.goodsname,g.price,g.introduce,g.stockAt,g.brand,gt.gt_typename
        FROM goods g
        LEFT JOIN goodstype gt
        on g.g_typeId =gt.gt_id
        limit ?,?
        `
        const [result] =await connection.execute(statement,[offset, size])
        return result
    }
    async remove(g_id){
        const statement = `DELETE FROM goods WHERE g_id=?`
        const [result] = await connection.execute(statement, [g_id])
        return result
    }
}


module.exports = new GoodsService()