const connection = require('../app/database')

class PetService{
    async create(petId,petType,price) {
        const statement1 = `INSERT INTO petsadopt(petId,petType,price,pa_isadopt) VALUES (?,?,?,1);`
        const statement2 = `update pets set isadopt=1
         WHERE id =?`
        const [result] = await connection.execute(statement1, [+petId,+petType,+price])
        //  将pet传递打数据库
        if(result.insertId){
            const  [result2] = await connection.execute(statement2, [petId])
            return result2
        }
        else{
            return "更新失败"
        }
    }
    async remove(petId){
        const statement1 = `DELETE FROM petsadopt WHERE petId=?`
        const [result] = await connection.execute(statement1, [petId])
        console.log(result)
        if(result.affectedRows){
            const statement2 = `update pets set isadopt=0 WHERE id =?`
            const [result2] = await connection.execute(statement2, [petId])
            return result2
        }
        else{
            return "删除失败"
        } 
    }
    async getAdoptList(){
        const statement = `
        SELECT ppp.pa_id,ppp.petId,ppp.adoptAt,ppp.duration,ppp.price,ppp.age,ppp.nickname,ppp.typename,ppp.pa_isadopt,
        JSON_OBJECT('owner_id',c.id,'name',c.name) owner_id
        from
        (select ppa.pa_id,ppa.petId,ppa.adoptAt,ppa.duration,ppa.price,ppa.age,ppa.nickname,petstype.typename,ppa.owner_id,ppa.pa_isadopt
        from
        (SELECT * 
        from petsadopt pa
        left join pets p
        on pa.petId =p.id) ppa
        left join
        (SELECT pt1.pt_id,pt1.typename FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id ) petstype
        on ppa.petType = petstype.pt_id) ppp
        left join customers c
        on ppp.owner_id = c.id
       ;`
        const [result] = await connection.execute(statement, [])
        return result
    }
    async getunAdoptList(type_pid,type_id){
        const statement= `
        select pet.id,pet.nickname
        from 
        (SELECT *
        FROM pets p 
        LEFT JOIN petstype pt
        on p.type_id =pt.pt_id) pet
        left join 
         (SELECT pt1.pt_id,pt1.typename FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id ) petstype
        on pet.type = petstype.pt_id
        where pet.type =? and pet.type_id=? and pet.isadopt =0`
        const [result] = await connection.execute(statement, [type_pid,type_id])
        return result
    }
}


module.exports = new PetService()