const { BaseRoll, roll } = require('../index')
const BaseCharacter = require('../src/character/BaseCharacter')

const Roll = new BaseRoll()

const Rogue = new BaseCharacter({
  strength: 8,
  dexterity: 16,
  constitution: 10,
  intelligence: 12,
  wisdom: 8,
  charisma: 12,
  advantages: ['dexterity'],
  disadvantages: ['strength'],
  hitPointsRollFunc: () => roll(1, 10),
  type: 'Rogue',
  level: 10,
  name: 'Randolf'
})

const moniker = `${Rogue.getName()} the ${Rogue.getType()}`

console.log(`${moniker} attempts to sneak past the sleeping giant.`)
const result = Roll.abilityCheck(Rogue, 'stealth', 'medium')
if (result) {
  console.log(`${moniker} enters the giant's treasure room undetected.`)
} else {
  console.log('The giant awakens, and roars angrily.')
}
