function gradesHomem() {
    if (_gradesHomem)
        return _gradesHomem;
    const frente = espelhar(HOMEM_FRENTE_L), costas = espelhar(HOMEM_COSTAS_L);
    const passo = (base, l) => { const g = base.map(r => [...r]); const c0 = l === 0 ? 0 : 8, c1 = l === 0 ? 8 : 16; for (let y = 20; y < 26; y++)
        for (let x = c0; x < c1; x++)
            g[y][x] = (y < 25 && base[y + 1]) ? base[y + 1][x] : '.'; return g.map(r => r.join('')); };
    const F = { down: [frente, passo(frente, 0), frente, passo(frente, 1)], up: [costas, passo(costas, 1), costas, passo(costas, 0)], right: [HOMEM_LADO, HOMEM_LADO_PASSO, HOMEM_LADO, HOMEM_LADO_PASSO] };
    F.left = F.right.map(fr => fr.map(r => [...r].reverse().join('')));
    return (_gradesHomem = F);
}
function comBarba(g) { return g.map((r, y) => y >= 10 && y <= 12 ? r.replace(/[Ss]/g, 'H') : r); }
function semTopete(g) { return g.map((r, y) => y === 0 ? '.'.repeat(r.length) : y === 1 ? r.replace(/O/g, '.').replace(/H/g, 'O') : r); }
function manterAPe() {
    if (MAPA === 'quarto') {
        const p = PONTOS.find(p => p.obj === 'porta');
        if (p && p.acao !== window._acaoPortaNova)
            p.acao = window._acaoPortaNova;
    }
    if (MAPA === 'cidade' && aPe) {
        if (FEFE.bike) {
            FEFE.bike = false;
        }
        if (ISI.bike)
            ISI.bike = false;
    }
}
function sentarBanco(bx, by) {
    FEFE.pose = 'tapete';
    FEFE.x = bx + 11;
    FEFE.y = by + 13;
    FEFE.dir = 'down';
    FEFE.alvo = null;
    FEFE.aoLevantar = () => { FEFE.x = bx + 12; FEFE.y = by + 30; if (ISI.aqui) {
        ISI.x = bx + 28;
        ISI.y = by + 30;
        ISI.estado = 'seguindo';
    } };
    if (ISI.aqui) {
        ISI.pose = 'sentada';
        ISI.x = bx + 26;
        ISI.y = by + 13.1;
    }
    const orla = by > 1000, h = horaAgora();
    falar(FEFE, orla ? (h >= 16 && h < 19 ? 'Olha esse pôr do sol...' : ehNoiteRua() ? 'O mar à noite é tão bonito' : 'Que vista linda do mar') : 'Bora descansar um pouquinho', 2200);
    if (ISI.aqui)
        setTimeout(() => { falar(ISI, pick(['*encosta a cabeça no seu ombro*', 'Podia ficar aqui pra sempre', 'Melhor lugar: do seu lado']), 2400); necIsi('carinho', 10); }, 1500);
    nec('energia', 6);
    if (orla)
        nec('social', 4);
}
function bancosNaCidade() {
    const C = CENAS.cidade;
    if (!C || C._bancos)
        return;
    C._bancos = true;
    const LP = MAPA === 'cidade' ? PONTOS : C.PONTOS, LO = MAPA === 'cidade' ? OBJ : C.OBJ;
    LO.filter(o => /^banco[CO]\d/.test(o.nome)).forEach(o => { LP.push({ obj: o.nome, nome: 'Sentar no banco', x: o.x + 18, y: o.y + 22, acao: () => sentarBanco(o.x, o.y) }); });
}
function lojasNaCidade() {
    const C = CENAS.cidade;
    if (!C || C._lojas)
        return;
    C._lojas = true;
    (MAPA === 'cidade' ? PONTOS : C.PONTOS).forEach(p => {
        const L = LOJAS[p.obj];
        if (!L)
            return;
        ACOES_LOJA[p.obj] = { acao: p.acao, nome: p.nome };
        const px = p.x, py = p.y;
        p.nome = `Entrar: ${L.n}`;
        p.acao = () => { portaLoja = [px, py + 6]; isiAntesLoja = ISI.aqui; trocarCena('int_' + L.id); };
    });
}
function decorLoja(R, C, L, W) {
    const t = L.tipo;
    const prat = (x, y, w) => { R(x, y, w, 3, '#5e3d2e'); R(x, y + 3, w, 1, 'rgba(0,0,0,.2)'); };
    const itens = (x, y, w, cores, fn) => { for (let i = 0; i < w; i += 6)
        fn(x + i, y, cores[(i / 6 | 0) % cores.length]); };
    if (t === 'livraria' || t === 'discos') {
        [10, W - 74].forEach(sx => {
            R(sx, 6, 64, 46, '#2a1d30');
            R(sx + 1, 7, 62, 44, '#7a4f3a');
            for (let k = 0; k < 3; k++) {
                const yy = 9 + k * 14;
                for (let i = 0; i < 60; i += t === 'discos' ? 7 : 4) {
                    const c = ['#c8242e', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff', '#ff8a3d', '#f4f1ec'][(i + k * 3) % 7];
                    if (t === 'discos') {
                        C(sx + 5 + i, yy + 6, 3, '#111');
                        R(sx + 4 + i, yy + 5, 2, 2, c);
                    }
                    else
                        R(sx + 2 + i, yy, 3, 11, c);
                }
                R(sx + 1, yy + 12, 62, 1, '#5e3d2e');
            }
        });
    }
    else if (t === 'padaria') {
        [12, W - 72].forEach(sx => { for (let k = 0; k < 3; k++) {
            prat(sx, 14 + k * 12, 60);
            itens(sx + 2, 9 + k * 12, 58, ['#d9a046', '#b8783a', '#e8c070'], (x, y, c) => { R(x, y, 5, 4, '#2a1d30'); R(x, y, 4, 3, c); });
        } });
    }
    else if (t === 'pet') {
        [12, W - 72].forEach(sx => { for (let k = 0; k < 3; k++) {
            prat(sx, 16 + k * 12, 60);
            itens(sx + 2, 8 + k * 12, 58, ['#ff8a3d', '#5b8cff', '#7bd389', '#ffd36e'], (x, y, c) => { R(x, y, 5, 8, '#2a1d30'); R(x, y, 4, 7, c); R(x + 1, y + 2, 2, 2, '#fff'); });
        } });
    }
    else if (t === 'flores') {
        for (let i = 0; i < W - 20; i += 16) {
            R(10 + i, 32, 12, 14, '#2a1d30');
            R(11 + i, 33, 10, 12, '#a8714a');
            for (let k = 0; k < 5; k++) {
                R(12 + i + k * 2, 22 + (k % 2) * 3, 3, 3, ['#ff5c8d', '#ffd36e', '#fff', '#c08cff', '#ff8a3d'][(i / 16 + k) % 5 | 0]);
                R(13 + i + k * 2, 25 + (k % 2) * 3, 1, 7, '#4f9a5a');
            }
        }
    }
    else if (t === 'mercado') {
        [12, W - 72].forEach(sx => { for (let k = 0; k < 3; k++) {
            prat(sx, 14 + k * 12, 60);
            itens(sx + 2, 7 + k * 12, 58, ['#c8242e', '#ffd36e', '#7bd389', '#f4f1ec', '#5b8cff'], (x, y, c) => { R(x, y, 4, 7, '#2a1d30'); R(x, y, 3, 6, c); });
        } });
    }
    else if (t === 'academia') {
        R(10, 10, W - 20, 36, '#9fc8e8');
        R(10, 10, W - 20, 2, '#fff');
        R(12, 44, W - 24, 2, '#7a7d86');
        for (let i = 0; i < 5; i++) {
            R(20 + i * 14, 32, 10, 4, '#2a1d30');
            R(22 + i * 14, 30, 6, 8, '#5a5a66');
        }
    }
    else {
        R(W / 2 - 40, 6, 80, 26, '#2a1d30');
        R(W / 2 - 39, 7, 78, 24, t === 'burger' ? '#2a2a30' : '#fff6fa');
        for (let k = 0; k < 4; k++)
            R(W / 2 - 34, 11 + k * 5, 40 + ((k * 13) % 30), 2, t === 'burger' ? '#ffd36e' : '#ff7aa8');
        [12, W - 50].forEach(sx => { prat(sx, 30, 38); itens(sx + 2, 22, 36, t === 'acai' ? ['#5d3a8a', '#ff5c8d', '#ffd36e'] : t === 'burger' ? ['#e8a030', '#c8242e'] : ['#ff9ec4', '#8fcaff', '#ffd36e', '#7bd389'], (x, y, c) => { R(x, y, 5, 8, '#2a1d30'); R(x, y, 4, 7, c); R(x, y, 4, 2, '#fff'); }); });
    }
}
function construirLoja(obj) {
    const L = LOJAS[obj], W = 224, H = 176, PISO = 52, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R, C) => {
        R(0, 0, W, PISO, L.parede);
        R(0, 0, W, 4, '#2a1d30');
        R(0, PISO - 4, W, 4, 'rgba(0,0,0,.25)');
        for (let y = PISO; y < H; y += 8)
            for (let x = 0; x < W; x += 8)
                R(x, y, 8, 8, ((x + y) / 8) % 2 ? L.piso[0] : L.piso[1]);
        R(0, PISO, W, 1, '#2a1d30');
        decorLoja(R, C, L, W);
    });
    const balcao = pinta(120, 26, (R) => { R(0, 0, 120, 26, '#2a1d30'); R(1, 1, 118, 8, '#c98f5f'); R(1, 1, 118, 2, '#e0b07a'); R(1, 9, 118, 16, '#8a5a3a'); for (let x = 8; x < 118; x += 16)
        R(x, 11, 1, 13, '#6a4028'); });
    objs.push({ nome: 'balcaoL', x: 52, y: 54, img: balcao, base: 80 });
    cols.push({ x: 52, y: 64, w: 120, h: 16 });
    if (['sorvete', 'burger', 'acai', 'padaria'].includes(L.tipo)) {
        const mesa = pinta(26, 18, (R, C) => { C(13, 8, 9, '#2a1d30'); C(13, 8, 8, '#f4f1ec'); R(11, 15, 4, 3, '#2a1d30'); });
        [[40, 130], [184, 130]].forEach(([x, y], i) => { objs.push({ nome: 'mesaL' + i, x: x - 13, y: y - 16, img: mesa, base: y + 2 }); cols.push({ x: x - 9, y: y - 6, w: 18, h: 8 }); });
    }
    if (L.tipo === 'mercado') {
        const gond = pinta(60, 22, (R) => { R(0, 0, 60, 22, '#2a1d30'); R(1, 1, 58, 20, '#e8e2d0'); for (let k = 0; k < 2; k++)
            for (let i = 2; i < 58; i += 5)
                R(i, 3 + k * 9, 4, 6, ['#c8242e', '#ffd36e', '#7bd389', '#5b8cff'][(i + k) % 4]); });
        [[24, 118], [140, 118]].forEach(([x, y], i) => { objs.push({ nome: 'gond' + i, x, y, img: gond, base: y + 22 }); cols.push({ x, y: y + 8, w: 60, h: 14 }); });
    }
    if (L.tipo === 'academia') {
        const esteira = pinta(22, 30, (R) => { R(0, 0, 22, 30, '#2a1d30'); R(2, 2, 18, 4, '#5b8cff'); R(4, 8, 14, 20, '#1d1d22'); R(5, 9, 12, 18, '#3a3a44'); });
        objs.push({ nome: 'esteira', x: 30, y: 100, img: esteira, base: 130 });
        cols.push({ x: 30, y: 116, w: 22, h: 14 });
        pts.push({ obj: 'esteira', nome: 'Correr na esteira', x: 41, y: 140, acao: () => { falar(FEFE, pick(['*correndo* ufa ufa', 'Só mais 5 minutinhos!', 'Cadê o ar-condicionado?!']), 1800); nec('energia', -6); nec('diversao', 6); particula('poeira', FEFE.x, FEFE.y, 3); } });
    }
    if (L.tipo === 'livraria')
        pts.push({ obj: 'leitura', nome: 'Ler um pouquinho', x: 180, y: 120, acao: () => { try {
                abrirLivro();
            }
            catch (e) {
                falar(FEFE, 'Que livro bonito...');
            } nec('diversao', 8); } });
    if (L.tipo === 'discos')
        pts.push({ obj: 'cabine', nome: 'Ouvir um disco', x: 180, y: 120, acao: () => { try {
                tocarMusica(pick(Object.keys(DISCOS)));
            }
            catch (e) { } falar(FEFE, 'Que som bom!', 1800); particula('nota', FEFE.x, FEFE.y - 28, 3); setTimeout(() => { if (String(MAPA).startsWith('int_'))
                pararMusica(); }, 8000); } });
    const A = ACOES_LOJA[obj];
    if (A)
        pts.push({ obj: 'balcaoL', nome: A.nome, x: 112, y: 92, acao: A.acao });
    objs.push({ nome: 'saida', x: W / 2 - 14, y: H - 10, img: pinta(28, 10, (R) => { R(0, 0, 28, 10, '#0c0a10'); R(2, 2, 24, 8, '#000'); R(0, 0, 28, 2, '#c9b8d6'); }), base: H - 9 });
    pts.push({ obj: 'saida', nome: 'Sair da loja', x: W / 2, y: H - 16, acao: () => trocarCena('cidade') });
    CENAS['int_' + L.id] = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 84, y1: H - 6 }, entrada: [W / 2, H - 22], chegada: [`Que ${pick(['lugar fofo', 'cheirinho bom', 'lugar lindo'])}!`], chegadaSozinha: [L.staff], bg: '#2a1d30', lojaObj: obj };
}
function atualizarExtras37(dt) {
    if (MAPA === 'cidade') { }
    manterAPe();
    bancosNaCidade();
    lojasNaCidade();
    if (MAPA !== mapaAnt37) {
        const de = mapaAnt37;
        mapaAnt37 = MAPA;
        if (String(MAPA).startsWith('int_') && de === 'cidade') {
            ISI.aqui = isiAntesLoja;
            if (ISI.aqui) {
                ISI.estado = 'seguindo';
                ISI.x = FEFE.x + 16;
                ISI.y = FEFE.y;
            }
        }
        if (MAPA === 'cidade' && String(de).startsWith('int_')) {
            ISI.aqui = isiAntesLoja;
        }
    }
}
