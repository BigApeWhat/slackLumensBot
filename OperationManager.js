module.exports = {
  getOperations: function(records) {
    let exitText = '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    records.forEach(function(entry, i) {
      exitText += getOperation(entry) + '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    });
    return exitText
  },
  getOperation: function(record) {
    return getOperation(record)
  }
};

function getOperation(record) {
  return 'Id: ' + record.id + '\nPaging token: ' + record.paging_token + '\nSource account: ' + record.source_account +
  '\nType: ' + record.type + '\nType i: ' + record.type_i + '\nCreated at: ' + new Date(record.created_at) +
  '\nTransaction hash: ' + record.transaction_hash + '\nStarting balance: ' + record.starting_balance +
  '\nFunder: ' + record.funder + '\nAccount: ' + record.account + '\n'
}
