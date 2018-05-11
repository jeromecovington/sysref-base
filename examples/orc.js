const { BaseCreature } = require('../')
const { roll } = require('../src/roll/helper')

const abilities = {
  strength: 15,
  dexterity: 5,
  constitution: 10,
  intelligence: 3,
  wisdom: 2,
  charisma: 1
}

const advantages = ['strength']
const disadvantages = ['intelligence', 'wisdom']

const hitPointsRollFunc = () => roll(1,10)

const stats = {
  ...abilities,
  advantages,
  disadvantages,
  hitPointsRollFunc
}

const Orc = new BaseCreature(stats)
Orc.setInventory({ weapon: ['club'], armor: ['leather'] })

exports.default = Orc
