module.exports = function() {
	var cronJob = require('cron').CronJob
		, github_scraper = require('./github_scraper')
	;
		
	var job = new cronJob({
			cronTime: '00 00 01 * * *'
		, onTick: function() {
				github_scraper();
		  }
		,	start: false
	});
	
	job.start();
}