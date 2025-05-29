function validarCartao(numero) {
    const cartoes = [
        {
            nome: "American Express",
            prefixos: [/^34/, /^37/],
            tamanhos: [15]
        },
        {
            nome: "Diners Club - Carte Blanche",
            prefixos: [/^300/, /^301/, /^302/, /^303/, /^304/, /^305/],
            tamanhos: [14]
        },
        {
            nome: "Diners Club - International",
            prefixos: [/^36/],
            tamanhos: [14]
        },
        {
            nome: "Diners Club - USA & Canada",
            prefixos: [/^54/, /^55/],
            tamanhos: [16]
        },
        {
            nome: "MasterCard",
            prefixos: [/^5[1-5]/, /^222[1-9]/, /^22[3-9][0-9]/, /^2[3-6][0-9]{2}/, /^27[01][0-9]/, /^2720/],
            tamanhos: [16]
        },
        {
            nome: "Visa",
            prefixos: [/^4/],
            tamanhos: [13, 16, 19]
        },
        {
            nome: "Visa Electron",
            prefixos: [/^4026/, /^417500/, /^4508/, /^4844/, /^4913/, /^4917/],
            tamanhos: [16]
        },
        {
            nome: "Elo",
            prefixos: [
                /^4011(78|79)/, /^431274/, /^438935/, /^451416/, /^457393/, /^4576(31|32)/,
                /^504175/, /^506(699|7[0-9]{2}|8[0-9]{2}|9[0-9]{2})/, /^509[0-9]{3}/,
                /^627780/, /^636297/, /^636368/, /^650(031|032|033|035|036|037|038|039|040|041|042|043|044|045|046|047|048|049|050|051|052|053|054|055|056|057|058|059|060|061|062|063|064|065|066|067|068|069|070|071|072|073|074|075|076|077|078|079|080|081|082|083|084|085|086|087|088|089|090|091|092|093|094|095|096|097|098|099)/,
                /^6504(85|86|87|88|89|90|91|92|93|94|95|96|97|98|99)/, /^6516(52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99)/,
                /^6550(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99)/
            ],
            tamanhos: [16]
        },
        {
            nome: "Hipercard",
            prefixos: [/^38/, /^60/],
            tamanhos: [13, 16, 19]
        },
        {
            nome: "Discover",
            prefixos: [/^6011/, /^622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5])/, /^64[4-9]/, /^65/],
            tamanhos: [16, 19]
        },
        {
            nome: "JCB",
            prefixos: [/^35(2[89]|[3-8][0-9])/],
            tamanhos: [16, 19]
        },
        {
            nome: "Aura",
            prefixos: [/^50[0-9]{2}/],
            tamanhos: [16]
        },
        {
            nome: "Voyager",
            prefixos: [/^8699/],
            tamanhos: [15]
        }
    ];

    // Remove espaços e traços
    const numeroLimpo = numero.replace(/[\s-]/g, '');

    // Algoritmo de Luhn
    function luhnCheck(num) {
        let soma = 0;
        let alternar = false;
        for (let i = num.length - 1; i >= 0; i--) {
            let n = parseInt(num[i]);
            if (alternar) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            soma += n;
            alternar = !alternar;
        }
        return soma % 10 === 0;
    }

    for (const cartao of cartoes) {
        if (
            cartao.prefixos.some(rx => rx.test(numeroLimpo)) &&
            cartao.tamanhos.includes(numeroLimpo.length)
        ) {
            return {
                valido: luhnCheck(numeroLimpo),
                bandeira: cartao.nome
            };
        }
    }

    return { valido: false, bandeira: null };
}