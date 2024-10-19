
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const leagueSchema = new mongoose.Schema({
    leagueName: { type: String, required: true },
    gameType: { type: String, required: true },
    // startDate
    // endDate
    participants: [{ type: ObjectId, ref: 'User' }],
    maxParticipants: { type: Number, required: true },
    status: { type: String }
}, { timestamps: true, versionKey: false });

const League = mongoose.model('League', leagueSchema);
module.exports = League;
