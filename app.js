const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

const valueExecutor = require('./ValueExecutor');

const accountManager = require('./AccountManager');
const rateManager = require('./RateManager');
const assetManager = require('./AssetManager');
const effectManager = require('./EffectManager');
const ledgerManager = require('./LedgerManager');
const offerManager = require('./OfferManager');

const app = express();
const port = process.env.PORT || 1347;
const hostUrl = 'horizon-testnet.stellar.org'

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

// ACCOUNT 1
app.post('/account', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/accounts/${req.body.text}`
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

// ASSETS 1
app.post('/assets', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/assets?limit=` + (req.body.text || 10)
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

// EFFECTS 5
app.post('/effects', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/effects?limit=` + (req.body.text || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: effectManager.getEffects(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/accountEffects', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const account = inputSplit[0]
  const limit = inputSplit[1]

  https.get({
          host: hostUrl,
          path: `/accounts/` + account + `/effects?limit=` + (limit || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: effectManager.getEffects(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/ledgerEffects', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const ledger = inputSplit[0]
  const limit = inputSplit[1]

  https.get({
          host: hostUrl,
          path: `/ledgers/` + ledger + `/effects?limit=` + (limit || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: effectManager.getEffects(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/operationEffects', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const operation = inputSplit[0]
  const limit = inputSplit[1]

  https.get({
          host: hostUrl,
          path: `/operation/` + operation + `/effects?limit=` + (limit || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: effectManager.getEffects(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/transactionEffects', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const transaction = inputSplit[0]
  const limit = inputSplit[1]

  https.get({
          host: hostUrl,
          path: `/transactions/` + transaction + `/effects?limit=` + (limit || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: effectManager.getEffects(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

// LEDGER
app.post('/ledgers', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/ledgers?limit=` + (req.body.text || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: ledgerManager.getLedgers(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});

app.post('/ledger', function (req, res, next) {
  https.get({
          host: hostUrl,
          path: `/ledgers/` + req.body.text
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: ledgerManager.getLedger(parsed)
              };
              return res.status(200).json(botPayload);
          });
      });
});

// OFFERS
app.post('/offers', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const account = inputSplit[0]
  const limit = inputSplit[1]

  https.get({
          host: hostUrl,
          path: `/accounts/` + account + `/offers?limit=` + (limit || 10)
      }, function(response) {
          let body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              const parsed = JSON.parse(body);
              const botPayload = {
                text: offerManager.getOffers(parsed._embedded.records)
              };
              return res.status(200).json(botPayload);
          });
      });
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

app.post('/value', function (req, res, next) {
  const rate = req.body.text
  const botPayload = {
        text : rateManager.getRateValue(rate, null, valueExecutor.rateMap)
  };
  return res.status(200).json(botPayload);
});

app.post('/value_calculate', function (req, res, next) {
  const inputSplit = req.body.text.split(' ')
  const amount = inputSplit[0]
  const rate = inputSplit[1]

  const botPayload = {
        text : rateManager.getRateValue(rate, amount, valueExecutor.rateMap)
  };

  return res.status(200).json(botPayload);
});

app.post('/help', function (req, res, next) {
  const botPayload = {
        text : 'Having some trouble? Ask bigapewhat or your community'
  };
  return res.status(200).json(botPayload);
});
