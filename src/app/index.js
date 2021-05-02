const Koa = require("koa");
const userouter = require("../router");
const cors = require("koa2-cors");

const app = new Koa();

// app.use(cors())
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      // if (ctx.url === "/test") {
      //   return "*"; // 允许来自所有域名请求
      // }
      // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
      return "*";
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);

const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

userouter(app);

app.on("error", (err, ctx) => {
  ctx.body = err.message;
});

module.exports = app;
