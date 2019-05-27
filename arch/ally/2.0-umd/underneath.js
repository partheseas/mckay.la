// Copyright 2012, McKayla Washburn, MIT License

"use strict"

var un;

;( function () {

 // un

    un = {
        version: "0.5",
        environment: {
            Node: typeof process !== "undefined" && process.versions && process.versions.node,
            Browser: typeof window !== "undefined" && typeof navigator !== "undefined" && window.navigator === navigator
        },

        support: {}
    }

 // Class.is

    Function.prototype.is = function is( item ) {
        return item != null && ( item.constructor === this.prototype.constructor )
    }

 // Class.install

    Function.prototype.install = function install( important, methods ) {
        var prop;

        !Boolean.is( important ) && ( methods = important, important = true )

        for ( prop in methods ) ( function ( method ) {
            if ( methods.hasOwnProperty( prop ) ) {
                if ( !this.prototype[ prop ] || important ) {
                    this.prototype[ prop ] = method
                }

                if ( !this[ prop ] || important ) {
                    this[ prop ] = function () {
                        method.call.apply( method, arguments )
                    }
                }
            }
        } ).call( this, methods[ prop ] )

        return this
    }

 // Class.of

    Function.of = function of( base ) {
        return Function.is( base ) ? base : function () { return base }
    }

    Array.of = function of( base ) {
        var i, array;

        if ( Array.is( base ) ) {
            return base
        } else if ( Number.is( base.length ) ) {
            array = []
            for ( i = 0; i < base.length; i++ ) {
                array.push( base[ i ] )
            }
        } else {
            return [ base ]
        }

        return array
    }

    Number.of = function of( base ) {
        return parseFloat( base )
    }

 // un.alias

    un.alias = function alias( block ) {
        return block( un )
    }

 // Object.[iterate,map,merge]

    Object.install( {
        iterate: function iterate( block, top ) {
            var prop;

            !top&&( top = this )

            for ( prop in this ) {
                if ( this.hasOwnProperty( prop ) ) {
                    block.call( top, this[ prop ], prop )
                }
            }
        },

        map: function map( block, top ) {
            var result;

            result = {};

            this.iterate( function ( value, prop ) {
                result[ prop ] = block.call( top, value, prop )
            } )

            return result
        },

        merge: function merge() {
            var objects;

            objects = Array.of( arguments )

            objects.forEach( function ( object ) {
                object.iterate( function ( value, prop ) {
                    this[ prop ] = value
                }, this )
            }, this )

            return this
        }
    } )

 // Array

    Array.install( false, {
        forEach: function forEach( block, top ) {
            var i;

            !top&&( top = this )

            for ( i = 0; i < this.length; i++ ) {
                block.call( top, this[ i ], i )
            }
        },

        concat: function concat() {
            var result, arrays;

            arrays = Array.of( arguments )
            arrays.unshift( this )

            result = []

            arrays.forEach( function ( other ) {
                other = Array.of( other )

                other.forEach( function ( item ) {
                    result.push( item )
                } )
            } )

            return result
        }
    })

 // String

    String.install( {
        compare: function ( expression ) {
            return RegExp.is( expression ) ? ( expression.exec( this.toString() ) || [] ) : ( this.indexOf( expression.toString() ) > -1 ? [ expression ] : [] )
        }
    } )

 // Expand un.environment

    un.environment.merge( {
        Mac: ( un.environment.Node && process.platform === "darwin" ) ||
            ( un.environment.Browser && navigator.platform === "MacIntel" ),
        Windows: ( un.environment.Node && process.platform === "windows" ) ||
            ( un.environment.Browser && navigator.platform === "Win32" ),

        require: typeof require !== "undefined" && Function.is( require ),
        define: typeof require !== "undefined" && Function.is( require ) && typeof define !== "undefined" && Function.is( define ),
        module: typeof module !== "undefined"
    } )

 // EventEmitter

    un.EventEmitter = function EventEmitter( base ) {
        var listeners, receivers, once;

        !base && ( base = this )

        base.li = listeners = {},
        once = {},
        receivers = [];

        base.on = function ( event, listener ) {
            if ( String.is( event ) ) {
                listeners[ event ] ? listeners[ event ].push( listener ) : ( listeners[ event ] = [ listener ] )
                if ( Function.is( this.addEventListener ) ) this.addEventListener( event, listener )
            } else {
                event.iterate( function ( listener, event ) {
                    this.on( event, listener )
                }, this )
            }

            return this
        }

        base.emit = function ( event ) {
            var details, called, parent;

            parent = this
            details = Array.of( arguments ).slice( 1 )

            if ( Array.is( listeners[ event ] ) ) {
              listeners[ event ].forEach( function ( listener ) {
                called = true
                listener.apply( base, details )
              } )
            }

            receivers.forEach( function ( receiver ) {
                receiver.emit.apply( parent, arguments )
            } )

            return called
        }

        base.delegate = function ( to ) {
            receivers.push( to )
        }

        return base
    }

    if ( un.environment.Browser ) {
      un.ua = navigator.userAgent

      un.Request = function ( url, options ) {
        var xhr, url;

        if ( Object.is( url ) ) {
          options = url
          url = options.url
        }

        !options && ( options = {} )

        xhr = new un.EventEmitter( new XMLHttpRequest() )

        xhr.open( options.method || "POST", url, true )

        xhr.on( "load", function () {
          xhr.emit( "data", xhr.responseText )
          xhr.emit( "end" )
        } )

        xhr.send( options.body )

        return xhr
      }
    }

} ).call( this )
