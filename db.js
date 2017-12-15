const {MongoClient} = require('mongodb');

let db;
async function connect() {
	const uri = 'mongodb://dbuser:35dJ1G1BEc0A@cluster0-shard-00-00-ii3ed.mongodb.net:27017,cluster0-shard-00-01-ii3ed.mongodb.net:27017,cluster0-shard-00-02-ii3ed.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
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

		const collection = db.collection('posts');

		let query = {};
		if (filters) {
			if (filters.level) {
				if (Array.isArray(filters.level) && filters.level.length > 0) {
					// level can be given as an array...
					query.level = {
						$in: filters.level
					}
				} else {
					// ...or as a single value
					query.level = filters.level;
				}
			}
		}

		return collection.find(query).toArray();
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
		let parsedLevel = parseInt(post.level);
		if (!Number.isNaN(parsedLevel)) {
			doc.level = parsedLevel;
		}

		// Server attribute must be boolean
		if (typeof server === 'boolean') {
			doc.server = server;
		}

		// Always include a creation date
		doc.created = Date.now();

		// Insert document into the post collection
		const collection = db.collection('posts');
		return collection.insertOne(doc);
	}
};
