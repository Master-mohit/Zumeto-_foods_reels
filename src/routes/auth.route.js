const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')


router.post('/user/register', authController.registerUser)

router.post('/user/logindin',authController.logdinUser)

router.get('/user/logout',authController.logoutUser)

router.post('/foodpartner/register', authController.registerfoodpartner)

router.post('/foodpartner/login', authController.foodPartnerLogdin)

router.post('/foodpartner/logout', authController.foodPartnerLogout)


module.exports = router;