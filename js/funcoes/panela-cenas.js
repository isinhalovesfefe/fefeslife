function trocarApelido(alvo, txt) {
    if (typeof txt !== 'string' || (alvo !== FEFE && alvo !== ISI))
        return txt;
    const L = alvo === ISI ? APEL_P_FEFE : APEL_P_ISI;
    return txt.replace(RE_VOC, (m, pre, ap) => { if (Math.random() < .3)
        return m; let n = pick(L); if (pre === '' || /[.!?]\s*$/.test(pre))
        n = n[0].toUpperCase() + n.slice(1);
    else if (ap[0] === ap[0].toUpperCase() && pre === '')
        n = n[0].toUpperCase() + n.slice(1); return pre + n; });
}
function mexerPanela(P, tit, prox) {
    const W = 120, H = 90, cx = 60, cy = 50, txt = P.txt.toLowerCase();
    const cor = /molho/.test(txt) ? ['#c8402e', '#e0644a', '#8a2a1e'] : /massa|sove/.test(txt) ? ['#f0d8a0', '#fff0c8', '#c8a868'] : ['#6a3a22', '#8a5232', '#4a2416'];
    abrir(tit, `<div class="mg"><p style="margin:0 0 6px">${P.txt.replace(/Arraste.*$/, '')} Gire a colher ↻</p><div class="barra"><i id="bMexer" style="width:0"></i></div>
    <canvas id="cvPanela" width="${W}" height="${H}" style="display:block;margin:6px auto 0;height:min(calc(92vh - 175px),240px);width:auto;max-width:100%;image-rendering:pixelated;touch-action:none;cursor:grab"></canvas>
    <p id="tMexer" style="margin:4px 0 0">${P.tempo}s</p></div>`, false);
    const cv = $('cvPanela'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const alvoRad = (P.alvo / 550) * Math.PI * 2;
    let ang = 0, prevA = null, sp = [cx + 16, cy - 6], arrastando = false, comecou = false, fimT = 0, acabou = false, voltas = 0, bolhas = [], rot = 0;
    const disco = (X, Y, r, c, ry) => { ry = ry || r; x.fillStyle = c; for (let yy = -ry; yy <= ry; yy++) {
        const w = Math.floor(r * Math.sqrt(Math.max(0, 1 - (yy * yy) / (ry * ry))));
        x.fillRect(Math.round(X - w), Math.round(Y + yy), w * 2 + 1, 1);
    } };
    const terminar = (pts) => { if (acabou)
        return; acabou = true; setTimeout(() => prox(pts), pts === 3 ? 700 : 200); };
    const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
    cv.onpointerdown = e => {
        e.preventDefault();
        cv.setPointerCapture(e.pointerId);
        arrastando = true;
        cv.style.cursor = 'grabbing';
        const [px, py] = pos(e);
        prevA = Math.atan2((py - cy) * 1.4, px - cx);
        if (!comecou) {
            comecou = true;
            fimT = performance.now() + P.tempo * 1000;
        }
    };
    cv.onpointermove = e => {
        if (!arrastando || acabou)
            return;
        let [px, py] = pos(e);
        const dx = px - cx, dy = (py - cy) * 1.4, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
        const rr = Math.min(26, Math.max(4, r));
        sp = [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr / 1.4];
        if (prevA !== null && r > 3) {
            let d = a - prevA;
            if (d > Math.PI)
                d -= Math.PI * 2;
            if (d < -Math.PI)
                d += Math.PI * 2;
            ang += Math.abs(d);
            rot += d;
        }
        prevA = a;
        const v = Math.floor(ang / (Math.PI * 2));
        if (v > voltas) {
            voltas = v;
            som.pop();
        }
        const p = Math.min(1, ang / alvoRad);
        $('bMexer').style.width = (p * 100) + '%';
        if (p >= 1) {
            $('tMexer').textContent = 'Perfeito! ✨';
            som.plim();
            terminar(3);
        }
    };
    cv.onpointerup = cv.onpointercancel = () => { arrastando = false; cv.style.cursor = 'grab'; prevA = null; };
    let ult = performance.now();
    const lp = () => {
        if (!modalVivo('cvPanela'))
            return;
        requestAnimationFrame(lp);
        const ag = performance.now(), dt = Math.min(.1, (ag - ult) / 1000);
        ult = ag, t = ag / 1000;
        if (comecou && !acabou) {
            const r = Math.max(0, (fimT - ag) / 1000);
            $('tMexer').textContent = `${r.toFixed(1)}s`;
            if (r <= 0) {
                const p = ang / alvoRad;
                terminar(p >= 1 ? 3 : p >= .6 ? 2 : 1);
            }
        }
        const p = Math.min(1, ang / alvoRad);
        x.fillStyle = '#e8d6c0';
        x.fillRect(0, 0, W, H);
        for (let i = 0; i < W; i += 12) {
            x.fillStyle = (i / 12) % 2 ? '#e0ccb4' : '#eedcc8';
            x.fillRect(i, 0, 12, H);
        }
        disco(cx, cy + 4, 44, '#2a1d30', 30);
        disco(cx, cy + 3, 42, '#3a3a44', 28);
        for (let k = 0; k < 12; k++) {
            const a = k / 12 * Math.PI * 2, fx = cx + Math.cos(a) * 40, fy = cy + 4 + Math.sin(a) * 27, fl = Math.floor(t * 10 + k) % 2;
            x.fillStyle = fl ? '#5b8cff' : '#8fcaff';
            x.fillRect(Math.round(fx), Math.round(fy) - fl, 2, 2 + fl);
        }
        disco(cx, cy, 37, '#2a1d30', 26);
        disco(cx, cy, 35, '#b8bcc8', 24);
        disco(cx, cy - 1, 35, '#d8dce6', 23);
        disco(cx, cy + 1, 31, '#2a1d30', 21);
        x.fillStyle = '#2a1d30';
        x.fillRect(cx + 35, cy - 3, 20, 6);
        x.fillStyle = '#5e3d2e';
        x.fillRect(cx + 36, cy - 2, 18, 4);
        x.fillStyle = '#7a5a44';
        x.fillRect(cx + 36, cy - 2, 18, 1);
        disco(cx, cy + 1, 30, cor[0], 20);
        for (let k = 0; k < 3; k++)
            for (let s = 0; s < 1; s += .04) {
                const rr = 3 + s * 25, th = -rot * 1.2 + k * Math.PI * 2 / 3 + s * 2.6 + t * .2, X = cx + Math.cos(th) * rr, Y = cy + 1 + Math.sin(th) * rr / 1.5;
                x.fillStyle = s > .5 ? cor[2] : cor[1];
                x.fillRect(Math.round(X), Math.round(Y), 2, 1);
            }
        if (Math.random() < dt * (2 + p * 8))
            bolhas.push({ a: Math.random() * 6.28, r: Math.random() * 24, v: 1 });
        bolhas = bolhas.filter(b => (b.v -= dt * 1.4) > 0);
        bolhas.forEach(b => { const X = cx + Math.cos(b.a) * b.r, Y = cy + 1 + Math.sin(b.a) * b.r / 1.5; x.fillStyle = cor[1]; x.fillRect(Math.round(X), Math.round(Y), b.v > .5 ? 2 : 1, b.v > .5 ? 2 : 1); });
        for (let k = 0; k < 4; k++) {
            const s = (t * .6 + k * .25) % 1, X = cx - 20 + k * 13 + Math.sin(t * 2 + k) * 3, Y = cy - 24 - s * 22;
            x.fillStyle = `rgba(255,255,255,${.55 * (1 - s)})`;
            x.fillRect(Math.round(X), Math.round(Y), 2, 3);
        }
        let [sx, sy] = sp;
        if (!arrastando && !comecou) {
            const a = t * 2;
            sx = cx + Math.cos(a) * 16;
            sy = cy + 1 + Math.sin(a) * 16 / 1.5;
        }
        const va = Math.atan2(sy - cy, sx - cx), hx = Math.cos(va), hy = Math.sin(va) * .8 - .6, hl = Math.hypot(hx, hy);
        for (let s = 0; s < 34; s++) {
            const X = sx + hx / hl * (4 + s), Y = sy + hy / hl * (4 + s);
            x.fillStyle = '#2a1d30';
            x.fillRect(Math.round(X) - 1, Math.round(Y) - 1, 4, 4);
        }
        for (let s = 0; s < 34; s++) {
            const X = sx + hx / hl * (4 + s), Y = sy + hy / hl * (4 + s);
            x.fillStyle = s % 9 === 0 ? '#b8803a' : '#d9a060';
            x.fillRect(Math.round(X), Math.round(Y), 2, 2);
        }
        disco(sx, sy, 6, '#2a1d30', 5);
        disco(sx, sy, 5, '#d9a060', 4);
        disco(sx - 1, sy - 1, 2, '#ecc088', 1);
        if (!comecou) {
            const a = t * 3;
            for (let k = 0; k < 6; k++) {
                const aa = a + k * .35, X = cx + Math.cos(aa) * 34, Y = cy - 30 + Math.sin(aa) * 6;
                x.fillStyle = k === 5 ? '#ff5c8d' : 'rgba(255,92,141,.5)';
                x.fillRect(Math.round(X), Math.round(Y), 2, 2);
            }
        }
        if (p >= 1) {
            for (let k = 0; k < 6; k++) {
                const X = cx + Math.cos(t * 4 + k) * 30, Y = cy + Math.sin(t * 4 + k) * 18;
                x.fillStyle = '#ffd36e';
                x.fillRect(Math.round(X), Math.round(Y), 2, 2);
            }
        }
    };
    requestAnimationFrame(lp);
}
function cenaFalas(seq) {
    let t = 0;
    const total = seq.reduce((s, [, tx]) => s + 1300 + tx.length * 45, 0);
    conversaAte = performance.now() + total + 800;
    seq.forEach(([q, tx]) => { const quem = q === 'F' ? FEFE : q === 'I' ? ISI : G(q); const ms = 1300 + tx.length * 45; setTimeout(() => { if (MAPA === 'quarto' && quem && (quem !== ISI || ISI.aqui)) {
        falar(quem, tx, ms + 600);
        if (quem.id)
            som.miau(quem.id, 1);
    } }, t); t += ms; });
}
