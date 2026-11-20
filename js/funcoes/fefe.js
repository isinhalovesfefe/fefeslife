function orelhas(grid, lado) {
    const g = grid.map(r => [...r]);
    const P = (x, y, c) => { if (g[y] && g[y][x] !== undefined)
        g[y][x] = c; };
    if (lado === 'right' || lado === 'left') {
        const pts = [[6, 0, 'G'], [7, 0, 'G'], [6, 1, 'G'], [7, 1, 'g'], [8, 1, 'G'], [9, 0, 'G'], [9, 1, 'G']];
        pts.forEach(([x, y, c]) => P(lado === 'left' ? 15 - x : x, y, c));
    }
    else
        [[3, 0, 'G'], [4, 0, 'G'], [3, 1, 'G'], [4, 1, 'g'], [5, 1, 'G']].forEach(([x, y, c]) => { P(x, y, c); P(15 - x, y, c); });
    return g.map(r => r.join(''));
}
function gradesFefe(roupa = S.roupa, fone = S.fone) {
    const F = framesFefe(fone);
    if (lookAtivo('fefe'))
        roupa = 0;
    if (ROUPAS[roupa].orelhas)
        for (const d in F)
            F[d] = F[d].map(f => orelhas(f, d));
    if (ROUPAS[roupa].mod) {
        const mf = ROUPAS[roupa].mod;
        for (const d in F)
            F[d] = F[d].map(fr => { const g = fr.map(r => [...r]); mf(g, d); return g.map(r => r.join('')); });
    }
    return modLook(F, 'fefe');
}
function desenharAcessorio(c2d, id, x, y) { const st = S.gatos[id]; if (!st.acc || !ACESSORIOS[st.acc])
    return; const a = ACESSORIOS[st.acc]; c2d.drawImage(spr(a.peq.g, a.cor, 'ap' + st.acc), x + a.peq.x, y + a.peq.y); }
function acessorioGrandeSVG(id) { let t = ''; try {
    t = travGrandeSVG(id);
}
catch (e) { } return accGrandeSVG(id) + t; }
function accGrandeSVG(id) { const st = S.gatos[id]; if (!st.acc || !ACESSORIOS[st.acc])
    return ''; const a = ACESSORIOS[st.acc]; return rectsSVG(a.gde.g.map(r => [...r]), a.cor, a.gde.x, a.gde.y); }
function gatoPequeno(c2d, id, h, x, y) { const c = GATOS[id]; c2d.drawImage(spr(gatoPixels(c.tipo, h, false), c.cor, 'g' + id + h), x, y); desenharAcessorio(c2d, id, x, y); try {
    desenharTrav(c2d, id, x, y);
}
catch (e) { } try {
    desenharFantasia(c2d, id, x, y);
}
catch (e) { } }
function paletaFefe(roupa = S.roupa) { if (lookAtivo('fefe'))
    roupa = 0; const p = Object.assign({ W: '#ffffff', G: '#1d1b22', g: '#ff9fbf', k: '#1d1b22', y: '#f0dc8c', n: '#d9dbe6' }, FEFE_COR, ROUPAS[roupa].cor, (lookAtivo('fefe') || {}).cor || {}); p.z = p.A !== FEFE_COR.A ? p.A : '#5a3a4a'; return p; }
function montarFefe() {
    if (!roupaLiberada(S.roupa))
        S.roupa = 0;
    const F = gradesFefe(), pal = paletaFefe();
    fefeSpr = {};
    fefeGrades = F;
    for (const d in F)
        fefeSpr[d] = F[d].map(f => spr(f, pal));
    const frente = F.down[0], costas = F.up[0];
    const dorme = frente.map(r => [...r]);
    dorme[7][5] = 'S';
    dorme[7][10] = 'S';
    const pernas = ["..OJJJJJJJJJJO..", ".OJJJJJjjJJJJJO.", ".OBBOJJJJJJOBBO.", "..OOOOOOOOOOOO.."];
    fefeSpr.sentada = spr(frente.slice(0, 20).concat(pernas), pal);
    {
        const ls = ladoSentado(F.right[0].map(r => typeof r === 'string' ? r : r.join('')));
        fefeSpr.sentadaLadoD = spr(ls, pal);
        fefeSpr.sentadaLadoE = spr(espelhaG(ls), pal);
    }
    fefeSpr.deitada = spr(dorme.map(r => r.join('')), pal);
    fefeSpr.pc = spr(costas.slice(0, 20), pal);
    fefeSpr.bikeR = spr(F.right[0].slice(0, 20), pal);
    fefeSpr.bikeL = spr(F.left[0].slice(0, 20), pal);
    fefeSpr.bikeD = spr(frente.slice(0, 20), pal);
    fefeSpr.bikeU = spr(costas.slice(0, 20), pal);
    const lado = F.right[0].map(r => [...r]);
    lado[7][10] = 'S';
    fefeSpr.ladoDorme = spr(lado.map(r => r.join('')), pal);
}
