/*
  Ally Toolkit 1.2. Copyright 2011.
*/

(function (window) {
    // Browser detection. (Incase we need it in this function, we make sure it goes first.)
    ( function (navigator) {
        // Let's save the useragent for quicker access.
        var ua = navigator.userAgent;

        // Create a variable to store the version and the browser name index.
        var i;
        var i2; // Special cases require this.
        var v;

        // Check the most popular desktop browsers.
        // Is it Chrome?
        i = ua.indexOf('Chrome');
        if (i > -1) {
            v = ua.slice(i + 7, i + 17);
            navigator.Chrome = v;
        }

        // Is it Firefox?
        i = ua.indexOf('Firefox');
        if (i > -1) {
            v = ua.substring(i + 8);
            navigator.Firefox = v;
        }

        // Is it Safari?
        i = ua.indexOf('Safari');
        if (i > -1 && ua.indexOf('Chrome') === -1) {
            i2 = ua.indexOf('Version');
            v = ua.slice(i2 + 8, i - 1);
            navigator.Safari = v;
        }

        // Is it Opera?
        i = ua.indexOf('Opera');
        if (i > -1) {
            i2 = ua.indexOf('Version');
            v = ua.substring(i2 + 8);
            navigator.Opera = v;
        }

        // Now check for iOS devices.
        i = ua.indexOf('like Mac OS X');
        if (i > -1) {
            i2 = ua.indexOf('OS');
            v = ua.slice(i2 + 3, i - 1);
            navigator.iOS = v;
            if (ua.indexOf('iPhone') > -1) navigator.iPhone = true;
            if (ua.indexOf('iPod') > -1) navigator.iPod = true;
            if (ua.indexOf('iPad') > -1) navigator.iPad = true;
        }

        // Now check for Mac's.
        i = ua.indexOf('Intel Mac OS X');
        if (i > -1) {
            i2 = ua.substring(i).indexOf(';');
            v = ua.slice(i + 15, i + i2);
            navigator.Mac = v;
        }

        // Check for Windows.
        i = ua.indexOf('Windows NT');
        if (i > -1) {
            i2 = ua.substring(i).indexOf(';');
            v = ua.slice(i + 11, i + i2);
            navigator.Windows = v;
        }
    } )(navigator);

    // Define a non-global version of ally for use inside this function.
    var ally;

    // Make it a function.
    ally = function (b) { return q(b) };

    // Define some basic information about Ally.
    ally.version = 1.2;
    ally.build = 243.1;
    ally.copyright = 2011;

    // Make the q selector function.
    var q = function () {
        var b = arguments[0];
        if (b) {
            if (b === 'body') return [document.body].extend(ally);
            else if (b === 'head') return [document.head].extend(ally);
            else if (b === window) return [b].extend(ally);
            else if (b.type === "String") return document.querySelectorAll(b).extend(ally);
            else if (b.type === "Array") return b.extend(ally);
            else if (b.type === "Object") return [b].extend(ally);
        }
        return ally;
    };

    var is = function () {
        var item = arguments[0];
        if (item || item === 0) return true; else return false;
    };

    // Make it global.
    window.is = is;

    // Make it mine.
    ally.is = is;

    // Make the global data storage object.
    ally.data = {};

    // And the localStorage shortcut.
    ally.local = localStorage;

    // Create document.head.
    document.head = document.getElementsByTagName('head')[0];

    // Mess around with document's element selectors for a minute.
    document.byId = function () { return document.getElementById.apply(document, arguments) };
    document.byClass = function () { return document.getElementsByClassName.apply(document, arguments) };
    document.byTag = function () { return document.getElementsByTagName.apply(document, arguments) };
    document.byQuery = function () { return document.querySelectorAll.apply(document, arguments) };

    // Make a shortcut to document.
    window.doc = document;

    // Why not do it for window too?
    window.win = window;

    // Lets mess around a bit with the prototypes.
    // Now I'm gonna build a replacement for ally.type.
    Object.prototype.type = "Object";
    HTMLElement.prototype.type = "HTMLElement";
    XMLHttpRequest.prototype.type = "XMLHttpRequest";
    Number.prototype.type = "Number";
    Function.prototype.type = "Function";
    RegExp.prototype.type = "RegExp";
    Array.prototype.type = "Array";
    String.prototype.type = "String";
    Boolean.prototype.type = "Boolean";
    NodeList.prototype.type = "NodeList";

    // Replace the default forEach loop with my slightly customized one.
    Object.prototype.forEach = function(fun /*, thisp */) {
        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var returned = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t)
                returned[i] = fun.call(thisp, t[i], i, t);
        }
        return returned;
    };

    // Add the extend method to objects.
    Object.prototype.extend  = function () {
        // Save the object and the callback for quicker access.
        var object = arguments[0];
        var callback = arguments[1];

        // Make the current object the object that the properties are applied to.
        var returned = this;

        // Apply the objects properties to the object.
        for (prop in object) {
            returned[prop] = object[prop];
        }

        // Run the callback.
        if (callback) if (callback.Function) callback();

        // Return the new object.
        return returned;
    };

    // Add fuse to Arrays.
    Array.prototype.fuse = function () {
        // Save the arrays and the callback for quicker access.
        var arrays = arguments[0];
        var callback = arguments[1];

        // Make the current array, the array that the values are pushed to.
        var returned = [];

        // Push all the values.
        arrays.forEach(function (array) {
            array.forEach(function (value) {
                returned.push(value);
            });
        });

        // Run the callback.
        if (callback) if (callback.Function) callback();

        // Return the new array.
        return returned;
    };

    // Add merge to objects and arrays.
    Object.prototype.merge = function () {
        // Save the objects and the callback for quicker access.
        var objects = arguments[0];
        var callback = arguments[1];

        // Create a new object to apply the properties to.
        var returned = {};

        // Apply the objects properties to the new object.
        objects.forEach(function (object) {
            for (prop in object) {
                returned[prop] = object[prop];
            }
        });

        // Run the callback.
        if (callback) if (callback.Function) callback();

        // Return the new object.
        return returned;
    };

    // Create the onloadtasks array.
    ally.data.onloadtasks = [];

    // Create the ally.onload function.
    ally.extend({
        onload: function () {
            // Write the function to the data object.
            ally.data.onloadtasks.push(arguments[0]);
            return ally.data.onloadtasks;
        },
        ready: ally.onload
    });

    // Make the function that will actually run those.
    var init = function () {
        // Check if the document is ready.
        if (document.readyState === "complete") {
            // Run the functions.
            ally.data.onloadtasks.forEach(function (statement) {
                statement();
            });

            // Delete init to prevent the functions from running again.
            delete init;
        }
        else {
            // If the document isn't ready, check again later.
            setTimeout(init, 10);
        }
    };

    // Now run it.
    init();

    // Add and remove elements.
    ally.extend({
        add: function () {
            // Save the type, selector, and calback for quicker access.
            var type = arguments [0];
            var selector = arguments[1];
            var callback = arguments[2];

            // Make an empty retuned array just to be safe.
            var returned = [];

            // Adjust the type.
            if (!type) {
                var parenttype = this[0].tagName;
                if (parenttype === 'BODY') type = 'div';
                if (parenttype === 'DIV') type = 'p';
                else type = 'span';
            }

            // Make the elements, asign the selectors and move them in.
            var returned = this.forEach(function (parent, index) {
                var element = document.createElement(type);
                parent.appendChild(element);

                if (selector) {
                    if (selector[0] === "#") {
                        if (index === 0) element.id = selector.replace('#','');
                        else element.id = selector.replace('#','') + "-" + index;
                    }
                    if (selector[0] === ".") {
                        element.className = selector.replace('.','');
                    }
                }

                return element;
            });

            // Return the new elements.
            return returned;
        },

        remove: function () {
            // Remove the element.
            var returned = this.forEach(function (element) {
                element.parentNode.removeChild(element);
            });
        }
    });

    // HTML manipulation methods.
    ally.extend({
        html: function () {
            // Save the desired HTML for quicker access.
            var html = arguments[0];

            // Make an empty returned array just to be safe.
            var returned = [];

            // Check if the HTML should change.
            if (html) {
                // Change it.
                var returned = this.forEach(function (element) {
                    return element.innerHTML = html;
                });
            }
            else {
                // Just return it.
                var returned = this.forEach(function (element) {
                    return element.innerHTML;
                });
            }

            // Return the HTML.
            return returned;
        },

        value: function () {
            // Save the desired value for quicker access.
            var value = arguments[0];

            // Make an empty returned array just to be safe.
            var returned = [];

            // Check if the value should change.
            if (value) {
                // Change it.
                var returned = this.forEach(function (element) {
                    return element.value = value;
                });
            }
            else {
                // Just return it.
                var returned = this.forEach(function (element) {
                    return element.value;
                });
            }

            // Return the value.
            return returned;
        },

        empty: function () {
            // Make an empty returned array just to be safe.
            var returned = [];

            // Change the HTML/value.
            var returned = this.forEach(function (element) {
                element.innerHTML = "";
                element.value = "";
                return "";
            });

            // Return the HTML/value.
            return returned;
        }
    });

    ally.extend({
        attr: function () {
            // Save the attribute and value for quicker access.
            var attribute = arguments[0];
            var value = arguments[1];

            // Make an empty returned array just to be safe.
            var returned = [];

            // Check if the attribute should be changed.
            if (value) {
                // Change it.
                if (this[0].setAttribute) {
                    this.forEach(function (element) {
                        element.setAttribute(attribute, value);
                    });
                }
                else {
                    this.forEach(function (element) {
                        element[attribute] = value;
                    });
                }
            }

            // Now return it.
            var returned = this.forEach(function (element) {
                return element[attribute];
            });
            return returned;
        },

        removeAttr: function () {
            // Save the attribute for quicker access.
            var attribute = arguments[0];

            // Make an empty returned array just to be safe.
            var returned = [];

            // Delete the attribute.
            if (this[0].removeAttribute) {
                var returned = this.forEach(function (element) {
                    element.removeAttribute(attribute);
                    return element.getAttribute(attribute);
                });
            }
            else {
                var returned = this.forEach(function (element) {
                    delete element[attribute];
                    return element[attribute];
                });
            }

            // Return the attributes.
            return returned;
        }
    });

    ally.extend({
        classes: function () {
            // Make an empty returned array just to be safe.
            var returned = [];

            // Get the classes and return them.
            var returned = this.forEach(function (element) {
                return element.className;
            });
            return returned;
        },

        addClass: function () {
            // Save the new class(es) for quicker access.
            var add = arguments[0];

            // Add it/them.
            this.forEach(function (element) {
                element.className = element.className + " " + add;
            });

            // Return the classes.
            return this.classes();
        },

        removeClass: function () {
            // Save the class(es) for quicker access.
            var remove = arguments[0];

            // Remove it/them.
            this.forEach(function (element) {
                element.className = element.className.replace(remove,'');
            });

            // Return the classes.
            return this.classes();
        }
    });

    ally.extend({
        css: function () {
            // Save the property, value, and priority for quicker access.
            var property = arguments[0];
            var value = arguments[1];
            var priority = arguments[2];

            // Adjust the priority.
            if (priority === undefined) priority = "";

            // Make an empty returned array just to be safe.
            var returned = [];

            // Check if the property should be changed.
            if (value) {
                // Change it.
                this.forEach(function (element) {
                    element.style.setProperty(property, value, priority);
                });
            }

            // Now return it.
            var returned = this.forEach(function (element) {
                if (element.style.getPropertyValue(property)) {
                    return element.style.getPropertyValue(property);
                }
                else {
                    return getComputedStyle(element).getPropertyValue(property);
                }
            });
            return returned;
        },

        removeProperty: function () {
            // Save the property.
            var property = arguments[0];

            // Make an empty returned array just to be safe.
            var returned = [];

            // Remove the property.
            this.forEach(function (element) {
                element.style.removeProperty(property);
            });

            // Return it.
            return this.css(property);
        },

        hide: function () {
            // Save the time and the callback for quicker access.
            var time = arguments[0];
            var callback = arguments[0];

            // If there's no time then default it.
            if (!time) time = 300;

            // Make an empty returned array just to be safe.
            var returned = [];

            // Maximize the settings in case it's already hidden.
            this.css('display', 'block')
            this.css('opacity', '1');

            // Figure out what the delay for the interval should be to match the specified time.
            var delay = time / 10;

            // Save the elements, because this would return window inside the interval.
            var elements = this;

            // Do the animating.
            var animation = setInterval(function () {
                var current = parseFloat(elements.css('opacity')[0]);
                if (current >= 0.15) {
                    elements.css('opacity', current - 0.1);
                }
                else {
                    elements.css('opacity', '0');
                    elements.css('display', 'none');
                    clearInterval(animation);
                }
            }, delay);

            if (callback) if (callback.Function) callback();
        },

        show: function () {
            // Save the time and the callback for quicker access.
            var time = arguments[0];
            var callback = arguments[0];

            // If there's no time then default it.
            if (!time) time = 300;

            // Make an empty returned array just to be safe.
            var returned = [];

            // Minimize the settings in case it's already visible.
            this.css('display', 'block')
            this.css('opacity', '0');

            // Figure out what the delay for the interval should be to match the specified time.
            var delay = time / 10;

            // Save the elements, because this would return window inside the interval.
            var elements = this;

            // Do the animating.
            var animation = setInterval(function () {
                var current = parseFloat(elements.css('opacity')[0]);
                if (current <= 0.85) {
                    elements.css('opacity', current + 0.1);
                }
                else {
                    elements.css('opacity', '1');
                    clearInterval(animation);
                }
            }, delay);

            if (callback) if (callback.Function) callback();
        }
    });

    ally.extend({
        event: function () {
            // Save the event type, the listener and useCapture for quicker access.
            var event = arguments[0];
            var listener = arguments[1];
            var capture = arguments[2];

            // Adjust.
            if (capture === undefined) capture = false;

            // Add the listeners.
            var returned = this.forEach(function (element) {
                element.addEventListener(event, listener, capture);
                return event;
            });

            // Return the events.
            return returned;
        }
    });

    ally.extend({
        absolute: function () {
            // Save the number for quicker access.
            var number = arguments[0];

            // Check if it's already positive.
            if (number >= 0) return number;

            // Or return the negative as a positive.
            else return number * -1;
        },

        opposite: function () {
            // Return the number times -1.
            return arguments[0] * -1;
        },

        average: function () {
            // Save the numbers for quicker access.
            var numbers = arguments[0];

            // Create the number we'll do the math on.
            var average = 0;

            // Add all the numbers.
            numbers.forEach(function (value) {
                average = average + value;
            });

            // Divid it by the number of numbers added and return the average.
            return average / numbers.length;
        },

        random: function () {
            // Save the minimum and maximum for quicker access.
            var min = parseInt(arguments[0]);
            var max = parseInt(arguments[1]);

            // Adjust them.
            if (!min) min = 0;
            if (!max || max < min) max = min + 10;

            // Make a random number.
            var random = Math.random();

            // Find the range.
            var range = max - min;

            // Make the random number fit that.
            random = random * range;

            // Round it if you want.
            if (arguments[2]) random = Math.round(random);

            // Push the number into the range and return the random number.
            return random + min;
        }
    });

    ally.extend({
        retrieve: function () {
            // Save the URL, method, headers, async setting, and callback for quicker access.
            var url = arguments[0];
            var method = arguments[1];
            var headers = arguments[2];
            var async = arguments[3];
            var callback = arguments[4];

            // Adjust.
            if (!method) method = "POST";
            if (!async) async = true;

            // Build and send a request.
            var xml = new XMLHttpRequest();
            xml.open(method, url, async);
            xml.send(headers);

            // Set the callback.
            if (callback) if (callback.Function) ally(xml).event('load', function () { callback(); });

            // Return the XML.
            return xml;
        },

        open: function () {
            // Save the URL, method, headers, async setting, and callback for quicker access.
            var url = arguments[0];
            var method = arguments[1];
            var headers = arguments[2];
            var async = arguments[3];
            var callback = arguments[4];

            // Adjust.
            if (!method) method = "POST";
            if (!async) async = true;

            // Build and send a request.
            var xml = new XMLHttpRequest();
            xml.open(method, url, async);
            xml.send(headers);

            // Change the HTML.
            this.forEach(function (element) {
                element.innerHTML = xml.responseText;
            });

            // Set the callback.
            if (callback) if (callback.Function) ally(xml).event('load', function () { callback(); });

            // Return the XML.
            return xml;
        },

        script: function () {
            // Save the URL for quicker access.
            var url = arguments[0];
            var callback = arguments[1];

            // Create a new script element.
            var script = document.createElement('script');

            // Give it a source.
            script.src = url;

            // Now put it in the head so it will load.
            document.head.appendChild(script);

            if (callback && callback.Function) callback();

            // Return the new element.
            return script;
        },

        stylesheet: function () {
            // Save the URL and media type for quicker access.
            var url = arguments[0];
            var media = arguments[1];

            // Adjust the media.
            if (!media) media = "all";

            // Create a new style element.
            var style = document.createElement('style');

            // Set the URL and media.
            style.innerHTML = "@import url('" + url + "') " + media + ";";

            // Put it in the head so it will load.
            document.head.appendChild(style);

            return style;
        }
    });

    ally.keys = {};

    ally.onload(function () {
        // Key down event.
        ally('body').event('keydown', function (event) {
            // A specific key.
            if (ally.keys[event.keyCode]) {
                // Key + shift.
                if (event.shiftKey) {
                    if (ally.keys[event.keyCode].shift) {
                        if (ally.keys[event.keyCode].shift.down) {
                            if (ally.keys[event.keyCode].shift.down.type === "Function") {
                                ally.keys[event.keyCode].shift.down();
                            }
                        }
                    }
                }
                // Just the key.
                else if (ally.keys[event.keyCode].down) {
                    if (ally.keys[event.keyCode].down.type === "Function") {
                        ally.keys[event.keyCode].down();
                    }
                }
            }
            // All keys.
            if (ally.keys['all']) {
                // Key + shift.
                if (event.shiftKey) {
                    if (ally.keys['all'].shift) {
                        if (ally.keys['all'.shift.down]) {
                            if (ally.keys['all'].shift.down.type === "Function") {
                                ally.keys['all'].shift.down();
                            }
                        }
                    }
                }
                // Just a key.
                else if (ally.keys['all'].down) {
                    if (ally.keys['all'].down.type === "Function") {
                        ally.keys['all'].down();
                    }
                }
            }
        });
        // Key up event.
        ally('body').event('keyup', function (event) {
            // A specific key.
            if (ally.keys[event.keyCode]) {
                // Key + shift.
                if (event.shiftKey) {
                    if (ally.keys[event.keyCode].shift) {
                        if (ally.keys[event.keyCode].shift.up) {
                            if (ally.keys[event.keyCode].shift.up.type === "Function") {
                                ally.keys[event.keyCode].shift.up();
                            }
                        }
                    }
                }
                // Just the key.
                else if (ally.keys[event.keyCode].up) {
                    if (ally.keys[event.keyCode].up.type === "Function") {
                        ally.keys[event.keyCode].up();
                    }
                }
            }
            // All keys.
            if (ally.keys['all']) {
                // Key + shift.
                if (event.shiftKey) {
                    if (ally.keys['all'].shift) {
                        if (ally.keys['all'.shift.up]) {
                            if (ally.keys['all'].shift.up.type === "Function") {
                                ally.keys['all'].shift.up();
                            }
                        }
                    }
                }
                // Just a key.
                else if (ally.keys['all'].up) {
                    if (ally.keys['all'].up.type === "Function") {
                        ally.keys['all'].up();
                    }
                }
            }
        });
    });

    // CSS3 Animator.
    ally.extend({
        transform: function () {
            // Save the property, value, and duration for quicker access.
            var property = arguments[0];
            var value = arguments[1];
            var duration = arguments[2];

            // Adjust.
            if (!property || !value) throw new Error('No property/value.');
            if (!is(duration)) duration = 1000;
            if (duration === "slow") duration = 1500;
            if (duration === "fast") duration = 500;

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
        }
    });

    // Now that I'm done, expose Ally to the global object.
    window.Ally = window.ally = window.$ = ally;
})(window);
