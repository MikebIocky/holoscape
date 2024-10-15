import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.json());

// Add middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api/deployments', async (req, res) => {
    try {
        const response = await fetch('https://api.cloudflare.com/client/v4/accounts/4970ae1534c76f6630ce684cb25a940a/pages/projects/holoscape/deployments', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer tb5jNGF0-SsVbeBiAGWBWv7OHD0V31YEuEoqOakJ',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send(`Error fetching deployment status: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
