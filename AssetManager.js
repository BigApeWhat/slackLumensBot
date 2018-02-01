module.exports = {
  getAssets: function(records) {
    let exitText = 'Assets currently holding\n\n'
    records.forEach(function(entry, i) {
      exitText += (i+1) + ') Asset type: ' + entry.asset_type + '\nAsset code: ' + entry.asset_code + '\nAsset issuer: ' + entry.asset_issuer + '\nPaging token: ' + entry.paging_token + '\nAmount: ' + entry.amount + '\nAccounts: ' + entry.accounts + '\nAuth required: ' + entry.flags.auth_required + '\nAuth revocable: ' + entry.flags.auth_revocable
    });
    return exitText
  }
};
