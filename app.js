var express = require('express');
var bodyParser = require('body-parser');
var https = require("https");

var app = express();
var port = process.env.PORT || 1347;
var hostUrl = 'horizon.stellar.org'

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/transactions', function (req, res, next) {
  var request = https.get({
          host: hostUrl,
          path: `/accounts/${req.body.text}/transactions`
      }, function(response) {
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              var parsed = JSON.parse(body);
              var records = parsed._embedded.records

              var exitText = ""
              records.forEach(function(entry, i) {
                if (req.body.text == entry.source_account) {
                  exitText += (i + 1) + ": Account recived"
                  + entry.fee_paid + " lumens on " + entry.created_at.toUTCString() + "\n"
                } else {
                  exitText += (i + 1) + ": Account sent "
                  + entry.fee_paid + " lumens on " + entry.created_at.toUTCString() + "\n"
                }
              });

              var botPayload = {
                text: exitText
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/account', function (req, res, next) {
  var request = https.get({
          host: hostUrl,
          path: `/accounts/${req.body.text}`
      }, function(response) {
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              var parsed = JSON.parse(body);

              var total = 0
              parsed.balances.forEach(function(entry) {
                total += parseFloat(entry.balance)
              });

              var botPayload = {
                    text : 'Your account balance is ' + total + ' lumens'
              };
              return res.status(200).json(botPayload);
          });
      });
});
//https://horizon.stellar.org/accounts/GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE/transactions
