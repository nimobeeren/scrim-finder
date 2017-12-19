const {MongoClient, ObjectId} = require('mongodb');
const mongoCredentials = require('./mongoCredentials');

let db;

async function connect() {
	const uri = mongoCredentials.uri;
	const dbName = 'scrim-finder-db';

	const client = await MongoClient.connect(uri);
	console.log("Connected to db");
	return client.db(dbName);
}

module.exports = {
	getPosts: async function (filters) {
		// Make sure we have an active database connection
		if (!db) {
			db = await connect();
		}

		let query = {};

		// Include posts that are one of the specified levels
		if (filters && typeof filters.level !== 'undefined') {
			if (Array.isArray(filters.level)) {
				// level can be given as an array...
				if (filters.level.length > 0) {
					query.level = {
						$in: filters.level
					};
				}
			} else {
				// ...or as a single value
				query.level = filters.level;
			}
		}

		// Include posts that include any of the specified maps
		if (filters && typeof filters.maps !== 'undefined') {
			if (Array.isArray(filters.maps)) {
				// maps can be given as an array...
				if (filters.maps.length > 0) {
					query.maps = {
						$not: {
							$exists: true,
							$nin: filters.maps
						}
					};
				}
			} else {
				// ...or as a single value
				query.maps = filters.maps
			}
		}

		// Include posts that match the server preference or do not have a
		// server preference set
		if (filters && typeof filters.server === 'boolean') {
			query.server = {
				$not: {
					$exists: true,
					$ne: filters.server
				}
			};
		}

		// Include posts that are newer than the specified age (in minutes)
		if (filters && typeof filters.maxAge === 'number') {
			const oldestDate = Date.now() - filters.maxAge * 60 * 1000;
			query.created = {
				$gt: oldestDate
			};
		}

		const posts = db.collection('posts');
		return posts.find(query).toArray();
	},

	createPost: async function (post) {
		// Make sure we have an active database connection
		if (!db) {
			db = await connect();
		}

		// Create a document to instert into the database
		let doc = {};

		// Set team name if requested
		if (post.teamName) {
			doc.teamName = post.teamName;
		}

		// Set maps if requested
		if (post.maps) {
			doc.maps = post.maps;
		}

		// Level must be parsable as integer
		let parsedLevel = parseInt(post.level, 10);
		if (!Number.isNaN(parsedLevel)) {
			doc.level = parsedLevel;
		}

		// Server attribute must be boolean-ish
		if (typeof post.server !== 'undefined' && post.server !== null) {
			let parsedServer;
			if (typeof post.server === 'boolean') {
				parsedServer = post.server;
			} else {
				const serverStr = post.server.toString().toLowerCase();
				parsedServer = (
					serverStr === 'true'
					|| serverStr === '1'
					|| serverStr === 'on'
				);
			}
			doc.server = parsedServer;
		}

		// Always include a creation date
		doc.created = Date.now();

		// Insert document into the post collection
		const posts = db.collection('posts');
		return posts.insertOne(doc);
	},

	getPostMessages: async function (postId) {
		// Make sure we have an active database connection
		if (!db) {
			db = await connect();
		}

		const messages = db.collection('messages');
		return messages.find({
			postId: ObjectId(postId)
		}).toArray();
	},

	sendMessage: async function (message) {
		// Make sure we have an active database connection
		if (!db) {
			db = await connect();
		}

		console.log(message);

		// Create a new document to store message
		let doc = {};

		if (message && message.postId) {
			doc.postId = ObjectId(message.postId);
		}

		if (message && message.author) {
			doc.author = ObjectId(message.author);
		}

		if (message && message.type) {
			doc.type = message.type;
		}

		if (message && message.body) {
			doc.body = message.body;
		}

		doc.createdAt = Date.now();

		const messages = db.collection('messages');
		return messages.insertOne(doc);
	}
};
