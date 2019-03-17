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
  armor = [],
  weapon = [],
  treasure = [],
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

  if (armor) {
    creature.setInventory({ armor })
    creature.setArmorEquipped(armor)
  }

  if (armor.length) {
    armor.forEach(a => {
      creature.setInventory({ armor: a })
    })
    creature.setArmorEquipped(armor[0])
  }

  if (weapon.length) {
    weapon.forEach(w => {
      creature.setInventory({ weapon: w })
    })
    creature.setWeaponEquipped(weapon[0])
  }

  if (treasure.length) {
    treasure.forEach(t => {
      creature.setInventory({ treasure: t })
    })
  }

  creature.name = name

  return creature
}

module.exports = {
  provider
}
