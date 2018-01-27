var express = require('express');
var bodyParser = require('body-parser');
var https = require("https");
var valueManager = require('./ValueManager');
var transactionManager = require('./TransactionManager');
var balanceManager = require('./BalanceManager');

var app = express();
var port = process.env.PORT || 1347;
var hostUrl = 'horizon.stellar.org'
var marketCapUrl = 'api.coinmarketcap.com'
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
              var botPayload = {
                text: transactionManager.getBalance(req.body.text, parsed._embedded.records)
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
              var botPayload = {
                    text : balanceManager.getAccountBalance(req.body.text, parsed)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.get('/value', function (req, res, next) {
  var request = https.get({
          host: marketCapUrl,
          path: `/v1/ticker/`
      }, function(response) {
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              var parsed = JSON.parse(body);
              var value = valueManager.getId(parsed, 'XLM');

              var botPayload = {
                    text : value.price_usd + " usd"
              };
              return res.status(200).json(botPayload);
          });
      });
});
// lumen value
//https://horizon.stellar.org/accounts/GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE/transactions
