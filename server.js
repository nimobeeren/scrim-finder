const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/db');

app.use(express.static(path.join(__dirname, 'client/build')));

// Use Express middleware to parse JSON requests
app.use('/api/posts', express.json());

app.get('/api/test', (req, res) => {
	res.send("Hello world!");
});

app.get('/api/posts', async (req, res) => {
	// Get encoded query string from URL
	const query = req.query.filters;

	// Decode and parse query as JSON
	let filters = null;
	if (query) {
		try {
			filters = JSON.parse(decodeURIComponent(query));
		} catch (e) {
			if (e instanceof SyntaxError) {
				res.status(400).send("Bad filters parameter");
			} else {
				throw e;
			}
		}
	}

	// Get posts that match filters from database
	const posts = await db.getPosts(filters);
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
