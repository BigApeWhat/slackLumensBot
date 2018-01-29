var express = require('express');
var bodyParser = require('body-parser');
var https = require("https");

var valueManager = require('./ValueManager');
var accountManager = require('./AccountManager');
var balanceManager = require('./BalanceManager');
var rateManager = require('./RateManager');

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

app.post('/payments', function (req, res, next) {
  var request = https.get({
          host: hostUrl,
          path: `/accounts/${req.body.text}/payments`
      }, function(response) {
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              var parsed = JSON.parse(body);
              var botPayload = {
                text: accountManager.getPayments(req.body.text, parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/signers', function (req, res, next) {
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
                text: accountManager.getSigners(req.body.text, parsed.signers)
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
  var botPayload = {
        text : rateManager.getRateValue(rate, null, rateMap)
  };
  return res.status(200).json(botPayload);
});

app.post('/value_calculate', function (req, res, next) {
  var inputSplit = req.body.text.split(' ')
  var amount = inputSplit[0]
  var rate = inputSplit[1]

  var botPayload = {
        text : rateManager.getRateValue(rate, amount, rateMap)
  };

  return res.status(200).json(botPayload);
});

app.post('/help', function (req, res, next) {
  var botPayload = {
        text : ''
  };
  return res.status(200).json(botPayload);
});
// finish transations, subscribe to account transactions
// GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE
