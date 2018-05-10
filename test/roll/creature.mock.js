import BaseCreature from '../creature/BaseCreature'

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
const stats = {
  ...abilities,
  advantages,
  disadvantages
}

const Creature = new BaseCreature(stats)

const armor = 'leather'
const weapon = 'dagger'

Creature.setInventory({ armor, weapon })
Creature.setArmorEquipped('leather')
Creature.setWeaponEquipped('dagger')

export default Creature
