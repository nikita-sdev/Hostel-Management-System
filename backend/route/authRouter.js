const express= require('express');

const authController = require('../contoller/authController');

const router= express.Router();

router.post("/get-otp", authController.sendSignupOtp);
router.post("/signup", authController.postSignUp);
router.post("/login", authController.postLogin);

module.exports= router;