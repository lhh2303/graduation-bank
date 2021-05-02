const app = require('./app')
require('./app/database')

const config = require('./app/config')

// cors跨域


app.listen(config.APP_PORT, () => {
    console.log(`服务器在${config.APP_PORT}启动成功`)
})



