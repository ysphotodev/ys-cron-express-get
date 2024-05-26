// const express = require('express');
// const axios = require('axios');
// const cron = require('node-cron');
//
// const app = express();
// const port = 3000;
//
// // Function to make GET request
// const makeGetRequest = async () => {
//     try {
//         const response = await axios.get('https://ys.od.ua/catalog');
//         console.log('Response data:', response.data);
//     } catch (error) {
//         console.error('Error making GET request:', error);
//     }
// };
//
// // Schedule the GET request every 3 minutes
// cron.schedule('*/3 * * * *', () => {
//     console.log('Making GET request...');
//     makeGetRequest();
// });
//
// // Define a simple route
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });
//
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });




const puppeteer = require('puppeteer');

async function makeGetRequest(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        console.log(`GET request to ${url} at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
        console.error(`Failed to make GET request to ${url}:`, error);
    } finally {
        await browser.close();
    }
}

const url = 'https://strapi-ys-app-main.onrender.com'; // Replace with your target URL
const interval = 1 * 60 * 1000; // 3 minutes in milliseconds

// Immediately invoke the function and then set it to repeat at the specified interval
(async function scheduleRequests() {
    await makeGetRequest(url);
    setInterval(async () => {
        await makeGetRequest(url);
    }, interval);
})();
