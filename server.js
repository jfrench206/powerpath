// original example code from https://scotch.io/tutorials/scraping-the-web-with-node-js
// modified by Jesse French
//
// This code scrapes the Power Path website, parses to extract the Dates and Time Frames weekly breakdown,
// and sends it to myself in an email.
//
// TODO:
// figure out how to pass data to email as HTML, not string
// move global variables -> local
// separate email auth into separate file, untracked by git, for secure project sharing
// share on Github once my personal email & pass are removed


var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');

doScrape();

function doScrape(){
	//variables for use in the http GET and the email subject
	var today = new Date();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var thisMonth = months[today.getMonth()];
	var thisYear = today.getFullYear();
	var datesAndTimeFrames = "";

	url = "https://thepowerpath.com/monthly-forecast/" + thisMonth.toLowerCase() + "-" + thisYear + "-monthly-forecast/";

	request(url, function(error, response, html){
    	if(!error){
        	var $ = cheerio.load(html);

					var myArray = [];
					// find matching string and store (not fully functional)
					$('p:contains("DATES AND TIME FRAMES")').nextUntil("hr").each(function(i,elem){
						myArray[i] = $(this).html();
					});

					sendMail(myArray.join(), thisMonth, thisYear);
			};
	});

	// send email with the data
	function sendMail(body, month, year){
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
  		subject: month + " " + year + ': Dates and Time Frames',
  		text: body
		};

	// send the email
		transporter.sendMail(mailOptions, function(error, info){
 			if (error) {
   			console.log(error);
 			} else {
   			console.log('Email sent: ' + info.response);
  		};
		});
	};

	console.log("Waiting for email to send...");
};
