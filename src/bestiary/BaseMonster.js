const Basethis = require('../creature/BaseCreature')

module.exports = class BaseMonster extends Basethis {
  constructor ({
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
    type,
    xp,
    name
  }) {
    super({
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

    this.setHitPoints(hitPointsModifier)

    if (armor) {
      this.setInventory({ armor })
      this.setArmorEquipped(armor)
    }

    if (armor.length) {
      armor.forEach(a => {
        this.setInventory({ armor: a })
      })
      this.setArmorEquipped(armor[0])
    }

    if (weapon.length) {
      weapon.forEach(w => {
        this.setInventory({ weapon: w })
      })
      this.setWeaponEquipped(weapon[0])
    }

    if (treasure.length) {
      treasure.forEach(t => {
        this.setInventory({ treasure: t })
      })
    }

    this.xp = xp
    this.type = type
    this.name = name
  }

  getType () {
    return this.type
  }

  getXp () {
    return this.xp
  }

  getName () {
    return this.name
  }
}
