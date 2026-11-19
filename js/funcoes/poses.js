function poseGatoCanvas(id, pose) {
    const ck = id + '_' + pose;
    if (_poseCache[ck])
        return _poseCache[ck];
    const N = 32, g = [...Array(N)].map(() => Array(N).fill('.'));
    const P = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N)
        g[y][x] = k; };
    const ell = (cx, cy, rx, ry, k) => { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
        for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
            const dx = (x - cx) / (rx + .4), dy = (y - cy) / (ry + .4);
            if (dx * dx + dy * dy <= 1)
                P(x, y, k);
        } };
    const rect = (x, y, w, h, k) => { for (let j = 0; j < h; j++)
        for (let i = 0; i < w; i++)
            P(x + i, y + j, k); };
    const linha = (x0, y0, x1, y1, k, esp = 2) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 + 1; for (let i = 0; i <= n; i++) {
        const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n;
        rect(Math.round(x - esp / 2 + .01), Math.round(y - esp / 2 + .01), esp, esp, k);
    } };
    const curva = (pts, k, esp = 2) => { for (let i = 0; i < pts.length - 1; i++)
        linha(...pts[i], ...pts[i + 1], k, esp); };
    const perna = (x, y0, y1, k = 'B') => { rect(x, y0, 2, y1 - y0, k); rect(x, y1 - 1, 2, 1, 'b'); };
    const cabeca = (cx, cy, o = {}) => {
        ell(cx, cy, 5, 4, 'H');
        [[-1], [1]].forEach(([s]) => { P(cx + s * 4, cy - 6, 'H'); rect(cx + (s < 0 ? -5 : 3), cy - 5, 3, 1, 'H'); rect(cx + (s < 0 ? -5 : 2), cy - 4, 4, 1, 'H'); P(cx + s * 4, cy - 4, 'I'); });
        P(cx - 1, cy + 2, 'b');
        P(cx, cy + 2, 'b');
        P(cx + 1, cy + 2, 'b');
        P(cx, cy + 3, 'b');
        P(cx, cy + 1, 'N');
        const olho = o.olhos || 'aberto';
        [-1, 1].forEach(s => {
            const ex = s < 0 ? cx - 3 : cx + 2, ey = cy - 1;
            if (olho === 'fechado') {
                P(ex, ey + 1, 'F');
                P(ex + 1, ey + 1, 'F');
                P(s < 0 ? ex - 1 : ex + 2, ey, 'F');
            }
            else if (olho === 'feliz') {
                P(ex - (s < 0 ? 1 : 0), ey + 1, 'F');
                P(ex + (s < 0 ? 0 : 1), ey, 'F');
                P(ex + (s < 0 ? 1 : 2), ey + 1, 'F');
            }
            else if (olho === 'grande') {
                rect(ex, ey - 1, 2, 3, 'E');
                P(ex + (s < 0 ? 1 : 0), ey, 'K');
                P(ex + (s < 0 ? 1 : 0), ey + 1, 'K');
                P(ex + (s < 0 ? 0 : 1), ey - 1, 'W');
            }
            else if (olho === 'cima') {
                rect(ex, ey, 2, 2, 'E');
                P(ex + (s < 0 ? 1 : 0), ey, 'K');
            }
            else {
                rect(ex, ey, 2, 2, 'E');
                P(ex + (s < 0 ? 1 : 0), ey + 1, 'K');
                P(ex + (s < 0 ? 0 : 1), ey, 'W');
            }
        });
        if (o.blush) {
            P(cx - 4, cy + 1, 'R');
            P(cx + 4, cy + 1, 'R');
        }
    };
    const corpo = (cx, cy, rx, ry, barriga = true) => { ell(cx, cy, rx, ry, 'B'); if (barriga)
        ell(cx + 1, cy + ry * .55, rx * .7, ry * .4, 'b'); };
    let extra = null;
    if (pose === 'dormindo') {
        corpo(14, 22, 11, 6, false);
        ell(16, 25, 8, 2, 'b');
        curva([[3, 26], [6, 28], [14, 28], [21, 27]], 'T');
        cabeca(23, 21, { olhos: 'fechado' });
        rect(18, 26, 4, 2, 'b');
    }
    else if (pose === 'comendo') {
        curva([[5, 17], [3, 12], [3, 7], [5, 5]], 'T');
        corpo(13, 18, 8, 5);
        perna(7, 20, 27);
        perna(10, 21, 27);
        perna(15, 21, 27);
        perna(18, 20, 27);
        cabeca(23, 21, { olhos: 'feliz' });
    }
    else if (pose === 'sol') {
        curva([[4, 23], [1, 22]], 'T');
        corpo(14, 23, 11, 4);
        ell(14, 25, 9, 2, 'b');
        linha(20, 26, 29, 27, 'B');
        rect(28, 26, 2, 2, 'b');
        linha(6, 26, 1, 28, 'B');
        rect(1, 27, 2, 2, 'b');
        cabeca(25, 21, { olhos: 'fechado', blush: true });
    }
    else if (pose === 'barriga') {
        curva([[5, 26], [2, 27], [1, 25]], 'T');
        ell(14, 22, 10, 5, 'B');
        ell(14, 20, 8, 3, 'b');
        [[6, 17, 10], [10, 16, 9], [17, 16, 9], [21, 17, 10]].forEach(([x, y0, y1]) => { rect(x, y1, 2, y0 - y1, 'B'); rect(x, y1, 2, 2, 'b'); });
        cabeca(26, 23, { olhos: 'feliz', blush: true });
    }
    else if (pose === 'chuva') {
        curva([[16, 28], [9, 28], [6, 26], [7, 24]], 'T');
        ell(14, 21, 6, 7, 'B');
        ell(16, 22, 3, 5, 'b');
        perna(15, 23, 29);
        perna(18, 23, 29);
        cabeca(18, 10, { olhos: 'cima' });
        extra = x => { x.fillStyle = 'rgba(255,255,255,.85)'; [[24, 6], [26, 4], [25, 9]].forEach(([a, b]) => x.fillRect(a, b, 2, 1)); };
    }
    else if (pose === 'laser') {
        curva([[5, 15], [3, 10], [5, 7], [3, 4]], 'T');
        ell(8, 17, 4, 4, 'B');
        corpo(14, 21, 8, 3);
        perna(5, 19, 26);
        perna(9, 20, 26);
        rect(18, 25, 8, 2, 'B');
        rect(24, 25, 2, 2, 'b');
        rect(19, 23, 7, 2, 'B');
        rect(25, 23, 2, 2, 'b');
        cabeca(24, 20, { olhos: 'grande' });
    }
    else if (pose === 'caos') {
        curva([[7, 13], [4, 8], [3, 3]], 'T', 3);
        corpo(15, 14, 9, 4);
        linha(20, 16, 27, 22, 'B');
        linha(22, 15, 29, 19, 'B');
        linha(10, 16, 3, 22, 'B');
        linha(8, 15, 1, 19, 'B');
        rect(27, 21, 2, 2, 'b');
        rect(29, 18, 2, 2, 'b');
        rect(2, 21, 2, 2, 'b');
        rect(0, 18, 2, 2, 'b');
        cabeca(24, 10, { olhos: 'grande' });
        [[9, 9], [12, 9], [15, 9], [18, 9], [7, 11]].forEach(([a, b]) => P(a, b, 'B'));
    }
    else if (pose === 'normal' || pose === 'sorriso' || pose === 'invertido') {
        const sp = spr(gatoPixels(GATOS[id].tipo, pose === 'sorriso' ? 'feliz' : 'normal', false), GATOS[id].cor, 'g' + id + (pose === 'sorriso' ? 'feliz' : 'normal'));
        const c = document.createElement('canvas');
        c.width = N;
        c.height = N;
        const x = c.getContext('2d');
        x.imageSmoothingEnabled = false;
        if (pose === 'invertido') {
            x.save();
            x.translate(N, N - 1);
            x.scale(-1, -1);
            x.drawImage(sp, 2, 3, 28, 28);
            x.restore();
            const cr = GATOS[id].cor;
            x.fillStyle = cr.O;
            x.fillRect(9, 0, 5, 4);
            x.fillRect(18, 0, 5, 4);
            x.fillStyle = cr.b;
            x.fillRect(10, 0, 3, 3);
            x.fillRect(19, 0, 3, 3);
        }
        else
            x.drawImage(sp, 2, 3, 28, 28);
        if (pose === 'sorriso') {
            const cr = GATOS[id].cor;
            x.fillStyle = cr.O;
            x.fillRect(12, 21, 2, 2);
            x.fillRect(14, 23, 4, 2);
            x.fillRect(18, 21, 2, 2);
            x.fillStyle = 'rgba(255,120,160,.75)';
            x.fillRect(5, 18, 4, 2);
            x.fillRect(23, 18, 4, 2);
        }
        if (pose === 'normal' && id === 'clarinha') {
            const cr = GATOS[id].cor;
            x.fillStyle = cr.B;
            x.fillRect(8, 13, 4, 2);
            x.fillRect(20, 13, 4, 2);
        }
        _poseCache[ck] = c;
        return c;
    }
    const out = g.map(r => [...r]);
    for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++)
            if (g[y][x] === '.') {
                const viz = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const r = g[y + dy]; return r && r[x + dx] && !'.'.includes(r[x + dx]); });
                if (viz)
                    out[y][x] = 'O';
            }
    const tipo = GATOS[id].tipo, h = (x, y) => ((x * 73856093) ^ (y * 19349663)) >>> 0;
    for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) {
            const k = out[y][x];
            if (tipo === 'tortie') {
                if (k === 'H')
                    out[y][x] = 'M';
                else if (k === 'T')
                    out[y][x] = 'M';
                else if (k === 'B' && ((Math.sin(x * .9) + Math.cos(y * 1.1)) > 1.35))
                    out[y][x] = 'P';
            }
            else if (tipo === 'tabby') {
                if ((k === 'B' || k === 'T') && (x + Math.round(y * .4)) % 4 === 0)
                    out[y][x] = 'S';
                else if (k === 'H')
                    out[y][x] = 'B';
            }
            else {
                if (k === 'H' || k === 'T')
                    out[y][x] = 'B';
            }
        }
    const cor = Object.assign({}, GATOS[id].cor);
    const c = spr(out.map(r => r.join('')), cor, 'pose_' + ck);
    const cc = document.createElement('canvas');
    cc.width = N;
    cc.height = N;
    const x = cc.getContext('2d');
    x.imageSmoothingEnabled = false;
    x.drawImage(c, 0, 0);
    if (extra)
        extra(x);
    _poseCache[ck] = cc;
    return cc;
}
