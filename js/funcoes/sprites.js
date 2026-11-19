function fone(grid, lado) {
    const g = grid.map(r => [...r]);
    const P = (x, y, c) => { if (g[y] && g[y][x] !== undefined)
        g[y][x] = c; };
    if (!lado) {
        for (let x = 4; x <= 11; x++)
            P(x, 1, 'X');
        [[3, 2], [2, 3], [2, 4], [2, 5]].forEach(([x, y]) => { P(x, y, 'X'); P(15 - x, y, 'X'); });
        [[1, 6], [2, 6], [1, 7], [2, 7], [1, 8], [2, 8]].forEach(([x, y]) => { P(x, y, 'X'); P(15 - x, y, 'X'); });
        P(1, 7, 'x');
        P(14, 7, 'x');
    }
    else {
        for (let x = 5; x <= 8; x++)
            P(x, 1, 'X');
        [[4, 2], [5, 3], [5, 4], [5, 5]].forEach(([x, y]) => P(x, y, 'X'));
        [[5, 6], [6, 6], [5, 7], [6, 7], [5, 8], [6, 8]].forEach(([x, y]) => P(x, y, 'X'));
        P(5, 7, 'x');
    }
    return g.map(r => r.join(''));
}
function framesFefe(comFone) {
    const F = {};
    let frente = espelhar(FEFE_FRENTE_L), costas = espelhar(FEFE_COSTAS_L), lado = FEFE_LADO;
    if (comFone) {
        frente = fone(frente);
        costas = fone(costas);
        lado = fone(lado, true);
    }
    const passo = (base, l) => {
        const g = base.map(r => [...r]);
        const c0 = l === 0 ? 0 : 8, c1 = l === 0 ? 8 : 16;
        for (let y = 20; y < 26; y++)
            for (let x = c0; x < c1; x++)
                g[y][x] = (y < 25 && base[y + 1]) ? base[y + 1][x] : '.';
        return g.map(r => r.join(''));
    };
    F.down = [frente, passo(frente, 0), frente, passo(frente, 1)];
    F.up = [costas, passo(costas, 1), costas, passo(costas, 0)];
    const ladoPasso = lado.slice(0, 20).concat(FEFE_LADO_PASSO);
    F.right = [lado, ladoPasso, lado, ladoPasso];
    F.left = F.right.map(fr => fr.map(r => [...r].reverse().join('')));
    return F;
}
function gatoPixels(tipo, humor, laco) {
    const g = GATO_BASE.map(r => [...r]);
    const P = (x, y, c) => { if (g[y] && g[y][x] !== undefined)
        g[y][x] = c; };
    if (tipo === 'tortie') {
        for (let y = 4; y <= 8; y++)
            for (let x = 2; x <= 11; x++) {
                const dx = (x - 6.5) / 4.6, dy = (y - 6.3) / 2.4;
                if (dx * dx + dy * dy <= 1 && 'Bb'.includes(g[y][x]))
                    g[y][x] = 'M';
            }
        [[1, 1], [2, 1], [2, 2], [11, 1], [12, 1], [11, 2]].forEach(([x, y]) => { if (g[y][x] !== '.' && g[y][x] !== 'O')
            P(x, y, 'M'); });
        [[3, 3], [4, 3], [4, 4], [5, 4]].forEach(([x, y]) => P(x, y, 'P'));
        P(9, 7, 'P');
    }
    else if (tipo === 'tabby') {
        [[5, 3], [6, 4], [7, 4], [8, 3], [2, 9], [11, 9], [2, 11], [11, 11]].forEach(([x, y]) => P(x, y, 'S'));
    }
    const fc = g[7][3];
    const olho = (pts) => pts.forEach(([x, y, c]) => { P(x, y, c); P(13 - x, y, c); });
    if (humor === 'feliz') {
        olho([[3, 5, fc], [4, 5, 'F'], [3, 6, 'F'], [4, 6, fc], [5, 6, 'F']]);
        P(2, 7, 'R');
        P(11, 7, 'R');
    }
    else if (humor === 'dormindo')
        olho([[3, 5, fc], [4, 5, fc], [3, 6, 'F'], [4, 6, 'F']]);
    else if (humor === 'triste') {
        olho([[3, 5, 'E'], [4, 5, 'E'], [3, 6, 'E'], [4, 6, 'K']]);
        P(3, 7, 'A');
    }
    if (laco) {
        [[9, 1, 'L'], [10, 2, 'l'], [11, 1, 'L'], [9, 3, 'L'], [11, 3, 'L']].forEach(([x, y, c]) => P(x, y, c));
    }
    return g.map(r => r.join(''));
}
function framesIsinha() {
    const F = {};
    const frente = espelhar(ISI_FRENTE_L), costas = espelhar(ISI_COSTAS_L);
    const passo = (base, l) => { const g = base.map(r => [...r]); const c0 = l === 0 ? 0 : 8, c1 = l === 0 ? 8 : 16; for (let y = 20; y < 26; y++)
        for (let x = c0; x < c1; x++)
            g[y][x] = (y < 25 && base[y + 1]) ? base[y + 1][x] : '.'; return g.map(r => r.join('')); };
    F.down = [frente, passo(frente, 0), frente, passo(frente, 1)];
    F.up = [costas, passo(costas, 1), costas, passo(costas, 0)];
    const lp = ISI_LADO.slice(0, 20).concat(FEFE_LADO_PASSO);
    F.right = [ISI_LADO, lp, ISI_LADO, lp];
    F.left = F.right.map(fr => fr.map(r => [...r].reverse().join('')));
    return F;
}
function put(g, x, y, c) { if (y >= 0 && y < g.length && x >= 0 && x < g[0].length)
    g[y][x] = c; }
function stamp(g, m, ox, oy) { m.forEach((r, y) => [...r].forEach((c, x) => { if (c !== '.')
    put(g, ox + x, oy + y, c); })); }
function sim(g, x, y, c) { put(g, x, y, c); put(g, 31 - x, y, c); }
function montarGato(tipo, h, olhoFechado) {
    const g = BASE.map(r => r.slice());
    if (tipo === 'tortie') {
        for (let y = 5; y <= 15; y++)
            for (let x = 3; x <= 28; x++) {
                const dx = (x - 15.5) / 8.2, dy = (y - 11.5) / 4.3;
                if (dx * dx + dy * dy <= 1 && (g[y][x] === 'B' || g[y][x] === 'b'))
                    g[y][x] = 'M';
            }
        for (let y = 1; y <= 6; y++)
            for (let x = 0; x < 32; x++)
                if (g[y][x] === 'B' && (x < 9 || x > 22))
                    g[y][x] = 'M';
        [[9, 5], [10, 5], [11, 5], [9, 6], [10, 6], [11, 6], [12, 6], [10, 7], [11, 7], [12, 7], [11, 8], [12, 8], [20, 12], [21, 12], [20, 13], [21, 13], [22, 13]].forEach(([x, y]) => put(g, x, y, 'P'));
        [[5, 20], [6, 20], [5, 21], [25, 22], [26, 22], [26, 23]].forEach(([x, y]) => put(g, x, y, 'P'));
    }
    else if (tipo === 'tabby') {
        [[13, 5], [13, 6], [15, 5], [15, 6], [16, 5], [16, 6], [18, 5], [18, 6], [14, 7], [17, 7]].forEach(([x, y]) => put(g, x, y, 'S'));
        [[3, 9], [4, 9], [5, 9], [3, 11], [4, 11]].forEach(([x, y]) => sim(g, x, y, 'S'));
        [[4, 19], [5, 19], [6, 20], [4, 22], [5, 22], [6, 23], [4, 25], [5, 25]].forEach(([x, y]) => sim(g, x, y, 'S'));
        [[7, 8], [8, 7]].forEach(([x, y]) => sim(g, x, y, 'S'));
    }
    let ol = h === 'dormindo' ? OLHO.fechado : h === 'feliz' ? OLHO.feliz : h === 'triste' ? OLHO.baixo : h === 'bravo' ? OLHO.bravo : OLHO.aberto;
    if (olhoFechado && ol !== OLHO.feliz)
        ol = OLHO.fechado;
    stamp(g, ol, 7, 7);
    stamp(g, ol, 20, 7);
    if (h === 'bravo') {
        [[7, 6], [8, 6], [9, 7], [10, 7]].forEach(([x, y]) => sim(g, x, y, 'F'));
    }
    if (h === 'triste') {
        [[8, 6], [9, 6], [10, 5], [11, 5]].forEach(([x, y]) => sim(g, x, y, 'F'));
        put(g, 7, 12, 'A');
        put(g, 7, 13, 'A');
    }
    put(g, 15, 12, 'N');
    put(g, 16, 12, 'N');
    if (h === 'feliz') {
        [[14, 13], [15, 14], [16, 14], [17, 13]].forEach(([x, y]) => put(g, x, y, 'F'));
    }
    else if (h === 'triste') {
        [[14, 14], [15, 13], [16, 13], [17, 14]].forEach(([x, y]) => put(g, x, y, 'F'));
    }
    else if (h === 'bravo') {
        [[15, 13], [16, 13], [15, 14], [16, 14]].forEach(([x, y]) => put(g, x, y, 'm'));
        [[14, 13], [17, 13]].forEach(([x, y]) => put(g, x, y, 'W'));
    }
    else if (h === 'comendo') {
        [[15, 13], [16, 13], [15, 14], [16, 14]].forEach(([x, y]) => put(g, x, y, 'm'));
        [[14, 13], [17, 13]].forEach(([x, y]) => put(g, x, y, 'F'));
    }
    else {
        [[13, 13], [14, 14], [15, 13], [16, 13], [17, 14], [18, 13]].forEach(([x, y]) => put(g, x, y, 'F'));
    }
    if (h === 'feliz') {
        sim(g, 5, 11, 'R');
        sim(g, 6, 11, 'R');
    }
    [[0, 12], [1, 12], [0, 14], [1, 14], [2, 14]].forEach(([x, y]) => sim(g, x, y, 'H'));
    return g;
}
function spr(grid, pal, chave) {
    if (chave && cache[chave])
        return cache[chave];
    const c = document.createElement('canvas');
    c.width = grid[0].length;
    c.height = grid.length;
    const x = c.getContext('2d');
    grid.forEach((r, y) => { for (let i = 0; i < r.length; i++) {
        const ch = r[i];
        if (ch !== '.' && pal[ch]) {
            x.fillStyle = pal[ch];
            x.fillRect(i, y, 1, 1);
        }
    } });
    const gatoPal = pal && (pal.I === '#f5a9bd' || pal.I === '#5a3d4a');
    if (!(pal && (pal.S === '#e2ab84' || pal.S === '#f8dcc8')))
        sombrear(c);
    if (!gatoPal)
        contornoColorido(c);
    if (chave)
        cache[chave] = c;
    return c;
}
function pinta(w, h, fn) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const x = c.getContext('2d');
    const R = (a, b, ww, hh, cor) => { x.fillStyle = cor; x.fillRect(a, b, ww, hh); };
    const C = (cx, cy, r, cor) => { x.fillStyle = cor; for (let yy = -r; yy <= r; yy++)
        for (let xx = -r; xx <= r; xx++)
            if (xx * xx + yy * yy <= r * r + r * .8)
                x.fillRect(cx + xx, cy + yy, 1, 1); };
    fn(R, C, x);
    if (w * h <= 14000) {
        sombrear(c);
        contornoColorido(c);
    }
    return c;
}
function rectsSVG(grid, cores, ox = 0, oy = 0) {
    let s = '';
    grid.forEach((r, y) => { let x = 0; while (x < r.length) {
        const c = r[x];
        if (c === '.' || !cores[c]) {
            x++;
            continue;
        }
        let w = 1;
        while (r[x + w] === c)
            w++;
        s += `<rect x="${x + ox}" y="${y + oy}" width="${w}" height="1" fill="${cores[c]}"/>`;
        x += w;
    } });
    return s;
}
function iconeSVG(nome, h) { const [m, c] = ICONES[nome]; return `<svg viewBox="0 0 ${m[0].length} ${m.length}" style="height:${h || 24}px">${rectsSVG(m, c)}</svg>`; }
function estadoNovo() {
    const agora = Date.now(), g = {};
    for (const id in GATOS)
        g[id] = { fome: 70, alegria: 70, energia: 80, dormindo: false, laco: false, t: agora };
    return { gatos: g, coracoes: 0, inicio: agora, lidas: [], ultimoDia: hoje(), streak: 1 };
}
function salvar() { try {
    localStorage.setItem(CHAVE, JSON.stringify(S));
}
catch (e) {
    if (S.album.length > 4) {
        S.album.shift();
        try {
            localStorage.setItem(CHAVE, JSON.stringify(S));
        }
        catch (_) { }
    }
} }
function atualizarTempo() {
    const agora = Date.now();
    for (const id in S.gatos) {
        const g = S.gatos[id], h = Math.max(0, (agora - g.t) / 36e5);
        g.fome = lim(g.fome + TAXA.fome * h);
        g.alegria = lim(g.alegria + TAXA.alegria * h);
        if (g.dormindo) {
            g.energia = lim(g.energia + TAXA.sono * h);
            if (g.energia >= 100)
                g.dormindo = false;
        }
        else
            g.energia = lim(g.energia + TAXA.energia * h);
        g.t = agora;
    }
}
function humor(g) {
    if (g.dormindo)
        return 'dormindo';
    if (g.doente)
        return 'triste';
    if (Math.min(g.fome, g.alegria, g.energia) < 25)
        return 'triste';
    if ((g.fome + g.alegria + g.energia) / 3 > 70)
        return 'feliz';
    return 'normal';
}
function ganhar(n) {
    const a = S.coracoes;
    S.coracoes += n;
    atualizarHUD();
    if (n > 0)
        som.plim();
    if (a < 100 && S.coracoes >= 100)
        setTimeout(() => toast('100 corações! Melhor mamãe de gato do mundo!'), 500);
}
