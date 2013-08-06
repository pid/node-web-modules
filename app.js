const PORT = (process.env.PORT || 3000)
		, VIEWS = __dirname + '/views'
		, PUBLIC = __dirname + '/public'

var express = require('express')
	, redis = require('./lib/redis_connect')()
	, scraper = require('./lib/github_scraper')
	, app = module.exports = express()
;

app.use(express.logger('dev'));
app.set('views', VIEWS);
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress({level: 9, memLevel: 9}));
app.use(app.router);
app.use(express.static(PUBLIC, {maxAge: 60 * 60 * 1000}));

app.get('/', function(req, res) {
	//redis.zrange("nwf", 0, -1, function(err, result) {
		res.end('<h1>Em desenvolvimento</h1>');
	//});
});

app.listen(PORT, function() {
	console.log('Node web framework on port %d', PORT);
});