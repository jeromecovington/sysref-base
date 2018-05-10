const {
  afterEach,
  beforeEach,
  describe,
  it
} = require('mocha')
const { expect } = require('chai')

const BaseCreature = require('../../src/creature/BaseCreature')

describe('BaseCreature', () => {
  let abilities
  let advantages
  let disadvantages
  let baseStats
  let stats
  let Creature

  beforeEach(() => {
    abilities = {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      intelligence: 4,
      wisdom: 5,
      charisma: 6
    }
    advantages = ['strength']
    disadvantages = ['intelligence', 'wisdom']
    baseStats = {
      advantages,
      disadvantages,
      hitPointsRollFunc: () => 10
    }
    stats = Object.assign({}, abilities, baseStats)

    Creature = new BaseCreature(stats)
  })

  afterEach(() => {
    abilities = null
    advantages = null
    disadvantages = null
    stats = null
    Creature = null
  })

  it('should have all abilities when initialized', () => {
    const abilitiesKeys = Object.keys(abilities)

    abilitiesKeys.forEach((ability) => {
      expect(Creature.getAbility(ability)).to.equal(abilities[ability])
    })
  })

  it('should allow to set ability to absolute value', () => {
    const ability = 'strength'
    const absolute = 10

    Creature.setAbility(ability, { absolute })
    expect(Creature.getAbility(ability)).to.equal(absolute)
  })

  it('should allow to set ability to modified value', () => {
    const ability = 'strength'
    const modifier = 5

    Creature.setAbility(ability, { modifier })
    expect(Creature.getAbility(ability)).to.equal(abilities.strength + modifier)
  })

  it('should allow to get and set proficiency bonus', () => {
    const bonus = 2

    expect(Creature.getProficiencyBonus()).to.equal(0)

    Creature.setProficiencyBonus(bonus)
    expect(Creature.getProficiencyBonus()).to.equal(bonus)
  })

  it('should have all advantages and disadvantages when initialized', () => {
    expect(Creature.getAdvantages()).to.deep.equal(advantages)
    expect(Creature.getDisadvantages()).to.deep.equal(disadvantages)
  })

  it('should allow to set and get advantages & disadvantages', () => {
    Creature.setAdvantages(['dexterity'])
    expect(Creature.getAdvantages()).to.deep.equal(['strength', 'dexterity'])

    Creature.setDisadvantages(['constitution'])
    expect(Creature.getDisadvantages()).to.deep.equal(['intelligence', 'wisdom', 'constitution'])
  })

  it('should allow to set and get inventory', () => {
    const armor = 'leather'
    const weapon = 'dagger'
    const addedWeapon = 'staff'
    const treasure = '100'
    const initialExpected = {
      armor: [armor],
      weapon: [weapon],
      treasure: [treasure]
    }
    const modifiedExpected = {
      armor: [armor],
      weapon: [weapon, addedWeapon],
      treasure: [treasure]
    }

    Creature.setInventory({ armor, weapon, treasure })
    expect(Creature.getInventory()).to.deep.equal(initialExpected)

    Creature.setInventory({ weapon: addedWeapon })
    expect(Creature.getInventory()).to.deep.equal(modifiedExpected)
  })

  it('should allow to equip weapon and armor', () => {
    const armor = 'leather'
    const weapon = 'dagger'

    Creature.setInventory({ armor, weapon })

    Creature.setArmorEquipped(armor)
    expect(Creature.getArmorEquipped()).to.equal(armor)

    Creature.setWeaponEquipped(weapon)
    expect(Creature.getWeaponEquipped()).to.equal(weapon)

    expect(() => { Creature.setArmorEquipped('foo') }).to.throw()
    expect(() => { Creature.setWeaponEquipped('bar') }).to.throw()
  })

  it('should allow to set and get hit points', () => {
    Creature.setHitPoints(5)
    expect(Creature.getHitPoints()).to.equal(15)

    Creature.setHitPoints(2)
    expect(Creature.getHitPoints()).to.equal(27)

    Creature.modifyHitPoints(-4)
    expect(Creature.getHitPoints()).to.equal(23)
  })
})
