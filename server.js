// original example code from https://scotch.io/tutorials/scraping-the-web-with-node-js
// modified by Jesse French
//
// This code scrapes the Power Path website, parses to extract the Dates and Time Frames weekly breakdown,
// and sends it to myself in an email.
//
// TODO:
// figure out how to get the data I'm looking for (how to parse the DOM)
// make the code here go without pageload
// separate email auth into separate file, untracked by git, for secure project sharing
// share on Github once my personal email & pass are removed


var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var app     = express();

// setup path with Express
app.get('/scrape', function(req, res){

	//variables for use in the http GET and the email subject
	var today = new Date();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var thisMonth = months[today.getMonth()];
	var thisYear = today.getFullYear();
	var datesAndTimeFrames = "";

	url = "https://thepowerpath.com/monthly-forecast/" + thisMonth.toLowerCase() + "-" + thisYear + "-monthly-forecast/";

	var someText = request(url, function(error, response, html){
    	if(!error){
        	var $ = cheerio.load(html);

        	var myArray = [];
			// find matching string and store (not fully functional)
			datesAndTimeFrames = $('p:contains("DATES AND TIME FRAMES")').text(); // YES it works!
			// now, to figure out how to select everything after this element, until the <hr>

    		console.log(datesAndTimeFrames);
    		// return myText;
		};
	});

	// send email with the data
	var transporter = nodemailer.createTransport({
  		secure: false,
  		host: "***REMOVED***",
 	 	auth: {
   	 		user: '***REMOVED***',
   	 		pass: '***REMOVED***'
  		}
	});

	var mailOptions = {
  		from: '***REMOVED***',
  		to: '***REMOVED***',
  		subject: thisMonth + " " + thisYear + ': Dates and Time Frames',
  		text: datesAndTimeFrames
	};

	// console.log("datesAndTimeFrames outside: " + datesAndTimeFrames);

// temp commented out, uncomment when ready to send email!
//	transporter.sendMail(mailOptions, function(error, info){
//  		if (error) {
 //   		console.log(error);
 // 		} else {
  //  		console.log('Email sent: ' + info.response);
  //		}
//	});

	res.send("It is done.");

});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;
