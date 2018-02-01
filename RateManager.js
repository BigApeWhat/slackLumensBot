module.exports = {
  getRateValue: function(rate, amount, rateMap) {
    if (rate == "" || rate == null) {
      rate = 'USD'
    }
    let value = rateMap[rate.toUpperCase()]
    if (value == null) {
      return 'Invalid currency selected.'
    } else if (amount != null){
      return amount + ' XLM is worth ' + (amount * parseFloat(value)).toFixed(3) + ' ' + rate.toUpperCase()
    } else {
      return 'XLM is worth ' + parseFloat(value).toFixed(3) + ' ' + rate.toUpperCase()
    }
  }
};
