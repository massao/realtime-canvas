exports.index = function(req, res) {
	var data = {
		title: 'Canvas',
		bc: 'home'
	}
	res.render('index', {data: data});
};
