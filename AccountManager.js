module.exports = {
  getSigners: function(account, signers) {
    var exitText = 'There are ' + signers.length + ' signers associated with this account\n'
    signers.forEach(function(entry, i) {
      exitText += (i + 1) + ") " + entry.public_key + '\n'
    });
    return exitText;
  }
};
module.exports = {
  getPayments: function(account, records) {
    var exitText = ''
    records.forEach(function(entry, i) {
      if (entry.asset_type == 'native') {
        var assetType = 'XLM'
      } else {
        var assetType = entry.asset_type
      }

      exitText += 'Transaction ' + (i + 1) + "\n" + 'Sender: ' + entry.from + '\nReceiver: ' + entry.to + '\nAmount: ' + entry.amount + ' ' + assetType + '\nDate: ' + new Date(entry.created_at) + '\nTransation type: ' + entry.type + '\n\n'
    });
    return exitText;
  }
};
