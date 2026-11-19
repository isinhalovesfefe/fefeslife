function redimensionar() {
    dpr = window.devicePixelRatio || 1;
    tela.width = Math.round(innerWidth * dpr);
    tela.height = Math.round(innerHeight * dpr);
    Z = Math.max(2, Math.min(6, Math.round(Math.min(innerHeight / 150, innerWidth / 230))));
    if (MAPA === 'cidade')
        Z = Math.max(2, Z - 1);
    vw = innerWidth / Z;
    vh = innerHeight / Z;
    document.getElementById('girar').classList.toggle('on', innerHeight > innerWidth && !jogarAssim);
}
function alvoCamera() {
    let x = FEFE.x - vw / 2, y = FEFE.y - 14 - vh / 2;
    if ((MAPA === 'estrelas' || MAPA === 'mem_beijo') && FEFE.pose === 'assento') {
        y = MAPA === 'mem_beijo' ? Math.max(0, 140 - vh) : 0;
        x = FEFE.x - vw / 2;
    }
    x = vw >= TW ? (TW - vw) / 2 : Math.max(0, Math.min(TW - vw, x));
    y = vh >= TH ? (TH - vh) / 2 : Math.max(0, Math.min(TH - vh, y));
    return [x, y];
}
function aTela(wx, wy) { return [(wx - Math.round(cam.x)) * Z, (wy - Math.round(cam.y)) * Z]; }
function aMundo(sx, sy) { return [sx / Z + Math.round(cam.x), sy / Z + Math.round(cam.y)]; }
function desenhar() {
    const k = Z * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = (MAPA !== 'quarto' && CENAS[MAPA] && CENAS[MAPA].bg) || '#140f1a';
    ctx.fillRect(0, 0, tela.width, tela.height);
    ctx.imageSmoothingEnabled = false;
    const shx = shake > 0 ? Math.round((Math.random() - .5) * shake * 2) : 0, shy = shake > 0 ? Math.round((Math.random() - .5) * shake * 2) : 0;
    ctx.setTransform(k, 0, 0, k, (-Math.round(cam.x) + shx) * k, (-Math.round(cam.y) + shy) * k);
    ctx.drawImage(fundo, 0, 0);
    const NQ = MAPA === 'quarto';
    if (NQ)
        desenharPotes(ctx);
    if (marcaAlvo && performance.now() < marcaAlvo.ate) {
        ctx.fillStyle = 'rgba(255,122,168,.8)';
        const { x, y } = marcaAlvo;
        ctx.fillRect(Math.round(x) - 3, Math.round(y) - 1, 2, 2);
        ctx.fillRect(Math.round(x) + 1, Math.round(y) - 1, 2, 2);
        ctx.fillRect(Math.round(x) - 1, Math.round(y) + 1, 2, 2);
    }
    if (NQ)
        desenharParede(ctx);
    const lista = OBJ.map(o => ({ b: o.base, f: () => o.draw ? o.draw(ctx, o) : ctx.drawImage(o.img, o.x, o.y) }));
    try {
        sombrasChao(lista);
    }
    catch (e) { }
    lista.push({ b: FEFE.pose === 'pc' ? 77 : FEFE.pose === 'cama' ? 98.2 : FEFE.pose === 'assento' ? FEFE.pb : FEFE.y, f: desenharFefe });
    if (ISI.aqui && !(ISI.pose === 'cama' && FEFE.pose === 'cama'))
        lista.push({ b: ISI.pose === 'assento' ? ISI.pb : ISI.pose === 'sentada' ? FEFE.y + .1 : ISI.y, f: desenharIsinha });
    if (NQ)
        gatos.forEach(g => { if (g.estado === 'escondido' || g.estado === 'oculto')
            return; lista.push({ b: g.estado === 'colo' ? FEFE.y + .5 : g.estado === 'na_cama' ? 99 + g.y / 1000 : g.estado === 'na_rede' ? 37 : g.y, f: () => desenharGato(g) }); });
    if (NQ)
        extrasDesenho(lista);
    extrasDesenho13(lista);
    desenharNPCs(lista);
    if (NQ) {
        extrasDesenho21(lista);
        extrasDesenho24(lista);
        extrasDesenho31(lista);
        extrasDesenho33(lista);
    }
    if (NQ && S.pelucias && S.pelucias.length)
        lista.push({ b: 98.1, f: () => { S.pelucias.slice(-3).forEach((n, i) => { const p = PELUCIAS.find(p => p.n === n) || PELUCIAS[0]; const x = 44 - i * 6, y = 62 + (i % 2) * 2; ctx.fillStyle = '#2a1d30'; ctx.fillRect(x, y, 6, 6); ctx.fillStyle = p.c; ctx.fillRect(x + 1, y + 1, 4, 4); ctx.fillStyle = '#2a1d30'; ctx.fillRect(x + 1, y + 2, 1, 1); ctx.fillRect(x + 4, y + 2, 1, 1); }); } });
    if (NQ && comidaNoTapete)
        lista.push({ b: 166, f: () => desenharComida(ctx, comidaNoTapete, 164, 154) });
    if (NQ && entregador)
        lista.push({ b: entregador.y, f: () => desenharEntregador(ctx) });
    if (MAPA === 'cidade')
        desenharCidadeDin(lista);
    if (NQ && novelo)
        lista.push({ b: novelo.y, f: () => { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(Math.round(novelo.x) - 3, Math.round(novelo.y), 7, 2); ctx.drawImage(spr(...ICONES.novelo, 'nov'), Math.round(novelo.x) - 4, Math.round(novelo.y) - 8); } });
    lista.sort((a, b) => a.b - b.b).forEach(i => i.f());
    if (NQ && cartasNovas() > 0 && Math.floor(performance.now() / 400) % 2 === 0)
        ctx.drawImage(spr(...PART.brilho, 'pb'), 73, 38);
    particulas.forEach(p => { ctx.globalAlpha = Math.min(1, p.vida); ctx.drawImage(spr(...PART[p.tipo], 'p' + p.tipo), Math.round(p.x), Math.round(p.y)); });
    ctx.globalAlpha = 1;
    const hr = new Date().getHours();
    let a = (hr >= 21 || hr < 5) ? .42 : (hr >= 19 || hr < 7) ? .25 : 0;
    const cz = MAPA !== 'quarto' ? CENAS[MAPA] : null;
    if (cz && cz.escuro != null)
        a = cz.escuro;
    if (a) {
        ctx.fillStyle = `rgba(22,16,60,${a})`;
        ctx.fillRect(0, 0, TW, TH);
        ctx.globalCompositeOperation = 'lighter';
        const luz = (x, y, r, cor) => { const gr = ctx.createRadialGradient(x, y, 2, x, y, r); gr.addColorStop(0, cor); gr.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2); };
        if (NQ) {
            luz(65, 38, 70, 'rgba(255,150,90,.32)');
            luz(125, 32, 40, 'rgba(150,120,255,.22)');
        }
        else if (cz && cz.luzes)
            (typeof cz.luzes === 'function' ? cz.luzes() : cz.luzes).forEach(([x, y, r, c]) => luz(x, y, r, c));
        if (NQ && tem('luminaria'))
            luz(72, 110, 60, 'rgba(255,220,140,.35)');
        if (NQ && tem('pisca'))
            for (let x = 6; x < TW; x += 11)
                luz(x, 9 + Math.round(2 * Math.sin(x / 22)), 9, ['rgba(255,120,160,.35)', 'rgba(255,220,120,.35)', 'rgba(140,200,255,.35)'][(x / 11 | 0) % 3]);
        if (NQ && tem('aquario'))
            luz(295, 116, 24, 'rgba(120,200,255,.25)');
        ctx.globalCompositeOperation = 'source-over';
    }
    if (cz && cz.posTint)
        cz.posTint(ctx);
    try {
        desenharEscuro24();
    }
    catch (e) { }
}
function desenharFefe() {
    const x = Math.round(FEFE.x), y = Math.round(FEFE.y);
    if (FEFE.bike && !FEFE.pose)
        return desenharCiclista(fefeSpr, FEFE, '#ff7aa8', paletaFefe().J);
    if (FEFE.pose === 'pc')
        return ctx.drawImage(fefeSpr.pc, 118, 48);
    if (FEFE.pose === 'cama') {
        const dupla = ISI.aqui && ISI.pose === 'cama';
        if (dupla) {
            const resp = Math.floor(performance.now() / 1600) % 2;
            ctx.drawImage(isiSpr.ladoDorme, 20, 45 + resp);
            ctx.drawImage(fefeSpr.ladoDorme, 27, 48);
            ctx.drawImage(isiSpr.ladoCabeca, 20, 45 + resp);
            ctx.fillStyle = '#1f1418';
            ctx.fillRect(30, 60, 11, 1);
            ctx.fillRect(30, 63, 12, 1);
            ctx.fillRect(41, 61, 2, 2);
            ctx.fillStyle = ISI_COR.S;
            ctx.fillRect(30, 61, 11, 2);
            ctx.fillStyle = ISI_COR.s;
            ctx.fillRect(30, 62, 11, 1);
            if (Math.random() < .006)
                particula('coracao', 34, 44);
        }
        else
            ctx.drawImage(fefeSpr.deitada, 27, 45);
        const cama = OBJ.find(o => o.nome === 'cama');
        ctx.drawImage(cama.img, 0, 26, 42, 33, 14, 64, 42, 33);
        if (Math.random() < .015)
            particula('zz', 40, 48);
        return;
    }
    if (FEFE.pose === 'assento') {
        const dy = (FEFE.danca && Math.floor(performance.now() / 220) % 2 ? 1 : 0) + (FEFE.balanco ? Math.round(Math.sin(performance.now() / 1000 * 3) * 3) : 0);
        return ctx.drawImage(fefeSpr[FEFE.poseSpr], FEFE.px, FEFE.py + dy);
    }
    if (FEFE.danca > performance.now()) {
        const f = Math.floor(performance.now() / 220);
        return ctx.drawImage(fefeSpr[f % 4 < 2 ? 'left' : 'right'][f % 2 ? 1 : 3], x - 8, y - 26 - (f % 2));
    }
    if (FEFE.pose === 'tapete') {
        ctx.fillStyle = 'rgba(0,0,0,.22)';
        ctx.fillRect(x - 7, y - 1, 14, 2);
        return vidaHumano({ anda: false }, fefeSpr.sentada, x - 8, y - 23, 'fefe');
    }
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fillRect(x - 5, y - 1, 10, 2);
    ctx.fillRect(x - 4, y, 8, 1);
    vidaHumano(FEFE, fefeSpr[FEFE.dir][FEFE.anda ? FEFE.fr : 0], x - 8, y - 26 + (FEFE.anda && FEFE.fr % 2 ? 1 : 0), 'fefe');
}
function desenharGato(g) {
    if (g.pose24 && desenharPose24(g))
        return;
    const st = S.gatos[g.id], c = GATOS[g.id];
    let h = performance.now() < g.humorAte ? g.humorTemp : humor(st);
    if (g.estado === 'comendo')
        h = 'feliz';
    const correndo = g.estado === 'andando' || g.estado === 'perseguindo' || g.estado === 'fugindo' || g.estado === 'caos' || g.estado === 'laser';
    const x = Math.round(g.x), y = Math.round(g.y - (g.alt || 0)), bob = correndo && Math.floor(g.t * (g.vel > 60 ? 10 : 6)) % 2 ? -1 : 0;
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fillRect(x - 6, y - 1, 12, 2);
    const fr = h === 'dormindo' ? 0 : Math.abs(Math.floor(g.t * (correndo ? 6 : 2))) % 2;
    const rabo = spr(RABO_G[fr], { O: c.cor.O, T: c.cor.T }, 'r' + g.id + fr);
    if (g.dir > 0)
        ctx.drawImage(rabo, x + 5, y - 8 + bob);
    else {
        ctx.save();
        ctx.translate(x - 5, y - 8 + bob);
        ctx.scale(-1, 1);
        ctx.drawImage(rabo, 0, 0);
        ctx.restore();
    }
    const hh = h === 'bravo' ? 'triste' : h;
    gatoVivo(g, hh, x - 7, y - 14 + bob, correndo);
    if (h === 'dormindo' && Math.random() < .01)
        particula('zz', x + 4, y - 14);
}
