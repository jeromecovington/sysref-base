const { BaseCreature, BaseRoll } = require('../index')
const { roll } = require('../src/roll/helper')

const Roll = new BaseRoll()

const Wizard = new BaseCreature({
  strength: 5,
  dexterity: 7,
  constitution: 7,
  intelligence: 15,
  wisdom: 13,
  charisma: 7,
  advantages: ['intelligence', 'wisdom'],
  disadvantages: ['dexterity', 'strength'],
  hitPointsRollFunc: () => roll(1, 6)
})

console.log('The wizard attempts to ward off the witch\'s curse')
const result = Roll.savingThrow(Wizard, 'intelligence', 2, 'hard')
if (result) {
  console.log('The wizard successfully wards off the witch\'s curse.')
} else {
  console.log('The wizard is cursed by the witch\'s evil spell.')
}
