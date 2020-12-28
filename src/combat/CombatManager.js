module.exports = class CombatManager {
  constructor ({ characters, monsters, roll }) {
    this.characters = characters
    this.monsters = monsters
    this.roll = roll
  }
}
