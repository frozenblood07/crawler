var request = require('request');
var cheerio = require('cheerio');
var config = require('../config');
var json2csv = require('json2csv');
var async = require("async");

var arrUrl = []; // list of urls to process
var runningWorkers = 0; // number of running workers.

var startTime = new Date().getTime();

var finalHref = []; //final array containing all the urls

var crawlerAsync = {

	crawl: function(req, res, next) {
		
		var q = async.queue(function (url, next) {

			runningWorkers++;

			console.log('Now running with '+ url, new Date().getTime() - startTime+" ms","No of running workers "+ runningWorkers);
		    
		    request.get(url, function (err, res, body) {
		       //process with cheerio
			    $ = cheerio.load(body);
				links = $('a'); //jquery get all hyperlinks
				$(links).each(function(i, link){

					newUrl = $(link).attr('href');
					finalHref.push( {url: newUrl} ); //push urls into final array
					
					//remove all the relative urls and urls that are not medium
					if(newUrl.indexOf('http') !== -1 && newUrl.indexOf('medium') !== -1){
						q.push(newUrl);
					}
				});

				runningWorkers--;
		        next();
		    });
		}, config.constants.maxConnections);
		
		// initial page
		q.push("https://medium.com");
		
		q.drain = function () {
		    console.log("done");
		    next();
		};

		/*TO DO
		Bench Marking
		Unit Test Cases
		*/

	},

	generateCSV: function(req, res, next) {
		
		var fields = ['url'];
		try {
		  var result = json2csv({ data: finalHref, fields: fields });
		} catch (err) {
		  console.error(err);
		}
		
		res.attachment('url.csv');
		res.status(200).send(result);

		
				
	}


}

module.exports = crawlerAsync