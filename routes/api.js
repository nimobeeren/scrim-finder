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
					throw e;
				}
			}
		}

		// Get posts that match filters from database
		const posts = await db.getPosts(filters);
		res.send(posts);
	})
	.post(async (req, res) => {
		try {
			await db.createPost(req.body);
			res.status(200).send("Post created");
		} catch (e) {
			res.status(500).send("Server error when creating post");
		}
	});

module.exports = router;
