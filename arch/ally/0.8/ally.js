/*
  Ally Toolkit 0.8.95. Copyright 2010 McKayla Washburn.
*/

var ally = new Object();
ally.storage = localStorage;
ally.version = 0.8;
ally.build = 95;
ally.fs = new Object();
ally.Initial = function () {
    if (document.readyState == "complete") {
        if (ally.onload) {
            ally.onload()
        }
        clearInterval(ally.InitialInterval)
    }
};
ally.InitialInterval = setInterval('ally.Initial();', 50);
ally.config = new Object();
ally.get = function (selector) {
    if (selector) {
        ally.selector = selector;
        ally.elements = document.querySelectorAll(ally.selector)
    }
    return ally
};
ally.add = function (type, selector) {
    if (ally.elements) {
        ally.fs.add = new Object();
        ally.newElements = new Array();
        ally.fs.add.elementnumber = 0;
        if (type) {
            ally.fs.add.newElementType = type
        }
        if (!type) {
            ally.fs.add.parenttype = ally.elements[0].tagName;
            if (ally.fs.add.parenttype == "BODY") {
                ally.fs.add.newElementType = 'div'
            } else if (ally.fs.add.parenttype == "P" || ally.fs.add.parenttype == "A" || ally.fs.add.parenttype == "SPAN") {
                ally.fs.add.newElementType = 'span'
            } else {
                ally.fs.add.newElementType = 'p'
            }
        }
        while (ally.elements[ally.fs.add.elementnumber]) {
            ally.newElements[ally.fs.add.elementnumber] = document.createElement(ally.fs.add.newElementType);
            ally.elements[ally.fs.add.elementnumber].appendChild(ally.newElements[ally.fs.add.elementnumber]);
            if (selector) {
                if (selector.indexOf('#') == 0) {
                    ally.fs.add.selector = selector.replace('#', '');
                    if (ally.fs.add.elementnumber == 0) {
                        ally.newElements[ally.fs.add.elementnumber].id = ally.fs.add.selector
                    } else {
                        ally.newElements[ally.fs.add.elementnumber].id = ally.fs.add.selector + "-" + ally.fs.add.elementnumber
                    }
                }
                if (selector.indexOf('.') == 0) {
                    ally.fs.add.selector = selector.replace('.', '');
                    ally.newElements[ally.fs.add.elementnumber].className = " " + ally.fs.add.selector
                }
            }
            ally.fs.add.elementnumber++
        }
        if (ally.newElements.length > 1) {
            return ally.newElements
        } else {
            return ally.newElements[0]
        }
    } else {
        return "No element(s) defined."
    }
};
ally.remove = function () {
    if (ally.elements) {
        ally.fs.remove = new Object();
        ally.fs.remove.elementnumber = 0;
        while (ally.elements[ally.fs.remove.elementnumber]) {
            ally.fs.remove.parent = ally.elements[ally.fs.remove.elementnumber].parentNode;
            ally.fs.remove.parent.removeChild(ally.elements[ally.fs.remove.elementnumber]);
            ally.fs.remove.elementnumber++
        }
    } else {
        return "No element(s) defined."
    }
};
ally.html = function (html) {
    if (ally.elements) {
        ally.fs.html = new Object();
        ally.fs.html.allhtml = new Array();
        ally.fs.html.elementnumber = 0;
        if (html) {
            while (ally.elements[ally.fs.html.elementnumber]) {
                ally.elements[ally.fs.html.elementnumber].innerHTML = html;
                ally.fs.html.allhtml[ally.fs.html.elementnumber] = html;
                ally.fs.html.elementnumber++
            }
        } else {
            while (ally.elements[ally.fs.html.elementnumber]) {
                ally.fs.html.allhtml[ally.fs.html.elementnumber] = ally.elements[ally.fs.html.elementnumber].innerHTML;
                ally.fs.html.elementnumber++
            }
        }
        if (ally.fs.html.allhtml.length > 1) {
            return ally.fs.html.allhtml
        } else {
            return ally.fs.html.allhtml[0]
        }
    } else {
        return "No element(s) defined."
    }
};
ally.value = function (value) {
    if (ally.elements) {
        ally.fs.value = new Object();
        ally.fs.value.allvalues = new Array();
        ally.fs.value.elementnumber = 0;
        if (value) {
            while (ally.elements[ally.fs.value.elementnumber]) {
                ally.elements[ally.fs.value.elementnumber].value = value;
                ally.fs.value.allvalues[ally.fs.value.elementnumber] = value;
                ally.fs.value.elementnumber++
            }
        } else {
            while (ally.elements[ally.fs.value.elementnumber]) {
                ally.fs.value.allvalues[ally.fs.value.elementnumber] = ally.elements[ally.fs.value.elementnumber].value;
                ally.fs.value.elementnumber++
            }
        }
        if (ally.fs.value.allvalues.length > 1) {
            return ally.fs.value.allvalues
        } else {
            return ally.fs.value.allvalues[0]
        }
    } else {
        return "No element(s) defined."
    }
};
ally.empty = function () {
    if (ally.elements) {
        ally.fs.empty = new Object();
        ally.fs.empty.allhtml = new Array();
        ally.fs.empty.elementnumber = 0;
        while (ally.elements[ally.fs.empty.elementnumber]) {
            ally.elements[ally.fs.empty.elementnumber].innerHTML = "";
            ally.fs.empty.allhtml[ally.fs.empty.elementnumber] = "";
            ally.fs.empty.elementnumber++
        }
        if (ally.fs.empty.allhtml.length > 1) {
            return ally.fs.empty.allhtml
        } else {
            return ally.fs.empty.allhtml[0]
        }
    } else {
        return "No element(s) defined."
    }
};
ally.attr = function (attribute, value) {
    if (ally.elements) {
        if (attribute) {
            ally.fs.attr = new Object();
            ally.fs.attr.allattrs = new Array();
            ally.fs.attr.elementnumber = 0;
            if (value) {
                while (ally.elements[ally.fs.attr.elementnumber]) {
                    if (value != 'remove') {
                        ally.elements[ally.fs.attr.elementnumber].setAttribute(attribute, value);
                        ally.fs.attr.allattrs[ally.fs.attr.elementnumber] = ally.elements[ally.fs.attr.elementnumber].getAttribute(attribute)
                    } else {
                        ally.elements[ally.fs.attr.elementnumber].removeAttribute(attribute);
                        ally.fs.attr.allattrs[ally.fs.attr.elementnumber] = ally.elements[ally.fs.attr.elementnumber].getAttribute(attribute)
                    }
                    ally.fs.attr.elementnumber++
                }
            } else {
                while (ally.elements[ally.fs.attr.elementnumber]) {
                    ally.fs.attr.allattrs[ally.fs.attr.elementnumber] = ally.elements[ally.fs.attr.elementnumber].getAttribute(attribute);
                    ally.fs.attr.elementnumber++
                }
            }
            if (ally.fs.attr.allattrs.length > 1) {
                return ally.fs.attr.allattrs
            } else {
                return ally.fs.attr.allattrs[0]
            }
        } else {
            return "No attribute defined."
        }
    } else {
        return "No element(s) defined."
    }
};
ally.storeAs = function (key) {
    if (ally.elements) {
        if (key) {
            ally.fs.storeas = new Object();
            ally.fs.storeas.storedvalues = new Array();
            ally.fs.storeas.elementnumber = 0;
            while (ally.elements[ally.fs.storeas.elementnumber]) {
                if (!ally.elements[ally.fs.storeas.elementnumber].value) {
                    ally.fs.storeas.storedvalues[ally.fs.storeas.elementnumber] = ally.elements[ally.fs.storeas.elementnumber].innerHTML
                } else {
                    ally.fs.storeas.storedvalues[ally.fs.storeas.elementnumber] = ally.elements[ally.fs.storeas.elementnumber].value
                }
                ally.storage.setItem(key, ally.fs.storeas.storedvalues);
                ally.fs.storeas.elementnumber++
            }
            if (ally.fs.storeas.storedvalues.length > 1) {
                return ally.fs.storeas.storedvalues
            } else {
                return ally.fs.storeas.storedvalues[0]
            }
        } else {
            return "Please define a key to store the HTML as."
        }
    } else {
        return "No element to read."
    }
};
ally.css = function (property, value) {
    if (ally.elements) {
        if (property) {
            ally.fs.css = new Object();
            ally.fs.css.styles = new Array();
            ally.fs.css.elementnumber = 0;
            if (value) {
                while (ally.elements[ally.fs.css.elementnumber]) {
                    if (value != 'remove') {
                        ally.elements[ally.fs.css.elementnumber].style.setProperty(property, value);
                        ally.fs.css.styles[ally.fs.css.elementnumber] = ally.elements[ally.fs.css.elementnumber].style.getPropertyValue(property)
                    } else {
                        ally.elements[ally.fs.css.elementnumber].style.removeProperty(property);
                        ally.fs.css.styles[ally.fs.css.elementnumber] = ally.elements[ally.fs.css.elementnumber].style.getPropertyValue(property)
                    }
                    ally.fs.css.elementnumber++
                }
            } else {
                while (ally.elements[ally.fs.css.elementnumber]) {
                    ally.fs.css.styles[ally.fs.css.elementnumber] = window.getComputedStyle(ally.elements[ally.fs.css.elementnumber]).getPropertyValue(property);
                    ally.fs.css.elementnumber++
                }
            }
            if (ally.fs.css.styles.length > 1) {
                return ally.fs.css.styles
            } else {
                return ally.fs.css.styles[0]
            }
        } else {
            return "No style defined."
        }
    } else {
        return "No element(s) defined."
    }
};
ally.animate = function (property, value) {
    if (ally.elements) {
        if (property) {
            if (value) {
                ally.fs.animate = new Object();
                ally.fs.animate.calledProperty = property;
                ally.fs.animate.calledValue = value;
                ally.fs.animate.elementnumber = 0;
                if (ally.elements[ally.fs.animate.elementnumber].style.getPropertyValue(property)) {
                    ally.fs.animate.originalvalue = parseFloat(ally.elements[ally.fs.animate.elementnumber].style.getPropertyValue(property))
                } else {
                    ally.fs.animate.originalvalue = 0
                }
                ally.fs.animate.unit = value.replace(parseFloat(value), '');
                ally.fs.animate.value = parseFloat(value);
                while (ally.elements[ally.fs.animate.elementnumber]) {
                    if (ally.fs.animate.originalvalue < ally.fs.animate.value) {
                        ally.fs.animate.distanceperframe = (ally.fs.animate.value - ally.fs.animate.originalvalue) / 60 + 1;
                        ally.fs.animate.newvalue = Math.round(ally.fs.animate.originalvalue) + Math.round(ally.fs.animate.distanceperframe);
                        ally.elements[ally.fs.animate.elementnumber].style.setProperty(property, ally.fs.animate.newvalue + ally.fs.animate.unit)
                    } else if (ally.fs.animate.originalvalue > ally.fs.animate.value) {
                        ally.fs.animate.distanceperframe = (ally.fs.animate.value + ally.fs.animate.originalvalue) / 60 + 1;
                        ally.fs.animate.newvalue = Math.round(ally.fs.animate.originalvalue) - Math.round(ally.fs.animate.distanceperframe);
                        ally.elements[ally.fs.animate.elementnumber].style.setProperty(property, ally.fs.animate.newvalue + ally.fs.animate.unit)
                    }
                    if (ally.fs.animate.elementnumber == 0) {
                        setTimeout('ally.animate(ally.fs.animate.calledProperty,ally.fs.animate.calledValue)', 10)
                    }
                    ally.fs.animate.elementnumber++
                }
            } else {
                return "This is for animating CSS changes. If you want t retrieve a CSS value then please use ally.css."
            }
        } else {
            return "Please define a property."
        }
    } else {
        return "No element to read."
    }
};
ally.addClass = function (newclass) {
    if (ally.elements) {
        if (newclass) {
            ally.fs.addclass = new Object();
            ally.fs.addclass.classes = new Array();
            ally.fs.addclass.elementnumber = 0;
            while (ally.elements[ally.fs.addclass.elementnumber]) {
                ally.elements[ally.fs.addclass.elementnumber].className = ally.elements[ally.fs.addclass.elementnumber].className + " " + newclass;
                ally.fs.addclass.classes[ally.fs.addclass.elementnumber] = ally.elements[ally.fs.addclass.elementnumber].className;
                ally.fs.addclass.elementnumber++
            }
            if (ally.fs.addclass.classes.length > 1) {
                return ally.fs.addclass.classes
            } else {
                return ally.fs.addclass.classes[0]
            }
        } else {
            return "Please define a class."
        }
    } else {
        return "No element(s) defined."
    }
};
ally.removeClass = function (removingclass) {
    if (ally.elements) {
        if (removingclass) {
            ally.fs.removeclass = new Object();
            ally.fs.removeclass.classes = new Array();
            ally.fs.removeclass.elementnumber = 0;
            while (ally.elements[ally.fs.removeclass.elementnumber]) {
                ally.elements[ally.fs.removeclass.elementnumber].className = ally.elements[ally.fs.removeclass.elementnumber].className.replace(removingclass, '');
                ally.fs.removeclass.classes[ally.fs.removeclass.elementnumber] = ally.elements[ally.fs.removeclass.elementnumber].className;
                ally.fs.removeclass.elementnumber++
            }
            if (ally.fs.removeclass.classes.length > 1) {
                return ally.fs.removeclass.classes
            } else {
                return ally.fs.removeclass.classes[0]
            }
        } else {
            return "Please define a class."
        }
    } else {
        return "No element(s) defined."
    }
};
ally.open = function (url, method, async) {
    if (!url) {
        return "Please specify a file URL"
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
    ally.XMLInterval = setInterval('ally.openHTML();', 500)
};
ally.openHTML = function () {
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
};
ally.script = function (url, method, async) {
    if (!url) {
        return "Please specify a file URL"
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
    ally.XMLInterval = setInterval('ally.openScript();', 500)
};
ally.openScript = function () {
    if (ally.XML.status == 200) {
        eval(ally.XML.responseText);
        clearInterval(ally.XMLInterval)
    } else if (ally.XML.status == 404) {
        alert("This page was trying to load a script but it didn't load correctly. D:" + "\b" + "If something doesn't work, then refresh the page and hope you don't get this error again.");
        clearInterval(ally.XMLInterval)
    }
};
ally.retrieve = function (url, method, async, callback) {
    if (!url) {
        return "Please specify a file URL"
    }
    if (!method) {
        method = "GET"
    }
    if (!async) {
        async = false
    }
    if (callback) {
        ally.fs.retrieve = new Object();
        ally.fs.retrieve.callback = callback
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval('ally.openOther();', 500);
    return ally.XML
};
ally.openOther = function () {
    if (ally.XML.status == 200) {
        if (ally.fs.retrieve.callback) {
            ally.fs.retrieve.callback()
        }
        clearInterval(ally.XMLInterval)
    } else if (ally.XML.status == 404) {
        alert("This page was trying to load something but it didn't load correctly. If something doesn't work, then refresh the page and hope you don't get this error again.");
        clearInterval(ally.XMLInterval)
    }
};
ally.time = function (useAMPM) {
    ally.fs.time = new Object;
    ally.fs.time.d = new Date();
    ally.fs.time.hours = ally.fs.time.d.getHours();
    ally.fs.time.minutes = ally.fs.time.d.getMinutes();
    ally.fs.time.ampm = '';
    if (ally.fs.time.hours == 0) {
        ally.fs.time.hours = 24
    }
    if (ally.fs.time.hours < 12 && useAMPM) {
        ally.fs.time.ampm = ' AM'
    }
    if (ally.fs.time.hours > 12 && useAMPM) {
        ally.fs.time.hours = ally.fs.time.hours - 12;
        ally.fs.time.ampm = ' PM'
    }
    if (ally.fs.time.minutes < 10) {
        ally.fs.time.minutes = "0" + ally.fs.time.minutes
    }
    return ally.fs.time.hours + ":" + ally.fs.time.minutes + ally.fs.time.ampm
};
ally.date = function () {
    ally.fs.date = new Object;
    ally.fs.date.d = new Date();
    ally.fs.date.day = ally.fs.date.d.getDay();
    ally.fs.date.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    ally.fs.date.month = ally.fs.date.d.getMonth();
    ally.fs.date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    ally.fs.date.date = ally.fs.date.d.getDate();
    ally.fs.date.year = ally.fs.date.d.getFullYear();
    return ally.fs.date.days[ally.fs.date.day] + ', ' + ally.fs.date.months[ally.fs.date.month] + ' ' + ally.fs.date.date + ' ' + ally.fs.date.year
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
ally.timeOnPage = 0;
setInterval('ally.timeOnPage++;', 1000);