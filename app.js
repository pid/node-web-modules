global.NWF = 'NWF';

const PORT = (process.env.PORT || 3000)
		, VIEWS = __dirname + '/views'
		, PUBLIC = __dirname + '/public'
		, STYLUS = __dirname + '/stylus'
		, MAXAGE = {maxAge: 60 * 60 * 1000}
		, GZIP = {level: 9, memLevel: 9}

var express = require('express')
	, site = require('./config.json')
	, redis = require('./lib/redis_connect')()
	, cron = require('./lib/cron_task')()
	//, github = require('./lib/github_api')()
	, app = module.exports = express()
;

app.use(express.logger('dev'));
app.set('views', VIEWS);
app.set('view engine', 'ejs');
app.use(express.compress(GZIP));
app.use(app.router);
app.use(express.static(PUBLIC, MAXAGE));

app.get('/', function(req, res) {
	redis.zrevrange(NWF, 0, -1, function(err, result) {
		for(var i = 0; i < result.length; i++) {
			result[i] = JSON.parse(result[i]);
		}
		res.render('application', {site: site
														 , modules: result
														 , domain: (req.protocol+'://'+req.host)});
	});
});

app.listen(PORT, function() {
	console.log('Node web framework on port %d', PORT);
});