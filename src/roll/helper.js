/* eslint-disable max-len */
function roll (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - (minimum + 1))) + minimum
}

function d6Roll (modifier = 0) {
  const r = roll(1, 6)

  return [
    r,
    r + modifier
  ]
}

function d20Roll (modifier = 0) {
  const r = roll(1, 20)

  // It is useful to return both the unmodified roll, and the modified roll,
  // for example, when calculating unlucky/lucky hits for attackRoll().
  return [
    r,
    r + modifier
  ]
}

function damageRoll (weapon) {
  const minMax = weapon.minMax

  return roll(minMax[0], minMax[1])
}

function getModifier (abilityScore) {
  return Math.floor((abilityScore - 10) / 2)
}

function getArmorClass (entity, armorMap) {
  const armor = armorMap[entity.getArmorEquipped()]
  if (armor) {
    const armorModifier = armor ? armor.modifier : 0

    // https://5thsrd.org/rules/abilities/dexterity/
    let dexterityModifier = 0
    if (armor.usesDexterity) {
      dexterityModifier = getModifier(entity.getAbility('dexterity'))
    }
    if (armor.maxDexterity) {
      dexterityModifier = Math.min(dexterityModifier, armor.maxDexterity)
    }

    return armorModifier + dexterityModifier
  }

  return getModifier(entity.getAbility('dexterity'))
}

// https://www.5thsrd.org/rules/abilities/saving_throws/
function makeSavingThrow (entity, ability, bonusOrPenalty, rollFunc = d20Roll) {
  return rollFunc(getModifier(entity.getAbility(ability)) + entity.getProficiencyBonus() + bonusOrPenalty)[1]
}

// https://www.5thsrd.org/rules/advantage_and_disadvantage/
function getAdvantageOrDisadvantage (entity, ability) {
  let advantageOrDisadvantage = null

  if (entity.getAdvantages().includes(ability)) {
    advantageOrDisadvantage = 'advantage'
  }

  if (entity.getDisadvantages().includes(ability)) {
    advantageOrDisadvantage = 'disadvantage'
  }

  return advantageOrDisadvantage
}

// https://www.5thsrd.org/rules/advantage_and_disadvantage/
function applyAdvantageOrDisadvantage (roll1, roll2, advantageOrDisadvantage = 'advantage') {
  if (advantageOrDisadvantage === 'advantage') {
    return Math.max(roll1, roll2)
  }

  if (advantageOrDisadvantage === 'disadvantage') {
    return Math.min(roll1, roll2)
  }

  throw new Error(`${advantageOrDisadvantage} is not a valid value for advantageOrDisadvantage`)
}

module.exports = {
  roll,
  d6Roll,
  d20Roll,
  damageRoll,
  getAdvantageOrDisadvantage,
  getModifier,
  getArmorClass,
  makeSavingThrow,
  applyAdvantageOrDisadvantage
}
