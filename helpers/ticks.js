const db = require('../models');

exports.getTicks = function (req, res) {
	db.Ticks.find() // find all ticks in the db
		.then(function (ticks) {
			res.json(ticks)
		})
		.catch(function (err) {
			res.send(err);
		});
};

exports.createTicks = function (req, res) {
	db.Ticks.create(req.body)
		.then(function (newTick) {
			res.json(newTick);
		})
		.catch(function (err) {
			res.send(err);
		})
}

exports.getTick = function (req, res) {
	db.Ticks.findById(req.params.tickId) //params is filled with whatever route variables are(tickId)
		.then(function (foundTick) {
			res.json(foundTick);
		})
		.catch(function (err) {
			res.send(err);
		});
}

exports.updateTick = function (req, res) {
	db.Ticks.findOneAndUpdate({
			_id: req.params.tickId
		}, req.body, {
			new: true
		}) //passing _id which is how the method will find the req.param, then what to update
		.then(function (tick) {
			res.json(tick);
		})
		.catch(function (err) {
			res.send(err);
		})
}

exports.deleteTick = function (req, res) {
	db.Ticks.remove({
			_id: req.params.tickId
		})
		.then(function () {
			res.json({
				message: "We deleted it"
			});
		})
		.catch(function (err) {
			res.send(err);
		})
}

module.exports = exports;