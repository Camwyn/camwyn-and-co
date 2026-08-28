const compassData = require('./compass.json');

module.exports = function() {
  return Object.values(compassData.archetypes);
};

