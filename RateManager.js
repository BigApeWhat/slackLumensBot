module.exports = {
  getRateValue: function(rate, amount, rateMap) {
    if (rate == "" || rate == null) {
      rate = 'USD'
    }
    var value = rateMap[rate.toUpperCase()]
    if (value == null) {
      return 'Invalid currency selected.'
    } else if (amount != null){
      return amount * parseFloat(value).toFixed(2) + ' ' + rate.toUpperCase()
    } else {
      return parseFloat(value).toFixed(2) + ' ' + rate.toUpperCase()
    }
  }
};
