# Weapon

The different weapons existing in Pathfinder

## Parameters

+ icon (``String``): Path to the icon that represents the weapon
+ name (``String``): Name of the weapon
+ cat(`String`): Category the weapon belongs to (Light, One-Handed...)
+ type (`String`): Type of the weapon (Simple, Martial...)
+ dmg (`String`): Damage dice of the weapon (1d6, 2d8...)
+ crit(`String`): Critical range and damage of the weapon (19-20 x2, x3...)
+ extra (``Dict``): Dictionary with extra info the weapon has (To Be Defined)

## Example

```JavaScript
{

    icon: 'img/longspear.png',
    name: 'Longspear',
    cat: 'Two-Handed',
    type: 'Simple',
    dmg: '1d8',
    crit: 'x3',
    extra: {}
}
```