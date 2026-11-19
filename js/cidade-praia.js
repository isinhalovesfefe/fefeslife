const DOG_GRADES = {
    orelhudo: ["....OOOOOO....", "...OBBBBBBO...", "..OBBBBBBBBO..", ".OMOBBBBBBOMO.", "OMMOBEBBEBOMMO", "OMMOBBBBBBOMMO", "OMMObbbbbbOMMO", ".OMObbNNbbOMO.", "..OObbbbbbOO..", "...OBbTTbBO...", "..OBBBbbBBBO..", ".OBBBBbbBBBBO.", ".OBbbOBBObbBO.", ".OOOOOOOOOOOO."],
    pontudo: [".OO........OO.", ".OMO......OMO.", ".OMMOOOOOOMMO.", ".OBBBBBBBBBBO.", "OBBBEBBBBEBBBO", "OBBBBBBBBBBBBO", "OBBbbbbbbbbBBO", ".OBbbbNNbbbBO.", "..OObbbbbbOO..", "...OBbTTbBO...", "..OBBBbbBBBO..", ".OBBBBbbBBBBO.", ".OBbbOBBObbBO.", ".OOOOOOOOOOOO."],
    fofo: ["..OO......OO..", ".OMMO....OMMO.", ".OBBBOOOOBBBO.", "OBBBBBBBBBBBBO", "OBBBEBBBBEBBBO", "OBBbBBBBBBbBBO", "OBbbbbbbbbbbBO", "OBBbbbNNbbbBBO", ".OBBbbbbbbBBO.", "OBBBBbTTbBBBBO", "OBbBBBbbBBBbBO", ".OBBBBbbBBBBO.", ".OBbbOBBObbBO.", ".OOOOOOOOOOOO."],
};
const RACAS = [
    { id: 'caramelo', g: 'pontudo', cor: { O: '#2a1d30', B: '#d9934a', b: '#f6dcb0', M: '#b8743a', E: '#1a1018', N: '#1a1018', T: '#ff7aa8' }, nome: ['Caramelo', 'Paçoca', 'Bolacha'] },
    { id: 'labAmarelo', g: 'orelhudo', cor: { O: '#2a1d30', B: '#e8c98a', b: '#f6e6c0', M: '#d4b070', E: '#1a1018', N: '#3a2418', T: '#ff7aa8' }, nome: ['Mel', 'Pipoca', 'Amora'] },
    { id: 'labPreto', g: 'orelhudo', cor: { O: '#0c0b0f', B: '#2a2a30', b: '#4a4a55', M: '#1d1d22', E: '#ffd36e', N: '#0c0b0f', T: '#ff7aa8' }, nome: ['Thor', 'Pretinha', 'Café'] },
    { id: 'luluLaranja', g: 'fofo', cor: { O: '#2a1d30', B: '#e6a050', b: '#f6dcb0', M: '#c8803a', E: '#1a1018', N: '#1a1018', T: '#ff7aa8' }, nome: ['Kaiser', 'Fofura', 'Bolinha'] },
    { id: 'luluCinza', g: 'fofo', cor: { O: '#2a1d30', B: '#a8aab4', b: '#f0eeea', M: '#7a7d86', E: '#1a1018', N: '#1a1018', T: '#ff7aa8' }, nome: ['Floki', 'Nuvem', 'Algodão'] },
    { id: 'pretoBranco', g: 'pontudo', cor: { O: '#0c0b0f', B: '#2a2a30', b: '#f4f1ec', M: '#1d1d22', E: '#1a1018', N: '#0c0b0f', T: '#ff7aa8' }, nome: ['Oreo', 'Panda', 'Domingo'] },
    { id: 'salsicha', g: 'orelhudo', cor: { O: '#2a1d30', B: '#8a4a2a', b: '#c07a4a', M: '#5a2e18', E: '#1a1018', N: '#1a1018', T: '#ff7aa8' }, nome: ['Salsicha', 'Linguiça', 'Bacon'] },
    { id: 'dalmata', g: 'orelhudo', cor: { O: '#2a1d30', B: '#f4f1ec', b: '#ffffff', M: '#2a2a30', E: '#1a1018', N: '#1a1018', T: '#ff7aa8', P: '#2a2a30' }, nome: ['Pintado', 'Bolinhas', 'Dominó'], manchas: [[5, 2], [9, 3], [3, 11], [10, 10], [7, 12]] },
];
const _dogCache = {};
const _tocarMundoOrig = tocarMundo;
window.tocarMundo = function (sx, sy) {
    if (MAPA !== 'quarto' && typeof NPCS !== 'undefined') {
        const [wx, wy] = aMundo(sx, sy);
        const dogs = NPCS.map(n => n.cachorro).filter(Boolean).concat(NPCS.filter(n => n.ehCao));
        const d = dogs.find(d => Math.abs(wx - d.x) < 10 && wy > d.y - 18 && wy < d.y + 4);
        if (d) {
            if (Math.hypot(FEFE.x - d.x, FEFE.y - d.y) < 40)
                fazerCarinhoCachorro(d);
            else
                FEFE.alvo = { x: d.x + (FEFE.x < d.x ? -12 : 12), y: d.y + 2, raio: 12, t: 0, cb: () => fazerCarinhoCachorro(d) };
            return;
        }
    }
    return _tocarMundoOrig(sx, sy);
};
const CID2 = { W: 2300, H: 1450, H3: 980, V3: 1560, V4: 2060, CALC: 1108, JARDIM: 1150, AREIA: 1186, MAR: 1352 };
const LUGARES = [
    { id: 'casa', n: 'Casa da Fefe', x: 185, y: 260 }, { id: 'sorvete', n: 'Sorveteria', x: 625, y: 270 }, { id: 'discos', n: 'Loja de discos', x: 825, y: 270 },
    { id: 'padaria', n: 'Padaria', x: 185, y: 620 }, { id: 'pet', n: 'Pet shop', x: 1230, y: 620 }, { id: 'praca', n: 'Praça da fonte', x: 712, y: 527 },
    { id: 'mirante', n: 'Mirante', x: 1307, y: 152 }, { id: 'parquinho', n: 'Parquinho', x: 700, y: 830 },
    { id: 'livraria', n: 'Livraria', x: 1780, y: 270 }, { id: 'flores', n: 'Floricultura', x: 1950, y: 270 }, { id: 'burger', n: 'Hamburgueria', x: 1800, y: 620 },
    { id: 'acai', n: 'Açaíteria', x: 1470, y: 620 }, { id: 'mercado', n: 'Mercadinho', x: 1790, y: 950 }, { id: 'academia', n: 'Academia', x: 1470, y: 950 },
    { id: 'orla', n: 'Orla da praia', x: 1150, y: 1130 }, { id: 'praia', n: 'Praia', x: 1150, y: 1260 }, { id: 'quiosque', n: 'Quiosque', x: 600, y: 1240 }, { id: 'salva', n: 'Posto salva-vidas', x: 1840, y: 1240 },
];
const _construirCidadeOrig = construirCidade;
window.construirCidade = function () {
    _construirCidadeOrig();
    const C0 = CENAS.cidade, { H1, H2, V1, V2, RUA, CAL } = CID, { W, H, H3, V3, V4, CALC, JARDIM, AREIA, MAR } = CID2, velho = C0.fundo;
    const objs = C0.OBJ, cols = C0.COL, pts = C0.PONTOS;
    const fundo = pinta(W, H, (R, Cc, x) => {
        R(0, 0, W, H, '#86b874');
        for (let i = 0; i < 3600; i++)
            R((i * 137) % W, (i * 71) % H, 2, 1, i % 2 ? '#7aa868' : '#93c482');
        x.drawImage(velho, 0, 0);
        R(1400, H1 - CAL, W - 1400, RUA + CAL * 2, '#cfc9be');
        R(1400, H2 - CAL, W - 1400, RUA + CAL * 2, '#cfc9be');
        R(0, H3 - CAL, W, RUA + CAL * 2, '#cfc9be');
        [V1, V2].forEach(vx => R(vx - CAL, 900, RUA + CAL * 2, H3 - 900, '#cfc9be'));
        [V3, V4].forEach(vx => R(vx - CAL, 0, RUA + CAL * 2, H3 + RUA, '#cfc9be'));
        for (let xx = 1400; xx < W; xx += 12) {
            [H1, H2].forEach(y => { R(xx, y - CAL, 1, CAL, '#bdb6aa'); R(xx, y + RUA, 1, CAL, '#bdb6aa'); });
        }
        for (let xx = 0; xx < W; xx += 12) {
            R(xx, H3 - CAL, 1, CAL, '#bdb6aa');
        }
        const horiz = (y, x0, x1) => { R(x0, y, x1 - x0, RUA, '#45454d'); R(x0, y, x1 - x0, 2, '#f4f1ec'); R(x0, y + RUA - 2, x1 - x0, 2, '#f4f1ec'); for (let xx = x0; xx < x1; xx += 40)
            R(xx, y + RUA / 2 - 1, 22, 3, '#ffd36e'); };
        const vert = (vx, y0, y1) => { R(vx, y0, RUA, y1 - y0, '#45454d'); R(vx, y0, 2, y1 - y0, '#f4f1ec'); R(vx + RUA - 2, y0, 2, y1 - y0, '#f4f1ec'); for (let yy = y0; yy < y1; yy += 40)
            R(vx + RUA / 2 - 1, yy, 3, 22, '#ffd36e'); };
        horiz(H1, 1400, W);
        horiz(H2, 1400, W);
        horiz(H3, 0, W);
        vert(V1, 900, H3 + RUA);
        vert(V2, 900, H3 + RUA);
        vert(V3, 0, H3 + RUA);
        vert(V4, 0, H3 + RUA);
        const cruz = (cx, cy) => { R(cx, cy, RUA, RUA, '#45454d'); for (let i = 6; i < RUA - 6; i += 10) {
            R(cx + i, cy - CAL + 2, 6, CAL - 4, '#f4f1ec');
            R(cx + i, cy + RUA + 2, 6, CAL - 4, '#f4f1ec');
            R(cx - CAL + 2, cy + i, CAL - 4, 6, '#f4f1ec');
            R(cx + RUA + 2, cy + i, CAL - 4, 6, '#f4f1ec');
        } };
        [[V1, H3], [V2, H3], [V3, H1], [V3, H2], [V3, H3], [V4, H1], [V4, H2], [V4, H3]].forEach(([a, b]) => cruz(a, b));
        R(0, CALC, W, JARDIM - CALC, '#efe9dc');
        for (let xx = 0; xx < W; xx += 1) {
            const yy = CALC + 13 + Math.round(Math.sin(xx / 10) * 4);
            R(xx, yy, 1, 2, '#6a6670');
            R(xx, yy + 18, 1, 2, '#6a6670');
        }
        R(0, JARDIM, W, AREIA - JARDIM, '#6fb860');
        for (let i = 0; i < 260; i++)
            R((i * 53) % W, JARDIM + 4 + (i * 13) % 28, 2, 2, ['#ff7aa8', '#ffd36e', '#fff', '#c08cff'][i % 4]);
        for (let xx = 0; xx < W; xx += 160)
            R(xx, JARDIM, 14, AREIA - JARDIM, '#e0d6c0');
        R(0, AREIA, W, MAR - AREIA, '#f0dca0');
        for (let i = 0; i < 1800; i++)
            R((i * 97) % W, AREIA + (i * 31) % (MAR - AREIA), 1, 1, i % 3 ? '#e2ca88' : '#fff2c8');
        const g = x.createLinearGradient(0, MAR, 0, H);
        g.addColorStop(0, '#6cc6e2');
        g.addColorStop(1, '#2f80b8');
        x.fillStyle = g;
        x.fillRect(0, MAR, W, H - MAR);
        R(0, MAR, W, 3, '#fff');
        R(0, MAR + 3, W, 2, 'rgba(255,255,255,.5)');
        const P = (...a) => predioNovo(R, Cc, cols, ...a);
        P(1700, 70, 160, 190, '#f6e6d0', '#7a4f3a', '#c08cff', ['#5d4470', (R, cx, cy) => { R(cx - 8, cy - 3, 7, 6, '#fff'); R(cx + 1, cy - 3, 7, 6, '#fff6c2'); R(cx, cy - 3, 1, 6, '#2a1d30'); }]);
        P(1878, 96, 150, 168, '#e2f5e0', '#4f9a5a', '#ff9ec4', ['#ff7aa8', (R, cx, cy, C) => { C(cx, cy, 4, '#ffd36e'); R(cx - 1, cy - 1, 2, 2, '#ff7aa8'); }]);
        P(2196, 90, 96, 170, '#ffd9c2', '#c96d4a', null, null);
        P(1700, 452, 200, 170, '#ffe3b8', '#c8242e', '#ffd36e', ['#c8242e', (R, cx, cy) => { R(cx - 8, cy - 4, 16, 3, '#e8a030'); R(cx - 8, cy - 1, 16, 2, '#7a3a2a'); R(cx - 8, cy + 1, 16, 3, '#e8a030'); }]);
        P(1410, 470, 120, 152, '#ead6ff', '#5d3a8a', '#8a5ab8', ['#5d3a8a', (R, cx, cy, C) => { C(cx, cy, 4, '#8a3a8a'); R(cx - 1, cy - 4, 2, 2, '#7bd389'); }]);
        P(2196, 470, 96, 150, '#c9d6ff', '#5b6fa8', null, null);
        P(1700, 790, 180, 160, '#fff1c2', '#2f9a4a', '#7bd389', ['#2f9a4a', (R, cx, cy) => { R(cx - 6, cy - 3, 12, 6, '#fff'); R(cx - 4, cy - 1, 8, 1, '#2f9a4a'); }]);
        P(1410, 800, 120, 150, '#d0d0d8', '#2a2a30', '#ff8a3d', ['#2a2a30', (R, cx, cy) => { R(cx - 7, cy - 1, 14, 2, '#ff8a3d'); R(cx - 8, cy - 3, 2, 6, '#ff8a3d'); R(cx + 6, cy - 3, 2, 6, '#ff8a3d'); }]);
        P(2196, 800, 96, 150, '#f3c1d3', '#b8587d', null, null);
        P(1900, 800, 120, 150, '#e2d4ff', '#7a5fa8', null, null, false);
        [[570, 1196], [1470, 1196]].forEach(([qx, qy]) => { R(qx, qy + 14, 60, 34, '#1a1418'); R(qx + 1, qy + 15, 58, 32, '#f6e6c0'); for (let i = 0; i < 60; i += 6)
            R(qx + i, qy, 6, 15, (i / 6) % 2 ? '#fff' : '#5bb8d8'); R(qx + 20, qy + 24, 20, 16, '#7a4f3a'); });
        R(1820, 1196, 40, 48, '#1a1418');
        R(1822, 1198, 36, 26, '#ff5c3a');
        R(1826, 1202, 28, 10, '#fff');
        R(1824, 1224, 4, 20, '#7a4f3a');
        R(1852, 1224, 4, 20, '#7a4f3a');
        cols.push({ x: 570, y: 1210, w: 60, h: 34 }, { x: 1470, y: 1210, w: 60, h: 34 }, { x: 1820, y: 1196, w: 40, h: 46 });
        [[300, 1260], [420, 1300], [880, 1250], [1080, 1300], [1300, 1250], [1650, 1290], [2000, 1260], [2150, 1300]].forEach(([cx, cy], i) => { R(cx - 10, cy, 22, 12, ['#ff7aa8', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff'][i % 5]); for (let k = 0; k < 22; k += 4)
            R(cx - 10 + k, cy, 2, 12, 'rgba(255,255,255,.4)'); });
    });
    C0.fundo = fundo;
    C0.TW = W;
    C0.TH = H;
    C0.MUNDO = { x0: 6, x1: W - 6, y0: 6, y1: MAR + 14 };
    cols.push({ x: 0, y: MAR + 16, w: W, h: H - MAR });
    const arv = pinta(40, 50, (R, C) => { R(17, 28, 6, 20, '#1a1418'); R(18, 28, 4, 20, '#7a4f3a'); C(20, 16, 16, '#1a1418'); C(20, 16, 15, '#4f9a5a'); C(14, 11, 7, '#5fae6a'); C(27, 18, 6, '#5fae6a'); R(8, 46, 24, 3, 'rgba(0,0,0,.15)'); });
    const coq = pinta(40, 60, (R, C) => { for (let i = 0; i < 34; i++)
        R(18 + Math.round(Math.sin(i / 9) * 3), 24 + i, 4, 2, i % 4 ? '#8a5a3a' : '#6a4028'); [[-14, 6], [14, 6], [-10, -2], [10, -2], [0, -6]].forEach(([dx, dy]) => { for (let k = 0; k < 12; k++) {
        R(20 + Math.round(dx * k / 12), 22 + Math.round(dy * k / 12) + Math.round(k * k / 30), 3, 2, '#1a1418');
        R(20 + Math.round(dx * k / 12), 22 + Math.round(dy * k / 12) + Math.round(k * k / 30), 2, 1, '#4f9a5a');
    } }); C(20, 24, 3, '#5a3a20'); });
    const poste = pinta(10, 48, (R) => { R(4, 8, 2, 38, '#2a1d30'); R(2, 46, 6, 2, '#2a1d30'); R(0, 0, 10, 9, '#2a1d30'); R(1, 1, 8, 7, '#ffe79a'); });
    const banco = pinta(36, 12, (R) => { R(0, 0, 36, 12, '#1a1418'); R(1, 1, 34, 4, '#a8714a'); R(1, 7, 34, 4, '#c98f5f'); });
    const novasArv = [[1440, 240], [1520, 240], [1440, 120], [2100, 620], [2280, 274], [1640, 630], [1650, 770], [2100, 940], [60, 960], [340, 960], [560, 960], [860, 960], [1120, 940], [1320, 940]];
    novasArv.forEach(([x, y], i) => { objs.push({ nome: 'arvN' + i, x: x - 20, y: y - 48, img: arv, base: y }); cols.push({ x: x - 4, y: y - 6, w: 8, h: 6 }); });
    for (let xx = 80; xx < W; xx += 160) {
        objs.push({ nome: 'coq' + xx, x: xx - 20 + 60, y: JARDIM - 26, img: coq, base: JARDIM + 32 });
        cols.push({ x: xx + 56, y: JARDIM + 26, w: 8, h: 6 });
    }
    const postesN = [[1640, 272], [2000, 272], [1640, 432], [2140, 432], [1640, 622], [2140, 778], [200, 956], [700, 956], [1200, 956], [1800, 956], [300, 1146], [800, 1146], [1300, 1146], [1800, 1146], [2200, 1146]];
    postesN.forEach(([x, y], i) => { objs.push({ nome: 'posteN' + i, x: x - 5, y: y - 46, img: poste, base: y }); cols.push({ x: x - 2, y: y - 4, w: 4, h: 4 }); });
    [[460, 1118], [1000, 1118], [1560, 1118], [2000, 1118]].forEach(([x, y], i) => { objs.push({ nome: 'bancoO' + i, x, y, img: banco, base: y + 12 }); cols.push({ x, y: y + 2, w: 36, h: 10 }); });
    const gsol = (cor) => pinta(36, 40, (R, C) => { R(17, 14, 2, 26, '#2a1d30'); for (let k = 0; k < 18; k++) {
        const w = Math.round(k * 1.9);
        R(18 - w, k, w * 2, 1, '#1a1418');
        R(19 - w, k, w * 2 - 2, 1, (Math.floor(k / 3) % 2) ? '#fff' : cor);
    } });
    [[310, 1252, '#ff5c8d'], [890, 1242, '#5b8cff'], [1310, 1242, '#ffd36e'], [2010, 1252, '#7bd389'], [1090, 1292, '#c08cff']].forEach(([x, y, c], i) => { objs.push({ nome: 'gsol' + i, x: x - 18, y: y - 36, img: gsol(c), base: y + 2 }); });
    if (luzModo === undefined) { }
    C0.luzes = (C0.luzes || []).concat(postesN.map(([x, y]) => [x, y - 42, 40, 'rgba(255,220,140,.4)']));
    pts.push({ obj: 'livraria', nome: 'Entrar na livraria', x: 1780, y: 290, acao: () => { som.plim(); falar(FEFE, pick(['Cheirinho de livro novo...', 'Quero todos', 'Achei um do Freud!']), 2200); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Te dou um de presente ♥', 1800), 1200); nec('diversao', 10); if (!S.feitos.livrariaC) {
            S.feitos.livrariaC = true;
            ganhar(1);
            salvar();
        } } });
    pts.push({ obj: 'flores', nome: 'Comprar um buquê', x: 1952, y: 290, acao: () => { som.plim(); particula('coracao', FEFE.x, FEFE.y - 26, 3); if (ISI.aqui) {
            falar(FEFE, `Girassóis pra você, ${NOME_MINHA}!`, 2000);
            setTimeout(() => { falar(ISI, 'VOCÊ É PERFEITA', 1800); necIsi('carinho', 25); }, 1000);
        }
        else
            falar(FEFE, 'Vou levar uns girassóis pro quarto', 2000); nec('social', 8); } });
    pts.push({ obj: 'burger', nome: 'Comer um hambúrguer', x: 1800, y: 640, acao: () => { falar(FEFE, 'Um X-tudo, por favor!', 1800); setTimeout(() => comerPrato({ n: 'Hambúrguer', ic: '🍔' }, () => { if (!S.feitos.burgerC) {
            S.feitos.burgerC = true;
            ganhar(2);
        } }), 600); } });
    pts.push({ obj: 'acai', nome: 'Tomar um açaí', x: 1470, y: 640, acao: () => { falar(FEFE, 'Com granola e leite condensado!', 1800); setTimeout(() => comerPrato({ n: 'Açaí', ic: '🍧' }, () => { if (!S.feitos.acaiC) {
            S.feitos.acaiC = true;
            ganhar(2);
        } }), 600); } });
    pts.push({ obj: 'mercado', nome: 'Comprar ração pros gatos', x: 1790, y: 970, acao: () => {
            if (S.feitos.mercadoC)
                return falar(FEFE, 'Já fiz as compras hoje!');
            S.feitos.mercadoC = true;
            for (const id in S.gatos) {
                S.gatos[id].fome = lim(S.gatos[id].fome + 20);
            }
            salvar();
            som.plim();
            falar(FEFE, 'Ração e sachê pros meus bebês!', 2000);
            toast('Os gatos vão comer bem hoje 🐟');
        } });
    pts.push({ obj: 'academia', nome: 'Treinar na academia', x: 1470, y: 970, acao: () => { falar(FEFE, pick(['Hoje é dia de perna...', 'Só 5 minutinhos', 'Amanhã eu venho, prometo']), 2000); nec('energia', -8); nec('diversao', 6); } });
    [[600, 1262], [1500, 1262]].forEach(([x, y], i) => pts.push({ obj: 'quiosque' + i, nome: 'Tomar água de coco', x, y, acao: () => { som.plim(); falar(FEFE, 'Geladinha! 🥥', 1800); nec('fome', 12); nec('energia', 6); if (ISI.aqui) {
            necIsi('fome', 12);
            setTimeout(() => falar(ISI, 'Divide o canudinho?', 1600), 900);
        } if (!S.feitos.cocoC) {
            S.feitos.cocoC = true;
            ganhar(1);
            salvar();
        } } }));
    [[700, 1340], [1250, 1340], [1900, 1340]].forEach(([x, y], i) => pts.push({ obj: 'mar' + i, nome: 'Molhar os pés no mar', x, y, acao: () => { particula('agua', FEFE.x, FEFE.y - 4, 6); falar(FEFE, pick(['TÁ GELADA!', 'Que delícia de mar', 'Vem, amor!']), 1800); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Não joga água em mim!!', 1600), 900); nec('diversao', 12); primeiraVez('mar', 2); } }));
    pts.push({ obj: 'castelo', nome: 'Fazer castelo de areia', x: 1180, y: 1250, acao: fazerCastelo });
    pts.push({ obj: 'pordosol', nome: 'Ver o pôr do sol', x: 2018, y: 1138, acao: () => { const h = new Date().getHours(); falar(FEFE, h >= 16 && h < 19 ? 'Olha esse pôr do sol... 🌅' : 'O mar tá lindo hoje', 2400); if (ISI.aqui)
            setTimeout(() => { falar(ISI, 'Melhor vista: você', 2000); necIsi('carinho', 15); }, 1500); particula('brilho', 2018, 1100, 4); nec('social', 6); } });
    pts.push({ obj: 'salva', nome: 'Falar com o salva-vidas', x: 1840, y: 1262, acao: () => { falar(FEFE, 'Oi! Tá tranquilo o mar hoje?', 1800); setTimeout(() => toast('Salva-vidas: "Tranquilo! Só não vai pro fundo, hein"'), 900); } });
    [[1620, 350], [2120, 352], [1840, 700], [1480, 700], [2260, 676], [300, 1020], [900, 1020], [1500, 1020], [2100, 1020], [400, 1230], [1000, 1280], [1700, 1230], [2200, 1270], [1620, 880], [2120, 860]].forEach(p => COR_CIDADE.push(p));
    const vel = () => 70 + Math.random() * 30;
    CARROS.push({ x: 300, y: H3 + 26, vx: -vel(), cor: '#ff7aa8' }, { x: 1500, y: H3 + 26, vx: -vel(), cor: '#2a2a30' }, { x: 900, y: H3 + 78, vx: vel(), cor: '#f4f1ec' }, { x: 2000, y: H3 + 78, vx: vel(), cor: '#5b8cff' }, { x: 1800, y: H1 + 26, vx: -vel(), cor: '#7bd389' }, { x: 2100, y: H2 + 78, vx: vel(), cor: '#ffd36e' }, { x: V3 + 26, y: 300, vy: vel(), cor: '#c8242e' }, { x: V3 + 78, y: 800, vy: -vel(), cor: '#8fcaff' }, { x: V4 + 26, y: 600, vy: vel(), cor: '#c08cff' }, { x: V4 + 78, y: 150, vy: -vel(), cor: '#ff8a3d' });
    CARROS.forEach(c => { if (!c.mapa) {
        c.mapa = 'cidade';
        c.cd = 0;
        c.w = c.vx ? 68 : 30;
        c.h = c.vx ? 30 : 68;
    } });
};
let castelos = [];
const _desenharCidadeDinOrig = desenharCidadeDin;
window.desenharCidadeDin = function (lista) {
    _desenharCidadeDinOrig(lista);
    if (MAPA !== 'cidade')
        return;
    const t = performance.now() / 1000, { W, MAR, AREIA } = CID2;
    lista.push({ b: -0.9, f: () => {
            for (let k = 0; k < 3; k++) {
                const yy = MAR + 8 + k * 24 + Math.round(Math.sin(t * 1.2 + k) * 2);
                ctx.fillStyle = 'rgba(255,255,255,.5)';
                for (let xx = ((t * 14 * (k % 2 ? 1 : -1)) % 40 + 40) % 40 - 40; xx < W; xx += 40)
                    ctx.fillRect(Math.round(xx), yy, 16, 2);
            }
            const esp = Math.round((Math.sin(t * .8) + 1) * 4);
            ctx.fillStyle = 'rgba(255,255,255,.75)';
            ctx.fillRect(0, MAR - esp + 2, W, 2);
            if (!ehNoiteRua())
                [[500, MAR + 40], [1400, MAR + 30], [2100, MAR + 50]].forEach(([x, y], i) => { const b = Math.round(Math.sin(t * 2 + i) * 1.5); ctx.fillStyle = '#2a1d30'; ctx.fillRect(x - 3, y - 3 + b, 7, 6); ctx.fillStyle = ['#e2ab84', '#f8dcc8', '#a86b48'][i]; ctx.fillRect(x - 2, y - 2 + b, 5, 4); ctx.fillStyle = '#fff'; ctx.fillRect(x - 6, y + 3 + b, 13, 1); });
            castelos.forEach(c => { const x = Math.round(c.x), y = Math.round(c.y); ctx.fillStyle = '#2a1d30'; ctx.fillRect(x - 7, y - 10, 15, 11); ctx.fillStyle = '#e8c878'; ctx.fillRect(x - 6, y - 9, 13, 9); ctx.fillStyle = '#d4b060'; [[-6, -12], [-1, -14], [4, -12]].forEach(([dx, dy]) => { ctx.fillStyle = '#2a1d30'; ctx.fillRect(x + dx - 1, y + dy - 1, 5, 5); ctx.fillStyle = '#e8c878'; ctx.fillRect(x + dx, y + dy, 3, 4); }); ctx.fillStyle = '#ff5c8d'; ctx.fillRect(x, y - 18, 1, 4); ctx.fillRect(x + 1, y - 18, 3, 2); });
        } });
    const h = new Date().getHours();
    if (h >= 7 && h < 18)
        lista.push({ b: 99000, f: () => {
                ctx.fillStyle = 'rgba(30,20,60,.08)';
                [[0, 200, 140], [1, 900, 180], [2, 600, 120], [3, 1300, 160]].forEach(([i, y0, r]) => { const x = ((t * 9 + i * 700) % (W + 400)) - 200, y = y0 + i * 220; ctx.beginPath(); ctx.ellipse(x, y, r, r * .45, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + r * .6, y - 12, r * .6, r * .3, 0, 0, Math.PI * 2); ctx.fill(); });
            } });
    lista.push({ b: 99001, f: () => {
            ctx.fillStyle = '#2a1d30';
            for (let i = 0; i < 7; i++) {
                const x = ((t * (26 + i * 3) + i * 330) % (W + 200)) - 100, y = (i < 4 ? MAR - 80 + i * 18 : 300 + i * 160) + Math.round(Math.sin(t * 2 + i) * 6), a = Math.floor(t * 6 + i) % 2;
                ctx.fillRect(Math.round(x) - 3, y - a, 3, 1);
                ctx.fillRect(Math.round(x) + 1, y - a, 3, 1);
                ctx.fillRect(Math.round(x), y, 1, 1);
                if (i < 4) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(Math.round(x), y, 1, 1);
                    ctx.fillStyle = '#2a1d30';
                }
            }
        } });
};
const _construirNPCsOrig = construirNPCs;
window.construirNPCs = function () {
    _construirNPCsOrig();
    if (MAPA === 'parque')
        NPCS.forEach(n => { if (n.cachorro) {
            const c = novoCachorro({ x: n.cachorro.x, y: n.cachorro.y });
            n.cachorro = c;
        } });
    if (MAPA !== 'cidade')
        return;
    NPCS = [];
    const { H1, H2, V1, V2, RUA, CAL } = CID, { W, H3, V3, V4, CALC, JARDIM, AREIA, MAR } = CID2;
    const linhasH = [H1, H2, H3].flatMap(y => [y - CAL / 2 + 5, y + RUA + CAL / 2 + 5]), linhasV = [V1, V2, V3, V4].flatMap(x => [x - CAL / 2, x + RUA + CAL / 2]);
    const fimV = H3 + RUA;
    for (let i = 0; i < 34; i++) {
        const horiz = i % 2 === 0;
        if (horiz) {
            const y = pick(linhasH), x = 40 + Math.random() * (W - 80);
            NPCS.push(novaPessoa({ x, y, tipo: 'rota', rota: [[30, y], [W - 30, y]].sort(() => Math.random() - .5), falas: FALAS_NPC.cidade, vel: 16 + Math.random() * 12 }));
        }
        else {
            const x = pick(linhasV), y = 40 + Math.random() * (fimV - 80);
            NPCS.push(novaPessoa({ x, y, tipo: 'rota', rota: [[x, 30], [x, fimV - 20]].sort(() => Math.random() - .5), falas: FALAS_NPC.cidade, vel: 16 + Math.random() * 12 }));
        }
    }
    for (let i = 0; i < 10; i++) {
        const orla = i < 4, y = orla ? CALC + 20 + Math.random() * 16 : pick(linhasH), x = 60 + Math.random() * (W - 120);
        const n = novaPessoa({ x, y, tipo: 'rota', rota: [[30, y], [W - 30, y]].sort(() => Math.random() - .5), vel: 14 + Math.random() * 6, falas: ['Oi! Pode fazer carinho, ele é bonzinho', 'Ele adora gente!', 'Diz oi pra moça!', 'Cuidado, ele é curioso'] });
        n.cachorro = novoCachorro({ x: x - 12, y });
        NPCS.push(n);
    }
    for (let i = 0; i < 10; i++) {
        const y = CALC + 10 + Math.random() * 30, x = Math.random() * W;
        NPCS.push(novaPessoa({ x, y, tipo: 'rota', rota: [[30, y], [W - 30, y]].sort(() => Math.random() - .5), vel: 14 + Math.random() * 16, falas: ['Que dia lindo de praia!', 'Bom dia!', '*correndo* ufa ufa', 'Que calor, hein'] }));
    }
    NPCS.push(novaPessoa({ x: 400, y: AREIA + 40, tipo: 'rota', rota: [[60, AREIA + 40], [W - 60, AREIA + 40]], vel: 12, top: '#ffd36e', falas: ['Olha o milho verde!', 'Olha a água de coco geladinha!', 'Picolé, picolé!', 'Olha o sorvete!'] }));
    NPCS.push(novaPessoa({ x: 1600, y: AREIA + 90, tipo: 'rota', rota: [[W - 60, AREIA + 90], [60, AREIA + 90]], vel: 11, top: '#ff8a3d', falas: ['Olha o queijo coalho!', 'Camarão no espetinho!', 'Mate geladinho!'] }));
    for (let i = 0; i < 9; i++) {
        const x = 120 + Math.random() * (W - 240), y = AREIA + 30 + Math.random() * (MAR - AREIA - 50);
        if (bloqueado(x, y, 6))
            continue;
        NPCS.push(novaPessoa({ x, y, tipo: 'passeia', vel: 12, falas: ['Bora pra água?', 'Passa o protetor?', 'Que sol gostoso', 'Olha o castelo que eu fiz!'] }));
    }
    [[712, 600], [1300, 1230], [2100, 1270], [1600, 700]].forEach(([x, y], i) => { const d = novoCachorro({ x, y, raca: i % 2 ? 'caramelo' : pick(RACAS).id }); d.ehCao = true; d.tipo = 'cao'; d.pausa = Math.random() * 3; d.t = 0; d.vel = 26; d.anda = false; d.fr = null; d.coleira = i % 2 ? null : d.coleira; NPCS.push(d); });
};
const _atualizarNPCsOrig = atualizarNPCs;
window.atualizarNPCs = function (dt) {
    if (npcMapa !== MAPA) {
        construirNPCs();
        garcomVisitou = false;
    }
    {
        const todos = NPCS;
        NPCS = todos.filter(n => !n.ehCao);
        try {
            _atualizarNPCsOrig(dt);
        }
        finally {
            NPCS = todos;
        }
    }
    NPCS.forEach(d => {
        if (!d.ehCao)
            return;
        d.t += dt;
        if (d.alvo) {
            const dx = d.alvo[0] - d.x, dy = d.alvo[1] - d.y, dd = Math.hypot(dx, dy);
            if (dd < 2) {
                d.alvo = null;
                d.anda = false;
                d.pausa = 1 + Math.random() * 4;
            }
            else {
                const v = d.vel * dt;
                d.x += dx / dd * Math.min(v, dd);
                d.y += dy / dd * Math.min(v, dd);
                d.anda = true;
            }
        }
        else {
            d.pausa -= dt;
            if (d.pausa <= 0) {
                const p = Math.hypot(FEFE.x - d.x, FEFE.y - d.y) < 70 && Math.random() < .5 ? [FEFE.x + (Math.random() * 30 - 15), FEFE.y + 8] : [d.x + Math.random() * 120 - 60, d.y + Math.random() * 80 - 40];
                if (!bloqueado(p[0], p[1], 5) && caminhoLivre(d.x, d.y, p[0], p[1]))
                    d.alvo = p;
                else
                    d.pausa = 1;
            }
        }
        if (Math.hypot(FEFE.x - d.x, FEFE.y - d.y) < 30 && Math.random() < dt * .15) {
            latir();
            falar(d, pick(['AU!', '*cheira o pé da Fefe*', 'AU AU!', '*abana o rabo*']), 1200);
        }
    });
};
const _desenharNPCsOrig = desenharNPCs;
window.desenharNPCs = function (lista) {
    if (npcMapa !== MAPA || !NPCS.length)
        return;
    const donos = NPCS.filter(n => n.cachorro);
    const guard = donos.map(n => n.cachorro);
    donos.forEach(n => { n._dog = n.cachorro; n.cachorro = null; });
    const todos = NPCS;
    NPCS = NPCS.filter(n => !n.ehCao);
    try {
        _desenharNPCsOrig(lista);
    }
    finally {
        NPCS = todos;
    }
    donos.forEach(n => {
        n.cachorro = n._dog;
        const c = n.cachorro;
        lista.push({ b: c.y, f: () => { desenharCachorro(ctx, c, Math.round(c.x), Math.round(c.y), n.anda); ctx.fillStyle = '#2a1d30'; const hx = Math.round(n.x) + (n.dir === 'left' ? -5 : 5), hy = Math.round(n.y) - 12; const cx = Math.round(c.x), cy = Math.round(c.y) - 6, k = Math.max(1, Math.round(Math.hypot(hx - cx, hy - cy) / 2)); for (let i = 0; i <= k; i++) {
                ctx.fillRect(Math.round(cx + (hx - cx) * i / k), Math.round(cy + (hy - cy) * i / k + Math.sin(i / k * Math.PI) * 2), 1, 1);
            } } });
    });
    NPCS.forEach(d => { if (d.ehCao)
        lista.push({ b: d.y, f: () => desenharCachorro(ctx, d, Math.round(d.x), Math.round(d.y), d.anda) }); });
};
const _andaDog = atualizarNPCs;
window.atualizarNPCs = function (dt) { _andaDog(dt); NPCS.forEach(n => { if (!n.cachorro)
    return; const c = n.cachorro, alvoX = n.x + (n.dir === 'left' ? 14 : n.dir === 'right' ? -14 : -12), alvoY = n.y + 3; c.x += (alvoX - c.x) * Math.min(1, dt * 4); c.y += (alvoY - c.y) * Math.min(1, dt * 4); }); };
let lugarChecaT = 0;
const btnMapa = botaoFlutuante('btnMapa', '🗺️ Mapa');
btnMapa.onclick = e => { e.stopPropagation(); audio(); abrirMapa(); };
GUIA[2].itens.push(['Descobrir todos os lugares da cidade', 'Ande de bike e abra o mapa 🗺️', () => (S.lugares || []).length >= LUGARES.length], ['Molhar os pés no mar', 'Lá embaixo da cidade tem praia!', () => V('mar')], ['Fazer carinho num cachorrinho', 'Toque nos cachorros da rua e do parque', () => V('cachorro')]);
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'cachorro', ic: '🐶', n: 'Amiga dos dogs', d: 'Fazer carinho num cachorrinho', ok: () => V('cachorro') }, { id: 'mar', ic: '🌊', n: 'Pé na areia', d: 'Molhar os pés no mar', ok: () => V('mar') }, { id: 'castelo', ic: '🏰', n: 'Arquiteta', d: 'Fazer um castelo de areia', ok: () => V('castelo') }, { id: 'exploradora', ic: '🗺️', n: 'Exploradora', d: 'Descobrir todos os lugares da cidade', ok: () => (S.lugares || []).length >= LUGARES.length });
if (CENAS.cidade) {
    delete CENAS.cidade;
}
