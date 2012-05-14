exports.actions = function(req, res, ss) {

  return {

    square: function(number) {
      return res(number * number);
    }

  }
}
