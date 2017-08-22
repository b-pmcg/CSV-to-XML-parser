var	express = require('express'),
	morgan  = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

module.exports = function() {
	var app = express(); //creates a new instance of express called 'app'

	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded ({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// //now pass the express instance to your routing file
	// require('../app/routes/index.server.routes.js')(app);
	//old index.server.routes.js file for references:
	// module.exports = function(app) {
	// 	var index = require('../controllers/index.server.controller'); //render method is in here
	// 	app.get('/', index.render); //uses render method as middleware
	// }

	var index = require('../app/controllers/index.server.controller'); //render method is in here
	app.get('/', index.render); //uses render method as middleware

	app.use(express.static('./public'));

	return app;
};
