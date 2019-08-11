# Class

The different classes existing in Pathfinder

## Parameters

+ icon (``String``): Path to the icon that represents the class
+ name (``String``): Name of the class
+ dice (``String``): Dice of the class in the format 'dX'
+ role (``String``): Very brief description of how the class is supposed to be played
+ ability (``String``): Ability that is recommended to have the highest for the class due to the benefits to other characteristics 
+ extra (``Dict``): Dictionary with extra info the class has (To Be Defined)

## Example

```JavaScript
{
    icon: 'img/barbarian.png',
    name: 'Barbarian',
    dice: 'd12',
    role: 'Physical fighter, not talkative',
    ability: 'Strength',
    extra: {}
}
```