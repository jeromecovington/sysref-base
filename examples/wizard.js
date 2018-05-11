const { BaseCreature } = require('../')
const { roll } = require('../src/roll/helper')

const abilities = {
  strength: 5,
  dexterity: 7,
  constitution: 6,
  intelligence: 18,
  wisdom: 15,
  charisma: 6
}

const advantages = ['intelligence', 'wisdom']
const disadvantages = ['strength']

const hitPointsRollFunc = () => roll(1,6)

const stats = {
  ...abilities,
  advantages,
  disadvantages,
  hitPointsRollFunc
}

const Wizard = new BaseCreature(stats)
Wizard.setInventory({ weapon: ['staff'], armor: ['robes'] })

exports.default = Wizard
