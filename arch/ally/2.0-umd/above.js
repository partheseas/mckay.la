// Copyright 2012, McKayla Washburn, MIT license

"use strict"

var be;

;( function () {

    var element, wrap, // Generic element to extend, wrapper function.
        div, // A <div> for us to play with
        selectorChunker, rElement, // Selector parser, element detector
        proto; // Convenience

    be = {}

 // A <div> element to play with

    div = document.createElement( "div" )

 // Browser detection

    un.environment.merge( {
        Chrome: un.ua.compare( /Chrome\/([0-9\.]+)/ )[1],
        Firefox: un.ua.compare( /Firefox\/([0-9\.A-z]+)/ )[1],
        IE: un.ua.compare( /MSIE ([0-9\._]+)[\);]/ )[1]
    } )

    un.support.merge( {
        HTMLElement: typeof HTMLElement !== "undefined"
    } )

 // Wrap window and document.

    new un.EventEmitter( window )
    new un.EventEmitter( document )

 // Element

    selectorChunker = /^([a-z:0-9\-]+)|([.#])([a-z0-9\-_]+)|\[(.+?)\]|(::?)([a-z0-9\-]+)(\(.+?\))?/gi
    rElement = /^<[a-z:0-9\-]/i

    be.Element = function ( selector, base ) {
        var result, kind, element, properties;

        !base&&( base = {} )

        properties = {}

        if ( rElement.test( selector ) ) {
            div.innerHTML = selector
            element = wrap( new be.EventEmitter( div.firstChild ) )
        } else {
            while ( result = selectorChunker.exec( selector ) ) ( function ( match, tag, type, id, attr, colon, psuedo, psuedoArguments ) {
                if ( tag ) {
                    kind = tag
                } else if ( type ) {
                    switch ( type ) {
                        case "#":
                            base[ "id" ] = id

                            break

                        case ".":
                            base[ "class" ] ?
                                base[ "class" ] += " " + id :
                                base[ "class" ] = id

                            break
                    }
                } else if ( attr ) {
                    base[ attr.split( "=" )[ 0 ] ] = attr.split( "=" )[ 1 ]
                } else if ( psuedo ) {
                    if ( colon === ":" ) {
                        switch ( psuedo ) {
                            case "disabled":
                                base.disabled = true
                                break

                            case "checked":
                                base.checked = true

                            case "first-child":
                                properties.position = 0
                                break

                            case "nth-child":
                                properties.position = Number.of( /^\((.+)\)$/.exec( psuedoArguments )[1] )
                                break
                        }
                    }
                }
            } ).apply( null, result )

            element = new un.EventEmitter( document.createElement( kind ) )
        }

        properties.iterate( function ( value, prop ) {
            element[ prop ] = value
        } )

        base.iterate( function ( value, prop ) {
            if ( Function.is( element[ prop ] ) ) {
                element[ prop ]( value )
            } else {
                element.setAttribute( prop, value != null ? value : true )
            }
        } )

        return element
    }

 // document.getElementById, with wrapping.

    be.id = function id ( g ) {
        return un.EventEmitter( String.is( g ) ? document.getElementById( g ) : g )
    }

 // Build methods on a generic element, that get deployed to all elements.

    be.Element.prototype = element = un.support.HTMLElement ? HTMLElement.prototype : {}

 // Insert a new element into an existing one.

    element.adopt = function ( element, position ) {
        var parent, anchor;

        parent = this

        !position&&( position = element.position )

        if ( position ) {
            if ( Number.is( position ) ) {
                if ( position < parent.children.length ) {
                    parent.insertbefore( element, parent.children[ position ] )
                } else {
                    parent.appendChild( element )
                }
            } else {
                switch ( position ) {
                    case "first":
                        parent.insertbefore( element, parent.firstChild )
                        break

                    case "last":
                        parent.appendChild( element )
                        break

                    default:
                        anchor = parent.querySelector( position )
                        parent[ anchor ? "insertbefore" : "appendChild" ]( element, anchor.nextSibling )
                }
            }
        } else {
            parent.appendChild( element )
        }

        return element
    }

    element.create = function ( selector, base ) {
        return this.adopt( be.Element( selector, base ) )
    }

    element.say = function ( content ) {
        this.innerHTML = content
        return this
    }

    element.says = function () {
        return this.innerHTML
    }

    element.html = function ( content ) {
        return content != null ? this.say( content ) : this.says()
    }

    element.destroy = function () {
      return this.parentElement.removeChild( this )
    }

} ).call( this )
