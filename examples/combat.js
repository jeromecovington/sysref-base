const { BaseCreature, BaseRoll } = require('../index')
const { roll } = require('../src/roll/helper')

const weaponMap = require('../test/exampleItems/weaponMap')
const armorMap = require('../test/exampleItems/armorMap')

const Warrior = new BaseCreature({
  strength: 12,
  dexterity: 3,
  constitution: 10,
  intelligence: 8,
  wisdom: 8,
  charisma: 6,
  advantages: ['strength'],
  disadvantages: ['dexterity'],
  hitPointsRollFunc: () => roll(2, 12)
})
Warrior.setHitPoints(0)
Warrior.setInventory({ weapon: 'broadsword', armor: 'chainmail' })
Warrior.setWeaponEquipped('broadsword')
Warrior.setArmorEquipped('chainmail')

const Orc = new BaseCreature({
  strength: 10,
  dexterity: 5,
  constitution: 10,
  intelligence: 3,
  wisdom: 2,
  charisma: 1,
  advantages: ['strength'],
  disadvantages: ['intelligence', 'wisdom'],
  hitPointsRollFunc: () => roll(1, 10)
})
Orc.setHitPoints(0)
Orc.setInventory({ weapon: 'warhammer', armor: 'leather' })
Orc.setWeaponEquipped('warhammer')
Orc.setArmorEquipped('leather')

const Roll = new BaseRoll({
  weaponMap,
  armorMap
})

while (1) {
  const warriorAttack = Roll.attackRoll(Warrior, Orc)
  if (warriorAttack > 0) {
    console.log(`The warrior scored a hit on the orc for ${warriorAttack}.`)
    Orc.modifyHitPoints(-warriorAttack)
    const orcHealth = Orc.getHitPoints()
    console.log(`The orc has ${orcHealth} hit points.`)
    if (orcHealth <= 0) {
      console.log('The orc has perished.')
      break
    }
  }

  const orcAttack = Roll.attackRoll(Orc, Warrior)
  if (orcAttack > 0) {
    console.log(`The orc scored a hit on the warrior for ${orcAttack}.`)
    Warrior.modifyHitPoints(-orcAttack)
    const warriorHealth = Warrior.getHitPoints()
    console.log(`The warrior has ${warriorHealth} hit points.`)
    if (warriorHealth <= 0) {
      console.log('The warrior has perished.')
      break
    }
  }
}
