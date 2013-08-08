module.exports = function() {
	
	const GH_API = 'https://api.github.com/repos/';

	var request = require('request')
		, moment = require('moment')
		, path = require('path')
		, redis = require('./redis_connect')()
		, modules = require('./../modules.json')
	;

	redis.flushdb(function(err, success) {
		if(err) console.log(err);
		if(success) console.log('Flush DB keys...');
	});
	
	console.log("Running github api consumer...");
	for(var m in modules) {
		var gh_module_url = GH_API + modules[m];

		request({url: gh_module_url, json:true}, function(err, res, repo) {
			
			console.log("Receive: %j\n", repo);

			var data = JSON.stringify({
						name: repo.name
					, url: repo.html_url
					, image: 'images/' + repo.name + '.png'
					, site: repo.homepage
					, created_at: moment(repo.created_at).fromNow()
					, author: repo.owner.login
					, author_url: repo.owner.html_url
					, author_image: repo.owner.avatar_url
					, forks: repo.forks_count
					, watchers: repo.watchers
					, issues: repo.open_issues
					, description: repo.description
			});
			
			redis.zadd(NWM, repo.watchers, data, function() {
				console.log("Storing: %j\n-------------\n", data);
			});
		});
	}
}