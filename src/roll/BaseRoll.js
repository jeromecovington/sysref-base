/* eslint-disable max-len */
import {
  d20Roll,
  damageRoll,
  getAdvantageOrDisadvantage,
  getModifier,
  getArmorClass,
  makeSavingThrow,
  applyAdvantageOrDisadvantage
} from './helper'

// These are supplied as defaults, but it is expected that each game will
// likely supply their own.
import abilityMapDefault from '../feat/abilityMap'
import difficultyMapDefault from '../feat/difficultyMap'
import weaponMapDefault from '../item/weaponMap'
import armorMapDefault from '../item/armorMap'

export default class BaseRoll {
  constructor ({
    rollFunc,
    abilityMap,
    difficultyMap,
    weaponMap,
    armorMap
  }) {
    this.rollFunc = rollFunc || d20Roll
    this.abilityMap = abilityMap || abilityMapDefault
    this.difficultyMap = difficultyMap || difficultyMapDefault
    this.weaponMap = weaponMap || weaponMapDefault
    this.armorMap = armorMap || armorMapDefault
  }

  abilityCheck (entity, skill, difficulty) {
    let ability = null
    const keys = Object.keys(this.abilityMap)

    keys.forEach((key) => {
      if (this.abilityMap[key].includes(skill)) {
        ability = key
      }
    })

    if (!ability) {
      throw new Error(`No valid ability derived for ${skill}`)
    }

    const modifier = getModifier(entity.getAbility(ability))
    const advantageOrDisadvantage = getAdvantageOrDisadvantage(entity, ability)

    if (advantageOrDisadvantage) {
      const roll1 = this.rollFunc(modifier)[1]
      const roll2 = this.rollFunc(modifier)[1]

      return applyAdvantageOrDisadvantage(roll1, roll2, advantageOrDisadvantage) >= this.difficultyMap[difficulty]
    }

    return this.rollFunc(modifier)[1] >= this.difficultyMap[difficulty]
  }

  attackRoll (entity, target) {
    let abilities = []
    const modifiers = []
    const weapon = entity.getWeaponEquipped()

    if (this.weaponMap[weapon] && this.weaponMap[weapon].abilities) {
      abilities = this.weaponMap[weapon].abilities
    }

    if (!abilities.length) {
      throw new Error(`No valid abilities for ${weapon}`)
    }

    abilities.forEach((ability) => {
      modifiers.push(getModifier(entity.getAbility(ability)))
    })

    if (!modifiers.length) {
      throw new Error(`No valid modifiers for ${abilities}`)
    }

    const maxModifier = Math.max(modifiers)
    const theRoll = this.rollFunc(maxModifier)
    let hit = theRoll[1] >= getArmorClass(target, this.armorMap)

    // If the unmodified roll is 1, then the attacker is considered unlucky,
    // and misses regardless of modifier and target armor class.
    if (theRoll[0] === 1) {
      hit = false
    }

    // If the unmodified roll is 20, then the attacker is considred lucky,
    // and hits regardless of modifier or target armor class.
    if (theRoll[0] === 20) {
      hit = true
    }

    let damage = 0

    if (hit) {
      damage = damageRoll(this.weaponMap[weapon])
    }

    return damage
  }

  savingThrow (entity, ability, bonusOrPenalty = 0, difficulty) {
    const advantageOrDisadvantage = getAdvantageOrDisadvantage(entity, ability)

    if (advantageOrDisadvantage) {
      const roll1 = makeSavingThrow(this.rollFunc, entity, ability, bonusOrPenalty)
      const roll2 = makeSavingThrow(this.rollFunc, entity, ability, bonusOrPenalty)

      return applyAdvantageOrDisadvantage(roll1, roll2, advantageOrDisadvantage) >= this.difficultyMap[difficulty]
    }

    return makeSavingThrow(this.rollFunc, entity, ability, bonusOrPenalty) >= this.difficultyMap[difficulty]
  }
}
