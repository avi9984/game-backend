const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    subscriptionPlan: { type: ObjectId, ref: 'Subscription' },
    phone: { type: String, required: true, unique: true },
    leagues: [{ type: ObjectId, ref: 'League' }],
    tournaments: [{ type: ObjectId, ref: 'Tournament' }],
}, { timestamps: true, versionKey: false })

const userTokenSchema = new mongoose.Schema({
    userId: { type: Number },
    token: { type: String },
    active: { type: Number, default: 1 },
    expiresIn: { type: Number }
}, { versionKey: false })

const User = mongoose.model('User', userSchema);
const UserToken = mongoose.model('UserToken', userTokenSchema);
module.exports = { User, UserToken };