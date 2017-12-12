const express = require('express');
const test = require('./routes/test');
const app = express();

app.use('/test', test);

module.exports = app;
