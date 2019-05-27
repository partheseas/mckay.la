/*
  Ally 1.3. Copyright 2011, McKayla Washburn. MIT license.
*/



var $, Ally;
$ = Ally = (function fresh() {

// Save the window object to make sure it's accessible.
var global = this || {},
    window = global,

    // Make sure we can access the document.
    document = window.document,

    // Define the Ally function.
    Ally = function () {
        return q.apply(m, arguments);
    },

    // Define some basic info.
    version = 1.3,
    tag = "final",

    // More complex info.
    milestone = 1,
    major = 3,
    minor = 0,

    // Include a build number to differentiate newer and older versions of the same release.
    build = 630.1,

    // Create an object for data storage.
    data = {},

    // Make the object that will hold the methods to be applied to arrays passed out of the Q selector.
    m = Ally.prototype || {},

    // Make a function that will quickly detect if the variable is defined.
    $ = function (u) {
        if (u !== undefined) return true;
    },

    // A few regular expressions now.
    // Like one for extend, that checks for excluded properties.
    exprops = /(Type|forEach|extend|merge|fuse|constructor|stringify|parse|valueOf|__proto__)/,

    // Check if it's a valid CSS selector.
    nsel = /[^\~\!\#\$\^\*\(\)\-\=\[\]\|\:\'\"\,\>\.\w\d\s]/,

    // Check if it's a class/ID.
    clsid = /(^\.|^\#)/,

    // Check for anything other then letters, numbers, and hyphens.
    ncom = /[^\w\d\-]/,

    // Checking for an invalid property name.
    nprop = /[\W\D]/;

// Make a function to make localStorage more useful.
Ally.local = function () {
    var key = arguments[0],
        value = arguments[1];

    if (!key) throw "No key. [0]";
    if (key && key.Type !== "String") throw "The key [0] is not a string.";

    if (value) {
        var jsonValue = JSON.stringify(value);
        localStorage[key] = jsonValue;
        return value;
    } else
        var parseValue = JSON.parse(localStorage[key]);

    return parseValue;
};

// Browser detection.
(function () {
    // Navigator is passed as the first argument.
    var navigator = arguments[0],

        // Let's save the useragent for quicker access.
        ua = navigator.userAgent,
        i, // Used to figure out where the version number is.
        i2, // Special cases require two position numbers.
        i3, // Super special cases require three position numbers.
        v; // Contains the actual version number.
    // Check the most popular desktop browsers.
    // Is it Chrome?
    // ua = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-US) AppleWebKit/534.13 (KHTML, like Gecko) Chrome/9.0.597.84 Safari/534.13";
    i = ua.indexOf('Chrome/');
    if (i > -1) {
        i2 = ua.indexOf('Safari/');
        v = ua.slice(i + 7, i2 - 1);
        Ally.Chrome = navigator.Chrome = v;
    }

    // Is it Firefox?
    // ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0b10) Gecko/20100101 Firefox/4.0b10";
    i = ua.indexOf('Firefox/');
    if (i > -1) {
        v = ua.substring(i + 8);
        Ally.Firefox = navigator.Firefox = v;
    }

    // Is it Safari?
    // ua = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-us) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4";
    i = ua.indexOf('Safari/');
    if (i > -1 && ua.indexOf('Chrome/') === -1) {
        i2 = ua.indexOf('Version/');
        v = ua.slice(i2 + 8, i - 1);
        Ally.Safari = navigator.Safari = v;
    }

    // Is it Opera?
    // ua = "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.6; U; en) Presto/2.7.62 Version/11.01";
    if (/Opera\//.test(ua)) {
        i = ua.indexOf('Version/');
        v = ua.substring(i + 8);
        Ally.Opera = navigator.Opera = v;
    }

    // Is it IE?
    // ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
    i = ua.indexOf('MSIE');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(';');
        v = ua.slice(i + 5, i + i2);
        Ally.IE = navigator.IE = v;
    }

    // Check for engines.
    // Is it WebKit?
    // ua = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-us) AppleWebKit/534.19+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4";
    i = ua.indexOf('AppleWebKit/');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(' ');
        v = ua.slice(i + 12, i + i2);
        Ally.WebKit = navigator.WebKit = v;
    }

    // Is it Gecko?
    // ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0b10) Gecko/20100101 Firefox/4.0b10";
    if (/Gecko\//.test(ua)) {
        i = ua.indexOf('rv');
        i2 = ua.substring(i).indexOf(')');
        v = ua.slice(i + 3, i + i2);
        Ally.Gecko = navigator.Gecko = v;
    }

    // Is it Presto?
    // ua = "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.6; U; en) Presto/2.7.62 Version/11.01";
    i = ua.indexOf('Presto/');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(' ');
        v = ua.slice(i + 7, i + i2);
        Ally.Presto = navigator.Presto = v;
    }

    // Is it Trident?
    // ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
    i = ua.indexOf('Trident/');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(')');
        v = ua.slice(i + 8, i + i2);
        Ally.Trident = navigator.Trident = v;
    }

    // Now check for iOS devices.
    i = ua.indexOf('like Mac OS X');
    if (i > -1) {
        i2 = ua.indexOf('OS');
        v = ua.slice(i2 + 3, i - 1);
        Ally.iOS = navigator.iOS = v;
        if (ua.indexOf('iPhone') > -1) Ally.iPhone = navigator.iPhone = true;
        if (ua.indexOf('iPod') > -1) Ally.iPod = navigator.iPod = true;
        if (ua.indexOf('iPad') > -1) Ally.iPad = navigator.iPad = true;
    }

    // Now check for Android.
    i = ua.indexOf('Android');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(';');
        v = ua.slice(i + 8, i + i2);
        Ally.Android = navigator.Android = v;
    }

    // Now check for Mac's.
    // ua = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-US) AppleWebKit/534.13 (KHTML, like Gecko) Chrome/9.0.597.84 Safari/534.13";
    i = ua.indexOf('Intel Mac OS X');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(';');
        v = ua.slice(i + 15, i + i2);
        Ally.Mac = navigator.Mac = v;
    }

    // Check for Windows.
    // ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
    i = ua.indexOf('Windows NT');
    if (i > -1) {
        i2 = ua.substring(i).indexOf(';');
        v = ua.slice(i + 11, i + i2);
        Ally.Windows = navigator.Windows = v;
    }
})(window.navigator);

// Build a replacement for Ally.type.
Object.prototype.Type = "Object";
HTMLElement.prototype.Type = "HTMLElement";
Number.prototype.Type = "Number";
Function.prototype.Type = "Function";
RegExp.prototype.Type = "RegExp";
Array.prototype.Type = "Array";
String.prototype.Type = "String";
Boolean.prototype.Type = "Boolean";

// Add the extend method to objects.
Object.prototype.extend = function () {
    // Save the object and the callback for quicker access.
    var prop,
        object = arguments[0],
        stick = arguments[1];

    // Check the arguments.
    if (!object) throw "No object [0] to extend this with.";
    if (object && (object.Type !== "Object" && object.Type !== "Array")) throw "Object [0] must be an object or an array.";

    // Adjust.
    if (stick !== false || stick !== true) stick = true;

    // Make the current object the object that the properties are applied to.
    if (stick) var returned = this;
    else {
        var returned = {};
        for (prop in this)
            if (!exprops.test(prop))
                returned[prop] = this[prop];
    }

    // Apply the objects properties to the object.
    for (prop in object) {
        if (!exprops.test(prop))
            returned[prop] = object[prop];
    }

    // Return the new object.
    return returned;
};

// Add merge to objects and arrays.
Object.prototype.merge = function () {
    // Save the objects and the callback for quicker access.
    var prop,
        objects = arguments[0];

    // Check the arguments.
    if (!objects) throw "No objects [0] to merge with.";
    if (objects && objects.Type !== "Array") throw "The list of objects [0] to merge must be an array.";

    // Make the current object, the object that properties are applied to.
    var returned = {}.extend(this);

    // Apply the objects properties to the new object.
    objects.forEach(function (object) {
        if (object && object.Type === "Object")
            for (prop in object)
                if (!exprops.test(prop))
                    returned[prop] = object[prop];
    });

    // Return the new object.
    return returned;
};

// Convert it to a JSON String.
Object.prototype.stringify = function () {
    return JSON.stringify(this);
};

// Replace the default forEach loop with my slightly customized one.
Array.prototype.forEach = function () {
    var loop = arguments[0],
        playground = arguments[1] || this;

    if (!loop) throw "No loop. [0]";
    if (loop.Type !== "Function") throw "Loop [0] is not a function.";

    var returned = [];
    for (var i = 0; i < this.length; i++)
        if (i in this) returned[i] = loop.apply(playground, [this[i], i, this]);

    return returned;
};

// Add fuse to Arrays.
Array.prototype.fuse = function () {
    // Save the arrays and the callback for quicker access.
    var arrays = arguments[0];

    // Check the arguments.
    if (!arrays) throw "No arrays [0] to fuse with.";
    if (arrays && arrays.Type !== "Array") throw "List of arrays [0] must be an array.";

    // Make the current array, the array that the values are pushed to.
    var returned = [].extend(this);

    // Push all the values.
    arrays.forEach(function (array) {
        if (array.Type === "Array")
            array.forEach(function (value) {
                returned.push(value);
            });
    });

    // Return the new array.
    return returned;
};

// Add an easy way to insert text inside of a string.
String.prototype.insert = function () {
    // Save the position and text for quicker access.
    var position = arguments[0],
        text = arguments[1],

        // Save the string.
        string = this;

    // Check the arguments.
    if (!position) throw "No position. [0]";
    if (position.Type !== "Number") throw "Position [0] is not a number.";
    if (!text) throw "No text. [1]";
    if (text.Type !== "String") throw "Text [1] is not a string.";

    // Check if the position is actual realistic.
    // If not, put it at the end.
    if (position > string.length) position = string.length;

    // Get all the text before the position.
    var pre = string.slice(0, position);
    var after = string.substring(position);

    var newstring = pre + text + after;

    return newstring;
};

// Remove a section of the string.
String.prototype.remove = function () {
    // Save the positions, create a string to place the new string into, and create variables for the beginning and end.
    var start = arguments[0],
        end = arguments[1],
        wo = "",
        beginning, after;

    // Check the arguments.
    if (!$(start)) throw "No start. [0]";
    if (!$(end) && start.Type === "Number") throw "No end. [1]";
    if (start.Type !== "Number" && start.Type !== "String") throw "Starting position/string to remove [0] is not a number/string.";
    if (start.Type === "Number" && end.Type !== "Number") throw "Ending position [1] is not a number.";

    if (start.Type === "Number") {
        // Check if the positions are realistic.
        if (start < 0) start = 0;
        if (end > this.length) end = this.length;
    }

    if (start.Type === "String") {
        var string = start;

        // Set the positions.
        start = this.indexOf(string);
        end = start + string.length;
    }

    // Get everything before what is to be removed.
    beginning = this.slice(0, start);

    // Get everything after what is to be removed.
    after = this.substring(end);

    // Combine them.
    wo = beginning + after;

    // Return it.
    return wo;
};

// Flip the string backwards.
String.prototype.flip = function () {
    // Save the string, and create a string to place the backwards string into.
    var string = this,
        back = "";

    for (var i = 0; i <= string.length; i++) {
        // Make a different variable containing the right number.
        var reali = string.length - i;

        // Get the character from the right positioh.
        back += string.charAt(reali);
    }

    return back;
};

// Parse it as JSON.
String.prototype.parse = function () {
    return JSON.parse(this);
};

Number.prototype.absolute = function () {
    // Save the number for quicker access.
    var number = this;

    // Check if it's already positive.
    if (number >= 0) return number;

    // Or return the negative as a positive.
    else
        return number * -1;
};

Number.prototype.opposite = function () {
    // Save the number for quicker access.
    var number = this;

    // Return the number times -1.
    return number * -1;
};

// Create document.head.
document.head = document.getElementsByTagName('head')[0];

// Mess around with document's element selectors for a minute.
Ally.byId = document.byId = function () {
    return document.getElementById.apply(document, arguments)
};

Ally.byClass = document.byClass = function () {
    return document.getElementsByClassName.apply(document, arguments)
};

Ally.byTag = document.byTag = function () {
    return document.getElementsByTagName.apply(document, arguments)
};

Ally.byQuery = document.byQuery = function () {
    return document.querySelectorAll.apply(document, arguments)
};

// Now that everything is set up, store some data on Ally.
Ally.extend({
    m: m,
    version: version,
    milestone: milestone,
    major: major,
    minor: minor,
    tag: tag,
    build: build,
    data: data,
    global: global,
    is: $
});

// Make the Ally.ready method to run functions when the document is loaded.
Ally.extend({
    ready: function () {
        var listener = arguments[0];
        if (listener && listener.Type === "Function") {
            Ally(window).event('load', function () {
                listener.apply(Ally, [window]);
            });
        }
    }
});

// Make the q selector function.
var q = function () {
    // Save the selector and function for quicker access.
    var selector = arguments[0],
        manipulator = arguments[1],

        // Make a variable to hold the array that's being returned;
        returned = [];

    // Process the selector.
    if (selector) {
        // if it's a string, assume it's a query selector.
        if (selector.Type === "String") {
            // Make it lowercase so that checking is easier and quicker.
            selector = selector.toLowerCase();

            if (selector === 'body') returned = [document.body].extend(m); // Optimize for selecting the body.
            else if (selector === 'head') returned = [document.head].extend(m); // Optimize for selecting the head.

            // If it's not optimized for, run querySelectorAll.
            else {
                // Select the elements after checking the selector of course.
                if (!nsel.test(selector))
                    var elements = window.Sizzle ? Sizzle(selector, document, []) : document.querySelectorAll(selector);

                // If it's invalid, say so.
                else
                    throw "Invalid selector.";

                // Put all of the elements into an array for .extend.
                for (var i = 0; i < elements.length; i++)
                    returned.push(elements[i]);

                // Now add the methods to that array.
                returned.extend(m);
            }
        } else if (selector.Type === "Function") {
            if (document.readyState !== "complete")
                Ally.ready(selector); // If it's a function and the document isn't ready, run it when it's ready.
            else
                return selector.apply(Ally, [window]); // If the document is ready, just run it.
        } else
            returned = [selector].extend(m); // If it's anything else just put it in an array and add the methods.
    }

    // Make the selector available.
    returned.selector = selector;

    // Make the elements available. (For an update coming in 1.4)
    returned.selected = [].extend(returned);

    if (manipulator && manipulator.Type === "Function")
        return manipulator.apply(returned, [window, selector]); // If there is a function, run it.
    else
        return returned; // If there's no function, just return it.
};

Ally.m.extend({
    add: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the type, selector, and callback for quicker access.
        var type = arguments[0],
            selector = arguments[1],
            base = arguments[2],
            callback = arguments[3];

        // Check the arguments.
        if (type && type.Type !== "String") throw "Type [0] must be a string.";
        if (selector && selector.Type !== "String") throw "Selector [1] must be a string.";
        if (selector && !clsid.test(selector)) throw "Selector [1] must be an ID or a class.";
        if (base && base.Type !== "Object") throw "Base [2] is not an object.";
        if (callback && callback.Type !== "Function") throw "Callback [3] is not a function.";

        // Adjust the type.
        if (!type) {
            var parenttype = this[0].tagName.toLowerCase();
            if (parenttype === 'body') type = 'div';
            if (parenttype === 'div') type = 'p';
            else type = 'span';
        }

        // Make the elements, assign the selectors, apply the base, and move them in.
        var returned = this.forEach(function (parent, index) {
            var element = document.createElement(type);
            parent.appendChild(element);

            if (selector) {
                if (selector[0] === "#") {
                    if (index === 0) element.id = selector.replace('#', '');
                    else element.id = selector.replace('#', '') + "-" + index;
                }
                if (selector[0] === ".") {
                    element.className = selector.replace('.', '');
                }
            }

            if (base)
                Ally(element).base(base);

            return element;
        });

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the new elements.
        return returned;
    },

    remove: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the callback for quicker access.
        var callback = arguments[0];

        // Check the arguments.
        if (callback && callback.Type !== "Function") throw "Callback [0] must be a function.";

        // Remove the element.
        var returned = this.forEach(function (element) {
            element.parentNode.removeChild(element);
            return element;
        });

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return it.
        return returned;
    }
});

Ally.m.extend({
    html: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the desired HTML for quicker access.
        var html = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (html && html.Type !== "String") throw "HTML [0] is not a string.";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Adjust the arguments.
        if (html) html = html.trim();

        // Check if the HTML should change.
        if (html) {
            // Change it.
            var returned = this.forEach(function (element) {
                return element.innerHTML = html;
            });
        } else {
            // Just return it.
            var returned = this.forEach(function (element) {
                return element.innerHTML.trim();
            });
        }

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the HTML.
        return returned;
    },

    value: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the desired value and callback for quicker access.
        var value = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (value && value.Type !== "String") throw "Value [0] is not a string.";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Adjust the arguments.
        if (value) value = value.trim();

        // Check if the value should change.
        if (value) {
            // Change it.
            var returned = this.forEach(function (element) {
                return element.value = value;
            });
        } else {
            // Just return it.
            var returned = this.forEach(function (element) {
                return element.value.trim();
            });
        }

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the value.
        return returned;
    },

    empty: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the callback for quicker access.
        var callback = arguments[0];

        // Check the arguments.
        if (callback && callback.Type !== "Function") throw "Callback [0] must be a function.";

        // Change the HTML/value.
        var returned = this.forEach(function (element) {
            if (element.innerHTML) element.innerHTML = "";
            if (element.value) element.value = "";
            return "";
        });

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the HTML/value.
        return returned;
    }
});

Ally.m.extend({
    attr: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the attribute, value, and callback for quicker access.
        var attribute = arguments[0],
            value = arguments[1],
            callback = arguments[2];

        // Check the arguments.
        if (!attribute) throw "No attribute [0] to read.";
        if (attribute && attribute.Type !== "String") throw "Attribute [0] was not a string.";
        if (callback && callback.Type !== "Function") throw "Callback [2] is not a function.";

        // Check if the attribute should be changed.
        if (value) {
            // Change it.
            if (this[0].setAttribute) {
                this.forEach(function (element) {
                    element.setAttribute(attribute, value);
                });
            } else {
                this.forEach(function (element) {
                    element[attribute] = value;
                });
            }
        }

        // Generate the attribute values.
        var returned = this.forEach(function (element) {
            return element[attribute];
        });

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        return returned;
    },

    base: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the object and callback for quicker access.
        var prop, nprop,
            object = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (!object) throw "No object. [0]";
        if (object && object.Type !== "Object") throw "Object is not an object. [0].";
        if (callback && callback.Type !== "Function") throw "Callback [2] must be a function.";

        // Set the attributes.
        for (prop in object)
            if (!exprops.test(prop)) {
                nprop = prop;
                if (prop.indexOf('_') > -1) {
                    while (nprop.indexOf('_') > -1)
                        nprop = nprop.replace('_', '-');
                }

                this.attr(nprop, object[prop]);
            }


        // Return it.
        return this;
    },

    removeAttr: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the attribute and callback for quicker access.
        var attribute = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (!attribute) throw "No attribute [0] to remove.";
        if (attribute && attribute.Type !== "String") throw "Attribute [0] was not a string.";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Delete the attribute.
        if (this[0].removeAttribute) {
            var returned = this.forEach(function (element) {
                element.removeAttribute(attribute);
                return element.getAttribute(attribute);
            });
        } else {
            var returned = this.forEach(function (element) {
                delete element[attribute];
                return element[attribute];
            });
        }

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the attributes.
        return returned;
    }
});

Ally.m.extend({
    classes: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Get the classes.
        var returned = this.forEach(function (element) {
            return element.className;
        });

        return returned;
    },

    addClass: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the new classes and callback for quicker access.
        var add = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (!add) throw "No class [0] to add.";
        if (add && (add.Type !== "String" && add.Type !== "Array")) throw "Class [0] is not a string, or an array of strings.";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Add it/them.
        if (add.Type === "String") {
            this.forEach(function (element) {
                element.className += " " + add;
            });
        } else if (add.Type === "Array") {
            this.forEach(function (element) {
                add.forEach(function (value) {
                    if (value && value.Type === "String") element.className += " " + value;
                });
            });
        }

        // Get the classes.
        var returned = this.classes();

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the classes.
        return returned;
    },

    removeClass: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the class(es) for quicker access.
        var remove = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (!remove) throw "No class [0] to remove.";
        if (remove && (remove.Type !== "String" && remove.Type !== "Array")) throw "Class [0] is not a string, or an array of strings.";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Remove it/them.
        if (remove.Type === "String") {
            this.forEach(function (element) {
                element.className = element.className.remove(remove);
            });
        } else if (remove.Type === "Array") {
            this.forEach(function (element) {
                remove.forEach(function (value) {
                    if (value && value.Type === "String") element.className = element.className.remove(value);
                });
            });
        }

        // Get the classes.
        var returned = this.classes();

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return the classes.
        return returned;
    }
});

Ally.m.extend({
    css: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the property, value, priority, and callback for quicker access.
        var property = arguments[0],
            value = arguments[1],
            priority = arguments[2],
            callback = arguments[3];

        // Check the arguments.
        if (!property) throw "No property [0] to read.";
        if (property && property.Type !== "String") throw "Property [0] is not a string.";
        if (value && (value.Type !== "String" && value.Type !== "Number")) throw "Value [1] is not a string or a number.";
        if (callback && callback.Type !== "Function") throw "Callback [3] must be a function.";

        // Adjust the priority.
        if (!priority) priority = "";

        // Check if the property should be changed.
        if (value) {
            // Change it.
            this.forEach(function (element) {
                element.style.setProperty(property, value, priority);
            });
        }

        // Generate the styles.
        var returned = this.forEach(function (element) {
            if (element.style.getPropertyValue(property)) {
                return element.style.getPropertyValue(property);
            } else {
                return getComputedStyle(element).getPropertyValue(property);
            }
        });

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        return returned;
    },

    removeProperty: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the property.
        var property = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (!property) throw "No property [0] to remove.";
        if (property && property.Type !== "String") throw "Property is not a string.";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Remove the property.
        this.forEach(function (element) {
            element.style.removeProperty(property);
        });

        // Get the styles.
        var returned = this.css(property);

        // Run the callback.
        if (callback) callback.apply(returned, [window]);

        // Return it.
        return returned;
    },

    transform: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the property, value, and duration for quicker access.
        var property = arguments[0],
            value = arguments[1],
            duration = arguments[2];

        // Check the arguments.
        if (!property) throw "No property. [0]";
        if (!value) throw "No value. [1]";
        if (property && property.Type !== "String") throw "Property [0] is not a string.";
        if (value && value.Type !== "String") throw "Value [1] is not a string.";

        // Adjust the duration.
        if (!$(duration) || duration && duration.Type !== "Number") duration = 300;

        // Set the transition property.
        this.css('transition', 'All ' + duration + 'ms ease');
        this.css('-webkit-transition', 'All ' + duration + 'ms ease');
        this.css('-moz-transition', 'All ' + duration + 'ms ease');
        this.css('-o-transition', 'All ' + duration + 'ms ease');

        // Set the transform property.
        this.css('transform', property + '(' + value + ')');
        this.css('-webkit-transform', property + '(' + value + ')');
        this.css('-moz-transform', property + '(' + value + ')');
        this.css('-o-transform', property + '(' + value + ')');
    },

    hide: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the time and the callback for quicker access.
        var duration = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Adjust the duration.
        if (!$(duration) || duration && duration.Type !== "Number") duration = 300;

        // Make an empty returned array just to be safe.
        var returned = [];

        // Maximize the settings.
        this.css('display', 'block');
        this.css('opacity', '1');

        // Figure out what the delay for the interval should be to match the specified time.
        var delay = duration / 10,

            // Save the elements, because this would return window inside the interval.
            elements = this,

            // Do the animating.
            animation = setInterval(function () {
                var current = parseFloat(elements.css('opacity')[0]);
                if (current >= 0.15) elements.css('opacity', current - 0.1);
                else {
                    // Finish the animation.
                    elements.css('opacity', '0');
                    elements.css('display', 'none');
                    clearInterval(animation);

                    // Run the callback.
                    if (callback) callback.apply(returned, [window]);
                }
            }, delay);
    },

    show: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the time and the callback for quicker access.
        var duration = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // If there's no time then default it.
        if (!$(duration) || duration && duration.Type !== "Number") duration = 300;

        // Make an empty returned array just to be safe.
        var returned = [];

        // Minimize the settings in case it's already visible.
        this.css('display', 'block');
        this.css('opacity', '0');

        // Figure out what the delay for the interval should be to match the specified time.
        var delay = duration / 10,

            // Save the elements, because this would return window inside the interval.
            elements = this,

            // Do the animating.
            animation = setInterval(function () {
                var current = parseFloat(elements.css('opacity')[0]);
                if (current <= 0.85) elements.css('opacity', current + 0.1);
                else {
                    // Finish the animation.
                    elements.css('opacity', '1');
                    clearInterval(animation);

                    // Run the callback.
                    if (callback) callback.apply(returned, [window]);
                }
            }, delay);
    }
});

Ally.m.extend({
    event: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the event type, the listener and useCapture for quicker access.
        var event = arguments[0],
            listener = arguments[1],
            capture = arguments[2],
            callback = arguments[3];

        // Check the arguments.
        if (!event) throw "No event name. [0]";
        if (!listener) throw "No listener. [1]";
        if (event && event.Type !== "String") throw "Event name is not a string.";
        if (listener && listener.Type !== "Function") throw "Listener is not a function.";
        if (capture !== undefined && capture.Type !== "Boolean") throw "Capture usage [2] is not a boolean.";
        if (callback && callback.Type !== "Function") throw "Callback [3] must be a function.";

        // Adjust.
        if (capture !== true || capture !== false) capture = false;

        // Add the listeners.
        this.forEach(function (element) {
            element.addEventListener(event, listener, capture);
        });

        // Run the callback.
        if (callback) callback.apply(listener, [window]);

        // Return the event ID.
        return [event, listener, capture];
    },

    removeEvent: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the event type, the listener and useCapture for quicker access.
        var event = arguments[0],
            callback = arguments[1];

        // Check the arguments.
        if (!event) throw "No event.";
        if (event && event.Type !== "Array") throw "Incorrect event ID. [0]";
        if (callback && callback.Type !== "Function") throw "Callback [1] must be a function.";

        // Remove the listeners.
        this.forEach(function (element) {
            element.removeEventListener.apply(element, event);
        });

        // Run the callback.
        if (callback) callback.apply(window, [window]);
    }
});

Ally.extend({
    average: function () {
        // Save the numbers for quicker access.
        var numbers = arguments[0];

        // Check the arguments.
        if (!numbers) throw "No numbers. [0]";
        if (numbers && numbers.Type !== "Array") throw "Array of numbers [0] is not an array.";

        // Create the number we'll do the math on.
        var average = 0;

        // Add all the numbers.
        numbers.forEach(function (value) {
            if (value && value.Type === "Number") average += value;
        });

        average /= numbers.length;

        // Divid it by the number of numbers added and return the average.
        return average;
    },

    random: function () {
        // Save the minimum and maximum for quicker access.
        var min = arguments[0],
            max = arguments[1],
            round = arguments[2];

        // Check the arguments.
        if (!$(min)) throw "No minimum. [0]";
        if (!$(max)) throw "No maximum. [1]";
        if (min.Type !== "Number") throw "Minimum [0] is not a number.";
        if (max.Type !== "Number") throw "Maximum [0] is not a number.";

        // Adjust them.
        if (!min) min = 0;
        if (!max || max < min) max = min + 10;

        // Make a random number.
        var random = Math.random(),

            // Find the range.
            range = max - min;

        // Make the random number fit that.
        random *= range;

        // Round it if you want.
        if (round) random = Math.round(random);

        // Push the number into the range and return the random number.
        return random + min;
    }
});

Ally.m.extend({
    open: function () {
        // First, check to make sure this won't run on the Ally.m, or Ally object.
        if (this[0] === Ally || this === Ally.m) throw "Cannot run an Ally function on the Ally object.";

        // Save the URL, method, async setting, and callback for quicker access.
        var url = arguments[0],
            method = arguments[1],
            async = arguments[2],
            callback = arguments[3];

        // Check the arguments.
        if (!url) throw "No URL. [0]";
        if (url && url.Type !== "String") throw "URL [0] is not a string.";
        if (method && method.Type !== "String") throw "Method [1] is not a string.";
        if (method && (method.toUpperCase() !== "GET" && method.toUpperCase() !== "POST")) throw "Fetch Method [1] must be GET or POST.";
        if (async !== undefined && async.Type !== "Boolean") throw "Async setting [2] must a boolean.";
        if (callback && callback.Type !== "Function") throw "Callback [3] must be a function.";

        // Adjust the arguments.
        if (!method) method = "GET";
        if (async !== true && async !== false) async = true;

        // Save the elements, because this changes in the events.
        var elements = this,

            // Request the file.
            xhr = new XMLHttpRequest();

        xhr.open(method, url, async);

        // Put the HTML in the elements.
        Ally(xhr).event('load', function () {
            elements.html(xhr.responseText);
        });

        // Set the callback.
        if (callback)
            Ally(xhr).event('load', function () {
                callback.apply(xhr, [window]);
            });

        xhr.send();

        return xhr;
    }
});

Ally.extend({
    xhr: function () {
        // Save the URL and callback for quicker access.
        var url = arguments[0],
            method = arguments[1],
            async = arguments[2],
            headers = arguments[3],
            callback = arguments[4];

        // Check the arguments.
        if (!url) throw "No URL. [0]";
        if (url && (url.Type !== "String" && url.Type !== "Array")) throw "URL [0] is not a string.";
        if (method && method.Type !== "String") throw "Method [1] is not a string.";
        else method = method.toUpperCase();
        if (method && (method !== "GET" && method !== "POST")) throw "Fetch Method [1] must be GET or POST.";
        if (async !== undefined && async.Type !== "Boolean") throw "Async setting [2] must a boolean.";
        if (headers && headers.Type !== "Object") throw "Headers declaration [3] is not an object.";
        if (callback && callback.Type !== "Function") throw "Callback [4] must be a function.";

        // Adjust the arguments.
        if (!method) method = "GET";
        if (async !== true && async !== false) async = true;
        if (!headers) headers = {};

        // If it's just one URL, load it.
        if (url.Type === "String") {
            // New request.
            var xhr = new XMLHttpRequest();

            // Apply the settings.
            xhr.open(method, url, async);

            // Apply the headers.
            var prop;
            if (headers)
                for (prop in headers)
                    if (headers[prop].Type === "String" && !exprops.test(prop))
                        xhr.setRequestHeader(prop, headers[prop]);

            // Set the callback.
            if (callback)
                Ally(xhr).event('load', function () {
                    callback.apply(xhr, [window]);
                });

            // Load it.
            xhr.send();

            return xhr;
        }
        // If it's an array of URL's, load them all.
        else if (url.Type === "Array") {
            var returned = url.forEach(function (src, index, all) {
                if (src.Type === "String") {
                    // New request.
                    var xhr = new XMLHttpRequest();

                    // Apply the settings.
                    xhr.open(method, src, async);

                    // Set the callback.
                    if (index === all.length - 1 && callback)
                        Ally(xhr).event('load', function () {
                            callback.apply(xhr, [window]);
                        });

                    // Load it.
                    xhr.send();

                    return xhr;
                }
            });
            return returned;
        }
    },

    script: function () {
        // Save the URL and callback for quicker access.
        var url = arguments[0],
            cache = arguments[1],
            callback = arguments[2];

        // Check the arguments.
        if (!url) throw "No script URL. [0]";
        if (url && (url.Type !== "String" && url.Type !== "Array")) throw "Script URL [0] is not a string, or an Array of strings.";
        if (cache && cache.Type !== "Boolean") throw "Cache control [1] is not a boolean.";
        if (callback && callback.Type !== "Function") throw "Callback [2] is not a function.";

        // Adjust the arguments.
        if (!cache && cache !== false) cache = true;

        // If it's just one URL, load it.
        if (url.Type === "String") {
            var script = document.createElement('script');
            if (cache) script.src = url;
            else script.src = url + "?" + a.random(0,10000,true);
            if (callback) Ally(script).event('load', callback);
            document.head.appendChild(script);
            return script;
        }
        // If it's an array of URL's, load them all.
        else if (url.Type === "Array") {
            var returned = url.forEach(function (src, index, all) {
                if (src.Type === "String") {
                    var script = document.createElement('script');
                    if (cache) script.src = src;
                    else script.src = src + "?" + a.random(0,10000,true);
                    if (index === all.length - 1 && callback) Ally(script).event('load', callback);
                    document.head.appendChild(script);
                    return script;
                }
            });
            return returned;
        }
    },

    styleSheet: function () {
        // Save the URL and media for quicker access.
        var url = arguments[0],
            media = arguments[1];

        // Check the arguments.
        if (!url) throw "No URL. [0]";
        if (url && (url.Type !== "String" && url.Type !== "Array")) throw "URL [0] is not a string, or an array of strings.";
        if (media && media.Type !== "String") throw "Media type must be a string.";

        // Adjust the arguments.
        if (!media) media = "all";

        // If it's just one style sheet, load it.
        if (url.Type === "String") {
            var style = document.createElement('style');
            style.innerHTML = "@import url(" + url + ") " + media + ";";
            document.head.appendChild(style);
            return style;
        }
        // If it's multiple, load them all.
        if (url.Type === "Array") {
            var returned = url.forEach(function (src) {
                var style = document.createElement('style');
                style.innerHTML = "@import url(" + src + ") " + media + ";";
                document.head.appendChild(style);
                return style;
            });
        }
    }
});

Ally.keys = {};

Ally(function () {
    // Key down event.
    Ally('body').event('keydown', function () {
        // Save the event for quicker access.
        var event = arguments[0],

            // Save the key object and all object for quicker access.
            key = Ally.keys[event.keyCode],
            all = Ally.keys['all'];

        // A specific key.
        if (key) {
            // Key + shift.
            if (event.shiftKey) {
                if (key.shift && key.shift.down && key.shift.down.Type === "Function")
                    key.shift.down(event);
            }
            // Just the key.
            else if (key.down && key.down.Type === "Function")
                key.down(event);
        }
        // All keys.
        if (all) {
            // Key + shift.
            if (event.shiftKey) {
                if (all.shift && all.shift.down && all.shift.down.Type === "Function")
                    all.shift.down(event);
            }
            // Just a key.
            else if (all.down && all.down.Type === "Function")
                all.down(event);
        }
    });
    // Key up event.
    Ally('body').event('keyup', function () {
        // Save the event for quicker access.
        var event = arguments[0],

            // Save the key object and all object for quicker access.
            key = Ally.keys[event.keyCode],
            all = Ally.keys['all'];

        // A specific key.
        if (key) {
            // Key + shift.
            if (event.shiftKey) {
                if (key.shift && key.shift.up && key.shift.up.Type === "Function")
                    key.shift.up(event);
            }
            // Just the key.
            else if (key.up && key.up.Type === "Function")
                key.up(event);
        }
        // All keys.
        if (all) {
            // Key + shift.
            if (event.shiftKey) {
                if (all.shift && all.shift.up && all.shift.up.Type === "Function")
                    all.shift.up(event);
            }
            // Just a key.
            else if (all.up && all.up.Type === "Function")
                all.up(event);
        }
    });
});

// Orientation.
Ally(window).event('deviceorientation', function () {
    // Save the event for quicker access.
    var event = arguments[0];

    // Save the orientation data to the Ally object.
    Ally.pitch = event.beta || 0;
    Ally.roll = event.gamma || 0;
});

// Firefox Orientation.
Ally(window).event('MozOrientation', function () {
    // Save the event for quicker access.
    var event = arguments[0];

    // Save the orientation data to the Ally object.
    Ally.pitch = event.y * 90 || 0;
    Ally.roll = event.x * 90 || 0;
});

// If orientation isn't supported, set them to 0.
Ally.extend({
    pitch: 0,
    roll: 0
});

// Location.
// This is not enabled by default.
// If you need location information then run Ally.location.enable().
Ally.location = {
    enable: function () {
        navigator.geolocation.watchPosition(function () {
            // Save the location object for quicker access.
            var location = arguments[0];

            // Save the data onto the Ally object.
            Ally.longitude = location.coords.longitude || 0;
            Ally.latitude = location.coords.latitude || 0;
        });
    }
};

// Return Ally to the variables defined up front.
return Ally;

}).apply(window);
