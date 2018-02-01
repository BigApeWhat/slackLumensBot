const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

const valueManager = require('./ValueManager');
const accountManager = require('./AccountManager');
const rateManager = require('./RateManager');
const assetManager = require('./AssetManager');

const app = express();
const port = process.env.PORT || 1347;
const hostUrl = 'horizon.stellar.org'
const marketCapUrl = 'api.coinmarketcap.com'
const ratesUrl = 'api.fixer.io'

let rateMap = {}

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

function getLumenValue() {
  https.get({
          host: marketCapUrl,
          path: `/v1/ticker/`
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const value = valueManager.getId(parsed, 'XLM');
              rateMap['USD'] = value.price_usd
              getRates();
          });
      });
}
setInterval(getLumenValue, 60000);
getLumenValue();

function getRates() {
  https.get({
          host: ratesUrl,
          path: `/latest?base=USD`
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const xlmUsd = rateMap['USD']

              for(var key in parsed.rates) {
                rateMap[key] = xlmUsd * parsed.rates[key]
              }
          });
      });
}

app.post('/assets', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/assets`
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: assetManager.getAssets(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/payments', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/accounts/${req.body.text}/payments`
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: accountManager.getPayments(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.get('/account', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/accounts/GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE`
          // path: `/accounts/${req.body.text}`
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                    text : accountManager.getAccount(parsed)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/value', function (req, res, next) {
  const rate = req.body.text
  const botPayload = {
        text : rateManager.getRateValue(rate, null, rateMap)
  };
  return res.status(200).json(botPayload);
});

app.post('/value_calculate', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const amount = inputSplit[0]
  const rate = inputSplit[1]

  const botPayload = {
        text : rateManager.getRateValue(rate, amount, rateMap)
  };

  return res.status(200).json(botPayload);
});

app.post('/help', function (req, res, next) {
  const botPayload = {
        text : ''
  };
  return res.status(200).json(botPayload);
});
// finish transations, subscribe to account transactions
// GDG2NE5JOLF5GHTEWLMS2N7SW3LFLAZ7HYY7JMADS33ZGC5UDLXC2WLE
