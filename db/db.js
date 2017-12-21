const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const config = require('../config');
const Post = require('./models/post');
const Reply = require('./models/reply');
const User = require('./models/user');

mongoose.connect(config.mongoServer, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = {
	getPost: function (postId) {
		return Post.findOne(ObjectId(postId)).populate('replies');
	},

	getPosts: function (filters) {
		let query = {};

		// Include posts that are one of the specified levels
		if (filters && typeof filters.level !== 'undefined') {
			if (Array.isArray(filters.level)) {
				// level can be given as an array...
				if (filters.level.length > 0) {
					query['body.level'] = {
						$in: filters.level
					};
				}
			} else {
				// ...or as a single value
				query['body.level'] = filters.level;
			}
		}

		// Include posts that include any of the specified maps
		if (filters && typeof filters.maps !== 'undefined') {
			if (Array.isArray(filters.maps)) {
				// maps can be given as an array...
				if (filters.maps.length > 0) {
					query['body.maps'] = {
						$not: {
							$exists: true,
							$nin: filters.maps
						}
					};
				}
			} else {
				// ...or as a single value
				query['body.maps'] = filters.maps;
			}
		}

		// Include posts that match the server preference or do not have a
		// server preference set
		if (filters && typeof filters.server === 'boolean') {
			query['body.server'] = {
				$not: {
					$exists: true,
					$ne: filters.server
				}
			};
		}

		// Include posts that are newer than the specified age (in minutes)
		if (filters && typeof filters.maxAge === 'number') {
			const oldestDate = Date.now() - filters.maxAge * 60 * 1000;
			query.createdAt = {
				$gt: oldestDate
			};
		}

		return Post.find(query).populate('replies');
	},

	createPost: function (post) {
		const newPost = new Post({
			author: post.teamName,
			body: {
				level: post.level,
				maps: post.maps,
				server: post.server
			}
		});

		return newPost.save();
	},

	sendReply: async function (reply, postId) {
		let message = new Reply(reply);
		let post = await Post.findOne(ObjectId(postId));

		if (post) {
			post.replies.push(message._id);
		} else {
			let e = Error("Could not find post to reply to");
			e.name = 'ArgumentError';
			throw e;
		}

		await message.save();
		return post.save();
	},

	getUsers: function () {
		return User.find();
	},

	createUser: function (name = null) {
		const user = new User({
			name,
			lastLogin: Date.now()
		});
		return user.save();
	},

	loginUser: function (id) {
		return new Promise(async (resolve, reject) => {
			const update = User.findByIdAndUpdate(ObjectId(id), { $set: { lastLogin: Date.now() } });
			if (!await update) {
				reject("User not found");
			} else {
				resolve(update);
			}
		})
	}
};
