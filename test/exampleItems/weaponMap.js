// @todo include all possible starting inventory weapons for supported character classes.
export default {
  dagger: {
    abilities: ['dexterity', 'strength'],
    classification: ['melee', 'ranged'],
    minMax: [1, 4],
  },
  shortsword: {
    abilities: ['strength'],
    classification: ['melee'],
    minMax: [1, 6],
  },
  longsword: {
    abilities: ['strength'],
    classification: ['melee'],
    minMax: [1, 8],
  },
  broadsword: {
    abilities: ['strength'],
    classification: ['melee'],
    minMax: [2, 12],
  },
  club: {
    abilities: ['strength'],
    classification: ['melee'],
    minMax: [1, 4],
  },
  mace: {
    abilities: ['strength'],
    classification: ['melee'],
    minMax: [1, 6],
  },
  hammer: {
    abilities: ['strength'],
    classification: ['melee', 'ranged'],
    minMax: [1, 4],
  },
  warhammer: {
    abilities: ['strength'],
    classification: ['melee'],
    minMax: [1, 8],
  },
  staff: {
    abilities: ['dexterity', 'strength'],
    classification: ['melee'],
    minMax: [1, 6],
  },
  shortbow: {
    abilities: ['dexterity'],
    classification: ['ranged'],
    minMax: [1, 6],
  },
  longbow: {
    abilities: ['dexterity'],
    classification: ['ranged'],
    minMax: [1, 8],
  },
  crossbow: {
    abilities: ['dexterity', 'strength'],
    classification: ['ranged'],
    minMax: [1, 10],
  },
};
