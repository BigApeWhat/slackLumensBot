module.exports = {
  getAccount: function(parsed) {
    return getAccountDetails(parsed) + getBalance(parsed.balances) + getSigners(parsed.signers) + '~~~~~~~~~~~~~~~~~~~~~~~~~~~'
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
  '\nSequence: ' + parsed.sequence + '\nSubentry count: ' + parsed.subentry_count + '\n\nThreshold\n    Low threshold: ' + parsed.thresholds.low_threshold +
  '\n    Medium threshold: ' + parsed.thresholds.med_threshold + '\n    High threshold: ' + parsed.thresholds.high_threshold + '\n\nFlags\n    Auth required: ' + parsed.flags.auth_required +
  '\n    Auth revocable: ' + parsed.flags.auth_revocable
  return accountText + '\n'
}

function getBalance(balances) {
  let accountText =  '\nBalances\n'

  balances.forEach(function(entry) {
    const value = parseFloat(entry.balance)
    if (value != 0) {
      if (entry.asset_type == 'native') {
        accountText += '    ' + value + ' XLM\n'
      } else {
        accountText += '    ' + value + ' ' + entry.asset_code + '\n'
      }
    }
  });
  return accountText + '\n'
}

function getSigners(signers) {
  let exitText = 'Signers\n'
  signers.forEach(function(entry, i) {
    exitText += '    Public key: ' + entry.public_key + '\n    Weight: ' + entry.weight + '\n    Key: ' + entry.key + '\n    Type: ' + entry.type + '\n\n'
  });
  return exitText;
}
