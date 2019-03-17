const { BaseCreature, BaseRoll, roll } = require('../index')

const weaponMap = require('../src/weapons/map')
const armorMap = require('../src/armor/map')

const Orc = require('../src/bestiary/Orc')

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
Warrior.setInventory({ weapon: 'longSword', armor: 'chainmail' })
Warrior.setWeaponEquipped('longSword')
Warrior.setArmorEquipped('chainmail')

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
