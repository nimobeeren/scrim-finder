const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./reply');

const postSchema = new Schema({
	author: String,
	body: {
		level: { type: Number, required: true },
		maps: { type: [String], required: true },
		server: { type: Boolean }
	},
	replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
}, {
	timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
