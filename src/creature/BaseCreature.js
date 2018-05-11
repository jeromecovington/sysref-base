module.exports = class BaseCreature {
  constructor ({
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    advantages,
    disadvantages,
    hitPointsRollFunc
  }) {
    this.strength = strength || 0
    this.dexterity = dexterity || 0
    this.constitution = constitution || 0
    this.intelligence = intelligence || 0
    this.wisdom = wisdom || 0
    this.charisma = charisma || 0
    this.proficiencyBonus = 0
    this.advantages = advantages || []
    this.disadvantages = disadvantages || []
    this.armorEquipped = ''
    this.weaponEquipped = ''
    this.inventory = {
      armor: [],
      weapon: [],
      treasure: []
    }
    this.hitPointsRollFunc = hitPointsRollFunc
    this.hitPoints = 0
    this.specialFlags = []
  }

  setAbility (ability, { absolute, modifier }) {
    if (!absolute && !modifier) {
      throw new Error('Must provide either absolute or modifier to setAbility')
    }

    if (absolute) {
      this[ability] = absolute
    }

    if (modifier) {
      this[ability] += modifier
    }
  }

  getAbility (ability) {
    return this[ability]
  }

  getProficiencyBonus () {
    return this.proficiencyBonus
  }

  setProficiencyBonus (bonus) {
    this.proficiencyBonus = bonus
  }

  getAdvantages () {
    return this.advantages
  }

  setAdvantages (adv) {
    this.advantages = this.advantages.concat(adv)
  }

  getDisadvantages () {
    return this.disadvantages
  }

  setDisadvantages (dis) {
    this.disadvantages = this.disadvantages.concat(dis)
  }

  setArmorEquipped (armor) {
    if (!this.inventory.armor.includes(armor)) {
      throw new Error(`Attempted to set equipped ${armor} not in inventory`)
    }

    this.armorEquipped = armor
  }

  getArmorEquipped () {
    return this.armorEquipped
  }

  setWeaponEquipped (weapon) {
    if (!this.inventory.weapon.includes(weapon)) {
      throw new Error(`Attempted to set equipped ${weapon} not in inventory`)
    }

    this.weaponEquipped = weapon
  }

  getWeaponEquipped () {
    return this.weaponEquipped
  }

  setInventory ({ armor, weapon, treasure }) {
    if (armor) {
      this.inventory.armor.push(armor)
    }

    if (weapon) {
      this.inventory.weapon.push(weapon)
    }

    if (treasure) {
      this.inventory.treasure.push(treasure)
    }
  }

  getInventory () {
    return this.inventory
  }

  setHitPoints (modifier) {
    this.hitPoints = this.hitPoints + this.hitPointsRollFunc() + modifier
  }

  modifyHitPoints (modifier) {
    this.hitPoints = this.hitPoints + modifier
  }

  getHitPoints () {
    return this.hitPoints
  }
}
