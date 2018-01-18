const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = {
	/**
	 * Attempts to verify authentication token for a request.
	 * @param req
	 * @returns {*} user ID when valid, false when invalid, null when missing
	 */
	verifyToken: function (req) {
		// Get authorization header value
		let token = req.header("Authorization");
		if (token) {
			token = token.replace("Bearer: ", "");
		} else {
			return null;
		}

		if (!token) {
			return null;
		}

		// Verify token and retrieve payload
		let payload;
		try {
			payload = jwt.verify(token, config.secret);
		} catch (e) {
			if (e instanceof jwt.JsonWebTokenError) {
				return false;
			} else {
				throw e;
			}
		}

		// Return user ID if token is valid
		if (!payload) {
			throw new Error("Could not link authentication token to user");
		} else {
			return payload.id;
		}
	}
};
