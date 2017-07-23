/*
  Author: Karan Tuteja
  github:  https://github.com/frozenblood07
*/

'use strict';
/*jslint node: true */

//var log = require('metalogger')();

var env = process.env.NODE_ENV || 'development';

module.exports = require('./'+env);