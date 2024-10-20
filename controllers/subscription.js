const Subscription = require('../models/subscription');
const { User } = require('../models/user');
const { verifyToken } = require('../services/token');


const addSubscriptionPlan = async (req, res) => {
    try {
        const { planName, pricePerMonth, followers, features } = req.body;
        if (!(planName && features)) {
            return res.status(400).json({ status: false, message: "Please fill all the fields." });
        }
        const findPlanName = await Subscription.findOne({ planName })
        if (findPlanName) {
            return res.status(400).json({ status: false, message: "Plan Name already exists" })
        }
        const obj = {
            planName,
            pricePerMonth,
            followers,
            features
        }
        await Subscription.create(obj)
        return res.status(201).json({ status: true, message: "Subscription plan added successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getAllSubscriptionPlan = async (req, res) => {
    try {
        const subscriptionPlans = await Subscription.find({});
        if (!subscriptionPlans) {
            return res.status(404).json({ status: false, message: "No subscription plans found" })
        }
        return res.status(200).json({ status: true, message: "Get All Subscription", data: subscriptionPlans, })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getSubscriptionById = async (req, res) => {
    try {
        const id = req.params.id;
        const subscriptionPlan = await Subscription.findById({ _id: id });
        if (!subscriptionPlan) {
            return res.status(404).json({ status: false, message: "Subscription plan not found" })
        }
        return res.status(200).json({
            status: true,
            message: "Get Subscription by Id",
            data: subscriptionPlan
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const userSelectPlan = async (req, res) => {
    try {
        const verification = await verifyToken(req, res);
        if (!verification.isVerified) {
            return res.status(401).json({ status: false, message: verification.message })
        }
        const userId = verification.data.data.userId;
        const id = req.params.id;
        const plan = await Subscription.findById({ _id: id });
        if (!plan) {
            return res.status(404).json({ status: false, message: "Subscription plan not found" })
        }
        await User.findByIdAndUpdate(userId, { subscriptionPlan: id });
        return res.status(200).json({ status: true, message: `Subscribed to ${plan.planName}` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

module.exports = { addSubscriptionPlan, getAllSubscriptionPlan, getSubscriptionById, userSelectPlan }