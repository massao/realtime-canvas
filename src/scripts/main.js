$(document).ready(function() {
	var socket = io();
	var el = document.getElementById('myCanvas');
	var ctx = el.getContext('2d');
	var isDrawing;
	var data = {}
	var offset = $('#myCanvas').offset();
	ctx.lineJoin = ctx.lineCap = 'round';
	ctx.lineWidth = 10;

	el.onmousedown = function(e) {
		data.type = e.type;
		isDrawing = true;
		data.color = '#'+Math.floor(Math.random()*16777215).toString(16); //random hex color
		ctx.strokeStyle = data.color;
		ctx.beginPath();
		ctx.moveTo(e.pageX - offset.left, e.pageY - offset.top);
		data.x = e.pageX - offset.left;
		data.y = e.pageY - offset.top;
		socket.emit('drawing', data);
	};
	el.onmousemove = function(e) {
		if (isDrawing) {
			data.type = e.type;
			ctx.lineTo(e.pageX - offset.left, e.pageY - offset.top);
			ctx.stroke();
			data.x = e.pageX - offset.left;
			data.y = e.pageY - offset.top;
			socket.emit('drawing', data);
		}
	};
	el.onmouseup = function(e) {
		data.type = e.type;
		ctx.closePath();
		isDrawing = false;
		socket.emit('drawing', data);
	};

	socket.on('drawing', function(data) {
		draw(data);
	});
	
	function draw(data) {
		ctx.strokeStyle = data.color;
		if(data.type == 'mousedown') {
			ctx.beginPath();
			ctx.moveTo(data.x, data.y);
		} if(data.type == 'mousemove') {
			ctx.lineTo(data.x, data.y);
			ctx.stroke();
		} else {
			ctx.closePath();
		}
	}
});
