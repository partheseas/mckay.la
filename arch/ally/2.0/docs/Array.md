# Array Utilities

## Array.to(item)

Converts an array like object (like a NodeList) into an actual array.

# Array Extensions

## Array.make(loop, playground)

Runs the loop for each item in the array, and returns the results.

`loop(value, name)`: The function that runs for each item.

`playground`: The object that `this` refers to inside the loop.

    var a = [
        {
            name: 'a'
        },
        {
            name: 'b'
        },
        {
            name: 'c'
        }
    ];
    
    var names = a.make(function (item) {
        return item.name;
    });

In the example above, `names` would be `['a', 'b', 'c']`

## Array.check(loop, playground)

Like Array.make, but it doesn't return anything.

## Array.find(loop, playground)

Runs through the items in the array until the loop returns something that evalutates to true, and then returns whatever the loop returned.

`loop(value, name)`: The function that runs for each item.

`playground`: The object that `this` refers to inside the loop.

    var a = [
        {
            name: 'a'
        },
        {
            name: 'b'
        },
        {
            name: 'c'
        }
    ];
    
    var i = a.find(function (item, index) {
        if (item.name === "b")
            return index;
    });

In the example above, `i` would be `1`.

## Array.has(item)

If the array contains `item` then it returns the index. If not, it returns undefined.

The advantage over Array.indexOf, is that use can use `$.is(result)` instead of `if (result === -1)`




