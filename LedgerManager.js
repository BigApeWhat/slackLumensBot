module.exports = {
  getLedgers: function(records) {
    let exitText = '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    records.forEach(function(entry, i) {
      exitText += getLedger(entry) + '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    });
    return exitText
  },
  getLedger: function(record) {
    let exitText = 'Id: ' + record.id + '\nPaging token: ' + record.paging_token + '\nHash: ' + record.hash +
    '\nSequence: ' + record.sequence + '\nTransaction count: ' + record.transaction_count + '\nOperation count: ' + record.operation_count +
    '\nClosed at: ' + record.closed_at + '\nTotal coins: ' + record.total_coins + '\nFee pool: ' + record.fee_pool +
    '\nBase fee: ' + record.base_fee + '\nBase reserve: ' + record.base_reserve + '\nMax tx set size: ' + record.max_tx_set_size +
    '\nProtocol version: ' + record.protocol_version + '/n'
    return exitText
  }
};
