const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this is our schema, these values can be changed and added to if I want more options
const ticksSchema = new Schema({
	name: {
		type: String,
		required: 'Goal cannot be blank!'
	},
	completed: {
		type: Boolean,
		default: false
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

//compile schema into a model and save it to a variable in order to export
const Ticks = mongoose.model('Ticks', ticksSchema)

module.exports = Ticks;