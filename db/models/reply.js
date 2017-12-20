const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const reply = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	recipient: { type: Schema.Types.ObjectId, ref: 'User' },
	type: { type: String, default: 'text' },
	body: {
		map: String,
		message: String
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Reply', reply, 'replies');
