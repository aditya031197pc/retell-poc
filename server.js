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

// API 1: Address processing with delay
app.post('/api/address', async (req, res) => {
    try {
        console.log('[/api/address] Request received:', {
            timestamp: new Date().toISOString(),
            body: req.body
        });

        const { address, waitTime = 1 } = req.body; // Default wait time is 1 second

        if (!address) {
            console.log('[/api/address] Error: Address missing');
            return res.status(400).json({ error: 'Address is required' });
        }

        // Wait for specified seconds
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));

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
        console.log('[/api/appointments] Request received:', {
            timestamp: new Date().toISOString(),
            body: req.body
        });

        const { name, phoneNumber } = req.body;

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
        console.log('[/api/neighborhood-avg] Request received:', {
            timestamp: new Date().toISOString(),
            body: req.body
        });

        const { address } = req.body;

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 