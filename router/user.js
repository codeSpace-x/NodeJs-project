
const router = require('express').Router()
const userHandler = require('../router-handler/user')
router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
module.exports = router;