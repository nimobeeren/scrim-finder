const express = require('express');
const jwt = require('jsonwebtoken');
const openid = require('openid');
const db = require('../db/db');
const config = require('../config');

// Express router
const router = express.Router();

// OpenID relying party
relyingParty = new openid.RelyingParty(
	'http://localhost:8823/auth/verify', //FIXME
	'http://localhost:8823', //FIXME
	true
);

router.post('/anonRegister', async (req, res) => {
	let user, token;
	try {
		user = await db.createUser();
		token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '24h' });
	} catch (e) {
		res.status(500).send("Could not create user");
	}

	res.status(200).send({
		userId: user._id,
		token
	});
});

router.post('/refresh', async (req, res) => {
	const authHeader = req.header("Authorization");
	const token = authHeader.replace("Bearer: ", "");

	// Verify authorization token
	let payload;
	try {
		payload = jwt.verify(token, config.secret);
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			res.sendStatus(401);
		} else {
			res.status(500).send("Could not verify authorization token");
		}
		return;
	}

	// Set last logged in date in database
	let user;
	try {
		user = await db.loginUser(payload.id);
	} catch (e) {
		res.status(410).send("Anonymous user has expired. Please register a new user.");
		return;
	}

	// Send refreshed authorization token
	res.status(200).send({
		userId: user._id,
		steamId: user.steamId,
		token: jwt.sign({ id: user._id }, config.secret, { expiresIn: '24h' })
	});
});

router.get('/login', (req, res) => {
	relyingParty.authenticate('http://steamcommunity.com/openid', false, (err, authUrl) => {
		if (err || !authUrl) {
			console.error(err);
			res.status(500).send("Authentication failed. " + err || "");
		} else {
			res.redirect(authUrl);
		}
	});
});

router.get('/verify', (req, res) => {
	relyingParty.verifyAssertion(req, async function (err, result) {
		if (err || !result || !result.authenticated) {
			res.status(500).write("Could not verify authentication");
			err && res.write(": " + err.message);
			res.end();
		} else {
			const steamId = result.claimedIdentifier.replace('http://steamcommunity.com/openid/id/', '');
			if (!steamId) {
				res.status(500).send("Could not get Steam ID");
			} else {
				let user = await db.findUserBySteamId(steamId);
				if (user && user._id) {
					// User found, log them in
					await db.loginUser(user._id);
				} else {
					// No user with this steam ID found
					user = await db.createUser(steamId);
				}

				// Return authorization token and IDs to client
				const userIdentifier = JSON.stringify({
					userId: user._id,
					steamId,
					token: jwt.sign({ id: user._id }, config.secret, { expiresIn: '24h' })
				});
				res.redirect('/?user=' + encodeURIComponent(userIdentifier)); // redirects to home page
			}
		}
	});
});

module.exports = router;
