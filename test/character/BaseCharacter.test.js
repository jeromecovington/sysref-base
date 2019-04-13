const {
  afterEach,
  beforeEach,
  describe,
  it
} = require('mocha')
const { expect } = require('chai')

const BaseCharacter = require('../../src/character/BaseCharacter')

describe('BaseCharacter', () => {
  let character

  beforeEach(() => {
    character = new BaseCharacter({
      strength: 10,
      dexterity: 11,
      constitution: 12,
      intelligence: 13,
      wisdom: 14,
      charisma: 15,
      advantages: ['strength', 'intelligence'],
      disadvantages: ['dexterity', 'charisma'],
      hitPointsRollFunc: () => 16,
      armor: ['studdedLeather'],
      weapon: ['trident'],
      treasure: [17],
      type: 'Foo',
      level: 1,
      name: 'Bar Baz',
      levelFeatures: [
        (c) => { c.setInventory({ weapon: 'club' }) },
        (c) => { c.setAbility('strength', { absolute: 100 }) }
      ]
    })

    character.applyFeature()
  })

  afterEach(() => {
    character = null
  })

  it('should set abilities', () => {
    expect(character.getAbility('strength')).to.equal(10)
    expect(character.getAbility('dexterity')).to.equal(11)
    expect(character.getAbility('constitution')).to.equal(12)
    expect(character.getAbility('intelligence')).to.equal(13)
    expect(character.getAbility('wisdom')).to.equal(14)
    expect(character.getAbility('charisma')).to.equal(15)
  })

  it('should set advantages', () => {
    expect(character.getAdvantages()).to.deep.equal(['strength', 'intelligence'])
  })

  it('should set disadvantages', () => {
    expect(character.getDisadvantages()).to.deep.equal(['dexterity', 'charisma'])
  })

  it('should set hitpoints', () => {
    expect(character.getHitPoints()).to.equal(17)
  })

  it('should set armor', () => {
    expect(character.getArmorEquipped()).to.equal('studdedLeather')
  })

  it('should set weapon', () => {
    expect(character.getWeaponEquipped()).to.equal('trident')
  })

  it('should set treasure', () => {
    expect(character.getInventory().treasure).to.deep.equal([17])
  })

  it('should set type', () => {
    expect(character.getType()).to.equal('Foo')
  })

  it('should set level', () => {
    expect(character.getLevel()).to.equal(1)
  })

  it('should set name', () => {
    expect(character.getName()).to.equal('Bar Baz')
  })

  it('should apply features', () => {
    expect(character.getInventory().weapon).to.include('club')
  })

  it('should level up', () => {
    character.levelUp()
    expect(character.getLevel()).to.equal(2)
    expect(character.getHitPoints()).to.equal(34)
    expect(character.getAbility('strength')).to.equal(100)
  })
})
