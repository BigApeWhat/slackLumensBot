module.exports = {
  getPublicKey: function(account, signers) {
    var exitText = 'There are ' + signers.length + ' signers associated with this account'
    signers.forEach(function(entry, i) {
      exitText += (i + 1) + ": " + entry.public_key
    });
    return exitText;
  }
};
