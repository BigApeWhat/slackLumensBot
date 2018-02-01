module.exports = {
  getOffers: function(records) {
    let exitText = '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    records.forEach(function(entry, i) {
      exitText += 'Id: ' + entry.id + '\nPaging token: ' + entry.paging_token + '\n\nSelling\n    Asset type: ' +
      entry.selling.asset_type + '\n    Asset code: ' + entry.selling.asset_code + '\n    Asset issuer: ' +
      entry.selling.asset_issuer + '\n\nBuying\n    Asset type: ' + entry.buying.asset_type + '\n    Asset code: ' +
      entry.buying.asset_code + '\n    Asset issuer: ' + entry.buying.asset_issuer + '\nAmount: ' + entry.amount +
      '\nPrice r\n    n: ' + entry.price_r.n + '\n    d: ' + entry.price_r.d + '\nPrice: ' + entry.price +
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    });
    return exitText
  }
};
