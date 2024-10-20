const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    planName: { type: String, required: true },
    pricePerMonth: { type: Number },
    followers: { type: Number },
    features: [{ type: String }],
}, { versionKey: false });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;