// original example code from https://scotch.io/tutorials/scraping-the-web-with-node-js
// modified by Jesse French
//
// This code scrapes the Power Path website, parses to extract the Dates and Time Frames weekly breakdown,
// and sends it to myself in an email.


var express = require('express');
// var fs = require('fs'); // not needed, not writing to filesystem
var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var app     = express();

//some global variables for use in the http GET and the email subject
var today = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var thisMonth = months[today.getMonth()];
var thisYear = today.getFullYear();
var datesAndTimeFrames = "init";


// perform web scrape with Express
app.get('/scrape', function(req, res){

	url = "https://thepowerpath.com/monthly-forecast/" + thisMonth.toLowerCase() + "-" + thisYear + "-monthly-forecast/";
console.log(url);

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        console.log("Cheerio loaded");

//    var title, release, rating;
//    var json = { title : "", release : "", rating : ""};

    $('strong').filter(function(){
    	//stores filtered data into a variable
        var data = $(this);
        console.log(data);
        datesAndTimeFrames = data;
        console.log(datesAndTimeFrames);
//        title = data.children().first().text();
//        release = data.children().last().children().text();

//        json.title = title;
//        json.release = release;
    })

//    $('.star-box-giga-star').filter(function(){
//        var data = $(this);
//        rating = data.text();

//        json.rating = rating;
//    })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

   //  console.log('File successfully written! - Check your project directory for the output.json file');

//})
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

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check console')

    }) ;
})

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;