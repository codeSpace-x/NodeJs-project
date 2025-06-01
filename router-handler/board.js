const db = require('../dataBase/index')
exports.setMessage =  (req, res) => {
  const message = req.body;
  const sql = `INSERT INTO board set?`;
  db.query(sql,{name: message.name,message:message.msg,time:new Date(),picture:message.url}, (err, result) => {
    if (err) {
      return res.myErr(err)
    }
    res.send({status:0,message:'留言成功'})
  })
}
exports.getMessage =  (req, res) => {
  const message = req.body;
  const sql = `SELECT * FROM board WHERE name=?`;
  db.query(sql,message.name, (err, result) => {
    if (err) {
      return res.myErr(err)
    }
    console.log(result)
    res.send({status:0,result:[...result]})
  })
}