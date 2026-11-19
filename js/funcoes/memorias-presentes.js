function looksMemoria() {
    return {
        mapas: { mem_date: { fefe: 'jaqueta', isi: 'punk' }, mem_beijo: { fefe: 'jaqueta', isi: 'punk' }, mem_pedido: { isi: 'moletom' }, mem_namorados: { fefe: 'vestido', isi: 'regata' } },
        looks: {
            jaqueta: { cor: { T: '#5b7cae', t: '#5b7cae', A: '#5b7cae', k: '#1d1b22', m: '#1d1b22', J: '#1d1b22', j: '#111014', B: '#1d1b22' }, mod: (g, d) => { if (d === 'down')
                    for (let y = 13; y <= 18; y++) {
                        troca(g, 7, y, 'Tm', 'k');
                        troca(g, 8, y, 'Tm', 'k');
                    } } },
            vestido: { cor: { T: '#f6f1e6', t: '#f0dc8c', y: '#f0dc8c', m: '#f6f1e6', b: '#f0dc8c', J: '#f6f1e6', j: '#e6dcc6', B: '#c98d68' }, mod: (g, d) => {
                    if (d === 'down' || d === 'up') {
                        for (let y = 20; y <= 23; y++)
                            for (let x = 4; x <= 11; x++)
                                troca(g, x, y, 'OJ', 'J');
                        [[22, 3], [23, 3], [22, 12], [23, 12]].forEach(([y, x]) => troca(g, x, y, '.O', 'J'));
                        [[22, 2], [23, 2], [22, 13], [23, 13]].forEach(([y, x]) => troca(g, x, y, '.', 'O'));
                        [[5, 21], [10, 22], [7, 23], [9, 20], [6, 15], [9, 16]].forEach(([x, y]) => troca(g, x, y, 'JT', 'y'));
                    }
                } },
            punk: { cor: { T: '#f2f0ea', t: '#1d1b22', p: '#1d1b22', J: '#1d1b22', j: '#111014', w: '#f2f0ea' }, mod: (g, d) => { listras(g, d); manga(g, d); if (d === 'down') {
                    estampa(g, [[7, 14], [8, 14], [6, 15], [9, 15], [7, 16], [8, 16], [6, 17], [7, 17], [8, 17], [9, 17]]);
                } } },
            moletom: { cor: { T: '#1f1d24', A: '#1f1d24', m: '#1f1d24', p: '#c8242e', t: '#c8242e', J: '#4b4e58', j: '#3b3d45' }, mod: (g, d) => { if (d === 'down')
                    [[6, 14], [7, 14], [8, 14], [9, 14], [6, 15], [8, 15], [7, 16], [9, 16], [6, 17], [9, 17]].forEach(([x, y]) => troca(g, x, y, 'Ttm', 'p')); } },
            regata: { cor: { T: '#1d1b22', t: '#1d1b22', J: '#1d1b22', j: '#111014', w: '#f2f0ea' }, mod: (g, d) => listras(g, d) },
        }
    };
}
function troca(g, x, y, de, para) { if (g[y] && g[y][x] !== undefined && de.includes(g[y][x]))
    g[y][x] = para; }
function listras(g, d) {
    for (let y = 20; y <= 23; y++) {
        const r = g[y];
        if (!r)
            continue;
        if (d === 'down' || d === 'up') {
            for (let x = 1; x < r.length - 1; x++) {
                if (r[x] === 'J' && r[x - 1] === 'O' && x < 8)
                    r[x] = 'w';
                else if (r[x] === 'J' && r[x + 1] === 'O' && x >= 8)
                    r[x] = 'w';
            }
        }
        else {
            for (let x = 1; x < r.length; x++)
                if (r[x] === 'J' && r[x - 1] === 'O') {
                    r[x + 1] === 'J' ? r[x + 1] = 'w' : 0;
                    break;
                }
        }
    }
}
function manga(g, d) { for (let y = 13; y <= 15; y++)
    for (const x of [3, 4, 5, 10, 11, 12])
        troca(g, x, y, 'A', 'T'); if (d === 'left' || d === 'right')
    for (let y = 13; y <= 15; y++)
        for (let x = 0; x < 16; x++)
            troca(g, x, y, 'A', 'T'); }
function estampa(g, pts) { pts.forEach(([x, y]) => troca(g, x, y, 'Tt', 'p')); }
function lookAtivo(quem) { const L = looksMemoria(), m = L.mapas[MAPA]; return m && m[quem] ? L.looks[m[quem]] : null; }
function modLook(F, quem) {
    const lk = lookAtivo(quem);
    if (!lk)
        return F;
    const out = {};
    for (const d in F)
        out[d] = F[d].map(fr => { const g = fr.map(r => [...r]); lk.mod(g, d); return g.map(r => r.join('')); });
    return out;
}
var ISI_COR_BASE;
function aplicarCorIsinha() { if (!ISI_COR_BASE)
    ISI_COR_BASE = Object.assign({}, ISI_COR); for (const k in ISI_COR)
    delete ISI_COR[k]; Object.assign(ISI_COR, ISI_COR_BASE, { p: '#1d1b22', w: '#f2f0ea' }, (lookAtivo('isi') || {}).cor || {}); }
function pomPx(x, X, Y, cores) {
    const [b, c, e] = cores;
    x.fillStyle = '#2a1d30';
    x.fillRect(X + 1, Y + 2, 12, 9);
    x.fillRect(X + 2, Y + 1, 10, 11);
    x.fillRect(X + 2, Y - 1, 2, 3);
    x.fillRect(X + 10, Y - 1, 2, 3);
    x.fillStyle = b;
    x.fillRect(X + 2, Y + 2, 10, 8);
    x.fillRect(X + 3, Y + 1, 8, 10);
    x.fillRect(X + 3, Y, 1, 2);
    x.fillRect(X + 10, Y, 1, 2);
    x.fillStyle = c;
    x.fillRect(X + 4, Y + 6, 6, 5);
    x.fillRect(X + 5, Y + 5, 4, 1);
    x.fillStyle = e;
    x.fillRect(X + 4, Y + 3, 2, 2);
    x.fillRect(X + 8, Y + 3, 2, 2);
    x.fillStyle = '#141018';
    x.fillRect(X + 5, Y + 4, 1, 1);
    x.fillRect(X + 8, Y + 4, 1, 1);
    x.fillRect(X + 6, Y + 6, 2, 1);
    x.fillStyle = '#ff8a9a';
    x.fillRect(X + 6, Y + 7, 2, 1);
}
function polaroid(x, X, Y, fn) { x.fillStyle = '#2a1d30'; x.fillRect(X - 1, Y - 1, 20, 22); x.fillStyle = '#fbf8f0'; x.fillRect(X, Y, 18, 20); x.fillStyle = '#cfe4f0'; x.fillRect(X + 2, Y + 2, 14, 12); fn(X + 2, Y + 2); }
function desenhoPresente(tipo, t) {
    const c = document.createElement('canvas');
    c.width = 112;
    c.height = 64;
    const x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    x.fillStyle = '#fff0f4';
    x.fillRect(0, 0, 112, 64);
    for (let i = 0; i < 6; i++)
        coracaoPx(x, '#ffc0d6', (i * 23 + Math.floor(t * 6)) % 112, (i * 17) % 56);
    if (tipo === 'casaco') {
        const X = 34, Y = 5, b = Math.round(Math.sin(t * 2));
        x.fillStyle = '#2a1d30';
        x.fillRect(X + 7, Y + b, 30, 54);
        x.fillRect(X + 1, Y + 7 + b, 42, 22);
        x.fillRect(X - 1, Y + 12 + b, 7, 38);
        x.fillRect(X + 38, Y + 12 + b, 7, 38);
        x.fillStyle = '#1d1b22';
        x.fillRect(X + 8, Y + 3 + b, 28, 55);
        x.fillRect(X + 2, Y + 8 + b, 40, 20);
        x.fillRect(X, Y + 13 + b, 5, 36);
        x.fillRect(X + 39, Y + 13 + b, 5, 36);
        x.fillStyle = '#26232c';
        x.fillRect(X + 14, Y + b, 16, 6);
        x.fillStyle = '#e8e6ea';
        x.fillRect(X + 18, Y + 4 + b, 8, 3);
        x.fillStyle = '#4a4652';
        x.fillRect(X + 21, Y + 5 + b, 2, 52);
        x.fillStyle = '#8a8d96';
        x.fillRect(X + 21, Y + 12 + b, 2, 3);
        x.fillStyle = '#2e2a36';
        x.fillRect(X + 8, Y + 52 + b, 28, 5);
        x.fillRect(X, Y + 45 + b, 5, 4);
        x.fillRect(X + 39, Y + 45 + b, 5, 4);
        x.fillStyle = '#34303e';
        x.fillRect(X + 27, Y + 14 + b, 6, 2);
        x.fillStyle = '#2a2730';
        x.fillRect(X + 11, Y + 32 + b, 1, 9);
        x.fillRect(X + 32, Y + 32 + b, 1, 9);
        x.fillStyle = '#ff5c8d';
        x.fillRect(X + 48, Y + 2, 10, 4);
        x.fillRect(X + 52, Y + 0, 2, 8);
    }
    else {
        x.fillStyle = '#2a1d30';
        x.fillRect(4, 30, 104, 32);
        x.fillStyle = '#c98f5f';
        x.fillRect(5, 31, 102, 30);
        x.fillStyle = '#a8714a';
        x.fillRect(5, 31, 102, 3);
        x.fillStyle = '#2a1d30';
        x.fillRect(8, 6, 22, 30);
        x.fillStyle = '#3a6fd8';
        x.fillRect(9, 7, 20, 28);
        x.fillStyle = '#e8f2ff';
        x.fillRect(11, 13, 16, 16);
        x.fillStyle = '#ffd36e';
        x.fillRect(11, 8, 16, 4);
        x.fillStyle = '#2a1d30';
        x.font = 'bold 4px monospace';
        x.fillText('FUNKO', 12, 11.5);
        x.fillStyle = '#9ab8e8';
        x.fillRect(13, 15, 12, 12);
        [[34, 20, '#7a4a30'], [40, 18, '#c8102e'], [46, 21, '#5b3a8a']].forEach(([X, Y, cor]) => { x.fillStyle = '#2a1d30'; x.fillRect(X - 1, Y - 1, 7, 16); x.fillStyle = cor; x.fillRect(X, Y, 5, 14); x.fillStyle = '#f4ecd0'; x.fillRect(X, Y + 5, 5, 3); });
        polaroid(x, 56, 10, (X, Y) => { x.drawImage(fefeSpr.down[0], X - 1, Y - 2, 8, 13); x.drawImage(isiSpr.feliz || isiSpr.frente, X + 6, Y - 2, 8, 13); coracaoPx(x, '#ff5c8d', X + 4, Y); });
        polaroid(x, 78, 8, (X, Y) => pomPx(x, X, Y + 1, ['#8a8d96', '#eceae6', '#5a5d66']));
        polaroid(x, 92, 14, (X, Y) => pomPx(x, X, Y + 1, ['#e6a050', '#f6dcb0', '#e6a050']));
        x.fillStyle = '#2a1d30';
        x.font = 'bold 5px monospace';
        x.fillText('Floki', 78, 38);
        x.fillText('Kaiser', 93, 44);
    }
    return c;
}
function trocaPresentes() {
    presentes = true;
    let etapa = 0, raf;
    abrir('Presentes ♥', `<div class="mg"><canvas id="cvPres" width="112" height="64" style="display:block;margin:0 auto;height:min(calc(92vh - 220px),200px);width:auto;max-width:100%;image-rendering:pixelated"></canvas>
    <p id="presMsg" style="margin:8px 0">Hora de trocar os presentes!</p><button class="btn" id="btnPres" style="width:auto;margin:0 auto">Abrir o presente da ${esc(NOME_MINHA)} 🎁</button></div>`, false);
    const cv = $('cvPres'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const ini = performance.now();
    const lp = () => {
        if (!$('cvPres'))
            return;
        const t = (performance.now() - ini) / 1000;
        if (etapa === 0) {
            x.fillStyle = '#fff0f4';
            x.fillRect(0, 0, 112, 64);
            const b = Math.round(Math.sin(t * 8));
            x.fillStyle = '#2a1d30';
            x.fillRect(30, 14 + b, 24, 22);
            x.fillRect(62, 18 - b, 22, 18);
            x.fillStyle = '#1d1b22';
            x.fillRect(31, 15 + b, 22, 20);
            x.fillStyle = '#ff5c8d';
            x.fillRect(41, 15 + b, 2, 20);
            x.fillRect(31, 23 + b, 22, 2);
            x.fillStyle = '#c98f5f';
            x.fillRect(63, 19 - b, 20, 16);
            x.fillStyle = '#ff9fbf';
            x.fillRect(72, 19 - b, 2, 16);
            x.fillRect(63, 25 - b, 20, 2);
        }
        else
            x.drawImage(desenhoPresente(etapa === 1 ? 'casaco' : 'caixa', t), 0, 0);
        raf = requestAnimationFrame(lp);
    };
    requestAnimationFrame(lp);
    const festa = () => { som.plim(); if (AC)
        [523, 659, 784].forEach((f, i) => tom(AC.currentTime + i * .12, f, .35, .05, 'triangle')); for (let i = 0; i < 4; i++)
        setTimeout(() => particula(pick(['coracao', 'brilho', 'confete1']), 140, 70, 3), i * 200); };
    $('btnPres').onclick = () => {
        etapa++;
        festa();
        if (etapa === 1) {
            $('presMsg').innerHTML = '<b>Uma jaqueta preta de zíper!</b> 🖤';
            falar(ISI, 'Achei que ia ficar a sua cara...', 2200);
            setTimeout(() => falar(FEFE, 'Eu AMEI! Vou usar sempre ♥', 2400), 1600);
            if (!S.compras.includes('roupa_casaco')) {
                S.compras.push('roupa_casaco');
                salvar();
                setTimeout(() => toast('A jaqueta preta foi pro seu guarda-roupa! 🧥'), 2600);
            }
            $('btnPres').textContent = 'Agora a caixinha pra Isinha 📦';
        }
        else if (etapa === 2) {
            $('presMsg').innerHTML = '<b>Uma caixinha cheia de coisas:</b> um Funko do Sonic, barrinhas de chocolate, fotos de vocês e fotos do Floki e do Kaiser 🐶';
            falar(ISI, 'O FLOKI E O KAISER!! 🥺', 2200);
            setTimeout(() => falar(ISI, 'E um Funko do Sonic?! Você me conhece demais', 2600), 2000);
            setTimeout(() => falar(FEFE, 'Feliz Dia dos Namorados, amor ♥', 2400), 4400);
            $('btnPres').textContent = '♥';
        }
        else {
            fechar();
            cancelAnimationFrame(raf);
            setTimeout(() => fimMemoria('mem_namorados'), 600);
        }
    };
}
function tocarFaixa(id, vol = .55) {
    if (!audio())
        return false;
    let f = faixasAtivas[id];
    if (f && f.erro)
        return false;
    if (!f) {
        try {
            const el = new Audio(FAIXAS[id]);
            el.loop = true;
            el.preload = 'auto';
            const src = AC.createMediaElementSource(el);
            const g = AC.createGain();
            g.gain.value = 0.0001;
            src.connect(g);
            g.connect(mestre);
            f = faixasAtivas[id] = { el, g };
            el.onerror = () => { f.erro = true; };
        }
        catch (e) {
            return false;
        }
    }
    f.tocando = true;
    clearTimeout(f.tp);
    const p = f.el.play();
    if (p)
        p.catch(() => { });
    f.g.gain.cancelScheduledValues(AC.currentTime);
    f.g.gain.setTargetAtTime(vol, AC.currentTime, .6);
    return true;
}
function pararFaixa(id) { const f = faixasAtivas[id]; if (!f || !f.tocando)
    return; f.tocando = false; f.g.gain.cancelScheduledValues(AC.currentTime); f.g.gain.setTargetAtTime(0.0001, AC.currentTime, .4); clearTimeout(f.tp); f.tp = setTimeout(() => { if (!f.tocando)
    f.el.pause(); }, 2200); }
