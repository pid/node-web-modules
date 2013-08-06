const PORT = (process.env.PORT || 3000)
		, VIEWS = __dirname + '/views'
		, PUBLIC = __dirname + '/public'
		, STYLUS = __dirname + '/stylus'
		, MAXAGE = {maxAge: 60 * 60 * 1000}
		, GZIP = {level: 9, memLevel: 9}

var express = require('express')
	, redis = require('./lib/redis_connect')()
	, github_scraper = require('./lib/github_scraper')
	, site = require('./config.json')
	, app = module.exports = express()
;

require('./lib/cron_task')();
require('./lib/nodefly_profiler')()

app.use(express.favicon());
app.use(express.logger('dev'));
app.set('views', VIEWS);
app.set('view engine', 'ejs');
app.use(express.compress(GZIP));
app.use(app.router);
app.use(express.static(PUBLIC, MAXAGE));

app.get('/', function(req, res) {
	//redis.zrange("nwf", 0, -1, function(err, result) {
		res.render('application', {site: site
														 , domain: (req.protocol+'://'+req.host)});
	//});
});

app.listen(PORT, function() {
	console.log('Node web framework on port %d', PORT);
});