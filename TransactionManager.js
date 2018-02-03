module.exports = {
  getTransactions: function(records) {
    let exitText = '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    records.forEach(function(entry, i) {
      exitText += getOperation(entry) + '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    });
    return exitText
  },
  getTransaction: function(record) {
    return getOperation(record)
  }
};

function getTransaction(record) {
  let exitText = 'Id: ' + record.id + '\nPaging token: ' + record.paging_token + '\nHash: ' + record.hash +
  '\nLedger: ' + record.ledger + '\nCreated at: ' + new Date(record.created_at) + '\nSource account: ' + record.source_account +
  '\nSource account sequence: ' + record.source_account_sequence + '\nFee paid: ' + record.fee_paid +
  '\nOperation count: ' + record.operation_count + '\nEnveloper XDR: ' + record.envelope_xdr + + '\nResult XDR: ' + record.result_xdr +
  '\nResult meta XDR: ' + record.result_meta_xdr + '\nFee meta XDR: ' + record.fee_meta_xdr + '\nMemo type: ' + record.memo_type + '\n'

  record.signatures.forEach(function(entry, i) {
    exitText += '    ' + entry + '\n'
  });

  return exitText
}
