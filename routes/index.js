var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');
var async = require('async');
// var client = request.createClient('http://localhost:3000/');
var fixUrl = 'http://api.odds24.com/fixtures?user=dev&leagues=SOCENGPRE';

request(fixUrl, function(err, response, body) { // GET fixtures from api
	var fixBody = JSON.parse(body);
	console.log(fixBody.SOCENGPRE.league_name);
	var fixtures = fixBody.SOCENGPRE.fixtures;	

	// var event_slugs = [];
	var odds = [];
	var date = moment(1428147900).format("MMMM Do YYYY");
	var events = [];

	async.concat(fixtures, function(fix, callback) {
			var event_slug = fix.event_slug;
			var oddsUrl = 'http://api.odds24.com/odds/event/' + event_slug + '?user=dev';			
			request(oddsUrl, function (error, response, oddsBody) {
				var odds = JSON.parse(oddsBody);
				callback(null, odds);
			});			
		},
		function(err, odds) {
			console.log(odds[0]);			
			/* GET home page. */
			router.get('/', function(req, res, next) {

				res.render('index', { 
					title: 'Express', 
			  		fixtures: fixtures,
			  		date: date,
			  		odds: odds
			  	});
			});	
		}
	);	
});

module.exports = router;
