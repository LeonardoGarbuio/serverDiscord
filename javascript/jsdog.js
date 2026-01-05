
function mudarImagem(imagemClicada) {
   
    const imagens = document.querySelectorAll('.huskies-image');
    imagens.forEach(img => img.style.display = 'none');

   
    imagemClicada.style.display = 'block';
    
   
    let nomeImagem = imagemClicada.getAttribute('src');

    if (nomeImagem === 'imagem/cachoro.jpeg') {
        imagemClicada.setAttribute('src', 'imagem/husky.jpg');
    } else if (nomeImagem === 'imagem/husky.jpg') {
        imagemClicada.setAttribute('src', 'imagem/h.jpg');
    } else if (nomeImagem === 'imagem/h.jpg') {
        imagemClicada.setAttribute('src', 'imagem/c.webp');
    } else {
        imagemClicada.setAttribute('src', 'imagem/cachoro.jpeg');
    }
}


window.onload = function() {
    const imagens = document.querySelectorAll('.huskies-image');
    imagens.forEach(img => img.style.display = 'none');
    imagens[0].style.display = 'block'; 
};

var button = document.createElement("button");
button.innerHTML = "Clique para comprar";

document.body.appendChild(button);

button.onclick = function() {
    var numero = window.prompt("Insira seu numero de Cartão:");
    
    if (numero.length === 11) {
        alert("Número válido: " + numero + "!");
    } else {
        alert("Número inválido. O número do cartão deve ter exatamente 11 dígitos.");
    }
};

    