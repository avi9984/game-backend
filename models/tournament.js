const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    game: { type: String, required: true },
    participants: [{ type: ObjectId, ref: 'User' }],
    maxParticipants: { type: Number, required: true },
    prize: { type: String, required: true },
    status: { type: String, default: 'upcoming' },
}, { timestamps: true });

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;
