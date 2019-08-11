# Race

The different races existing in Pathfinder

## Parameters

+ icon (``String``): Path to the icon that represents the race
+ name (``String``): Name of the race
+ mod (``Dict String:int``): Extra modifiers that are applied to the characteristics depending on the class
+ traits (``Array of String``): Array of the different traits of the race
+ extra (``Dict``): Dictionary with extra info the race has (To Be Defined)

## Example

```JavaScript
{
    icon: 'img/elf.png',
    name: 'Elf',
    mod: {
        'Dexterity': 2,
        'Intelligence': 2,
        'Constitution': -2,
    },
    traits: [
        'Low-Light Vision',
        'Elven Immunities',
        'Elven Magic',
    ],
    extra: {}
}
```

## Important

The Human race can have the modifier in any class, this behaviour is still not defined