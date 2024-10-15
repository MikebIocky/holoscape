const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve your HTML from the "public" directory

// Endpoint to fetch Cloudflare deployment data
app.get('/api/deployments', async (req, res) => {
    try {
        const response = await fetch('https://api.cloudflare.com/client/v4/accounts/4970ae1534c76f6630ce684cb25a940a/pages/projects/holoscape/deployments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer v3gNlyQjc2kqe3n-ERaL-bLP2Vj0Xpj92N4MQbM1`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching deployment status:', error);
        res.status(500).send('Error fetching deployment status');
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
