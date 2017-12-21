const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const config = require('../config');

// Express router
const router = express.Router();

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
					res.status(500).send("Could not retrieve posts: " + e.message);
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
		} catch (e) {
			res.status(500).send("Could not create post: " + e.message);
		}
		res.sendStatus(200);
	});

router.route('/posts/:postId')
	.get(async (req, res) => {
		let post;
		try {
			post = await db.getPost(req.params.postId);
		} catch (e) {
			res.status(500).send("Could not retrieve post: " + e.message);
		}
		if (!post) {
			res.sendStatus(404);
		} else {
			res.status(200).send(post);
		}
	})
	.post(async (req, res) => {
		try {
			await db.sendReply(req.body, req.params.postId);
		} catch (e) {
			if (e.name === 'ArgumentError') {
				res.status(400).send(e.message);
			} else {
				res.status(500).send("Could not create reply: " + e.message);
			}
		}
		res.sendStatus(200);
	});

router.get('/users', async (req, res) => {
	let users;
	try {
		users = await db.getUsers();
	} catch (e) {
		res.status(500).send("Could not get users: " + e.message);
	}
	res.status(200).send(users);
});

router.post('/auth/register', async (req, res) => {
	let user;
	try {
		user = await db.createUser();
	} catch (e) {
		res.status(500).send("Could not create user");
	}
	res.status(200).send({
		userId: user._id,
		token: jwt.sign({ id: user._id }, config.secret, {
			expiresIn: '24h'
		})
	});
});

router.post('/auth/login', async (req, res) => {
	const authHeader = req.header("Authorization");
	const token = authHeader.split("Bearer: ")[1];

	// Verify authorization token
	let payload;
	try {
		payload = jwt.verify(token, config.secret);
	} catch (e) {
		// TODO: catch other errors
		res.sendStatus(401);
		return;
	}

	// Set last logged in date in database
	try {
		await db.loginUser(payload.id);
	} catch (e) {
		res.status(410).send("Anonymous user has expired. Please register a new user.");
		return;
	}

	// Send refreshed authorization token
	res.status(200).send({
		userId: payload.id,
		token: jwt.sign({ id: payload.id }, config.secret, {
			expiresIn: '24h'
		})
	});
});

module.exports = router;
