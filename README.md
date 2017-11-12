# Powerpath
If you want to automate your astrology...this is a simple node.js web scraper that can be invoked from command line to get monthly horoscope data from The Power Path. 

I based it on a Scotch.io web scraper example so I could learn node.js (and jQuery!)

It uses Cheerio (basically jQuery) to find the "Dates and Time Frames" section on the Power Path site, extracts and formats the data and sends it via email.

### Prerequisites
* Node.js - [click here for installation instructions](https://nodejs.org/en/download/package-manager/)
* Node package manager (npm)
* An SMTP mail server that you have access to (for sending mail)

### Installing
From your local directory where you want to install, run:

```
$ git clone https://github.com/jfrench206/powerpath/ && npm install
```

Npm should automatically install dependencies, based on the included package.json file.

### Running

Before running, you need to edit the credentials.js file to include an SMTP host, the login and password for that host, and the from / to email addresses to use for sending the email. 

Once that's done, run
```
$ node server.js
```

If all goes well, you should get a confirmation like this:
```
Email sent: 250 2.6.0 <string@exampleemail.com> [data about SMTP server] 8262 bytes in 0.471, 17.123 KB/sec Queued mail for delivery
```

Finally, edit your crontab file to make this run automagically at the beginning of each month!
```
$ sudo vi /./etc/crontab

# Add the below line just before the last hashtag of the file - sets it to run at 11:52am on the 2nd of every month:
52 11   2 * *   [your username] cd ~/powerpath/ && node server.js
```

Note: I have yet to test the cron job for proper function - we'll see on Dec 2nd!

## Authors

* **Jesse French** - *Modification and customization* - [jfrench206](https://github.com/jfrench206)

## Acknowledgments

* Hat tip to [kukicado](https://github.com/kukicado) for the "Scraping the the Web with Node.js" tutorial on Scotch.io, which this project is based on.
* Thanks to [bbugh](https://github.com/bbugh) for his coaching and guidance
