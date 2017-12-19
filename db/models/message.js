const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const messageSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	recipient: { type: Schema.Types.ObjectId, ref: 'User' },
	type: { type: String, default: 'text' },
	body: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
