// Copyright 2012 iwfwia / ally

"use strict"

;(function () {

var dom,
ay = function () { return Q.apply( a.m, arguments ) },
global = this;

ay.env = {
  BROWSER: typeof window !== "undefined" && "document" in window && document.nodeType
}

if ( ay.env.BROWSER )
  dom = window.document

ay.version = '2.0-',
ay.is = function ( item ) { return item != null },
ay.b = {};

Function.prototype.is = function ( item ) {
  return item != null && item.constructor === this.prototype.constructor
};



Function.of = function ( base ) {
  return Function.is( base ) ?
    base :
    function () { return base }
};

Array.of = function ( base ) {
  var
  i = 0,
  array = [];
  
  if ( base != null && base.length )
    for (; i < base.length; i++)
      array.push( base[ i ] );
  else
    array = [ base ]
        
  return array;
};

String.of = function ( base ) {
  return !Function.is( base ) && typeof JSON !== "undefined" ?
    JSON.stringify( base ) :
    base.toString();
};

Number.of = function (number) {
  var result;
  
  return Number.is( number ) ?
    number :
    String.is( number ) && result = /(-)?[0-9]+\.?[0-9]*/.exec( number ) ?
      Number( result[ 0 ] ) :
      NaN;
};

function concentrate() {
  var
  out = this;
    
  return function () {
    var i = 0, prop,
    base = this,
    given = arguments,
    returned = {};
    
    for (; i < given.length; i++) {
      ;( function ( item ) {
        if ( String.is( item ) && given.length > i+1 )
          returned[ item ] = out.call( base, kid, given[ ++i ] )
        else
          for ( prop in item )
            if ( item.hasOwnProperty( prop ) )
              returned[ prop ] = out.call( base, prop, item[ prop ] )
      } )( given[ i ] );
    }
    
    return returned
  };
}

Function.prototype.put = concentrate.apply( function ( name, method ) {
  if ( Function.is( method ) ) {
    this.prototype[ name ] = function () {
      return method.apply( this, arguments );
    }
    
    this[ name ] = function (first) {
      return method.call.apply( method, arguments )
    }
  } else
    this.prototype[ name ] = this[ name ] = method
  
  return method
} )

Function.put( {
  concentrate: concentrate,
  
  enhance: function enhance( after ) {
    var
    old = this;
    
    return function () {
      var
      given = Array.of( arguments );
      given.push(
          old.apply( this, given )
      );
      
      return after.apply( this, given );
    }
  }
} )

Object.put( {
    merge: function merge() {
        // Save the object and the callback for quicker access.
        var goal = this,
            extensions = Array.of( arguments );
    
        // Apply the objects properties to the object.
        extensions.check( function ( extension ) {
            if ( ay.is(extension))
                extension.iterate( function ( item, prop ) {
                    goal[ prop ] = item;
                });
        });
    
        // Return the new object.
        return this;
    },

    iterate: function iterate(loop, playground) {
        var prop,
            loop = Function.of(loop),
            playground = playground || this;
        
        for (prop in this)
            if (a.is(this[prop]) && this[prop] !== this.constructor.prototype[prop])
                loop.apply(playground, [this[prop], prop, this]);
    }
} )

Array.put( {
    make: function make(loop) {
        var loop = ay.is(loop) ? Function.of(loop) : function (value) { return value },
            i = 0,
            returned = [];
            
        for (; i < this.length; i++)
            returned[i] = loop.apply(this, [this[i], i, this]);
        
        return returned;
    },
    
    check: function check(loop) {
        var loop = Function.of( loop ),
            i = 0, result;
    
        for (; i < this.length; i++) {
            result = loop.apply(this, [this[i], i, this]);
            
            if (Number.is(result))
                i += result;
        }
        
        return this;
    },
    
    find: function find(loop) {
        var hasPassed,
            loop = Function.of(loop),
            i = 0;
        
        for (; i < this.length && !a.is(hasPassed); i++)
            hasPassed = loop.apply(this, [this[i], i, this]);
            
        return hasPassed;
    },
    
    assign: function assign() {
        var array = this,
            names = Array.of(arguments),
            object = {};
        
        names.check(function (name, index) {
            if (String.is(name))
                object[name] = array[index];
        });
        
        return object;
    },
    
    has: function has(item) {
        return this.find(function (value, index) {
            if (value === item)
                return index;
        });
    },
    
    first: function first(prop) {
        return this.find(
            function (wife) {
                return a.is(wife) ? ( a.is(prop) ? wife[prop] : wife ) : null;
            }
        );
    }
} )

String.put( {
    'remove': function (string) {
        return this.replace(string, '');
    },
    
 /* 'trim': function () {
        var trimming = /^\s*(.*?)\s*$/;
        return this
            .replace(trimming, '$1');
    }, */
    
    'clean': function (squeaky) {
        var string = this,
            trimming = /^\s*(.*?)\s*$/,
            sweeping = /\s+/g;
            
        string = string
            .replace(trimming, '$1')
            .replace(sweeping, squeaky ? '' : ' ');
                
        return string;
    },
    
    'compare': function (glass) {
        if (RegExp.is(glass))
            return glass.exec(this);
        
        return String.of(this);
    },
    
    'hy': function () {
        return String.of(this)
            .replace(/_\s/g, '-')
            .replace(/[A-Z]/, function ($0) {
                return '-' + $0.toLowerCase();
            });
    },
    
    'up': function () {
        return String.of(this)
            .replace(/(-|_|\s)(.)/g, function ($0, $1, $2) {
                return $2.toUpperCase();
            });
    }
} )

Number.put( {
    center: function center( on, ox, nn, nx ) {
        return ( this - on ) * ( ( nx - nn ) / ( ox - on ) ) + nn;
    },

    abs: function abs() {
        // We times by 1 to make sure this becomes a number, not an object.
        return this * (this >= 0 ? 1 : -1);
    }
} )

dom.query = function ( selector ) {
    return document.querySelectorAll( selector );
};
 
function Q() {
    var found = [],
        selectors = Array.of(arguments),
        data = {};
    
    selectors.check(function (selector) {
        if (String.is(selector)) {
            var results = [],
                real = /^((.+?)\s*>\s*)?(<\s*(\S+).*>(.*<\/\4>)?)/.exec(selector),
                index = /#([0-9])$/.exec(selector);
            
            data.selector = selector;
            
            if (index) {
                selector = selector.remove(index[0]);
                index = index[1];
            }
            
            if (real) {
                var parents = real[1] ? Array.of(a(real[2])) : [document.body];
                
                results = parents.make(function (parent) {
                    parent.innerHTML += real[3];
                    return parent.lastChild;
                });
            } else
                results = dom.query(selector);
            
            if (index)
                results = [results[index]];
            
            found = a.fuse(found, results);
        } else
            found.push(selector);
    });
    
    found.ally(data);
    return found;
};

a.install = function (name, hi) {
    
};

a.m.deploy({
    'add': function (selector, base, callback) {
        if (!selector)
            throw "Ally:add: No selector. [0]";
        
        var items = this.selected,
            base = Object.is(base) ? base : {},
            splitter = /^([A-z0-9_-]+)((\.[A-z0-9_-]+)*)?(#([A-z0-9_-]+))?/;
            
        var pieces = splitter.exec(selector);
        
        if (pieces)
            var tag = pieces[1],
                classes = pieces[2],
                id = pieces[5];
        else
            throw "Ally:add: Error parsing selector.";

        // Make the elements, assign the selectors, apply the base, and move them in.
        var added = items.make(function (parent) {
            var element = document.createElement(tag);
            
            if (id)
                element.id = id;
            
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

    'remove': function (callback) {
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
        Function.say(callback, returned);

        // Return it.
        return returned;
    }
});

'html:innerHTML, href, value, id'
    .split(', ').check(function (details) {
        var details = details.split(':').assign('alias', 'name');
        
        if (!details.name)
            details.name = details.alias;
        
        var match = new RegExp('\\$' + details.alias, 'gi');
        
        a.m[details.alias] = function (init) {
            var items = this.selected,
                prop = details.name,
                returned;
            
            if (Number.is(init))
                returned = items[init][prop];
            else if (a.is(init)) {
                if (Function.is(init))
                    var slave = init;
                else if (Array.is(init))
                    var slave = function (current, index) {
                        return String.of(init[index % init.length]).replace(match, current)
                    };
                else
                    var value = String.of(arguments[0]),
                        slave = function (current) {
                            return value.replace(match, current);
                        };
                
                returned = items.make(function (item, index) {
                    return item[prop] = slave(item[prop], index);
                });
            } else
                returned = items.make(function (item) {
                    return item[prop];
                });
            
            returned.ally(this);
            
            return returned;
        };
    });

a.m.deploy({
    'prop': function (property, value, callback) {
        if (!property) throw "Ally:prop: No property. [0]";
        
        var items = this,
            property = String.up(property),
            returned;

        if (a.is(value))
            returned = items.make(function (item) {
                return item[property] = value;
            });
        else
            returned = items.make(function (item) {
                return item[property];
            });
        
        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned);

        return returned;
    },
    
    'attribute': function (attribute, value, callback) {
        if (!attribute) throw "Ally.attribute: No attribute. [0]";
        
        var items = this,
            attribute = String.hy(attribute);

        if (a.is(value)) {
            var returned = items.make(function (item) {
                // attr can act as prop if no setAttribute method is present.
                if (Function.is(item.setAttribute))
                    item.setAttribute(attribute, value);
                else
                    a(item).prop(attribute, value);
                    
                return value;
            });
        } else {
            var returned = items.make(function (item) {
                if (Function.is(item.getAttribute))
                    return item.getAttribute(attribute);
                else
                    return a(item).prop(attribute)[0];
            });
        }
        
        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned);

        return returned;
    },
    
    'data': function (attribute, value, callback) {
        if (!attribute) throw "Ally.data: No attribute. [0]";
        
        var items = this.selected,
            returned = items.attribute('data-' + attribute, value),
            numbool = /^(true|false|[0-9\.]+)$/;
            
        returned = returned.make(function (string) {
            if (numbool.test(string))
                return Function.say('return ' + string);
            return string;
        });
        
        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned);
        
        return returned;
    },

    'base': function (object, callback) {
        if (!object) throw "Ally.base: No base. [0]";
    
        // Save the object and callback for quicker access.
        var items = this.selected;

        // Set the attributes.
        object.iterate(function (value, prop) {
            var prop = String.up(prop);
                
            if (value !== object.constructor.prototype[prop]) {
                if (Function.is(items[prop]))
                    items[prop](value);
                else
                    items.attribute(prop, value);
            }
        });
            
        // Make something to return.
        var returned = items;
        
        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned);

        // Return it.    
        return returned;
    },

    'removeAttribute': function (attribute, callback) {
        if (!attribute) throw "Ally.removeAttribute: No attribute. [0]";
        
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
        Function.say(callback, returned);

        // Return the attributes.
        return returned;
    }
});

a.m.attr = a.m.attribute;
a.m.removeAttr = a.m.removeAttribute;

a.m.deploy({
    'run': function (method, submissions, callback) {
        var items = this.selected,
            returned = items.make(function (item) {
                return item[method].apply(item, submissions || []);
            });
        
        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned);
        
        // Return the results.
        return returned;
    }
});

a.m.deploy({
    'classes': function () {
        var items = this.selected;
        
        // Get the classes.
        var returned = items.make(function (item) {
            return item.className;
        });
        
        // Stacking data.
        returned.ally(this);

        return returned;
    },

    'addClass': function (names, callback) {
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
        Function.say(callback, returned);

        // Return the classes.
        return returned;
    },

    'removeClass': function (names, callback) {
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
        Function.say(callback, returned);

        // Return the classes.
        return returned;
    }
});

a.m.deploy({
    'css': function (init, second) {
        var items = this.selected;
        
        if (Object.is(init)) {
            var properties = arguments[0],
                returned = {},
                callback = Function.of(arguments[1]);
                
            properties.iterate(function (property, prop) {
                returned[prop] = items.css(prop, property);
            });
        } else {
            var property = String.hy(arguments[0]),
                value = arguments[1],
                priority = String.of(arguments[2]),
                callback = arguments[3];
            
            var prop = String.up(property);
                
            var regcomp = /^-comp-/,
                comp = regcomp.test(property);
            
            if (comp)
                property = property.remove(regcomp);
                
            var experimental;
            
            if (a.WebKit)
                experimental = "-webkit-" + property;
            else if (a.Firefox)
                experimental = "-moz-" + property;
            else if (a.Opera)
                experimental = "-o-" + property;
            else if (a.IE)
                experimental = "-ms-" + property;
            
            var returned = items.make(function (item) {
                var preset = null;
                
                if (item.style) {
                    if (a.is(value)) {
                        if (Object.is(value)) {
                            value.iterate(function (value, prop) {
                                items.css(property + '-' + prop, value);
                            });
                        } else {
                            if (Number.is(value)) {
                                value = value > 1 ? value + 'px' : value * 100 + '%';
                            } else 
                                value = String.of(value);
                            
                            if (item.style.setProperty) {
                                item.style.setProperty(property, value, priority);
                                if (experimental)
                                    item.style.setProperty(experimental, value, priority);
                            } else {
                                item.style[prop] = value;
                            }
                        }
                    }
                    
                    preset = item.getPropertyValue ? item.style.getPropertyValue(property) || item.style.getPropertyValue(experimental) : value;
                }
                
                return comp || !preset && window.getComputedStyle ? getComputedStyle(item, null).getPropertyValue(property) : preset;
            });
        }
        
        // Stacking data.
        returned.ally(this);

        // Run the callback.
        Function.say(callback, returned);

        return returned;
    },

    'ugly': function (property, callback) {
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
        Function.say(callback, returned);

        // Return it.
        return returned;
    },
    
    'hide': function () {
        this.css('display', 'none');
        
        return this;
    },
    
    'show': function (way) {
        var now = this.css('-comp-display', '')[0],
            way = String.of(way) || "block";
        if (now === "none")
            this.css('display', way);
        
        return this;
    },
    
    'toggle': function () {
        var visible = this.css('-comp-display')[0];
        switch (visible) {
            case "none":
                this.show();
            break;
            default:
                this.hide();
        }
        
        return this;
    }
});
   
var events = a.events = { id: [] };
 
a.m.deploy({
    'tie': function (init, second, third, fourth) {
        var items = this.selected;
            
        if (String.is(init)) {
            var names = arguments[0].split(','),
                listener = Function.of(arguments[1]);
            
            if (Boolean.is(third))
                var secure = arguments[2],
                    callback = arguments[3];
            else
                var callback = arguments[2];
        } else if (Function.is(init) && init.name) {
            return items.tie(arguments[0].name, arguments[0], second, third);
        } else {
            var returned = [];
            arguments[0].iterate(function (listener, event) {
                var id = items.tie(event, listener, second, third);
                returned = a.fuse(returned, id);
            });
            
            returned.ally(this);
            
            return returned;
        }
        
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
                    
                    if (a.is(i)) {
                        events[name].attachments[i].listeners.push(listener);
                    } else {
                        events[name].attachments.push({
                            name: item,
                            listeners: [listener]
                        });
                    }
                }
                
                if (Function.is(item.addEventListener))
                    item.addEventListener(name, listener, false);
            });
            
            // Make an id.
            events.id.push([name, listener])
            
            // The the event is the last item.
            return events.id.length - 1;
        });
        
        // Stacking data.
        returned.ally(this);
        
        // Run the callback.
        callback && callback.call( returned )
        
        return returned;
    },
    
    'cannon': function (cannons) {
        var items = this.selected,
            cannons = String.of(cannons).split(','),
            data = Array.of(arguments).slice(1);
        
        data[0] = data[0] || {};
        
        var hasType = !!data[0].type;
        
        var returned = cannons.make(function (cannon) {
            var cannon = cannon.clean(),
                names = events[cannon] ? events[cannon].attachments.make(function (attachment) {
                    return attachment.name;
                }) : [],
                results = 0;
            
            if (!hasType)
                data[0].type = cannon;
            
            items.check(function (item) {
                var i = names.has(item);
                    
                if (a.is(i)) {
                    events[cannon].attachments[i].listeners.check(function (listener) {
                        Function.of(listener).apply(item, data);
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
        
        return returned;
    },
    
    'cut': function (ids, callback) {
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
                
                if (a.is(i)) {
                    var i2 = events[name].attachments[i].listeners.has(listener);
                    events[name].attachments[i].listeners.splice(i2, 1);
                }
                
                if (a.type(item.removeEventListener) === "Function")
                    item.removeEventListener(name, listener, false);
            });
            
            return name;
        });
        
        // Stacking data.
        returned.ally(this);
        
        return returned;
    }
});

a.deploy({
    'cannon': function (cannons) {
        var cannons = String.of(cannons).split(','),
            data = Array.of(arguments).slice(1);
        
        data[0] = data[0] || {};
        
        var hasType = !!data[0].type;
        
        var returned = cannons.make(function (cannon) {
            var cannon = cannon.clean(),
                results = 0;
            
            if (!hasType)
                data[0].type = cannon;
            
            if (events[cannon]) {
                events[cannon].attachments.check(function (attachment) {
                    attachment.listeners.check(function (listener) {
                        Function.of(listener).apply(attachment.name, data);
                        results++;
                    });
                });
            }
            
            return results;
        });
        
        return returned;
    },
    
    'ready': function () {
        var listeners = Array.of(arguments),
            ready = document.readyState === "complete";
            
        listeners.check(function (listener) {
            a(global).tie('dom.ready', listener);
                
            if (ready) {
                listener(DOMReady);
            }
        });
        
        return ready;
    }
});

var DOMReady = false;

a(document)
    .tie('DOMContentLoaded', function (event) {
        if (!DOMReady) {
            a.cannon('dom.ready', event);
            DOMReady = event;
        }
    })
    .tie('readystatechange', function (event) {
        if (document.readyState === "complete" && !DOMReady) {
            a.cannon('dom.ready', event);
            DOMReady = event;
        }
    });

a(global)
    .tie('load', function (event) {
        if (!DOMReady) {
            a.cannon('dom.ready', event);
            DOMReady = event;
        }
    });

a.ready(function () {
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
        
});

'load, bottom, click, drag@dragstart, drop@dragend, mousemove, mouseover, mouseout, enter@keydown:13, escape@keydown:27'
    .clean(true).split(',').check(function (details) {
        var details = details.split('@').assign('alias', 'name');
        
        if (!details.name)
            details.name = details.alias;
        
        a.m[details.alias] = function (init) {
            var items = this.selected,
                listeners = Array.of(arguments);
            
            if (!init)
                return this.cannon(details.name);
            
            var returned = listeners.make(function (listener) {
                return items.tie(details.name, listener);
            });
            
            returned = a.fuse.apply(a, returned);
            
            returned.ally(this);
            
            return returned;
        };
    });

a.m.attach = a.m.tie;
a.m.detach = a.m.cut;

a(global).tie('scroll', function (event) {
    if (this.scrollY + this.innerHeight >= document.documentElement.scrollHeight)
        a(global).cannon('bottom', event);
});

a.deploy({
    'average': function () {
        var numbers = Array.of(arguments),
            average = 0;

        numbers.check(function (value) {
            average += value / numbers.length;
        });

        return average;
    },

    'random': function (init, second) {
        if (a.is(second))
            var min = Number.of(arguments[0]),
                max = Number.of(arguments[1]),
                random = Math.random().center(0, 1, min, max);
        else if (a.is(init))
            var digits = Number.of(arguments[0]),
                random = Math.random() * Math.pow(10, digits);
        
        return a.is(random) ? Math.round(random) : Math.random();
    }
});

a.deploy({
    'merge': function () {
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
    
    'fuse': function () {
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
        
    'zip': function () {
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

a.deploy({
    'fetch': function (init) {
        if (Object.is(init))
            var settings = arguments[0],
                sources = Array.is(settings.url) ? settings.url : String.of(settings.url).split(','),
                callback = arguments[1];
        else
            var sources = Array.is(init) ? arguments[0] : String.of(arguments[0]).split(','),
                settings = arguments[1] || {},
                callback = arguments[2];
        
        if (!sources.length) throw "Ally.fetch: No url. [0]";
        
        var method = settings.method ? String.of(settings.method).toLowerCase() : 'get',
            auto = a.is(settings.auto) ? settings.auto : true;
        
        if (!method.compare(/^(get|head|post)$/))
            method = 'get';
        
        var returned = sources.make(function (url) {
            var query = "",
                url = url.clean(),
                xhr = new XMLHttpRequest();
                
            if (settings.data) {
                if (String.is(settings.data))
                    query = settings.data;
                else
                    settings.data.iterate(function (value, prop) {
                        query += (query ? '&' + prop : prop) + '=' + escape(value);
                    });
                
                if (method !== 'post')
                    url += '?' + query;
            }
            
            xhr.open(method, url, true);
            
            if (settings.headers)
                settings.headers.iterate(function (header, prop) {
                    xhr.setRequestHeader(prop, String.of(header));
                });
                    
            settings.iterate(function (value, prop) {
                if (prop.compare(/^on/))
                    xhr[prop] = value;
            });
    
            a(xhr)
                .tie('load', function () {
                    var status = xhr.statusText.clean(true).toLowerCase();
                    
                    if (auto) {
                        var type = xhr.getResponseHeader('Content-Type') || "text/plain";
                            
                        if (type.compare(/(application|text)\/(html|xml)/) && a.is(auto) && !Boolean.is(auto) && xhr.status < 400)
                            a(auto).html(this.responseText);
                        
                        if (type.compare(/(application|text)\/(x-)?(ecmascript|javascript)/) && xhr.status < 400)
                            Function.shout(this.responseText);
                            
                        if (type.compare(/(application|text)\/(x-)?(json)/) && xhr.status < 400)
                            this.responseJSON = JSON.parse(this.responseText);
                        
                        if (type.compare(/(text)\/(css)/) && xhr.status < 400)
                            a(document.head).add('style', {
                                html: this.responseText
                            });
                    }
                
                    if (xhr.status < 400) {
                        a(xhr).cannon('success', xhr);
                    } else {
                        a(xhr).cannon('failure', xhr);
                    }
                    
                    a(xhr)
                        .attach('code:' + xhr.status, settings['on' + xhr.status])
                        .attach('status:' + status, settings['on' + status])
                        
                        .cannon('code:' + xhr.status, xhr)
                        .cannon('status:' + status, xhr);
                })
                .tie('load', callback);
            
            if (!xhr.addEventListener)
                var loadInt = setInterval(function () {
                    if (xhr.readyState === 4) {
                        a(xhr).cannon('load');
                        clearInterval(loadInt);
                    }
                }, 100);
    
            // Load it.
            xhr.send(method === 'post' ? query : null);
            
            return xhr;
        });
        
        returned.ally();
        
        return returned;
    }
});

a.once = function ( once ) {
  !once.used && [
    once.call.apply( once, arguments ),
    once.used = true ]
  return !once.used
}

var keys = a.keys = { 'once': true, 'down': {}, 'names': {} };

;(function () {
    // This needs to be wrapped seperately from everything else.
    // i needs to be 1 lower then the first keycode, because of how we increment.
    // Also, I love auto generation.
    
    // Directions
    var i = 36,
        directions = 'left, up, right, down'.split(', ');
    for (; i++ < 40;)
        keys.names[i] = directions[i - 37];
    
    // Numbers
    var i = 47;
    for (; i++ < 57;)
        keys.names[i] = i - 48;
    
    // Letters
    var i = 64,
        alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (; i++ < 90;)
        keys.names[i] = alphabet.charAt(i - 65);
    
    // F1-12
    var i = 111;
    for (; i++ < 123;)
        keys.names[i] = "F" + (i - 111);
}).apply(this);

a(global)
    .tie('keydown, keyup', function (event) {
        if (event.type === "keyup" || !keys.down[event.keyCode] || !keys.once) {
            var pre = event.type + ':' +
                    (event.ctrlKey ? '^' : '') +
                    (event.altKey ? '%' : '') +
                    (event.shiftKey ? '!' : '') +
                    (event.metaKey ? '#' : '');
                
            event.keyName = keys.names[event.keyCode];
            
            if (!a(global, event.target).cannon(pre + event.keyCode, event)[0] + !a(global, event.target).cannon(pre + event.keyName, event)[0])
                a(global, event.target).cannon(pre + '*', event);
        }
        
        keys.down[event.keyCode] = event.type === "keydown";
    })

    .tie('deviceorientation, MozOrientation', function (event) {
        a.pitch = event.beta || event.y * 90 || 0;
        a.roll = event.gamma || event.x * 90 || 0;
        
        a.cannon('ally.orientation', { 'pitch': a.pitch, 'roll': a.roll });
    });

// Location is not enabled by default because it prompts the user for permission.
a.location = function () {
    if (navigator.geolocation)
        navigator.geolocation.watchPosition(function (location) {
            a.longitude = location.coords.longitude || 0;
            a.latitude = location.coords.latitude || 0;
            
            Ally.cannon('ally.located', { 'longitude': a.longitude, 'latitude': a.latitude });
        });
};

// Set these properties to 0 so if they aren't supported by the browser, you can still "use" them.
'latitude, longitude, pitch, roll'
    .split(', ').check(function (name) { a[name] = 0 });

// Expose.
'a, Ally'
    .split(', ').check(function (alias) {
        global[alias] = a.deploy(global[alias]);
    });

}).apply(this);




