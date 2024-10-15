const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/deployments', async (req, res) => {
    try {
        const response = await fetch('https://api.cloudflare.com/client/v4/accounts/4970ae1534c76f6630ce684cb25a940a/pages/projects/holoscape.site/deployments', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 913bd865fec1af8ffbc06650ba3b97febfde8',
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching deployment status');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
