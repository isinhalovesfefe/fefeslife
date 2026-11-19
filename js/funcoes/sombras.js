function sombrear(c) {
    const CONTORNOS = sombrear.C || (sombrear.C = { '2a1d30': 1, '0c0b0f': 1, '3b2a30': 1, '0b0810': 1, '1f1418': 1, '120d18': 1, '15121a': 1, '000000': 1, '0c0a10': 1 });
    const w = c.width, h = c.height;
    if (w < 5 || h < 5)
        return c;
    let x, im;
    try {
        x = c.getContext('2d');
        im = x.getImageData(0, 0, w, h);
    }
    catch (e) {
        return c;
    }
    const d = im.data, src = new Uint8ClampedArray(d);
    const hex = i => ((1 << 24) | (src[i] << 16) | (src[i + 1] << 8) | src[i + 2]).toString(16).slice(1);
    const borda = (xx, yy) => { if (xx < 0 || yy < 0 || xx >= w || yy >= h)
        return true; const i = (yy * w + xx) * 4; return src[i + 3] < 200 || CONTORNOS[hex(i)]; };
    for (let y = 0; y < h; y++)
        for (let xx = 0; xx < w; xx++) {
            const i = (y * w + xx) * 4;
            if (src[i + 3] < 250 || CONTORNOS[hex(i)])
                continue;
            const b1 = borda(xx, y + 1), r1 = borda(xx + 1, y), b2 = borda(xx, y + 2), b3 = borda(xx, y + 3), t1 = borda(xx, y - 1), l1 = borda(xx - 1, y);
            let r = src[i], g = src[i + 1], bl = src[i + 2];
            if (b1 || (r1 && !t1)) {
                r = r * .68;
                g = g * .64;
                bl = bl * .76 + 12;
            }
            else if (b2 && h > 7) {
                r = r * .82;
                g = g * .79;
                bl = bl * .87 + 7;
            }
            else if (b3 && h > 14) {
                r = r * .92;
                g = g * .9;
                bl = bl * .95 + 3;
            }
            else if (t1 || l1) {
                r = r + (255 - r) * .26;
                g = g + (255 - g) * .22;
                bl = bl + (255 - bl) * .12;
            }
            else
                continue;
            d[i] = r;
            d[i + 1] = g;
            d[i + 2] = bl;
        }
    x.putImageData(im, 0, 0);
    return c;
}
function sombrasChao(lista) {
    lista.push({ b: -1, f: () => {
            for (const o of OBJ) {
                const im = o.img;
                if (!im || im.height < 10 || o.semSombra || o.nome === 'guitarra' || (o.sazonal && im.height < 12))
                    continue;
                const fundoObj = o.y + im.height;
                if (Math.abs(fundoObj - o.base) > 6 || o.base < PISO_Y + 4)
                    continue;
                const x0 = o.x + 1, w = im.width, y = Math.round(o.base);
                ctx.fillStyle = 'rgba(42,18,56,.26)';
                ctx.fillRect(x0 + 2, y - 2, w - 1, 1);
                ctx.fillRect(x0 + 1, y - 1, w + 2, 2);
                ctx.fillRect(x0 + 2, y + 1, w + 1, 1);
                ctx.fillStyle = 'rgba(42,18,56,.12)';
                ctx.fillRect(x0 + 3, y + 2, w - 1, 1);
                if (o.y < PISO_Y - 2) {
                    ctx.fillStyle = 'rgba(30,12,44,.22)';
                    ctx.fillRect(o.x + w, Math.max(o.y + 4, 6), 3, Math.min(PISO_Y, y) - Math.max(o.y + 4, 6));
                    ctx.fillRect(o.x + w, Math.max(o.y + 4, 6), 3, 1);
                }
            }
        } });
}
function contornoColorido(c) {
    const w = c.width, h = c.height;
    if (w < 3 || h < 3)
        return c;
    let x, im;
    try {
        x = c.getContext('2d');
        im = x.getImageData(0, 0, w, h);
    }
    catch (e) {
        return c;
    }
    const OUT = sombrear.C || (sombrear.C = { '2a1d30': 1, '0c0b0f': 1, '3b2a30': 1, '0b0810': 1, '1f1418': 1, '120d18': 1, '15121a': 1, '000000': 1, '0c0a10': 1 }), d = im.data, s = new Uint8ClampedArray(d);
    const hx = i => ((1 << 24) | (s[i] << 16) | (s[i + 1] << 8) | s[i + 2]).toString(16).slice(1);
    let mudou = false;
    for (let y = 0; y < h; y++)
        for (let xx = 0; xx < w; xx++) {
            const i = (y * w + xx) * 4;
            if (s[i + 3] < 200 || !OUT[hx(i)])
                continue;
            let best = -1;
            for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1]]) {
                const X = xx + dx, Y = y + dy;
                if (X < 0 || Y < 0 || X >= w || Y >= h)
                    continue;
                const j = (Y * w + X) * 4;
                if (s[j + 3] > 200 && !OUT[hx(j)]) {
                    best = j;
                    break;
                }
            }
            if (best < 0)
                continue;
            d[i] = s[best] * .45;
            d[i + 1] = s[best + 1] * .42;
            d[i + 2] = s[best + 2] * .5 + 16;
            mudou = true;
        }
    if (mudou)
        x.putImageData(im, 0, 0);
    return c;
}
function texturaChao(R, TW, TH, PISO_Y) {
    let r = 7;
    const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    for (let y = PISO_Y; y < TH; y += 6) {
        const off = ((y / 6) % 3) * 16;
        for (let x0 = off - 48; x0 < TW; x0 += 48) {
            const v = rnd();
            R(x0 + 1, y, 47, 5, v < .33 ? 'rgba(120,60,30,.05)' : v < .66 ? 'rgba(255,220,170,.04)' : 'rgba(90,40,20,.025)');
            if (rnd() < .22)
                R(x0 + 6 + Math.floor(rnd() * 36), y + 2, 2, 1, 'rgba(110,60,35,.16)');
        }
    }
}
function papelDeParede(R, TW, PISO_Y) {
    for (let X = 0; X < TW; X += 8)
        R(X, 5, 3, PISO_Y - 11, 'rgba(255,255,255,.05)');
    for (let Y = 12; Y < PISO_Y - 8; Y += 10)
        for (let X = ((Y / 10) % 2) * 4 + 2; X < TW; X += 8) {
            R(X, Y, 1, 1, 'rgba(255,190,220,.28)');
            R(X - 1, Y + 1, 3, 1, 'rgba(255,190,220,.28)');
            R(X, Y + 2, 1, 1, 'rgba(255,190,220,.28)');
        }
}
