var request = require('request')
	, redis   = require('redis')
	, frameworks = require('./web_frameworks.json')
	, client = redis.createClient()
;

