const express = require('express')
const app = express()
const router = express.Router()
const controller = require('../controller/controller')
const ifUserLogined = require('../middleware/ifUserLogined')


router.get('/',controller.bookingPage) 

router.get('/login',ifUserLogined,controller.login)
router.post('/login',ifUserLogined,controller.login_post)

router.get('/signup',ifUserLogined,controller.signup)
router.post('/signup',ifUserLogined,controller.signup_post)

router.get('/checkUser',controller.isUserLoginedOrNot)

router.post('/sendOtp',controller.sendOtp)

router.post('/checkOTP',controller.checkOTP)

router.post('/addAppointment',controller.addAppointment)

router.get('/logout',controller.logout)

module.exports = router