document.addEventListener('DOMContentLoaded', function () {
    var calcularButton = document.getElementById("calcularButton");
    var limparButton = document.getElementById("limparButton");

    function obterValores() {
        var input = document.getElementById("entrada").value.trim();

        input = input.replace(/\s+/g, '');

        // Atualizando a regex para permitir o operador ^ corretamente
        var match = input.match(/([xX\d.]+)([+\-*/^])([xX\d.]+)(?:=(\d+))?/);

        if (!match) {
            alert("Por favor, insira uma equação válida no formato: X + número, X + número = número final, ou X ^ número");
            return [null, null, null, null];
        }

        var A = match[1].toLowerCase() === 'x' ? 'X' : parseFloat(match[1]);
        var operador = match[2];
        var B = match[3].toLowerCase() === 'x' ? 'X' : parseFloat(match[3]);
        var C = match[4] ? parseFloat(match[4]) : null;

        if ((isNaN(A) && A !== 'X') || (isNaN(B) && B !== 'X') || (C !== null && isNaN(C))) {
            alert("Por favor, insira valores válidos.");
            return [null, null, null, null];
        }

        return [A, operador, B, C];
    }

    function resolverEquacao() {
        var [A, operador, B, C] = obterValores();
        if (A === null || B === null || operador === null) {
            return;
        }

        if (C === null) {
            alert("Por favor, insira um valor para o resultado final da equação.");
            return;
        }

        var resultado;

        if (A === 'X') {
            if (operador === '+') {
                resultado = C - B;
            } else if (operador === '-') {
                resultado = C + B;
            } else if (operador === '*') {
                resultado = C / B;
            } else if (operador === '/') {
                resultado = C * B;
            } else if (operador === '^') {
                resultado = Math.pow(C, 1 / B); 
            }
        } else if (B === 'X') {
            if (operador === '+') {
                resultado = C - A;
            } else if (operador === '-') {
                resultado = A - C;
            } else if (operador === '*') {
                resultado = C / A;
            } else if (operador === '/') {
                resultado = A / C;
            } else if (operador === '^') {
                resultado = Math.log(C) / Math.log(A); 
            }
        }

        document.getElementById("resultadoValue").innerHTML = "Resultado: " + resultado;
    }

    function realizarOperacao() {
        var [A, operador, B] = obterValores();
        if (A === null || B === null || operador === null) {
            return;
        }

        var resultado;
        if (operador === '+') {
            resultado = A + B;
        } else if (operador === '-') {
            resultado = A - B;
        } else if (operador === '*') {
            resultado = A * B;
        } else if (operador === '/') {
            if (B === 0) {
                alert("Divisão por zero não existe burro.");
                return;
            }
            resultado = A / B;
        } else if (operador === '^') {
            resultado = Math.pow(A, B);
        }

        document.getElementById("resultadoValue").innerHTML = "Resultado: " + resultado;
    }

    function calcular() {
        var input = document.getElementById("entrada").value.trim();

        if (input.includes('X') || input.includes('x')) {
            resolverEquacao();
        } else {
            realizarOperacao();
        }
    }

    function limpar() {
        document.getElementById("entrada").value = '';
        document.getElementById("resultadoValue").innerHTML = '';
    }

    calcularButton.onclick = calcular;
    limparButton.onclick = limpar;
});

