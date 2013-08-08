module.exports = function() {
	
	const GH_API = 'https://api.github.com/repos/';

	var request = require('request')
		, moment = require('moment')
		, redis = require('./redis_connect')()
		, modules = require('./../modules.json')
	;
	
	console.log("Running github api consumer...");
	for(var m in modules) {
		var gh_module_url = GH_API + modules[m]
			, gh_module_contrib_url = GH_API + gh_module_url + '/contributors'
		;

		request({url: gh_module_url, json:true}, function(err, res, repo) {
			request({url: gh_module_contrib_url, json:true}, function(err, res, contributors) {
			
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
						, contributors: contributors.length
						, description: repo.description
				});
				
				redis.zadd(NWF, repo.watchers, data, function() {
					console.log("Storing: %j\n-------------\n", data);
				});
			});
		});
	}
}