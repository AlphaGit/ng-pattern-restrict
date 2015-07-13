module.exports = function(condition, callback) {
  return condition ? callback(it) : callback(xit);
};