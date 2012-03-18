/**
 * This script is intended to retrieve the relevant web address 
 * for each school in the Cohort Default Rate Data Set
 * It uses Google's Deprecated Web Search API: 
 * https://developers.google.com/web-search/docs/#The_Hello_World_of_Google_Search
 * It is equivalent to using curl:
 * curl -e http://www.my-ajax-site.com \
 * 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=Paris%20Hilton'
 */

/*curl -e http://www.my-ajax-site.com \
'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=Paris%20Hilton'*/


var http = require('http'),
		queryString = require('querystring'),
		dbModel = require('./db'),
		fs = require('fs'),
		url = require('url');


dbModel.openSheet1(function(err,sheet1){
	dbModel.db.collection('urls', function(err, urls){
		var req;
		var insertSchoolGoogleResult = function(school){
			var query = {
						v: '1.0', 
						q: school.NAME
					};

			var options = {
				host: 'ajax.googleapis.com',
				port: 80,
				path: '/ajax/services/search/web?'+queryString.stringify(query),
				method: 'GET'
			};

			req = http.request(options, function(res) {
				console.log('STATUS: ' + res.statusCode);
				console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				var response = "";
				res.on('data', function (chunk) {
					console.log('BODY: ' + chunk);
					response += chunk;
				});
				res.on('end', function(){
					console.log("END");
					response = JSON.parse(response);
					//fs.writeFileSync(query.q+".json",response);
					urls.insert(response.responseData.results[0], function(err, inserted){
						console.log("inserted: "+school.NAME);
					});
				});
			});


			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			// write data to request body
			req.write('data\n');
			req.write('data\n');
			//req.end();
		};

		dbModel.db.collection('main', function(err,collection){
				collection.find().toArray(function(err, schools){
					var i = 0;
					var next = function(){
						if(i < 10){
							insertSchoolGoogleResult(schools[i]);
							setTimeout(next, 1000 / 2);
						} else {
							req.end();
						}
							i++;
					};
					next();
				});
		});
	});
});
