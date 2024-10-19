const express = require('express');
const router = express.Router();
const { sendOtp, verifyPhoneNumber, userRegister, userLogin } = require('../controllers/user');
const { userSelectPlan } = require('../controllers/subscription');


router.post('/send-otp', sendOtp);
router.post('/verify-phone-number', verifyPhoneNumber);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/subcribe/:id', userSelectPlan);





module.exports = router;