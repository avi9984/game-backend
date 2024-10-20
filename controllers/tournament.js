const Tournament = require('../models/tournament');
const { User } = require('../models/user');
const { verifyToken } = require('../services/token');

const createTournament = async (req, res) => {
    try {
        const { tournamentName, gameType, startDate, maxParticipants, prizePool } = req.body;
        if (!(tournamentName && gameType && startDate && maxParticipants && prizePool)) {
            return res.status(400).json({ status: false, message: "Please fill all fields" });
        }
        const formattedStartDate = new Date(startDate).toISOString();
        const obj = {
            tournamentName,
            gameType,
            startDate: formattedStartDate,
            maxParticipants,
            prizePool
        }
        await Tournament.create(obj);
        return res.status(201).json({ status: true, message: "Tournament created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getAllTournament = async (req, res) => {
    try {
        const verification = await verifyToken(req, res);
        if (!verification.isVerified) {
            return res.status(401).json({ status: false, message: verification.message })
        }
        const tournament = await Tournament.find({ status: 'upcoming' });
        return res.status(200).json({
            status: true,
            message: "Get all tournaments",
            data: tournament
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const joinTournament = async (req, res) => {
    try {
        const verification = await verifyToken(req, res);
        if (!verification.isVerified) {
            return res.status(401).json({ status: false, message: verification.message })
        }
        const { id } = req.params;
        const userId = verification.data.data.userId;
        const tournament = await Tournament.findById({ _id: id });
        if (!tournament) {
            return res.status(404).json({ status: false, message: "Tournament not found" })
        }
        if (tournament.participants.length >= tournament.maxParticipants) {
            return res.status(400).json({ status: false, message: "Tournament is full" });
        }
        tournament.participants.push(userId);
        await tournament.save();
        await User.findByIdAndUpdate(userId, { $push: { tournaments: id } });
        return res.status(200).json({ status: true, message: "Joined tournament" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
module.exports = { createTournament, getAllTournament, joinTournament }
