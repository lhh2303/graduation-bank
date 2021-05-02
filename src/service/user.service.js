const connection = require('../app/database')

class UserService {
    async create(user) {
        const { name, password ,gender} = user
        const statement = `INSERT INTO users (name,password,gender) VALUES(?,?,?);`
        const result =await connection.execute(statement,[name,password,gender])
        //  将user传递打数据库
        return result
    }
    async getUserByName(name){
        const statement =`SELECT * FROM users WHERE name = ?;`
        const result =await connection.execute(statement,[name])
        return result[0]
    }
}


module.exports = new UserService()