var express = require('express');
var router = express.Router();

var crawler = require('./crawler');
var crawlerAsync = require('./crawlerAsync');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/crawl',crawler.crawl,crawler.generateCSV);

router.get('/crawl/async',crawlerAsync.crawl,crawlerAsync.generateCSV);

module.exports = router;
