module.exports = {
  getId: function(array, id) {
      for (var i = 0, len = array.length; i < len; i++) {
          if (array[i].symbol === id) {
              return array[i];
          }
      }
      return null;
  }
};
