const BaseMonster = require('./BaseMonster')
const { roll } = require('../roll/helper')

module.exports = new BaseMonster({
  strength: 8,
  dexterity: 14,
  constitution: 10,
  intelligence: 10,
  wisdom: 8,
  charisma: 8,
  advantages: [],
  disadvantages: [],
  hitPointsRollFunc: () => roll(2, 12),
  hitPointsModifier: 0,
  armor: ['leather', 'shield'],
  weapon: ['shortSword', 'shortBow'],
  xp: 50,
  name: 'Goblin'
})
