const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tournamentSchema = new mongoose.Schema({
    tournamentName: { type: String, required: true },
    gameType: { type: String, required: true },
    participants: [{ type: ObjectId, ref: 'User' }],
    maxParticipants: { type: Number, required: true },
    // startDate: Date,
    prize: { type: String, required: true },
    status: { type: String, default: 'upcoming' },
}, { timestamps: true });

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;
