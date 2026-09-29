/* =========================================================
   script.js - Lógica de la calculadora en bucle
   Flujo:
     1. Leer los 2 números del formulario
     2. Validar que sean números válidos
     3. Recorrer un bucle de 5 iteraciones
     4. En cada iteración aplicar una operación distinta
     5. Mostrar el resultado en pantalla
   ========================================================= */

// ---------- Datos de apoyo ----------
// Nombres y símbolos de las 5 operaciones (el índice 0 es la iteración 1)
const NOMBRES  = ["SUMA", "RESTA", "MULTIPLICACIÓN", "DIVISIÓN", "MÓDULO (%)"];
const SIMBOLOS = ["+", "−", "×", "÷", "%"];

// ---------- Referencias a elementos del HTML ----------
const inputA       = document.getElementById("a");
const inputB       = document.getElementById("b");
const btnCalcular  = document.getElementById("btnCalcular");
const mensajeError = document.getElementById("mensajeError");
const listaResultados = document.getElementById("resultados");

/**
 * Calcula el resultado de una iteración.
 * @param {number} iteracion - Número de iteración (1 a 5)
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number|string} El resultado, o un mensaje si la operación no es posible
 */
function operar(iteracion, a, b) {
  switch (iteracion) {
    case 1:
      return a + b;                       // 1ª iteración: SUMA
    case 2:
      return a - b;                       // 2ª iteración: RESTA
    case 3:
      return a * b;                       // 3ª iteración: MULTIPLICACIÓN
    case 4:
      // 4ª iteración: DIVISIÓN (no se puede dividir entre 0)
      return b === 0 ? "No se puede dividir entre 0" : a / b;
    case 5:
      // 5ª iteración: MÓDULO / residuo (tampoco con 0)
      return b === 0 ? "No se puede calcular MOD con 0" : a % b;
  }
}

/**
 * Crea la tarjeta (elemento <li>) que muestra un resultado.
 * @param {number} iteracion - Número de iteración (1 a 5)
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @param {number|string} resultado - Valor calculado
 * @returns {HTMLLIElement} Tarjeta lista para insertar en la lista
 */
function crearTarjeta(iteracion, a, b, resultado) {
  const indice = iteracion - 1;           // los arreglos empiezan en 0

  const li = document.createElement("li");
  li.className = "resultado";
  // Retraso escalonado para que las tarjetas aparezcan una tras otra
  li.style.animationDelay = (indice * 0.08) + "s";

  li.innerHTML =
    '<div class="simbolo">' + SIMBOLOS[indice] + '</div>' +
    '<div class="detalle">' +
      '<div class="iteracion">Iteración ' + iteracion + '</div>' +
      '<div class="operacion">' + NOMBRES[indice] + ': ' + a + ' ' + SIMBOLOS[indice] + ' ' + b + '</div>' +
    '</div>' +
    '<div class="valor"></div>';

  // textContent evita insertar HTML no deseado
  li.querySelector(".valor").textContent = resultado;
  return li;
}

/**
 * Función principal: lee los datos, valida y ejecuta el bucle.
 */
function calcular() {
  // 1. Leer los valores y convertirlos a número decimal
  const a = parseFloat(inputA.value);
  const b = parseFloat(inputB.value);

  // Limpiar resultados y errores anteriores
  listaResultados.innerHTML = "";
  mensajeError.textContent = "";

  // 2. Validar: si alguno no es número, avisamos y salimos
  if (isNaN(a) || isNaN(b)) {
    mensajeError.textContent = "Por favor ingresa dos números válidos.";
    return;
  }

  // 3. BUCLE de 5 iteraciones (i = 1, 2, 3, 4, 5)
  for (let i = 1; i <= 5; i++) {
    // 4. Aplicar la operación que corresponde a esta iteración
    let resultado = operar(i, a, b);

    // Redondeo para evitar errores de decimales (ej: 0.1 + 0.2)
    if (typeof resultado === "number") {
      resultado = Math.round(resultado * 1e10) / 1e10;
    }

    // 5. Mostrar el resultado en pantalla
    listaResultados.appendChild(crearTarjeta(i, a, b, resultado));
  }
}

// ---------- Eventos ----------
// Al hacer clic en el botón se ejecuta el cálculo
btnCalcular.addEventListener("click", calcular);

// También se puede calcular presionando Enter dentro de los campos
[inputA, inputB].forEach(function (input) {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") calcular();
  });
});

// Calcular al cargar la página con los valores por defecto
calcular();
