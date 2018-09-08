const {
  afterEach,
  beforeEach,
  describe,
  it
} = require('mocha')
const { expect } = require('chai')

const BaseRoll = require('../../src/roll/BaseRoll')
const BaseCreature = require('../../src/creature/BaseCreature')

const MockCreature = require('./creature.mock')

const weaponMap = require('../exampleItems/weaponMap')
const armorMap = require('../exampleItems/armorMap')

describe('roll base', () => {
  let Roll
  let Creature
  let mockRoll

  beforeEach(() => {
    mockRoll = require('./roll.mock')
    Roll = new BaseRoll({
      rollFunc: mockRoll,
      weaponMap,
      armorMap
    })
    Creature = MockCreature
  })

  afterEach(() => {
    Creature = null
    mockRoll = null
  })

  describe('defaults', () => {
    it('should use defaults when no config params are provided', () => {
      expect(typeof new BaseRoll()).to.equal('object')
    })
  })

  describe('abilityCheck', () => {
    it('should apply advantage and veryEasy difficulty to ability check', () => {
      const result = Roll.abilityCheck(Creature, 'athletics', 'easy')

      expect(result).to.equal(true)
    })

    it('should apply disadvantage and nearlyImpossible difficulty to ability check', () => {
      const result = Roll.abilityCheck(Creature, 'animal-handling', 'nearlyImpossible')

      expect(result).to.equal(false)
    })

    it('should throw when provided invalid skill', () => {
      expect(Roll.abilityCheck.bind(Roll, Creature, 'foo', 'easy')).to.throw(
        'No valid ability derived for foo'
      )
    })
  })

  describe('attackRoll', () => {
    it('should miss with 0 damage', () => {
      const abilities = {
        dexterity: 20
      }

      const TargetCreature = new BaseCreature(abilities)
      const armor = 'platemail'
      const weapon = 'broadsword'

      TargetCreature.setInventory({ armor, weapon })
      TargetCreature.setArmorEquipped('platemail')
      TargetCreature.setWeaponEquipped('broadsword')

      const result = Roll.attackRoll(Creature, TargetCreature)

      expect(result).to.equal(0)
    })

    it('should hit with > 0 damage', () => {
      Creature.setInventory({ weapon: 'broadsword' })
      Creature.setWeaponEquipped('broadsword')

      const abilities = {
        dexterity: 2
      }

      const TargetCreature = new BaseCreature(abilities)
      const armor = 'robes'
      const weapon = 'club'

      TargetCreature.setInventory({ armor, weapon })
      TargetCreature.setArmorEquipped('robes')
      TargetCreature.setWeaponEquipped('club')

      const result = Roll.attackRoll(Creature, TargetCreature)

      expect(result).to.be.above(0)
    })
  })

  describe('savingThrow', () => {
    it('should apply advantage, no bonus and easy difficulty to saving throw', () => {
      const result = Roll.savingThrow(Creature, 'strength', 1, 'easy')

      expect(result).to.equal(true)
    })

    it('should apply disadvantage, no bonus and nearlyImpossible difficulty to saving throw', () => {
      const result = Roll.savingThrow(Creature, 'wisdom', 1, 'nearlyImpossible')

      expect(result).to.equal(false)
    })
  })
})
