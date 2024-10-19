const express = require('express');
const router = express.Router();
const { addSubscriptionPlan, getAllSubscriptionPlan, getSubscriptionById } = require('../controllers/subscription');

router.post('/add-plan', addSubscriptionPlan);
router.get('/getAllPlan', getAllSubscriptionPlan);
router.get('/plan/:id', getSubscriptionById);



module.exports = router;