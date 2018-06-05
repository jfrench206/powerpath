# Powerpath
If you want to automate your astrology...this is a simple node.js web scraper that can be invoked from command line. I subscribe to [The Power Path](https://thepowerpath.com/) monthly horoscope, but I got sick of following the link to the website and manually copy-pasting the part I was interested in every month :P

This project was based on a Scotch.io web scraper example so I could start learning Node.js and jQuery.

Features:
* Date calculation to determine the proper URL
* Traverses the DOM to locate the "Dates and Time Frames" section
* Extracts and formats the data & sends via Mailgun

### Prerequisites
* Node.js - [click here for installation instructions](https://nodejs.org/en/download/package-manager/)
* Node package manager (npm)
* An SMTP mail server that you have access to (for sending mail) - see below

### Install
```
git clone https://github.com/jfrench206/powerpath/ && npm install
```

### Run

This project uses Mailgun for sending email, because it's way easier than messing with Gmail security. Sign up for a free account [here](https://mailgun.com), then add folks you want to send email to [here](https://app.mailgun.com/app/account/authorized).

Next, copy your domain details into credentials.js: [follow this link](https://app.mailgun.com/app/domains) and click on your domain name (e.g. sandboxXYZ.mailgun.org). From the screen that follows, copy these values: "Default SMTP Login" goes in credentials.js "from", "API Key" goes in "apiKey", and the domain itself (in bold up top) goes in credentials.js "domain". Check the placeholder text in credentials.js if you get confused.

Phew! Now you should be all set. Run the app using

```
$ node server.js
```

If all goes well, you should get a confirmation like this:
```
{ id: '<timestamp@sandboxXYZ.mailgun.org>',
  message: 'Queued. Thank you.' }
```

Woohoo! Next up is to automate the script each month using a cron job or similar. Stay tuned...

## Authors

* **Jesse French** - *Modification and customization* - [jfrench206](https://github.com/jfrench206)

## Acknowledgments

* Hat tip to [kukicado](https://github.com/kukicado) for the "Scraping the the Web with Node.js" tutorial on Scotch.io, which this project is based on.
* Thanks to [bbugh](https://github.com/bbugh) for coaching and guidance
