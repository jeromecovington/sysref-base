# sysref-base
![Reginald the Rogue](img.png)

## Details

For background context please see the SRD. There is a browsable version of the 5th edition [here](https://www.5thsrd.org/).

### Classes

Exports several classes: `BaseCreature`, `BaseMonster`, and `BaseRoll` for use in implementing System Reference Document-like game mechanics. `BaseCreature` is meant to be extended for all entities implemented in a game, such as monsters and player characters. In fact `BaseMonster` extends `BaseCreature` in this manner. The minimal monsters exported from `src/bestiary` demonstrate this, and any number of monsters may implement `BaseMonster` in userland.

### Utilties

Two utility functions, `roll` and `d20Roll`, are also exported. These are representative of dice rolls useful in game implementations. In addition, basic weapons and armor are exported as `weaponsMap` and `armorMap`, though these may be extended or replaced when instantiating the `BaseRoll`, which encapsulates much game logic.

### Examples

As mentioned, there are several  runnable examples of (very simple) use cases, please see the `examples/` directory.

Run the examples with:
```shell
$ node examples/{example-name}
```

Because the examples are based on algorithms containing elements of chance, running them will give different results over multiple runs.

## Caveat

Character races and classes, while on the roadmap to implement `BaseCharacter`, are currently incomplete. However, `BaseCharacter` and its relevant tests and usage in examples should provide guidelines.
