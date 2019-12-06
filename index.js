require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

//Require routes-- looks for the associated routes files
const ticksRoutes = require('./routes/ticks')

//use body parser to handle post data, allows us to access the request body (req.body)in json form and url encoded
//takes the request string and parsed into an object that is accessed from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views')); //tells express where the static html files are to serve

//this is how we define a route, could be /happy, /locations.... think of it as pages
//the '/' is the home page, it is different than the ticks routes '/' (that one is /api/ticks/)
app.get('/', function (req, res) {
	res.sendFile("index.html"); //this is express rendering a static html file from the views dir.
});

//tells app to use all the route files ,setting all of our ticks routes (get put.. to all of them)
//prefixing all routes with /api/ticks
app.use('/api/ticks', ticksRoutes)

app.listen(port, () => console.log(`App listening on port ${port}!`));