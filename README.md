# Powerpath

For all you lazy astrology nerds...this is a simple node.js web scraper that can be invoked from command line to get monthly horoscope data from The Power Path. 

I based it on a Scotch.io web scraper example so I could learn node.js (and jQuery!)

It uses Cheerio (basically jQuery) to find the "Dates and Time Frames" section on the Power Path site, formats the data and sends it via email.

### Prerequisites

Node.js - see here for installation instructions: https://nodejs.org/en/download/package-manager/

Node package manager (npm)

An SMTP mail server that you have access to for sending mail

### Installing

Follow the link above to install node.js, if you haven't already. Then navigate to a local directory where you want to install, and run:

```
git clone https://github.com/jfrench206/powerpath/
npm install
```

Npm should find the package.json file and automatically install dependencies.

### Running

Before running, you need to edit the credentials.js file to include an SMTP host, the login and password for that host, and the from / to email addresses to use for sending the email.

Once that's done, run
```
node server.js
```

If all goes well, you should get a confirmation like
```
Email sent: 250 2.6.0 <string@exampleemail.com> [data about SMTP server] 8262 bytes in 0.471, 17.123 KB/sec Queued mail for delivery
```

If not...time for debugging!


## Authors

* **Jesse French** - *Modification and customization* - [jfrench206](https://github.com/jfrench206)

## Acknowledgments

* Hat tip to [kukicado](https://github.com/kukicado) for the "Scraping the the Web with Node.js" tutorial on Scotch.io, which this project is based on.
* Thanks to [bbugh](https://github.com/bbugh) for his coaching and guidance
