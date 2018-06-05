// original example code from https://scotch.io/tutorials/scraping-the-web-with-node-js
// modified by Jesse French

var creds = require('./credentials.js');
var request = require('request');
var cheerio = require('cheerio');
var mailgun = require('mailgun-js')({apiKey: creds.apiKey, domain: creds.domain});

// message while other functions execute
console.log("Waiting for email to send...");

doScrape();

function doScrape(){ // does some date calculations, makes HTTP request and parses data

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

// configure and send email
function sendMail(body, month, year){
	var data = {
	  from: creds.from,
	  to: creds.to,
	  subject: `${month} ${year}: Dates and Time Frames`,
	  html: body
	};


	mailgun.messages().send(data, function (error, msg) {
  		console.log(msg);
	});
};



