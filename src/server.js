import "dotenv/config";
import express from 'express';

import { Datetime } from "../services/hindu-astro-calculations/app-utils/date-time.js";
import { GeoPos } from "../services/hindu-astro-calculations/app-utils/geopos.js";
import Chart from "../services/hindu-astro-calculations/app-utils/chart.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    const dateTime = new Datetime('2025/04/15', '16:30', '+00:00');
    const geoPos = new GeoPos('24.76','79.68');
    const chart = new Chart(dateTime, geoPos);
    const response = chart.get('Moon');
    // console.log(response);
    res.status(200).json({data: response});
});

// Start the server
app.listen(3000, "0.0.0.0", () => {
    console.log('Server is running on http://localhost:3000');
});
