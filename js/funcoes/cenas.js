function trocarCena(nome) {
    if (nome === MAPA)
        return;
    fadeEntao(() => {
        levantar();
        const veioJunto = ISI.aqui && ISI.estado !== 'saindo';
        const de = MAPA;
        if (nome.startsWith('mem_') && !de.startsWith('mem_'))
            ISI.antesMem = veioJunto;
        CENAS[MAPA] = Object.assign(CENAS[MAPA] || {}, { OBJ: OBJ.splice(0), COL: COL.splice(0), PONTOS: PONTOS.splice(0), fundo, TW, TH, PISO_Y, MUNDO });
        if (!CENAS[nome])
            CONSTROI[nome]();
        const c = CENAS[nome];
        OBJ.push(...c.OBJ);
        COL.push(...c.COL);
        PONTOS.push(...c.PONTOS);
        fundo = c.fundo;
        TW = c.TW;
        TH = c.TH;
        PISO_Y = c.PISO_Y;
        MUNDO = c.MUNDO;
        MAPA = nome;
        particulas.length = 0;
        FEFE.alvo = null;
        novelo = null;
        if (nome.startsWith('mem_') || de.startsWith('mem_')) {
            montarFefe();
            montarIsinha();
        }
        if (de === 'mem_date')
            pararFaixa('jazz');
        if (nome === 'mem_date')
            setTimeout(() => { if (MAPA === 'mem_date')
                tocarFaixa('jazz', .45); }, 500);
        pararShow();
        FEFE.danca = 0;
        ISI.danca = 0;
        if (musica) {
            pararMusica();
            vitrolaAte = 0;
        }
        FEFE.bike = nome === 'cidade';
        ISI.bike = nome === 'cidade';
        if (nome !== 'quarto' && entregador) {
            entregador = null;
        }
        if (nome !== 'quarto') {
            if (nome === 'parque')
                fundo = fundoParque();
            const e = c.entrada;
            FEFE.x = e[0];
            FEFE.y = e[1];
            FEFE.dir = 'up';
            ISI.aqui = ['cidade', 'cozinha'].includes(nome) ? (de.startsWith('mem_') ? ISI.antesMem : veioJunto) : true;
            ISI.estado = 'seguindo';
            ISI.pose = null;
            ISI.x = e[0] + 20;
            ISI.y = e[1] - 2;
            ISI.dir = 'left';
            setTimeout(() => falar(ISI.aqui ? ISI : FEFE, pick(ISI.aqui ? c.chegada : (c.chegadaSozinha || c.chegada))), 700);
            if (c.aoEntrar)
                c.aoEntrar();
        }
        else {
            const tp = PONTOS.find(p => p.obj === 'tapete');
            if (tp) {
                if (comidaNoTapete) {
                    tp.nome = `Comer ${COMIDAS_APP[comidaNoTapete].n.toLowerCase()}`;
                    tp.acao = comer;
                }
            }
            for (let i = PONTOS.length - 1; i >= 0; i--)
                if (PONTOS[i].entrega)
                    PONTOS.splice(i, 1);
            if (precisaDecor) {
                precisaDecor = false;
                construirDecor();
            }
            construirFundo();
            FEFE.x = 176;
            FEFE.y = 214;
            FEFE.dir = 'up';
            ISI.aqui = de.startsWith('mem_') ? !!ISI.antesMem : veioJunto;
            ISI.estado = 'seguindo';
            ISI.pose = null;
            ISI.x = 192;
            ISI.y = 220;
            setTimeout(() => falar(FEFE, 'Cheguei, gatinhos!'), 700);
        }
        redimensionar();
        const [cx, cy] = alvoCamera();
        cam.x = cx;
        cam.y = cy;
    });
}
function fundoParque() {
    const W = 400, H = 260, hr = new Date().getHours();
    const [c1] = corCeu(hr);
    return pinta(W, H, (R, C) => {
        R(0, 0, W, H, '#79c26a');
        for (let i = 0; i < 260; i++) {
            const x = (i * 137) % W, y = (i * 71) % H;
            R(x, y, 2, 1, '#64ad57');
            if (i % 7 === 0)
                R(x + 3, y + 2, 1, 1, ['#ff9fbf', '#fff', '#ffd36e'][i % 3]);
        }
        R(0, 126, W, 22, '#c4a272');
        R(0, 128, W, 18, '#d9b98a');
        R(188, 146, 24, H - 146, '#c4a272');
        R(190, 146, 20, H - 146, '#d9b98a');
        R(188, 66, 24, 62, '#c4a272');
        R(190, 66, 20, 62, '#d9b98a');
        for (let x = 4; x < W; x += 14)
            R(x, 136, 4, 1, '#c9a87a');
        for (let y = 150; y < H; y += 12)
            R(198, y, 3, 1, '#c9a87a');
        for (let y = -28; y <= 28; y++)
            for (let x = -62; x <= 62; x++) {
                const k = (x * x) / (62 * 62) + (y * y) / (28 * 28);
                if (k <= 1)
                    R(300 + x, 62 + y, 1, 1, k > 0.86 ? '#4a8ab8' : (k > 0.5 ? '#5ea8d6' : '#6fb7e0'));
            }
        [[270, 56], [322, 74], [300, 48]].forEach(([x, y]) => { C(x, y, 3, '#4f9a5a'); R(x, y - 1, 1, 2, '#6fb7e0'); });
        for (let i = 0; i < 10; i++)
            R(262 + i * 8, 50 + (i % 3) * 10, 4, 1, '#9fd8f5');
        R(30, 152, 74, 32, '#5e3d2e');
        R(32, 154, 70, 28, '#8a5a3a');
        for (let i = 0; i < 40; i++) {
            const x = 34 + (i * 13) % 66, y = 156 + (i * 7) % 24;
            R(x, y + 2, 1, 2, '#4f9a5a');
            R(x - 1, y, 3, 2, ['#ff7aa8', '#ffd36e', '#c08cff', '#ff8a3d', '#fff'][i % 5]);
        }
        if (hr >= 19 || hr < 6)
            for (let i = 0; i < 20; i++)
                R((i * 53) % W, (i * 29) % 40, 1, 1, '#fff');
    });
}
function construirParque() {
    const objs = [], cols = [], pts = [];
    const arvore = pinta(36, 46, (R, C) => { R(15, 28, 6, 16, '#2a1d30'); R(16, 28, 4, 16, '#7a4f3a'); C(18, 16, 15, '#2a1d30'); C(18, 16, 14, '#4f9a5a'); C(13, 12, 8, '#5fae6a'); C(24, 18, 7, '#5fae6a'); C(16, 8, 4, '#86d08f'); R(10, 44, 16, 2, 'rgba(0,0,0,.15)'); });
    const banco = pinta(32, 18, (R) => { R(0, 0, 32, 6, '#2a1d30'); R(1, 1, 30, 4, '#a8714a'); R(0, 7, 32, 6, '#2a1d30'); R(1, 8, 30, 4, '#c98f5f'); R(3, 13, 3, 5, '#2a1d30'); R(26, 13, 3, 5, '#2a1d30'); });
    const carrinho = pinta(32, 40, (R, C) => { R(15, 4, 2, 18, '#2a1d30'); R(0, 0, 32, 8, '#2a1d30'); for (let i = 0; i < 8; i++)
        R(1 + i * 4, 1, 4, 6, i % 2 ? '#fff' : '#ff7aa8'); R(2, 20, 28, 14, '#2a1d30'); R(3, 21, 26, 12, '#8fcaff'); R(3, 21, 26, 3, '#fff'); R(8, 26, 3, 3, '#ff9fbf'); R(14, 26, 3, 3, '#ffd36e'); R(20, 26, 3, 3, '#7bd389'); C(7, 35, 4, '#2a1d30'); C(25, 35, 4, '#2a1d30'); C(7, 35, 2, '#9fa6b8'); C(25, 35, 2, '#9fa6b8'); });
    const poste = pinta(8, 34, (R) => { R(3, 6, 2, 26, '#2a1d30'); R(1, 32, 6, 2, '#2a1d30'); R(0, 0, 8, 7, '#2a1d30'); R(1, 1, 6, 5, '#ffe79a'); });
    const placa = pinta(22, 24, (R) => { R(10, 10, 2, 14, '#5e3d2e'); R(0, 0, 22, 12, '#2a1d30'); R(1, 1, 20, 10, '#c98f5f'); R(4, 5, 9, 2, '#2a1d30'); R(3, 4, 3, 4, '#2a1d30'); R(15, 3, 4, 5, '#ff7aa8'); });
    const patos = document.createElement('canvas');
    patos.width = 124;
    patos.height = 56;
    [[20, 30], [110, 40], [60, 200], [150, 214], [352, 196], [372, 110], [16, 100], [262, 206], [120, 180]].forEach(([x, y], i) => { objs.push({ nome: 'arvore' + i, x: x - 18, y: y - 44, img: arvore, base: y }); cols.push({ x: x - 4, y: y - 6, w: 8, h: 6 }); });
    objs.push({ nome: 'banco1', x: 104, y: 96, img: banco, base: 114 });
    cols.push({ x: 104, y: 100, w: 32, h: 12 });
    objs.push({ nome: 'banco2', x: 244, y: 150, img: banco, base: 168 });
    cols.push({ x: 244, y: 154, w: 32, h: 12 });
    objs.push({ nome: 'sorvete', x: 328, y: 150, img: carrinho, base: 190 });
    cols.push({ x: 328, y: 174, w: 32, h: 16 });
    POSTES.forEach(([x, y], i) => { objs.push({ nome: 'poste' + i, x, y, img: poste, base: y + 34 }); cols.push({ x: x + 1, y: y + 30, w: 6, h: 4 }); });
    objs.push({ nome: 'placa', x: 216, y: 226, img: placa, base: 250 });
    objs.push({ nome: 'lago', x: 238, y: 34, img: patos, base: 40, draw: (c, o) => {
            const t = performance.now() / 1000;
            const vem = performance.now() < patosAte;
            [[300, 60, 0], [280, 72, 2], [322, 54, 4]].forEach(([px, py, f], i) => {
                let x = Math.round(px + Math.sin(t * .5 + f) * 14), y = Math.round(py + Math.cos(t * .4 + f) * 3), dir = Math.cos(t * .5 + f) > 0 ? 1 : -1;
                if (vem) {
                    x = 292 + i * 8 + Math.round(Math.sin(t * 3 + i));
                    y = 80 + Math.round(Math.cos(t * 4 + i));
                    dir = i % 2 ? 1 : -1;
                }
                c.fillStyle = '#2a1d30';
                c.fillRect(x - 4, y - 3, 8, 5);
                c.fillStyle = '#fff';
                c.fillRect(x - 3, y - 2, 6, 3);
                c.fillStyle = '#2a1d30';
                c.fillRect(x + dir * 3 - 1, y - 6, 3, 4);
                c.fillStyle = '#7bd389';
                c.fillRect(x + dir * 3 - 1 + (dir > 0 ? 0 : 1), y - 5, 2, 2);
                c.fillStyle = '#ffb52e';
                c.fillRect(x + dir * 5, y - 4, 2, 1);
            });
        } });
    cols.push({ x: 240, y: 36, w: 120, h: 48 });
    const sentarBanco = (bx, by) => () => { sentarJuntas({ f: ['sentada', bx + 1, by - 12, by + 19, bx + 9, by + 26], i: ['sentada', bx + 15, by - 12, by + 19.1, bx + 24, by + 26], fala: () => pick(['Que paz...', 'Podia ficar aqui pra sempre', 'Olha aquele pato!']) }); if (!S.feitos.banco) {
        S.feitos.banco = true;
        ganhar(1);
        salvar();
    } };
    pts.push({ obj: 'banco1', nome: 'Sentar no banco', x: 120, y: 120, acao: sentarBanco(104, 96) });
    pts.push({ obj: 'banco2', nome: 'Sentar no banco', x: 260, y: 174, acao: sentarBanco(244, 150) });
    pts.push({ obj: 'toalhaP', nome: 'Fazer piquenique', x: 180, y: 178, zona: [150, 134, 60, 36], acao: piquenique });
    pts.push({ obj: 'sorvete', nome: 'Tomar sorvete', x: 344, y: 196, acao: () => { som.plim(); particula('coracao', FEFE.x, FEFE.y - 28, 3); falar(FEFE, 'Morango, por favor!'); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Pra mim de chocolate!'), 1000); if (!S.feitos.sorvete) {
            S.feitos.sorvete = true;
            ganhar(2);
            salvar();
        } } });
    pts.push({ obj: 'pesca', nome: 'Pescar', x: 252, y: 92, zona: [240, 70, 24, 22], acao: pescar });
    pts.push({ obj: 'lago', nome: 'Dar pão pros patos', x: 300, y: 96, acao: () => { patosAte = performance.now() + 7000; quack(); setTimeout(quack, 600); particula('agua', 300, 84, 3); falar(FEFE, 'Vem, patinhos!'); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Olha eles vindo!'), 1200); if (!S.feitos.patos) {
            S.feitos.patos = true;
            ganhar(1);
            salvar();
        } } });
    objs.push({ nome: 'balanco', x: 136, y: 4, img: pinta(42, 34, (R) => { R(0, 0, 42, 3, '#2a1d30'); R(1, 1, 40, 1, '#c96d4a'); R(0, 0, 3, 34, '#2a1d30'); R(39, 0, 3, 34, '#2a1d30'); R(1, 2, 1, 31, '#c96d4a'); R(40, 2, 1, 31, '#c96d4a'); }), base: 36,
        draw: (c, o) => {
            c.drawImage(o.img, o.x, o.y);
            const t = performance.now() / 1000, bal = FEFE.balanco ? Math.round(Math.sin(t * 3) * 3) : Math.round(Math.sin(t) * 1);
            [[146, 0], [166, 1]].forEach(([sx, k]) => { const dy = k ? -bal : bal; c.fillStyle = '#2a1d30'; c.fillRect(sx, o.y + 3, 1, 24 + dy); c.fillRect(sx + 8, o.y + 3, 1, 24 + dy); c.fillRect(sx - 1, o.y + 27 + dy, 11, 3); c.fillStyle = '#d77fa1'; c.fillRect(sx, o.y + 28 + dy, 9, 1); });
        } });
    cols.push({ x: 136, y: 28, w: 3, h: 8 });
    cols.push({ x: 175, y: 28, w: 3, h: 8 });
    pts.push({ obj: 'balanco', nome: 'Andar de balanço', x: 157, y: 46, acao: () => {
            sentarJuntas({ f: ['sentada', 142, 9, 37, 157, 48], i: ['sentada', 162, 9, 37.1, 170, 48], fala: () => pick(['Mais alto!', 'Wiiiii!', 'Me empurra?']), aoLevantar: () => { FEFE.balanco = false; } });
            FEFE.balanco = true;
            if (!S.feitos.balanco) {
                S.feitos.balanco = true;
                ganhar(1);
                salvar();
            }
        } });
    objs.push({ nome: 'fonte', x: 284, y: 212, img: pinta(32, 28, (R, C) => { C(16, 16, 15, '#2a1d30'); C(16, 16, 14, '#b8b0c8'); C(16, 16, 11, '#6fb7e0'); R(14, 4, 4, 12, '#2a1d30'); R(15, 4, 2, 12, '#cfc8dc'); C(16, 4, 3, '#cfc8dc'); }), base: 238,
        draw: (c, o) => { c.drawImage(o.img, o.x, o.y); const t = Math.floor(performance.now() / 180); c.fillStyle = '#d9f0ff'; [[0, -1], [1, 1], [-1, 1]].forEach(([dx, dy], i) => { c.fillRect(o.x + 15 + dx * ((t + i) % 4), o.y + 2 + ((t + i) % 5) + dy, 1, 1); }); } });
    cols.push({ x: 286, y: 220, w: 28, h: 18 });
    pts.push({ obj: 'fonte', nome: 'Jogar uma moedinha', x: 300, y: 208, acao: () => { som.plim(); particula('brilho', 300, 222, 5); falar(FEFE, '*fecha os olhos e faz um pedido*', 2400); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'O que você pediu? Conta!'), 1800); setTimeout(() => falar(FEFE, 'Segredo ♥'), 3200); if (!S.feitos.fonte) {
            S.feitos.fonte = true;
            ganhar(2);
            salvar();
        } } });
    objs.push({ nome: 'cachorro', x: 226, y: 188, img: pinta(16, 14, () => { }), base: 202, mapa: 'parque', draw: (c, o) => {
            const t = performance.now() / 1000, rabo = Math.floor(t * 6) % 2;
            const R = (a, b, w, h, cor) => { c.fillStyle = cor; c.fillRect(o.x + a, o.y + b, w, h); };
            R(3, 5, 10, 7, '#2a1d30');
            R(4, 6, 8, 5, '#c98f5f');
            R(2, 1, 6, 6, '#2a1d30');
            R(3, 2, 4, 4, '#c98f5f');
            R(1, 2, 2, 3, '#7a4f3a');
            R(3, 3, 1, 1, '#2a1d30');
            R(5, 3, 1, 1, '#2a1d30');
            R(4, 5, 1, 1, '#2a1d30');
            R(4, 11, 2, 3, '#2a1d30');
            R(10, 11, 2, 3, '#2a1d30');
            R(12, rabo ? 4 : 6, 3, 2, '#c98f5f');
            R(6, 7, 4, 1, '#d63e4f');
        } });
    cols.push({ x: 228, y: 196, w: 12, h: 6 });
    pts.push({ obj: 'cachorro', nome: 'Carinho no cachorrinho', x: 234, y: 212, acao: () => { latido(); particula('coracao', 234, 186, 3); falar(FEFE, 'Que fofo! Qual o nome dele?'); setTimeout(() => falar(CACHORRO, 'AU! (ele se chama Paçoca)', 2200), 900); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Bora levar ele pra casa?'), 2600); if (!S.feitos.cachorro) {
            S.feitos.cachorro = true;
            ganhar(1);
            salvar();
        } } });
    pts.push({ obj: 'flores', nome: 'Colher flores', x: 66, y: 190, zona: [30, 152, 74, 32], acao: () => { particula('brilho', 66, 166, 4); if (S.feitos.flores)
            return falar(FEFE, 'Já tenho um buquê!'); S.feitos.flores = true; ganhar(2); salvar(); falar(FEFE, ISI.aqui ? `Pra você, ${NOME_MINHA}!` : 'Que lindas!'); if (ISI.aqui)
            setTimeout(() => { falar(ISI, 'AAAA que fofa! ♥'); particula('coracao', ISI.x, ISI.y - 28, 5); }, 1200); } });
    pts.push({ obj: 'placa', nome: 'Voltar pra casa', x: 206, y: 246, acao: () => trocarCena('quarto') });
    CENAS.parque = { OBJ: objs, COL: cols, PONTOS: pts, fundo: fundoParque(), TW: 400, TH: 260, PISO_Y: 0, MUNDO: { x0: 8, x1: 392, y0: 14, y1: 254 }, entrada: [200, 222], chegada: ['Que dia lindo!', 'Olha os patinhos!'], luzes: POSTES.map(([x, y]) => [x + 3, y + 4, 46, 'rgba(255,220,140,.4)']) };
}
function latido() { if (!audio())
    return; const t = AC.currentTime; tom(t, 420, .09, .08, 'square', 260); tom(t + .18, 460, .1, .08, 'square', 280); }
function campainha() { if (!audio())
    return; const t = AC.currentTime; tom(t, 2400, .12, .06, 'triangle'); tom(t + .15, 2400, .18, .06, 'triangle'); }
function quack() { if (!audio())
    return; const t = AC.currentTime; for (let i = 0; i < 2; i++) {
    tom(t + i * .22, 520, .14, .07, 'sawtooth', 300);
} }
function porta(objs, pts, W, H, cor) {
    objs.push({ nome: 'saida', x: W / 2 - 14, y: H - 10, img: pinta(28, 10, (R) => { R(0, 0, 28, 10, '#0c0a10'); R(2, 2, 24, 8, '#000'); R(0, 0, 28, 2, cor || '#c9b8d6'); }), base: H - 9 });
    pts.push({ obj: 'saida', nome: 'Voltar pra casa', x: W / 2, y: H - 16, acao: () => trocarCena('quarto') });
}
function nPessoas(objs, cols, lista, cores) {
    lista.forEach(([x, y], i) => {
        const cor = cores[i % cores.length];
        const img = pinta(12, 22, (R, C) => { C(6, 4, 4, '#0a080d'); C(6, 4, 3, cor[0]); R(2, 9, 8, 10, '#0a080d'); R(3, 10, 6, 9, cor[1]); R(3, 19, 2, 3, '#0a080d'); R(7, 19, 2, 3, '#0a080d'); });
        objs.push({ nome: 'gente' + i, x: x - 6, y: y - 22, img, base: y, draw: (c, o) => { const b = Math.floor(performance.now() / 260 + i) % 2; c.drawImage(o.img, o.x, o.y - b); } });
        cols.push({ x: x - 5, y: y - 4, w: 10, h: 4 });
    });
}
function construirCinema() {
    const W = 256, H = 208, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R) => {
        R(0, 0, W, H, '#3d1823');
        for (let y = 60; y < H; y += 6)
            for (let x = ((y / 6) % 2) * 6; x < W; x += 12)
                R(x, y, 2, 2, '#4a1f2a');
        R(0, 0, W, 58, '#140f1a');
        R(0, 54, W, 4, '#2a1d30');
        R(14, 4, 8, 50, '#8a1c2c');
        R(234, 4, 8, 50, '#8a1c2c');
        for (let y = 6; y < 52; y += 4) {
            R(16, y, 1, 3, '#6a1422');
            R(237, y, 1, 3, '#6a1422');
        }
        R(112, 58, 32, 140, '#2a1018');
        for (let y = 64; y < 196; y += 12) {
            R(114, y, 2, 2, '#ffd36e');
            R(140, y, 2, 2, '#ffd36e');
        }
    });
    objs.push({ nome: 'tela', x: 26, y: 6, img: pinta(204, 46, () => { }), base: 52, draw: (c, o) => {
            const t = performance.now() / 1000, f = Math.floor(t * 2);
            c.fillStyle = '#2a2235';
            c.fillRect(o.x, o.y, 204, 46);
            const pal = { romance: ['#ffd1e3', '#ffb3d1', '#ffe0ec'], terror: ['#3a1018', '#1a0a10', '#5a1422'], animacao: ['#bfe3ff', '#fff1c2', '#d6f5d6'] }[filme] || ['#cfe3ff', '#ffd1e3', '#d6f5d6', '#fff1c2', '#e2d4ff'];
            c.fillStyle = pal[Math.floor(t / 3) % pal.length];
            c.fillRect(o.x + 2, o.y + 2, 200, 42);
            if (filme === 'terror' && Math.floor(t * 4) % 17 === 0) {
                c.fillStyle = '#fff';
                c.fillRect(o.x + 2, o.y + 2, 200, 42);
            }
            if (filme === 'romance') {
                c.fillStyle = '#ff5c8d';
                for (let i = 0; i < 4; i++)
                    c.fillRect(o.x + 30 + i * 45, o.y + 8 + ((f + i * 3) % 30), 3, 3);
            }
            c.fillStyle = '#8fcaff';
            c.fillRect(o.x + 20 + Math.round(Math.sin(t) * 30) + 60, o.y + 12, 26, 18);
            c.fillStyle = '#ff9fbf';
            c.fillRect(o.x + 120 + Math.round(Math.cos(t * .7) * 40), o.y + 20, 18, 14);
            c.fillStyle = '#2a1d30';
            c.fillRect(o.x + 40 + (f % 40) * 3, o.y + 26, 6, 12);
            c.fillRect(o.x + 41 + (f % 40) * 3, o.y + 22, 4, 4);
        } });
    const assento = (w) => pinta(w, 8, (R) => { for (let i = 0; i < w; i += 11) {
        R(i, 0, 11, 8, '#2a1d30');
        R(i + 1, 1, 9, 7, '#b8323f');
    } });
    const encosto = (w) => pinta(w, 8, (R) => { for (let i = 0; i < w; i += 11) {
        R(i, 0, 11, 8, '#2a1d30');
        R(i + 1, 0, 9, 7, '#8a1c2c');
        R(i + 2, 1, 7, 2, '#a8283a');
    } });
    const LIN = [84, 108, 132, 156];
    LIN.forEach((y, li) => { [[22, 88], [146, 88]].forEach(([x, w], k) => { objs.push({ nome: 'filaA' + li + k, x, y: y - 4, img: assento(w), base: y + 4 }); objs.push({ nome: 'filaB' + li + k, x, y: y + 4, img: encosto(w), base: y + 12 }); cols.push({ x, y: y - 2, w, h: 14 }); }); });
    objs.push({ nome: 'pipoca', x: 16, y: 168, img: pinta(40, 30, (R) => { R(0, 8, 40, 22, '#2a1d30'); R(1, 9, 38, 20, '#d63e4f'); for (let x = 2; x < 38; x += 6)
            R(x, 9, 3, 20, '#fff'); R(0, 0, 40, 9, '#2a1d30'); R(1, 1, 38, 7, '#ffe79a'); R(6, 2, 3, 3, '#fff'); R(14, 3, 3, 3, '#fff6c2'); R(24, 2, 3, 3, '#fff'); }), base: 198 });
    cols.push({ x: 16, y: 186, w: 40, h: 12 });
    pts.push({ obj: 'pipoca', nome: 'Comprar pipoca', x: 36, y: 204, acao: () => { som.plim(); particula('brilho', 36, 170, 3); falar(FEFE, 'Uma pipoca grande, por favor!'); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Com MUITA manteiga'), 1100); S.pipoca = true; } });
    pts.push({ obj: 'filaA11', nome: 'Sentar pra ver o filme', x: 128, y: 118, acao: () => {
            abrir('Qual filme?', `<div class="grade">${[['romance', 'Romance 💕'], ['terror', 'Terror 👻'], ['animacao', 'Animação 🌈']].map(([k, n]) => `<button class="px" data-filme="${k}">${n}</button>`).join('')}</div>`);
            document.querySelectorAll('[data-filme]').forEach(b => b.onclick = () => { fechar(); verFilme(b.dataset.filme); });
        } });
    const verFilme = (k) => {
        filme = k;
        sentarJuntas({ f: ['pc', 147, 92, 116, 128, 118], i: ['sentadaCostas', 158, 92, 116.1, 128, 118],
            fala: () => pick(['Shhh, vai começar!', 'Pega na minha mão?', 'Se eu chorar, finge que não viu']),
            aoLevantar: () => { if (ISI.aqui)
                falar(ISI, 'Que filme lindo...'); } });
        if (S.pipoca)
            setTimeout(() => falar(FEFE, '*divide a pipoca*'), 2600);
        const reac = { romance: [[ISI, '*chorando* que lindo...'], [FEFE, 'Você chora em tudo kkk']], terror: [[ISI, 'AAAAAH!'], [FEFE, '*agarra o seu braço*']], animacao: [[FEFE, 'KKKKKKK'], [ISI, 'Esse bichinho é a Lola!']] }[k];
        reac.forEach(([q, txt], i) => setTimeout(() => { if (FEFE.pose === 'assento' && (q !== ISI || ISI.aqui))
            falar(q, txt, 2400); }, 5000 + i * 2200));
        if (!S.feitos.enc_cinema) {
            S.feitos.enc_cinema = true;
            setTimeout(() => ganhar(3), 1500);
            salvar();
        }
    };
    objs.push({ nome: 'cabine', x: 200, y: 150, img: pinta(38, 40, (R) => {
            R(0, 0, 38, 40, '#2a1d30');
            R(1, 1, 36, 38, '#3b6fb0');
            R(1, 1, 36, 8, '#ffd36e');
            R(4, 3, 30, 4, '#2a1d30');
            R(6, 4, 4, 2, '#fff');
            R(12, 4, 4, 2, '#fff');
            R(18, 4, 4, 2, '#fff');
            R(24, 4, 4, 2, '#fff');
            R(6, 12, 18, 26, '#8a1c2c');
            for (let y = 14; y < 38; y += 4)
                R(7, y, 16, 1, '#6a1422');
            R(26, 14, 8, 10, '#2a1d30');
            R(27, 15, 6, 8, '#fff');
        }), base: 190 });
    cols.push({ x: 200, y: 176, w: 38, h: 14 });
    pts.push({ obj: 'cabine', nome: 'Cabine de fotos', x: 218, y: 198, acao: cabineFotos });
    objs.push({ nome: 'garra', x: 64, y: 160, img: pinta(24, 38, (R) => { R(0, 0, 24, 38, '#2a1d30'); R(1, 1, 22, 8, '#ff7aa8'); R(2, 10, 20, 16, '#cfe8ff'); R(2, 22, 20, 4, '#ffd9e6'); [[4, '#e39a4f'], [10, '#8fcaff'], [16, '#c08cff']].forEach(([x, c]) => { R(x, 20, 4, 4, c); }); R(11, 10, 2, 4, '#2a1d30'); R(9, 14, 6, 2, '#2a1d30'); R(1, 27, 22, 10, '#ff9fbf'); R(9, 30, 6, 4, '#2a1d30'); }), base: 198 });
    cols.push({ x: 64, y: 184, w: 24, h: 14 });
    pts.push({ obj: 'garra', nome: 'Máquina de pelúcia', x: 76, y: 202, acao: maquinaPelucia });
    porta(objs, pts, W, H, '#8a1c2c');
    CENAS.cinema = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 64, y1: H - 6 },
        entrada: [128, 175], chegada: ['Que cheiro de pipoca!', 'Vamos sentar no meio?'], escuro: .42, aoEntrar: () => { filme = null; },
        luzes: () => [[128, 30, 120, 'rgba(210,225,255,.38)'], [128, 120, 30, 'rgba(255,210,120,.18)'], [36, 180, 30, 'rgba(255,220,140,.3)']] };
}
function cabineFotos() {
    som.foto();
    const f = $('flash');
    f.style.opacity = 1;
    setTimeout(() => { f.style.opacity = 0; som.foto(); f.style.opacity = 1; setTimeout(() => f.style.opacity = 0, 120); }, 500);
    const c = document.createElement('canvas');
    c.width = 48;
    c.height = 40;
    const x = c.getContext('2d');
    x.fillStyle = '#fff';
    x.fillRect(0, 0, 48, 40);
    const fundos = ['#ffd1e3', '#cfe8ff', '#fff1c2', '#d6f5d6'], poses = ['normal', 'feliz', 'beijo', 'pisca'], isiP = ['frente', 'feliz', 'piscando', 'feliz'];
    const pal = paletaFefe();
    pal.Q = '#0e0d12';
    pal.q = '#3d3b4c';
    pal.k = '#9aa0b8';
    pal.z = '#ff7aa8';
    for (let i = 0; i < 4; i++) {
        const cx = (i % 2) * 24 + 1, cy = Math.floor(i / 2) * 20 + 1;
        x.fillStyle = fundos[i];
        x.fillRect(cx, cy, 22, 18);
        x.save();
        x.beginPath();
        x.rect(cx, cy, 22, 18);
        x.clip();
        x.drawImage(spr(frenteComPose(poses[i], false), pal), cx - 3, cy + 2);
        if (ISI.aqui)
            x.drawImage(isiSpr[isiP[i]], cx + 9, cy + 1);
        else
            x.drawImage(spr(...PART.coracao, 'pc'), cx + 14, cy + 4);
        if (i === 2)
            x.drawImage(spr(...PART.coracao, 'pc'), cx + 9, cy + 1);
        x.restore();
    }
    const d = new Date(), data = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    S.album.push({ img: c.toDataURL('image/png'), data });
    if (S.album.length > 24)
        S.album.shift();
    if (!S.feitos.cabine) {
        S.feitos.cabine = true;
        ganhar(2);
    }
    salvar();
    setTimeout(() => verFoto(S.album.length - 1, true, 'juntas'), 900);
}
function maquinaPelucia() {
    let pos = 0, dir = 1, timer, pegou = false;
    const alvoX = 20 + Math.floor(Math.random() * 3) * 14;
    abrir('Máquina de pelúcia', `<div class="encontro"><canvas id="cvGarra" width="60" height="44" style="max-width:300px"></canvas><p id="garraMsg">Aperte na hora certa!</p></div><button class="btn" id="btnGarra">PEGAR!</button>`, false);
    const desenha = (desce) => {
        const cv = $('cvGarra');
        if (!cv) {
            clearInterval(timer);
            return;
        }
        const x = cv.getContext('2d');
        x.imageSmoothingEnabled = false;
        x.fillStyle = '#ffd9e6';
        x.fillRect(0, 0, 60, 44);
        x.fillStyle = '#cfe8ff';
        x.fillRect(2, 2, 56, 40);
        x.fillStyle = '#ffb3d1';
        x.fillRect(2, 34, 56, 8);
        [[6, '#e39a4f'], [20, '#8fcaff'], [34, '#c08cff'], [48, '#7bd389']].forEach(([px, c]) => { x.fillStyle = '#2a1d30'; x.fillRect(px, 28, 8, 7); x.fillStyle = c; x.fillRect(px + 1, 29, 6, 6); x.fillStyle = '#2a1d30'; x.fillRect(px + 2, 31, 1, 1); x.fillRect(px + 5, 31, 1, 1); });
        x.fillStyle = '#ffd36e';
        x.fillRect(alvoX + 1, 26, 6, 1);
        const gx = 4 + Math.round(pos * 48), gy = desce ? desce : 4;
        x.fillStyle = '#2a1d30';
        x.fillRect(gx + 3, 0, 2, gy);
        x.fillRect(gx, gy, 8, 2);
        x.fillRect(gx, gy + 2, 2, 3);
        x.fillRect(gx + 6, gy + 2, 2, 3);
        if (pegou) {
            x.fillStyle = pegou.c;
            x.fillRect(gx + 1, gy + 4, 6, 5);
        }
    };
    timer = setInterval(() => { pos += dir * .03; if (pos > 1 || pos < 0) {
        dir *= -1;
        pos = Math.max(0, Math.min(1, pos));
    } desenha(); }, 40);
    $('btnGarra').onclick = () => {
        clearInterval(timer);
        $('btnGarra').disabled = true;
        som.pop();
        const gx = 4 + Math.round(pos * 48), perto = Math.abs(gx - alvoX) < 6, ok = perto && Math.random() < .75;
        let y = 4;
        const desce = setInterval(() => {
            y += 2;
            desenha(y);
            if (y >= 24) {
                clearInterval(desce);
                if (ok) {
                    pegou = pick(PELUCIAS);
                    let yy = 24;
                    const sobe = setInterval(() => {
                        yy -= 2;
                        desenha(yy);
                        if (yy <= 4) {
                            clearInterval(sobe);
                            S.pelucias = S.pelucias || [];
                            S.pelucias.push(pegou.n);
                            if (!S.feitos.pelucia) {
                                S.feitos.pelucia = true;
                                ganhar(2);
                            }
                            salvar();
                            som.plim();
                            $('garraMsg').textContent = `Você ganhou: ${pegou.n}! Ela vai pra sua cama.`;
                            falar(ISI.aqui ? ISI : FEFE, ISI.aqui ? 'É SUA! Que sorte!' : 'EBA!');
                            $('btnGarra').disabled = false;
                            $('btnGarra').textContent = 'Jogar de novo';
                            $('btnGarra').onclick = maquinaPelucia;
                        }
                    }, 40);
                }
                else {
                    $('garraMsg').textContent = perto ? 'Escorregou! Quase...' : 'Errou! Tenta de novo.';
                    $('btnGarra').disabled = false;
                    $('btnGarra').textContent = 'Tentar de novo';
                    $('btnGarra').onclick = maquinaPelucia;
                }
            }
        }, 40);
    };
}
function construirShow() {
    const W = 300, H = 230, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R) => {
        R(0, 0, W, H, '#1c1622');
        for (let i = 0; i < 120; i++)
            R((i * 67) % W, 80 + (i * 31) % (H - 80), 2, 1, '#241d2c');
        R(0, 0, W, 30, '#0c0a10');
        R(20, 26, 260, 46, '#2a1d30');
        R(22, 28, 256, 42, '#3b2e4a');
        for (let x = 24; x < 276; x += 16)
            R(x, 30, 14, 1, '#4a3b5c');
        R(20, 70, 260, 4, '#0c0a10');
        R(30, 34, 22, 30, '#111');
        R(32, 36, 18, 26, '#2a2a30');
        for (let y = 38; y < 60; y += 4)
            R(34, y, 14, 1, '#3a3a44');
        R(248, 34, 22, 30, '#111');
        R(250, 36, 18, 26, '#2a2a30');
        for (let y = 38; y < 60; y += 4)
            R(252, y, 14, 1, '#3a3a44');
    });
    objs.push({ nome: 'palco', x: 20, y: 0, img: pinta(260, 72, () => { }), base: 74, draw: (c, o) => {
            const t = performance.now() / 1000, b = Math.floor(t * 4) % 2;
            [[100, 40], [150, 36], [200, 40]].forEach(([x, y], i) => {
                const pulo = (i === 1 ? b : (b + i) % 2);
                c.fillStyle = '#07060a';
                c.fillRect(x - 4, y - pulo, 8, 8);
                c.fillRect(x - 6, y + 8 - pulo, 12, 16);
                c.fillRect(x - 5, y + 24 - pulo, 4, 6);
                c.fillRect(x + 1, y + 24 - pulo, 4, 6);
                if (i !== 1) {
                    c.fillRect(x - 10, y + 12 - pulo, 20, 3);
                }
            });
            c.fillStyle = '#07060a';
            c.fillRect(140, 58, 20, 8);
            c.fillRect(132, 52, 8, 8);
            c.fillRect(160, 52, 8, 8);
            const cs = ['#ff7aa8', '#8fcaff', '#ffd36e', '#7bd389', '#c08cff'];
            for (let i = 0; i < 5; i++) {
                c.fillStyle = cs[(i + Math.floor(t * 2)) % 5];
                c.globalAlpha = .25;
                c.beginPath();
                const x0 = 40 + i * 55;
                c.moveTo(x0, 0);
                c.lineTo(x0 - 26 + Math.sin(t + i) * 20, 74);
                c.lineTo(x0 + 26 + Math.sin(t + i) * 20, 74);
                c.fill();
            }
            c.globalAlpha = 1;
        } });
    cols.push({ x: 20, y: 30, w: 260, h: 44 });
    nPessoas(objs, cols, [[60, 110], [90, 100], [210, 104], [240, 114], [70, 150], [230, 150], [120, 170], [190, 172], [40, 190], [260, 190]], [['#3a2a3a', '#2a2235'], ['#c99a5a', '#1d1b22'], ['#6b4b3a', '#3b2e4a'], ['#1a1418', '#4a3b5c']]);
    objs.push({ nome: 'bar', x: 8, y: 196, img: pinta(70, 24, (R) => { R(0, 0, 70, 24, '#2a1d30'); R(1, 1, 68, 9, '#7a4f3a'); R(1, 10, 68, 13, '#5e3d2e'); [6, 18, 30, 44, 58].forEach((x, i) => { R(x, 2, 4, 6, ['#ff7aa8', '#ffd36e', '#7bd389', '#8fcaff', '#c08cff'][i]); R(x + 1, 1, 2, 1, '#fff'); }); }), base: 220 });
    cols.push({ x: 8, y: 202, w: 70, h: 18 });
    pts.push({ obj: 'bar', nome: 'Pegar um drink', x: 43, y: 192, acao: () => { som.plim(); falar(FEFE, 'Dois sucos de morango!'); particula('brilho', 43, 196, 3); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Saúde! ♥'), 1100); } });
    objs.push({ nome: 'merch', x: 222, y: 196, img: pinta(70, 24, (R) => { R(0, 0, 70, 24, '#2a1d30'); R(1, 1, 68, 22, '#3b2e4a'); [[6, '#1d1b22'], [24, '#f4f1ec'], [42, '#b8323f']].forEach(([x, c]) => { R(x, 4, 14, 12, '#0c0a10'); R(x + 1, 5, 12, 10, c); R(x - 1, 6, 2, 4, c); R(x + 13, 6, 2, 4, c); R(x + 4, 8, 6, 4, '#ff7aa8'); }); }), base: 220 });
    cols.push({ x: 222, y: 202, w: 70, h: 18 });
    pts.push({ obj: 'merch', nome: 'Comprar camiseta', x: 257, y: 192, acao: () => {
            if (!tem('roupa_show')) {
                S.compras.push('roupa_show');
                salvar();
                som.plim();
                toast('Camiseta de show nova no guarda-roupa!');
                falar(FEFE, 'Vou usar amanhã!');
            }
            else
                falar(FEFE, 'Já tenho a minha!');
        } });
    pts.push({ obj: 'lanterna', nome: 'Acender a lanterna do celular', x: 150, y: 150, zona: [130, 136, 40, 28], acao: () => { lanternasAte = performance.now() + 12000; falar(FEFE, '*levanta o celular*'); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Parece um céu de estrelas...'), 1200); setTimeout(() => falar(PALCO, 'Essa é pra vocês, casal lindo aí!', 2600), 2400); } });
    pts.push({ obj: 'palco', nome: 'Curtir na frente do palco', x: 150, y: 90, acao: () => {
            dancar(7000);
            particula('nota', FEFE.x, FEFE.y - 28, 4);
            falar(FEFE, 'AAAAAA!!!', 1600);
            if (ISI.aqui)
                setTimeout(() => falar(ISI, 'ESSA É A MINHA MÚSICA!'), 900);
            if (Math.random() < .6)
                setTimeout(() => {
                    if (MAPA !== 'show')
                        return;
                    falar(PALCO, '*joga a palheta pra plateia*', 2000);
                    particula('brilho', 150, 70, 3);
                    abrir('A palheta!', `<p style="text-align:center;font-size:18px">A guitarrista jogou a palheta na sua direção!</p><button class="btn" id="btnPalheta">PEGAR!</button>`, false);
                    const t0 = performance.now();
                    $('btnPalheta').onclick = () => { fechar(); if (performance.now() - t0 < 1600) {
                        S.palhetas = (S.palhetas || 0) + 1;
                        salvar();
                        som.plim();
                        toast('Você pegou a palheta! Guardou na carteira ♥');
                        falar(FEFE, 'PEGUEI!!!');
                        if (ISI.aqui)
                            setTimeout(() => falar(ISI, 'NÃO ACREDITO!'), 700);
                    }
                    else
                        falar(FEFE, 'Ahhh, outra pessoa pegou!'); };
                    setTimeout(() => { if ($('btnPalheta')) {
                        fechar();
                        falar(FEFE, 'Ahhh, alguém pegou primeiro!');
                    } }, 1800);
                }, 3000);
            if (!S.feitos.enc_show) {
                S.feitos.enc_show = true;
                setTimeout(() => ganhar(3), 1500);
                salvar();
            }
        } });
    porta(objs, pts, W, H, '#4a3b5c');
    CENAS.show = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 80, y1: H - 6 },
        entrada: [150, 188], chegada: ['Que lotado!', 'Vamos lá pra frente?'], escuro: .4, aoEntrar: tocarShow,
        posTint: (c) => { if (performance.now() < lanternasAte) {
            const t = performance.now() / 1000;
            for (let i = 0; i < 26; i++) {
                const x = 20 + (i * 37) % 260, y = 96 + (i * 23) % 100;
                if ((Math.floor(t * 3) + i) % 5) {
                    c.fillStyle = '#fffbe0';
                    c.fillRect(x, y - 14, 1, 2);
                    c.fillStyle = 'rgba(255,250,220,.25)';
                    c.fillRect(x - 2, y - 16, 5, 5);
                }
            }
        } },
        luzes: () => { const t = performance.now() / 1000; return [[150 + Math.sin(t) * 90, 90 + Math.cos(t * 1.3) * 30, 40, 'rgba(255,120,180,.3)'], [150 + Math.cos(t * .8) * 90, 120, 40, 'rgba(120,200,255,.3)'], [150, 50, 90, 'rgba(255,230,160,.25)'], [43, 205, 24, 'rgba(255,220,140,.3)'], [257, 205, 24, 'rgba(255,220,140,.3)']]; } };
}
function tocarShow() {
    if (!audio() || showSom)
        return;
    const a = AC;
    let prox = a.currentTime + .1, i = 0;
    const out = a.createGain();
    out.gain.value = .5;
    out.connect(mestre);
    const bumbo = (t) => { const o = a.createOscillator(), g = a.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + .15); g.gain.setValueAtTime(.5, t); g.gain.exponentialRampToValueAtTime(.001, t + .2); o.connect(g); g.connect(out); o.start(t); o.stop(t + .22); };
    const caixa = (t) => { const s = a.createBufferSource(); s.buffer = ruido(); const f = a.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 1500; const g = a.createGain(); g.gain.setValueAtTime(.25, t); g.gain.exponentialRampToValueAtTime(.001, t + .15); s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + .16); };
    const baixo = (t, n) => { const o = a.createOscillator(), f = a.createBiquadFilter(), g = a.createGain(); o.type = 'sawtooth'; o.frequency.value = 440 * Math.pow(2, (n - 69) / 12); f.type = 'lowpass'; f.frequency.value = 500; g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.001, t + .24); o.connect(f); f.connect(g); g.connect(out); o.start(t); o.stop(t + .25); };
    const notas = [40, 40, 43, 45, 40, 40, 47, 45];
    const timer = setInterval(() => { while (prox < a.currentTime + .6) {
        const p = i % 8;
        if (p % 4 === 0)
            bumbo(prox);
        if (p % 4 === 2)
            caixa(prox);
        baixo(prox, notas[(i >> 1) % 8]);
        prox += .25;
        i++;
    } }, 120);
    showSom = { out, timer };
}
function pararShow() { if (!showSom)
    return; clearInterval(showSom.timer); const o = showSom.out; showSom = null; o.gain.setTargetAtTime(.0001, AC.currentTime, .3); setTimeout(() => o.disconnect(), 1500); }
function construirEstrelas() {
    const W = 320, H = 300, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R, C) => {
        for (let y = 0; y < 114; y++) {
            const k = y / 114;
            const r = Math.round(10 + k * 30), g = Math.round(9 + k * 16), b = Math.round(40 + k * 50);
            R(0, y, W, 1, `rgb(${r},${g},${b})`);
        }
        for (let x = 0; x < W; x++) {
            const h = Math.round(8 + 5 * Math.sin(x / 37) + 3 * Math.sin(x / 13));
            R(x, 112 - h, 1, h + 2, '#0f1f16');
        }
        R(0, 112, W, H - 112, '#2a4f36');
        for (let i = 0; i < 300; i++)
            R((i * 53) % W, 116 + (i * 37) % (H - 116), 1, 2, i % 3 ? '#33603f' : '#3f7a48');
        R(150, 250, 20, 50, '#5a4a3a');
        R(152, 250, 16, 50, '#6a5844');
        for (let y = -22; y <= 22; y++)
            for (let x = -40; x <= 40; x++) {
                const k = x * x / 1600 + y * y / 484;
                if (k <= 1)
                    R(250 + x, 222 + y, 1, 1, k > .85 ? '#1d2a4a' : '#14204a');
            }
    });
    const arvore = pinta(30, 40, (R, C) => { R(13, 24, 4, 16, '#1a1418'); C(15, 14, 13, '#132a1c'); C(10, 12, 7, '#1a3a26'); C(20, 16, 6, '#1a3a26'); });
    [[20, 168], [300, 160], [40, 286], [292, 290], [96, 150], [200, 148]].forEach(([x, y], i) => { objs.push({ nome: 'arv' + i, x: x - 15, y: y - 38, img: arvore, base: y }); cols.push({ x: x - 3, y: y - 5, w: 6, h: 5 }); });
    cols.push({ x: 208, y: 202, w: 84, h: 42 });
    objs.push({ nome: 'lago', x: 210, y: 200, img: pinta(80, 44, () => { }), base: 201, draw: (c) => {
            const t = performance.now() / 1000;
            for (let i = 0; i < 16; i++) {
                if ((Math.floor(t * 2) + i) % 4) {
                    c.fillStyle = '#cfd8ff';
                    c.fillRect(222 + (i * 13) % 56, 208 + (i * 7) % 28, 1, 1);
                }
            }
            c.fillStyle = 'rgba(255,244,194,.6)';
            c.fillRect(268, 212, 4, 2);
        } });
    objs.push({ nome: 'toalha', x: 110, y: 176, img: pinta(46, 30, (R) => { R(0, 0, 46, 30, '#2a1d30'); for (let y = 1; y < 29; y += 4)
            for (let x = 1; x < 45; x += 4)
                R(x, y, 4, 4, ((x + y) / 4) % 2 < 1 ? '#d63e4f' : '#f4f1ec'); }), base: 177 });
    pts.push({ obj: 'toalha', nome: 'Deitar e olhar o céu', x: 133, y: 212, acao: () => {
            ceuT = 0;
            constVista = 0;
            sentarJuntas({ f: ['deitada', 114, 178, 208, 126, 216], i: ['deitada', 130, 178, 208.1, 142, 216], fala: () => pick(['Olha quantas estrelas...', 'Que céu lindo', 'Fica comigo aqui pra sempre?']) });
            if (!S.feitos.enc_estrelas) {
                S.feitos.enc_estrelas = true;
                setTimeout(() => ganhar(3), 1500);
                salvar();
            }
        } });
    objs.push({ nome: 'telescopio', x: 54, y: 168, img: pinta(16, 28, (R) => { R(2, 2, 12, 5, '#2a1d30'); R(3, 3, 10, 3, '#c9b8d6'); R(12, 1, 3, 7, '#2a1d30'); R(7, 7, 2, 12, '#2a1d30'); R(2, 18, 2, 10, '#2a1d30'); R(12, 18, 2, 10, '#2a1d30'); R(7, 18, 2, 10, '#2a1d30'); }), base: 196 });
    cols.push({ x: 56, y: 190, w: 12, h: 6 });
    pts.push({ obj: 'telescopio', nome: 'Olhar no telescópio', x: 62, y: 204, acao: () => {
            const q = pick(['lua', 'saturno', 'nebulosa']);
            abrir('Telescópio', `<div class="encontro"><canvas id="cvTel" width="60" height="60" style="max-width:260px;border-radius:50%"></canvas><p>${q === 'lua' ? 'Dá pra ver as crateras da lua!' : q === 'saturno' ? 'É SATURNO! Com os anéis e tudo!' : 'Uma nebulosa cor-de-rosa... parece um coração.'}</p></div>`);
            const x = $('cvTel').getContext('2d');
            x.fillStyle = '#05040f';
            x.fillRect(0, 0, 60, 60);
            for (let i = 0; i < 40; i++) {
                x.fillStyle = '#fff';
                x.fillRect((i * 37) % 60, (i * 23) % 60, 1, 1);
            }
            if (q === 'lua') {
                x.fillStyle = '#f3ead9';
                x.beginPath();
                x.arc(30, 30, 20, 0, 7);
                x.fill();
                x.fillStyle = '#d9cfbd';
                [[22, 24, 4], [36, 34, 5], [30, 18, 3], [24, 38, 3]].forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); });
            }
            if (q === 'saturno') {
                x.fillStyle = '#e9c48a';
                x.beginPath();
                x.arc(30, 30, 11, 0, 7);
                x.fill();
                x.strokeStyle = '#d9b06a';
                x.lineWidth = 3;
                x.beginPath();
                x.ellipse(30, 30, 22, 6, -.3, 0, 7);
                x.stroke();
                x.fillStyle = '#e9c48a';
                x.fillRect(22, 22, 16, 6);
            }
            if (q === 'nebulosa') {
                for (let i = 0; i < 300; i++) {
                    const a = i / 300 * Math.PI * 2;
                    x.fillStyle = ['#ff7aa8', '#c08cff', '#ffb3d1'][i % 3];
                    x.fillRect(30 + Math.round(16 * Math.pow(Math.sin(a), 3)), 24 - Math.round(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)), 2, 2);
                }
            }
            if (ISI.aqui)
                setTimeout(() => falar(ISI, 'Deixa eu ver também!'), 600);
        } });
    objs.push({ nome: 'saida', x: W / 2 - 10, y: H - 22, img: pinta(20, 22, (R) => { R(9, 8, 2, 14, '#5e3d2e'); R(0, 0, 20, 10, '#2a1d30'); R(1, 1, 18, 8, '#c98f5f'); R(4, 4, 8, 2, '#2a1d30'); R(3, 3, 3, 4, '#2a1d30'); }), base: H });
    pts.push({ obj: 'saida', nome: 'Voltar pra casa', x: W / 2, y: H - 10, acao: () => trocarCena('quarto') });
    CENAS.estrelas = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 124, y1: H - 6 },
        entrada: [160, 262], chegada: ['Que céu lindo!', 'Vamos deitar na toalha?'], escuro: .28,
        luzes: () => { const t = performance.now() / 1000; return Array.from({ length: 7 }, (_, i) => [60 + ((i * 97 + Math.sin(t + i) * 20) % 220), 150 + ((i * 53 + Math.cos(t * .8 + i) * 14) % 130), 10, 'rgba(230,245,140,.35)']); },
        posTint: (c) => {
            const t = performance.now() / 1000, deitada = FEFE.pose === 'assento';
            if (deitada)
                ceuT += 1 / 60;
            const gl = c.createRadialGradient(262, 30, 4, 262, 30, 40);
            gl.addColorStop(0, 'rgba(255,250,215,.35)');
            gl.addColorStop(1, 'rgba(0,0,0,0)');
            c.fillStyle = gl;
            c.fillRect(222, -10, 80, 80);
            c.fillStyle = '#fff6d0';
            for (let yy = -11; yy <= 11; yy++)
                for (let xx = -11; xx <= 11; xx++) {
                    if (xx * xx + yy * yy <= 121 && (xx - 6) * (xx - 6) + (yy + 4) * (yy + 4) > 100)
                        c.fillRect(262 + xx, 30 + yy, 1, 1);
                }
            CEU_ESTRELAS.forEach(([x, y, s, i]) => {
                const br = (Math.sin(t * 2 + i * 1.7) + 1) / 2;
                if (br < .15 && i % 3 === 0)
                    return;
                c.fillStyle = i % 11 === 0 ? '#ffe79a' : i % 7 === 0 ? '#cfe3ff' : '#ffffff';
                c.globalAlpha = .55 + br * .45;
                c.fillRect(x, y, s, s);
                if (s > 1) {
                    c.globalAlpha = .35 * br;
                    c.fillRect(x - 1, y, 1, s);
                    c.fillRect(x + s, y, 1, s);
                    c.fillRect(x, y - 1, s, 1);
                    c.fillRect(x, y + s, s, 1);
                }
            });
            c.globalAlpha = 1;
            const forca = Math.min(1, Math.max(0, (ceuT - 1.5) / 3));
            if (forca > 0) {
                CONSTELACOES.forEach((k, ki) => {
                    const f = Math.min(1, Math.max(0, forca * 3 - ki));
                    if (!f)
                        return;
                    c.strokeStyle = `rgba(255,200,230,${.55 * f})`;
                    c.lineWidth = 1;
                    c.beginPath();
                    k.pts.forEach(([x, y], j) => j ? c.lineTo(x + .5, y + .5) : c.moveTo(x + .5, y + .5));
                    c.stroke();
                    k.pts.forEach(([x, y]) => { c.fillStyle = `rgba(255,255,255,${f})`; c.fillRect(x - 1, y - 1, 2, 2); });
                    if (f >= 1 && constVista <= ki) {
                        constVista = ki + 1;
                        const quem = ki % 2 ? FEFE : (ISI.aqui ? ISI : FEFE);
                        falar(quem, `Olha! Parece ${k.nome}!`, 2600);
                    }
                });
            }
            const per = deitada ? 7 : 16, fase = (t % per) / per;
            if (fase < .12) {
                const k = fase / .12, sx = 30 + k * 200, sy = 8 + k * 40;
                c.fillStyle = '#fff';
                c.fillRect(Math.round(sx), Math.round(sy), 3, 1);
                for (let j = 1; j < 8; j++) {
                    c.globalAlpha = .6 - j * .07;
                    c.fillRect(Math.round(sx - j * 4), Math.round(sy - j * .8), 4, 1);
                }
                c.globalAlpha = 1;
                if (deitada && fase > .05 && fase < .06 && !construirEstrelas.ultimo || (construirEstrelas.ultimo && performance.now() - construirEstrelas.ultimo > per * 900 && fase > .05 && fase < .07 && deitada)) {
                    construirEstrelas.ultimo = performance.now();
                    falar(ISI.aqui ? ISI : FEFE, pick(['Estrela cadente! Faz um pedido!', 'VIU ISSO?!', 'Pedi você de novo']), 2400);
                }
            }
        } };
}
function construirCafe() {
    const W = 240, H = 176, objs = [], cols = [], pts = [];
    const [c1] = corCeu(new Date().getHours());
    const fundo = pinta(W, H, (R) => {
        for (let y = 46; y < H; y += 8)
            for (let x = 0; x < W; x += 8)
                R(x, y, 8, 8, ((x + y) / 8) % 2 ? '#e8d6b8' : '#d9c3a0');
        R(0, 0, W, 46, '#7a9a7a');
        for (let x = 0; x < W; x += 10)
            R(x, 0, 5, 42, '#6f8f6f');
        R(0, 42, W, 4, '#5e3d2e');
        [[14, 8], [60, 8]].forEach(([x, y]) => { R(x, y, 34, 24, '#2a1d30'); R(x + 1, y + 1, 32, 22, c1); R(x + 16, y + 1, 2, 22, '#2a1d30'); R(x - 2, y + 24, 38, 3, '#5e3d2e'); });
        R(110, 6, 34, 22, '#2a1d30');
        R(111, 7, 32, 20, '#1f2a1f');
        R(114, 10, 18, 1, '#fff');
        R(114, 14, 24, 1, '#fff');
        R(114, 18, 14, 1, '#fff');
        R(114, 22, 20, 1, '#fff');
        R(150, 14, 80, 2, '#5e3d2e');
        [156, 168, 180, 194, 206, 218].forEach((x, i) => { R(x, 6, 8, 8, '#2a1d30'); R(x + 1, 7, 6, 7, ['#f4f1ec', '#ff9fbf', '#8fcaff', '#ffd36e', '#7bd389', '#c08cff'][i]); });
    });
    objs.push({ nome: 'balcao', x: 140, y: 44, img: pinta(92, 34, (R) => {
            R(0, 0, 92, 34, '#2a1d30');
            R(1, 1, 90, 12, '#a8714a');
            R(1, 13, 90, 20, '#7a4f3a');
            for (let x = 6; x < 90; x += 14)
                R(x, 16, 1, 16, '#5e3d2e');
            R(6, -0, 22, 12, '#2a1d30');
            R(7, 1, 20, 10, '#9fa6b8');
            R(10, 3, 4, 3, '#2a1d30');
            R(18, 3, 6, 6, '#5e3d2e');
            R(40, 2, 40, 10, '#2a1d30');
            R(41, 3, 38, 8, '#d9f0ff');
            [[44, '#ff9fbf'], [54, '#ffd36e'], [64, '#c98f5f'], [72, '#fff']].forEach(([x, c]) => { R(x, 6, 6, 5, c); R(x, 5, 6, 1, '#fff'); });
        }), base: 78 });
    cols.push({ x: 140, y: 48, w: 92, h: 30 });
    pts.push({ obj: 'balcao', nome: 'Pedir no balcão', x: 186, y: 88, acao: () => {
            const op = [['cappuccino', 'Cappuccino'], ['chocolate', 'Chocolate quente'], ['cha', 'Chá de camomila'], ['paodequeijo', 'Pão de queijo'], ['bolo', 'Bolo de cenoura'], ['brigadeiro', 'Brigadeiro']];
            abrir('Cardápio', `<div class="grade">${op.map(([k, n]) => `<button class="px" data-ped="${k}">${n}</button>`).join('')}</div>`);
            document.querySelectorAll('[data-ped]').forEach(b => b.onclick = () => { pedidoCafe = b.dataset.ped; fechar(); som.plim(); falar(FEFE, `Um ${b.textContent.toLowerCase()}, por favor!`); if (ISI.aqui)
                setTimeout(() => falar(ISI, 'Pra mim o mesmo!'), 1100); toast('Pedido feito! Sentem numa mesa.'); });
        } });
    const mesa = pinta(30, 22, (R, C) => { C(15, 9, 10, '#2a1d30'); C(15, 9, 9, '#a8714a'); C(14, 8, 5, '#b8825a'); R(13, 18, 4, 4, '#2a1d30'); });
    const cadeira = pinta(12, 10, (R) => { R(0, 0, 12, 10, '#2a1d30'); R(1, 1, 10, 8, '#c96d4a'); R(2, 2, 8, 3, '#d98a68'); });
    [[60, 112], [150, 130]].forEach(([x, y], i) => {
        objs.push({ nome: 'cadN' + i, x: x - 6, y: y - 30, img: cadeira, base: y - 20 });
        objs.push({ nome: 'mesa' + i, x: x - 15, y: y - 20, img: mesa, base: y + 1, draw: (c, o) => {
                c.drawImage(o.img, o.x, o.y);
                if (pedidoCafe && FEFE.pose === 'assento' && FEFE.mesa === i) {
                    const t = performance.now() / 1000;
                    c.fillStyle = '#fff';
                    c.fillRect(o.x + 9, o.y + 5, 5, 4);
                    c.fillRect(o.x + 17, o.y + 9, 5, 4);
                    c.fillStyle = pedidoCafe === 'cha' ? '#e9c48a' : pedidoCafe === 'paodequeijo' ? '#e9c48a' : '#7a4a2a';
                    c.fillRect(o.x + 10, o.y + 5, 3, 1);
                    c.fillRect(o.x + 18, o.y + 9, 3, 1);
                    if (Math.floor(t * 2) % 2) {
                        c.fillStyle = 'rgba(255,255,255,.7)';
                        c.fillRect(o.x + 11, o.y + 1, 1, 3);
                        c.fillRect(o.x + 19, o.y + 5, 1, 3);
                    }
                }
            } });
        objs.push({ nome: 'cadS' + i, x: x - 6, y: y + 8, img: cadeira, base: y + 18 });
        cols.push({ x: x - 15, y: y - 12, w: 30, h: 14 });
        pts.push({ obj: 'mesa' + i, nome: 'Sentar à mesa', x: x, y: y + 26, acao: () => {
                FEFE.mesa = i;
                sentarJuntas({ f: ['pc', x - 8, y - 2, y + 19, x, y + 28], i: ['sentada', x - 8, y - 35, y - 19, x + 16, y + 28],
                    fala: () => pedidoCafe ? pick(['Que cheirinho bom', 'Amo esse lugar com você', 'Me conta do seu dia']) : 'A gente não pediu nada ainda, boba' });
                if (pedidoCafe && !S.feitos.enc_cafe) {
                    S.feitos.enc_cafe = true;
                    setTimeout(() => ganhar(3), 1500);
                    salvar();
                }
            } });
    });
    objs.push({ nome: 'biscoito', x: 18, y: 46, img: pinta(40, 14, () => { }), base: 62, draw: (c, o) => {
            c.fillStyle = '#2a1d30';
            c.fillRect(o.x, o.y + 6, 40, 8);
            c.fillStyle = '#c96d4a';
            c.fillRect(o.x + 1, o.y + 7, 38, 6);
            const g = spr(gatoPixels('tabby', 'dormindo', false), { O: '#3b2a30', B: '#e39a4f', b: '#f6dcb8', I: '#f5a9bd', p: '#f6dcb8', S: '#c2702a', E: '#7bd389', K: '#15121a', F: '#3b2a30', N: '#d98f96', R: '#ff9fb9', A: '#8fd0ff' }, 'biscoitoGato');
            c.drawImage(g, o.x + 13, o.y - 3 + (Math.floor(performance.now() / 1300) % 2));
            if (Math.random() < .008)
                particula('zz', o.x + 24, o.y - 4);
        } });
    pts.push({ obj: 'biscoito', nome: 'Carinho no gato do café', x: 38, y: 70, acao: () => { som.ronrom(.3); setTimeout(() => som.ronrom(0), 2200); particula('coracao', 38, 46, 3); falar(FEFE, 'Oi, Biscoito! O gato do café ♥'); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Não conta pra Lola'), 1300); if (!S.feitos.biscoito) {
            S.feitos.biscoito = true;
            ganhar(1);
            salvar();
        } } });
    [[8, 150], [226, 150]].forEach(([x, y], i) => { objs.push({ nome: 'planta' + i, x: x - 6, y: y - 22, img: pinta(14, 24, (R, C) => { R(3, 14, 8, 10, '#2a1d30'); R(4, 14, 6, 9, '#e07a5f'); C(7, 8, 6, '#4f9a5a'); C(5, 6, 3, '#5fae6a'); }), base: y + 2 }); cols.push({ x: x - 5, y: y - 4, w: 10, h: 6 }); });
    objs.push({ nome: 'estante', x: 100, y: 36, img: pinta(28, 34, (R) => {
            R(0, 0, 28, 34, '#2a1d30');
            R(1, 1, 26, 32, '#7a4f3a');
            [9, 19, 29].forEach(y => R(1, y, 26, 2, '#5e3d2e'));
            const cs = ['#d63e4f', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff', '#ff9fbf', '#f4f1ec'];
            for (let r = 0; r < 3; r++)
                for (let i = 0; i < 8; i++)
                    R(3 + i * 3, 2 + r * 10, 2, 7 - (i % 3), cs[(i + r * 2) % 7]);
        }), base: 70 });
    cols.push({ x: 100, y: 58, w: 28, h: 12 });
    pts.push({ obj: 'estante', nome: 'Pegar um livro', x: 114, y: 80, acao: () => {
            const frases = ['"Tem gente que é lar."', '"O amor mora nos detalhes pequenos."', '"Café bom é o que a gente divide."', '"Alguns dias pedem chá. Outros pedem colo."', '"A gente se encontrou e o mundo ficou do tamanho certo."'];
            abrir('Um livro qualquer', `<div class="papel px">Você abriu numa página aleatória:

${pick(frases)}</div>`);
            if (ISI.aqui)
                setTimeout(() => falar(ISI, 'Lê pra mim?'), 800);
        } });
    objs.push({ nome: 'jukebox', x: 206, y: 90, img: pinta(22, 28, (R, C) => { R(0, 4, 22, 24, '#2a1d30'); C(11, 6, 10, '#2a1d30'); C(11, 6, 9, '#d63e4f'); R(1, 6, 20, 21, '#d63e4f'); R(4, 8, 14, 8, '#ffe79a'); R(6, 10, 10, 4, '#2a1d30'); R(3, 19, 16, 6, '#7a1422'); for (let x = 4; x < 18; x += 3)
            R(x, 20, 2, 4, '#ffd36e'); }), base: 118,
        draw: (c, o) => { c.drawImage(o.img, o.x, o.y); if (musica && Math.floor(performance.now() / 300) % 2) {
            c.fillStyle = '#fff';
            c.fillRect(o.x + 10, o.y + 11, 2, 2);
        } } });
    cols.push({ x: 206, y: 106, w: 22, h: 12 });
    pts.push({ obj: 'jukebox', nome: 'Escolher uma música', x: 216, y: 126, acao: () => {
            if (musica) {
                pararMusica();
                return falar(FEFE, 'Silêncio agora');
            }
            tocarMusica(pick(['bossa', 'lofi']));
            particula('nota', 216, 90, 4);
            falar(FEFE, 'Essa combina com a gente');
            if (ISI.aqui)
                setTimeout(() => { falar(ISI, 'Dança comigo?'); dancar(5000); }, 1500);
        } });
    porta(objs, pts, W, H, '#5e3d2e');
    CENAS.cafe = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 58, y1: H - 6 },
        entrada: [120, 138], chegada: ['Que cheirinho de café!', 'Nossa mesa tá livre!'], bg: '#3b2a20', aoEntrar: () => { pedidoCafe = null; } };
}
