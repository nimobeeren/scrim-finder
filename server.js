const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/test', (req, res) => {
	res.send("Hello world!");
});

module.exports = app;
