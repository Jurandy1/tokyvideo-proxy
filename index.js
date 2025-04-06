const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.get('/proxy', async (req, res) => {
    const videoUrl = req.query.url;
    try {
        const response = await axios.get(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.tokyvideo.com/',
                'DNT': '1', // Do Not Track
                'Connection': 'keep-alive'
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send(`Erro ao buscar o vídeo: ${error.message}`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));