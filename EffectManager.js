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
  return exitText
}
