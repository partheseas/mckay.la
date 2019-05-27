// Copyright McKayla Washburn 2012

"use strict";

var Effect;

/*
    usage:

    var animation;

    animation = new Effect( "linear", { 1: 0 }, Effect.fade( "element" ), 500 )

*/

;( function () {

    var type, toArray, values;

    type = function ( constructor, instance ) {
        return instance != null && ( instance.constructor === constructor.prototype.constructor )
    }

    toArray = function ( like ) {
        var prop, a;

        a = []

        for ( prop in like ) {
            if ( like.hasOwnProperty( prop ) ) {
                a[ i ] = like[ i ]
            }
        }

        return a
    }

    values = function ( object ) {
        var prop, a;

        a = []

        for ( prop in object ) {
            if ( object.hasOwnProperty( prop ) ) {
                a.push( object[ prop ] )
            }
        }

        return a
    }

    Effect = function Effect( equation, numbers, output, length, fps ) {
        this.equation = type( Function, equation ) ? equation : this[ equation ]
        this.numbers = numbers
        this.output = output
        this.length = length
        this.fps = fps || 30

        this.play()
    }

    Effect.version = Effect.prototype.version = "0.1-"

    Effect.prototype.play = function () {
        var effect;

        effect = this,
        this.start = new Date(),
        this.interval = setInterval( function () {
            var now, output, prop, time, given;

            now = new Date(),
            output = {},
            given = [ output ],
            time = now.getTime() - effect.start.getTime();

            if ( time >= effect.length ) {
                clearInterval( effect.interval )
                given = [ effect.numbers ].concat( values( effect.numbers ) )
                effect.output.apply( effect, given )
            } else {
                for ( prop in effect.numbers ) {
                    if ( effect.numbers.hasOwnProperty( prop ) ) {
                        prop = Number( prop )
                        given.push( output[ prop ] = effect.equation( time / effect.length ) * ( effect.numbers[ prop ] - prop ) + prop )
                    }
                }

                effect.output.apply( effect, given )
            }

        }, 1000 / this.fps );
    }

    // Graphing equations
    Effect.prototype.linear = function ( x ) {
        return x
    }

    Effect.prototype.ease = function ( x ) {
        return x < 0.5 ?
            2 * Math.pow( x, 2 ) :
            -2 * Math.pow( x - 1, 2 ) + 1
    }

    Effect.prototype.easeInMiddle = function ( x ) {
        return x < 0.5 ?
            -2 * Math.pow( x - 0.5, 2 ) + 0.5 :
            2 * Math.pow( x - 0.5, 2 ) + 0.5
    }

    Effect.prototype.easeIn = function ( x ) {
        return Math.pow( x, 2 )
    }

    Effect.prototype.easeOut = function ( x ) {
        return -1 * Math.pow( x - 1, 2 ) + 1
    }

    Effect.prototype.bounce = function ( x ) {
        return x < 0.6 ?
            this.easeIn( x * ( 1 / 0.6 ) ) :
            this.easeIn( ( x < 0.8 ? ( 0.8 - x ) : ( x - 0.8 ) ) * ( 1 / 0.2 ) ) / 10 + 0.9
    }

    Effect.prototype.elastic = function ( x ) {
        return x < 0.7 ?
            this.ease( x * ( 1 / 0.7 ) ) * 1.4 :
            1.4 - this.ease( ( x - 0.7 ) * ( 1 / 0.3 ) ) * 0.4
    }

    Effect.prototype.shoot = function ( x ) {
        return x < 0.3 ?
            this.easeOut( x * ( 1 / 0.3 ) ) * -0.4 :
            -0.4 + this.ease( ( x - 0.3 ) * ( 1 / 0.7 ) ) * 1.4
    }

    // Generic output functions
    Effect.fade = function ( id ) {
        return function ( output, first ) {
            document.getElementById( id ).style.opacity = first
        }
    }

    Effect.left = function ( id ) {
        var element = document.getElementById( id )
        return function ( output, first ) {
            element.style.position = "relative"
            element.style.left = first + "px"
        }
    }

    Effect.top = function ( id ) {
        var element = document.getElementById( id )
        return function ( output, first ) {
            element.style.position = "fixed"
            element.style.top = first + "px"
        }
    }

    Effect.bottom = function ( id ) {
        var element = document.getElementById( id )
        return function ( output, first ) {
            element.style.position = "fixed"
            element.style.bottom = first + "px"
        }
    }

    Effect.color = function ( id ) {
        var element = document.getElementById( id )
        return function ( output, first, second, third ) {
            console.log( element.style.color = "rgb(" + Math.floor( first ) + "," + Math.floor( second ) + "," + Math.floor( third ) + ")" )
        }
    }

} )();
