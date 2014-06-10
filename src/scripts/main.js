$(document).ready(function() {
	var socket = io();
	var el = document.getElementById('myCanvas');
	var ctx = el.getContext('2d');
	var isDrawing;

	el.onmousedown = function(e) {
		isDrawing = true;
		ctx.lineWidth = 10;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.moveTo(e.layerX, e.layerY);
	};
	el.onmousemove = function(e) {
		if (isDrawing) {
			ctx.lineTo(e.layerX, e.layerY);
			ctx.stroke();
		}
	};
	el.onmouseup = function() {
		isDrawing = false;
	};
});
