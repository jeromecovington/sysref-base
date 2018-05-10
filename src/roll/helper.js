/* eslint-disable max-len */
function roll (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - (minimum + 1))) + minimum
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

function getModifier (abilityScore) {
  return Math.floor((abilityScore - 10) / 2)
}

function getArmorClass (entity, armorMap) {
  const armor = armorMap[entity.getArmorEquipped()]
  const armorModifier = armor ? armor.modifier : 0
  const dexterityModifier = getModifier(entity.getAbility('dexterity')) || 0

  return armorModifier + dexterityModifier
}

function makeSavingThrow (rollFunc = d20Roll, entity, ability, bonusOrPenalty) {
  return rollFunc(getModifier(entity.getAbility(ability)) + entity.getProficiencyBonus() + bonusOrPenalty)[1]
}

function applyAdvantageOrDisadvantage (roll1, roll2, advantageOrDisadvantage = 'advantage') {
  if (advantageOrDisadvantage === 'advantage') {
    return Math.max(roll1, roll2)
  }

  if (advantageOrDisadvantage === 'disadvantage') {
    return Math.min(roll1, roll2)
  }

  throw new Error(`${advantageOrDisadvantage} is not a valid value for advantageOrDisadvantage`)
}

exports = {
  roll,
  d20Roll,
  damageRoll,
  getAdvantageOrDisadvantage,
  getModifier,
  getArmorClass,
  makeSavingThrow,
  applyAdvantageOrDisadvantage
}
