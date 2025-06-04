 let tipoOperacionActual = "aleatorio";
    let ecuacionActual = {};
    let intentos = 0;
    let reinicioTimeout = null;

    function generarEcuacion() {
      let tipo = document.getElementById('tipoOperacion').value;
      if (tipo === "aleatorio") {
        const tipos = ["cuadratica", "lineal", "multiplicacion", "division"];
        tipo = tipos[Math.floor(Math.random() * tipos.length)];
      }
      tipoOperacionActual = tipo;
      let ecuacion = {};

      switch (tipo) {
        case "cuadratica":
          ecuacion.a = Math.floor(Math.random() * 3) + 1; // 1 a 3
          ecuacion.b = Math.floor(Math.random() * 10) - 5; // -5 a 4
          ecuacion.x = Math.floor(Math.random() * 10) + 1; // 1 a 10
          ecuacion.c = Math.floor(Math.random() * 10) - 5; // -5 a 4
          ecuacion.resultado = ecuacion.a * ecuacion.x * ecuacion.x + ecuacion.b * ecuacion.x + ecuacion.c;
          ecuacion.texto = `Resuelve para x: <b>${ecuacion.a}x² ${ecuacion.b >= 0 ? '+' : '-'} ${Math.abs(ecuacion.b)}x ${ecuacion.c >= 0 ? '+' : '-'} ${Math.abs(ecuacion.c)} = ${ecuacion.resultado}</b>`;
          break;
        case "lineal":
          ecuacion.m = Math.floor(Math.random() * 10) + 1; // 1 a 10
          ecuacion.x = Math.floor(Math.random() * 20) + 1; // 1 a 20
          ecuacion.b = Math.floor(Math.random() * 20) - 10; // -10 a 9
          ecuacion.resultado = ecuacion.m * ecuacion.x + ecuacion.b;
          ecuacion.texto = `Resuelve para x: <b>${ecuacion.m}x ${ecuacion.b >= 0 ? '+' : '-'} ${Math.abs(ecuacion.b)} = ${ecuacion.resultado}</b>`;
          break;
        case "multiplicacion":
          ecuacion.x = Math.floor(Math.random() * 20) + 1;
          ecuacion.m = Math.floor(Math.random() * 10) + 2;
          ecuacion.resultado = ecuacion.x * ecuacion.m;
          ecuacion.texto = `Resuelve para x: <b>${ecuacion.m} × x = ${ecuacion.resultado}</b>`;
          break;
        case "division":
          ecuacion.x = Math.floor(Math.random() * 20) + 2;
          ecuacion.m = Math.floor(Math.random() * 10) + 2;
          ecuacion.resultado = ecuacion.x * ecuacion.m;
          ecuacion.texto = `Resuelve para x: <b>${ecuacion.resultado} ÷ ${ecuacion.m} = x</b>`;
          break;
      }
      return ecuacion;
    }

    function mostrarEcuacion() {
      ecuacionActual = generarEcuacion();
      intentos = 0;
      if (reinicioTimeout) clearTimeout(reinicioTimeout);
      document.getElementById('gameResult').innerHTML = '';
      document.getElementById('guessInput').value = '';
      document.getElementById('juegoEnunciado').innerHTML = ecuacionActual.texto;
      document.getElementById('guessInput').focus();
    }

    function adivinaNumero() {
      const input = document.getElementById('guessInput');
      const result = document.getElementById('gameResult');
      const valor = parseInt(input.value, 10);
      if (isNaN(valor)) {
        result.innerHTML = '<span class="text-danger">Ingresa un número válido para x.</span>';
        return;
      }
      intentos++;
      if (valor === ecuacionActual.x) {
        result.innerHTML = `<span class="text-success fw-bold">¡Correcto! El valor de x era ${ecuacionActual.x}. Lo lograste en ${intentos} intento${intentos > 1 ? 's' : ''}.<br>El juego se reiniciará en 5 segundos...</span>`;
        if (reinicioTimeout) clearTimeout(reinicioTimeout);
        reinicioTimeout = setTimeout(mostrarEcuacion, 5000);
      } else {
        // Pista: diferencia y paridad
        let pista = '';
        pista += `Pista: La diferencia entre tu respuesta y x es <b>${Math.abs(valor - ecuacionActual.x)}</b>.<br>`;
        pista += `El valor de x es <b>${ecuacionActual.x % 2 === 0 ? 'par' : 'impar'}</b>.`;
        result.innerHTML = `<span class="text-primary">Incorrecto. Intenta de nuevo.</span><br>${pista}`;
      }
    }

    function reiniciarJuego() {
      if (reinicioTimeout) clearTimeout(reinicioTimeout);
      mostrarEcuacion();
    }

    // Inicializar juego al cargar
    document.addEventListener('DOMContentLoaded', mostrarEcuacion);

    // Permitir Enter para comprobar
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('guessInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') adivinaNumero();
      });
    });
