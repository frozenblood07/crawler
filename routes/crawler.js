var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var config = require('../config');
var json2csv = require('json2csv');

var arrUrl = []; // list of urls to process
var runningWorkers = 0; // number of running workers.

var startTime = new Date().getTime();

var counter = 0;

arrUrl.push("https://medium.com,");

var finalHref = [];


function processRequest(maxConnections,callback) {
	if(arrUrl.length == 0) {
		arrUrl = [];
		callback();
		return;
	}

 	var url = arrUrl.shift(); // take first in list
    runningWorkers++;

	console.log('Now running with '+ url, new Date().getTime() - startTime+" ms","No of running workers "+ runningWorkers);

    request(url, function(err,resp,body) { 
       //process with cheerio
	    $ = cheerio.load(body);
		links = $('a'); //jquery get all hyperlinks
		$(links).each(function(i, link){

			newUrl = $(link).attr('href');
			finalHref.push( {url: newUrl} ); //push urls into final array
			
			//remove all the relative urls and urls that are not medium
			if(newUrl.indexOf('http') !== -1 && newUrl.indexOf('medium') !== -1){
				arrUrl.push(newUrl);
			}
		});
       
       while (arrUrl.length && runningWorkers < maxConnections) {
            processRequest(maxConnections,callback); //start more workers
       }

       //finished doing this one url
       runningWorkers--;
       counter++;
    });

    return;
}


var crawler = {

	crawl: function(req, res, next) {
		
		processRequest(config.constants.maxConnections,function(){
			next();
		});

		/*TO DO
		Bench Marking
		Unit Test Cases
		Better Implementation??
		Database Connection to Make Generic -- Redis/Mongo?
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

		res.send('Done...');
				
	}


}

module.exports = crawler