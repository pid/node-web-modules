module.exports = function() {
	
	var agent = require('strong-agent')
	agent.profile(
	  process.env.NODEFLY_APPLICATION_KEY,
	  ['node-web-modules','Heroku']
	);	
	
}