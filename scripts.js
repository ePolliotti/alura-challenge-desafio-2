;(function() {
'use strict'

    var palabras = [
        'ARGENTINA', 'ALEMANIA', 'CANADA', 'FRACIA', 'CROACIA' , 'ESPAÑA',
        'AUSTRALIA', 'BELGICA'
    ]

    //variable para almacenar la config. actual
    var juego = null

    var finalizado = false

    var $html = {
       hombre: document.getElementById('hombre'),
       adivinado: document.querySelector('.adivinado'),
       errado: document.querySelector('.errado')

    } 
   
    function dibujar(juego){
        // Actualizar la imagen de el hombre
        var $elem
        $elem = $html.hombre

        var estado = juego.estado
        if (estado == 8){
            estado = juego.previo

        }

        $elem.src = 'img/estados/' + estado + '.png'
        //creamos las letras adivinadas
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        // borramos todos los hijos de el elemento
        $elem.innerHTML = ''
        for (let letra of palabra) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode ('')
            if (adivinado.indexOf(letra) >= 0 ) {
                $txt.nodeValue = letra
            }
            $span.setAttribute('class','letra-adivinada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
        //creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        $elem.innerHTML = ''
        for (let letra of errado){
            let $span = document.createElement('span')
            let $txt = document.createTextNode (letra)
            $span.setAttribute('class', 'letra-errada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

    function adivinar(juego, letra){
        var estado = juego.estado
        if(estado == 1 || estado == 8){
            return
        }
        var adivinado = juego.adivinado
        var errado = juego.errado
        //si emos adivinado o errado no hay que hacer nada
        if(adivinado.indexOf(letra)  >= 0 || errado.indexOf(letra)  >= 0 ){
            return
        }

        var palabra = juego.palabra
       
        //si es letra de la palabra
        if(palabra.indexOf(letra)  >= 0 ){
            let ganado = true
            // debemos ver si llegamos a el estado ganado
            for (let l of palabra){
                if(adivinado.indexOf(l) < 0 && l !== letra){
                    ganado = false
                    juego.previo = juego.estado
                    break
                }
            }
            // si ya se ha ganado debemos indicarlo
            if (ganado) {
                juego.estado = 8
                
            }
            // agregamos la letra, a la lista de letras adivinadas
            adivinado.push(letra)
        } else {
            //si no es letra de la palabra, acercamos al hombre un estado mas a la horca
            juego.estado--
            // agregamos la letra a la lista de erradas
            errado.push(letra)
        }
    }
  
 
  

  window.onkeypress = function adivinarLetra(e) {
    var letra = e.key 
    letra = letra.toUpperCase()
    if(/[^A-ZÑ]/.test(letra)){
        return
    }
    adivinar(juego, letra)
    var estado = juego.estado
    if( estado == 8 && !finalizado){
        setTimeout(alertaGanado, 500)
        finalizado = true
    }else if (estado == 1){
        let palabra = juego.palabra
        let fn = alertaPerdido.bind(undefined, palabra)
        setTimeout(fn, 500)
        finalizado = true
    }
    dibujar(juego)

  }
  window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = []
    juego.errado = []
    finalizado = false
    dibujar(juego)

  }

  //funcion para devolver una palabra aleatoria

  function palabraAleatoria(){
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]

  }

  function alertaGanado() {
     alert('felicitaciones ganaste')  
  }

  function alertaPerdido(palabra) {
    alert('lo siento perdiste la seleccion era: '+ palabra)

  }

  nuevoJuego()
  
}())     