/* MIT License
   Created by partheseas (McKayla Washburn)
   Copyright McKayla Washburn 2014
   Ally Toolkit - your JavaScript best friend: 0.1- (pre-release)
   ally.DOM */

define( "ally.DOM", function () {
	var DOM, DOMArray,
	RTag, RClass, RId, RAttribute, RPseudo;

	// These are regular expressions used to parse selectors.
	RTag = /^[A-Za-z][A-Za-z0-9]*/
	RId = /\#([A-Za-z][A-Za-z0-9\-])*/
	RClass = /\.([A-Za-z][A-Za-z0-9\-]*)/g
	RAttribute = /\[([A-Za-z][A-Za-z0-9\-]*?)(\=(")?(.*?)\3)?\]/g
	RPseudo = /\:([A-Za-z][A-Za-z0-9\-]*)(\( TODO: FIX THIS REGEXP \))?/g

  /*  DOM( document )
      Creates our own version of a Document Object Model for us to change
      and play with as we please, without mucking up the real one.
        <Document> document:
          The real document to base our document on. */
	DOM = function DOM( document ) {
		this.document = document
		this.head = document.head
		this.body = document.body

		this.Element = function Element( selector, properties ) {
	    var element, information;

	    information = DOM.Selector( selector )

	    element = document.createElement( information.tag )
	    if ( information.id ) element.id = information.id
	    if ( information.classes ) element.className = information.classes
	    ally.iterate( information.attributes, function ( value, name ) {
	    	element.setAttribute( name, value )
	    })

	  	ally.merge( element, properties )

	    return element
		}
	}

	DOM.Selector = function ( selector ) {
		var information;
		// Reset the position of the global regular expressions.
		RClass.exec(""), RAttribute.exec(""), RPseudo.exec("")

    information = {}

    // We parse attributes and pseudo-selectors first,
    // and remove them to avoid confusion with other selectors.
    information.attributes = {}
    while ( found = RAttribute.exec( selector ) ) {
      information.attributes[ found[1] ] = found[2] ? found[4] : true
      selector = selector.slice( 0, found.index ) + selector.slice( found.index + found[0].length )
    }

    // Parse all the data from the selector
    information.tag = ally.match( selector, RTag )[0]
    information.classes = ""
    while ( found = RClass.exec( selector ) )
    	information.classes += " " + found[1]
    information.id = ally.match( selector, RId )[1]

    // TODO: Bring back Pseudo

    return information
	}

	ally.merge( DOM.prototype, {
		//  first( selector )
		//  Finds the first element in the document that matches the selector
		//    <String> selector:
		//      A CSS selector
		first: function first( selector ) {
			return this.document.querySelector( selector )
		},

	  //  find( selector )
	  //  Finds all elements in the document that match the selector
	  //    <String> selector:
	  //      A CSS selector
		find: function find( selector ) {
			return new DOMArray( this.document.querySelectorAll( selector ) )
		},

		create: function create( selector, properties ) {
			return new DOM.Element( selector, properties, this.document )
		}
	} )

	DOM.Array = DOMArray = ally.Class( Array, function DOMArray( elements ) {
		ally.forEach( element, function ( element, index ) {
			this[ index ] = element
		}, this )
		this.length = elements.length
	} )

	DOMArray.prototype

	return DOM
})
