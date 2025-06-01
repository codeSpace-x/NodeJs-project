const  express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressjwt = require('express-jwt');
const cors = require('cors');
// const bodyParser = require('body-parser')
const config = require('./config');
app.use(cors());
app.use(express.static('public'));
// 配置解析post数据的中间件，这个中间件只能解析application/json格式的数据
app.use(express.json({limit: '50mb',extended: true}));
// 配置解析post数据的中间件，这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded());
// app.use(bodyParser.json({limit: '50mb',extended: true}));
const userRouter = require('./router/user');
// 定义全局错误中间件，必须在路由之前定义
app.use((req, res, next) => {
  // 在res对象上挂载一个自定义处理错误的函数,status(0：成功，1：失败)
  res.myErr = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 一定要定义在路由之前来解析token
// app.use(expressjwt.expressjwt({ secret: config.jwtKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }));
app.use('/api',userRouter);
// 定义中间件、路由、连接数据库……
// app.use((err, req, res, next) => {
//   // 验证失败导致的错误
//   if (err instanceof joi.ValidationError) return res.myErr(err);
//   // 捕获身份认证失败的错误
//   if (err.name === "UnauthorizedError") return res.myErr("身份认证失败！");
//   // 未知错误
//   res.myErr(err);
// });
app.get('/api', (req, res) => {
  res.send('Hello Worldhaha!');
})
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})