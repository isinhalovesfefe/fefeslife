function imgCachorro(rid, feliz) {
    const k = rid + (feliz ? 'f' : '');
    if (_dogCache[k])
        return _dogCache[k];
    const R = RACAS.find(r => r.id === rid) || RACAS[0], g = DOG_GRADES[R.g].map(r => [...r]);
    if (R.manchas)
        R.manchas.forEach(([x, y]) => { if (g[y][x] === 'B')
            g[y][x] = 'P'; });
    if (feliz)
        g.forEach((r, y) => r.forEach((c, x) => { if (c === 'E') {
            g[y][x] = 'B';
            if (g[y - 1])
                g[y - 1][x] = 'E';
        } }));
    return (_dogCache[k] = gridCanvas(g.map(r => r.join('')), R.cor));
}
function desenharCachorro(c2d, d, x, y, andando) {
    const R = RACAS.find(r => r.id === d.raca) || RACAS[0], t = performance.now();
    const bob = andando ? Math.floor(t / 120) % 2 : 0, feliz = d.felizAte && t < d.felizAte;
    c2d.fillStyle = 'rgba(0,0,0,.2)';
    c2d.fillRect(x - 6, y - 1, 12, 2);
    const w = Math.floor(t / (feliz ? 70 : 160)) % 2;
    c2d.fillStyle = R.cor.O;
    c2d.fillRect(x + 5, y - 7 - bob - w, 4, 3);
    c2d.fillStyle = R.cor.B;
    c2d.fillRect(x + 6, y - 6 - bob - w, 2, 1);
    c2d.drawImage(imgCachorro(R.id, feliz), x - 7, y - 14 - bob);
    if (d.coleira) {
        c2d.fillStyle = d.coleira;
        c2d.fillRect(x - 3, y - 5 - bob, 6, 1);
        c2d.fillStyle = '#ffd36e';
        c2d.fillRect(x, y - 4 - bob, 1, 1);
    }
}
function novoCachorro(o = {}) { const R = o.raca ? RACAS.find(r => r.id === o.raca) : pick(RACAS); return { raca: R.id, nome: pick(R.nome), x: o.x || 0, y: o.y || 0, coleira: pick(['#ff5c8d', '#5b8cff', '#7bd389', '#ffd36e', '#c8242e']), mapa: MAPA }; }
function latir() { if (!audio())
    return; const t = AC.currentTime; tom(t, 330, .07, .06, 'square'); tom(t + .12, 300, .09, .06, 'square'); }
function fazerCarinhoCachorro(d) {
    d.felizAte = performance.now() + 2500;
    latir();
    particula('coracao', d.x, d.y - 16, 3);
    falar(d, pick([`AU AU! ♥`, `*${d.nome} abana o rabo*`, '*lambeijo*', '*deita de barriga pra cima*']), 1600);
    nec('social', 3);
    if (ISI.aqui && Math.random() < .5)
        setTimeout(() => falar(ISI, pick(['Que fofuraaa', 'Ele parece o Floki!', 'Quero levar pra casa']), 1800), 800);
    primeiraVez('cachorro', 1);
}
function predioNovo(R, C, cols, x, y, w, h, parede, teto, toldo, placa, porta = true) {
    cols.push({ x, y, w, h: h - 2 });
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
}
function fazerCastelo() {
    if (castelos.length >= 4)
        castelos.shift();
    const x = FEFE.x + 10, y = FEFE.y - 2;
    castelos.push({ x, y });
    particula('poeira', x, y, 5);
    som.pop();
    falar(FEFE, pick(['Um castelo pra nossa família!', 'Torre do Tho, torre da Lola, torre da Clarinha', 'Ficou lindo!']), 2000);
    if (ISI.aqui)
        setTimeout(() => falar(ISI, 'Vou fazer o fosso!', 1600), 900);
    nec('diversao', 10);
    primeiraVez('castelo', 1);
}
function atualizarLugares(dt) {
    if (MAPA !== 'cidade')
        return;
    lugarChecaT -= dt;
    if (lugarChecaT > 0)
        return;
    lugarChecaT = .5;
    S.lugares = S.lugares || [];
    LUGARES.forEach(L => { if (S.lugares.includes(L.id))
        return; if (Math.hypot(FEFE.x - L.x, FEFE.y - L.y) < 70) {
        S.lugares.push(L.id);
        salvar();
        som.plim();
        toast(`📍 Lugar descoberto: ${L.n} (${S.lugares.length}/${LUGARES.length})`);
        if (S.lugares.length === LUGARES.length) {
            ganhar(10);
            toast('Você conhece a cidade toda! +10 ♥');
        }
    } });
}
function atualizarBotaoMapa() { const v = MAPA === 'cidade' && !bloqueioTela(); if ((btnMapa.style.display === 'block') !== v) {
    btnMapa.style.display = v ? 'block' : 'none';
    btnMapa.style.bottom = '44px';
} }
function abrirMapa() {
    const C0 = CENAS.cidade || {}, F = MAPA === 'cidade' ? fundo : C0.fundo;
    if (!F)
        return;
    const E = 10, W = Math.round(CID2.W / E), H = Math.round(CID2.H / E);
    abrir(`🗺️ Mapa da cidade · ${(S.lugares || []).length}/${LUGARES.length} lugares`, `<div class="mg"><canvas id="cvMapa" width="${W * 2}" height="${H * 2}" style="display:block;margin:0 auto;max-width:100%;max-height:calc(92vh - 150px);width:auto;height:auto;image-rendering:pixelated;box-shadow:0 0 0 3px #2a1d30"></canvas><p style="font-size:12px;opacity:.7;margin:6px 0 0">Os lugares que você ainda não descobriu aparecem como "?"</p></div>`, true, true);
    const cv = $('cvMapa'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = true;
    x.drawImage(F, 0, 0, W * 2, H * 2);
    x.imageSmoothingEnabled = false;
    const s = 2 / E, L = S.lugares || [];
    x.font = 'bold 9px monospace';
    x.textAlign = 'center';
    LUGARES.forEach(p => {
        const px = p.x * s, py = p.y * s, ok = L.includes(p.id);
        x.fillStyle = '#2a1d30';
        x.fillRect(px - 4, py - 4, 8, 8);
        x.fillStyle = ok ? '#ff7aa8' : '#9aa0b0';
        x.fillRect(px - 3, py - 3, 6, 6);
        const txt = ok ? p.n : '?';
        const w = x.measureText(txt).width + 6;
        x.fillStyle = 'rgba(255,255,255,.88)';
        x.fillRect(px - w / 2, py - 17, w, 11);
        x.fillStyle = '#2a1d30';
        x.fillText(txt, px, py - 8);
    });
    const lp = () => {
        if (!modalVivo('cvMapa'))
            return;
        requestAnimationFrame(lp);
        const fx = FEFE.x * s, fy = FEFE.y * s, p = Math.floor(performance.now() / 300) % 2;
        x.fillStyle = '#2a1d30';
        x.fillRect(fx - 4, fy - 4, 8, 8);
        x.fillStyle = p ? '#ffd36e' : '#ff5c8d';
        x.fillRect(fx - 3, fy - 3, 6, 6);
    };
    requestAnimationFrame(lp);
}
function atualizarExtras35(dt) { atualizarLugares(dt); atualizarBotaoMapa(); }
