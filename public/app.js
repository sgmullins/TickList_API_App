$(document).ready(function () {
	$.getJSON("/api/ticks")
		.then(addTicks)

	$('#goalInput').keypress(function (e) {
		if (e.which == 13) { //enter key is key 13
			createGoals();
		}
	});

	$('.list').on('click', 'li', function () {
		updateTick($(this))
	});


	$('.list').on('click', 'span', function (e) {
		e.stopPropagation(); //stops the click from spreading to li and running li click
		removeTick($(this).parent());
	});
});

function addTicks(ticks) {
	//add ticks to page
	ticks.forEach(function (ticks) {
		addItem(ticks)
	});
}

function addItem(tick) {
	let newTick = $('<li class="tick">' + tick.name + ' <span>X</span></li>');
	newTick.data('id', tick._id) //jquery method of adding data attribute. mongo stores ids as _id
	newTick.data('completed', tick.completed); // sets completed to correct
	if (tick.completed) {
		newTick.addClass("done");
	}
	$('.list').append(newTick);
}

function removeTick(tick) {
	let clickedId = tick.data('id');
	let deleteURL = '/api/ticks/' + clickedId;
	$.ajax({
		method: 'DELETE',
		url: deleteURL
	}).then(function (data) {
		tick.remove();
	});
}


function createGoals() {
	//send request to create a new tick
	let usrInput = $('#goalInput').val();
	$.post('/api/ticks', {
			name: usrInput
		})
		.then(function (newGoal) {
			$('#goalInput').val(''); //set text input back to empty string
			addItem(newGoal)
		}).catch(function (err) {
			console.log(err);
		})
}

function updateTick(tick) {
	let updateURL = '/api/ticks/' + tick.data('id');
	let isDone = !tick.data('completed');
	let updateData = {
		completed: isDone
	}
	$.ajax({
		method: "PUT",
		url: updateURL,
		data: updateData
	}).then(function (updatedTick) {
		tick.toggleClass("done");
		tick.data('completed', isDone);
	})
}