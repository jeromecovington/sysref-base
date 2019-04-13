const BaseCreature = require('../creature/BaseCreature')
const { getModifier } = require('../roll/helper')

module.exports = class BaseCharacter extends BaseCreature {
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
    armor = [],
    weapon = [],
    treasure = [],
    type,
    level,
    name,
    levelFeatures = []
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

    this.setHitPoints(this.getHitPointsModifier())
    this.type = type
    this.level = level
    this.name = name
    this.levelFeatures = levelFeatures
  }

  getHitPointsModifier () {
    return getModifier(this.getAbility('constitution'))
  }

  applyFeature () {
    const index = this.getLevel() - 1
    if (this.levelFeatures[index]) {
      this.levelFeatures[index](this)
    } else {
      console.log(`${this.getType()} has no features at level ${this.getLevel()}`)
    }
  }

  levelUp () {
    const current = this.getLevel()

    if (current < 20) {
      this.setLevel(current + 1)
    } else {
      console.log(`${this.getType()} ${this.getName()} may not exceed level 20`)
      return
    }

    this.setHitPoints(this.getHitPointsModifier())
    this.applyFeature()
  }

  getProficiencyBonus () {
    return Math.ceil(this.getLevel() / 4) + 1
  }

  getType () {
    return this.type
  }

  getLevel () {
    return this.level
  }

  setLevel (l) {
    this.level = l
  }

  getName () {
    return this.name
  }
}
