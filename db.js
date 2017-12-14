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
	getPosts: async function () {
		if (!db) {
			db = await connect();
		}
		const collection = db.collection('posts');
		return collection.find().toArray();
	}
};
