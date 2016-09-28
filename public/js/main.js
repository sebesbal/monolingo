
function flash(text) {
	$("#sample").css('visibility', 'visible');
	$("#sample").html(text);
	setTimeout(function () {
			$("#sample").css('visibility', 'hidden');
		}, 100);
}

window.onload=function() {
	flash("fasza");
}