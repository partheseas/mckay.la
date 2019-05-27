# Object Extensions

## Object.extend(extension, settings)

`extension`: The object whose properties should be applied to the current object.

`settings.sticky`: Should the properties be applied to the current object or a fresh one?'

`settings.skip`: A list of properties to avoid extending.

    var a = {
        a: 'a'
    };
    
    a.extend({
        b: 'b'
    });
    
    var b = a.extend({
        c: 'c',
        d: 'd',
        e: 'e'
    }, {
        sticky: false,
        skip: 'c, e'
    });

In the above example, `a` would be `{ a: 'a', b: 'b' }` and `b` would be `{ a: 'a', b: 'b', d: 'd' }`.

## Object.basics()

Returns the prototype of the object. Mostly in case of overwrites.

    var a = ['a', 'b', 'c'];
    
    a.make = "Hey";
    
    a.basics().make(function () {
        // Blah
    });

## Object.iterate(loop, playground)

Makes for in loops simpler and consistent.

This function skips over all properties defined through prototypes. It only runs for object-specific properties.

`loop(value, name)`: The function that runs for each item.

`playground`: The object that `this` refers to inside the loop.

    var a = {
        a: 'hi',
        b: 'hi',
        c: 'hi
    };
    
    var b = [];
    
    a.iterate(function (value, prop) {
        b.push(prop);
    });

In the above example, `b` would be `['a', 'b', 'c']`

## Object.ally(stack)

Used internally for method stacking.

Adds the Ally methods to the object.

    var a = [];
    
    console.log(!!a.html);
    
    a.ally();
    
    console.log(!!a.html);

The first log would be false, but the second would be true.

`stack`: If the items in the array are not the items to use in the functions.

`stack.selected`: If defined, is used for the Ally functions. Otherwise, an array of the values in the object are used instead.

    var a = { a: 'a' },
        b = { a: 'a' },
        c = { a: 'a' },
        d = { a: 'a' },
        e = { a: 'a' },
        f = { a: 'a' };
    
    var x = [a, b, c];
    
    x.ally();
    
    x.attr('a', 'b');
    
    x.ally({ selected: [d, e, f] });
    
    x.attr('a', 'c');

In the above example `a.a`, `b.a`, and `c.a` would be `'b'`, and `d.a`, `e.a`, and `f.a` would be `'c'`.

## Object.stringify

Shortcut for `JSON.stringify`.




