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
var ratesUrl = 'api.fixer.io'

var rateMap = new Object();
// var hostUrl ='horizon-testnet.stellar.org'
// /latest?base=USD

function getLumenValue() {
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
              rateMap['USD'] = value.price_usd
              getRates();
          });
      });
}
setInterval(getLumenValue, 5000);

function getRates() {
  var request = https.get({
          host: ratesUrl,
          path: `/latest?base=USD`
      }, function(response) {
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              var parsed = JSON.parse(body);
              var xlmUsd = rateMap['USD']

              for(var key in parsed.rates) {
                rateMap[key] = xlmUsd * parsed.rates[key]
              }
          });
      });
}

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log('Listening on port ' + port);
  getLumenValue();
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

app.post('/value', function (req, res, next) {
  var rate = req.body.text
  if (rate == "" || rate == null) {
    rate = 'USD'
  }
  var value = rateMap[rate.toUpperCase()]
  if (value == null) {
    var displayRate = 'Invalid currency selected.'
  } else {
    var displayRate = parseFloat(value).toFixed(2); + ' ' + rate.toUpperCase()
  }

  var botPayload = {
        text : displayRate
  };

  return res.status(200).json(botPayload);
});
// x amount of lumen value
//https://horizon.stellar.org/accounts/GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE/transactions
