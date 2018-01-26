var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 1347;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) { res.status(200).send('Hello world!'); });

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/transactions', function (req, res, next) {
  //https://horizon.stellar.org/accounts/GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE/transactions
  var userName = req.body.user_name;
  // var botPayload = {
  //   text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
  // };
  // Loop otherwise..
  var botPayload = {
    text : 'transactionId =  ' + req.body.text
  };
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});
