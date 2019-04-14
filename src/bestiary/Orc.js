const BaseMonster = require('./BaseMonster')
const { roll } = require('../roll/helper')

module.exports = new BaseMonster({
  strength: 16,
  dexterity: 12,
  constitution: 16,
  intelligence: 7,
  wisdom: 11,
  charisma: 10,
  advantages: [],
  disadvantages: [],
  hitPointsRollFunc: () => roll(2, 16),
  hitPointsModifier: 6,
  armor: ['hide'],
  weapon: ['greatAxe', 'javelin'],
  type: 'Orc',
  xp: 100
})
