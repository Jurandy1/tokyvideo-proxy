const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
    next();
});

app.get('/proxy', async (req, res) => {
    const videoUrl = req.query.url;
    try {
        const response = await axios.get(videoUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Erro ao buscar o vídeo: ' + error.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));