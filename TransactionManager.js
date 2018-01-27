module.exports = {
  getBalance: function(account, records) {
    var exitText = ""
    records.forEach(function(entry, i) {
      if (account == entry.source_account) {
        exitText += (i + 1) + ": Account recived "
        + entry.fee_paid + " XLM on " + new Date(entry.created_at).toLocaleDateString('en-US') + "\n"
      } else {
        exitText += (i + 1) + ": Account sent "
        + entry.fee_paid + " XLM on " + new Date(entry.created_at).toLocaleDateString('en-US') + "\n"
      }
    });
    return exitText;
  }
};
