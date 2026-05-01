const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const API_KEY = 'ca0926e1a7675266f5a1f22bdfc34247';

app.get('/api/odds', async (req, res) => {
    try {
        const sports = ['basketball_nba', 'americanfootball_nfl', 'soccer_epl', 'baseball_mlb'];
        let allGames = [];
        
        for (const sport of sports) {
            const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us,uk&markets=h2h&oddsFormat=decimal`;
            const response = await axios.get(url);
            allGames.push(...response.data);
        }
        
        res.json(allGames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5050, () => console.log('Proxy running on port 5050'));
