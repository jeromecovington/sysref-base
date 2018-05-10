import {
  afterEach,
  beforeEach,
  describe,
  it
} from 'mocha'
import { expect } from 'chai'

import BaseRoll from './BaseRoll'
import BaseCreature from '../creature/BaseCreature'

import MockCreature from './creature.mock'

describe('roll base', () => {
  let Roll
  let Creature
  let mockRoll

  beforeEach(() => {
    /* eslint-disable global-require */
    mockRoll = require('./roll.mock').default
    /* eslint-enable */
    Roll = new BaseRoll({ rollFunc: mockRoll })
    Creature = MockCreature
  })

  afterEach(() => {
    Creature = null
    mockRoll = null
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
  })

  describe('attackRoll', () => {
    it('should miss with 0 damage', () => {
      const abilities = {
        dexterity: 20
      }
      const stats = {
        ...abilities
      }

      const TargetCreature = new BaseCreature(stats)
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
      const stats = {
        ...abilities
      }

      const TargetCreature = new BaseCreature(stats)
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
