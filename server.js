var application_root = __dirname,
	express = require('express');
	request = require('request');
	os = require("os");

	app = express();

var api_server = 'http://dev.twitter.com/'
app.all('/api/*', function(req, res) {
	path = (req.params[0]==undefined)? '' : req.params[0]

	console.log(api_server + path)
	req.pipe(request({
		url: api_server + path,
		qs: req.query,
		method: req.method
	}, proxyCallback)).pipe(res)
})

// application
app.get('*', function (req, res) {
	res.sendFile(application_root+'/app/index.html');
})

// server
var host = process.env.LOCALHOST || os.hostname();
var port = process.env.PORT || 8081;
var server = app.listen(port, host, function () {
  console.log("App listening at http://%s:%s", host, port)
})

function proxyCallback(error, response, body) {
	if (error && 'code' in error && error.code === 'ECONNREFUSED'){
		console.error('Refused connection');
	} else {
		if(error) {
			console.log(error)
		}
	}
}