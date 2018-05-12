module.exports = {
  BaseCreature: require('./src/creature/BaseCreature'),
  BaseRoll: require('./src/roll/BaseRoll'),
  roll: require('./src/roll/helper').roll,
  d20Roll: require('./src/roll/helper').d20Roll
}
