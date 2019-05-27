# Ally Core

## $

### The $ and Ally global variables are exactly the same thing.

$ is Ally's query selector..

    $('a'); // All of the links on the page.\

..that also wraps elements..

    $(document.getElementById('hey')); // The element with an id of "hey", wrapped with all the usual functions.

..and objects.

    var hey = {};
    $(hey); // A wrapped version of the hey object.\

## $.global

The global object.

The same as window in the browser.

    $.global.hey = "Hello";
    hey; // "Hello"


## $.version

A string of the version.

    $.version; // "1.4"

## $.m

The object used to extend the elements passed out of $.

    $.m.third = function () {
        return this[2];
    };
    
    $('a').third(); // The third link on the page.

## $.ua

The browser's user agent.

## $.is

Returns true if the item has a value.

    $.is(); // false
    $.is(null); // null technically doesn't have a value, so false
    $.is(''); // This technically has a value, so true
    $.is(0); // This also has a value, so true

## $.type

Returns the type of item.

    $.type(function () {}); // "Function"
    $.type({}); // "Object"
    $.type([]); // "Array"
    $.type(/./); // "RegExp"
    $.type(' '); // "String"
    $.type(8); // "Number"
    $.type(true); // "Boolean"
    $.type(); // "undefined"
    
    // Available in other ways too.
    Number.is(4); // true
    Number.is(true); // false
    $.isArray('Hey'); // false
    $.isArray(['Hey']); // true

## Browser Detection

    $.Chrome;
    $.Firefox;
    $.Safari;
    $.Opera;
    $.IE;
    $.WebKit;
    $.Gecko;
    $.Presto;
    $.Trident;
    $.iOS;
    $.iPhone;
    $.iPad;
    $.Android;
    $.webOS;
    $.Mac;
    $.Windows;
    $.Linux;

## $.fetch

Load in a file.

    // Load a file.
    $.fetch('/Hi/There.txt');
    
    // Put the file in the page.
    $.fetch('/Hi/There.html', { auto: 'body' });
    
    // Execute a script.
    $.fetch('/Hi/There.js');
    
    // Get some JSON.
    $.fetch('/Hi/There.json', {
        onsuccess: function () {
            console.log(this.responseJSON);
        }
    });
    
    // Apply some styles.
    // Relative URL's in the CSS file **won't work**.
    $.fetch('/Hi/There.css');

## $.css

Loads in some CSS.

    $.css('/Hi/There.css'); // Relative URL's will work this way.

## $.once

Only runs the function if the id has not been used before.

If an ID is not supplied, the function itself is remembered.

    var x = 0,
        i = 0;
        
    function hi() {
        x++;
    };
    
    for (; i < 5; i++)
        $.once(hi);
    
    x; // 1
    
    $.once(hi, 20952);
    
    x; // 2
    
    $.once(hi, 20952);
    
    x; // 2
    
    $.once(hi, 19308);
    
    x; // 3




