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

const weaponMap = require('../../src/weapons/map')
const armorMap = require('../../src/armor/map')

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

    it('should apply neither advantage nor disadvantage', () => {
      const result = Roll.abilityCheck(Creature, 'performance', 'medium')

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
      const weapon = 'longSword'

      TargetCreature.setInventory({ armor, weapon })
      TargetCreature.setArmorEquipped('platemail')
      TargetCreature.setWeaponEquipped('longSword')

      const result = Roll.attackRoll(Creature, TargetCreature)

      expect(result).to.equal(0)
    })

    it('should hit with > 0 damage', () => {
      Creature.setInventory({ weapon: 'longSword' })
      Creature.setWeaponEquipped('longSword')

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

    it('should throw with invalid weapon', () => {
      Creature.setInventory({ weapon: 'foo' })
      Creature.setWeaponEquipped('foo')

      const TargetCreature = new BaseCreature({})

      expect(Roll.attackRoll.bind(Roll, Creature, TargetCreature)).to.throw(
        'No valid weapon for foo'
      )
    })

    it('should handle unlucky roll', () => {
      const UnluckyRoll = new BaseRoll({
        rollFunc: () => [1, 20],
        weaponMap,
        armorMap
      })

      Creature.setInventory({ weapon: 'longSword' })
      Creature.setWeaponEquipped('longSword')

      const abilities = {
        dexterity: 2
      }

      const TargetCreature = new BaseCreature(abilities)
      const armor = 'robes'
      const weapon = 'club'

      TargetCreature.setInventory({ armor, weapon })
      TargetCreature.setArmorEquipped('robes')
      TargetCreature.setWeaponEquipped('club')

      const result = UnluckyRoll.attackRoll(Creature, TargetCreature)

      expect(result).to.equal(0)
    })

    it('should handle lucky roll', () => {
      const LuckyRoll = new BaseRoll({
        rollFunc: () => [20, 1],
        weaponMap,
        armorMap
      })

      Creature.setInventory({ weapon: 'longSword' })
      Creature.setWeaponEquipped('longSword')

      const abilities = {
        dexterity: 2
      }

      const TargetCreature = new BaseCreature(abilities)
      const armor = 'platemail'
      const weapon = 'longSword'

      TargetCreature.setInventory({ armor, weapon })
      TargetCreature.setArmorEquipped('platemail')
      TargetCreature.setWeaponEquipped('longSword')

      const result = LuckyRoll.attackRoll(Creature, TargetCreature)

      expect(result).to.be.above(0)
    })
  })

  describe('savingThrow', () => {
    it('should apply advantage, no bonus and easy difficulty to saving throw', () => {
      const result = Roll.savingThrow(Creature, 'strength', 'easy', 1)

      expect(result).to.equal(true)
    })

    it('should apply disadvantage, no bonus and nearlyImpossible difficulty to saving throw', () => {
      const result = Roll.savingThrow(Creature, 'wisdom', 'nearlyImpossible', 1)

      expect(result).to.equal(false)
    })

    it('should apply neither advantage nor disadvantage, no bonus or penalty and nearlyImpossible difficulty to saving throw', () => {
      const result = Roll.savingThrow(Creature, 'charisma', 'nearlyImpossible')

      expect(result).to.equal(false)
    })
  })
})
