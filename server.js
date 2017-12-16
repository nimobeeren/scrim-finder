const express = require('express');
const path = require('path');
const api = require('./routes/api');
const app = express();

// Serve static client build
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle API requests
app.use('/api', api);

module.exports = app;
