/* MIT License
   Created by partheseas (McKayla Washburn)
   Copyright McKayla Washburn 2014
   define - simple module management: -v1.00 (pre-release) */

"use strict";
var global, define;

// `this` should be `window` in browsers, or the equivalent variable in any
// JavaScript run time, like `global` in Node.js. We don't have to worry about
// overwriting `global` in Node.js, because modules are namespaced.
global = this;

// If there isn't a global variable, it will break all of our module code
if ( !global ) {
	throw "Ally cannot run in this environment!"
}

// Our module code won't conflict with Node.js either, because we use different
// function names and modules are run in their own namespace.

/*  <Object*>? <> define( name, definition )
    Defines module `name`. Returns the same value as `definition()`.
      <String> name:
  			The name of the module.
      <Function<><Object*> module> definition:
  			The function that defines the module. Inside `definition` it can be assumed
        that `this` refers to the module. If the module is supposed
        to be anything other than a basic object this function should return it. */
global.define = define = function define( name, definition ) {
	var pathway, namespace, shortname, module, result;

	// This code allows us to give each module a global variable.
	// In the browser, a module named "x.y.z" will be placed at `window.x.y.x`
	namespace = global
	pathway = name.split( "." )

  // We remove the shortname from pathway so that if it isn't defined yet it won't
  // throw an error because of a false requirement, and save it for later.
	shortname = pathway.pop()

	// Make sure all the parent modules exist
	pathway.forEach( function ( step, position ) {
		// If any of the parent modules are undefined or null, then we can't continue.
		if ( namespace == null )
			throw name + " requires " + pathway.slice( 0, position ).join( "." )
		// Next pathway step
		namespace = namespace[ step ]
	})

  // Create the module, and run the definition
	module = {}
  result = definition.call( module )

  // Expose the module globally once the definition has succedded.
  // Note: If `result` is a falsy value (0, undefined, null, etc.) then it will
  // not be exposed as the module, but it will be returned by `define`.
  namespace[ shortname ] = result || module

  // Always return the result of the definition
  return result
}

// The version of the define standard used given as `major.minor`.
// Minor versions are backwards compatible and mainly bug fixes.
// Major versions are not compatible, and may have code breaking changes.
define.version = 1.00





/* MIT License
   Created by partheseas (McKayla Washburn)
   Copyright McKayla Washburn 2014
   Ally Toolkit - your JavaScript best friend: 0.1- (pre-release) */

define( "ally", function () {
	var ally;

	ally = {}
	ally.version = "0.1-"

	//  <Boolean> is <> is( type, test )
	//  Determines whether test is of type `type`
	//    <Function> type:
	//      The type to test against
	//    <Object*> test:
	//      The variable in question
	ally.is = function is( type, test ) {
		return type != null && test != null &&
			type.constructor === Function.prototype.constructor &&
			test.constructor === type.prototype.constructor;
	}

	//  <Function> class <> Class( inheritance, constructor )
	//  Similar to `util.inherits` in Node.js, but inheritance must be defined
	//  at the same time as the class.
	ally.Class = function Class( inheritance, constructor ) {
		constructor.prototype = Object.create( inheritance.prototype, {
			constructor: {
				value: constructor,
				enumerable: false,
				writable: true,
				configurable: true
			}
		} )
		return constructor
	}

	//  forEach( target, callback [, parent] )
	//  A version of `Array::forEach` that can be used on any `Array`-like object.
	//    <Array*> target:
	//      The array which you want to iterate through
	//    <Function> callback:
	//      The function to call for each item in the array
	//    [<Object*> parent]: target
	//      The object to be used as `this` in `callback`. Defaults to `target`.
	ally.forEach = function forEach( target, callback, parent ) {
		[].forEach.call( target, callback, parent )
	}

  //  <Array> map <> map( target, callback [, parent] )
	//  A version of `Array::map` that can be used on any `Array`-like object.
	//    <Array*> target:
	//      The array which you want to iterate through.
	//    <Function> callback:
	//      The function to call for each item in the array. It should return the value
	//      for the corresponding index in the new array.
	//    [<Object*> parent]: target
	//      The object to be used as `this` in `callback`. Defaults to `target`.
	ally.map = function map( target, callback, parent ) {
		return [].map.call( target, callback, parent )
	}

	//  iterate( target, callback [, parent] )
	//  Similar to `Array::forEach`, but for objects.
	// 	  <Object*> target:
	//      The object who's properties should be iterated through
	//    <Function> callback:
	//      The function to run for each property of `target`
	//    [<Object*> parent]: target
	//      (optional) Used as `this` for `callback`. Defaults to `target`.
	ally.iterate = function iterate( target, callback, parent ) {
		var prop;

		for ( prop in target ) {
			// Make sure that it isn't an inherited property from the constructor.
			if ( target.hasOwnProperty( prop ) ) {
				callback.call( parent || target, target[ prop ], prop )
			}
		}
	}

	//  <Object> map2d <> map2d( target, callback [, parent] )
	//  Similar to `Array::map`, but for objects.
	//    <Object*> target:
	//      The object who's properties should be iterated through.
	//    <Function<>Object> callback:
	//      The function to run for each property of `target`. The returned value
	//      will be assigned to the equivalent property of the map object.
	//    [<Object*> parent]: target
	//      (optional) Used as `this` for `callback`. Defaults to `target`.
	ally.map2d = function map2d( target, callback, parent ) {
		var prop, map;

		map = {}
		for ( prop in target ) {
			// Make sure that it isn't an inherited property from the constructor.
			if ( target.hasOwnProperty( prop ) ) {
				map[ prop ] = callback.call( parent, target[ prop ], prop )
			}
		}

		return map
	}

	//  <Object> target <> merge( target, addition [, overwrite] )
	//  Adds the properties of `addition` onto `target.
	//    <Object> target:
	//      The target object to merge properties onto.
  //    <Object> addition:
  //      The object with the additional properties to add to target
  //    [<Boolean> overwrite]: true
  //      (optional) Determines if properties of `addition` should overwrite
  //      existing propeties on `target`. Defaults to `true`.
	ally.merge = function merge( target, addition, overwrite ) {
		ally.iterate( addition, function ( value, prop ) {
			if ( overwrite != false || !target[ prop ] ) target[ prop ] = value
		} )

		return merge
	}

	//  <Object> duplicate <> copy( original [, addition [, overwrite] ] )
	//  Creates a copy of an object, so you can modify properties safely.
	//    <Object> original:
	//      The object to create a copy of.
	//    [<Object> addition]:
	//      (optional) An object with properties that should be added to the copy.
	//    [<Boolean> overwrite]: false
	//      (optional, requires addition) Determines whether properties of
	//      addition should overwrite the properties of the original object on the
	//      new copy. Defaults to `false`.
	ally.copy = function copy( original, addition, overwrite ) {
		var copy;

		// We use `map2d` to create a new object with the same properties and values.
		// Then we use `merge` to add the additional properties. `merge` runs safely
		// with an undefined addition argument so we don't need to check for them.
		// We have to merge after the map is created to that the additional properties
		// don't end up on the original.
		copy = ally.merge( ally.map2d( original, function ( value ) {
			return value
		// We use `!!overwrite`, instead of directly referencing the value so that
		// if `overwrite` is undefined it will become `false`. This is important
		// because `ally.merge` defaults to `true` when overwrite is undefined.
		}), addition, !!overwrite )

		return copy
	}

	/*  <Number> index <> nthIndexOf( array, n, search )
	    Returns the nth index of `search` in `array`, which can be an `Array` or
	    a `String`. Returns -1 if not found.
	    TODO: Add support for finding the index of the nth item from the end.
	      <Array,  String> array:
	        The `Array` or `String` to search for `search` in.
	      <Number, Number> n:
	        The occurence which should be found.
	      <Object*,String> search:
	        The item to be search for in `array`. Can be any object if `array` is
	        an `Array`, but must be a `String` if `array` is a `String`. */
	ally.nthIndexOf = function nthIndexOf( array, n, search ) {
		var x, i, l;

		// x is incremented towards n so that we can know when we've
		// reached the correct position.
		x = 0
		// `l` is the actual index that we will hopefully return
		l = -1

		// The bitwise operator NOT (~) makes -1 falsey and everything else truthy.
		while ( x < n && ( i = ~array.indexOf( search ) ) ) {
			// Invert the bits back to get the actual index.
			array = array.slice( ~i + 1 )

			// Add the index + 1 to the overall index to compensate for the 0 position.
			l += ~i + 1

			// We increment x here, because if we did it in the while condition, it would change
			// before the comparison in the return statement, which could be problematic as it can
			// return an incorrect index.
			x++
		}

    // l can be greater than -1 if we found any occurance of `search`,
    // but won't be the actual index of nth `search` if n is greater than x.
		return x < n ? -1 : l
	}

  //  match( string, expression )
  //  Returns the results of matching `string` and `expression`.
  //  If they don't match, it returns an empty array.
  //    <String> string:
  //      The string to test against the expression
  //    <RegExp> expression:
  //      The expression to text against the string
	ally.match = function match( string, expression ) {
		var dull;

		// Dull is a friendlier version of null. If the expression doesn't match the string,
		// our version of `match` will return dull. You can safely access properties from dull
		// without worrying about whether or not the string and expression will match.
		// If, in your logic, you need to check whether or not the string and expression match,
		// just use `~ally.match( string, expression ).index` or `expression.test( string )`.
		dull = []
		dull.index = -1;

		return expression.exec( string ) || dull
	}

	return ally
} )
