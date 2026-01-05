var button = document.createElement("button");
button.innerHTML = "Clique para colocar nome!";

document.body.appendChild(button);

button.onclick = function () {
    var nome = window.prompt("Insira seu Nome:");
    alert("Olá, " + nome + "!");
};
