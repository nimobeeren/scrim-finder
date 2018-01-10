const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');
require('./reply');

const postSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	body: {
		teamName: String,
		level: { type: Number, required: true },
		maps: { type: [String], required: true },
		server: Boolean,
		ip: String,
		password: String
	},
	replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
}, {
	timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
