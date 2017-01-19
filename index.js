const express = require('express');
const app = express();
const moment = require('moment');

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/about.html');
});

app.get('/:time', (req, res) => {
  let date;

  // If the date not a number, just parse it with the date class and then pass it to the moment package
  // for later formatting.
  // If it is a number we have to use parseInt so it recognizes the timestamp.
  if (isNaN(req.params.time)) {
    // get the timestamp but divide by 1000 because its in milliseconds.
    res.json({
      unix: Date.parse(req.params.time) / 1000,
      natural: req.params.time
    });
  } else {
    const parsedTime = parseInt(req.params.time, 10);
    res.json({
      unix: parsedTime,
      natural: moment(parsedTime * 1000).format('MMMM D, YYYY') // moment needs milliseconds
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('Timestamp Microservice is running on port:', app.get('port'));
});