function abrirLinhaDoTempo() {
    abrir('Nossa linha do tempo ♥', `<p style="margin:0 0 8px;font-size:14px">Toque em um momento pra reviver.</p><div class="linhaTempo">${MEMORIAS.map((m, i) => `<div class="memCard"><span class="data">${m.data}</span><span class="th" data-i="${i}"></span><b style="flex:1">${esc(m.titulo)}</b><button data-rev="${m.id}">Reviver ▶</button></div>`).join('')}</div>`, false, true);
    document.querySelectorAll('.th').forEach(el => { const m = MEMORIAS[+el.dataset.i]; if (!CENAS[m.id]) {
        const salva = MAPA;
        CONSTROI[m.id]();
    } const f = CENAS[m.id].fundo; const c = document.createElement('canvas'); c.width = 120; c.height = 80; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(f, 0, 0, f.width, f.height, 0, 0, 120, 80); el.appendChild(c); });
    document.querySelectorAll('[data-rev]').forEach(b => b.onclick = () => { fechar(); trocarCena(b.dataset.rev); });
}
function roteiro(falas, depois, mapa) {
    let i = 0;
    const passo = () => {
        if (MAPA !== mapa)
            return;
        if (i >= falas.length) {
            if (depois)
                setTimeout(depois, 1200);
            return;
        }
        const [q, txt] = falas[i++];
        falar(q === 'isi' ? ISI : FEFE, txt, 2600);
        setTimeout(passo, 2500);
    };
    setTimeout(passo, 900);
}
function memoria(id) { return MEMORIAS.find(m => m.id === id); }
function fimMemoria(id) {
    const m = memoria(id);
    abrir(`${m.data} ♥`, `<div class="mg"><p style="font-size:20px;margin:6px 0"><b>${esc(m.titulo)}</b></p><p>${esc(m.legenda)}</p><div style="display:flex;gap:10px;margin-top:12px"><button class="btn branco" id="memDeNovo">Reviver de novo</button><button class="btn" id="memVoltar">Voltar pro presente</button></div></div>`, false);
    $('memDeNovo').onclick = () => { fechar(); levantar(); CENAS[id].aoEntrar && CENAS[id].aoEntrar(); const e = CENAS[id].entrada; FEFE.x = e[0]; FEFE.y = e[1]; };
    $('memVoltar').onclick = () => { fechar(); trocarCena('quarto'); };
    if (!S.feitos['mem_' + id]) {
        S.feitos['mem_' + id] = true;
        ganhar(2);
        salvar();
    }
}
function construirMemDate() {
    const W = 300, H = 250, objs = [], cols = [], pts = [];
    const persa = (R, x, y, w, h) => {
        R(x, y, w, h, '#efe2c8');
        R(x + 1, y + 1, w - 2, h - 2, '#d8c49a');
        for (let i = x + 2; i < x + w - 2; i += 3) {
            R(i, y + 2, 1, 1, '#3a4a9a');
            R(i, y + h - 3, 1, 1, '#3a4a9a');
        }
        for (let j = y + 3; j < y + h - 3; j += 3) {
            R(x + 2, j, 1, 1, '#a8243a');
            R(x + w - 3, j, 1, 1, '#a8243a');
        }
        R(x + 4, y + 4, w - 8, h - 8, '#5a0a18');
        R(x + 5, y + 5, w - 10, h - 10, '#4a0812');
        for (let k = 0; k < Math.floor(w * h / 40); k++) {
            const px = x + 6 + (k * 23) % Math.max(1, w - 12), py = y + 6 + (k * 13) % Math.max(1, h - 12);
            R(px, py, 2, 1, k % 3 ? '#8a1a2a' : '#c9a878');
        }
        const mx = Math.floor(x + w / 2), my = Math.floor(y + h / 2), r = Math.min(w, h) / 2 - 6;
        for (let k = 0; k < r; k++) {
            R(mx - k, my - r + k, k * 2 + 1, 1, '#efe2c8');
            R(mx - k, my + r - k, k * 2 + 1, 1, '#efe2c8');
        }
        R(mx - 1, my - 1, 3, 3, '#3a4a9a');
    };
    const fundo = pinta(W, H, (R, C) => {
        R(0, 0, W, H, '#3e1414');
        for (let y = 58; y < H; y += 12)
            for (let x = ((y / 12) % 2) * 12; x < W; x += 24)
                R(x, y, 24, 12, '#461818');
        for (let y = 58; y < H; y += 12)
            R(0, y, W, 1, '#2e0e0e');
        R(0, 0, W, 58, '#cc1430');
        R(0, 0, W, 4, '#8a0a1c');
        R(14, 0, 140, 4, '#7a1424');
        for (let x = 15; x < 153; x += 4)
            R(x, 4, 3, 2, '#e8c87a');
        R(36, 10, 40, 48, '#2a1d30');
        R(37, 11, 38, 47, '#2c2a5a');
        R(37, 11, 38, 8, '#3a3a6e');
        for (let i = 0; i < 3; i++) {
            R(41 + i * 12, 40, 6, 2, '#8a4a2a');
            R(43 + i * 12, 42, 2, 14, '#4a2a1a');
        }
        R(55, 22, 2, 6, '#ffd36e');
        R(98, 10, 28, 48, '#a80e26');
        R(99, 11, 26, 47, '#c01228');
        R(121, 34, 2, 3, '#e8c87a');
        R(106, 15, 12, 32, '#e8c040');
        R(107, 14, 10, 1, '#e8c040');
        R(107, 47, 10, 1, '#e8c040');
        R(108, 16, 8, 30, '#5a2a3a');
        R(109, 17, 3, 10, '#9a6a7a');
        R(162, 16, 22, 26, '#2a1d30');
        R(163, 17, 20, 24, '#f4f0e8');
        R(165, 19, 16, 3, '#3a3040');
        for (let y = 24; y < 39; y += 3) {
            R(165, y, 10, 1, '#8a8090');
            R(177, y, 4, 1, '#a8243a');
        }
        R(0, 56, W, 2, '#ffcf5a');
        R(0, 58, 18, H - 66, '#a80e26');
        R(17, 58, 1, H - 66, '#7a0a1c');
        persa(R, 2, 76, 15, 140);
        R(18, 76, 2, 140, 'rgba(255,207,90,.55)');
        R(246, 58, 48, 124, '#2a1d30');
        for (let i = 0; i < 12; i++) {
            const y = 59 + i * 10;
            R(247, y, 46, 9, i % 2 ? '#b00c24' : '#c4102a');
            R(247, y + 8, 46, 1, '#7a0a1c');
            R(247, y, 46, 1, '#e0304a');
        }
        R(244, 58, 2, 124, '#e83a52');
        for (let y = 62; y < 180; y += 8)
            R(244, y, 2, 2, '#7a0a1c');
        R(294, 58, 2, 124, '#7a0a1c');
        R(0, H - 8, W, 8, '#8a0a1c');
        R(0, H - 8, W, 1, '#ffcf5a');
        R(22, H - 8, 72, 8, '#2a1d30');
        R(23, H - 7, 70, 7, '#3e1414');
        R(186, H - 8, 22, 8, '#a80e26');
        R(195, H - 7, 6, 6, '#e8c040');
        R(212, H - 7, 14, 6, '#2a1d30');
        R(213, H - 6, 12, 4, '#f4f0e8');
        R(215, H - 5, 4, 2, '#7a0a1c');
        R(256, H - 8, 20, 8, '#e8c040');
        R(258, H - 7, 16, 7, '#9ab8e8');
    });
    objs.push({ nome: 'planta', x: 20, y: 52, img: pinta(14, 22, (R) => { R(2, 12, 10, 10, '#2a1d30'); R(3, 13, 8, 8, '#e8c020'); R(3, 13, 8, 2, '#ffe060'); [[-5, -10], [-1, -12], [3, -10], [5, -6], [-6, -5]].forEach(([dx, dy]) => { for (let k = 0; k < 7; k++)
            R(7 + Math.round(dx * k / 7), 13 + Math.round(dy * k / 7), 2, 1, k % 2 ? '#4f9a3a' : '#2f7a2a'); }); }), base: 74 });
    cols.push({ x: 22, y: 66, w: 10, h: 8 });
    objs.push({ nome: 'sofa9', x: 47, y: 113, img: pinta(166, 38, (R) => {
            R(0, 0, 166, 38, '#3a0a10');
            R(1, 1, 164, 36, '#c41228');
            R(1, 1, 164, 2, '#de2a40');
            R(83, 2, 1, 26, '#8a0a1c');
            for (let x = 2; x < 160; x += 41) {
                R(x, 27, 39, 10, '#3a0a10');
                R(x + 1, 28, 37, 8, '#d4182e');
                R(x + 2, 28, 35, 2, '#e8384c');
            }
        }), base: 150 });
    objs.push({ nome: 'sofa10', x: 47, y: 149, img: pinta(166, 38, (R) => {
            R(0, 0, 166, 38, '#3a0a10');
            R(1, 1, 164, 36, '#b30d24');
            for (let x = 2; x < 160; x += 41) {
                R(x, 1, 39, 11, '#3a0a10');
                R(x + 1, 2, 37, 9, '#d4182e');
                R(x + 2, 2, 35, 3, '#e8384c');
            }
            R(1, 12, 164, 23, '#c41228');
            R(1, 12, 164, 2, '#de2a40');
            R(83, 13, 1, 22, '#8a0a1c');
            R(1, 35, 164, 2, '#8a0a1c');
        }), base: 186 });
    cols.push({ x: 47, y: 113, w: 166, h: 66 });
    const mesaImg = (w) => pinta(w, 22, (R) => {
        const rx = w / 2, ry = Math.max(4, w / 4.5), cy = 6;
        const elip = (k, cor) => { for (let y = -Math.ceil(ry); y <= Math.ceil(ry); y++) {
            const dx = Math.floor((rx - k) * Math.sqrt(Math.max(0, 1 - (y * y) / ((ry - k * .5) * (ry - k * .5)))));
            if (dx > 0)
                R(Math.round(rx - dx), cy + y, dx * 2, 1, cor);
        } };
        R(rx - 1, cy + 4, 3, 14, '#2a1d30');
        R(rx, cy + 4, 1, 13, '#e8b830');
        R(rx - 5, 19, 11, 3, '#2a1d30');
        R(rx - 4, 19, 9, 2, '#e8b830');
        elip(0, '#2a1d30');
        elip(1, '#e8b830');
        elip(2.5, '#5a0a18');
        R(rx - 4, cy - 2, 3, 1, '#efe2c8');
        R(rx + 2, cy + 1, 2, 1, '#3a4a9a');
        R(rx - 1, cy, 2, 1, '#efe2c8');
    });
    const mesaPeq = mesaImg(20), mesaGde = mesaImg(28);
    objs.push({ nome: 'mesa11a', x: 46, y: 90, img: mesaPeq, base: 110 });
    cols.push({ x: 48, y: 92, w: 16, h: 12 });
    objs.push({ nome: 'mesa11b', x: 117, y: 90, img: mesaGde, base: 110 });
    cols.push({ x: 119, y: 92, w: 24, h: 12 });
    objs.push({ nome: 'mesa11d', x: 117, y: 190, img: mesaGde, base: 210 });
    cols.push({ x: 119, y: 192, w: 24, h: 12 });
    objs.push({ nome: 'mesaDate', x: 46, y: 190, img: mesaPeq, base: 210,
        draw: (c, o) => {
            c.drawImage(o.img, o.x, o.y);
            c.fillStyle = '#d8c8a0';
            c.fillRect(o.x + 13, o.y + 1, 4, 5);
            c.fillStyle = '#fff';
            c.fillRect(o.x + 14, o.y - 1, 2, 2);
            if (FEFE.pose === 'assento') {
                [[o.x + 3, o.y + 1], [o.x + 8, o.y + 3]].forEach(([x, y]) => { c.fillStyle = '#2a1d30'; c.fillRect(x, y, 4, 5); c.fillStyle = '#7a0a1c'; c.fillRect(x + 1, y + 2, 2, 2); c.fillStyle = '#e6f5ff'; c.fillRect(x + 1, y, 2, 2); c.fillStyle = '#2a1d30'; c.fillRect(x + 1, y + 5, 2, 3); });
            }
        } });
    cols.push({ x: 48, y: 192, w: 16, h: 12 });
    objs.push({ nome: 'banquinho', x: 22, y: 222, img: pinta(14, 12, (R) => { R(0, 0, 14, 6, '#2a1d30'); R(1, 1, 12, 4, '#e8b830'); R(2, 6, 2, 6, '#2a1d30'); R(10, 6, 2, 6, '#2a1d30'); }), base: 234 });
    cols.push({ x: 23, y: 226, w: 12, h: 6 });
    objs.push({ nome: 'lustre', x: 92, y: 76, img: pinta(26, 16, (R, C) => { R(12, 0, 2, 5, '#141014'); C(13, 8, 5, '#141014'); C(13, 8, 3, '#2a2430'); for (let a = 0; a < 7; a++) {
            const an = Math.PI * (a / 6);
            const x = 13 + Math.round(Math.cos(an) * 10), y = 9 + Math.round(Math.sin(an) * 4);
            R(x - 1, y, 2, 3, '#141014');
            R(x - 1, y - 2, 2, 2, '#fff6d8');
        } }), base: 9000 });
    cols.push({ x: 0, y: 58, w: 19, h: H - 66 });
    cols.push({ x: 244, y: 58, w: 52, h: 124 });
    pts.push({ obj: 'mesaDate', nome: 'Sentar e brindar', x: 86, y: 200, acao: () => {
            sentarJuntas({ f: ['sentada', 48, 151, 186.1, 84, 202], i: ['sentada', 64, 151, 186.2, 100, 202] });
            roteiro(memoria('mem_date').falas, () => { if (AC) {
                tom(AC.currentTime, 1760, .4, .07, 'triangle');
                tom(AC.currentTime + .05, 2350, .5, .05, 'triangle');
            } falar(FEFE, 'Tim-tim! ♥', 1800); particula('coracao', 64, 150, 6); setTimeout(() => fimMemoria('mem_date'), 2400); }, 'mem_date');
        } });
    CENAS.mem_date = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 22, x1: W - 8, y0: 62, y1: H - 12 }, entrada: [58, H - 16], chegada: ['Lembra desse dia?', 'Nosso primeiro date...'], escuro: .16, bg: '#3e1414', posTint: memPosTint,
        luzes: () => { const t = performance.now() / 1000; return [[105, 88, 70, 'rgba(255,190,140,.32)'], [105, 88, 12 + Math.sin(t * 3), 'rgba(255,240,200,.5)'], [20, 145, 46, 'rgba(255,190,90,.22)'], [130, 58, 50, 'rgba(255,190,90,.18)'], [112, 30, 14, 'rgba(255,210,120,.2)']]; },
        aoEntrar: () => { ISI.x = 78; ISI.y = H - 20; } };
}
function construirMemBeijo() {
    const W = 320, H = 240, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R, C) => {
        for (let y = 0; y < 78; y++)
            R(0, y, W, 1, y < 22 ? '#8fcaff' : y < 44 ? '#a8d8ff' : y < 60 ? '#5aa8e0' : '#4a96d0');
        C(250, 14, 8, '#fff2a0');
        C(250, 14, 6, '#ffe27a');
        for (let y = 46; y < 76; y += 3)
            R(246 + ((y * 7) % 5), y, 8 - (y % 4), 1, 'rgba(255,244,194,.55)');
        [[40, 16], [120, 10], [190, 22]].forEach(([x, y]) => { R(x, y, 22, 5, '#fff'); R(x + 4, y - 3, 12, 4, '#fff'); });
        R(0, 78, W, 22, '#e8d6a8');
        for (let i = 0; i < 40; i++)
            R((i * 37) % W, 80 + (i * 13) % 18, 1, 1, '#d9c39a');
        for (let x = 0; x < W; x++) {
            R(x, 100, 1, 10, '#f4f1ec');
            if (Math.floor((x + Math.round(4 * Math.sin(x / 6))) / 6) % 2)
                R(x, 102, 1, 6, '#2a1d30');
        }
        R(0, 110, W, H - 110, '#3f7a48');
        for (let i = 0; i < 300; i++)
            R((i * 53) % W, 112 + (i * 29) % (H - 112), 1, 2, i % 2 ? '#4f9a5a' : '#35683d');
        [[30, 150], [90, 190], [230, 190], [290, 150]].forEach(([x, y], i) => { C(x, y, 14, '#2f5a36'); for (let k = 0; k < 12; k++)
            R(x - 10 + (k * 7) % 20, y - 8 + (k * 5) % 16, 2, 2, ['#ff7aa8', '#ffd36e', '#fff', '#c08cff'][(k + i) % 4]); });
        R(150, 110, 20, H - 110, '#d9c9a8');
    });
    objs.push({ nome: 'mar', x: 0, y: 0, img: pinta(W, 78, () => { }), base: -1, draw: (c) => {
            const t = performance.now() / 1000;
            for (let i = 0; i < 3; i++) {
                const y = 70 - i * 14 + Math.round(Math.sin(t + i) * 2);
                c.fillStyle = 'rgba(255,255,255,' + (.35 - i * .1) + ')';
                for (let x = (i * 13) % 24; x < W; x += 24)
                    c.fillRect(x + Math.round(Math.sin(t * 1.5 + x / 20) * 3), y, 12, 1);
            }
            c.fillStyle = 'rgba(255,255,255,.7)';
            c.fillRect(0, 77 + Math.round(Math.sin(t * 1.2) * 1), W, 1);
        } });
    const palmeira = pinta(30, 52, (R, C) => { for (let y = 16; y < 50; y++)
        R(13 + Math.round(Math.sin(y / 9) * 2), y, 4, 1, '#8a6a4a'); [[-12, 4], [12, 4], [-10, -4], [10, -5], [0, -8]].forEach(([dx, dy]) => { for (let k = 0; k < 10; k++)
        R(15 + Math.round(dx * k / 10), 14 + Math.round(dy * k / 10) + Math.round(k * k / 14), 3, 2, '#2f7a3a'); }); });
    [[40, 128], [110, 128], [210, 128], [280, 128]].forEach(([x, y], i) => { objs.push({ nome: 'palm' + i, x: x - 15, y: y - 50, img: palmeira, base: y }); cols.push({ x: x - 2, y: y - 4, w: 4, h: 4 }); });
    const poste = pinta(8, 34, (R) => { R(3, 6, 2, 26, '#2a1d30'); R(1, 32, 6, 2, '#2a1d30'); R(0, 0, 8, 7, '#2a1d30'); R(1, 1, 6, 5, '#ffe79a'); });
    [[76, 150], [244, 150]].forEach(([x, y], i) => { objs.push({ nome: 'posteB' + i, x, y: y - 34, img: poste, base: y }); });
    objs.push({ nome: 'bancoB', x: 140, y: 120, img: pinta(40, 16, (R) => { R(0, 0, 40, 8, '#2a1d30'); R(1, 1, 38, 6, '#a8714a'); R(0, 8, 40, 6, '#2a1d30'); R(1, 9, 38, 4, '#8f5e3c'); R(3, 14, 3, 2, '#2a1d30'); R(34, 14, 3, 2, '#2a1d30'); }), base: 132 });
    cols.push({ x: 140, y: 120, w: 40, h: 12 });
    pts.push({ obj: 'bancoB', nome: 'Sentar no banco', x: 160, y: 142, acao: () => {
            sentarJuntas({ f: ['pc', 144, 108, 127, 160, 144], i: ['sentadaCostas', 157, 108, 127.1, 172, 144] });
            roteiro(memoria('mem_beijo').falas, () => {
                abrir('Esse momento ♥', `<div class="mg"><p>O mar, o sol, e você do lado.</p><button class="grande" id="btnBeijo">Beijar ♥</button></div>`, false);
                $('btnBeijo').onclick = () => {
                    fechar();
                    FEFE.poseSpr = 'bikeR';
                    FEFE.px = 148;
                    FEFE.py = 106;
                    ISI.poseSpr = 'bikeL';
                    ISI.px = 157;
                    ISI.py = 106;
                    if (AC) {
                        [523, 659, 784, 1047].forEach((f, i) => tom(AC.currentTime + i * .18, f, .9, .05, 'triangle'));
                    }
                    for (let i = 0; i < 4; i++)
                        setTimeout(() => particula('coracao', 160, 96, 4), i * 350);
                    setTimeout(() => fimMemoria('mem_beijo'), 3200);
                };
            }, 'mem_beijo');
        } });
    CENAS.mem_beijo = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 118, y1: H - 6 }, entrada: [160, 224], chegada: ['Lembra desse dia?', 'O jardim da praia...'], escuro: 0, bg: '#8fcaff', posTint: memPosTint };
}
function construirMemPedido() {
    const W = 200, H = 150, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R, C) => {
        R(0, 0, W, 40, '#dfe9f2');
        R(0, 8, W, 8, '#c9d9ea');
        C(46, 10, 9, '#f4f8fb');
        C(60, 8, 7, '#f4f8fb');
        for (let x = 0; x < W; x += 6) {
            const h = 12 + ((x * 7) % 9);
            R(x, 40 - h, 6, h, '#5fae6a');
        }
        for (let i = 0; i < 30; i++)
            C((i * 29) % W, 26 + (i * 7) % 10, 4, i % 2 ? '#4f9a5a' : '#86d08f');
        for (let y = 0; y < 44; y += 6)
            for (let x = 0; x < W; x += 6) {
                R(x + ((y / 6) % 2) * 3, y, 1, 1, '#4a4a52');
            }
        for (let x = 0; x < W; x += 6) {
            R(x, 0, 1, 44, 'rgba(74,74,82,.5)');
        }
        R(0, 44, W, 18, '#a8a49c');
        for (let x = 0; x < W; x += 4)
            R(x, 44 + ((x * 3) % 4), 2, 1, '#9a968e');
        R(0, 44, W, 2, '#bfbab0');
        for (let y = 62; y < H; y += 20)
            for (let x = 0; x < W; x += 26) {
                R(x, y, 26, 20, '#cfc8bc');
                R(x, y, 26, 1, '#b8b0a4');
                R(x, y, 1, 20, '#b8b0a4');
                R(x + 3, y + 4, 8, 1, '#ddd6cb');
            }
        R(178, 0, 22, H, '#8a867e');
        R(178, 0, 3, H, '#a8a49c');
        for (let y = 4; y < H; y += 8)
            for (let x = 182; x < 200; x += 8)
                R(x + ((y / 8) % 2) * 4, y, 5, 2, '#7a766e');
        R(24, 46, 10, 16, '#2a1d30');
        R(25, 47, 8, 14, '#4a3a30');
        R(44, 48, 4, 14, '#c9a87a');
        for (let i = 0; i < 5; i++)
            R(41 + i * 2, 58, 1, 4, '#c9a87a');
        R(8, 120, 14, 18, '#2a1d30');
        R(9, 121, 12, 16, '#b07a4a');
        C(15, 114, 8, '#2f7a3a');
        C(11, 110, 5, '#4f9a5a');
        C(19, 111, 5, '#4f9a5a');
    });
    objs.push({ nome: 'sofaP', x: 136, y: 48, img: pinta(42, 100, (R) => {
            R(0, 0, 42, 100, '#1a1012');
            R(28, 1, 13, 98, '#4a2420');
            R(29, 2, 3, 96, '#6a3630');
            R(1, 1, 40, 12, '#4a2420');
            R(1, 1, 40, 3, '#6a3630');
            R(1, 87, 40, 12, '#4a2420');
            R(1, 87, 40, 3, '#6a3630');
            R(1, 13, 27, 74, '#5a2c26');
            R(1, 13, 3, 74, '#3a1c18');
            R(4, 13, 24, 2, '#6a3630');
            R(4, 49, 24, 1, '#3a1c18');
            R(10, 24, 8, 2, '#7a463e');
            R(12, 62, 8, 2, '#7a463e');
        }), base: 148 });
    cols.push({ x: 136, y: 48, w: 42, h: 96 });
    pts.push({ obj: 'sofaP', nome: 'Sentar com a Isinha', x: 122, y: 118, acao: () => {
            sentarJuntas({ f: ['sentadaLadoE', 143, 88, 148.2, 120, 122] });
            roteiro(memoria('mem_pedido').falas, () => {
                abrir(`${NOME_MINHA} ♥`, `<div class="mg"><p style="font-size:24px;margin:8px 0"><b>${NOME_DELA}, quer namorar comigo?</b></p><div style="display:flex;flex-direction:column;gap:12px;align-items:center"><button class="grande" id="sim1">SIM!!!</button><button class="grande" id="sim2" style="background:#c08cff">MIL VEZES SIM ♥</button></div></div>`, false);
                const sim = () => {
                    fechar();
                    levantar();
                    ISI.pose = null;
                    ISI.estado = 'abraco';
                    ISI.x = FEFE.x - 12;
                    ISI.y = FEFE.y;
                    ISI.dir = 'right';
                    FEFE.dir = 'left';
                    falar(ISI, 'AAAAAA ela disse sim!!!', 2600);
                    setTimeout(() => falar(FEFE, 'Óbvio que sim, boba ♥', 2600), 1400);
                    if (AC) {
                        [523, 659, 784, 1047, 1319].forEach((f, i) => tom(AC.currentTime + i * .14, f, .8, .06, 'triangle'));
                    }
                    for (let i = 0; i < 10; i++)
                        setTimeout(() => { particula(pick(['confete1', 'confete2', 'confete3', 'coracao']), FEFE.x + Math.random() * 40 - 20, FEFE.y - 40, 3); }, i * 200);
                    setTimeout(() => { ISI.estado = 'seguindo'; fimMemoria('mem_pedido'); }, 4200);
                };
                $('sim1').onclick = sim;
                $('sim2').onclick = sim;
            }, 'mem_pedido');
        } });
    CENAS.mem_pedido = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 66, y1: H - 6 }, entrada: [90, 138], chegada: ['Lembra dessa noite?', 'A varanda...'], bg: '#2a2440', escuro: .42, luzes: () => { const t = performance.now() / 1000; return [[150, 60, 60, 'rgba(255,200,140,.42)'], [60, 40, 40, 'rgba(255,220,160,.25)'], [150, 60, 10 + Math.sin(t * 3), 'rgba(255,240,200,.35)']]; }, posTint: memPosTint,
        aoEntrar: () => { setTimeout(() => { if (MAPA !== 'mem_pedido')
            return; ISI.pose = 'assento'; ISI.poseSpr = 'sentadaLadoE'; ISI.px = 143; ISI.py = 58; ISI.pb = 148.1; ISI.saida = [120, 84]; }, 50); } };
}
function construirMemNamorados() {
    const W = 280, H = 200, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R, C) => {
        for (let y = 60; y < H; y += 6)
            for (let x = 0; x < W; x += 12)
                R(x + ((y / 6) % 2) * 6, y, 12, 6, ((x + y) / 6) % 2 ? '#5a3a2a' : '#4e3224');
        R(0, 0, W, 60, '#8a8d96');
        R(0, 40, W, 20, '#7a7d86');
        for (let x = 0; x < W; x += 20)
            R(x, 40, 1, 20, '#6a6d76');
        R(0, 38, W, 2, '#c9ccd4');
        for (let x = 0; x < W; x++) {
            const y = 10 + Math.round(6 * Math.sin(x / W * Math.PI * 4));
            R(x, y, 1, 1, '#2a1d30');
            if (x % 14 === 0) {
                R(x - 2, y + 1, 2, 2, '#ff5c8d');
                R(x + 1, y + 1, 2, 2, '#ff5c8d');
                R(x - 1, y + 3, 3, 2, '#ff5c8d');
                R(x, y + 5, 1, 1, '#ff5c8d');
            }
        }
        [[16, '#ff5c8d'], [30, '#ff9fbf'], [250, '#e0304a'], [264, '#ff9fbf']].forEach(([x, cor], i) => { C(x, 22 + (i % 2) * 6, 7, cor); R(x, 29 + (i % 2) * 6, 1, 24, '#c9ccd4'); R(x - 2, 20 + (i % 2) * 6, 2, 2, '#fff'); });
        R(100, 4, 80, 52, '#2a1d30');
        R(102, 6, 76, 46, '#1d2448');
        R(102, 6, 76, 14, '#28305a');
        for (let i = 0; i < 10; i++) {
            const bx = 104 + i * 8, h = 10 + ((i * 7) % 4) * 5;
            R(bx, 52 - h, 7, h, '#151a33');
            for (let wy = 52 - h + 2; wy < 50; wy += 4)
                R(bx + 2, wy, 2, 2, ((i + wy) % 3) ? '#ffd36e' : '#3a4270');
        }
        for (let i = 0; i < 18; i++)
            R(104 + (i * 29) % 72, 8 + (i * 7) % 10, 1, 1, '#fff');
        C(166, 14, 4, '#f4ecd0');
        C(168, 13, 4, '#28305a');
        R(139, 6, 2, 46, '#2a1d30');
        R(102, 28, 76, 2, '#2a1d30');
        R(98, 54, 84, 4, '#c9ccd4');
        R(98, 57, 84, 1, '#8a8d96');
    });
    const mesa = (toalha) => pinta(36, 28, (R, C) => { C(18, 12, 13, '#2a1d30'); C(18, 12, 12, toalha); C(16, 10, 5, '#fff'); R(8, 22, 2, 6, '#2a1d30'); R(26, 22, 2, 6, '#2a1d30'); R(17, 5, 2, 5, '#f4f1ec'); });
    [[50, 100], [230, 100], [50, 160], [230, 160]].forEach(([x, y], i) => { objs.push({ nome: 'mesaN' + i, x: x - 18, y: y - 14, img: mesa('#f4f1ec'), base: y + 14, draw: (c, o) => { c.drawImage(o.img, o.x, o.y); const f = Math.floor(performance.now() / 180 + i) % 2; c.fillStyle = '#ffd36e'; c.fillRect(o.x + 17, o.y + 3 - f, 2, 2); } }); cols.push({ x: x - 14, y: y - 8, w: 28, h: 20 }); });
    objs.push({ nome: 'mesaNossa', x: 122, y: 60, img: mesa('#e0304a'), base: 88, draw: (c, o) => {
            c.drawImage(o.img, o.x, o.y);
            const t = performance.now();
            c.fillStyle = '#ffd36e';
            c.fillRect(o.x + 11, o.y + 4 - (Math.floor(t / 150) % 2), 2, 2);
            c.fillRect(o.x + 23, o.y + 4 - (Math.floor(t / 170) % 2), 2, 2);
            c.fillStyle = '#2a1d30';
            c.fillRect(o.x + 16, o.y + 11, 4, 6);
            c.fillStyle = '#4f9a5a';
            c.fillRect(o.x + 17, o.y + 8, 2, 4);
            c.fillStyle = '#e0304a';
            c.fillRect(o.x + 16, o.y + 6, 4, 3);
            if (presentes) {
                c.fillStyle = '#2a1d30';
                c.fillRect(o.x + 4, o.y + 14, 8, 7);
                c.fillStyle = '#ff9fbf';
                c.fillRect(o.x + 5, o.y + 15, 6, 5);
                c.fillStyle = '#fff';
                c.fillRect(o.x + 7, o.y + 15, 2, 5);
                c.fillStyle = '#2a1d30';
                c.fillRect(o.x + 24, o.y + 14, 8, 7);
                c.fillStyle = '#8fcaff';
                c.fillRect(o.x + 25, o.y + 15, 6, 5);
                c.fillStyle = '#fff';
                c.fillRect(o.x + 27, o.y + 15, 2, 5);
            }
        } });
    cols.push({ x: 126, y: 66, w: 28, h: 20 });
    const cadeira = pinta(14, 14, (R) => { R(0, 0, 14, 14, '#2a1d30'); R(1, 1, 12, 12, '#c8102e'); R(2, 2, 10, 2, '#e0304a'); });
    objs.push({ nome: 'cadE', x: 104, y: 76, img: cadeira, base: 86 });
    objs.push({ nome: 'cadD', x: 162, y: 76, img: cadeira, base: 86 });
    pts.push({ obj: 'mesaNossa', nome: 'Sentar à mesa', x: 140, y: 104, acao: () => {
            presentes = false;
            sentarJuntas({ f: ['sentadaLadoD', 105, 62, 90, 110, 106], i: ['sentadaLadoE', 159, 62, 90.1, 170, 106] });
            roteiro(memoria('mem_namorados').falas, () => trocaPresentes(), 'mem_namorados');
        } });
    CENAS.mem_namorados = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 66, y1: H - 6 }, entrada: [140, 186], chegada: ['Nosso primeiro Dia dos Namorados...', 'Que lugar chique!'], escuro: .36, bg: '#4e3224', posTint: memPosTint,
        luzes: () => [[140, 118, 40, 'rgba(255,210,150,.4)'], [50, 100, 26, 'rgba(255,210,150,.3)'], [230, 100, 26, 'rgba(255,210,150,.3)'], [50, 160, 26, 'rgba(255,210,150,.3)'], [230, 160, 26, 'rgba(255,210,150,.3)']] };
}
