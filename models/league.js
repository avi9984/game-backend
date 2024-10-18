
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const leagueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    game: { type: String, required: true },
    participants: [{ type: ObjectId, ref: 'User' }],
    maxParticipants: { type: Number, required: true },
}, { timestamps: true, versionKey: false });

const League = mongoose.model('League', leagueSchema);
module.exports = League;
