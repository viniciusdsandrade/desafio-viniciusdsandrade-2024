class RecintosZoo {

    /**
     * Analisa os recintos do zoológico e retorna uma lista de recintos viáveis para um novo animal,
     * consideration o tipo e a quantidade de animais.
     *
     * @param {string} animal - O tipo de animal a ser adicionado.
     * @param {number} quantidade - A quantidade de animais a serem adicionados.
     * @returns {object} - Um objeto contendo a lista de recintos viáveis ou uma mensagem de erro.
     */
    analisaRecintos(animal, quantidade) {
        // Valida a quantidade de animais
        if (quantidade <= 0) return {erro: "Quantidade inválida"};

        // Define as características dos animais suportados pelo zoológico
        const animais = {
            "LEAO": {tamanho: 3, biomas: ["savana"], carnivoro: true},
            "LEOPARDO": {tamanho: 2, biomas: ["savana"], carnivoro: true},
            "CROCODILO": {tamanho: 3, biomas: ["rio"], carnivoro: true},
            "MACACO": {tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false},
            "GAZELA": {tamanho: 2, biomas: ["savana"], carnivoro: false},
            "HIPOPOTAMO": {tamanho: 4, biomas: ["savana", "rio"], carnivoro: false}
        };

        // Valida o tipo de animal
        if (!animais[animal]) return {erro: "Animal inválido"};

        // Define os recintos disponíveis no zoológico
        const recintos = [
            {numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{especie: "MACACO", quantidade: 3}]},
            {numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: []},
            {
                numero: 3,
                bioma: "savana e rio",
                tamanhoTotal: 7,
                animaisExistentes: [{especie: "GAZELA", quantidade: 1}]
            },
            {numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: []},
            {numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{especie: "LEAO", quantidade: 1}]}
        ];

        // Inicializa a lista de recintos viáveis
        const recintosViaveis = [];

        /**
         * Verifica se duas espécies de animais são compatíveis para coexistir em um recinto.
         *
         * @param {string} especie1 - A primeira espécie de animal.
         * @param {string} especie2 - A segunda espécie de animal.
         * @param {object} animais - O objeto contendo as características dos animais.
         * @returns {boolean} - True se as espécies são compatíveis, false caso contrário.
         */
        function saoEspeciesCompativeis(especie1, especie2, animais) {
            // Carnívoros só podem coexistir com a própria espécie
            if (animais[especie1].carnivoro || animais[especie2].carnivoro) {
                return especie1 === especie2;
            }
            // Hipopótamos são compatíveis com outras espécies (assumindo que o bioma já foi verificado)
            // Outras espécies são compatíveis entre si
            return true;
        }

        // Itera sobre os recintos disponíveis
        for (const recinto of recintos) {
            // Verifica se o bioma do recinto é adequado para o animal
            if (animais[animal].biomas.includes(recinto.bioma) ||
                (recinto.bioma === "savana e rio" && animais[animal].biomas.includes("savana")) ||
                (recinto.bioma === "savana e rio" && animais[animal].biomas.includes("rio"))) {
                // Calcula o espaço ocupado no recinto pelos animais existentes
                let espacoOcupado = recinto.animaisExistentes.reduce((acc, cur) => acc + cur.quantidade * animais[cur.especie].tamanho, 0);

                // Adiciona 1 ao espaço ocupado se houver outras espécies no recinto e a nova espécie for diferente
                if (recinto.animaisExistentes.length > 0 &&
                    !recinto.animaisExistentes.some(a => a.especie === animal)) {
                    espacoOcupado += 1;
                }

                // Calcula o espaço necessário para a nova espécie
                let espacoNecessario = animais[animal].tamanho * quantidade;

                // Verifica se a nova espécie é compatível com as espécies existentes no recinto
                let compativel = true;
                for (const existente of recinto.animaisExistentes) {
                    if (!saoEspeciesCompativeis(existente.especie, animal, animais)) {
                        compativel = false;
                        break;
                    }
                }

                // Se a nova espécie não for compatível, ignora o recinto
                if (!compativel) continue;

                // Verifica se o recinto tem espaço suficiente para a nova espécie
                if (recinto.tamanhoTotal >= espacoOcupado + espacoNecessario) {
                    // Calcula o espaço livre no recinto após a adição da nova espécie
                    const espacoLivre = recinto.tamanhoTotal - (espacoOcupado + espacoNecessario);
                    // Adiciona o recinto à lista de recintos viáveis
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
                }
            }
        }

        // Se não houver recintos viáveis, retorna uma mensagem de erro
        if (recintosViaveis.length === 0) return {erro: "Não há recinto viável"};

        // Ordena a lista de recintos viáveis pelo número do recinto
        recintosViaveis.sort((a, b) => {
            const recintoA = parseInt(a.split(' ')[1]);
            const recintoB = parseInt(b.split(' ')[1]);
            return recintoA - recintoB;
        });

        // Retorna a lista de recintos viáveis
        return {recintosViaveis};
    }
}

module.exports = RecintosZoo;