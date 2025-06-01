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
        const { address, waitTime = 5 } = req.body; // Default wait time is 5 seconds

        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }

        // Wait for specified seconds
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));

        // Return mock AVM
        res.json({ avm: 200000 });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API 2: Get available dates
app.post('/api/appointments', (req, res) => {
    try {
        const { name, phoneNumber } = req.body;

        if (!name || !phoneNumber) {
            return res.status(400).json({ error: 'Name and phone number are required' });
        }

        // Generate 3 random dates in the next 2 weeks
        const availableDates = getRandomDatesInNextTwoWeeks(3);

        res.json({ availableDates });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 