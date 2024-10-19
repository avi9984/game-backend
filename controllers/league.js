const League = require('../models/league');
const { User } = require('../models/user');
const { verifyToken } = require('../services/token');


const createLeague = async (req, res) => {
    try {
        const { leagueName, gameType, maxParticipants, prizePool } = req.body;
        if (!(leagueName && gameType && maxParticipants && prizePool)) {
            return res.status(400).json({ status: false, message: "Please fill all the fields" })
        }
        const obj = {
            leagueName,
            gameType,
            maxParticipants,
            prizePool,
            status: 'upcoming'
        }
        await League.create(obj);
        return res.status(201).json({ status: true, message: "League created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getAllLeagues = async (req, res) => {
    try {
        const verification = await verifyToken(req, res);
        if (!verification.isVerified) {
            return res.status(401).json({ status: false, message: verification.message })
        }
        const leagues = await League.find({}, { password: 0 }).populate('gameType').populate('participants');
        return res.status(200).json({ status: true, message: "All leagues fetched successfully", data: leagues })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const joinLeagueById = async (req, res) => {
    try {
        const verification = await verifyToken(req, res);
        if (!verification.isVerified) {
            return res.status(401).json({ status: false, message: verification.message })
        }
        const userId = verification.data.data.userId;
        const { id } = req.params;
        const league = await League.findById({ _id: id });
        if (!league) {
            return res.status(404).json({ status: false, message: "League not found" })
        }
        if (league.participants.length >= league.maxParticipants) {
            return res.status(400).json({ status: false, message: "League is full" });
        }
        league.participants.push(userId);
        await league.save();

        await User.findByIdAndUpdate(userId, { $push: { leagues: id } });
        return res.status(200).json({ status: true, message: "Joined the league successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
module.exports = { createLeague, getAllLeagues, joinLeagueById }