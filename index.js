const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const userRoutes = require('./routes/user');
const subscriptionRoutes = require('./routes/subscription');
const leagueRoutes = require('./routes/league');
const tournamentRoutes = require('./routes/tournament');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB is connected")).catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to tournament backend</h1>`)
})
app.use('/users', userRoutes);
app.use('/subscription', subscriptionRoutes);
app.use('/leagues', leagueRoutes);
app.use('/tournaments', tournamentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})