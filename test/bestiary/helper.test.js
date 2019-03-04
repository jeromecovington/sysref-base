const {
  afterEach,
  beforeEach,
  describe,
  it
} = require('mocha')
const { expect } = require('chai')

const { provider } = require('../../src/bestiary/helper')

describe('bestiary helper', () => {
  let monster

  beforeEach(() => {
    monster = provider({
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      advantages: ['strength', 'intelligence'],
      disadvantages: ['dexterity', 'charisma'],
      hitPointsRollFunc: () => 10,
      hitPointsModifier: 10,
      armor: ['studdedLeather'],
      weapon: ['trident'],
      treasure: [10],
      name: 'foo monster'
    })
  })

  afterEach(() => {
    monster = null
  })

  describe('provider', () => {
    it('should set abilities', () => {
      expect(monster.getAbility('strength')).to.equal(10)
      expect(monster.getAbility('dexterity')).to.equal(10)
      expect(monster.getAbility('constitution')).to.equal(10)
      expect(monster.getAbility('intelligence')).to.equal(10)
      expect(monster.getAbility('wisdom')).to.equal(10)
      expect(monster.getAbility('charisma')).to.equal(10)
    })

    it('should set advantages', () => {
      expect(monster.getAdvantages()).to.deep.equal(['strength', 'intelligence'])
    })

    it('should set disadvantages', () => {
      expect(monster.getDisadvantages()).to.deep.equal(['dexterity', 'charisma'])
    })

    it('should set hitpoints', () => {
      expect(monster.getHitPoints()).to.equal(20)
    })

    it('should set armor', () => {
      expect(monster.getArmorEquipped()).to.equal('studdedLeather')
    })

    it('should set weapon', () => {
      expect(monster.getWeaponEquipped()).to.equal('trident')
    })

    it('should set name', () => {
      expect(monster.name).to.equal('foo monster')
    })
  })
})
