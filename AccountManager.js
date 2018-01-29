module.exports = {
  getSigners: function(account, signers) {
    let signerSize = signers.length

    if (signerSize == 1) {
      var exitText = 'There is 1 signer associated with this account\n'
    } else {
      var exitText = 'There are ' + signers.length + ' signers associated with this account\n'
    }

    signers.forEach(function(entry, i) {
      exitText += (i + 1) + ") " + entry.public_key + '\n'
    });
    return exitText;
  }
};
module.exports = {
  getPayments: function(account, records) {
    let recordSize = records.length

    if (recordSize == 1) {
      var exitText = 'There is only 1 transaction\n'
    } else {
      var exitText = 'These are the lastest ' + records.length + ' transactions\n'
    }

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
