const https = require("https");

const valueManager = require('./ValueManager');

const marketCapUrl = 'api.coinmarketcap.com'
const ratesUrl = 'api.fixer.io'

let rateMap = {};

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

module.exports = rateMap;
