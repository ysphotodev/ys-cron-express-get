const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const port = 3000;

// Function to make GET request
const makeGetRequest = async () => {
    try {
        const response = await axios.get('https://ys.od.ua/catalog');
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error making GET request:', error);
    }
};

// Schedule the GET request every 3 minutes
cron.schedule('*/3 * * * *', () => {
    console.log('Making GET request...');
    makeGetRequest();
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
