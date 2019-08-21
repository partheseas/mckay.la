// import React, { Component, createElement as Element } from 'react'
// import { render } from 'react-dom'
// import $ from 'jquery'
//
// class Presentation extends Component {
//   constructor( props ) {
//     super( props )
//     // this.state = props.slides
//   }
//
//   render() {
//     return this.props.slides.map( ( slide, key ) => {
//       return Element( Slide, Object.assign({ key }, slide ) )
//     })
//   }
// }
//
// class Slide extends Component {
//   render() {
//     return Element(
//       'section',
//       {
//         style: {
//           background: this.props.background,
//           color: this.props.color
//         }
//       },
//       this.props.content.map( ( piece, key ) => {
//         return Element( EditableContent, Object.assign({ key }, piece ) )
//       })
//     )
//   }
// }
//
// class EditableContent extends Component {
//   constructor( props ) {
//     super( props )
//     this.state = {
//       editing: false,
//       value: props.value
//     }
//
//     this.refInput = React.createRef()
//   }
//
//   handleChange( change ) {
//     change.preventDefault()
//     change.stopPropagation()
//     this.setState({ value: change.target.value })
//   }
//
//   interuptOnEnter( key ) {
//     key.stopPropagation()
//
//     if ( key.keyCode === 13 ) {
//       this.setState({ editing: false })
//     }
//   }
//
//   save() {
//     this.setState({ editing: false })
//   }
//
//   render() {
//     return Element(
//       this.props.type,
//       {
//         style: {
//           textAlign: this.props.align
//         },
//         src: this.props.src,
//         onDoubleClick: () => this.setState({ editing: true }),
//         className: this.state.editing ? 'editing' : 'static'
//       },
//       this.state.editing
//         ? Element( 'input', {
//             type: 'text',
//             defaultValue: this.state.value,
//             onChange: this.handleChange.bind( this ),
//             onKeyDown: this.interuptOnEnter.bind( this ),
//             onBlur: this.save.bind( this ),
//             ref: this.refInput
//           })
//         : this.state.value
//     )
//   }
//
//   componentDidUpdate( oldProps, oldState ) {
//     if ( this.state.editing && this.state.value === oldState.value ) {
//       this.refInput.current.select()
//     }
//   }
// }
//
// fetch( `${location.pathname.split( '/' ).pop()}.json` )
//   .then( data => data.json() )
//   .then( presentation => {
//     render(
//       Element( Presentation, { slides: presentation }),
//       document.getElementById( 'presentation' )
//     )
//   })

// $( document ).ready( () => {
//   $( window ).keydown( key => {
//     if ( key.keyCode === 192 ) {
//       if ( document.webkitCurrentFullScreenElement ) document.webkitExitFullscreen()
//       $( '#toolbar' ).toggle()
//     }
//   })

//   $( '#presentation' ).dblclick( () => {
//     if ( !autoScrolling && wideEnough ) {
//       switch ( event.keyCode ) {
//         case 74:
//         case 40:
//           startAutoScrolling( ++panel )
//           break;
//         case 75:
//         case 38:
//           startAutoScrolling( --panel )
//           break;
//       }
//     }

//     if ( document.webkitCurrentFullScreenElement ) document.webkitExitFullscreen()
//     else document.documentElement.webkitRequestFullscreen()
//     $( '#toolbar' ).hide()
//   })
// })
