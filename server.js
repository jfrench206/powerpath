// original example code from https://scotch.io/tutorials/scraping-the-web-with-node-js
// modified by Jesse French
//
// This code scrapes the Power Path website, parses to extract the Dates and Time Frames weekly breakdown,
// and sends it in an email.


var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var creds = require('./credentials.js'); // email username, password, etc stored in separate file

// message while other functions execute
console.log("Waiting for email to send...");

doScrape();

function doScrape(){ // does some date calculations, makes HTTP request and parses data. Then calls sendMail() probably cause I'm a noob

	//variables for use in the http GET and the email subject
	var today = new Date();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var thisMonth = months[today.getMonth()];
	var thisYear = today.getFullYear();

	var url = "https://thepowerpath.com/monthly-forecast/" + thisMonth.toLowerCase() + "-" + thisYear + "-monthly-forecast/";

	request(url, function(error, response, html){
    	if(!error){
        	var $ = cheerio.load(html);

					var htmlArray = [];

					// use Cheerio to find matching string and store:
					// first chunk finds and selects the <p> element that contains the string "DATES AND TIME FRAMES"
					// .nextUntil("hr") extends the selection until it finds the <hr> tag
					// .each iterates thru the selection and adds the HTML of each element to htmlArray
					$('p:contains("DATES AND TIME FRAMES")').nextUntil("hr").each(function(i,elem){
						htmlArray[i] = $(this).html();
					});

					// pass the data to email sending function!
					sendMail(htmlArray.join("<br><br>"), thisMonth, thisYear); // .join with line breaks makes the formatting look right
			};
	});
};

// configures and sends email - references credentials.js file for user auth and host
function sendMail(body, month, year){
	var transporter = nodemailer.createTransport({
		secure: true,
		host: creds.host,
 		auth: {
        	type: creds.type
        	clientId: creds.clientId
        	clientSecret: creds.clientSecret
   		}
	});

	var mailOptions = {
		from: creds.user,
		to: creds.user,
		subject: month + " " + year + ': Dates and Time Frames',
		html: body
		auth: {
	        user: creds.user,
	        refreshToken: creds.refreshToken
	        accessToken: creds.accessToken
	        expires: 1484314697598
		}
	};

// actually send the email
	transporter.sendMail(mailOptions, function(error, info){
			if (error) {
 				console.log(error);
			} else {
   			console.log('Email sent: ' + info.response);
  		};
	});
};



