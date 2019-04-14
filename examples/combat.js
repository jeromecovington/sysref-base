console.log('\n')
console.log('=== combat example ===')

const { BaseRoll, roll } = require('../index')
const BaseCharacter = require('../src/character/BaseCharacter')

const weaponMap = require('../src/weapons/map')
const armorMap = require('../src/armor/map')

const Orc = require('../src/bestiary/Orc')
const orcType = Orc.getType()

const Fighter = new BaseCharacter({
  strength: 12,
  dexterity: 3,
  constitution: 10,
  intelligence: 8,
  wisdom: 8,
  charisma: 6,
  advantages: ['strength'],
  disadvantages: ['dexterity'],
  hitPointsRollFunc: () => roll(2, 12),
  type: 'Fighter',
  level: 10,
  name: 'Francis'
})
Fighter.setHitPoints(0)
Fighter.setInventory({ weapon: 'longSword', armor: 'chainmail' })
Fighter.setWeaponEquipped('longSword')
Fighter.setArmorEquipped('chainmail')
const moniker = `${Fighter.getName()} the ${Fighter.getType()}`

const Roll = new BaseRoll({
  weaponMap,
  armorMap
})

while (1) {
  const fighterAttack = Roll.attackRoll(Fighter, Orc)
  if (fighterAttack > 0) {
    console.log(`${moniker} scored a hit on the ${orcType} for ${fighterAttack}.`)
    Orc.modifyHitPoints(-fighterAttack)
    const orcHealth = Orc.getHitPoints()
    console.log(`The ${orcType} has ${orcHealth} hit points.`)
    if (orcHealth <= 0) {
      console.log(`The ${orcType} has perished.`)
      break
    }
  }

  const orcAttack = Roll.attackRoll(Orc, Fighter)
  if (orcAttack > 0) {
    console.log(`The ${orcType} scored a hit on ${moniker} for ${orcAttack}.`)
    Fighter.modifyHitPoints(-orcAttack)
    const fighterHealth = Fighter.getHitPoints()
    console.log(`${moniker} has ${fighterHealth} hit points.`)
    if (fighterHealth <= 0) {
      console.log(`${moniker} fighter has perished.`)
      break
    }
  }
}
