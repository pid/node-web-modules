global.NWM = 'NWM';

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
	, github = require('./lib/github_api')()
	, app = module.exports = express()
;

app.use(express.logger('dev'));
app.set('views', VIEWS);
app.set('view engine', 'ejs');
app.use(express.compress(GZIP));
app.use(app.router);
app.use(express.static(PUBLIC, MAXAGE));

app.get('/', function(req, res) {
	redis.zrevrange(NWM, 0, -1, function(err, modules) {
		var max = modules.length
			, domain = (req.protocol+'://'+req.host);
		for(var i = 0; i < max; i++) {
			modules[i] = JSON.parse(modules[i]);
		}
		var params = {site: site, modules: modules, domain: domain};
		res.render('application', params);
	});
});

app.listen(PORT, function() {
	console.log('Node web module running on port %d', PORT);
});