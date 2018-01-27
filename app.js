var express = require('express');
var bodyParser = require('body-parser');
var https = require("https");

var app = express();
var port = process.env.PORT || 1347;
var hostUrl = 'horizon.stellar.org'
// var hostUrl ='horizon-testnet.stellar.org'

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
                  exitText += (i + 1) + ": Account recived "
                  + entry.fee_paid + " lumens on " + new Date(entry.created_at).toLocaleDateString('en-US') + "\n"
                } else {
                  exitText += (i + 1) + ": Account sent "
                  + entry.fee_paid + " lumens on " + new Date(entry.created_at).toLocaleDateString('en-US') + "\n"
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

              var accountText = 'This account holds\n'
              parsed.balances.forEach(function(entry) {
                if (entry.asset_type == 'native') {
                  accountText += parseFloat(entry.balance) + ' lumen\n'
                } else {
                  accountText += parseFloat(entry.balance) + entry.asset_code
                }
              });

              var botPayload = {
                    text : accountText
              };
              return res.status(200).json(botPayload);
          });
      });
});
// lumen value
//https://horizon.stellar.org/accounts/GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE/transactions
