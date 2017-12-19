const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./message');

const postSchema = new Schema({
	author: String,
	body: {
		level: { type: Number, required: true },
		maps: { type: [String], required: true },
		server: { type: Boolean }
	},
	replies: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, {
	timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
