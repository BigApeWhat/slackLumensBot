module.exports = {
  getAssets: function(records) {
    let exitText = '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    records.forEach(function(entry, i) {
      exitText += 'Asset type: ' + entry.asset_type + '\nAsset code: ' + entry.asset_code +
      '\nAsset issuer: ' + entry.asset_issuer + '\nPaging token: ' + entry.paging_token + '\nAmount: ' +
      entry.amount + '\nNumber accounts: ' + entry.num_accounts + '\n\nFlags\n    Auth required: ' + entry.flags.auth_required +
      '\n    Auth revocable: ' + entry.flags.auth_revocable + '\n~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n'
    });
    return exitText
  }
};
