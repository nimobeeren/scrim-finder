const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/test', (req, res) => {
	res.send("Hello world!");
});

app.get('/api/posts', async (req, res) => {
	const posts = await db.getPosts();
	res.send(posts);
});

module.exports = app;
