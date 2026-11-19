function alvoProximo() {
    const fx = FEFE.x, fy = FEFE.y - 4, cands = [];
    if (MAPA === 'quarto')
        gatos.forEach(g => { if (g.estado === 'escondido' || g.estado === 'oculto')
            return; cands.push({ tipo: 'gato', g, d: Math.hypot(g.x - fx, g.y - 4 - fy), r: 22, peso: -10 }); });
    PONTOS.forEach(p => cands.push({ tipo: 'ponto', p, d: Math.hypot(p.x - fx, p.y - fy), r: p.r || 20, peso: p.peso || 0 }));
    const igual = (a, b) => a && b && a.tipo === b.tipo && a.g === b.g && a.p === b.p;
    let melhor = null;
    if (alvoAtual && alvoAtual.tipo !== 'isinha') {
        const c = cands.find(c => igual(c, alvoAtual));
        if (c && c.d < c.r + 8)
            melhor = c;
    }
    if (!melhor) {
        const ok = cands.filter(c => c.d < c.r).sort((a, b) => (a.d + a.peso) - (b.d + b.peso));
        melhor = ok[0] || null;
    }
    if (!melhor && ISI.aqui && ISI.estado !== 'saindo' && !ISI.pose) {
        const d = Math.hypot(ISI.x - fx, ISI.y - 4 - fy);
        if (d < (alvoAtual && alvoAtual.tipo === 'isinha' ? 32 : 26))
            melhor = { tipo: 'isinha', d };
    }
    alvoAtual = melhor;
    return melhor;
}
function virarPara(x, y) { const dx = x - FEFE.x, dy = y - (FEFE.y - 4); FEFE.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'); }
function interagir() {
    if (bloqueioTela())
        return;
    if (FEFE.pose)
        return levantar();
    const a = alvoProximo();
    if (!a) {
        if (FEFE.bike) {
            campainha();
            return falar(FEFE, 'Trim trim!', 1000);
        }
        return falar(FEFE, falaSemAlvo(), 1600);
    }
    if (a.tipo === 'isinha') {
        virarPara(ISI.x, ISI.y - 4);
        menuIsinha();
    }
    else if (a.tipo === 'gato') {
        virarPara(a.g.x, a.g.y - 4);
        chegarNoGato(a.g);
    }
    else {
        virarPara(a.p.x, a.p.y);
        a.p.acao();
    }
}
function chegarNoGato(g) {
    const st = S.gatos[g.id];
    if (g.id === 'tho' && !st.dormindo && Math.random() < .22) {
        falar(g, pick(FALAS.tho.foge));
        som.miau('tho', 1.3);
        const [x, y] = pontoLivre();
        irPara(g, x, y, null, 90);
        return;
    }
    abrirPerto(g);
}
function tocarMundo(sx, sy) {
    const [wx, wy] = aMundo(sx, sy);
    if (modoFoto && MAPA === 'quarto') {
        tocarFoto(wx, wy);
        return;
    }
    if (laser) {
        laser.x = Math.max(MUNDO.x0, Math.min(MUNDO.x1, wx));
        laser.y = Math.max(MUNDO.y0, Math.min(MUNDO.y1, wy));
        return;
    }
    if (montando) {
        tocarMontar(wx, wy);
        return;
    }
    if (tocouJanela(wx, wy))
        return;
    if (esconde && esconde.ate) {
        const l = esconde.lugares.find(l => PONTOS.some(p => p.esconde && p.lugar === l) && Math.hypot(wx - l.hx, wy - l.hy) < 24);
        if (l) {
            FEFE.alvo = { x: l.x, y: l.y, raio: 14, t: 0, cb: () => { virarPara(l.hx, l.hy); procurar(l); } };
            return;
        }
    }
    const g = MAPA !== 'quarto' ? null : gatos.find(g => g.estado !== 'escondido' && g.estado !== 'oculto' && wx > g.x - 9 && wx < g.x + 9 && wy > g.y - 17 && wy < g.y + 3);
    if (g) {
        if (g.id === 'tho' && tapTho(g))
            return;
        if (g.estado === 'andando' && !S.gatos[g.id].dormindo && !g.chegar) {
            g.estado = 'parado';
            g.timer = 5;
        }
        else if (g.estado === 'parado')
            g.timer = Math.max(g.timer, 5);
        FEFE.alvo = { g, x: g.x, y: g.y, raio: 16, t: 0, cb: () => { virarPara(g.x, g.y - 4); chegarNoGato(g); } };
        return;
    }
    if (ISI.aqui && ISI.estado !== 'saindo' && !ISI.pose && wx > ISI.x - 7 && wx < ISI.x + 7 && wy > ISI.y - 24 && wy < ISI.y + 2) {
        FEFE.alvo = { x: ISI.x + (FEFE.x < ISI.x ? -12 : 12), y: ISI.y, raio: 16, t: 0, cb: () => { virarPara(ISI.x, ISI.y - 4); menuIsinha(); } };
        return;
    }
    const objs = OBJ.filter(o => wx >= o.x && wx < o.x + o.img.width && wy >= o.y && wy < o.y + o.img.height).sort((a, b) => b.base - a.base);
    if (!objs.length) {
        const pd = PONTOS.find(p => p.zona && wx >= p.zona[0] && wx < p.zona[0] + p.zona[2] && wy >= p.zona[1] && wy < p.zona[1] + p.zona[3]);
        if (pd) {
            FEFE.alvo = { x: pd.x, y: pd.y + 4, raio: 12, t: 0, cb: () => { virarPara(pd.x, pd.y); pd.acao(); } };
            return;
        }
    }
    let p = objs.length ? PONTOS.find(p => p.obj === objs[0].nome) : null;
    if (!p && wx > 250 && wx < 296 && wy > 196 && wy < 216)
        p = PONTOS.find(p => p.obj === 'potes');
    if (p) {
        FEFE.alvo = { x: p.x, y: p.y + 4, raio: 14, t: 0, cb: () => { virarPara(p.x, p.y); p.acao(); } };
        return;
    }
    if (MAPA === 'parque' || wy > PISO_Y) {
        FEFE.alvo = { x: wx, y: wy, t: 0 };
        marcaAlvo = { x: wx, y: wy, ate: performance.now() + 600 };
    }
}
