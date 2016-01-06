var express = require('express');
var router = express.Router();
var nconf = require('nconf');
var https = require('https');

nconf.argv()
   .env()
   .file({ file: 'config.json' });

router.get('/', function(req, res) {
  	res.send('monitor root');
});

router.get('/list/:type', function(req, res) {
	if(req.params.type && req.params.type == "newrelic")
	{
		var newrelic = nconf.get('newrelic');
		//query NR for the monitors and return them
		var options = {
			host: newrelic.syntheticsBaseUrl,
			path: newrelic.syntheticsMonitorsUrl,
			headers: {"X-Api-Key":newrelic.syntheticsKey}
		};

		callback = function(response) {
			var str = '';
			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				console.log("str: ", str);
				var nrRes = JSON.parse(str);
				res.set('Content-Type', 'application/json');
				res.status(200).send(nrRes);
			});
		}

		console.log("options", options);
		https.request(options, callback).end();
	}
	else
	{
		res.status(404).send("Monitor type " + req.params.type + " not found.");
	}
});

//create a monitor object in the db
//spawn a thread that reads the db and creates the monitor object

router.get('/add/:type/:uuid', function(req, res) {
	if(req.params.type && req.params.type == "newrelic" && req.params.uuid)
	{
		console.log("handle newrelic");
		handleNewRelic(req, function(status, err){
			if(err)
			{
				res.status(status).send("Unsupported action: ", err);
			}
			else
			{
				res.status(status).send();
			}
		});
	}
	else
	{
		res.status(404).send("Monitor type " + req.params.type + " not found.");
	}
});

var handleNewRelic = function(req, done) {
	var newrelic = nconf.get('newrelic');

	done(200, null);
};

module.exports = router;