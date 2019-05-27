/*
  Ally Toolkit 1.1. Copyright 2010-2011 McKayla Washburn.
*/

(function () {
    var ally = function (b) { return q(b) };

    ally.version = 1.1;
    ally.build = 59;
    ally.copyright = "Copyright 2010-2011 McKayla Washburn.";
    ally.integrity = ['bf5sd8bn6519sd89b8n4sd2f1b6dbd'];

    var q = function (selector) {
        if (selector === "body") {
            var elements = [document.body];
            elements = ally.methods(elements);
            return elements;
        } else if (ally.type(selector) === 'string') {
            var elements = ally.merge([[], document.querySelectorAll(selector)]);
            elements = ally.methods(elements);
            return elements;
        } else {
            return ally.version;
        }
    };

    ally.methods = function (target) {
        ally.merge([target, ally.pl]);
        ally.merge([target, pl]);
        return target;
    }

    ally.local = localStorage;

    pl = {
        add: function (type, selector) {
            var $me = {};
            if (!type) {
                $me.parenttype = this[0].tagName;
                if ($me.parenttype === "BODY") {
                    type = 'div';
                } else if ($me.parenttype === "P" || $me.parenttype === "A" || $me.parenttype === "SPAN") {
                    type = 'span';
                } else {
                    type = 'p';
                }
            }
            $me.returned = [];
            this.forEach(function(element, index){
                $me.returned[index] = document.createElement(type);
                element.appendChild($me.returned[index]);
                if (selector) {
                    if (selector[0] === "#") {
                        if (index === 0) {
                            $me.returned[index].id = selector.replace('#', '');
                        } else {
                            $me.returned[index].id = selector.replace('#', '') + "-" + index;
                        }
                    }
                    if (selector[0] === ".") {
                        $me.returned[index].className = selector.replace('.', '');
                    }
                }
            });
            return $me.returned;
        },

        remove: function () {
            this.forEach(function (element) {
                element.parentNode.removeChild(element);
            });
            return [];
        },

        html: function (html, callback) {
            var $me = {};
            $me.returned = [];
            if (html) {
                this.forEach(function (element, index) {
                    $me.returned[index] = element.innerHTML = html;
                });
            } else {
                this.forEach(function (element, index) {
                    $me.returned[index] = element.innerHTML;
                });
            }
            if (ally.type(callback) === 'function') {
                callback();
            }
            return $me.returned;
        },

        value: function (value, callback) {
            var $me = {};
            $me.returned = [];
            if (value) {
                this.forEach(function (element, index) {
                    $me.returned[index] = element.value = value;
                });
            } else {
                this.forEach(function (element, index) {
                    $me.returned[index] = element.value;
                });
            }
            if (ally.type(callback) === 'function') {
                callback();
            }
            return $me.returned;
        },

        empty: function (callback) {
            var $me = {};
            $me.returned = [];
            this.forEach(function (element, index) {
                $me.returned[index] = element.innerHTML = "";
            });
            if (ally.type(callback) === 'function') {
                callback();
            }
            return $me.returned;
        },

        attr: function (attribute, value, callback) {
            var $me = {};
            if (attribute) {
                $me.returned = [];
                if (value) {
                    this.forEach(function (element) {
                        element.setAttribute(attribute, value);
                    });
                }
                this.forEach(function (element, index) {
                    $me.returned[index] = element.getAttribute(attribute);
                });
                if (ally.type(callback) === 'function') {
                    callback();
                }
                return $me.returned;
            } else {
                return ally.dev.noargs;
            }
        },

        removeAttr: function (attribute, callback) {
            var $me = {};
            if (attribute) {
                $me.returned = [];
                this.forEach(function (element, index) {
                    element.removeAttribute(attribute);
                    $me.returned[index] = element.getAttribute(attribute);
                });
                if (ally.type(callback) === 'function') {
                    callback();
                }
                return $me.returned;
            } else {
                return ally.dev.noargs;
            }
        },

        classes: function (callback) {
            var $me = {};
            $me.returned = this.attr('className');
            if (ally.type(callback) === 'function') {
                callback();
            }
            return $me.returned;
        },

        addClass: function (newclass, callback) {
            var $me = {};
            if (newclass) {
                this.forEach(function (element, index) {
                    element.setAttribute('className', element.getAttribute('className') + " " + newclass);
                });
                if (ally.type(callback) === 'function') {
                    callback();
                }
                return this.classes();
            } else {
                return ally.dev.noargs;
            }
        },

        removeClass: function (removingclass, callback) {
            var $me = {};
            if (this) {
                if (removingclass) {
                    this.forEach(function (element, index) {
                        element.className = element.className.replace(removingclass, '');
                        return this.classes();
                    });
                    if (ally.type(callback) === 'function') {
                        callback();
                    }
                    return ally.dev.returnArray($me.returned);
                } else {
                    return ally.dev.noargs;
                }
            } else {
                return ally.dev.noelems;
            }
        },

        css: function (property, value, priority, callback) {
            var $me = {};
            if (!priority) {
                priority = "";
            }
            if (property) {
                $me.returned = [];
                if (value) {
                    this.forEach(function (element) {
                        element.style.setProperty(property, value, priority);
                        // return selected.style.getPropertyValue(property);
                    });
                }
                this.forEach(function (element, index) {
                    $me.returned[index] = window.getComputedStyle(element, null).getPropertyValue(property);
                });
                if (ally.type(callback) === 'function') {
                    callback();
                }
                return $me.returned;
            } else {
                return ally.dev.noargs;
            }
        },

        removeProperty: function (property, callback) {
            var $me = {};
            if (property) {
                $me.returned = [];
                this.forEach(function (element, index) {
                    element.style.removeProperty(property);
                    $me.returned[index] = null;
                });
                if (ally.type(callback) === 'function') {
                    callback();
                }
                return $me.returned;
            } else {
                return ally.dev.noargs;
            }
        },

        animate: function (property, value, priority, callback) {
            var $me = {};
            if (property) {
                if (value) {
                    if (this[0].style.getPropertyValue(property)) {
                        $me.originalvalue = parseFloat(this[0].style.getPropertyValue(property));
                    } else {
                        $me.originalvalue = parseFloat(this.css(property)[0]);
                    }
                    $me.extra = value.replace(parseFloat(value), 'VALUE');
                    $me.value = parseFloat(value);

                    if ($me.originalvalue < $me.value) {
                        $me.distanceperframe = ($me.value - $me.originalvalue) / 60 + 1;
                        $me.newvalue = Math.round($me.originalvalue) + Math.round($me.distanceperframe);
                    } else if ($me.originalvalue > $me.value) {
                        $me.distanceperframe = ($me.originalvalue - $me.value) / 60 + 1;
                        $me.newvalue = Math.round($me.originalvalue) - Math.round($me.distanceperframe);
                    } else {
                        return [value];
                    }
                    $me.newvalue = $me.extra.replace('VALUE', $me.newvalue);
                    this.css(property, $me.newvalue);
                    if ($me.newvalue != value) {
                        var elements = this;
                        setTimeout(function () {
                            elements.animate(property, value)
                        }, 10);
                        return [value];
                    } else {
                        if (ally.type(callback) === 'function') {
                            callback();
                        }
                    }
                } else {
                    return ally.dev.noargs;
                }
            } else {
                return ally.dev.noargs;
            }
        },

        hide: function (callback) {
            var $me = {};
            this.css('display', 'block');
            this.css('opacity', '1');
            var elements = this;
            $me.interval = setInterval(function () {
                elements.css('opacity', parseFloat(elements.css('opacity')) - 0.1);
                if (ally.type(elements.css('opacity')) === 'string') {
                    if (parseFloat(elements.css('opacity')) <= '0.1') {
                        elements.css('display', 'none');
                        clearInterval($me.interval);
                    }
                } else if (ally.type(elements.css('opacity')) === 'array') {
                    if (parseFloat(elements.css('opacity')[0]) <= 0.1) {
                        elements.css('display', 'none');
                        clearInterval($me.interval);
                        if (ally.type(callback) === 'function') {
                            callback();
                        }
                    }
                }
            }, 100)
        },

        show: function (callback) {
            var $me = {};
            this.css('display', 'block');
            this.css('opacity', '0.1');
            var elements = this;
            $me.interval = setInterval(function () {
                elements.css('opacity', parseFloat(elements.css('opacity')) + 0.1);
                if (ally.type(elements.css('opacity')) === 'string') {
                    if (elements.css('opacity') >= 0.9) {
                        elements.css('opacity', '1');
                        clearInterval($me.interval);
                    }
                } else if (ally.type(elements.css('opacity')) === 'array') {
                    if (parseFloat(elements.css('opacity')[0]) >= 0.9) {
                        elements.css('opacity', '1');
                        clearInterval($me.interval);
                        if (ally.type(callback) === 'function') {
                            callback();
                        }
                    }
                }
            }, 100)
        },

        event: function (event, script, capture, callback) {
            var $me = {};
            if (!capture) {
                capture = false;
            }
            $me.returned = [];
            this.forEach(function (element, index) {
                $me.returned[index] = element.addEventListener(event, script, capture);
            });
            if (ally.type(callback) === 'function') {
                callback();
            }
            return $me.returned;
        },

        open: function (url, method, async, callback) {
            xml = ally.retrieve(url, method, async);
            var elements = this;
            var xmlInterval = setInterval(function () {
                if (xml.statusText === 'OK' || xml.status === 200) {
                    elements.html(xml.responseText);
                    clearInterval(xmlInterval);
                    if (ally.type(callback) === 'function') {
                        callback();
                    }
                }
            }, 500);
        }
    }

    ally.pl = {};

    ally.dev = {
        noelems: "No elements selected.",
        noargs: "Not enough arguments.",
        invalidargs: "Invalid arguments."
    };

    ally.retrieve = function (url, method, async, callback) {
        if (!url) {
            return ally.dev.noargs;
        }
        if (!method) {
            method = "GET";
        }
        if (!async) {
            async = false;
        }
        var xml = new XMLHttpRequest();
        xml.open(method, url, async);
        xml.send();
        var xmlInterval = setInterval(function () {
            if (xml.status === 200) {
                if (ally.type(callback) === 'function') {
                    callback();
                }
                clearInterval(xmlInterval);
            } else if (xml.status === 404) {
                console.log("Sorry. :( I couldn't load the file you wanted. (" + xml.status + ')');
                clearInterval(xmlInterval);
            }
        }, 500);
        return xml;
    };

    ally.script = function (url, method, async, callback) {
        xml = ally.retrieve(url, method, async);
        var xmlInterval = setInterval(function () {
            if (xml.status === 200) {
                eval(xml.responseText);
                clearInterval(xmlInterval);
                if (ally.type(callback) === 'function') {
                    callback();
                }
            }
        }, 500);
        return xml;
    };

    ally.keys = {
        enable: function () {
            ally('body').event('keydown', function () {
                if (ally.keys[event.keyCode]) {
                    if (!event.shiftKey) {
                        if (ally.type(ally.keys[event.keyCode].down) === 'function') {
                            ally.keys[event.keyCode].down();
                        }
                    } else {
                        if (ally.type(ally.keys[event.keyCode].shift.down) === 'function') {
                            ally.keys[event.keyCode].shift.down();
                        }
                    }
                }
                if (ally.keys.all) {
                    if (ally.type(ally.keys.all.down) === 'function') {
                        ally.keys.all.down();
                    }
                }
            });
            ally('body').event('keyup', function () {
                if (ally.keys[event.keyCode]) {
                    if (!event.shiftKey) {
                        if (ally.type(ally.keys[event.keyCode].up) === 'function') {
                            ally.keys[event.keyCode].up();
                        }
                    } else {
                        if (ally.type(ally.keys[event.keyCode].shift.up) === 'function') {
                            ally.keys[event.keyCode].shift.up();
                        }
                    }
                }
                if (ally.keys.all) {
                    if (ally.type(ally.keys.all.up) === 'function') {
                        ally.keys.all.up();
                    }
                }
            })
        }
    }

    ally.absolute = function (number, callback) {
        if (number) {
            if (ally.type(callback) === 'function') {
                callback();
            }
            if (number < 0) {
                return number * -1;
            } else {
                return number;
            }
        }
    };

    ally.opposite = function (number, callback) {
        if (ally.type(callback) === 'function') {
            callback();
        }
        if (number) {
            return number * -1;
        }
    };

    ally.average = function (numbers, callback) {
        var $me = {};
        if (ally.type(numbers) === 'array') {
            $me.position = 0;
            $me.total = 0;
            ally.forEach(numbers, function (selected) {
                $me.total = $me.total + selected;
            });
            if (ally.type(callback) === 'function') {
                callback();
            }
            return $me.total / numbers.length;
        } else if (numbers) {
            return ally.dev.invalidargs;
        } else {
            return ally.dev.noargs;
        }
    };

    ally.random = function (beginning, end) {
        if (!beginning || ally.type(beginning) != 'number') {
            beginning = 0;
        }
        if (!end || ally.type(end) != 'number' || end <= beginning) {
            end = beginning + 100;
        }
        var $me = {};
        $me.range = end - beginning;
        return $me.random = Math.round((Math.random() * $me.range) + beginning);
    };

    ally.fuse = function (values, callback) {
        var $me = {};
        if (ally.type(values) === 'array') {
            $me.returned = [];
            values.forEach(function (array) {
                if (ally.type(array) === 'array') {
                    array.forEach(function (value) {
                        $me.returned.push(value);
                    });
                }
            });
            return $me.returned;
        } else if (values) {
            return ally.dev.invalidargs;
        } else {
            return ally.dev.noargs;
        }
    };

    ally.merge = function (values, callback) {
        var $me = {};
        if (ally.type(values) === 'array') {
            values.forEach(function (object) {
                for (prop in object) {
                    values[0][prop] = object[prop];
                }
            });
            return values[0];
        } else if (values) {
            return ally.dev.invalidargs;
        } else {
            return ally.dev.noargs;
        }
    };

    ally.type = function (string) {
        if (!ally.check(string)) {
            return undefined;
        }
        if (string.constructor === String) {
            return 'string';
        }
        if (string.constructor === Number) {
            return 'number';
        }
        if (string.constructor === Array) {
            return 'array';
        }
        if (string.constructor === Object) {
            return 'object';
        }
        if (string.constructor === Function) {
            return 'function';
        }
        if (string.constructor === Boolean) {
            return 'boolean';
        }
        if (string.constructor === RegExp) {
            return 'regexp';
        }
    };

    ally.check = function (item) {
        if (item || item === "" || item === 0) {
            return true;
        } else {
            return false;
        }
    }

    ally.time = function (useAMPM) {
        $me = {};
        $me.d = new Date();
        $me.hours = $me.d.getHours();
        $me.minutes = $me.d.getMinutes();
        $me.ampm = '';
        if ($me.hours === 0) {
            $me.hours = 12;
            $me.ampm = 'AM';
        } else if ($me.hours < 12 && useAMPM) {
            $me.ampm = ' AM';
        } else if ($me.hours >= 12 && useAMPM) {
            $me.hours = $me.hours - 12;
            $me.ampm = ' PM';
        }
        if ($me.minutes < 10) {
            $me.minutes = "0" + $me.minutes;
        }
        return $me.hours + ":" + $me.minutes + $me.ampm;
    };

    ally.date = function (formatted) {
        $me = {};
        $me.d = new Date();
        $me.day = $me.d.getDay();
        $me.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $me.month = $me.d.getMonth();
        $me.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $me.date = $me.d.getDate();
        $me.year = $me.d.getFullYear();
        if (formatted) {
            return $me.days[$me.day] + ', ' + $me.months[$me.month] + ' ' + $me.date + ' ' + $me.year;
        } else {
            return $me.month + 1 + "/" + $me.date + "/" + $me.year;
        }
    };

    (function () {
        var $me = {};
        $me.ua = navigator.userAgent;
        $me.chrome = $me.ua.indexOf('Chrome');
        $me.safari = $me.ua.indexOf('Safari');
        $me.webkit = $me.ua.indexOf('AppleWebKit');
        $me.firefox = $me.ua.indexOf('Firefox');
        $me.opera = $me.ua.indexOf('Opera');
        $me.ie = $me.ua.indexOf('MSIE');
        $me.version = $me.ua.indexOf('Version');
        $me.windows = $me.ua.indexOf('Windows NT');
        $me.mac = $me.ua.indexOf('Mac OS X');
        $me.ubuntu = $me.ua.indexOf('Ubuntu');
        $me.iPhone = $me.ua.indexOf('iPhone OS');
        $me.iPad = $me.ua.indexOf('iPad');
        $me.iPadVersion = $me.ua.indexOf('CPU OS');
        $me.windowsphone = $me.ua.indexOf('Windows Phone OS');
        $me.android = $me.ua.indexOf('Android');
        $me.googleTV = $me.ua.indexOf('GoogleTV');
        $me.webOS = $me.ua.lastIndexOf('webOS');
        $me.TV = $me.ua.indexOf('Large Screen');
        $me.mobile = $me.ua.indexOf('Mobile');
        if ($me.chrome != -1) {
            ally.chrome = parseFloat($me.ua[$me.chrome + 7] + $me.ua[$me.chrome + 8] + $me.ua[$me.chrome + 9]);
        }
        if ($me.safari != -1 && $me.chrome === -1) {
            ally.safari = parseFloat($me.ua[$me.version + 8] + $me.ua[$me.version + 9] + $me.ua[$me.version + 10]);
        }
        if ($me.webkit != -1) {
            ally.webkit = parseFloat($me.ua[$me.webkit + 12] + $me.ua[$me.webkit + 13] + $me.ua[$me.webkit + 14] + $me.ua[$me.webkit + 15] + $me.ua[$me.webkit + 16] + $me.ua[$me.webkit + 17]);
        }
        if ($me.firefox != -1) {
            ally.firefox = parseFloat($me.ua[$me.firefox + 8] + $me.ua[$me.firefox + 9] + $me.ua[$me.firefox + 10]);
        }
        if ($me.opera != -1) {
            ally.opera = parseFloat($me.ua[$me.version + 8] + $me.ua[$me.version + 9] + $me.ua[$me.version + 10] + $me.ua[$me.version + 11] + $me.ua[$me.version + 12]);
        }
        if ($me.ie != -1 && $me.windowsphone === -1) {
            ally.ie = parseFloat($me.ua[$me.ie + 5]);
        }
        if ($me.windows != -1) {
            ally.windows = parseFloat($me.ua[$me.windows + 11] + $me.ua[$me.windows + 12] + $me.ua[$me.windows + 13]);
        }
        if ($me.mac != -1 && $me.iPhone === -1 && $me.iPad === -1) {
            ally.mac = parseFloat($me.ua[$me.mac + 12] + '.' + $me.ua[$me.mac + 14]);
        }
        if ($me.ubuntu != -1) {
            ally.ubuntu = parseFloat($me.ua[$me.ubuntu + 7] + $me.ua[$me.ubuntu + 8] + $me.ua[$me.ubuntu + 9] + $me.ua[$me.ubuntu + 10] + $me.ua[$me.ubuntu + 11]);
        }
        if ($me.iPhone != -1) {
            ally.iPhone = parseFloat($me.ua[$me.iPhone + 10] + '.' + $me.ua[$me.iPhone + 12]);
        }
        if ($me.iPad != -1) {
            ally.iPad = parseFloat($me.ua[$me.iPadVersion + 7] + '.' + $me.ua[$me.iPadVersion + 9]);
        }
        if ($me.windowsphone != -1) {
            ally.windowsphone = parseFloat($me.ua[$me.windowsphone + 17] + $me.ua[$me.windowsphone + 18] + $me.ua[$me.windowsphone + 19]);
        }
        if ($me.android != -1) {
            ally.android = parseFloat($me.ua[$me.android + 8] + $me.ua[$me.android + 9] + $me.ua[$me.android + 10]);
        }
        if ($me.googleTV != -1) {
            ally.googleTV = true;
        }
        if ($me.webOS != -1) {
            ally.webOS = parseFloat($me.ua[$me.webOS + 6] + $me.ua[$me.webOS + 7] + $me.ua[$me.webOS + 8]);
        }
        if ($me.TV != -1) {
            ally.TV = true;
        }
        if ($me.mobile != -1) {
            ally.mobile = true;
        }
    })()

    window.$ = window.ally = ally;

})()
