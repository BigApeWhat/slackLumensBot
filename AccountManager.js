module.exports = {
  getAccount: function(parsed) {
    return getAccountDetails(parsed) + getBalance(parsed.balances) + getSigners(parsed.signers)
  },
  getPayments: function(records) {
    let recordSize = records.length

    if (recordSize == 1) {
      let exitText = 'There is only 1 transaction\n'
    } else {
      let exitText = 'These are the lastest ' + records.length + ' transactions\n'
    }

    records.forEach(function(entry, i) {
      if (entry.asset_type == 'native') {
        let assetType = 'XLM'
      } else {
        let assetType = entry.asset_type
      }

      exitText += 'Transaction ' + (i + 1) + "\n" + 'Sender: ' + entry.from + '\nReceiver: ' + entry.to + '\nAmount: ' + entry.amount + ' ' + assetType + '\nDate: ' + new Date(entry.created_at) + '\nTransation type: ' + entry.type + '\n\n'
    });
    return exitText;
  }
};

function getAccountDetails(parsed) {
  let accountText = 'Id: ' + parsed.id + '\nPaging token: ' + parsed.paging_token + '\nAccount id: ' + parsed.account_id +
  '\nSequence: ' + parsed.sequence + '\nSubentry count: ' + parsed.subentry_count + '\nLow threshold: ' + parsed.thresholds.low_threshold +
  '\nMedium threshold: ' + parsed.thresholds.med_threshold + '\nHigh threshold: ' + parsed.thresholds.high_threshold + '\nAuth required: ' + parsed.flags.auth_required +
  '\nAuth revocable: ' + parsed.flags.auth_revocable

  return accountText + '\n'
}

function getBalance(balances) {
  let accountText =  'Balances\n'

  balances.forEach(function(entry) {
    const value = parseFloat(entry.balance)
    if (value != 0) {
      if (entry.asset_type == 'native') {
        accountText += value + ' XLM\n'
      } else {
        accountText += value + ' ' + entry.asset_code + '\n'
      }
    }
  });
  return accountText + '\n'
}

function getSigners(signers) {
  let exitText = 'Signers\n'
  signers.forEach(function(entry, i) {
    exitText += '    ' + (i + 1) + ") " + entry.public_key + '\n'
  });
  return exitText + '\n';
}
