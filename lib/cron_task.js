module.exports = function() {
	var cronJob = require('cron').CronJob
		, github = require('./github_api')
	;
		
	var job = new cronJob({
			cronTime: '00 00 01 * * *'
		, onTick: function() {
				github();
		  }
		,	start: false
	});
	
	job.start();
}