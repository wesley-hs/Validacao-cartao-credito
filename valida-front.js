document.getElementById('formCartao').addEventListener('submit', function(e) {
    e.preventDefault();
    const numero = document.getElementById('numeroCartao').value;
    const resultado = validarCartao(numero);
    const divResultado = document.getElementById('resultado');
    if (resultado.bandeira) {
        if (resultado.valido) {
            divResultado.textContent = `Cartão válido! Bandeira: ${resultado.bandeira}`;
            divResultado.style.color = 'green';
        } else {
            divResultado.textContent = `Número inválido para a bandeira ${resultado.bandeira}.`;
            divResultado.style.color = 'red';
        }
    } else {
        divResultado.textContent = 'Cartão inválido ou bandeira não reconhecida.';
        divResultado.style.color = 'red';
    }
});