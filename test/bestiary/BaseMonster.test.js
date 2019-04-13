const {
  afterEach,
  beforeEach,
  describe,
  it
} = require('mocha')
const { expect } = require('chai')

const BaseMonster = require('../../src/bestiary/BaseMonster')

describe('BaseMonster', () => {
  let monster

  beforeEach(() => {
    monster = new BaseMonster({
      strength: 10,
      dexterity: 11,
      constitution: 12,
      intelligence: 13,
      wisdom: 14,
      charisma: 15,
      advantages: ['strength', 'intelligence'],
      disadvantages: ['dexterity', 'charisma'],
      hitPointsRollFunc: () => 16,
      hitPointsModifier: 17,
      armor: ['studdedLeather'],
      weapon: ['trident'],
      treasure: [18],
      type: 'Foo',
      xp: 19,
      name: 'Bar Baz'
    })
  })

  afterEach(() => {
    monster = null
  })

  it('should set abilities', () => {
    expect(monster.getAbility('strength')).to.equal(10)
    expect(monster.getAbility('dexterity')).to.equal(11)
    expect(monster.getAbility('constitution')).to.equal(12)
    expect(monster.getAbility('intelligence')).to.equal(13)
    expect(monster.getAbility('wisdom')).to.equal(14)
    expect(monster.getAbility('charisma')).to.equal(15)
  })

  it('should set advantages', () => {
    expect(monster.getAdvantages()).to.deep.equal(['strength', 'intelligence'])
  })

  it('should set disadvantages', () => {
    expect(monster.getDisadvantages()).to.deep.equal(['dexterity', 'charisma'])
  })

  it('should set hitpoints', () => {
    expect(monster.getHitPoints()).to.equal(33)
  })

  it('should set armor', () => {
    expect(monster.getArmorEquipped()).to.equal('studdedLeather')
  })

  it('should set weapon', () => {
    expect(monster.getWeaponEquipped()).to.equal('trident')
  })

  it('should set treasure', () => {
    expect(monster.getInventory().treasure).to.deep.equal([18])
  })

  it('should set type', () => {
    expect(monster.getType()).to.equal('Foo')
  })

  it('should set xp', () => {
    expect(monster.getXp()).to.equal(19)
  })

  it('should set name', () => {
    expect(monster.getName()).to.equal('Bar Baz')
  })
})
