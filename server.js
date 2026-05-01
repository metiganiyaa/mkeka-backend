const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const API_KEY = 'ca0926e1a7675266f5a1f22bdfc34247';

// Root route - test if server is working
app.get('/', (req, res) => {
    res.json({ message: 'MKEKA API is running!', status: 'live', endpoints: ['/api/odds'] });
});

// Main odds endpoint
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
        console.error('API Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Also add /odds as alias
app.get('/odds', (req, res) => {
    res.redirect('/api/odds');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`MKEKA API running on port ${PORT}`));