const router = require('express').Router()
const User = require('../models/User')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const authcontroller = require('../controller/authController')

router.post('/register',authcontroller.userRegister)
router.post('/login',authcontroller.userLogin)
module.exports = router
