module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current', // ou a versão do Node.js que você está usando
                },
            },
        ],
    ],
};