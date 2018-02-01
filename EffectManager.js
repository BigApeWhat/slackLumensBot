module.exports = {
  getEffects: function(records) {
    let exitText = '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    records.forEach(function(entry, i) {
      exitText += getEffect(entry) + '~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
    });
    return exitText
  }
};

function getEffect(record) {
  let exitText = 'Id: ' + record.id + '\nPaging token: ' + record.paging_token + '\nAccount: ' + record.account +
  '\nType: ' + record.type + '\nType i: ' + record.type_i + '\n'

  if (record.starting_balance != null) {
    exitText += 'Starting balance: ' + record.starting_balance + '\n'
  }
  if (record.asset_type != null) {
    exitText += 'Asset type: ' + record.asset_type + '\n'
  }
  if (record.amount != null) {
    exitText += 'Amount: ' + record.amount + '\n'
  }
  if (record.weight != null) {
    exitText += 'Weight: ' + record.weight + '\n'
  }
  if (record.public_key != null) {
    exitText += 'Public Key: ' + record.public_key + '\n'
  }
  if (record.key != null) {
    exitText += 'Key: ' + record.key + '\n'
  }
  if (record.key != null) {
    exitText += 'Key: ' + record.key + '\n'
  }
  return exitText
}
