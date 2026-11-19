const ROUPAS = [
    { n: 'Regata do sol', cor: { T: '#2c2836', t: '#f0d27a', J: '#4b5263', j: '#3a3f4d', B: '#2a2a30' } },
    { n: 'Cropped do sol', cor: { T: '#f2e4e6', t: '#2a2733', J: '#3a3f4d', j: '#2c303a', B: '#2a2a30' } },
    { n: 'Jaqueta verde', cor: { T: '#f4f1ec', t: '#2a2733', A: '#6b6f4a', J: '#2a2a30', j: '#1d1d22', B: '#1d1d22' } },
    { n: 'Moletom', cor: { T: '#1d1b22', t: '#ff7aa8', A: '#1d1b22', m: '#1d1b22', J: '#4b5263', j: '#3a3f4d', B: '#f3f3f3' } },
    { n: 'Pijama de lua', cor: { T: '#6a4f8a', t: '#ffd36e', A: '#6a4f8a', m: '#6a4f8a', J: '#6a4f8a', j: '#57406f', B: '#f3c1d3' } },
    { n: 'Vestidinho preto', cor: { T: '#1d1b22', t: '#1d1b22', m: '#1d1b22', J: '#1d1b22', j: '#1d1b22', b: '#1d1b22', B: '#2a2a30' } },
];
ROUPAS.push({ n: 'Fantasia de gatinha', loja: 'roupa_gatinha', orelhas: true, cor: { T: '#1d1b22', t: '#1d1b22', A: '#1d1b22', m: '#1d1b22', J: '#1d1b22', j: '#111', b: '#ff7aa8', B: '#1d1b22' } }, { n: 'Vestido florido', loja: 'roupa_florido', cor: { T: '#f7d6e0', t: '#5fae6a', m: '#f7d6e0', J: '#f7d6e0', j: '#e8bccb', b: '#f7d6e0', B: '#c98d68' } }, { n: 'Camiseta de show', loja: 'roupa_show', cor: { T: '#1d1b22', t: '#f4f1ec', A: '#1d1b22', J: '#3a3f4d', j: '#2c303a', B: '#1a1a1e' } }, { n: 'Xadrez vermelho', loja: 'roupa_xadrez', cor: { T: '#b8323f', t: '#2a1d30', A: '#b8323f', J: '#4b5263', j: '#3a3f4d', B: '#2a2a30' } }, { n: 'Jaqueta preta (presente da Isinha)', loja: 'roupa_casaco', cor: { T: '#1d1b22', t: '#8a8d96', A: '#1d1b22', m: '#1d1b22', J: '#2a2a30', j: '#1d1d22', B: '#1d1d22' } }, { n: 'Listrada verde', cor: { T: '#56602e', t: '#56602e', w: '#ecead6', m: '#56602e', J: '#1d1b22', j: '#141318', B: '#2a2a30' }, mod: (g, d) => { for (let y = 13; y <= 14; y++)
        for (let x = 0; x < 16; x++)
            troca(g, x, y, 'A', 'T'); for (const y of [13, 15, 17])
        for (let x = 0; x < 16; x++)
            troca(g, x, y, 'T', 'w'); } }, { n: 'Regatinha verde + short', cor: { T: '#5a7040', t: '#5a7040', J: '#7a9cc8', j: '#5f80ab', B: '#c98d68' }, mod: (g, d) => { for (let y = 22; y <= 23; y++)
        for (let x = 0; x < 16; x++)
            troca(g, x, y, 'J', 'S'); for (let x = 0; x < 16; x++)
        troca(g, x, 21, 'J', 'j'); } });
const roupaLiberada = i => !ROUPAS[i].loja || tem(ROUPAS[i].loja);
const ACESSORIOS = {
    laco: { n: 'Laço', preco: 10, cor: { L: '#ff5c8d', l: '#c2335f' }, peq: { g: ["L.L", ".l.", "L.L"], x: 9, y: 1 }, gde: { g: ["LL..LL", "LlLLlL", ".LllL.", "LlLLlL", "LL..LL"], x: 19, y: 3 } },
    coleira: { n: 'Coleira com sininho', preco: 12, cor: { C: '#d63e4f', Y: '#ffd36e', y: '#c9a032' }, peq: { g: ["CCCCCCCC", "...YY..."], x: 3, y: 9 }, gde: { g: ["CCCCCCCCCCCCCCCCCCCC", ".........YY.........", ".........yy........."], x: 6, y: 17 } },
    bandana: { n: 'Bandana', preco: 15, cor: { B: '#5b8cff', w: '#fff' }, peq: { g: ["BBBBBBBB", ".BwBBwB.", "..BBBB..", "...BB..."], x: 3, y: 9 }, gde: { x: 8, y: 17 } },
    bruxa: { n: 'Chapéu de bruxa', preco: 18, cor: { O: '#2a1d30', P: '#4a2a6a', Y: '#ffd36e' }, peq: { g: [".....OO...", "....OPPO..", "...OPPPO..", "...OPPPPO.", "OOOYYYYOOO", "OPPPPPPPPO"], x: 2, y: -5 }, gde: { x: 6, y: -9 } },
    coroa: { n: 'Coroa', preco: 30, cor: { Y: '#ffd36e', y: '#e0a830', R: '#ff5c8d' }, peq: { g: ["Y..Y..Y", "YY.Y.YY", "YYYRYYY", "yyyyyyy"], x: 3, y: -2 }, gde: { x: 9, y: -4 } },
};
for (const k in ACESSORIOS) {
    const a = ACESSORIOS[k];
    if (!a.gde.g)
        a.gde.g = a.peq.g.flatMap(r => { const l = [...r].map(c => c + c).join(''); return [l, l]; });
}
const FEFE = { x: 176, y: 150, dir: 'down', anda: false, t: 0, fr: 0, alvo: null, pose: null };
const ladoSentado = g => g.slice(0, 20).concat(["......OJJJJJJJJO", "......OJjJJJJJJO", "...........OJJJO", "...........OJJJO", "..........OBBBBO", "..........OOOOOO"]);
const espelhaG = g => g.map(r => [...r].reverse().join(''));
let fefeSpr = {};
let fefeGrades = null;
