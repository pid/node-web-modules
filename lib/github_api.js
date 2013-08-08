module.exports = function() {
	
	var request = require('request')
		, url = require('url')
		, redis = require('./redis_connect')()
		, frameworks = require('./../modules.json')
	;
	
	console.log("Running github api consumer...");
	for(var fw in frameworks) {
		
		request({url: frameworks[fw].github, json:true}, function(err, res, repo) {
			request({url: frameworks[fw].github + '/contributors', json:true}, function(err, res, contributors) {
			
				var data = JSON.stringify({
							name: repo.name
						, url: repo.html_url
						, image: frameworks[fw].image
						, site: repo.homepage
						, created_at: repo.created_at
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
					console.log("Storing: %s", data);
				});
			});
		});
	}
}