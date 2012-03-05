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
    url = require('url');


var options = {
  host: 'ajax.googleapis.com',
  port: 80,
  path: '/ajax/services/search/web?v=1.0&q=Paris%20Hilton',
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();