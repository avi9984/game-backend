const express = require('express');
const router = express.Router();

const { createLeague, getAllLeagues, joinLeagueById } = require('../controllers/league');

router.post('/create', createLeague);
router.get('/all', getAllLeagues);
router.post('/:id/join', joinLeagueById);

module.exports = router;