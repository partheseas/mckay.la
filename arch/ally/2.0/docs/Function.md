# Function Utilities

## Function.say(husband, wife, kids, names)

Runs the given code locally.

`husband`: Can be a string of code, or a function.

`wife`: What `this` will refer to inside the code.

`kids`: The arguments given to the function.

`names`: The argument names. (only matters for string statements)

    Function.say('console.log(hello.hey + " " + this.hey)', { hey: 'world!' }, [{ hey: 'Hey' }], ['hello']);

The above example would log "Hey world!"

## Function.shout(statement)

Runs the given code globally.

`statement`: A string of code.

    Function.shout('var a = "Hey";');

In the above example, $.global.a would equal "Hey"

## Function.of(statement)

Makes functions out of the given statements.

If the statement is already a function, it just returns it.

    Function.of('return "Hey"');

The above example would return `function () { return "Hey" }`

    Function.of(function (a, b) { return a + b; });

The above example would return `function (a, b) { return a + b; }`

# Function Extensions

## Function.on(event)

Runs the function when the event is cannoned.

    function hey() {
        console.log('Hey there!');
    };
    
    hey.on('hello');
    
    Ally(hey).cannon('hello');

## Function.after(time, kids, wife)

Runs the function after `time` milliseconds.

Also provides a nice utility for events running after the function.

    function hey(name) {
        console.log('Hey ' + name + '!');
    };
    
    var event = hey.after(5000, ['Bob']);
    
    Ally(hey).attach(event, function () {
        console.log('How are you?');
    });

The above example would run `hey`, and then the function supplied to `attach`.

## Function.marry(wife, kids)

Changes what this refers to inside the function, and can set a default array of arguments.

    funtion hey(name) {
        return this.hi + " " + name;
    };
    
    var hi = hey.marry({ hi: 'Hello' }, ['Bob']);
    
    hi();
    
    hi('Jane');

In the above example, `hi()` would return `"Hello Bob"` and `hi('Jane')` would return `"Hello Jane"`

**Hey is not changed.**

## Function.give(extension)

Note: Mostly for classes.

Extends the prototype of the function.




