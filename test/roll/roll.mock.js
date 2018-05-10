let increaseMockRoll = false

export default function mockRoll (modifier = 5) {
  const r = increaseMockRoll ? 10 : 5
  increaseMockRoll = true

  // It is useful to return both the unmodified roll, and the modified roll,
  // for example, when calculating unlucky/lucky hits for attackRoll().
  return [
    r,
    r + modifier
  ]
}
