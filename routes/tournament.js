const express = require('express');
const router = express.Router();

const { createTournament, getAllTournament, joinTournament } = require('../controllers/tournament');

router.post('/create', createTournament);
router.get('/all', getAllTournament);
router.post('/:id/join', joinTournament);



module.exports = router;