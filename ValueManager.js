module.exports = {
  getId: function(array, id) {
    return array.find(item => item.symbol === id) || null;
  }
};
