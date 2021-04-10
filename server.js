// server.js
// where your node app starts


/**
 * FreeCodeCamp Timestamp microservice project
 * Receive a string parameter and return with unix and utc date format
 */


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/timestamp/:dateString?", (req, res) => {

  const theDate = req.params.dateString;
  let date;

  if (!theDate) {
    date = new Date();
  } else {
   if (isNaN(theDate)) {
      date = new Date(theDate);
    } else {
     date = new Date(parseInt(theDate)); 
    }
  }
  


  if (!date.getTime()) {
    res.send({
      error: date.toString()
    })
  } else {
    res.send({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
