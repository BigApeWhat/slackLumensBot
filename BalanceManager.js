module.exports = {
  getAccountBalance: function(account, parsed) {
    var accountText = account + '\nThis Account holds\n'

    parsed.balances.forEach(function(entry) {
      var value = parseFloat(entry.balance)
      if (value != 0) {
        if (entry.asset_type == 'native') {
          accountText += value + ' XLM\n'
        } else {
          accountText += value + ' ' + entry.asset_code + '\n'
        }
      }
    });
    return accountText
  }
};
