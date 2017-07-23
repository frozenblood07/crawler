var express = require('express');
var router = express.Router();

var crawler = require('./crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/crawl',crawler.crawl)

module.exports = router;
