const express = require('express');
const jwt = require('jsonwebtoken');
const openid = require('openid');
const auth = require('../auth');
const db = require('../db/db');
const config = require('../config');

// Express router
const router = express.Router();

// OpenID relying party
relyingParty = new openid.RelyingParty(
	`${config.host}/auth/verify`,
	config.host,
	true
);

/**
 * POST: Creates a new anonymous user, which expires in 24 hours.
 * Returns a user identifier, including an authorization token.
 */
router.post('/anonRegister', async (req, res) => {
	// Creates new anonymous user in database
	let user;
	try {
		user = await db.createUser();
	} catch (e) {
		res.status(500).send("Could not create user: " + e.message || e);
		return;
	}

	// Generate authorization token for this user
	let token;
	try {
		token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '24h' });
	} catch (e) {
		res.status(500).send("Could not generate authorization token: " + e.message || e);
	}

	// Return user identifier, including authorization token
	res.status(200).send({
		id: user._id,
		name: user.name,
		token
	});
});

/**
 * POST: Extends an existing user’s session. The refreshed token expires in 24 hours.
 * Returns user data.
 */
router.post('/refresh', async (req, res) => {
	// Validate authentication token and get user ID
	let userId;
	try {
		userId = auth.verifyToken(req);
	} catch (e) {
		res.status(500).send("Could not verify authorization token: " + e.message || e);
	}
	if (!userId) {
		res.sendStatus(401);
		return;
	}

	// Set last logged in date in database
	let user;
	try {
		user = await db.loginUser(userId);
	} catch (e) {
		res.status(410).send("Anonymous user has expired. Please register a new user. " + e.message || e);
		return;
	}

	// Create refreshed token for this user
	let refreshedToken;
	try {
		refreshedToken = jwt.sign({ id: user._id }, config.secret, { expiresIn: '24h' });
	} catch (e) {
		res.status(500).send("Could not generate authorization token: " + e.message || e);
		return;
	}

	// Response contains user data and refreshed token
	const response = {
		id: user._id,
		name: user.name,
		token: refreshedToken
	};
	if (user.steamId) {
		response.steamId = user.steamId; // Add Steam ID if present
	}

	// Send refreshed authorization token along with user data
	res.status(200).send(response);
});

/**
 * GET: Redirects to Steam's OpenID authentication page
 */
router.get('/login', (req, res) => {
	// Get OpenID authorization URL
	relyingParty.authenticate('http://steamcommunity.com/openid', false, (err, authUrl) => {
		if (err || !authUrl) {
			res.status(500).write("Authentication failed");
			err && res.write(": " + err.message);
			res.end();
		} else {
			// Redirect to external authorization URL
			res.redirect(authUrl);
		}
	});
});

/**
 * GET: Callback endpoint for OpenID authentication. Redirects to home page, while returning a user identifier,
 * including an authentication token in URL params.
 */
router.get('/verify', (req, res) => {
	// Verify valid OpenID authentication
	relyingParty.verifyAssertion(req, async function (err, result) {
		if (err || !result || !result.authenticated) {
			res.status(500).write("Could not verify authentication");
			err && res.write(": " + err.message);
			res.end();
		} else {
			// Get Steam ID from OpenID response (this ID can be trusted)
			const steamId = result.claimedIdentifier.replace('http://steamcommunity.com/openid/id/', '');
			if (!steamId) {
				res.status(500).send("Could not get Steam ID");
				return;
			}

			// Find existing user or create a new one using this Steam ID
			let user = await db.findUserBySteamId(steamId);
			if (user && user._id) {
				// User found, log them in
				await db.loginUser(user._id);
			} else {
				// No user with this steam ID found, create new user
				try {
					user = await db.createUser(steamId);
				} catch (e) {
					res.status(500).send("Could not create new Steam user: " + e.message || e);
					return;
				}
			}

			// Generate authorization token for this user
			let token;
			try {
				token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '24h' });
			} catch (e) {
				res.status(500).send("Could not generate authorization token: " + e.message || e);
				return;
			}

			// Create identifier, including authorization token
			const userIdentifier = JSON.stringify({
				id: user._id,
				name: user.name,
				steamId,
				token
			});

			// Redirect to the home page, passing user identifier as a JSON-encoded URL parameter
			res.redirect('/?user=' + encodeURIComponent(userIdentifier));
		}
	});
});

module.exports = router;
