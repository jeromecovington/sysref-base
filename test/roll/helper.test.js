const {
  afterEach,
  beforeEach,
  describe,
  it
} = require('mocha')
const { expect } = require('chai')

const MockCreature = require('./creature.mock')

const {
  roll,
  d20Roll,
  damageRoll,
  getAdvantageOrDisadvantage,
  getModifier,
  getArmorClass,
  makeSavingThrow,
  applyAdvantageOrDisadvantage
} = require('../../src/roll/helper')

const armorMap = require('../exampleItems/armorMap')
const weaponMap = require('../exampleItems/weaponMap')

describe('roll helper', () => {
  let mockRoll
  let Creature

  beforeEach(() => {
    mockRoll = require('./roll.mock')
    Creature = MockCreature
  })

  afterEach(() => {
    mockRoll = null
    Creature = null
  })

  describe('roll', () => {
    it('should return a number within minimum and maximum', () => {
      const minimum = 1
      const maximum = 6
      const result = roll(minimum, maximum)

      expect(result).to.be.a('number')
      expect(result).to.be.within(minimum, maximum)
    })
  })

  describe('d20Roll', () => {
    it('should return an array of equal members within a range of 1 to 20, when not provided a modifier', () => {
      const result = d20Roll()

      expect(result).to.be.an('array')
      expect(result[0]).to.be.within(1, 20)
      expect(result[1]).to.be.within(1, 20)
      expect(result[1]).to.equal(result[0])
    })

    it('should return an array of numbers, the first without the modifier applied, the second with', () => {
      const modifier = 5
      const result = d20Roll(modifier)

      expect(result).to.be.an('array')
      expect(result[0]).to.be.within(1, 20)
      expect(result[1]).to.equal(result[0] + modifier)
    })
  })

  describe('damageRoll', () => {
    it('should return a number within the minimum and maximum range of the provided weapon', () => {
      const weapon = weaponMap.dagger
      const result = damageRoll(weapon)

      expect(result).to.be.a('number')
      expect(result).to.be.within(weapon.minMax[0], weapon.minMax[1])
    })
  })

  describe('getAdvantageOrDisadvantage', () => {
    it('should return null if no advantage or disadvantage', () => {
      const ability = 'charisma'
      const result = getAdvantageOrDisadvantage(Creature, ability)

      expect(result).to.equal(null)
    })

    it('should return advantage', () => {
      const ability = 'strength'
      const result = getAdvantageOrDisadvantage(Creature, ability)

      expect(result).to.equal('advantage')
    })

    it('should return disadvantage', () => {
      const ability = 'intelligence'
      const result = getAdvantageOrDisadvantage(Creature, ability)

      expect(result).to.equal('disadvantage')
    })
  })

  describe('getModifier', () => {
    it('should return expected modifier', () => {
      const ability = 'intelligence'
      const result = getModifier(Creature.getAbility(ability))

      expect(result).to.equal(-3)
    })
  })

  describe('getArmorClass', () => {
    it('should return expected armor class', () => {
      const result = getArmorClass(Creature, armorMap)

      expect(result).to.equal(-2)
    })
  })

  describe('applyAdvantageOrDisadvantage', () => {
    const roll1 = 5
    const roll2 = 10

    it('should apply advantage', () => {
      const result = applyAdvantageOrDisadvantage(roll1, roll2, 'advantage')

      expect(result).to.equal(10)
    })

    it('should apply disadvantage', () => {
      const result = applyAdvantageOrDisadvantage(roll1, roll2, 'disadvantage')

      expect(result).to.equal(5)
    })
  })

  describe('makeSavingThrow', () => {
    it('should make the saving throw', () => {
      const result = makeSavingThrow(mockRoll, Creature, 'strength', 1)
      expect(result).to.equal(11)

      const d20Range = makeSavingThrow(undefined, Creature, 'strength', 0)
      expect(d20Range).to.be.within(1, 20)
    })
  })
})
