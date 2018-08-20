let RWhich = /\/([A-Za-z]+)$/
let Pass = RWhich.exec( location.pathname )

var unique = {
  name: Pass[1][0].toUpperCase() + Pass[1].substring(1).toLowerCase()
}

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let colors = ["#11f4bd","#11f4e6","#11e6f4","#11d8f4","#11a9f4","#3009c9"]

unique.backgroundColor = colors[ alphabet.indexOf(unique.name[0]) % colors.length ]

window.addEventListener( 'DOMContentLoaded', function () {
  document.body.style.backgroundColor = unique.backgroundColor
  document.title = unique.name
})
