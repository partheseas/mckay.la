/*
  Ally Toolkit 0.9.64. Copyright 2010 McKayla Washburn.
*/

ally = function (selector) {
    return ally.get(selector)
};
ally.storage = localStorage;
ally.version = 0.9;
ally.build = 64;
$fs = new Object();
ally.Initial = function () {
    if (document.readyState == "complete") {
        if (ally.onload) {
            ally.onload()
        }
        if (window.initial) {
            window.initial()
        }
        clearInterval(ally.InitialInterval);
        delete ally.InitialInterval
    }
};
ally.InitialInterval = setInterval('ally.Initial();', 50);
ally.timeOnPage = 0;
setInterval('ally.timeOnPage++;', 1000);
ally.config = new Object();
ally.config.returnarrays;
ally.config.returnonly1;
ally.config.$ = function () {
    $ = ally;
    return $
};
ally.plugins = new Array();
ally.plugins.addPlugin = function (pluginname, pluginversion, minimumallyversion, plugincode) {
    if (minimumallyversion <= ally.version) {
        ally.plugins.push(pluginname + "/" + pluginversion);
        ally[pluginname] = plugincode;
        return true
    } else {
        return false
    }
};
ally.plugins.ur = function (statement) {
    if (statement.length > 1 || ally.config.returnarrays) {
        if (!ally.config.returnonly1) {
            return statement
        } else {
            return statement[0]
        }
    } else {
        return statement[0]
    }
};
ally.plugins.noelems = "No element(s) selected.";
ally.plugins.noargs = "Not enough arguement(s).";
ally.forEach = function (array, code) {
    $fs.foreach = new Object();
    if (array) {
        if (code) {
            $fs.foreach.array = array;
            $fs.foreach.position = 0;
            $fs.foreach.returnedarray = new Array();
            while (array[$fs.foreach.position]) {
                $fs.foreach.selected = array[$fs.foreach.position];
                $fs.foreach.returnedvalue = "";
                code();
                $fs.foreach.returnedarray[$fs.foreach.position] = $fs.foreach.returnedvalue;
                $fs.foreach.position++
            }
            return $fs.foreach.returnedarray
        }
    }
};
ally.get = function (selector) {
    if (selector) {
        ally.elements = document.querySelectorAll(selector)
    }
    return ally
};
ally.getOne = function (number) {
    if (number) {
        if (ally.elements[number]) {
            ally.elements = ally.elements[number]
        }
    }
    return ally
};
ally.getMore = function (selector) {
    if (selector) {
        ally.fuse([ally.elements, document.querySelectorAll(selector)])
    }
    return ally
};
ally.add = function (type, selector) {
    if (!ally.elements) {
        ally.get('body')
    }
    $fs.add = new Object();
    ally.newElements = new Array();
    if (!type) {
        $fs.add.parenttype = ally.elements[0].tagName;
        if ($fs.add.parenttype == "BODY") {
            type = 'div'
        } else if ($fs.add.parenttype == "P" || $fs.add.parenttype == "A" || $fs.add.parenttype == "SPAN") {
            type = 'span'
        } else {
            type = 'p'
        }
    }
    ally.forEach(ally.elements, function () {
        ally.newElements[$fs.foreach.position] = document.createElement(type);
        $fs.foreach.selected.appendChild(ally.newElements[$fs.foreach.position]);
        if (selector) {
            if (selector.indexOf('#') == 0) {
                if ($fs.foreach.position == 0) {
                    ally.newElements[$fs.foreach.position].id = selector.replace('#', '')
                } else {
                    ally.newElements[$fs.foreach.position].id = selector.replace('#', '') + "-" + $fs.foreach.position
                }
            }
            if (selector.indexOf('.') == 0) {
                ally.newElements[$fs.foreach.position].className = " " + selector.replace('.', '')
            }
        }
    });
    return ally.plugins.ur(ally.newElements)
};
ally.remove = function () {
    if (ally.elements) {
        ally.forEach(ally.elements, function () {
            $fs.foreach.selected.parentNode.removeChild($fs.foreach.selected)
        })
    } else {
        return ally.plugins.noelems
    }
};
ally.html = function (html) {
    $fs.html = new Object();
    if (ally.elements) {
        if (html) {
            $fs.html.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.selected.innerHTML = html;
                $fs.foreach.returnedvalue = $fs.foreach.selected.innerHTML
            })
        } else {
            $fs.html.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.returnedvalue = $fs.foreach.selected.innerHTML
            })
        }
        return ally.plugins.ur($fs.html.returned)
    } else {
        return ally.plugins.noelems
    }
};
ally.value = function (value) {
    $fs.value = new Object();
    if (ally.elements) {
        if (value) {
            $fs.value.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.selected.value = value;
                $fs.foreach.returnedvalue = $fs.foreach.selected.value
            })
        } else {
            $fs.value.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.returnedvalue = $fs.foreach.selected.value
            })
        }
        return ally.plugins.ur($fs.value.returned)
    } else {
        return ally.plugins.noelems
    }
};
ally.empty = function () {
    $fs.empty = new Object();
    if (ally.elements) {
        $fs.empty.returned = ally.forEach(ally.elements, function () {
            $fs.foreach.selected.innerHTML = "";
            $fs.foreach.returnedvalue = $fs.foreach.selected.innerHTML
        });
        return ally.plugins.ur($fs.empty.returned)
    } else {
        return ally.plugins.noelems
    }
};
ally.attr = function (attribute, value) {
    $fs.attr = new Object();
    if (ally.elements) {
        if (attribute) {
            if (value) {
                $fs.attr.returned = ally.forEach(ally.elements, function () {
                    $fs.foreach.selected.setAttribute(attribute, value);
                    $fs.foreach.returnedvalue = $fs.foreach.selected.getAttribute(attribute)
                })
            } else {
                $fs.attr.returned = ally.forEach(ally.elements, function () {
                    $fs.foreach.returnedvalue = $fs.foreach.selected.getAttribute(attribute)
                })
            }
            return ally.plugins.ur($fs.attr.returned)
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.removeAttr = function (attribute) {
    $fs.removeattr = new Object();
    if (ally.elements) {
        if (attribute) {
            $fs.removeattr.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.selected.removeAttribute(attribute);
                $fs.foreach.returnedvalue = $fs.foreach.selected.getAttribute(attribute)
            });
            return ally.plugins.ur($fs.removeattr.returned)
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.addClass = function (newclass) {
    $fs.addclass = new Object();
    if (ally.elements) {
        if (newclass) {
            $fs.addclass.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.selected.className = $fs.foreach.selected.className + " " + newclass;
                $fs.foreach.returnedvalue = $fs.foreach.selected.className
            });
            return ally.plugins.ur($fs.addclass.returned)
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.removeClass = function (removingclass) {
    $fs.addclass = new Object();
    if (ally.elements) {
        if (removingclass) {
            $fs.addclass.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.selected.className = $fs.foreach.selected.className.replace(removingclass, '');
                $fs.foreach.returnedvalue = $fs.foreach.selected.className
            });
            return ally.plugins.ur($fs.addclass.returned)
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.css = function (property, value, priority) {
    $fs.css = new Object();
    if (!priority) {
        priority = ""
    }
    if (ally.elements) {
        if (property) {
            if (value) {
                $fs.css.returned = ally.forEach(ally.elements, function () {
                    $fs.foreach.selected.style.setProperty(property, value, priority);
                    $fs.foreach.returnedvalue = $fs.foreach.selected.style.getPropertyValue(property)
                })
            } else {
                $fs.css.returned = ally.forEach(ally.elements, function () {
                    $fs.foreach.returnedvalue = window.getComputedStyle($fs.foreach.selected, null).getPropertyValue(property)
                })
            }
            return ally.plugins.ur($fs.css.returned)
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.removeProperty = function (property) {
    $fs.removeproperty = new Object();
    if (ally.elements) {
        if (property) {
            $fs.removeproperty.returned = ally.forEach(ally.elements, function () {
                $fs.foreach.returnedvalue = $fs.foreach.selected.style.removeProperty(property)
            });
            return ally.plugins.ur($fs.removeproperty.returned)
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.animate = function (property, value) {
    $fs.animate = new Object();
    if (ally.elements) {
        if (property) {
            if (value) {
                $fs.animate.calledProperty = property;
                $fs.animate.calledValue = value;
                if (window.getComputedStyle(ally.elements[0], null).getPropertyValue(property)) {
                    $fs.animate.originalvalue = parseFloat(window.getComputedStyle(ally.elements[0], null).getPropertyValue(property))
                } else {
                    $fs.animate.originalvalue = 0
                }
                $fs.animate.unit = value.replace(parseFloat(value), '');
                $fs.animate.value = parseFloat(value);
                if ($fs.animate.originalvalue < $fs.animate.value) {
                    $fs.animate.distanceperframe = ($fs.animate.value - $fs.animate.originalvalue) / 60 + 1;
                    $fs.animate.newvalue = Math.round($fs.animate.originalvalue) + Math.round($fs.animate.distanceperframe);
                    ally.css(property, $fs.animate.newvalue + $fs.animate.unit)
                } else if ($fs.animate.originalvalue > $fs.animate.value) {
                    $fs.animate.distanceperframe = ($fs.animate.value + $fs.animate.originalvalue) / 60 + 1;
                    $fs.animate.newvalue = Math.round($fs.animate.originalvalue) - Math.round($fs.animate.distanceperframe);
                    ally.css(property, $fs.animate.newvalue + $fs.animate.unit)
                }
                if ($fs.animate.originalvalue != $fs.animate.value) {
                    setTimeout('ally.animate($fs.animate.calledProperty,$fs.animate.calledValue)', 10)
                }
            } else {
                return ally.plugins.noargs
            }
        } else {
            return ally.plugins.noargs
        }
    } else {
        return ally.plugins.noelems
    }
};
ally.open = function (url, method, async) {
    if (!url) {
        return ally.plugins.noargs
    }
    if (!method) {
        method = "GET"
    }
    if (!async) {
        async = false
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval(function () {
        if (ally.XML.status == 200) {
            if (ally.elements) {
                ally.html(ally.XML.responseText)
            }
            clearInterval(ally.XMLInterval)
        } else if (ally.XML.status == 404) {
            if (ally.elements) {
                ally.html("Sorry. :( We couldn't load the file you wanted. (" + ally.XML.status + ')')
            }
            clearInterval(ally.XMLInterval)
        } else {
            if (ally.elements) {
                ally.html("Loading..")
            }
        }
    }, 500);
    return ally.XML
};
ally.retrieve = function (url, method, async, callback) {
    if (!url) {
        return ally.plugins.noargs
    }
    if (!method) {
        method = "GET"
    }
    if (!async) {
        async = false
    }
    if (callback) {
        $fs.retrieve = new Object();
        $fs.retrieve.callback = callback
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval(function () {
        if (ally.XML.status == 200) {
            if ($fs.retrieve.callback) {
                $fs.retrieve.callback()
            }
            clearInterval(ally.XMLInterval)
        } else if (ally.XML.status == 404) {
            alert("This page was trying to load something but it didn't load correctly. If something doesn't work, then refresh the page and hope you don't get this error again.");
            clearInterval(ally.XMLInterval)
        }
    }, 500);
    return ally.XML
};
ally.script = function (url, method, async) {
    if (!url) {
        return ally.plugins.noargs
    }
    if (!method) {
        method = "GET"
    }
    if (!async) {
        async = false
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval(function () {
        if (ally.XML.status == 200) {
            eval(ally.XML.responseText);
            clearInterval(ally.XMLInterval)
        } else if (ally.XML.status == 404) {
            alert("This page was trying to load a script but it didn\'t load correctly. D: If something doesn\'t work, then refresh the page and hope you don\'t get this error again.");
            clearInterval(ally.XMLInterval)
        }
    }, 500)
};
ally.abs = function (number) {
    if (number) {
        if (number < 0) {
            return number * -1
        } else {
            return number
        }
    }
};
ally.opp = function (number) {
    if (number) {
        return number * -1
    }
};
ally.avg = function (numbers) {
    if (numbers) {
        $fs.avg = new Object();
        $fs.avg.position = 0;
        $fs.avg.total = 0;
        ally.forEach(numbers, function () {
            $fs.avg.total = $fs.avg.total + $fs.foreach.selected
        });
        return $fs.avg.total / (numbers.length)
    }
};
ally.random = function (beginning, end) {
    if (!beginning) {
        beginning = 0
    }
    if (!end) {
        end = 100
    }
    $fs.random = new Object();
    $fs.random.range = end - beginning;
    return $fs.random.random = Math.round((Math.random() * $fs.random.range) + beginning)
};
ally.fuse = function (values) {
    if (values[0] && values[1] && typeof values == "object") {
        $fs.fuse = new Object();
        $fs.fuse.currentlength = 0;
        $fs.fuse.product = values[0];
        ally.forEach(values[0], function () {
            $fs.fuse.currentlength++
        });
        ally.forEach(values[1], function () {
            $fs.fuse.product[$fs.foreach.position + $fs.fuse.currentlength] = $fs.foreach.selected
        });
        return ally.plugins.ur($fs.fuse.product)
    } else {
        return ally.plugins.noargs
    }
};
ally.event = function (event, script, capture) {
    if (!capture) {
        capture = false
    }
    ally.forEach(ally.elements, function () {
        $fs.foreach.returnedvalue = $fs.foreach.selected.addEventListener(event, script, capture)
    });
    return ally.plugins.ur($fs.foreach.returnedarray)
};
ally.time = function (useAMPM) {
    $fs.time = new Object();
    $fs.time.d = new Date();
    $fs.time.hours = $fs.time.d.getHours();
    $fs.time.minutes = $fs.time.d.getMinutes();
    $fs.time.ampm = '';
    if ($fs.time.hours == 0) {
        $fs.time.hours = 24
    }
    if ($fs.time.hours < 12 && useAMPM) {
        $fs.time.ampm = ' AM'
    }
    if ($fs.time.hours > 12 && useAMPM) {
        $fs.time.hours = $fs.time.hours - 12;
        $fs.time.ampm = ' PM'
    }
    if ($fs.time.minutes < 10) {
        $fs.time.minutes = "0" + $fs.time.minutes
    }
    return $fs.time.hours + ":" + $fs.time.minutes + $fs.time.ampm
};
ally.date = function (formated) {
    $fs.date = new Object;
    $fs.date.d = new Date();
    $fs.date.day = $fs.date.d.getDay();
    $fs.date.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $fs.date.month = $fs.date.d.getMonth();
    $fs.date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $fs.date.date = $fs.date.d.getDate();
    $fs.date.year = $fs.date.d.getFullYear();
    if (formated) {
        return $fs.date.days[$fs.date.day] + ', ' + $fs.date.months[$fs.date.month] + ' ' + $fs.date.date + ' ' + $fs.date.year
    } else {
        return $fs.date.month + 1 + "/" + $fs.date.date + "/" + $fs.date.year
    }
};
ally.ua = navigator.userAgent;
ally.chrome = ally.ua.indexOf('Chrome');
ally.safari = ally.ua.indexOf('Safari');
ally.webkit = ally.ua.indexOf('AppleWebKit');
ally.firefox = ally.ua.indexOf('Firefox');
ally.opera = ally.ua.indexOf('Opera');
ally.ie = ally.ua.indexOf('MSIE');
ally.browserversion = ally.ua.indexOf('Version');
if (ally.chrome != -1) {
    ally.chrome = parseFloat(ally.ua[ally.chrome + 7] + ally.ua[ally.chrome + 8] + ally.ua[ally.chrome + 9]);
    ally.safari = -1
}
if (ally.safari != -1 && ally.chrome == -1) {
    ally.safari = parseFloat(ally.ua[ally.browserversion + 8] + ally.ua[ally.browserversion + 9] + ally.ua[ally.browserversion + 10])
}
if (ally.webkit != -1) {
    ally.webkit = parseFloat(ally.ua[ally.webkit + 12] + ally.ua[ally.webkit + 13] + ally.ua[ally.webkit + 14] + ally.ua[ally.webkit + 15] + ally.ua[ally.webkit + 16] + ally.ua[ally.webkit + 17])
}
if (ally.firefox != -1) {
    ally.firefox = parseFloat(ally.ua[ally.firefox + 8] + ally.ua[ally.firefox + 9] + ally.ua[ally.firefox + 10])
}
if (ally.opera != -1) {
    ally.opera = parseFloat(ally.ua[ally.browserversion + 8] + ally.ua[ally.browserversion + 9] + ally.ua[ally.browserversion + 10] + ally.ua[ally.browserversion + 11] + ally.ua[ally.browserversion + 12])
}
if (ally.ie != -1) {
    ally.ie = parseFloat(ally.ua[ally.ie + 5])
}
ally.windows = ally.ua.indexOf('Windows NT');
ally.mac = ally.ua.indexOf('Mac OS X');
ally.iPhone = ally.ua.indexOf('iPhone OS');
ally.iPad = ally.ua.indexOf('iPad');
ally.iPadVersion = ally.ua.indexOf('CPU OS');
if (ally.windows != -1) {
    ally.windows = parseFloat(ally.ua[ally.windows + 11] + ally.ua[ally.windows + 12] + ally.ua[ally.windows + 13])
}
if (ally.mac != -1 && ally.iPhone == -1 && ally.iPad == -1) {
    ally.mac = parseFloat(ally.ua[ally.mac + 9] + ally.ua[ally.mac + 10] + ally.ua[ally.mac + 11] + ally.ua[ally.mac + 12] + ally.ua[ally.mac + 13] + ally.ua[ally.mac + 14])
}
if (ally.iPhone != -1) {
    ally.iPhone = parseFloat(ally.ua[ally.iPhone + 10] + ally.ua[ally.iPhone + 11] + ally.ua[ally.iPhone + 12])
}
if (ally.iPad != -1) {
    ally.iPad = parseFloat(ally.ua[ally.iPadVersion + 7] + ally.ua[ally.iPadVersion + 8] + ally.ua[ally.iPadVersion + 9])
}
