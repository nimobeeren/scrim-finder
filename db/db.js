const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Reply = require('./models/reply');
const User = require('./models/user');
const steam = require('../steam');
const config = require('../config');

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

		return Post.find(query).populate('replies').populate({
			path: 'replies',
			populate: {
				path: 'author',
				model: 'User'
			}
		});
	},

	createPost: function (post) {
		return new Post(post).save();
	},

	sendReply: async function (reply, postId) {
		let message = new Reply(reply);
		let post = await Post.findOne(ObjectId(postId));

		if (post) {
			post.replies.push(message._id);
		} else {
			let e = Error("Could not find post to REPLY to");
			e.name = 'ArgumentError';
			throw e;
		}

		await message.save();
		return post.save();
	},

	editReply: function (replyId, newReply) {
		return Reply.findByIdAndUpdate(ObjectId(replyId), { $set: newReply });
	},

	getUsers: function () {
		return User.find();
	},

	createUser: async function (steamId = null) {
		const user = new User({
			steamId,
			lastLogin: Date.now()
		});

		let name;
		if (steamId) {
			// Get user's Steam name
			const summary = await steam.getPlayerSummary(steamId);
			name = summary['personaname'];
		} else {
			// Get random emoji to identify anonymous user
			const emojiRange = [0x1F300, 0x1F52E];
			const randomEmoji = Math.round(Math.random() * (emojiRange[1] - emojiRange[0]) + emojiRange[0]);
			name = "Anonymous " + String.fromCodePoint(randomEmoji);
		}
		user.name = name;

		return user.save();
	},

	loginUser: function (id) {
		return User.findByIdAndUpdate(ObjectId(id), { $set: { lastLogin: Date.now() } });
	},

	findUserBySteamId: function (steamId) {
		return User.findOne({ steamId });
	}
};
