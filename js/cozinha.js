const THO_COZ = { x: 260, y: 60, mapa: 'cozinha' };
const RECEITAS = {
    brigadeiro: { n: 'Brigadeiro', ic: '🍫', passos: [
            { tipo: 'ordem', txt: 'Coloque na panela, na ordem certa', itens: ['Leite condensado', 'Chocolate em pó', 'Manteiga'] },
            { tipo: 'mexer', txt: 'Mexa sem parar! Arraste o dedo em círculos na panela', alvo: 2200, tempo: 8 },
            { tipo: 'tocar', txt: 'Enrole as bolinhas! Toque rápido', alvo: 14, tempo: 6, ic: '🟤' }
        ] },
    panqueca: { n: 'Panqueca', ic: '🥞', passos: [
            { tipo: 'ordem', txt: 'Faça a massa, na ordem certa', itens: ['Farinha', 'Ovo', 'Leite'] },
            { tipo: 'tocar', txt: 'Bata a massa! Toque rápido', alvo: 16, tempo: 6, ic: '🥣' },
            { tipo: 'tempo', txt: 'Vire a panqueca na hora certa!', rep: 3 }
        ] },
    bolo: { n: 'Bolo de cenoura', ic: '🎂', passos: [
            { tipo: 'ordem', txt: 'Bata no liquidificador, na ordem certa', itens: ['Cenoura', 'Ovos', 'Óleo', 'Açúcar', 'Farinha'] },
            { tipo: 'mexer', txt: 'Misture a massa! Arraste em círculos', alvo: 2000, tempo: 8 },
            { tipo: 'tempo', txt: 'Tire do forno na hora certa!', rep: 1 },
            { tipo: 'tocar', txt: 'Espalhe a cobertura de chocolate!', alvo: 10, tempo: 5, ic: '🍫' }
        ] },
};
