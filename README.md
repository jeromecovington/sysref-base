# sysref-base
![Reginald the Rogue](img.png)

Exports two classes, `BaseRoll` and `BaseCreature`, for use in implementing System Reference Document-like game mechanics.

Two utility functions, `roll` and `d20Roll`, are also exported. These may be useful for example when setting a creature's initial hitpoints or when levelling up, et cetera.

Character races and classes, as well as specific creature stats, are not considered to be part of the base mechanics, and are left as implementation details in userland. Other details such as weapons, armors, and treasures are likewise considered to be specific to a given game implementation.

For background context please see the SRD. There is a browsable version of the 5th edition [here](https://www.5thsrd.org/).

For runnable examples of (very simple) use cases, please see the `examples/` directory.

## examples

Run the examples with:
```shell
$ node examples/<example-name>
```

Because the examples are based on algorithms containing elements of chance, running them will give different results over multiple runs.
