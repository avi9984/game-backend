const { User, UserToken } = require('../models/user');
const { sendVerificationCode, verifyCode } = require('../services/twilio');
const { validEmail, validPwd, validPhoneNumber } = require('../utils/validator');
const bcrypt = require('bcryptjs');
const { createToken, verifyToken } = require('../services/token')

const sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ status: false, message: 'Phone number is required.' });
        }
        await sendVerificationCode(phoneNumber);
        return res.status(200).json({ status: true, message: 'Verification code sent' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const verifyPhoneNumber = async (req, res) => {
    try {
        const { phoneNumber, code } = req.body;
        const verification = await verifyCode(phoneNumber, code);

        if (verification.status === 'approved') {
            return res.status(200).json({ status: true, message: 'Phone number verified' });
        } else {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const userRegister = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, cnfPassword } = req.body;
        if (!(name && email && phoneNumber && password && cnfPassword)) {
            return res.status(400).json({ status: false, message: "All fields are required" })
        }
        if (!validEmail(email)) {
            return res.status(400).json({ status: false, message: "Invalid email" });
        }
        const checkPhone = await User.findOne({ phoneNumber })
        if (checkPhone) {
            return res.status(400).json({ status: false, message: "Phone number already exists" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'Email or phone already exists' });
        }

        if (!validPwd(password && cnfPassword)) {
            return res.status(400).json({
                status: false,
                message:
                    "Password should be 8 characters long and must contain one of 0-9,A-Z,a-z and special characters",
            });
        }
        if (password !== cnfPassword) {
            return res.status(400).json({ status: false, message: "Passwords do not match" });
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const obj = {
            name,
            email: email.toLowerCase(),
            phoneNumber,
            password: req.body.password
        }
        await User.create(obj);
        return res.status(201).json({ status: true, message: "Your profile is under verification you will received mail shortly" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const userPayload = {
            userId: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            subscriptionPlan: user.subscriptionPlan,
            tournaments: user.tournaments,
            leagues: user.leagues
        };

        const verification = await createToken(req, res, userPayload);

        // Object to create in UserToken
        const obj = {
            userId: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            // token: verification.token,
        };

        if (verification.isVerified) {
            return res.status(200).json({
                status: true,
                message: 'Login successful',
                data: {
                    userId: obj._id,
                    email: obj.email,
                    phoneNumber: obj.phoneNumber,
                    active: 1,
                    token: verification.token,
                },
            });
        } else {
            return res.status(401).json({ status: false, message: 'Unauthorized user!' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}




module.exports = { sendOtp, verifyPhoneNumber, userRegister, userLogin }