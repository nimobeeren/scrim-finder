const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Use Express middleware to parse JSON requests
router.use('/posts', express.json());

router.route('/posts')
	.get(async (req, res) => {
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
					res.status(500).send("Server could not retrieve posts: " + e.message);
				}
			}
		}

		// Get posts that match filters from database
		const posts = await db.getPosts(filters);

		// Get messages associated with these posts
		let messages = null;
		for (let i = 0; i < posts.length; i++) {
			try {
				messages = await db.getPostMessages(posts[i]._id);
			} catch (e) {
				res.status(500).send("Server could not retrieve post messages: " + e.message);
			}
			if (messages && messages.length > 0) {
				Object.assign(posts[i], {messages});
			}
		}

		res.send(posts);
	})
	.post(async (req, res) => {
		try {
			await db.createPost(req.body);
		} catch (e) {
			res.status(500).send("Server could not create post: " + e.message);
		}
		res.sendStatus(200);
	});

router.route('/posts/:postId')
	.get(async (req, res) => {
		let messages;
		try {
			messages = await db.getPostMessages(req.params.postId);
		} catch (e) {
			res.status(500).send("Server cuold not retrieve messages: " + e.message);
		}
		res.status(200).send(messages);
	})
	.post(async (req, res) => {
		console.log(req.body);
		let message = req.body;
		message.postId = req.params.postId;

		try {
			await db.sendMessage(message);
		} catch (e) {
			res.status(500).send("Server could not create message: " + e.message);
		}
		res.sendStatus(200);
	});

module.exports = router;
