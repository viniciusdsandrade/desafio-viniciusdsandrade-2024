class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) return { erro: "Quantidade inválida" };

        const animais = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };

        if (!animais[animal]) return { erro: "Animal inválido" };

        const recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
        ];

        const recintosViaveis = [];

        function saoEspeciesCompativeis(especie1, especie2, animais) {
            return !(animais[especie1].carnivoro || animais[especie2].carnivoro) || especie1 === especie2;
        }

        for (const recinto of recintos) {
            if (animais[animal].biomas.includes(recinto.bioma) || (recinto.bioma === "savana e rio" && animais[animal].biomas.includes("savana")) || (recinto.bioma === "savana e rio" && animais[animal].biomas.includes("rio"))) {
                let espacoOcupado = recinto.animaisExistentes.reduce((acc, cur) => acc + cur.quantidade * animais[cur.especie].tamanho, 0);

                if (recinto.animaisExistentes.length > 0 &&
                    !recinto.animaisExistentes.some(a => a.especie === animal)) {
                    espacoOcupado += 1;
                }

                let espacoNecessario = animais[animal].tamanho * quantidade;

                let compativel = true;
                for (const existente of recinto.animaisExistentes) {
                    if (!saoEspeciesCompativeis(existente.especie, animal, animais)) {
                        compativel = false;
                        break;
                    }
                }

                if (!compativel) continue;

                if (recinto.tamanhoTotal >= espacoOcupado + espacoNecessario) {
                    const espacoLivre = recinto.tamanhoTotal - (espacoOcupado + espacoNecessario);
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
                }
            }
        }

        if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };

        recintosViaveis.sort((a, b) => {
            const recintoA = parseInt(a.split(' ')[1]);
            const recintoB = parseInt(b.split(' ')[1]);
            return recintoA - recintoB;
        });

        return { recintosViaveis };
    }
}

module.exports = RecintosZoo;