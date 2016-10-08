
var sample_label;

function flash(text) {
	sample_label.css('visibility', 'visible');
	sample_label.html(text);
	setTimeout(function () {
		sample_label.css('visibility', 'hidden');
	}, 100);
}

task_id = 0;
task_txt = '';

function set_task_id(id) {
	task_id = id;
	task_txt = get_text(id);
	img = get_image(id);
	if (img == undefined) {
		$('#task_image').css('visibility', 'hidden');
	} else {
		$('#task_image').css('visibility', 'visible');
		$('#task_image').attr('src', img);
	}
	
	// if (0 == task_id) {
		// task_txt = 'She has four red shoes.';
	// } else if (1 == task_id) {
		// task_txt = 'korte';
	// } else {
		// task_txt = 'citrom';
	// }
}

function get_image(id) {
	return "imgs/task_" + id + ".png";
	
	var url = null;
	$.get(url).done(function() { 
		url = "imgs/task_" + id + ".png";
    }).fail(function() { 
        // not exists code
    });
	return url;
}

var texts = ["Is this seat free?", "What's the matter?"];

function get_text(id) {
	return texts[id];
}

function check_task() {
	input_txt = $('#input_field').val();
	console.log("input_txt = " + input_txt);
	console.log("task_txt = " + task_txt);
	if (input_txt == task_txt) {
		console.log("OK");
		$('#input_field').css('backgroundColor', 'lightGreen');
	}
}

function next_task() {
	set_task_id(task_id + 1);
}

function show_sample() {
	flash(task_txt);
}


function input_field_key_pressed(e, textarea){
	console.log('alma');
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		check_task();
		e = e || window.event;
		if( e.preventDefault) e.preventDefault();
		return false;
	}
}

window.onload = function() {
	sample_label = $('#sample_label');
	$('#input_field').onkeypress = function(e) {
		console.log('alma');
		e = e || window.event;
		if( e.preventDefault) e.preventDefault();
		return false;
	}
	set_task_id(0);
}
