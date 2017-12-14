const {MongoClient} = require('mongodb');
const uri = 'mongodb://dbuser:35dJ1G1BEc0A@cluster0-shard-00-00-ii3ed.mongodb.net:27017,cluster0-shard-00-01-ii3ed.mongodb.net:27017,cluster0-shard-00-02-ii3ed.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
const dbName = 'scrim-finder-db';

module.exports = {
	getPosts: async function () {
		const client = await MongoClient.connect(uri);
		const db = client.db(dbName);
		const collection = db.collection('posts');
		const result = await collection.find().toArray();
		client.close();
		return result;
	}
};
