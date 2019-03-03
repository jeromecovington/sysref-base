const BaseCreature = require('../creature/BaseCreature')

function provider ({
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  advantages,
  disadvantages,
  hitPointsRollFunc,
  hitPointsModifier = 0,
  armor,
  weapon,
  treasure,
  name
}) {
  const creature = new BaseCreature({
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    advantages,
    disadvantages,
    hitPointsRollFunc
  })

  creature.setHitPoints(hitPointsModifier)
  creature.setInventory({ armor, weapon, treasure })
  creature.setArmorEquipped(armor)
  creature.setWeaponEquipped(weapon)
  creature.name = name

  return creature
}

module.exports = {
  provider
}
