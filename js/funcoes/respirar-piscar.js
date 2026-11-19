function canvasPiscando(img, corOlho, corPele) {
    let m = _piscaCache.get(img);
    if (!m) {
        m = {};
        _piscaCache.set(img, m);
    }
    if (m[corOlho] !== undefined)
        return m[corOlho];
    const w = img.width, h = img.height, c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    let im;
    try {
        im = x.getImageData(0, 0, w, h);
    }
    catch (e) {
        return (m[corOlho] = null);
    }
    const d = im.data, alvo = [parseInt(corOlho.slice(1, 3), 16), parseInt(corOlho.slice(3, 5), 16), parseInt(corOlho.slice(5, 7), 16)];
    const pele = [parseInt(corPele.slice(1, 3), 16), parseInt(corPele.slice(3, 5), 16), parseInt(corPele.slice(5, 7), 16)];
    const eh = (i) => d[i + 3] > 200 && d[i] === alvo[0] && d[i + 1] === alvo[1] && d[i + 2] === alvo[2];
    const ehPele = (i) => i >= 0 && i < d.length && d[i + 3] > 200 && Math.abs(d[i] - pele[0]) < 3 && Math.abs(d[i + 1] - pele[1]) < 3 && Math.abs(d[i + 2] - pele[2]) < 3;
    let mudou = false;
    for (let y = 0; y < Math.min(h - 1, 14); y++)
        for (let xx = 0; xx < w; xx++) {
            const i = (y * w + xx) * 4, j = ((y + 1) * w + xx) * 4;
            if (eh(i) && eh(j) && !(y > 0 && eh(((y - 1) * w + xx) * 4)) && ((xx > 0 && ehPele(i - 4)) || (xx < w - 1 && ehPele(i + 4)))) {
                d[i] = pele[0];
                d[i + 1] = pele[1];
                d[i + 2] = pele[2];
                mudou = true;
            }
        }
    if (!mudou)
        return (m[corOlho] = null);
    x.putImageData(im, 0, 0);
    return (m[corOlho] = c);
}
function desenharRespirando(img, x, y, corte, inspira) {
    if (!inspira || !img)
        return ctx.drawImage(img, x, y);
    const w = img.width, h = img.height;
    ctx.drawImage(img, 0, 0, w, corte + 1, x, y - 1, w, corte + 1);
    ctx.drawImage(img, 0, corte, w, h - corte, x, y + corte, w, h - corte);
}
function vidaHumano(P, img, x, y, quem, corte = 13) {
    const t = performance.now(), off = quem === 'fefe' ? 0 : 900;
    const parado = !P.anda;
    const inspira = parado && Math.floor((t + off) / 1700) % 2 === 1;
    const pisca = ((t + off * 1.7) % 4100) < 130;
    let im = img;
    if (pisca) {
        const pal = quem === 'fefe' ? FEFE_COR : ISI_COR;
        const b = canvasPiscando(img, pal.E, pal.S);
        if (b)
            im = b;
    }
    const dono = quem === 'fefe' ? FEFE : ISI;
    if (dono.mascaraAte && t < dono.mascaraAte) {
        const mm = canvasMascara(im, quem === 'fefe' ? FEFE_COR : ISI_COR);
        if (mm)
            im = mm;
    }
    desenharRespirando(im, x, y, corte, inspira);
}
function gatoVivo(g, hh, x, y, correndo) {
    const t = performance.now(), i = gatos.indexOf(g), off = i * 733;
    let h = hh;
    if (h !== 'dormindo' && !correndo && ((t + off * 2.3) % 4300) < 150)
        h = 'dormindo';
    const dorme = hh === 'dormindo';
    const per = dorme ? 2400 : 1800;
    const inspira = !correndo && Math.floor((t + off) / per) % 2 === 1;
    if (!inspira)
        return gatoPequeno(ctx, g.id, h, x, y);
    const c = _cvGatoVivo, cx = c.getContext('2d');
    cx.clearRect(0, 0, 24, 26);
    gatoPequeno(cx, g.id, h, 5, 8);
    const corte = 8 + 8;
    ctx.drawImage(c, 0, 0, 24, corte + 1, x - 5, y - 8 - 1, 24, corte + 1);
    ctx.drawImage(c, 0, corte, 24, 26 - corte, x - 5, y - 8 + corte, 24, 26 - corte);
}
