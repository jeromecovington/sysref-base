console.log('\n')
console.log('=== saving throw example ===')

const { BaseRoll, roll } = require('../index')
const BaseCharacter = require('../src/character/BaseCharacter')

const Roll = new BaseRoll()

const Wizard = new BaseCharacter({
  strength: 5,
  dexterity: 7,
  constitution: 7,
  intelligence: 15,
  wisdom: 13,
  charisma: 7,
  advantages: ['intelligence', 'wisdom'],
  disadvantages: ['dexterity', 'strength'],
  hitPointsRollFunc: () => roll(1, 6),
  type: 'Wizard',
  level: 10,
  name: 'Willard'
})

const moniker = `${Wizard.getName()} the ${Wizard.getType()}`

console.log(`${moniker} attempts to ward off the witch's curse`)
const result = Roll.savingThrow(Wizard, 'intelligence', 2, 'hard')
if (result) {
  console.log(`${moniker} successfully wards off the witch's curse.`)
} else {
  console.log(`${moniker} is cursed by the witch's evil spell.`)
}
