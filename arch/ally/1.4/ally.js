/*
  Ally / Your JavaScript bff. Copyright 2011, McKayla Washburn, MIT license.
*/



;(function () {

"use strict";

function $() { return Q.apply(m, arguments) };

var global = $.global = this,
    document = global.document || {},
    navigator = global.navigator || {},

    version = $.version = '1.4',
    m = $.m = {},
    ua = $.ua = navigator.userAgent;

$.is = function (item) { return item !== void 0 && item !== null };
$.type = function (item) { return $.is(item) ? item.constructor.TYPE : "undefined" };

if (!document.head && ua)
    document.head = (function () {
        var head = document.getElementsByTagName('head')[0];

        if (head)
            return head;

        var html = document.documentElement,
            head = document.createElement('head');

        html.appendChild(head);

        return head;
    })();

if (/Chrome\//.test(ua))
    $.Chrome = /Chrome\/([0-9\.]+)/.exec(ua)[1];

if (/Firefox\//.test(ua))
    $.Firefox = /Firefox\/([0-9\.A-z]+)/.exec(ua)[1];

if (/Version\/.+Safari\//.test(ua))
    $.Safari = /Version\/([0-9\.]+)/.exec(ua)[1];

if (/Opera\/.+Version\//.test(ua))
    $.Opera = /Version\/([0-9\.]+)/.exec(ua)[1];

if (/MSIE/.test(ua))
    $.IE = /MSIE ([0-9\._]+)[\);]/.exec(ua)[1];

if (/AppleWebKit\//.test(ua))
    $.WebKit = /AppleWebKit\/([0-9\.]+)/.exec(ua)[1];

if (/rv.+Gecko\//.test(ua))
    $.Gecko = /rv:([0-9\.A-z]+)[\);]/.exec(ua)[1];

if (/Presto\//.test(ua))
    $.Presto = /Presto\/([0-9\.]+)/.exec(ua)[1];

if (/Trident\//.test(ua))
    $.Trident = /Trident\/([0-9\._]+)[\);]/.exec(ua)[1];

if (/like Mac OS X/.test(ua)) {
    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
    $.iPhone = /iPhone/.test(ua);
    $.iPad = /iPad/.test(ua);
}

if (/Android/.test(ua))
    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

if (/webOS\//.test(ua))
    $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

if (/(Intel|PPC) Mac OS X/.test(ua))
    $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

if (/Windows NT/.test(ua))
    $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

if (/Linux/.test(ua))
    $.Linux = true;

Function.prototype.marry = function (wife, kids) {
    var husband = this;

    return function () {
        return husband.apply(wife, arguments.length ? arguments : kids);
    };
};

Function.prototype.give = function (init) {
    var proto = {},
        head = this;

    if ($.type(init) === "String")
        proto[arguments[0]] = arguments[1];
    else if ($.type(init) === "Function")
        proto = new init(); // omg this is so terrible, proto.iterate will literally not get any inheritance out of this
    else if ($.is(init))
        proto = arguments[0];

    proto.iterate(function (value, prop) {
        if ($.type(value) === "Function")
            head[prop] = function () {
                var extra = Array.of(arguments);
                return proto[prop].apply(extra.shift(), extra);
            };
        else
            head[prop] = value;

        head.prototype[prop] = value;
    });

    return this;
};

Function.say = function (husband, wife, kids, names) {
    var wife = $.is(wife) ? wife : global,
        kids = kids || [],
        names = names || [];

    // "Evalutate" it.
    return Function.of(husband, names).apply(wife, kids);
};

Function.shout = function (statement) {
    if ($.type(statement) === "Function")
        var statement = /function\s*[$_A-z0-9]*\(.*?\)\s*{(.*)}/.exec(String.of(statement))[1];
    else
        var statement = String.of(statement);

    var script = document.createElement('script');
    script.innerHTML = statement;

    document.head.appendChild(script);
    document.head.removeChild(script);
};

Function.of = function (statement, names) {
    var names = Array.of(names);
    // If it's a function..
    if ($.type(statement) === "Function")
        return statement;

    if ($.is(statement))
        return new Function(names, statement);

    return function () {};
};

Object.prototype.deploy = function (extension, settings) {
    // Save the object and the callback for quicker access.
    var goal = this,
        extensions = Array.of(arguments);

    // Apply the objects properties to the object.
    extensions.check(function (extension) {
        if ($.is(extension))
            extension.iterate(function (item, prop) {
                goal[prop] = item;
            });
    });

    // Return the new object.
    return this;
};

Object.prototype.iterate = function (loop, playground) {
    var prop,
        loop = $.is(loop) ? Function.of(loop) : function (value) { return value },
        playground = playground || this;

    for (prop in this)
        if ($.is(this[prop]) && this[prop] !== this.constructor.prototype[prop])
            loop.apply(playground, [this[prop], prop, this]);
};

Object.prototype.ally = function (data) {
    var data = data || {};

    this.selected = data.selected || this;
    this.deploy(m);

    return this;
};

Array.prototype.make = function (loop) {
    var loop = $.is(loop) ? Function.of(loop) : function (value) { return value },
        i = 0,
        returned = [];

    for (; i < this.length; i++)
        returned[i] = loop.apply(this, [this[i], i, this]);

    return returned;
};

Array.prototype.check = function (loop) {
    var loop = $.is(loop) ? Function.of(loop) : function (value) { return value },
        i = 0;

    for (; i < this.length; i++)
        loop.apply(this, [this[i], i, this]);

    return this;
};

Array.prototype.find = function (loop) {
    var hasPassed,
        loop = $.is(loop) ? Function.of(loop) : function (value) { return value },
        i = 0;

    for (; i < this.length && !$.is(hasPassed); i++)
        hasPassed = loop.apply(this, [this[i], i, this]);

    return hasPassed;
};

Array.prototype.assign = function () {
    var array = this,
        names = Array.of(arguments),
        object = {};

    names.check(function (name, index) {
        if ($.type(name) ==="String")
            object[name] = array[index];
    });

    return object;
};

Array.prototype.has = function (item) {
    return this.find(function (value, index) {
        if (value === item)
            return index;
    });
};

Array.of = function (item) {
    var i,
        array = [],
        item = item || [];

    for (i = 0; i < item.length; i++)
        array.push(item[i]);

    return array;
};

String.prototype.remove = function (string) {
    return this.replace(string, '');
};

String.prototype.clean = function (squeaky) {
    var string = this,
        trimming = /^\s*(.*?)\s*$/,
        sweeping = /\s+/g;

    string = string
        .replace(trimming, '$1')
        .replace(sweeping, squeaky ? '' : ' ');

    return string;
};

String.prototype.compare = function (glass) {
    if ($.type(glass) === "RegExp")
        return glass.exec(this);

    return String.of(this);
};

String.of = function (item) {
    return $.is(item) ? item + "" : "";
};

Number.prototype.center = function () {
    var number = this,
        old = { min: 0 },
        next = { min: 0 };

    if (arguments.length === 2) {
        old.max = old.diff = arguments[0];
        next.max = next.diff = arguments[1];
    } else if (arguments.length === 4) {
        old.deploy({
            min: arguments[0],
            max: arguments[1]
        }).diff = old.max - old.min;

        next.deploy({
            min: arguments[2],
            max: arguments[3]
        }).diff = next.max - next.min;
    }

    number -= old.min;
    number /= old.diff;
    number *= next.diff;
    number += next.min;

    return number;
};

Number.prototype.abs = function () {
    return this >= 0 ? this * 1 : this * -1;
};

Number.prototype.opp = function () {
    return this * -1;
};

Number.of = function (number) {
    if ($.type(number) === "Number")
        return number;

    var number = String.of(number),
        regnum = /(-)?[0-9]+\.?[0-9]*/.exec(number);

    return regnum ? Function.say('return ' + regnum[0]) : 0;
};

// First set a default.
Function.prototype.TYPE = "Object";

// Removing this breaks the code because of some deeply rooted dependencies on $.type.
Function.TYPE = "Function";

// We include Function anyway, for Function.is and $.isFunction.
'Function, Object, Array, RegExp, String, Number, Boolean, Date'
    .clean(true).split(',').check(function (type) {
        var constructor = global[type];

        if ($.is(constructor)) {
            constructor.TYPE = type;

            $['is' + type] = constructor.is = function (item) {
                return $.type(item) === type;
            };
        }
    });

var Q = function (init) {
    var found = [];

    if ($.type(init) === "String")
        var selector = Array.of(arguments).join(','),
            found = Array.of(document.querySelectorAll(selector));
    else
        var found = Array.of(arguments);

    found.ally();
    return found;
};

$.m.deploy({
    add: function (selector, base, callback) {
        if (!selector)
            throw "Ally.add: No selector. [0]";

        var items = this.selected,
            base = $.type(base) === "Object" ? base : {},
            splitter = /^([A-z0-9_-]+)((\.[A-z0-9_-]+)*)?(#[A-z0-9_-]+)?/;

        var pieces = splitter.exec(selector);

        if (pieces)
            var tag = pieces[1],
                classes = pieces[2],
                id = pieces[4];
        else
            throw "Ally.add: Error parsing selector.";

        // Make the elements, assign the selectors, apply the base, and move them in.
        var added = items.make(function (parent) {
            var element = document.createElement(tag);

            if (id)
                element.id = id.substring(1);

            if (classes)
                element.className = classes.replace(/\./g, ' ').clean();

            parent.appendChild(element);
            return element;
        }).deploy(m);

        added.ally().base(base);

        var returned = added.make().deploy({
            added: added
        });

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, added, [global]);

        // Return the new elements.
        return returned;
    },

    remove: function (callback) {
        var items = this.selected;

        // Remove the element.
        var returned = items.make(function (element) {
            var parent = element.parentNode;

            parent.removeChild(element);

            return parent;
        });

        // Stacking data.
        // No this, because we want the parents to be selected.
        returned.ally();

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return it.
        return returned;
    }
});

$.m.deploy({
    fill: function (fill, callback) {
        var items = this.selected;

        // Check if the value should change.
        if ($.is(fill)) {
            var fill = String.of(fill).clean();
            if (fill.compare(/#content/i)) {
                var returned = items.make(function (item, index) {
                    var value = $(item).fill()[0];

                    var number = Number.of(value),
                        template = value.replace(number, '%number%');

                    var equation = fill.replace(/#content/gi, 'number'),
                        result = Function.say('return ' + equation, null, [number], ['number']);

                    return item.innerHTML = item.value = template.replace('%number%', result);
                });
            }

            else {
                var returned = items.make(function (item, index) {
                    return item.innerHTML = item.value = fill.replace(/\$content/gi, $(item).fill()[0]);
                });
            }
        } else {
            var returned = items.make(function (item) {
                var bucket = $.is(item.value) || !$.is(item.innerHTML) ? 'value' : 'innerHTML';
                return String.of(item[bucket]).clean();
            });
        }

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return the value.
        return returned;
    },

    template: function (template, specifics) {
        var regblock = /{if:(.+?)}.+?{\/if:\1}/g;

        specifics.iterate(function (value, prop) {
            var regspecificblock = new RegExp('{if:(' + prop + ')}(.+?){/if:\\1}' , 'g'),
                regkey = new RegExp('{' + prop + '}', 'g');

            template = template
                .replace(regspecificblock, '$1')
                .replace(regkey, value);
        });

        template = template.remove(regblock);

        this.fill(template);
    }
});

$.m.deploy({
    prop: function (property, value, callback) {
        if (!property) throw "Ally.prop: No property. [0]";

        var items = this,
            property = String.of(property),
            numbool = /^(true|false|[0-9\.]+)$/;

        if ($.is(value)) {
            var returned = items.make(function (item) {
                item[property] = value;
                return value;
            });
        } else {
            var returned = items.make(function (item) {
                var string = item[property];

                if ($.type(string) === "String" && numbool.test(string))
                    return Function.say('return ' + string);
                return string;
            });
        }

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    attr: function (attribute, value, callback) {
        if (!attribute) throw "Ally.attr: No attribute. [0]";

        var items = this,
            attribute = String.of(attribute);

        if ($.is(value)) {
            var value = String.of(value).clean();
            var returned = items.make(function (item) {
                // attr can act as prop if no setAttribute method is present.
                if ($.type(item.setAttribute) === "Function")
                    item.setAttribute(attribute, value);
                else
                    item[attribute] = value;

                return value;
            });
        } else {
            var returned = items.make(function (item) {
                if ($.type(item.setAttribute) === "Function")
                    return item.getAttribute(attribute).clean();
                else
                    return item[attribute].clean();
            });
        }

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    data: function (attribute, value, callback) {
        if (!attribute) throw "Ally.data: No attribute. [0]";

        var items = this.selected,
            returned = items.attr('data-' + attribute, value),
            numbool = /^(true|false|[0-9\.]+)$/;

        returned = returned.make(function (string) {
            if (numbool.test(string))
                return Function.say('return ' + string);
            return string;
        });

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    base: function (object, callback) {
        if (!object) throw "Ally.base: No base. [0]";

        // Save the object and callback for quicker access.
        var prop, nprop,
            items = this.selected;

        // Set the attributes.
        object.iterate(function (value, prop) {
            if (value !== object.constructor.prototype[prop]) {
                nprop = prop
                    .replace(/[A-Z]/g, '-$&')
                    .replace(/_/g, '-')
                    .toLowerCase();

                if (prop.compare(/^((inner)?html|value)$/i))
                    items.fill(value);
                else if (/^css$/i.test(prop))
                    items.css(value);
                else
                    items.attr(nprop, value);
            }
        });

        // Make something to return.
        var returned = items;

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return it.
        return returned;
    },

    removeAttr: function (attribute, callback) {
        if (!attribute) throw "Ally.removeAttr: No attribute. [0]";

        var items = this.selected,
            attribute = String.of(attribute);

        // Delete the attribute.
            var returned = items.make(function (item) {
                if (item.removeAttribute)
                    item.removeAttribute(attribute);
                else
                    delete item[attribute];
                return item[attribute];
            });

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return the attributes.
        return returned;
    }
});

$.m.deploy({
    run: function (method, submissions, callback) {
        var items = this.selected,
            returned = items.make(function (item) {
                return item[method].apply(item, submissions || []);
            });

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return the results.
        return returned;
    }
});

$.m.deploy({
    classes: function () {
        var items = this.selected;

        // Get the classes.
        var returned = items.make(function (element) {
            return element.className;
        });

        // Stacking data.
        returned.ally(this);

        return returned;
    },

    addClass: function (names, callback) {
        var items = this.selected,
            names = String.of(names);

        // Add them.
        items.make(function (item) {
            item.className = (item.className + " " + names).clean();
        });

        // Get the classes.
        // No returned.ally(this), because .classes does it for us.
        var returned = items.classes();

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return the classes.
        return returned;
    },

    removeClass: function (names, callback) {
        var items = this.selected,
            names = String.of(names).clean().split(' ');

        items.check(function (item) {
            var classes = item.className.clean().split(' ');

            names.check(function (name) {
                classes.check(function (value, index) {
                    if (value === name)
                        classes.splice(index, 1);
                });
            });

            item.className = classes.join(' ');
        });

        // Get the classes.
        // No returned.ally(this), because .classes does it for us.
        var returned = items.classes();

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return the classes.
        return returned;
    }
});

$.m.deploy({
    css: function (init) {
        var items = this.selected;

        if ($.type(init) === "Object") {
            var prop, nprop,
                properties = arguments[0],
                callback = Function.of(arguments[1]);

            properties.iterate(function (property, prop) {
                nprop = prop
                    .replace(/[A-Z]/g, '-$&')
                    .replace(/_/g, '-')
                    .toLowerCase();
                items.css(nprop, property);
            });

            var returned = properties;
        } else {
            var property = String.of(arguments[0]),
                value = arguments[1],
                priority = String.of(arguments[2]),
                callback = Function.of(arguments[3]);

            var regcomp = /^-comp-/,
                comp = regcomp.test(property);

            if (comp)
                property = property.remove(regcomp);

            var expProp = "";

            if ($.WebKit)
                expProp = "-webkit-";
            else if ($.Firefox)
                expProp = "-moz-";
            else if ($.Opera)
                expProp = "-o-";
            else if ($.IE)
                expProp = "-ms-";

            expProp += property;

            var returned = items.make(function (item) {
                var preset;
                if (item.style) {
                    if ($.is(value)) {
                        if ($.type(value) === "Object") {
                            var prop, nprop;
                            for (prop in value) {
                                nprop = property + '-' + prop.replace(/_/g, '-');
                                items.css(nprop, value[prop]);
                            }
                        } else {
                            if ($.type(value) === "Number")
                                value += "px";
                            else
                                value = String.of(value);

                            if (item.style.setProperty) {
                                item.style.setProperty(property, value, priority);
                                item.style.setProperty(expProp, value, priority);
                            }
                        }
                    }

                    if (item.style.getPropertyValue)
                        preset = item.style.getPropertyValue(property) || item.style.getPropertyValue(expProp);
                    else
                        preset = value;
                }

                if (getComputedStyle)
                    return !comp && preset ? preset : getComputedStyle(item, null).getPropertyValue(property);
                else
                    return preset || null;
            });
        }

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    ugly: function (property, callback) {
        var items = this.selected,
            properties = String.of(property).split(',');

        // Remove the property.
        items.check(function (item) {
            properties.check(function (property) {
                item.style.removeProperty(property);
            });
        });

        // Get the styles.
        var returned = items.css(property);

        // Run the callback.
        Function.say(callback, returned, [global]);

        // Return it.
        return returned;
    },

    hide: function () {
        this.css('display', 'none');

        return this;
    },

    show: function () {
        var now = this.css('-comp-display', '')[0];
        if (now === "none")
            this.css('display', 'block');

        return this;
    },

    toggle: function () {
        var visible = this.css('-comp-display')[0];
        switch (visible) {
            case "none":
                var now = this.css('-comp-display', '')[0];
                if (now === "none")
                    this.css('display', 'block');
            break;
            default:
                this.css('display', 'none');
        }

        return this;
    }
});

var events = $.events = { id: [] };

$.m.deploy({
    attach: function (names, listener, third, fourth) {
        var items = this.selected,
            names = String.of(names).split(',');

        if ($.type(third) === "Boolean")
            var secure = arguments[2],
                callback = arguments[3];
        else
            var callback = arguments[2];


        var returned = names.make(function (name) {
            var name = name.clean();

            if (!secure) {
                events[name] = events[name] || { attachments: [] };

                // What already exists and where?
                var existing = events[name].attachments.make(function (attachment) {
                    return attachment.name;
                });
            }

            // Add the events.
            items.check(function (item) {
                if (!secure) {
                    var i = existing.has(item);

                    if ($.is(i)) {
                        events[name].attachments[i].listeners.push(listener);
                    } else {
                        events[name].attachments.push({
                            name: item,
                            listeners: [listener]
                        });
                    }
                }

                if ($.type(item.addEventListener) === "Function")
                    item.addEventListener(name, listener, false);
                else if (item.attachEvent)
                    item.attachEvent('on' + name, listener.marry(item));
            });

            // Make an id.
            events.id.push([name, listener])

            // The the event is the last item.
            return events.id.length - 1;
        });

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    cannon: function (cannons, data, callback) {
        var items = this.selected,
            cannons = String.of(cannons).split(','),
            data = data || {},
            hasType = !!data.type;

        var returned = cannons.make(function (cannon) {
            var cannon = cannon.clean(),
                names = events[cannon] ? events[cannon].attachments.make(function (attachment) {
                    return attachment.name;
                }) : [],
                results = 0;

            if (!hasType)
                data.type = cannon;

            items.check(function (item) {
                var i = names.has(item);

                if ($.is(i)) {
                    events[cannon].attachments[i].listeners.check(function (listener) {
                        listener.apply(item, [data]);
                        results++;
                    });
                }

                if (item["on" + cannon]) {
                    Function.say(item["on" + cannon], item, [data], ['event']);
                    results++;
                }
            });

            return results;
        });

        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    detach: function (ids, callback) {
        var items = this.selected,
            ids = Array.of(ids);

        var returned = ids.make(function (id) {
            var details = events.id[id].assign('name', 'listener'),
                name = details.name,
                listener = details.listener;

            var existing = events[name].attachments.make(function (attachment) {
                return attachment.name;
            });

            // Remove the events.
            items.check(function (item) {
                var i = existing.has(item);

                if ($.is(i)) {
                    var i2 = events[name].attachments[i].listeners.has(listener);
                    events[name].attachments[i].listeners.splice(i2, 1);
                }

                if ($.type(item.removeEventListener) === "Function")
                    item.removeEventListener(name, listener, false);
                else if (item.detachEvent)
                    item.detachEvent('on' + name, listener);
            });

            return name;
        });

        // Stacking data.
        returned.ally(this);

        return returned;
    }
});

$.deploy({
    cannon: function (cannons, data, callback) {
        var cannons = String.of(cannons).split(','),
            data = data || {},
            hasType = !!data.type;

        var returned = cannons.make(function (cannon) {
            var cannon = cannon.clean(),
                results = 0;

            if (!hasType)
                data.type = cannon;

            if (events[cannon]) {
                events[cannon].attachments.check(function (attachment) {
                    attachment.listeners.check(function (listener) {
                        listener.apply(attachment.name, [data]);
                        results++;
                    });
                });
            }

            return results;
        });

        returned.ally({ selected: [global] });

        // Run the callback.
        Function.say(callback, returned, [global]);

        return returned;
    },

    ready: function () {
        var listeners = Array.of(arguments),
            ready = document.readyState === "complete";

        listeners.check(function (listener) {
            $(global).attach('dom.ready', listener);

            if (ready) {
                listener(DOMReady);
            }
        });

        return ready;
    }
});

var DOMReady = false;

$(document)
    .attach('DOMContentLoaded', function (event) {
        if (!DOMReady) {
            $.cannon('dom.ready', event);
            DOMReady = event;
        }
    })
    .attach('readystatechange', function (event) {
        if (document.readyState === "complete" && !DOMReady) {
            $.cannon('dom.ready', event);
            DOMReady = event;
        }
    });

$(global)
    .attach('load', function (event) {
        if (!DOMReady) {
            $.cannon('dom.ready', event);
            DOMReady = event;
        }
    });

'load, click, drag:dragstart, drop:dragend'
    .clean(true).split(',').check(function (details) {
        var details = details.split(':').assign('alias', 'name');

        if (!details.name)
            details.name = details.alias;

        $.m[details.alias] = function () {
            var items = this.selected,
                listeners = Array.of(arguments);

            listeners.check(function (listener) {
                items.attach(details.name, listener);
            });

            return this;
        };
    });

$.deploy({
    average: function () {
        var numbers = Array.of(arguments),
            average = 0;

        numbers.check(function (value) {
            average += value / numbers.length;
        });

        return average;
    },

    random: function (init, second) {
        if ($.is(second))
            var min = Number.of(arguments[0]),
                max = Number.of(arguments[1]),
                random = Math.random().center(0, 1, min, max);
        else if ($.is(init))
            var digits = Number.of(arguments[0]),
                random = Math.random() * Math.pow(10, digits);

        return $.is(random) ? Math.round(random) : Math.random();
    }
});

$.deploy({
    merge: function () {
        var prop,
            objects = Array.of(arguments),
            returned = {};

        // Apply the objects properties to the new object.
        objects.check(function (object) {
            object.iterate(function (value, prop) {
                returned[prop] = value;
            });
        });

        // Return the new object.
        return returned;
    },

    fuse: function () {
        // Save the arrays for quicker access and make a new array to move them all into.
        var arrays = Array.of(arguments),
            returned = [];

        // Push all the values.
        arrays.check(function (array) {
            var array = Array.of(array);

            array.check(function (value) {
                returned.push(value);
            });
        });

        // Return the new array.
        return returned;
    },

    zip: function () {
        // Save the arrays for quicker access.
        var arrays = Array.of(arguments);

        // Make an array to build on.
        var returned = [];

        // Find the longest array.
        var lengths = arrays.make(function (array) {
                return array.length;
            }),
            longest = Math.max.apply(Math, lengths);

        for (var i = 0; i < longest; i++)
            returned[i] = [];

        arrays.check(function (array, index) {
            array.check(function (value, vindex) {
                returned[vindex][index] = value;
            });
        });

        return returned;
    }
});

var nocache = $.nocache = '';

$.forbidCache = function (should) {
    return nocache = $.nocache = should ? '?' + $.random(5) : '';
};

$.deploy({
    fetch: function (init) {
        if ($.type(init) === "Object")
            var settings = arguments[0],
                urls = String.of(settings.url).split(','),
                callback = Function.of(arguments[1]);
        else
            var urls = String.of(arguments[0]).split(','),
                settings = arguments[1] || {},
                callback = Function.of(arguments[2]);

        if (!urls[0]) throw "Ally.fetch: No url. [0]";

        var method = String.of(settings.method).toLowerCase() || 'get',
            data = $.type(settings.data) === "Object" ? settings.data : {},
            headers = $.type(settings.headers) === "Object" ? settings.headers : {},
            auto = $.is(settings.auto) ? settings.auto : true;

        var returned = urls.make(function (url, index, all) {
            var prop, datas = "",
                xhr = new XMLHttpRequest();

            url = url.clean() + nocache;

            if (data) {
                for (prop in data) {
                    if (data[prop] !== data.constructor.prototype[prop]) {
                        if (datas.length !== 0)
                            datas += "&";
                        datas += prop + "=" + escape(data[prop]);
                    }
                }
            }

            if (datas && method === 'get') {
                if (!/\?/.test(url)) {
                    url += "?";
                } else if (!/\&$/.test(url))
                    url += "&";
                url += datas
            }

            xhr.open(method, url, true);

            if (headers)
                headers.iterate(function (header, prop) {
                    xhr.setRequestHeader(prop, String.of(header));
                });

            $(xhr)
                .attach('load', callback)
                .attach('load', function () {
                    var status = xhr.statusText.clean(true).toLowerCase();

                    if (auto) {
                        var type = xhr.getResponseHeader('Content-Type');

                        var htmlAccepted = /(application|text)\/(html|xml)/,
                            jsAccepted = /(application|text)\/(x-)?(ecmascript|javascript)/,
                            jsonAccepted = /(application|text)\/(x-)?(json)/,
                            cssAccepted = /(text)\/(css)/;

                        if (htmlAccepted.test(type) && $.type(auto) !== "Boolean" && xhr.status < 400)
                            $(auto).fill(this.responseText);

                        if (jsAccepted.test(type) && xhr.status < 400)
                            Function.shout(this.responseText);

                        if (jsonAccepted.test(type) && xhr.status < 400)
                            this.responseJSON = JSON.parse(this.responseText);

                        if (cssAccepted.test(type) && xhr.status < 400)
                            $(document.head).add('style', {
                                html: this.responseText
                            });
                    }

                    var codeEvent = settings['on' + xhr.status],
                        statusEvent = settings['on' + status];

                    if (xhr.status < 400) {
                        Function.say(settings.onsuccess, xhr, [xhr]);
                        $(xhr).cannon('success');
                    } else {
                        Function.say(settings.onfailure, xhr, [xhr]);
                        $(xhr).cannon('failure');
                    }

                    if (codeEvent)
                        Function.say(codeEvent, xhr, [xhr]);

                    if (statusEvent)
                        Function.say(statusEvent, xhr, [xhr]);

                    $(xhr).cannon('code:' + xhr.status);
                    $(xhr).cannon('status:' + status);
                });

            if (!xhr.addEventListener && !xhr.attachEvent)
                var loadInt = setInterval(function () {
                    if (xhr.readyState === 4) {
                        $(xhr).cannon('load');
                        clearInterval(loadInt);
                    }
                }, 100);

            // Load it.
            xhr.send(method === "post" ? datas : void 0);

            return xhr;
        });

        returned.ally();

        return returned;
    },

    css: function () {
        var urls = Array.of(arguments);

        var returned = urls.make(function (url) {
            return $(document.head).add('link', {
                rel: "stylesheet",
                href: url + nocache
            }).added[0];
        });

        return returned;
    }
});

var onces = {};

$.deploy({
    once: function (callback, id) {
        var id = String.of(id) || callback;

        if (onces[id])
            return false;

        Function.say(callback);

        return onces[id] = true;
    }
});

var keys = $.keys = { once: true, down: {} };

$(global)
    .attach('keydown, keyup', function (event) {
        if (event.type === "keyup" || !keys.down[event.keyCode] || !keys.once) {
            var pre = event.type + ':' +
                    (event.ctrlKey ? '^' : '') +
                    (event.altKey ? '%' : '') +
                    (event.shiftKey ? '!' : '') +
                    (event.metaKey ? '#' : '');

            if (!$.cannon(pre + event.keyCode, event)[0])
                $.cannon(pre + '*', event);
        }

        keys.down[event.keyCode] = event.type === "keydown";
    })

    .attach('deviceorientation, MozOrientation', function (event) {
        $.pitch = event.beta || event.y * 90 || 0;
        $.roll = event.gamma || event.x * 90 || 0;

        $.cannon('ally.orientation', { pitch: $.pitch, roll: $.roll });
    });

// Location is not enabled by default because it prompts the user for permission.
$.location = function () {
    if (navigator.geolocation)
        navigator.geolocation.watchPosition(function (location) {
            $.longitude = location.coords.longitude || 0;
            $.latitude = location.coords.latitude || 0;

            Ally.cannon('ally.located', { longitude: $.longitude, latitude: $.latitude });
        });
};

// Set these properties to 0 so if they aren't supported by the browser, you can still "use" them.
'latitude, longitude, pitch, roll'
    .clean(true).split(',').check(function (name) { $[name] = 0 });

// Expose.
'$?, Ally'
    .clean(true).split(',').check(function (alias) {
        if (alias.compare(/\?$/)){
            alias = alias.remove(/\?$/);
            if ($.is(global[alias]))
                return;
        }
        global[alias] = $.deploy(global[alias])
    });

}).apply(this);
