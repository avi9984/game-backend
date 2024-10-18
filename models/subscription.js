const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ type: String }],
    follower: { type: Number, required: true },
}, { timestamps: true, versionKey: false });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;