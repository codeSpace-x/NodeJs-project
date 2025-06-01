
const router = require('express').Router()
const userHandler = require('../router-handler/user')
const boardHandler = require('../router-handler/board')
router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.post('/getMessage', boardHandler.getMessage);
router.post('/setMessage', boardHandler.setMessage);
module.exports = router;