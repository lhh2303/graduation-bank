const connection = require('../app/database')

class PetService {
    async create(age, owner_id, type, type_id, nickname, isvaccin, isadopt) {
        const statement = `INSERT INTO pets(age,owner_id,type,type_id,nickname,isvaccin,isadopt) VALUES (?,?,?,?,?,?,?);`
        const [result] = await connection.execute(statement, [+age, +owner_id, +type, +type_id, nickname, +isvaccin, +isadopt])
        //  将pet传递打数据库
        return result
    }
    async getPetById(id) {
        const statement = `
        select  pet.id,pet.age,pet.owner_id,pet.nickname,pet.isvaccin,pet.isvaccin,pet.isadopt,
        JSON_OBJECT('type_pid',pet.type,'type_id',pet.type_id,'typename',petstype.typename,'type',pet.typename) type
        from 
        (SELECT *
        FROM pets p 
        LEFT JOIN petstype pt
        on p.type_id =pt.pt_id) pet
        left join 
        (SELECT pt1.pt_id,pt1.typename FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id ) petstype
        on pet.type = petstype.pt_id
        where id =?
;`
        const [result] = await connection.execute(statement, [id])
        //  将pet传递打数据库
        return result[0]
    }
    async getPetList(offset, size) {

        const statement = `
        select pet.id,pet.age,pet.owner_id,pet.nickname,pet.isvaccin,pet.isvaccin,pet.isadopt,
        JSON_OBJECT('type_pid',pet.type,'type_id',pet.type_id,'typename',petstype.typename,'type',pet.typename) type
        from 
        (SELECT *
        FROM pets p 
        LEFT JOIN petstype pt
        on p.type_id =pt.pt_id) pet
        left join 
         (SELECT pt1.pt_id,pt1.typename FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id ) petstype
        on pet.type = petstype.pt_id
        limit ?,?
       ;`

        const [result] = await connection.execute(statement, [offset, size])
        return result
    }

    async update(age, owner_id, type, type_id, nickname, isvaccin, isadopt, petId) {

        const statement = `
        UPDATE pets SET age =? ,owner_id=?,type = ?,type_id=?,nickname=?,isvaccin=?,isadopt=? WHERE id =?
        `
        const [result] = await connection.execute(statement, [+age, +owner_id, +type, +type_id, nickname, +isvaccin, +isadopt, +petId])
        return result
    }
    async remove(petId) {

        const statement = `DELETE FROM pets WHERE id=?
        `
        const [result] = await connection.execute(statement, [petId])

        return result
    }
    async getPetsTypeList(typename,offset, size){
        const statement = `
        select pet.id,pet.age,pet.owner_id,pet.nickname,pet.isvaccin,pet.isvaccin,pet.isadopt,
        JSON_OBJECT('type_pid',pet.type,'type_id',pet.type_id,'typename',petstype.typename,'type',pet.typename) type
        from 
        (SELECT *
        FROM pets p 
        LEFT JOIN petstype pt
        on p.type_id =pt.pt_id) pet
        left join 
         (SELECT pt1.pt_id,pt1.typename FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id ) petstype
        on pet.type = petstype.pt_id
        where petstype.typename = ?
        limit ?,?
       ;`
       const [result] = await connection.execute(statement, [typename,offset, size])
       return result
    }
    async getPetsType1List(){
        const statement = `SELECT pt1.pt_id,pt1.typename  FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id 
        WHERE pt1.type_level=0`
        const [result] = await connection.execute(statement, [])
        return result
    }
    async getPetsType2List(type_pid){
        const statement = `SELECT pt1.pt_id,pt1.typename  FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id 
        WHERE pt1.type_pid=?`
        const [result] = await connection.execute(statement, [type_pid])
        return result
    }
    async getPetAllList(){
        const statement = `
        select pet.id,pet.age,pet.owner_id,pet.nickname,pet.isvaccin,pet.isvaccin,pet.isadopt,
        JSON_OBJECT('type_pid',pet.type,'type_id',pet.type_id,'typename',petstype.typename,'type',pet.typename) type
        from 
        (SELECT *
        FROM pets p 
        LEFT JOIN petstype pt
        on p.type_id =pt.pt_id) pet
        left join 
         (SELECT pt1.pt_id,pt1.typename FROM petstype pt1 left join petstype pt2 on pt1.type_pid=pt2.pt_id ) petstype
        on pet.type = petstype.pt_id
        `
        console.log(3333)
        const [result] = await connection.execute(statement, [])
        console.log(444)
        return result
    }
}
module.exports = new PetService()