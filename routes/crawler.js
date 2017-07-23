var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');



var crawler = {

	crawl: function(req, res) {
		res.send('Testing');
		
	}
}

module.exports = crawler