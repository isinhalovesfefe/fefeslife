function urlEmoji(e, tam) {
    const base = e.replace(/️/g, ''), ck = base + (tam || '');
    if (_emojiURL[ck] !== undefined)
        return _emojiURL[ck];
    let c;
    const def = EMOJI_PX[base];
    if (def && !tam) {
        const g = def[0];
        c = document.createElement('canvas');
        c.width = g[0].length;
        c.height = g.length;
        const x = c.getContext('2d');
        g.forEach((r, y) => [...r].forEach((ch, i) => { if (def[1][ch]) {
            x.fillStyle = def[1][ch];
            x.fillRect(i, y, 1, 1);
        } }));
    }
    else {
        const N = tam || 16, t = document.createElement('canvas');
        t.width = N;
        t.height = N;
        const x = t.getContext('2d');
        x.textAlign = 'center';
        x.textBaseline = 'middle';
        x.font = Math.round(N * .75) + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
        x.fillText(base, N / 2, N / 2 + .5);
        const im = x.getImageData(0, 0, N, N), d = im.data, op = new Uint8Array(N * N);
        for (let i = 0; i < N * N; i++) {
            const a = d[i * 4 + 3];
            if (a > 100) {
                op[i] = 1;
                for (let k = 0; k < 3; k++)
                    d[i * 4 + k] = Math.min(255, Math.round(d[i * 4 + k] * 255 / a / 24) * 24);
                d[i * 4 + 3] = 255;
            }
            else
                d[i * 4 + 3] = 0;
        }
        const o = new ImageData(N + 2, N + 2), od = o.data;
        for (let y = 0; y < N; y++)
            for (let xx = 0; xx < N; xx++) {
                const i = y * N + xx;
                if (!op[i])
                    continue;
                const j = ((y + 1) * (N + 2) + xx + 1) * 4;
                od[j] = d[i * 4];
                od[j + 1] = d[i * 4 + 1];
                od[j + 2] = d[i * 4 + 2];
                od[j + 3] = 255;
            }
        for (let y = 0; y < N + 2; y++)
            for (let xx = 0; xx < N + 2; xx++) {
                const j = (y * (N + 2) + xx) * 4;
                if (od[j + 3])
                    continue;
                const viz = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => { const X = xx + a - 1, Y = y + b - 1; return X >= 0 && Y >= 0 && X < N && Y < N && op[Y * N + X]; });
                if (viz) {
                    od[j] = 42;
                    od[j + 1] = 29;
                    od[j + 2] = 48;
                    od[j + 3] = 255;
                }
            }
        c = document.createElement('canvas');
        c.width = N + 2;
        c.height = N + 2;
        c.getContext('2d').putImageData(o, 0, 0);
        if (!op.some(v => v))
            return (_emojiURL[ck] = null);
    }
    try {
        _emojiURL[ck] = c.toDataURL();
    }
    catch (e) {
        _emojiURL[ck] = null;
    }
    return _emojiURL[ck];
}
function pixelizarNo(no) {
    if (no.nodeType === 3) {
        const p = no.parentNode;
        if (!p || PULAR_EMJ[p.nodeName] || (p.closest && p.closest('svg,textarea')))
            return;
        const s = no.nodeValue;
        if (!s)
            return;
        EMOJI_RE.lastIndex = 0;
        if (!EMOJI_RE.test(s))
            return;
        EMOJI_RE.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let ult = 0, m;
        while ((m = EMOJI_RE.exec(s))) {
            const u = urlEmoji(m[0]);
            if (!u)
                continue;
            if (m.index > ult)
                frag.appendChild(document.createTextNode(s.slice(ult, m.index)));
            const img = document.createElement('img');
            img.className = 'pxe';
            img.src = u;
            img.alt = m[0];
            img.draggable = false;
            frag.appendChild(img);
            ult = m.index + m[0].length;
        }
        if (ult === 0)
            return;
        if (ult < s.length)
            frag.appendChild(document.createTextNode(s.slice(ult)));
        p.replaceChild(frag, no);
        return;
    }
    if (no.nodeType === 1) {
        if (PULAR_EMJ[no.nodeName])
            return;
        const w = document.createTreeWalker(no, NodeFilter.SHOW_TEXT);
        const L = [];
        while (w.nextNode())
            L.push(w.currentNode);
        L.forEach(pixelizarNo);
    }
}
