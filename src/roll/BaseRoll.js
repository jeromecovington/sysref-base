/* eslint-disable max-len */
const {
  d20Roll,
  damageRoll,
  getAdvantageOrDisadvantage,
  getModifier,
  getArmorClass,
  makeSavingThrow,
  applyAdvantageOrDisadvantage
} = require('./helper')

const abilityMapDefault = require('./abilityMap')
const difficultyMapDefault = require('./difficultyMap')

module.exports = class BaseRoll {
  constructor (config = {}) {
    const {
      rollFunc,
      abilityMap,
      difficultyMap,
      weaponMap,
      armorMap
    } = config
    this.rollFunc = rollFunc || d20Roll
    this.abilityMap = abilityMap || abilityMapDefault
    this.difficultyMap = difficultyMap || difficultyMapDefault
    this.weaponMap = weaponMap
    this.armorMap = armorMap
  }

  // https://www.5thsrd.org/rules/abilities/ability_checks/
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

  // https://www.5thsrd.org/combat/making_an_attack/
  // https://www.5thsrd.org/rules/abilities/strength/
  // https://5thsrd.org/rules/abilities/dexterity/
  attackRoll (entity, target) {
    let abilities = []
    const modifiers = []
    const weapon = entity.getWeaponEquipped()

    if (!this.weaponMap[weapon]) {
      throw new Error(`No valid weapon for ${weapon}`)
    }

    abilities = this.weaponMap[weapon].abilities
    abilities.forEach((ability) => {
      modifiers.push(getModifier(entity.getAbility(ability)))
    })

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

  // https://5thsrd.org/combat/order_of_combat/#initiative
  initiative (entities) {
    const withDexterityChecks = entities.reduce((acc, entity) => {
      let check
      const modifier = getModifier(entity.getAbility('dexterity'))
      const advantageOrDisadvantage = getAdvantageOrDisadvantage(entity, 'dexterity')

      if (advantageOrDisadvantage) {
        const roll1 = this.rollFunc(modifier)[1]
        const roll2 = this.rollFunc(modifier)[1]
        check = applyAdvantageOrDisadvantage(roll1, roll2, advantageOrDisadvantage)
      } else {
        check = this.rollFunc(modifier)[1]
      }
      acc.push([entity, check])
      return acc
    }, [])

    withDexterityChecks.sort((a, b) => {
      if (a[1] < b[1]) {
        return -1
      }

      if (a[1] > b[1]) {
        return 1
      }

      while (1) {
        const aTieBreak = d20Roll()
        const bTieBreak = d20Roll()

        if (aTieBreak < bTieBreak) {
          return -1
        }

        if (aTieBreak > bTieBreak) {
          return 1
        }
      }
    })

    return withDexterityChecks.map(tuple => tuple[0])
  }

  // https://www.5thsrd.org/rules/abilities/saving_throws/
  savingThrow (entity, ability, difficulty, bonusOrPenalty = 0) {
    const advantageOrDisadvantage = getAdvantageOrDisadvantage(entity, ability)

    if (advantageOrDisadvantage) {
      const roll1 = makeSavingThrow(entity, ability, bonusOrPenalty, this.rollFunc)
      const roll2 = makeSavingThrow(entity, ability, bonusOrPenalty, this.rollFunc)

      return applyAdvantageOrDisadvantage(roll1, roll2, advantageOrDisadvantage) >= this.difficultyMap[difficulty]
    }

    return makeSavingThrow(entity, ability, bonusOrPenalty, this.rollFunc) >= this.difficultyMap[difficulty]
  }
}

