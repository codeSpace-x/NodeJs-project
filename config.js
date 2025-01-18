const dayjs = require('dayjs');
module.exports = {
  jwtKey: 'mydb//',
  expiryTime: '10000h',
  nowTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};