const { provider } = require('./helper')
const { roll } = require('../roll/helper')

module.exports = provider({
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
  treasure: [100],
  name: 'Orc'
})
