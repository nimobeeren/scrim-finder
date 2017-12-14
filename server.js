const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/posts', express.json());

app.get('/api/test', (req, res) => {
	res.send("Hello world!");
});

app.get('/api/posts', async (req, res) => {
	const posts = await db.getPosts();
	res.send(posts);
});

app.put('/api/posts', async (req, res) => {
	try {
		await db.createPost(req.body);
		res.status(200).send("Post created");
	} catch (e) {
		res.status(500).send("Server error when creating post");
	}
});

module.exports = app;
