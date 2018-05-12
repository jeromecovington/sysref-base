const { BaseCreature, BaseRoll, roll } = require('../index')

const Roll = new BaseRoll()

const Theif = new BaseCreature({
  strength: 8,
  dexterity: 16,
  constitution: 10,
  intelligence: 12,
  wisdom: 8,
  charisma: 12,
  advantages: ['dexterity'],
  disadvantages: ['strength'],
  hitPointsRollFunc: () => roll(1, 10)
})

console.log('The theif attempts to sneak past the sleeping giant.')
const result = Roll.abilityCheck(Theif, 'stealth', 'medium')
if (result) {
  console.log('The theif enters the giant\'s treasure room undetected.')
} else {
  console.log('The giant awakens, and roars angrily.')
}
