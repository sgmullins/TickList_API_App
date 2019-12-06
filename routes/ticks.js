const express = require('express');
const router = express.Router(); //express routing option, allows us to use router.get, .put ...
const db = require('../models'); //sets db to models directory
const helpers = require('../helpers/ticks');

// /api/ticks routes. we prefixed the api/ticks part in the index under app.use()
router.route('/') //newer syntax using helpers file, cleans up code under the same route
	.get(helpers.getTicks)
	.post(helpers.createTicks)

router.route('/:tickId')
	.get(helpers.getTick)
	.put(helpers.updateTick)
	.delete(helpers.deleteTick)

//exporting the router so that index can import it
module.exports = router;