function primeiraVez(k, n) { if (!S.feitos[k]) {
    S.feitos[k] = true;
    ganhar(n);
} _vSeen(k); salvar(); }
function abracoApertado() {
    const W = 96, H = 64;
    abrir('Abraço 💕', `<div class="mg">${cvPx('cvAbraco', W, H)}<p id="abrMsg" style="margin:6px 0;min-height:20px">Segure o botão pra abraçar</p>
    <div class="segs g" style="max-width:240px;margin:0 auto 8px" id="abrBar">${segs(0, '#ff7aa8')}</div>
    <button class="grande" id="abrBtn" style="touch-action:none;user-select:none">🤗 Segure!</button></div>`, true);
    const cv = $('cvAbraco'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    let aperto = 0, segurando = false, tempo = 0, ult = performance.now(), cor = [], perfeito = false, lolaX = -20, thoX = W + 20, nivel = -1;
    const b = $('abrBtn');
    b.onpointerdown = e => { e.preventDefault(); segurando = true; audio(); };
    b.onpointerup = b.onpointerleave = b.onpointercancel = () => { segurando = false; };
    const FR = ['Segure o botão pra abraçar', '*abraça*', 'Mais apertado!', 'Não solto mais 💕', 'O abraço mais gostoso do mundo'];
    const lp = () => {
        if (!modalVivo('cvAbraco'))
            return;
        requestAnimationFrame(lp);
        const ag = performance.now(), dt = Math.min(.1, (ag - ult) / 1000);
        ult = ag;
        aperto = Math.max(0, Math.min(100, aperto + (segurando ? 28 : -18) * dt));
        if (segurando)
            tempo += dt;
        const nv = aperto < 5 ? 0 : aperto < 35 ? 1 : aperto < 70 ? 2 : aperto < 99 ? 3 : 4;
        if (nv !== nivel) {
            nivel = nv;
            $('abrMsg').textContent = FR[nv];
            $('abrBar').innerHTML = segs(aperto, '#ff7aa8');
            if (nv >= 2)
                som.pop();
        }
        else if (Math.random() < .2)
            $('abrBar').innerHTML = segs(aperto, '#ff7aa8');
        if (aperto >= 99 && tempo > 2.5 && !perfeito) {
            perfeito = true;
            som.plim();
            nec('social', 30);
            primeiraVez('abracoApertado', 2);
            falar(ISI, pick(['Meu lugar favorito', 'Fica assim pra sempre?', 'Te amo tanto']), 2400);
        }
        x.fillStyle = '#ffe3ec';
        x.fillRect(0, 0, W, H);
        x.fillStyle = '#f7cddb';
        x.fillRect(0, 46, W, 18);
        x.fillStyle = '#efb9cc';
        x.fillRect(0, 46, W, 1);
        const k = aperto / 100, fx = Math.round(24 + k * 6), ix = Math.round(40 - k * 6), apert = Math.round(k * 2);
        const fs = fefeSpr.right[0], is = isiSpr.left[0];
        x.drawImage(is, 0, 0, 16, 26, ix, 4 + apert, 32, 52 - apert * 2);
        x.drawImage(fs, 0, 0, 16, 26, fx, 4 + apert, 32, 52 - apert * 2);
        if (aperto > 8) {
            x.fillStyle = ISI_COR.S;
            x.fillRect(fx + 18, 26, Math.round(6 + k * 4), 3);
            x.fillStyle = FEFE_COR.S;
            x.fillRect(ix + 8 - Math.round(k * 4), 30, Math.round(6 + k * 4), 3);
        }
        if (Math.random() < k * .3)
            cor.push({ x: 46 + Math.random() * 10, y: 20, v: 1, s: Math.random() < .5 ? 1 : 2 });
        cor = cor.filter(c => c.v > 0);
        cor.forEach(c => { c.y -= .4; c.v -= .012; x.globalAlpha = Math.max(0, c.v); coracaoPx(x, '#ff5c8d', Math.round(c.x + Math.sin(c.y / 5) * 3), Math.round(c.y), c.s); x.globalAlpha = 1; });
        if (tempo > 3.5) {
            lolaX = Math.min(36, lolaX + 30 * dt);
            thoX = Math.max(48, thoX - 40 * dt);
        }
        if (lolaX > -14)
            gatoPequeno(x, 'lola', 'feliz', Math.round(lolaX), 48);
        if (thoX < W + 6)
            gatoPequeno(x, 'tho', 'feliz', Math.round(thoX), 48);
        if (tempo > 3.5 && tempo < 3.6)
            setTimeout(() => { if ($('abrMsg'))
                $('abrMsg').textContent = 'A Lola e o Tho vieram se enfiar no meio 🐾'; }, 0);
    };
    requestAnimationFrame(lp);
}
function guerraTravesseiro() {
    const W = 128, H = 72;
    abrir('Guerra de travesseiro 🛏️', `<div class="mg">${cvPx('cvTrav', W, H)}<p id="travMsg" style="margin:6px 0;min-height:20px">Primeira a acertar 5 ganha!</p>
    <div class="lanes" style="gap:8px"><button class="btn" id="travJogar" style="width:auto;margin:0">🛏️ Jogar</button><button class="btn branco" id="travAbaixar" style="width:auto;margin:0;touch-action:none">⬇️ Abaixar</button></div></div>`, true, true);
    const cv = $('cvTrav'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    let pts = { f: 0, i: 0 }, tr = [], cdF = 0, abaixF = false, abaixI = 0, prepI = 0, proxI = 1.6, ult = performance.now(), fim = false, tho = null, thoT = 5 + Math.random() * 5, thoVezes = 0, plumas = [];
    const msg = s => { const m = $('travMsg'); if (m)
        m.textContent = s; };
    $('travJogar').onclick = () => { if (fim || cdF > 0)
        return; cdF = .7; tr.push({ x: 38, y: 30, vx: 95, de: 'f' }); som.pop(); audio(); };
    const ab = $('travAbaixar');
    ab.onpointerdown = e => { e.preventDefault(); abaixF = true; };
    ab.onpointerup = ab.onpointerleave = ab.onpointercancel = () => { abaixF = false; };
    const fimJogo = () => {
        fim = true;
        const ganhou = pts.f > pts.i;
        msg(ganhou ? 'Você ganhou! 🏆' : `A ${NOME_MINHA} ganhou! 😝`);
        som.plim();
        nec('diversao', 25);
        primeiraVez('travesseiro', 2);
        setTimeout(() => falar(ISI, ganhou ? 'Revanche amanhã!' : 'Eu sou imbatível ♥', 2200), 400);
    };
    msg('Primeira a acertar 5 ganha! (A Clarinha tá assistindo... julgando)');
    const lp = () => {
        if (!modalVivo('cvTrav'))
            return;
        requestAnimationFrame(lp);
        const ag = performance.now(), dt = Math.min(.05, (ag - ult) / 1000);
        ult = ag;
        cdF = Math.max(0, cdF - dt);
        if (!fim) {
            proxI -= dt;
            if (prepI > 0) {
                prepI -= dt;
                if (prepI <= 0) {
                    tr.push({ x: 84, y: 30, vx: -85, de: 'i' });
                    som.pop();
                }
            }
            else if (proxI <= 0) {
                proxI = 1.3 + Math.random() * 1.4;
                prepI = .55;
            }
            if (abaixI > 0)
                abaixI -= dt;
            if (tr.some(t => t.de === 'f' && t.x > 60 && t.x < 70) && abaixI <= 0 && Math.random() < .025)
                abaixI = .6;
            thoT -= dt;
            if (!tho && thoT <= 0 && thoVezes < 2) {
                tho = { x: -14, ate: ag + 2600 };
                thoVezes++;
                som.miau('tho', 1.2);
                msg('O Tho entrou no meio da guerra!');
            }
            if (tho) {
                tho.x = Math.min(56, tho.x + 80 * dt);
                if (ag > tho.ate) {
                    tho.x += 200 * dt;
                    if (tho.x > W + 20) {
                        tho = null;
                        thoT = 6 + Math.random() * 6;
                    }
                }
            }
        }
        tr.forEach(t => {
            t.x += t.vx * dt;
            if (tho && Math.abs(t.x - (tho.x + 7)) < 8 && !t.morto) {
                t.morto = true;
                som.miau('tho', 1.4);
                msg('Acertou o Tho! MIAAAU 😹');
                for (let i = 0; i < 6; i++)
                    plumas.push({ x: t.x, y: t.y, vx: Math.random() * 40 - 20, vy: -Math.random() * 30, v: 1 });
            }
            if (t.de === 'f' && t.x > 84 && !t.morto) {
                t.morto = true;
                if (abaixI > 0) {
                    msg(`A ${NOME_MINHA} desviou!`);
                }
                else {
                    pts.f++;
                    som.plim();
                    shake = Math.max(shake, 1);
                    msg(pick(['Acertou em cheio!', 'PAF!', 'Na cara! 😂']));
                    for (let i = 0; i < 6; i++)
                        plumas.push({ x: 94, y: 24, vx: Math.random() * 40 - 20, vy: -Math.random() * 30, v: 1 });
                }
            }
            if (t.de === 'i' && t.x < 34 && !t.morto) {
                t.morto = true;
                if (abaixF) {
                    msg('Desviou! 😎');
                }
                else {
                    pts.i++;
                    if (AC)
                        tom(AC.currentTime, 180, .12, .06, 'square');
                    msg(pick(['Ai! Levou uma travesseirada', 'Na cabeça! 😵', 'Ela te pegou!']));
                    for (let i = 0; i < 6; i++)
                        plumas.push({ x: 30, y: 24, vx: Math.random() * 40 - 20, vy: -Math.random() * 30, v: 1 });
                }
            }
        });
        tr = tr.filter(t => !t.morto && t.x > -10 && t.x < W + 10);
        if (!fim && (pts.f >= 5 || pts.i >= 5))
            fimJogo();
        x.fillStyle = '#3a2a55';
        x.fillRect(0, 0, W, H);
        x.fillStyle = '#4a3a6a';
        for (let i = 0; i < W; i += 16)
            x.fillRect(i, 0, 1, 40);
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 44, W, 28);
        x.fillStyle = '#efe6f5';
        x.fillRect(0, 46, W, 8);
        x.fillStyle = '#6a4f8a';
        x.fillRect(0, 54, W, 18);
        x.fillStyle = '#ffd36e';
        for (let i = 6; i < W; i += 14)
            x.fillRect(i, 60, 2, 2);
        const yF = abaixF ? 24 : 6, yI = abaixI > 0 ? 24 : 6;
        x.save();
        x.beginPath();
        x.rect(0, 0, W, 52);
        x.clip();
        x.drawImage(fefeSpr.right[0], 0, 0, 16, 26, 14, yF, 24, 39);
        x.drawImage(isiSpr.left[0], 0, 0, 16, 26, 88, yI, 24, 39);
        x.restore();
        if (prepI > 0) {
            x.fillStyle = '#2a1d30';
            x.fillRect(91, yI - 8, 16, 9);
            x.fillStyle = '#fff';
            x.fillRect(92, yI - 7, 14, 7);
        }
        tr.forEach(t => { x.fillStyle = '#2a1d30'; x.fillRect(Math.round(t.x) - 7, t.y - 4, 15, 9); x.fillStyle = '#fff'; x.fillRect(Math.round(t.x) - 6, t.y - 3, 13, 7); x.fillStyle = '#dcd6e4'; x.fillRect(Math.round(t.x) - 6, t.y + 2, 13, 1); });
        if (tho)
            gatoPequeno(x, 'tho', 'feliz', Math.round(tho.x), 32);
        gatoPequeno(x, 'clarinha', 'normal', 112, 58 - 14);
        x.fillStyle = '#fff';
        x.fillRect(102, 30, 24, 9);
        x.fillStyle = '#2a1d30';
        x.font = '6px monospace';
        x.fillText('ridículo', 103, 37);
        plumas = plumas.filter(p => p.v > 0);
        plumas.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 40 * dt; p.v -= dt * .7; x.fillStyle = '#fff'; x.fillRect(Math.round(p.x), Math.round(p.y), 2, 1); });
        x.fillStyle = '#2a1d30';
        x.fillRect(48, 2, 32, 11);
        x.fillStyle = '#fff';
        x.font = 'bold 8px monospace';
        x.fillText(`${pts.f} x ${pts.i}`, 52, 10);
    };
    requestAnimationFrame(lp);
}
function canvasMascara(img, pal) {
    let c = _mascCache.get(img);
    if (c !== undefined)
        return c;
    const w = img.width, h = img.height;
    c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    let im;
    try {
        im = x.getImageData(0, 0, w, h);
    }
    catch (e) {
        _mascCache.set(img, null);
        return null;
    }
    const d = im.data, hex = s => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)], S1 = hex(pal.S), S2 = hex(pal.s || pal.S);
    const igual = (i, c) => Math.abs(d[i] - c[0]) < 6 && Math.abs(d[i + 1] - c[1]) < 6 && Math.abs(d[i + 2] - c[2]) < 6;
    for (let y = 2; y < Math.min(h, 12); y++)
        for (let xx = 0; xx < w; xx++) {
            const i = (y * w + xx) * 4;
            if (d[i + 3] < 200)
                continue;
            if (igual(i, S1)) {
                d[i] = 143;
                d[i + 1] = 209;
                d[i + 2] = 138;
            }
            else if (igual(i, S2)) {
                d[i] = 111;
                d[i + 1] = 178;
                d[i + 2] = 110;
            }
        }
    x.putImageData(im, 0, 0);
    _mascCache.set(img, c);
    return c;
}
function noiteSkincare() {
    abrir('Noite de skincare 🧖', `<div class="grade"><button class="px" id="skMasc"><span style="font-size:26px">🧖</span>Passar a máscara</button><button class="px" id="skUnha"><span style="font-size:26px">💅</span>Pintar as unhas</button></div>`, true);
    $('skMasc').onclick = () => {
        fechar();
        const ate = performance.now() + 180000;
        FEFE.mascaraAte = ate;
        ISI.mascaraAte = ate;
        som.plim();
        nec('diversao', 12);
        nec('social', 10);
        primeiraVez('mascara', 1);
        falar(ISI, pick(['Tá parecendo um ogro, amor 😂', 'Pele de bebê vindo aí', 'Não pode rir senão racha!']), 2400);
        setTimeout(() => falar(FEFE, 'Você também tá verde, tá?', 1800), 1500);
        setTimeout(() => { const t = G('tho'); if (t && !S.gatos.tho.dormindo) {
            falar(t, 'MONSTROS VERDES!!!', 1600);
            zoomies(t, 2);
        } }, 2600);
        setTimeout(() => { const c = G('clarinha'); if (c && !S.gatos.clarinha.dormindo)
            pensar(c, 'eu não conheço vocês.', 2000); }, 4200);
        toast('Máscara aplicada! Fica 3 minutinhos 🧖');
    };
    $('skUnha').onclick = () => pintarUnhas();
}
var PAL_DESENHO;
var SLOTS_QUADRO;
function imgQuadro(q) {
    return pinta(20, 20, (R) => {
        R(0, 0, 20, 20, '#5e3d2e');
        R(1, 1, 18, 18, '#8a5a3a');
        R(2, 2, 16, 16, '#fff');
        for (let i = 0; i < 256; i++) {
            const c = q.p.charCodeAt(i) - 97;
            if (c >= 0 && c < PAL_DESENHO.length)
                R(2 + i % 16, 2 + Math.floor(i / 16), 1, 1, PAL_DESENHO[c]);
        }
    });
}
function construirQuadros() {
    if (MAPA !== 'quarto')
        return;
    for (let i = OBJ.length - 1; i >= 0; i--)
        if (OBJ[i].quadro)
            OBJ.splice(i, 1);
    (S.quadros || []).slice(-SLOTS_QUADRO.length).forEach((q, i) => { const [sx, sy] = SLOTS_QUADRO[i]; OBJ.push({ nome: 'quadro' + i, quadro: true, semSombra: true, x: sx, y: sy, img: imgQuadro(q), base: 24 }); });
}
function desenharJuntas() {
    const px = new Array(256).fill(-1);
    let cor = 2, desenhando = false;
    abrir('Desenhar juntas 🎨', `<div class="mg" style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap">
    <canvas id="cvDes" width="160" height="160" style="width:min(56vh,220px);height:min(56vh,220px);image-rendering:pixelated;touch-action:none;box-shadow:0 0 0 3px #2a1d30;cursor:crosshair;background:#fff"></canvas>
    <div style="display:flex;flex-direction:column;gap:6px;align-items:center"><div id="desPal" style="display:grid;grid-template-columns:repeat(4,22px);gap:5px">${PAL_DESENHO.map((c, i) => `<button data-dc="${i}" style="width:22px;height:22px;background:${c};border:none;box-shadow:0 0 0 2px ${i === 2 ? '#ff7aa8' : '#2a1d30'};cursor:pointer"></button>`).join('')}</div>
    <div style="display:flex;gap:5px"><button class="btn branco" id="desBorr" style="width:auto;margin:0;padding:4px 8px;font-size:12px">Borracha</button><button class="btn branco" id="desLimpa" style="width:auto;margin:0;padding:4px 8px;font-size:12px">Limpar</button></div>
    <button class="btn" id="desPendura" style="width:auto;margin:0">🖼️ Pendurar na parede</button><p id="desMsg" style="margin:0;font-size:12px;min-height:16px;max-width:200px"></p></div></div>`, true, true);
    const cv = $('cvDes'), x = cv.getContext('2d');
    const desenha = () => {
        x.fillStyle = '#fff';
        x.fillRect(0, 0, 160, 160);
        for (let i = 0; i < 256; i++) {
            if (px[i] >= 0) {
                x.fillStyle = PAL_DESENHO[px[i]];
                x.fillRect((i % 16) * 10, Math.floor(i / 16) * 10, 10, 10);
            }
        }
        x.strokeStyle = 'rgba(42,29,48,.08)';
        x.lineWidth = 1;
        for (let k = 1; k < 16; k++) {
            x.beginPath();
            x.moveTo(k * 10 + .5, 0);
            x.lineTo(k * 10 + .5, 160);
            x.stroke();
            x.beginPath();
            x.moveTo(0, k * 10 + .5);
            x.lineTo(160, k * 10 + .5);
            x.stroke();
        }
    };
    const pinte = e => { const r = cv.getBoundingClientRect(), cx = Math.floor((e.clientX - r.left) / r.width * 16), cy = Math.floor((e.clientY - r.top) / r.height * 16); if (cx < 0 || cy < 0 || cx > 15 || cy > 15)
        return; const i = cy * 16 + cx; if (px[i] !== cor) {
        px[i] = cor;
        desenha();
    } };
    cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); desenhando = true; pinte(e); };
    cv.onpointermove = e => { if (desenhando)
        pinte(e); };
    cv.onpointerup = () => { desenhando = false; };
    document.querySelectorAll('[data-dc]').forEach(b => b.onclick = () => { cor = +b.dataset.dc; som.pop(); document.querySelectorAll('[data-dc]').forEach(o => o.style.boxShadow = `0 0 0 2px ${o === b ? '#ff7aa8' : '#2a1d30'}`); });
    $('desBorr').onclick = () => { cor = -1; som.pop(); };
    $('desLimpa').onclick = () => { px.fill(-1); desenha(); };
    let com = setInterval(() => { if (!modalVivo('cvDes'))
        return clearInterval(com); if (px.some(v => v >= 0) && Math.random() < .5)
        $('desMsg').textContent = `${NOME_MINHA}: ` + pick(['Que lindo, amor!', 'Faz um gatinho!', 'Coloca um coração aí', 'Você é artista demais', 'Deixa eu pintar um pedacinho?']); }, 6000);
    $('desPendura').onclick = () => {
        if (!px.some(v => v >= 0)) {
            $('desMsg').textContent = 'Desenha alguma coisinha primeiro ♥';
            return;
        }
        [[13, 13], [15, 13], [13, 14], [14, 14], [15, 14], [14, 15]].forEach(([a, b]) => { if (px[b * 16 + a] < 0)
            px[b * 16 + a] = 2; });
        S.quadros = (S.quadros || []);
        S.quadros.push({ p: px.map(v => v < 0 ? 'z' : String.fromCharCode(97 + v)).join(''), d: diaKey(new Date()) });
        if (S.quadros.length > SLOTS_QUADRO.length)
            S.quadros.shift();
        primeiraVez('quadro', 2);
        nec('diversao', 20);
        nec('social', 8);
        construirQuadros();
        clearInterval(com);
        fechar();
        som.plim();
        falar(ISI, 'Vou assinar com um coraçãozinho ♥', 2000);
        setTimeout(() => falar(FEFE, 'Ficou lindo na parede!', 1800), 1500);
        toast('Quadrinho pendurado em cima da mesa 🖼️');
    };
    desenha();
}
function olharEstrelas() {
    const W = 128, H = 72;
    FEFE.x = 238;
    FEFE.y = 74;
    FEFE.dir = 'up';
    ISI.x = 252;
    ISI.y = 74;
    ISI.dir = 'up';
    ISI.estado = 'abraco';
    abrir('Olhando as estrelas 🌠', `<div class="mg">${cvPx('cvEst', W, H)}<p id="estMsg" style="margin:6px 0;min-height:20px">Toque numa estrela cadente pra fazer um pedido ✨</p></div>`, true, true);
    const cv = $('cvEst'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const est = [...Array(40)].map((_, i) => [(i * 53) % W, (i * 29) % 48, (i * 7) % 5]);
    let cad = null, cadT = 1.5, ult = performance.now(), falaT = 9, pedidos = 0;
    const msg = s => { const m = $('estMsg'); if (m)
        m.textContent = s; };
    cv.onpointerdown = e => {
        if (!cad)
            return;
        const r = cv.getBoundingClientRect(), px = (e.clientX - r.left) * W / r.width, py = (e.clientY - r.top) * H / r.height;
        if (Math.hypot(px - cad.x, py - cad.y) < 18) {
            cad.feito = true;
            pedidos++;
            S.pedidos = (S.pedidos || 0) + 1;
            som.plim();
            msg(pick(['Você fez um pedido ✨', 'Pedido feito... segredo! 🤫', 'Que ele se realize ✨']));
            setTimeout(() => { msg(`${NOME_MINHA}: ${pick(FRASES_ESTRELAS)}`); }, 1300);
            nec('social', 10);
            primeiraVez('estrelas', 2);
        }
    };
    const lp = () => {
        if (!modalVivo('cvEst')) {
            ISI.estado = 'seguindo';
            return;
        }
        requestAnimationFrame(lp);
        const ag = performance.now(), dt = Math.min(.1, (ag - ult) / 1000);
        ult = ag;
        const g = x.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#0d0b2a');
        g.addColorStop(1, '#2e2a66');
        x.fillStyle = g;
        x.fillRect(0, 0, W, H);
        est.forEach(([a, b, c], i) => { const br = (Math.sin(ag / 400 + i) + 1) / 2; x.fillStyle = br > .7 ? '#fff' : '#9a94d0'; x.fillRect(a, b, 1, 1); if (c === 0 && br > .85) {
            x.fillRect(a - 1, b, 3, 1);
            x.fillRect(a, b - 1, 1, 3);
        } });
        x.fillStyle = '#fff6c8';
        x.fillRect(96, 8, 10, 10);
        x.fillRect(95, 9, 12, 8);
        x.fillStyle = '#0d0b2a';
        x.fillRect(99, 7, 10, 9);
        cadT -= dt;
        if (!cad && cadT <= 0) {
            cad = { x: 20 + Math.random() * 80, y: 4 + Math.random() * 14, vx: -40 - Math.random() * 30, vy: 18 + Math.random() * 10, t: 0 };
            cadT = 2.5 + Math.random() * 3;
        }
        if (cad) {
            cad.t += dt;
            cad.x += cad.vx * dt;
            cad.y += cad.vy * dt;
            const a = Math.max(0, 1 - cad.t / 1.4);
            x.globalAlpha = a;
            x.fillStyle = cad.feito ? '#ffd36e' : '#fff';
            x.fillRect(Math.round(cad.x), Math.round(cad.y), 2, 2);
            x.fillStyle = 'rgba(255,255,255,.5)';
            for (let k = 1; k < 6; k++)
                x.fillRect(Math.round(cad.x - cad.vx * k * .02), Math.round(cad.y - cad.vy * k * .02), 1, 1);
            x.globalAlpha = 1;
            if (cad.t > 1.4)
                cad = null;
        }
        x.fillStyle = '#efe6f5';
        x.fillRect(0, 0, W, 3);
        x.fillRect(0, 0, 3, H);
        x.fillRect(W - 3, 0, 3, H);
        x.fillRect(62, 0, 4, 52);
        x.fillStyle = '#a24d6b';
        x.fillRect(0, 52, W, 4);
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 56, W, 16);
        const cab = (cx, c1, c2) => { x.fillStyle = c1; x.fillRect(cx - 8, 54, 16, 18); x.fillRect(cx - 6, 52, 12, 2); x.fillStyle = c2; x.fillRect(cx - 6, 56, 3, 10); };
        const pf = paletaFefe();
        cab(48, pf.H, pf.h);
        cab(78, ISI_COR.H, ISI_COR.h);
        gatoPequeno(x, 'clarinha', 'normal', 100, 40);
        falaT -= dt;
        if (falaT <= 0) {
            falaT = 12 + Math.random() * 6;
            msg(`${NOME_MINHA}: ${pick(FRASES_ESTRELAS)}`);
        }
    };
    requestAnimationFrame(lp);
}
function imgPostit() { return pinta(7, 7, (R) => { R(0, 0, 7, 7, '#2a1d30'); R(1, 1, 5, 5, '#ffe66e'); R(1, 1, 5, 1, '#ffd03a'); R(2, 3, 3, 1, '#c9a032'); R(2, 5, 2, 1, '#c9a032'); }); }
function atualizarBilhete() {
    if (MAPA !== 'quarto' || !BILHETES || !BILHETES.length)
        return;
    if (bilhete) {
        if (bilhete.tho) {
            const t = G('tho');
            if (t) {
                const p = PONTOS.find(p => p.obj === 'bilhete');
                if (p) {
                    p.x = Math.round(t.x);
                    p.y = Math.round(t.y + 8);
                }
                if (t.estado === 'andando' || t.estado === 'caos') {
                    t.estado = 'parado';
                    t.timer = 999;
                }
            }
        }
        return;
    }
    if (Date.now() < (S.bilheteProx || 0) || bloqueioTela())
        return;
    let L = pick(LUGARES_BILHETE);
    if (L.tho && S.gatos.tho.dormindo)
        L = LUGARES_BILHETE[0];
    bilhete = { ...L };
    if (L.tho) {
        const t = G('tho'), [x, y] = pontoLivre();
        t.x = x;
        t.y = y;
        t.estado = 'parado';
        t.timer = 999;
    }
    else
        OBJ.push({ nome: 'bilhete', bilhete: true, semSombra: true, x: L.x, y: L.y, img: imgPostit(), base: L.y + 40 });
    PONTOS.push({ obj: 'bilhete', nome: 'Ler o bilhetinho 💌', x: L.tho ? 0 : L.px, y: L.tho ? 0 : L.py, acao: lerBilhete });
}
function desenharBilhete(lista) {
    if (!bilhete || !bilhete.tho || MAPA !== 'quarto')
        return;
    const t = G('tho');
    if (!t)
        return;
    lista.push({ b: t.y - .5, f: () => { ctx.drawImage(imgPostit._c || (imgPostit._c = imgPostit()), Math.round(t.x) + 3, Math.round(t.y) - 4); if (Math.floor(performance.now() / 500) % 2)
            ctx.drawImage(spr(...PART.brilho, 'pb'), Math.round(t.x) + 6, Math.round(t.y) - 10); } });
}
function lerBilhete() {
    const b = bilhete;
    if (!b)
        return;
    bilhete = null;
    for (let i = OBJ.length - 1; i >= 0; i--)
        if (OBJ[i].bilhete)
            OBJ.splice(i, 1);
    for (let i = PONTOS.length - 1; i >= 0; i--)
        if (PONTOS[i].obj === 'bilhete')
            PONTOS.splice(i, 1);
    alvoAtual = null;
    const i = (S.bilheteI || 0) % BILHETES.length;
    S.bilheteI = (S.bilheteI || 0) + 1;
    S.bilheteProx = Date.now() + (2 + Math.random() * 3) * 3600e3;
    if (b.tho) {
        const t = G('tho');
        if (t) {
            t.timer = 1;
            falar(t, 'ei. eu tava chocando isso.', 1800);
        }
    }
    primeiraVez('bilhete', 1);
    nec('social', 12);
    som.plim();
    abrir('Bilhetinho 💌', `<div style="text-align:center;padding:6px 0 4px"><div style="display:inline-block;background:#ffe66e;box-shadow:0 0 0 3px #2a1d30,4px 4px 0 3px rgba(42,29,48,.25);padding:16px 18px;max-width:280px;transform:rotate(-2deg);text-align:left;font-size:15px;line-height:1.45;color:#3a2a1a;white-space:pre-wrap">${esc(BILHETES[i])}\n\n<span style="opacity:.7">— ${esc(NOME_MINHA)} ♥</span></div>
    <p style="font-size:12px;opacity:.6;margin:10px 0 0">Tava ${esc(b.n)}</p></div>`, true);
}
function atualizarVidaIsinha(dt) {
    if (!ISI.aqui || ISI.pose || ISI.estado !== 'seguindo' || MAPA !== 'quarto' || bloqueioTela()) {
        fefeParadaT = 0;
        return;
    }
    if (FEFE.anda || FEFE.alvo) {
        fefeParadaT = 0;
        return;
    }
    fefeParadaT += dt;
    if (ISI.atv || fefeParadaT < isiAtvT)
        return;
    fefeParadaT = 0;
    isiAtvT = 12 + Math.random() * 12;
    const acordados = gatos.filter(g => !S.gatos[g.id].dormindo && g !== gatoPerto && g.estado !== 'oculto' && g.estado !== 'escondido');
    const opcoes = ['celular', 'janela', 'chamar'];
    if (acordados.length)
        opcoes.push('gato', 'gato');
    if (S.horta)
        opcoes.push('horta');
    const o = pick(opcoes);
    if (o === 'gato') {
        const g = pick(acordados);
        ISI.atv = { t: 9, gato: g.id, alvo: [g.x, g.y], chegou: () => {
                falar(ISI, pick([`Oi, ${GATOS[g.id].nome}! Que fofura`, 'Vem cá, bebê', 'Quem é o gatinho mais lindo?']), 2200);
                particula('coracao', g.x, g.y - 14, 2);
                S.gatos[g.id].alegria = lim(S.gatos[g.id].alegria + 4);
                setTimeout(() => falar(g, g.id === 'tho' ? '*se joga no chão*' : g.id === 'lola' ? 'prrrr ♥' : '...tá bom, só um pouquinho.', 1800), 900);
                som.miau(g.id, 1);
            } };
    }
    else if (o === 'celular') {
        ISI.atv = { t: 8, cel: true };
        falar(ISI, pick(['Olha esse meme kkkk', 'O Floki mandou foto!', 'Vou ver o tempo amanhã', 'Achei um filme pra gente ver']), 2400);
    }
    else if (o === 'janela') {
        ISI.atv = { t: 8, alvo: [45, 72], chegou: () => { ISI.dir = 'up'; falar(ISI, pick(['Que céu bonito hoje', 'Olha um passarinho!', 'Tá ventando lá fora']), 2200); } };
    }
    else if (o === 'horta') {
        ISI.atv = { t: 9, alvo: [140, 214], chegou: () => { ISI.dir = 'up'; falar(ISI, 'Vou dar uma aguinha pra hortinha', 2200); particula('agua', 140, 200, 4); } };
    }
    else {
        const c = pick([['ver um filme?', 'tv'], ['jogar videogame?', 'tv'], ['fazer skincare?', 'skincare'], ['desenhar?', 'desenhar'], ['ganhar um cafuné? 🥺', 'cafune']].concat(ehNoite24() ? [['olhar as estrelas?', 'estrelas']] : []));
        falar(ISI, `Amor, bora ${c[0]}`, 2800);
        toast(`Fale com a ${NOME_MINHA} pra aceitar ♥`);
    }
}
function desenharVidaIsinha(lista) {
    if (!ISI.aqui || !ISI.atv || !ISI.atv.cel || MAPA !== 'quarto')
        return;
    lista.push({ b: ISI.y + .2, f: () => { const x = Math.round(ISI.x), y = Math.round(ISI.y); ctx.fillStyle = '#2a1d30'; ctx.fillRect(x + 2, y - 15, 4, 6); ctx.fillStyle = Math.floor(performance.now() / 700) % 2 ? '#8fcaff' : '#c8e8ff'; ctx.fillRect(x + 3, y - 14, 2, 4); } });
}
function atualizarExtras31(dt) { atualizarBilhete(); atualizarVidaIsinha(dt); atualizarCafune(dt); }
function extrasDesenho31(lista) { desenharBilhete(lista); desenharVidaIsinha(lista); }
var COR_NEC;
function girarEsq(img) { let c = _rotCache.get(img); if (c)
    return c; c = document.createElement('canvas'); c.width = img.height; c.height = img.width; const x = c.getContext('2d'); x.translate(0, img.width); x.rotate(-Math.PI / 2); x.drawImage(img, 0, 0); _rotCache.set(img, c); return c; }
function cafune() {
    if (MAPA !== 'quarto')
        return;
    sentarTapete();
    FEFE.dir = 'down';
    ISI.pose = 'colo';
    ISI.anda = false;
    ISI.atv = null;
    ISI.x = FEFE.x;
    ISI.y = FEFE.y + .3;
    cafuneEst = { sono: 0, dormiu: false, mao: null, ult: null, fala: -1 };
    falar(ISI, 'Posso deitar no seu colo? 🥺', 2000);
    setTimeout(() => toast('Passe o dedo na cabeça dela pra fazer cafuné 🤲'), 900);
}
function cabecaColo() { return { x: FEFE.x - 6, y: FEFE.y - 8, w: 16, h: 16 }; }
function desenharIsinhaColo() {
    const E = cafuneEst, base = isiSpr.down[0];
    let img = base;
    if (E && E.sono > 55) {
        const c = canvasPiscando(base, ISI_COR.E, ISI_COR.S);
        if (c)
            img = c;
    }
    if (ISI.mascaraAte && performance.now() < ISI.mascaraAte) {
        const m = canvasMascara(img, ISI_COR);
        if (m)
            img = m;
    }
    const r = girarEsq(img), x = Math.round(FEFE.x) - 6, y = Math.round(FEFE.y) - 12, resp = E && E.dormiu ? Math.floor(performance.now() / 1400) % 2 : 0;
    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ctx.fillRect(x + 2, y + 16, 24, 2);
    ctx.drawImage(r, x, y + resp * 0);
    if (E && E.dormiu && Math.random() < .012)
        particula('zz', x + 6, y - 2);
    if (E && E.sono > 30) {
        ctx.fillStyle = 'rgba(255,140,170,.55)';
        ctx.fillRect(x + 9, y + 3, 1, 1);
        ctx.fillRect(x + 9, y + 11, 1, 1);
    }
    if (E && !E.dormiu) {
        const bx = Math.round(FEFE.x) - 11, by = Math.round(FEFE.y) - 32;
        ctx.fillStyle = '#2a1d30';
        ctx.fillRect(bx - 1, by - 1, 23, 4);
        for (let i = 0; i < 10; i++) {
            ctx.fillStyle = E.sono > i * 10 + 4 ? '#c08cff' : '#f0e2ea';
            ctx.fillRect(bx + i * 2 + (i > 0 ? i * 0 : 0), by, 2, 2);
        }
    }
    if (E && E.mao && !E.dormiu) {
        const [mx, my] = E.mao, w = Math.round(Math.sin(performance.now() / 90));
        ctx.fillStyle = '#2a1d30';
        ctx.fillRect(Math.round(mx) - 3, Math.round(my) - 2 + w, 7, 5);
        ctx.fillStyle = FEFE_COR.S;
        ctx.fillRect(Math.round(mx) - 2, Math.round(my) - 1 + w, 5, 3);
        ctx.fillStyle = FEFE_COR.s;
        ctx.fillRect(Math.round(mx) - 2, Math.round(my) + 1 + w, 5, 1);
    }
}
function atualizarCafune(dt) {
    const E = cafuneEst;
    if (!E)
        return;
    if (ISI.pose !== 'colo' || FEFE.pose !== 'tapete' || !ISI.aqui) {
        cafuneEst = null;
        if (ISI.pose === 'colo') {
            ISI.pose = null;
            ISI.estado = 'seguindo';
        }
        return;
    }
    const FR = ['Hmmm...', 'Que gostoso...', '*fecha os olhinhos*', '*boceja*'];
    const nv = Math.min(3, Math.floor(E.sono / 25));
    if (E.sono > 5 && nv !== E.fala && !E.dormiu) {
        E.fala = nv;
        falar(ISI, FR[nv], 1600);
        som.pop();
    }
    if (E.sono >= 100 && !E.dormiu) {
        E.dormiu = true;
        E.mao = null;
        som.plim();
        nec('social', 25);
        primeiraVez('cafune', 2);
        falar(FEFE, 'Dormiu... 🥺', 1800);
        toast(`A ${NOME_MINHA} dormiu no seu colo 💤`);
    }
}
function gradeMao() {
    if (gradeMao.g)
        return gradeMao.g;
    const W = 40, H = 48, g = [...Array(H)].map(() => Array(W).fill('.')), unha = [...Array(H)].map(() => Array(W).fill(-1));
    const P = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < W && y < H)
        g[y][x] = k; };
    const ell = (cx, cy, rx, ry, k, id) => { for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++)
        for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
            const dx = (x - cx) / (rx + .3), dy = (y - cy) / (ry + .3);
            if (dx * dx + dy * dy <= 1) {
                P(x, y, k);
                if (id != null && x >= 0 && y >= 0 && x < W && y < H)
                    unha[y][x] = id;
            }
        } };
    const rect = (x, y, w, h, k) => { for (let j = 0; j < h; j++)
        for (let i = 0; i < w; i++)
            P(x + i, y + j, k); };
    const DED = [{ cx: 13.5, top: 10 }, { cx: 20.5, top: 5 }, { cx: 27.5, top: 7 }, { cx: 34, top: 13 }];
    rect(10, 27, 26, 22, 'S');
    ell(12, 29, 3, 3, 'S');
    ell(34, 29, 3, 3, 'S');
    DED.forEach(d => { rect(Math.round(d.cx - 3), d.top + 3, 6, 30 - d.top, 'S'); ell(d.cx - .5, d.top + 3, 2.6, 3, 'S'); });
    for (let t = 0; t <= 1.001; t += .05)
        ell(11 - t * 8, 38 - t * 12, 3.3, 3.3, 'S');
    ell(3.4, 26.6, 1.8, 1.8, 'N', 0);
    DED.forEach((d, i) => ell(d.cx - .5, d.top + 3.3, 1.7, 2.2, 'N', i + 1));
    const out = g.map(r => [...r]);
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++)
            if (g[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => g[y + b] && g[y + b][x + a] && g[y + b][x + a] !== '.'))
                out[y][x] = 'O';
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++)
            if (out[y][x] === 'S' && out[y][x + 1] === 'O')
                out[y][x] = 's';
    DED.forEach(d => { const y = d.top + 12; for (let x = Math.round(d.cx - 2); x <= Math.round(d.cx); x++)
        if (out[y][x] === 'S')
            out[y][x] = 's'; });
    gradeMao.g = { g: out, unha, W, H, centros: [[3.4, 26.6]].concat(DED.map(d => [d.cx - .5, d.top + 3.3])) };
    return gradeMao.g;
}
function desenharMao(x, ox, oy, pal, U) {
    const M = gradeMao();
    for (let y = 0; y < M.H; y++)
        for (let xx = 0; xx < M.W; xx++) {
            const k = M.g[y][xx];
            if (k === '.')
                continue;
            let c = k === 'O' ? '#2a1d30' : k === 'S' ? pal.S : k === 's' ? (pal.s || pal.S) : (U[M.unha[y][xx]] || '#f3dde3');
            x.fillStyle = c;
            x.fillRect(ox + xx, oy + y, 1, 1);
        }
    M.centros.forEach(([cx, cy], i) => { if (U[i]) {
        x.fillStyle = 'rgba(255,255,255,.7)';
        x.fillRect(ox + Math.round(cx) - 1, oy + Math.round(cy) - 1, 1, 1);
    } });
}
function pintarUnhas() {
    const W = 70, H = 54, CORES = ['#ff5c8d', '#c8242e', '#c08cff', '#5b8cff', '#7bd389', '#ffd36e', '#1d1b22', '#f4f1ec'], OX = 10, OY = 9;
    let cor = CORES[0], fase = 'isi', unhas = [null, null, null, null, null], fefeU = [null, null, null, null, null], k = 0;
    abrir('Pintar as unhas 💅', `<div class="mg">${cvPx('cvUnha', W, H)}<p id="unhaMsg" style="margin:6px 0;min-height:20px">Escolha a cor e toque nas unhas da ${NOME_MINHA}</p>
    <div class="lanes" id="unhaCores" style="gap:6px;flex-wrap:wrap">${CORES.map((c, i) => `<button data-uc="${i}" style="width:30px;height:30px;background:${c};border:none;box-shadow:0 0 0 3px ${i ? '#2a1d30' : '#fff'},0 0 0 5px #2a1d30;cursor:pointer"></button>`).join('')}</div></div>`, true);
    document.querySelectorAll('[data-uc]').forEach(b => b.onclick = () => { cor = CORES[+b.dataset.uc]; som.pop(); document.querySelectorAll('[data-uc]').forEach(o => o.style.boxShadow = `0 0 0 3px ${o === b ? '#fff' : '#2a1d30'},0 0 0 5px #2a1d30`); });
    const cv = $('cvUnha'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    cv.onpointerdown = e => {
        if (fase !== 'isi')
            return;
        const r = cv.getBoundingClientRect(), px = (e.clientX - r.left) * W / r.width - OX, py = (e.clientY - r.top) * H / r.height - OY;
        const M = gradeMao();
        let melhor = -1, md = 7;
        M.centros.forEach(([cx, cy], i) => { const d = Math.hypot(px - cx, py - cy); if (d < md) {
            md = d;
            melhor = i;
        } });
        if (melhor >= 0) {
            unhas[melhor] = cor;
            som.pop();
        }
        if (unhas.every(u => u)) {
            fase = 'espera';
            $('unhaMsg').textContent = `${NOME_MINHA}: ` + pick(['Ficou PERFEITO, amor! Agora eu pinto as suas', 'Que capricho ♥ Minha vez!']);
            falar(ISI, 'Agora eu pinto as suas!', 1800);
            $('unhaCores').style.visibility = 'hidden';
            setTimeout(() => { fase = 'fefe'; }, 1400);
        }
    };
    let ult = performance.now(), tPint = 0;
    const lp = () => {
        if (!modalVivo('cvUnha'))
            return;
        requestAnimationFrame(lp);
        const ag = performance.now(), dt = (ag - ult) / 1000;
        ult = ag;
        if (fase === 'fefe') {
            tPint -= dt;
            if (tPint <= 0 && k < 5) {
                tPint = .6;
                fefeU[k] = unhas[k];
                k++;
                som.pop();
                if (k === 5) {
                    $('unhaMsg').textContent = 'Combinando! 💅';
                    primeiraVez('unhas', 2);
                    nec('social', 15);
                    nec('diversao', 10);
                    S.unhas = { isi: unhas, fefe: fefeU };
                    salvar();
                }
            }
        }
        x.fillStyle = '#ffe3ec';
        x.fillRect(0, 0, W, H);
        x.fillStyle = '#f3c1d3';
        x.fillRect(0, 46, W, 8);
        x.fillStyle = '#efb0c6';
        x.fillRect(0, 46, W, 1);
        const mao = fase === 'fefe' || k === 5 ? 'fefe' : 'isi', pal = mao === 'fefe' ? FEFE_COR : ISI_COR, U = mao === 'fefe' ? fefeU : unhas;
        desenharMao(x, OX, OY, pal, U);
        const ce = mao === 'fefe' ? (unhas[0] || cor) : cor;
        x.fillStyle = '#2a1d30';
        x.fillRect(55, 32, 10, 14);
        x.fillRect(57, 26, 6, 7);
        x.fillStyle = ce;
        x.fillRect(56, 36, 8, 9);
        x.fillStyle = 'rgba(255,255,255,.5)';
        x.fillRect(57, 37, 1, 5);
        x.fillStyle = '#1d1b22';
        x.fillRect(58, 27, 4, 5);
    };
    requestAnimationFrame(lp);
}
