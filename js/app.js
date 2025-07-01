const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})


function buscarClima(e) {
    e.preventDefault()

    //Validamos los campos
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if (ciudad === '' || pais === '') {
        //Hubo un error
        mostrarAlerta('Los campos "Ciudad" y "Pais" son obligatorios', 'error')
    }
    //Consultamos API
    consultarAPI(ciudad, pais)
}


function mostrarAlerta(mensaje, tipoError) {


    const alerta = document.querySelector('.alerta')

    if (!alerta) {
        const alerta = document.createElement('DIV')
        alerta.classList.add('alerta', 'bg-red-700', 'border-red-100', 'text-red-100', 'px-4', 'py-3', 'rounded-lg', 'mx-auto', 'max-w-md', 'mt-6', 'text-center')
        alerta.textContent = mensaje

        if (tipoError === 'error') {
            container.appendChild(alerta)
            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }
    }
}

function consultarAPI(ciudad, pais) {
    const id = 'ad431850a6983ace7813e9ce9c2eda86'

    const url = `
    https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${id}
    `

    spinner()

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML()
            if (datos.cod === "404") {
                mostrarAlerta('La Ciudad indicada no existe', 'error')
                return

            }
            console.log(datos)
            //Imprimimos el HTML de la consulta de tiempo
            mostrarClima(datos)
        })

}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos

    const centigrados = kelvinToC(temp) // Lo convertimos de Kelvin a Cº
    const max = kelvinToC(temp_max) // Lo convertimos de Kelvin a Cº
    const min = kelvinToC(temp_min) // Lo convertimos de Kelvin a Cº

    const nombreCiudad = document.createElement('P')
    nombreCiudad.textContent = `El Tiempo en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('P')
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl')

    const tempMax = document.createElement('P')
    tempMax.innerHTML = `Max: ${max} &#8451;`
    tempMax.classList.add('font-bold', 'text-xl')

    const tempMin = document.createElement('P')
    tempMin.innerHTML = `Min: ${min} &#8451;`
    tempMin.classList.add('font-bold', 'text-xl')

    const resultadoDiv = document.createElement('DIV')
    resultadoDiv.classList.add('text-center', 'text-white')

    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMax)
    resultadoDiv.appendChild(tempMin)

    resultado.appendChild(resultadoDiv)
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function kelvinToC(temperatura) {
    return (temperatura - 273.15).toFixed(1)
}

function spinner() {
    limpiarHTML()
    const divSpinner = document.createElement('DIV')
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner)
}