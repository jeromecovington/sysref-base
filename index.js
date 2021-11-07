module.exports = {
  BaseCreature: require('./src/creature/BaseCreature'),
  BaseMonster: require('./src/bestiary/BaseMonster'),
  BaseRoll: require('./src/roll/BaseRoll'),
  roll: require('./src/roll/helper').roll,
  d6Roll: require('./src/roll/helper').d6Roll,
  d20Roll: require('./src/roll/helper').d20Roll,
  weaponsMap: require('./src/weapons/map'),
  armorMap: require('./src/armor/map'),
  bestiary: require('./src/bestiary')
}
