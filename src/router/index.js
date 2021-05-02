const fs=require('fs')

const userRoutes =(app) =>{
    fs.readdirSync(__dirname).forEach(file =>{
        if(file =='index.js')return
        else{
            const router =require(`./${file}`)
            app.use(router.routes())
            app.use(router.allowedMethods()) 
        }
    })
}
module.exports =userRoutes