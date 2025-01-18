// 数据库
const db = require('../dataBase/index');
// 密码加密
const bcrypt = require("bcryptjs");
// 生成token
const jwt = require("jsonwebtoken");
const config = require("../config");
// 注册用户的接口
exports.register = (req, res) => {
  const userInfo = req.body;
  const sql = `SELECT * FROM user WHERE username=?`;
  db.query(sql,userInfo.username,(err,results) => {
    if (err){
       return res.myErr(err)
    }
    if (results.length > 0){
      return res.myErr('用户名已存在')
    }
    // 密码加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    // 插入数据语句
    const insertSql = `INSERT INTO user set?`
    db.query(
      insertSql,
      {
        username: userInfo.username,
        password: userInfo.password,
        createTime: config.nowTime,
        updateTime: config.nowTime
      },
      (err,results) => {
        if (err){return res.myErr(err)}
        if(results.affectedRows !== 1){return res.myErr("用户注册失败")}
        res.send({status:0,message:'用户注册成功'})
      }
    )
  })
}
// 登录
exports.login = (req, res) => {
  const userInfo = req.body;
  const selSql = `SELECT * FROM user WHERE username=?`;
  db.query(selSql,userInfo.username,(err,results) => {
    if (err){return res.myErr(err)}
    if (results.length !== 1){ return  res.myErr("用户名不存在")}
    // 验证密码是否和数据库密码一致
    const passwordResult = bcrypt.compareSync(userInfo.password, results[0].password);
    if(!passwordResult){return res.myErr('密码不正确')}
    // 使用jwt生成token,一般是用用户的id用于生成token，敏感信息不建议放在token信息中
    const user = { ...results[0], password: "", userPic: "" };

    // 根据用户id+token密钥+过期时间来生成token
    const tokenStr = jwt.sign(user, config.jwtKey, {
      expiresIn: config.expiryTime,
    });
    res.send({status:0,message:'登录成功',token:"Bearer " + tokenStr});
  })
}