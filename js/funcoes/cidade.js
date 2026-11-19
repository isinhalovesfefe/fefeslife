function imgCarro(cor, horiz) {
    const k = 'car' + cor + horiz;
    if (cache[k])
        return cache[k];
    const L = 68, A = 30;
    const c = pinta(horiz ? L : A, horiz ? A : L, (R) => {
        const r = (x, y, w, h, col) => horiz ? R(x, y, w, h, col) : R(y, x, h, w, col);
        r(10, 0, 10, 4, '#111');
        r(48, 0, 10, 4, '#111');
        r(10, 26, 10, 4, '#111');
        r(48, 26, 10, 4, '#111');
        r(2, 3, 64, 24, '#1a1418');
        r(3, 4, 62, 22, cor);
        r(4, 5, 60, 3, 'rgba(255,255,255,.25)');
        r(20, 6, 30, 18, '#1a1418');
        r(21, 7, 28, 16, 'rgba(0,0,0,.25)');
        r(46, 7, 8, 16, '#9fd0f5');
        r(47, 8, 2, 14, '#e6f5ff');
        r(16, 8, 5, 14, '#7fa6c8');
        r(63, 6, 3, 5, '#fff2a8');
        r(63, 19, 3, 5, '#fff2a8');
        r(2, 6, 2, 4, '#ff4060');
        r(2, 20, 2, 4, '#ff4060');
        r(40, 3, 4, 2, '#1a1418');
        r(40, 25, 4, 2, '#1a1418');
    });
    cache[k] = c;
    return c;
}
function construirCidade() {
    const { W, H, H1, H2, V1, V2, RUA, CAL } = CID, objs = [], cols = [], pts = [];
    const predios = [];
    const predio = (x, y, w, h, parede, teto, toldo, placa, porta = true) => {
        cols.push({ x, y, w, h: h - 2 });
        predios.push((R, C) => {
            const tt = Math.round(h * .42);
            R(x, y, w, h, '#1a1418');
            R(x + 2, y + 2, w - 4, tt, teto);
            for (let i = x + 6; i < x + w - 6; i += 10)
                R(i, y + 4, 6, tt - 6, 'rgba(0,0,0,.08)');
            R(x + 2, y + tt + 2, w - 4, h - tt - 4, parede);
            R(x + 2, y + tt + 2, w - 4, 3, 'rgba(0,0,0,.18)');
            for (let wx = x + 12; wx < x + w - 24; wx += 26) {
                R(wx, y + tt + 12, 16, 16, '#1a1418');
                R(wx + 1, y + tt + 13, 14, 14, '#bfe3ff');
                R(wx + 1, y + tt + 13, 14, 4, '#e6f5ff');
                R(wx + 7, y + tt + 13, 1, 14, '#1a1418');
            }
            if (toldo) {
                for (let i = 0; i < w - 8; i += 8)
                    R(x + 4 + i, y + h - 34, 8, 9, (i / 8) % 2 ? '#fff' : toldo);
                R(x + 4, y + h - 25, w - 8, 2, 'rgba(0,0,0,.2)');
            }
            if (placa) {
                R(x + w / 2 - 34 | 0, y + tt + 4, 68, 12, '#1a1418');
                R(x + w / 2 - 33 | 0, y + tt + 5, 66, 10, placa[0]);
                placa[1](R, x + w / 2 | 0, y + tt + 10, C);
            }
            if (porta) {
                R(x + w / 2 - 10 | 0, y + h - 24, 20, 22, '#1a1418');
                R(x + w / 2 - 9 | 0, y + h - 23, 18, 21, '#7a4f3a');
                R(x + w / 2 + 5 | 0, y + h - 13, 2, 2, '#ffd36e');
            }
        });
    };
    predio(70, 70, 230, 190, '#f3c1d3', '#b8587d', null, ['#ff9fbf', (R, cx, cy) => { R(cx - 8, cy - 3, 6, 6, '#fff'); R(cx + 2, cy - 3, 6, 6, '#fff'); R(cx - 6, cy + 1, 12, 3, '#fff'); }]);
    predio(530, 96, 190, 168, '#fff1c2', '#e9a93a', '#ff7aa8', ['#ff7aa8', (R, cx, cy) => { R(cx - 3, cy - 4, 6, 4, '#fff'); R(cx - 1, cy, 2, 4, '#e9a93a'); }]);
    predio(740, 96, 170, 168, '#cfc8dc', '#5d4470', '#2a1d30', ['#2a1d30', (R, cx, cy, C) => { C(cx, cy, 4, '#f4f1ec'); R(cx - 1, cy - 1, 2, 2, '#2a1d30'); }]);
    predio(40, 452, 290, 170, '#f6dcb8', '#a8714a', '#d9a046', ['#d9a046', (R, cx, cy) => { R(cx - 8, cy - 3, 16, 6, '#fff6c2'); }]);
    predio(1100, 452, 260, 170, '#d6f5d6', '#4f9a5a', '#7bd389', ['#7bd389', (R, cx, cy) => { R(cx - 4, cy - 2, 3, 3, '#fff'); R(cx + 1, cy - 2, 3, 3, '#fff'); R(cx - 2, cy + 1, 4, 3, '#fff'); }]);
    [[30, 800, 150, 96, '#c9d6ff', '#5b6fa8'], [210, 790, 140, 108, '#ffd9c2', '#c96d4a'], [1090, 790, 130, 106, '#e2d4ff', '#7a5fa8'], [1240, 800, 140, 96, '#fff1c2', '#c9a032'], [1100, 40, 110, 120, '#ffd1e3', '#c96d93']].forEach(([x, y, w, h, p, tt]) => predio(x, y, w, h, p, tt, null, null, false));
    const fundo = pinta(W, H, (R, C) => {
        R(0, 0, W, H, '#86b874');
        for (let i = 0; i < 1400; i++)
            R((i * 137) % W, (i * 71) % H, 2, 1, i % 2 ? '#7aa868' : '#93c482');
        [[H1], [H2]].forEach(([y]) => { R(0, y - CAL, W, RUA + CAL * 2, '#cfc9be'); for (let x = 0; x < W; x += 12) {
            R(x, y - CAL, 1, CAL, '#bdb6aa');
            R(x, y + RUA, 1, CAL, '#bdb6aa');
        } });
        [[V1], [V2]].forEach(([x]) => { R(x - CAL, 0, RUA + CAL * 2, H, '#cfc9be'); for (let y = 0; y < H; y += 12) {
            R(x - CAL, y, CAL, 1, '#bdb6aa');
            R(x + RUA, y, CAL, 1, '#bdb6aa');
        } });
        [[H1], [H2]].forEach(([y]) => { R(0, y, W, RUA, '#45454d'); R(0, y, W, 2, '#f4f1ec'); R(0, y + RUA - 2, W, 2, '#f4f1ec'); for (let x = 0; x < W; x += 40)
            R(x, y + RUA / 2 - 1, 22, 3, '#ffd36e'); });
        [[V1], [V2]].forEach(([x]) => { R(x, 0, RUA, H, '#45454d'); R(x, 0, 2, H, '#f4f1ec'); R(x + RUA - 2, 0, 2, H, '#f4f1ec'); for (let y = 0; y < H; y += 40)
            R(x + RUA / 2 - 1, y, 3, 22, '#ffd36e'); });
        for (let i = 0; i < 500; i++) {
            const x = (i * 97) % W, y = (i * 59) % H;
            R(x, y, 1, 1, 'rgba(0,0,0,.08)');
        }
        [[V1, H1], [V2, H1], [V1, H2], [V2, H2]].forEach(([x, y]) => {
            R(x, y, RUA, RUA, '#45454d');
            for (let i = 6; i < RUA - 6; i += 10) {
                R(x + i, y - CAL + 2, 6, CAL - 4, '#f4f1ec');
                R(x + i, y + RUA + 2, 6, CAL - 4, '#f4f1ec');
                R(x - CAL + 2, y + i, CAL - 4, 6, '#f4f1ec');
                R(x + RUA + 2, y + i, CAL - 4, 6, '#f4f1ec');
            }
        });
        R(70, 262, 230, 12, '#5fae6a');
        for (let x = 74; x < 296; x += 10)
            R(x, 264, 4, 4, ['#ff7aa8', '#ffd36e', '#fff'][(x / 10 | 0) % 3]);
        R(1240, 30, 150, 240, '#a8d08f');
        for (let x = 1240; x < 1390; x += 10)
            R(x, 24, 3, 10, '#5e3d2e');
        R(1240, 30, 150, 3, '#5e3d2e');
        for (let i = 0; i < 30; i++)
            R(1250 + (i * 29) % 130, 50 + (i * 17) % 200, 2, 2, ['#ff7aa8', '#ffd36e', '#fff', '#c08cff'][i % 4]);
        R(508, 428, 408, 198, '#a8d08f');
        R(700, 428, 24, 198, '#e0d6c0');
        R(508, 516, 408, 22, '#e0d6c0');
        C(712, 527, 30, '#2a1d30');
        C(712, 527, 28, '#b8b0c8');
        C(712, 527, 22, '#6fb7e0');
        C(712, 527, 7, '#cfc8dc');
        for (let i = 0; i < 24; i++)
            R(520 + (i * 37) % 380, 440 + (i * 23) % 170, 2, 2, ['#ff7aa8', '#ffd36e', '#fff'][i % 3]);
        R(508, 778, 408, 122, '#a8d08f');
        R(560, 800, 80, 60, '#e8d6a8');
        R(700, 800, 6, 40, '#5e3d2e');
        R(760, 800, 6, 40, '#5e3d2e');
        R(700, 800, 66, 4, '#5e3d2e');
        predios.forEach(d => d(R, C));
    });
    const arv = pinta(40, 50, (R, C) => { R(17, 28, 6, 20, '#1a1418'); R(18, 28, 4, 20, '#7a4f3a'); C(20, 16, 16, '#1a1418'); C(20, 16, 15, '#4f9a5a'); C(14, 11, 7, '#5fae6a'); C(27, 18, 6, '#5fae6a'); R(8, 46, 24, 3, 'rgba(0,0,0,.15)'); });
    const poste = pinta(10, 48, (R) => { R(4, 8, 2, 38, '#2a1d30'); R(2, 46, 6, 2, '#2a1d30'); R(0, 0, 10, 9, '#2a1d30'); R(1, 1, 8, 7, '#ffe79a'); });
    const arvores = [[30, 274], [340, 274], [520, 274], [930, 274], [1080, 274], [1380, 274], [30, 630], [340, 630], [1080, 630], [1380, 630], [560, 470], [870, 470], [560, 600], [870, 600], [1270, 90], [1360, 200], [540, 860], [880, 860], [30, 780], [360, 890]];
    arvores.forEach(([x, y], i) => { objs.push({ nome: 'arvC' + i, x: x - 20, y: y - 48, img: arv, base: y }); cols.push({ x: x - 4, y: y - 6, w: 8, h: 6 }); });
    const postes = [[200, 272], [640, 272], [1150, 272], [200, 432], [800, 432], [1300, 432], [300, 622], [1000, 778], [600, 778], [370, 140], [935, 140], [370, 520], [935, 520]];
    postes.forEach(([x, y], i) => { objs.push({ nome: 'posteC' + i, x: x - 5, y: y - 46, img: poste, base: y }); cols.push({ x: x - 2, y: y - 4, w: 4, h: 4 }); });
    cols.push({ x: 684, y: 500, w: 56, h: 50 });
    const banco = pinta(36, 12, (R) => { R(0, 0, 36, 12, '#1a1418'); R(1, 1, 34, 4, '#a8714a'); R(1, 7, 34, 4, '#c98f5f'); });
    [[620, 480], [790, 480], [1290, 200]].forEach(([x, y], i) => { objs.push({ nome: 'bancoC' + i, x, y, img: banco, base: y + 12 }); cols.push({ x, y: y + 2, w: 36, h: 10 }); });
    objs.push({ nome: 'kiosk', x: 820, y: 560, img: pinta(46, 36, (R) => { R(0, 10, 46, 26, '#1a1418'); R(1, 11, 44, 24, '#7bd389'); for (let i = 0; i < 44; i += 6)
            R(1 + i, 0, 6, 11, (i / 6) % 2 ? '#fff' : '#ff7aa8'); [[5, '#ff7aa8'], [14, '#ffd36e'], [23, '#c08cff'], [32, '#fff']].forEach(([x, c]) => { R(x, 16, 6, 6, c); R(x + 2, 22, 2, 8, '#4f9a5a'); }); }), base: 596 });
    cols.push({ x: 820, y: 576, w: 46, h: 20 });
    objs.push({ nome: 'binoculo', x: 1300, y: 110, img: pinta(14, 30, (R) => { R(6, 10, 2, 18, '#2a1d30'); R(2, 28, 10, 2, '#2a1d30'); R(0, 2, 14, 9, '#2a1d30'); R(1, 3, 12, 7, '#5b8cff'); R(2, 4, 4, 4, '#cfe8ff'); R(8, 4, 4, 4, '#cfe8ff'); }), base: 140 });
    cols.push({ x: 1302, y: 134, w: 10, h: 6 });
    pts.push({ obj: 'casa', nome: 'Guardar a bike e entrar', x: 185, y: 292, acao: () => trocarCena('quarto') });
    pts.push({ obj: 'sorvC', nome: 'Tomar sorvete', x: 625, y: 290, acao: () => { som.plim(); falar(FEFE, 'Um de pistache!'); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Divide comigo?'), 1000); particula('coracao', 625, 250, 2); if (!S.feitos.sorvC) {
            S.feitos.sorvC = true;
            ganhar(1);
            salvar();
        } } });
    pts.push({ obj: 'discos', nome: 'Loja de discos', x: 825, y: 290, acao: lojaDiscos });
    pts.push({ obj: 'padaria', nome: 'Comprar pão de queijo', x: 185, y: 640, acao: () => { som.plim(); falar(FEFE, 'Seis pães de queijo quentinhos!'); particula('brilho', 185, 610, 3); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Melhor cheiro do mundo'), 1100); if (!S.feitos.padaria) {
            S.feitos.padaria = true;
            ganhar(1);
            salvar();
        } } });
    pts.push({ obj: 'petshop', nome: 'Pet shop', x: 1230, y: 640, acao: () => {
            if (S.feitos.petshop)
                return falar(FEFE, 'Já comprei petisco hoje!');
            S.feitos.petshop = true;
            for (const id in S.gatos) {
                S.gatos[id].fome = lim(S.gatos[id].fome + 15);
                S.gatos[id].alegria = lim(S.gatos[id].alegria + 10);
            }
            salvar();
            som.plim();
            falar(FEFE, 'Petiscos pros meus bebês!');
            toast('Petiscos comprados! Os gatos ficaram felizes em casa.');
        } });
    pts.push({ obj: 'binoculo', nome: 'Ver a cidade lá de cima', x: 1307, y: 152, acao: () => { particula('brilho', 1307, 100, 5); falar(FEFE, 'Dá pra ver a cidade inteira...', 2400); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'A mais linda aqui é você'), 1600); if (!S.feitos.mirante) {
            S.feitos.mirante = true;
            ganhar(2);
            salvar();
        } } });
    pts.push({ obj: 'kiosk', nome: 'Comprar uma flor', x: 843, y: 610, acao: () => { som.plim(); if (ISI.aqui) {
            falar(FEFE, `Pra você, ${NOME_MINHA} ♥`);
            setTimeout(() => { falar(ISI, 'AAAAA eu amo flores!'); particula('coracao', ISI.x, ISI.y - 28, 5); }, 1000);
        }
        else
            falar(FEFE, 'Uma flor pra alegrar o quarto'); if (!S.feitos.florC) {
            S.feitos.florC = true;
            ganhar(2);
            salvar();
        } } });
    pts.push({ obj: 'fonteC', nome: 'Jogar uma moedinha', x: 712, y: 568, zona: [684, 500, 56, 50], acao: () => { som.plim(); particula('brilho', 712, 520, 4); falar(FEFE, '*faz um pedido*'); } });
    CARROS.length = 0;
    const vel = () => 70 + Math.random() * 30;
    CARROS.push({ x: 200, y: H1 + 26, vx: -vel(), cor: '#d63e4f' }, { x: 900, y: H1 + 26, vx: -vel(), cor: '#f4f1ec' }, { x: 500, y: H1 + 78, vx: vel(), cor: '#5b8cff' }, { x: 1200, y: H1 + 78, vx: vel(), cor: '#ffd36e' }, { x: 300, y: H2 + 26, vx: -vel(), cor: '#7bd389' }, { x: 1000, y: H2 + 78, vx: vel(), cor: '#c08cff' }, { x: V1 + 26, y: 100, vy: vel(), cor: '#2a2a30' }, { x: V1 + 78, y: 700, vy: -vel(), cor: '#ff8a3d' }, { x: V2 + 26, y: 500, vy: vel(), cor: '#5fae6a' }, { x: V2 + 78, y: 200, vy: -vel(), cor: '#b8323f' });
    CARROS.forEach(c => { c.mapa = 'cidade'; c.cd = 0; c.w = c.vx ? 68 : 30; c.h = c.vx ? 30 : 68; });
    CENAS.cidade = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 6, x1: W - 6, y0: 6, y1: H - 6 }, entrada: [185, 296],
        chegada: ['Bora pedalar!', 'Cuidado com os carros, amor!'], chegadaSozinha: ['Bora pedalar!', 'Que dia bom pra andar de bike'], bg: '#86b874',
        luzes: postes.map(([x, y]) => [x, y - 42, 40, 'rgba(255,220,140,.4)']).concat([[185, 262, 40, 'rgba(255,200,170,.35)'], [625, 262, 36, 'rgba(255,220,140,.35)'], [825, 262, 36, 'rgba(255,220,140,.35)'], [185, 620, 36, 'rgba(255,220,140,.35)'], [1230, 620, 36, 'rgba(255,220,140,.35)']]) };
}
function lojaDiscos() {
    S.discos = S.discos || ['dreamy'];
    abrir('Loja de discos', `<p style="margin:0 0 10px">Escolha um disco pra tocar na vitrola do quarto:</p><div class="grade">${Object.entries(DISCOS).map(([k, d]) => `<button class="px ${S.disco === k || (!S.disco && k === 'dreamy') ? 'sel' : ''}" data-disco="${k}">${d.n}<small>${S.discos.includes(k) ? 'na coleção' : '5 ♥'}</small></button>`).join('')}</div>`);
    document.querySelectorAll('[data-disco]').forEach(b => b.onclick = () => {
        const k = b.dataset.disco;
        if (!S.discos.includes(k)) {
            if (S.coracoes < 5)
                return toast('Precisa de 5 corações');
            S.coracoes -= 5;
            S.discos.push(k);
            atualizarHUD();
            som.plim();
            toast(`Disco ${DISCOS[k].n} comprado!`);
        }
        S.disco = k;
        salvar();
        if (musica) {
            pararMusica();
        }
        tocarMusica(k);
        setTimeout(() => { if (MAPA === 'cidade')
            pararMusica(); }, 6000);
        lojaDiscos();
    });
}
function atualizarCidade(dt) {
    if (MAPA !== 'cidade')
        return;
    S.feitos.bikeCor = S.feitos.bikeCor || [];
    COR_CIDADE.forEach(([x, y], i) => {
        if (S.feitos.bikeCor.includes(i))
            return;
        if (Math.hypot(FEFE.x - x, FEFE.y - 4 - y) < 10) {
            S.feitos.bikeCor.push(i);
            ganhar(1);
            particula('coracao', x, y - 6, 3);
            salvar();
            if (S.feitos.bikeCor.length === COR_CIDADE.length) {
                toast('Você pegou todos os corações da cidade hoje! ♥');
                ganhar(3);
            }
        }
    });
    CARROS.forEach(c => {
        const nx = c.x + (c.vx || 0) * dt, ny = c.y + (c.vy || 0) * dt;
        const naFrente = (p) => {
            const py = p.y - 4;
            if (c.vx) {
                const ini = c.vx > 0 ? nx + c.w / 2 : nx - c.w / 2 - 40, fim = c.vx > 0 ? nx + c.w / 2 + 40 : nx - c.w / 2;
                return p.x > ini - 6 && p.x < fim + 6 && Math.abs(py - c.y) < c.h / 2 + 8;
            }
            const ini = c.vy > 0 ? ny + c.h / 2 : ny - c.h / 2 - 40, fim = c.vy > 0 ? ny + c.h / 2 + 40 : ny - c.h / 2;
            return py > ini - 6 && py < fim + 6 && Math.abs(p.x - c.x) < c.w / 2 + 8;
        };
        if (naFrente(FEFE) || (ISI.aqui && naFrente(ISI))) {
            c.cd -= dt;
            c.esperando = true;
            if (c.cd <= 0) {
                c.cd = 2.4;
                falar(c, buzinaCarro(c), 900);
            }
            return;
        }
        const ax = nx + (c.vx ? Math.sign(c.vx) * 12 : 0), ay = ny + (c.vy ? Math.sign(c.vy) * 12 : 0);
        const bate = CARROS.some(o => {
            if (o === c)
                return false;
            if (c.vx && o.vy && o.esperando)
                return false;
            return Math.abs(ax - o.x) < (c.w + o.w) / 2 && Math.abs(ay - o.y) < (c.h + o.h) / 2;
        });
        if (bate) {
            c.esperando = true;
            return;
        }
        c.esperando = false;
        c.x = nx;
        c.y = ny;
        if (c.x > TW + 80)
            c.x = -80;
        if (c.x < -80)
            c.x = TW + 80;
        if (c.y > TH + 80)
            c.y = -80;
        if (c.y < -80)
            c.y = TH + 80;
    });
}
function buzina() { if (!audio())
    return; const t = AC.currentTime; tom(t, 440, .12, .06, 'square'); tom(t + .16, 440, .18, .06, 'square'); }
function desenharCidadeDin(lista) {
    const t = performance.now() / 1000;
    S.feitos.bikeCor = S.feitos.bikeCor || [];
    lista.push({ b: -1, f: () => { COR_CIDADE.forEach(([x, y], i) => { if (S.feitos.bikeCor.includes(i))
            return; ctx.drawImage(spr(...ICONES.coracao, 'icCor'), x - 3, y - 4 + Math.round(Math.sin(t * 3 + i))); }); } });
    CARROS.forEach(c => lista.push({ b: c.y + c.h / 2, f: () => {
            const x = Math.round(c.x - c.w / 2), y = Math.round(c.y - c.h / 2), img = imgCarro(c.cor, !!c.vx);
            ctx.fillStyle = 'rgba(0,0,0,.22)';
            ctx.fillRect(x + 3, y + 4, c.w, c.h);
            const inv = c.vx ? c.vx < 0 : c.vy < 0;
            if (!inv)
                ctx.drawImage(img, x, y);
            else {
                ctx.save();
                if (c.vx) {
                    ctx.translate(x + c.w, y);
                    ctx.scale(-1, 1);
                }
                else {
                    ctx.translate(x, y + c.h);
                    ctx.scale(1, -1);
                }
                ctx.drawImage(img, 0, 0);
                ctx.restore();
            }
        } }));
}
function desenharCiclista(set, e, cor, calca) {
    const x = Math.round(e.x), y = Math.round(e.y), d = e.dir, pe = e.anda ? Math.floor(performance.now() / 120) % 2 : 0;
    const c = ctx;
    c.fillStyle = 'rgba(0,0,0,.22)';
    c.fillRect(x - 9, y - 1, 18, 2);
    if (d === 'left' || d === 'right') {
        const s = d === 'right' ? 1 : -1;
        c.save();
        c.translate(x, 0);
        c.scale(s, 1);
        const R = (a, b, w, h, k) => { c.fillStyle = k; c.fillRect(a, y + b, w, h); };
        [[-6], [6]].forEach(([wx]) => { R(wx - 3, -8, 7, 7, '#2a1d30'); R(wx - 2, -7, 5, 5, '#9fa6b8'); R(wx - 1, -6, 3, 3, '#2a1d30'); R(wx, -5, 1, 1, '#cfc8dc'); });
        R(-6, -5, 6, 1, cor);
        R(-1, -9, 1, 5, cor);
        R(0, -5, 6, 1, cor);
        R(-1, -9, 7, 1, cor);
        R(5, -12, 1, 4, '#2a1d30');
        R(4, -12, 3, 1, '#2a1d30');
        R(-3, -11, 4, 2, '#2a1d30');
        c.restore();
        c.drawImage(set[d === 'right' ? 'bikeR' : 'bikeL'], x - 8 + (d === 'right' ? -1 : 1), y - 31);
        c.fillStyle = calca;
        c.fillRect(x - 1 + (pe ? 1 : -1), y - 11, 2, 5);
    }
    else {
        c.fillStyle = '#2a1d30';
        c.fillRect(x - 1, y - 12, 3, 12);
        c.fillStyle = '#9fa6b8';
        c.fillRect(x, y - 11, 1, 10);
        if (d === 'up')
            c.drawImage(set.bikeU, x - 8, y - 32);
        c.fillStyle = '#2a1d30';
        c.fillRect(x - 7, y - 17, 15, 2);
        c.fillStyle = cor;
        c.fillRect(x - 1, y - 15, 3, 3);
        if (d === 'down')
            c.drawImage(set.bikeD, x - 8, y - 32);
        c.fillStyle = calca;
        c.fillRect(x - 4, y - 13 + (pe ? 1 : 0), 2, 5);
        c.fillRect(x + 3, y - 13 + (pe ? 0 : 1), 2, 5);
    }
}
