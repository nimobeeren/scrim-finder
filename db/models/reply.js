const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const reply = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	recipient: { type: Schema.Types.ObjectId, ref: 'User' },
	type: {
		type: String,
		enum: ['text', 'request', 'accept', 'decline'],
		default: 'text'
	},
	status: {
		type: String,
		enum: ['accepted', 'declined']
	},
	body: {
		map: String,
		message: String,
		ip: String,
		password: String
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Reply', reply, 'replies');
