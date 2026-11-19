function horaAgora() { const d = new Date(); return d.getHours() + d.getMinutes() / 60; }
function fatorMovimento(h = horaAgora()) {
    if (h < 6)
        return .08;
    if (h < 7)
        return .15;
    if (h < 10)
        return .3;
    if (h < 12)
        return .5;
    if (h < 16)
        return .7;
    if (h < 19)
        return 1;
    if (h < 22)
        return .55;
    return .28;
}
function estaAberto(lugar) { const H = HORARIOS[lugar]; if (!H)
    return true; const h = horaAgora(); return h >= H[0] && h < H[1]; }
function saudacao() { const h = horaAgora(); return h < 5 ? 'Boa noite!' : h < 12 ? 'Bom dia!' : h < 18 ? 'Boa tarde!' : 'Boa noite!'; }
function ehNoiteRua() { const h = horaAgora(); return h >= 18.5 || h < 6; }
function falasDaHora(lista) {
    if (!lista)
        return lista;
    let L = lista.map(t => /^Bom dia+!?$/i.test(t) ? saudacao() : t);
    if (ehNoiteRua()) {
        L = L.filter(t => !SO_DE_DIA.test(t));
        L = L.concat(FALAS_NOITE.slice(0, 3));
    }
    return L.length ? L : [saudacao()];
}
function chegadaDaHora(cena, dia, noite) { const C = CENAS[cena]; if (!C)
    return; ['chegada', 'chegadaSozinha'].forEach(k => { if (!C[k])
    return; const d = dia[k] || C[k], n = noite[k] || C[k]; Object.defineProperty(C, k, { configurable: true, get: () => ehNoiteRua() ? n : d }); }); }
function versaoMasculina(g, corte, barba, frente) {
    const G = g.map(r => [...r]), H = G.length, W = G[0].length;
    if (frente)
        for (let x = 0; x < W; x++)
            if (G[7] && G[7][x] === 'E') {
                if (G[6][x] === 'S')
                    G[6][x] = 'H';
                const v = x < W / 2 ? x - 1 : x + 1;
                if (G[6][v] === 'S')
                    G[6][v] = 'H';
            }
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            const k = G[y][x];
            if (y >= corte && (k === 'H' || k === 'h'))
                G[y][x] = '.';
            if (k === 'R')
                G[y][x] = 'S';
            if (k === 'L')
                G[y][x] = 's';
            if (k === 'm')
                G[y][x] = 'T';
            if (k === 'A' && y >= 13 && y <= 15)
                G[y][x] = 'T';
        }
    if (!frente) {
        for (let y = 4; y < corte; y++)
            for (let x = 0; x < W; x++)
                if ((x < 3 || x > 12) && (G[y][x] === 'H' || G[y][x] === 'h'))
                    G[y][x] = '.';
        for (let y = corte; y <= 12; y++)
            for (let x = 6; x <= 9; x++)
                G[y][x] = (x === 6 || x === 9) ? 's' : 'S';
        for (let y = 13; y <= 19; y++) {
            const xs = [];
            for (let x = 0; x < W; x++)
                if (G[y][x] !== '.' && G[y][x] !== 'O')
                    xs.push(x);
            if (!xs.length)
                continue;
            const x0 = Math.max(3, Math.min(...xs)), x1 = Math.min(W - 4, Math.max(...xs));
            for (let x = x0; x <= x1; x++) {
                const k = G[y][x];
                if (y <= 18 && (k === '.' || k === 'O' || k === 'S' || k === 'A' || k === 'H' || k === 'h'))
                    G[y][x] = y <= 17 ? 'T' : 'b';
            }
        }
    }
    if (barba && frente)
        for (let y = 10; y <= 11; y++)
            for (let x = 0; x < W; x++)
                if (G[y][x] === 'S' || G[y][x] === 's')
                    G[y][x] = 'H';
    const cheio = (y, x) => G[y] && G[y][x] !== undefined && G[y][x] !== '.' && G[y][x] !== 'O';
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++)
            if (G[y][x] === 'O' && ![[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => cheio(y + b, x + a)))
                G[y][x] = '.';
    const out = G.map(r => [...r]);
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++)
            if (G[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => cheio(y + b, x + a)))
                out[y][x] = 'O';
    return out.map(r => r.join(''));
}
function baseMasculina(barba) {
    const k = barba ? 1 : 0;
    if (_baseMasc[k])
        return _baseMasc[k];
    const F = framesIsinha(), M = {};
    ['down', 'left', 'right'].forEach(d => M[d] = F[d].map(g => versaoMasculina(g, 7, barba, true)));
    M.up = F.up.map(g => versaoMasculina(g, 9, false, false));
    return (_baseMasc[k] = M);
}
