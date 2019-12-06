require('dotenv').config(); //this is an npm package that includes the .env file 
const mongoose = require('mongoose');
mongoose.Promise = Promise;

//connect to database
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

//this requires the ticks model file
module.exports.Ticks = require('./ticks')