const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to generate random dates
function getRandomDatesInNextTwoWeeks(count) {
    const dates = [];
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
    
    while (dates.length < count) {
        const randomTime = today.getTime() + Math.random() * (twoWeeksFromNow.getTime() - today.getTime());
        const randomDate = new Date(randomTime);
        const formattedDate = randomDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long'
        });
        
        if (!dates.includes(formattedDate)) {
            dates.push(formattedDate);
        }
    }
    
    return dates;
}

// Helper function to extract args from Retell request
function extractArgs(req) {
    if (req.body && req.body.args) {
        return req.body.args;
    }
    console.log('Body received:', req.body);
    return req.body;
}

// Helper function to log request details
function logRequest(endpoint, req) {
    console.log(`[${endpoint}] Request received:`, {
        timestamp: new Date().toISOString(),
        callId: req.body?.call?.call_id || 'N/A',
        args: req.body?.args || req.body
    });
}

// API 1: Address processing with delay
app.post('/api/address', async (req, res) => {
    try {
        logRequest('/api/address', req);
        const args = extractArgs(req);
        const { address, waitTime = 1 } = args;

        if (!address) {
            console.log('[/api/address] Error: Address missing');
            return res.status(400).json({ error: 'Address is required' });
        }

        // Convert waitTime to number if it's a string
        const waitTimeNum = typeof waitTime === 'string' ? parseFloat(waitTime) : waitTime;

        // Wait for specified seconds
        await new Promise(resolve => setTimeout(resolve, waitTimeNum * 1000));

        const response = { avm: 200000 };
        console.log('[/api/address] Response:', response);
        res.json(response);
    } catch (error) {
        console.error('[/api/address] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API 2: Get available dates
app.post('/api/appointments', (req, res) => {
    try {
        logRequest('/api/appointments', req);
        const args = extractArgs(req);
        const { name, phoneNumber } = args;

        if (!name || !phoneNumber) {
            console.log('[/api/appointments] Error: Missing required fields');
            return res.status(400).json({ error: 'Name and phone number are required' });
        }

        // Generate 3 random dates in the next 2 weeks
        const availableDates = getRandomDatesInNextTwoWeeks(3);
        
        const response = { availableDates };
        console.log('[/api/appointments] Response:', response);
        res.json(response);
    } catch (error) {
        console.error('[/api/appointments] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API 3: Get neighborhood property average value
app.post('/api/neighborhood-avg', async (req, res) => {
    try {
        logRequest('/api/neighborhood-avg', req);
        const args = extractArgs(req);
        const { address } = args;

        if (!address) {
            console.log('[/api/neighborhood-avg] Error: Address missing');
            return res.status(400).json({ error: 'Address is required' });
        }

        // Wait for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        const response = { neighborhoodAverage: 300000 };
        console.log('[/api/neighborhood-avg] Response:', response);
        res.json(response);
    } catch (error) {
        console.error('[/api/neighborhood-avg] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API 4: Simple value with full request body logging
app.post('/api/simple-value', (req, res) => {
    try {
        // Log the complete request body with proper formatting
        console.log('[/api/simple-value] Full request body:', JSON.stringify(req.body, null, 2));
        
        const response = { value: 100000 };
        console.log('[/api/simple-value] Response:', response);
        res.json(response);
    } catch (error) {
        console.error('[/api/simple-value] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 