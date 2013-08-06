const PORT = (process.env.PORT || 3000)
		, VIEWS = __dirname + '/views'
		, PUBLIC = __dirname + '/public'
		, STYLUS = __dirname + '/stylus'
		, MAXAGE = {maxAge: 60 * 60 * 1000}
		, GZIP = {level: 9, memLevel: 9}

var express = require('express')
	, redis = require('./lib/redis_connect')()
	, scraper = require('./lib/github_scraper')()
	, agent = require('strong-agent')
	, stylus = require('stylus')
	, nib = require('nib')
	, uglify = require('uglifyjs-middleware')
	, site = require('./config.json')
	, app = module.exports = express()
;

agent.profile(
  process.env.NODEFLY_APPLICATION_KEY,
  ['node-web-frameworks','Heroku']
);

app.use(express.favicon());
app.use(express.logger('dev'));
app.set('views', VIEWS);
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware({
    src: STYLUS,
    dest: PUBLIC,
    compile: function (str, path, fn) {
      return stylus(str)
      	.set('filename', path)
      	.set('compress', true)
      	.use(nib());
    }
}));
app.use(uglify(PUBLIC));
app.use(express.static(PUBLIC, MAXAGE));
app.use(express.compress(GZIP));

app.get('/', function(req, res) {
	//redis.zrange("nwf", 0, -1, function(err, result) {
		res.render('application', {site: site
														 , domain: (req.protocol+'://'+req.host)});
	//});
});

app.listen(PORT, function() {
	console.log('Node web framework on port %d', PORT);
});