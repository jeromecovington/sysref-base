const BaseCreature = require('../../src/creature/BaseCreature')

const abilities = {
  strength: 10,
  dexterity: 2,
  constitution: 3,
  intelligence: 4,
  wisdom: 5,
  charisma: 6
}
const advantages = ['strength', 'dexterity', 'constitution']
const disadvantages = ['intelligence', 'wisdom']
const baseStats = {
  advantages,
  disadvantages
}
const stats = Object.assign({}, abilities, baseStats)

const Creature = new BaseCreature(stats)

const armor = 'leather'
const weapon = 'dagger'

Creature.setInventory({ armor, weapon })
Creature.setArmorEquipped('leather')
Creature.setWeaponEquipped('dagger')

module.exports = Creature
