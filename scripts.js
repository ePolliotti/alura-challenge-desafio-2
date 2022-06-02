;(function() {
'use strict'
    var juego = {

        palabra: "ALURA",
        estado: 1,
        adivinado: ['A','U','L'],
        errado: ['B','J','K','C']

    }
    var $html ={
       hombre: document.getElementById('hombre'),
       adivinado: document.querySelector('.adivinando'),
       errado: document.querySelector('.errado')

    } 
   
    function dibujar(juego){
        // Actualizar la imagen de el hombre
        var $elem
        $elem = $html.hombre
        $elem.src = './img/' + juego.estado + '.png'

        //creamos las letras adivinadas
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        for (let letra of palabra) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode ('')
            if (adivinado.indexOf >= 0 ) {
                $txt.nodeValue = letra
            }
            $span.setAttribute('class','letra-adivina')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
        //creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        for (let letra of errado){
            let $span = document.createElement('span')
            let $txt = document.createTextNode (letra)
            $span.setAttribute('class', 'letra-errada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

  console.log(juego)
  dibujar(juego)  

}())     