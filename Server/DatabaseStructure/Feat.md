# Feat

The different feats existing in Pathfinder

## Parameters

+ name (``String``): Name of the feat
+ desc(`String`): Short benefit of the feat
+ type (`String`): Type of the feat (General, Metamagic...)
+ bonus (`Dict (String:int)`) Bonus the feat might apply to skills, abilities or characteristics
+ extra (``Dict``): Dictionary with extra info the feat has (To Be Defined)

## Example

```JavaScript
{

    name: 'Acrobatic',
    desc: '+2 bonus on Acrobatics and Fly checks',
    type: 'General',
    bonus: {
        'Acrobatics': 2,
        'Fly': 2
    },
    extra: {}
}
```