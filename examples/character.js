console.log('\n')
console.log('=== character generation example ===')

const {
  d20Roll,
  roll
} = require('../index')
const BaseCharacter = require('../src/character/BaseCharacter')
const promptly = require('promptly')

/**
 * Generate abilities, using `d20Roll`, for the player at the beginning of a
 * hypothetical game implementation (which may be accepted or rejected).
 *
 * @returns {Object} the generated abilities for the player
 */
function generateAbilities () {
  const abilityKeys = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
  ]
  return abilityKeys.reduce((acc, key) => {
    acc[key] = d20Roll()[0]
    return acc
  }, {})
}

/**
 * Allow the player to accept or reject his/her generated character abilities.
 * If they are rejected, a new set of abilities is generated.
 *
 * @returns {Promise<void>}
 */
async function generateCharacter () {
  const smokeTest = process.env.EXAMPLES_SMOKETEST === 'true'
  console.log('Generating character...')
  const abilities = generateAbilities()
  const hitPoints = roll(1, 10)
  console.log(abilities)
  console.log(`Hit Points: ${hitPoints}`)
  const choice = smokeTest || await promptly.prompt('Accept abilities? y/n') === 'y'
  if (choice) {
    const hitPointsRollFunc = () => hitPoints
    const config = {
      ...abilities,
      hitPointsRollFunc
    }
    const type = smokeTest ? 'Fighter' : await promptly.prompt('What is your character\'s type?')
    const name = smokeTest ? 'Foo' : await promptly.prompt('What is your character\'s name?')
    const Character = new BaseCharacter({...config, type, name})
    const moniker = `${Character.getName()} the ${Character.getType()}`
    Character.setHitPoints(0)
    console.log(`${moniker} created!`)
    process.exit()
  } else {
    await generateCharacter()
  }
}

generateCharacter()
