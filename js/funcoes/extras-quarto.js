function noiteDeJogos() {
    if (MAPA !== 'quarto')
        return;
    sentarJuntas({ f: ['pc', 156, 128, 150, 168, 164], i: ['sentadaCostas', 176, 128, 150, 192, 164],
        fala: () => pick(['Prepara pra perder, amor!', 'Eu sou a amarela, não pega!', 'Vale tudo hoje!']) });
    FEFE.dir = 'up';
    if (!ISI.aqui)
        falar(FEFE, 'Bora de kartzinho...', 1600);
    setTimeout(() => { if (FEFE.pose === 'assento')
        jogoKart(); }, 900);
}
function jogoKart() {
    const juntas = ISI.aqui, rival = juntas ? NOME_MINHA : 'CPU';
    abrir('Noite de jogos 🎮', `<div class="mg" style="display:flex;gap:14px;align-items:center;justify-content:center">
    <div style="flex:1;min-width:0;text-align:center"><canvas id="cvKart" width="128" height="72" style="display:block;margin:0 auto;height:min(calc(92vh - 150px),240px);width:auto;max-width:100%;image-rendering:pixelated"></canvas>
    <p id="kartMsg" style="margin:6px 0 0;font-size:13px">${juntas ? `Contra a ${NOME_MINHA}! ` : ''}Segure <b>ACELERA</b>, troque de pista com ▲ ▼. Setas » = turbo!</p></div>
    <div class="lanes" style="flex-direction:column;margin:0;gap:8px"><button id="kUp" style="background:#5b8cff;height:48px">▲</button><button id="kGo" style="background:#ff7aa8;height:64px;width:84px;font-size:14px">ACELERA!</button><button id="kDn" style="background:#5b8cff;height:48px">▼</button></div></div>`, false, true);
    tvLigada = true;
    const cv = $('cvKart'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const FIM = 1500, LY = [25, 39, 53];
    const P = { id: 'p', d: 0, v: 0, l: 1, ly: 39, turbo: 0, cor: '#ff7aa8', cabelo: '#3a2420' }, R = { id: 'r', d: 0, v: 0, l: 0, ly: 25, turbo: 0, cor: juntas ? '#ffd36e' : '#9aa0b0', cabelo: juntas ? '#c0894a' : '#55505f' };
    const obs = [];
    for (let d = 150; d < FIM - 70; d += 48 + Math.random() * 55)
        obs.push({ d, l: Math.floor(Math.random() * 3), t: Math.random() < .2 ? 'turbo' : pick(['cone', 'poca', 'novelo']) });
    let acel = false, ini = performance.now(), ult = ini, fim = false, tho = null, thoFeito = false, raf;
    const thoG = G('tho');
    const trocar = (k, dl) => { k.l = Math.max(0, Math.min(2, k.l + dl)); };
    const bGo = $('kGo');
    bGo.onpointerdown = e => { e.preventDefault(); audio(); acel = true; };
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => bGo.addEventListener(ev, () => acel = false));
    $('kUp').onpointerdown = e => { e.preventDefault(); trocar(P, -1); };
    $('kDn').onpointerdown = e => { e.preventDefault(); trocar(P, 1); };
    const kd = e => { if (!$('cvKart'))
        return; const k = e.key.toLowerCase(); if (k === 'arrowup' || k === 'w') {
        trocar(P, -1);
        e.preventDefault();
    } if (k === 'arrowdown' || k === 's') {
        trocar(P, 1);
        e.preventDefault();
    } if (k === ' ' || k === 'arrowright' || k === 'd') {
        acel = true;
        e.preventDefault();
    } };
    const ku = e => { const k = e.key.toLowerCase(); if (k === ' ' || k === 'arrowright' || k === 'd')
        acel = false; };
    addEventListener('keydown', kd);
    addEventListener('keyup', ku);
    const bip = (f, d = .1, v = .05, tp = 'square') => { if (AC)
        tom(AC.currentTime, f, d, v, tp); };
    const kart = (k, sx) => {
        const y = Math.round(k.ly), X = Math.round(sx);
        x.fillStyle = 'rgba(0,0,0,.3)';
        x.fillRect(X - 6, y + 3, 13, 2);
        x.fillStyle = '#2a1d30';
        x.fillRect(X - 6, y - 4, 13, 8);
        x.fillStyle = k.cor;
        x.fillRect(X - 5, y - 3, 11, 6);
        x.fillStyle = '#fff';
        x.fillRect(X + 3, y - 2, 2, 1);
        x.fillStyle = '#141018';
        x.fillRect(X - 5, y - 5, 3, 2);
        x.fillRect(X + 2, y - 5, 3, 2);
        x.fillRect(X - 5, y + 4, 3, 2);
        x.fillRect(X + 2, y + 4, 3, 2);
        x.fillStyle = k.cabelo;
        x.fillRect(X - 3, y - 3, 5, 5);
        x.fillStyle = '#f8dcc8';
        x.fillRect(X, y - 2, 2, 3);
        if (k.turbo > 0) {
            const fl = 4 + Math.floor(Math.random() * 4);
            x.fillStyle = '#ff8a3d';
            x.fillRect(X - 6 - fl, y - 2, fl, 4);
            x.fillStyle = '#ffd36e';
            x.fillRect(X - 6 - fl + 2, y - 1, fl - 2, 2);
        }
    };
    const passo = (dt, t) => {
        if (t < 3)
            return;
        const cego = tho && !tho.fora;
        P.turbo -= dt;
        R.turbo -= dt;
        if (P.turbo > 0)
            P.v = Math.max(P.v, 118);
        else if (P.v > 78)
            P.v -= 40 * dt;
        else {
            P.v += ((acel && !cego) ? 58 : -32) * dt;
            P.v = Math.min(78, P.v);
        }
        P.v = Math.max(0, Math.min(120, P.v));
        let alvoV = 69 + Math.sin(t * .8) * 6;
        if (R.d > P.d + 130)
            alvoV = 58;
        if (R.d < P.d - 130)
            alvoV = 84;
        if (cego)
            alvoV = 74;
        R.v += Math.sign(alvoV - R.v) * 42 * dt;
        if (R.turbo > 0)
            R.v = Math.max(R.v, 112);
        R.v = Math.max(0, Math.min(116, R.v));
        const prox = obs.find(o => o.d > R.d && o.d - R.d < 34 && o.l === R.l && o.t !== 'turbo');
        if (prox && !prox.visto) {
            prox.visto = true;
            if (Math.random() < .82) {
                trocar(R, R.l === 0 ? 1 : R.l === 2 ? -1 : (Math.random() < .5 ? -1 : 1));
            }
        }
        [P, R].forEach(k => {
            k.d += k.v * dt;
            k.ly += (LY[k.l] - k.ly) * Math.min(1, dt * 10);
            obs.forEach(o => {
                if (o['h' + k.id] || Math.abs(LY[o.l] - k.ly) > 5 || Math.abs(o.d - k.d) > 5)
                    return;
                o['h' + k.id] = true;
                if (o.t === 'turbo') {
                    k.turbo = 2.2;
                    if (k === P) {
                        o.hp = true;
                        som.plim();
                        shake = 2;
                        bip(330, .25, .05, 'sawtooth');
                        setTimeout(() => bip(660, .2, .04, 'sawtooth'), 90);
                        $('kartMsg').textContent = 'TURBO!! 🔥';
                    }
                    else if (juntas && Math.random() < .5)
                        falar(ISI, 'TURBOOO!', 1000);
                }
                else {
                    k.v *= .3;
                    if (k === P) {
                        bip(90, .18, .06);
                        shake = 3;
                        $('kartMsg').textContent = pick(['Ai! Bateu!', 'Aaaah!', 'Quem colocou isso aí?!']);
                    }
                    else if (juntas && Math.random() < .6)
                        falar(ISI, pick(['NÃOOO', 'Ai, bati!', 'Foi sem querer!']), 1200);
                }
            });
        });
        if (!thoFeito && P.d > FIM * .42) {
            thoFeito = true;
            if (thoG && !S.gatos.tho.dormindo && thoG !== gatoPerto && thoG.estado !== 'oculto' && thoG.estado !== 'caos') {
                tho = { taps: 0, fora: false };
                thoG.x = 176;
                thoG.y = 124;
                thoG.estado = 'social';
                thoG.timer = 999;
                thoG.chegar = null;
                thoG.dir = 1;
                som.miau('tho', 1.1);
                $('kartMsg').innerHTML = `<b>O Tho deitou bem na frente da TV!</b><br><button class="btn" id="kTho" style="width:auto;margin:4px auto 0;padding:4px 12px">Tira o Tho! (0/4)</button>`;
                if (juntas)
                    setTimeout(() => falar(ISI, 'VANTAGEM MINHA! Valeu, Tho!', 1800), 300);
                $('kTho').onclick = () => {
                    tho.taps++;
                    som.pop();
                    if (tho.taps < 4) {
                        $('kTho').textContent = `Tira o Tho! (${tho.taps}/4)`;
                        falar(thoG, pick(['não.', '*se espreguiça*', 'mrrr?']), 800);
                        return;
                    }
                    tho.fora = true;
                    $('kartMsg').textContent = 'Ufa! Corre que dá tempo!';
                    thoG.timer = .1;
                    falar(thoG, 'Ok, ok. Fui.', 1200);
                    setTimeout(() => zoomies(thoG, 2), 500);
                };
            }
        }
        if (!fim && (P.d >= FIM || R.d >= FIM)) {
            fim = true;
            acabou(P.d >= R.d);
        }
    };
    const acabou = (venci) => {
        acel = false;
        bip(venci ? 660 : 220, .3, .06, 'triangle');
        if (venci)
            setTimeout(() => bip(880, .3, .06, 'triangle'), 180);
        $('kartMsg').innerHTML = venci ? `<b>🏆 Você venceu${juntas ? ` a ${NOME_MINHA}` : ''}!</b>` : `<b>${rival} ganhou...</b> ${tho ? '(culpa do Tho!)' : 'Revanche?'}`;
        if (juntas)
            setTimeout(() => falar(ISI, venci ? pick(['Revanche! AGORA!', 'Você roubou, eu vi!', 'Tá, você é boa nisso.']) : pick(['GANHEEEI!', 'Chora não, amor ♥', 'Mais uma? Te deixo ganhar...']), 2400), 300);
        if (!S.feitos.kart) {
            S.feitos.kart = true;
            ganhar(venci ? 3 : 1);
            salvar();
        }
        document.querySelector('.mg .lanes').innerHTML = '<button class="btn" id="kDeNovo" style="width:96px;margin:0;font-size:14px">Correr de novo</button><button class="btn branco" id="kSair" style="width:96px;margin:0;font-size:14px">Parar</button>';
        $('kDeNovo').onclick = jogoKart;
        $('kSair').onclick = fechar;
    };
    const desenhar = (t) => {
        const cam = P.d, SX = d => 32 + (d - cam);
        x.fillStyle = '#4f9a4c';
        x.fillRect(0, 0, 128, 72);
        for (let i = 0; i < 12; i++) {
            const gx = ((i * 23 - cam * .9) % 140 + 140) % 140 - 6;
            x.fillStyle = '#62b35c';
            x.fillRect(Math.round(gx), i % 2 ? 12 : 63, 4, 2);
        }
        x.fillStyle = '#55505f';
        x.fillRect(0, 16, 128, 46);
        for (let i = 0; i < 20; i++) {
            const kx = ((i * 8 - cam) % 160 + 160) % 160 - 8;
            x.fillStyle = i % 2 ? '#fff' : '#ff5c8d';
            x.fillRect(Math.round(kx), 15, 8, 2);
            x.fillRect(Math.round(kx), 61, 8, 2);
        }
        x.fillStyle = 'rgba(255,255,255,.55)';
        for (let i = 0; i < 12; i++) {
            const lx = ((i * 14 - cam) % 168 + 168) % 168 - 14;
            x.fillRect(Math.round(lx), 32, 7, 1);
            x.fillRect(Math.round(lx), 46, 7, 1);
        }
        const fx = SX(FIM);
        if (fx < 140)
            for (let yy = 16; yy < 62; yy += 3)
                for (let k = 0; k < 2; k++) {
                    x.fillStyle = ((yy / 3 + k) % 2) ? '#fff' : '#2a1d30';
                    x.fillRect(Math.round(fx) + k * 3, yy, 3, 3);
                }
        obs.forEach(o => {
            const sx = SX(o.d);
            if (sx < -8 || sx > 136)
                return;
            const y = LY[o.l], X = Math.round(sx);
            if (o.t === 'cone') {
                x.fillStyle = '#ff8a3d';
                x.fillRect(X - 1, y - 4, 3, 6);
                x.fillStyle = '#fff';
                x.fillRect(X - 1, y - 2, 3, 1);
                x.fillStyle = '#ff8a3d';
                x.fillRect(X - 3, y + 2, 7, 2);
            }
            else if (o.t === 'poca') {
                x.fillStyle = '#6fb6ff';
                x.fillRect(X - 4, y - 1, 9, 4);
                x.fillStyle = '#a9d6ff';
                x.fillRect(X - 2, y, 3, 1);
            }
            else if (o.t === 'novelo') {
                x.fillStyle = '#c95d8a';
                x.fillRect(X - 2, y - 2, 5, 5);
                x.fillStyle = '#ff9ec4';
                x.fillRect(X - 1, y - 1, 2, 1);
                x.fillRect(X + 2, y + 3, 4, 1);
            }
            else {
                x.fillStyle = o.hp ? '#8a7a40' : '#ffd36e';
                x.fillRect(X - 4, y - 3, 2, 2);
                x.fillRect(X - 2, y - 1, 2, 2);
                x.fillRect(X - 4, y + 1, 2, 2);
                x.fillRect(X + 1, y - 3, 2, 2);
                x.fillRect(X + 3, y - 1, 2, 2);
                x.fillRect(X + 1, y + 1, 2, 2);
            }
        });
        if (P.turbo > 0) {
            x.fillStyle = 'rgba(255,255,255,.55)';
            for (let i = 0; i < 7; i++) {
                const ly = 18 + ((i * 13 + Math.floor(cam * .7)) % 42), lx = ((i * 37 - cam * 3) % 150 + 150) % 150 - 10;
                x.fillRect(Math.round(lx), ly, 10 + i % 3 * 4, 1);
            }
        }
        [R, P].sort((a, b) => a.ly - b.ly).forEach(k => kart(k, SX(k.d)));
        if (P.turbo > 0 && Math.floor(t * 8) % 2) {
            x.fillStyle = '#ffd36e';
            x.font = 'bold 7px monospace';
            x.fillText('TURBO!', 48, 22);
        }
        x.fillStyle = '#2a1d30';
        x.fillRect(4, 2, 120, 9);
        x.fillStyle = '#3a3448';
        x.fillRect(5, 3, 118, 7);
        const bar = (k, yy) => { x.fillStyle = k.cor; x.fillRect(6, yy, Math.round(Math.min(1, k.d / FIM) * 116), 2); };
        bar(R, 4);
        bar(P, 7);
        x.fillStyle = '#fff';
        x.font = '5px monospace';
        if (t < 3.6) {
            const n = Math.ceil(3 - t);
            x.fillStyle = 'rgba(20,15,26,.5)';
            x.fillRect(48, 28, 32, 18);
            x.fillStyle = n > 0 ? '#ffd36e' : '#7cff6a';
            x.font = 'bold 12px monospace';
            x.fillText(n > 0 ? String(n) : 'VAI!', n > 0 ? 60 : 52, 41);
        }
        if (tho && !tho.fora) {
            const b = Math.round(Math.sin(t * 2) * 1);
            x.fillStyle = '#141018';
            x.fillRect(14, 40 + b, 100, 40);
            x.fillRect(30, 30 + b, 68, 20);
            x.fillRect(40, 18 + b, 40, 22);
            x.fillRect(40, 12 + b, 8, 8);
            x.fillRect(72, 12 + b, 8, 8);
            x.fillStyle = '#3a2f44';
            x.fillRect(42, 14 + b, 4, 4);
            x.fillRect(74, 14 + b, 4, 4);
            const pisca = Math.floor(t * 1.3) % 6 === 0;
            x.fillStyle = '#d6f27a';
            if (!pisca) {
                x.fillRect(48, 26 + b, 6, 5);
                x.fillRect(66, 26 + b, 6, 5);
                x.fillStyle = '#141018';
                x.fillRect(50, 26 + b, 2, 5);
                x.fillRect(68, 26 + b, 2, 5);
            }
            else {
                x.fillRect(48, 28 + b, 6, 1);
                x.fillRect(66, 28 + b, 6, 1);
            }
            x.fillStyle = '#ff9ec4';
            x.fillRect(59, 33 + b, 2, 1);
        }
    };
    const loop = (agora) => {
        if (!$('cvKart')) {
            removeEventListener('keydown', kd);
            removeEventListener('keyup', ku);
            tvLigada = false;
            if (tho && !tho.fora && thoG.estado === 'social') {
                thoG.timer = .1;
            }
            return;
        }
        const dt = Math.min(.05, (agora - ult) / 1000);
        ult = agora;
        const t = (agora - ini) / 1000;
        if (!fim)
            passo(dt, t);
        desenhar(t);
        raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
}
function imgTV() {
    return pinta(36, 26, (R) => {
        R(0, 15, 36, 11, COR.contorno);
        R(1, 16, 34, 9, '#8a6444');
        R(2, 17, 15, 7, '#6a4a32');
        R(19, 17, 15, 7, '#6a4a32');
        R(9, 20, 2, 1, '#c9a37a');
        R(26, 20, 2, 1, '#c9a37a');
        R(1, 16, 34, 1, '#a77c58');
        R(3, 0, 30, 15, COR.contorno);
        R(4, 1, 28, 12, '#3a3448');
        R(5, 2, 10, 1, '#4f4862');
        R(16, 13, 4, 2, COR.contorno);
        R(22, 11, 8, 3, '#2a1d30');
        R(24, 12, 1, 1, '#ff5c8d');
        R(27, 12, 1, 1, '#7cff6a');
    });
}
function desenharTV(c, o) {
    c.drawImage(o.img, o.x, o.y);
    if (!tvLigada && Math.floor(performance.now() / 2000) % 7)
        return;
    const t = performance.now() / 1000, X = o.x + 4, Y = o.y + 1;
    if (tvLigada) {
        c.fillStyle = '#4f9a4c';
        c.fillRect(X, Y, 28, 12);
        c.fillStyle = '#55505f';
        c.fillRect(X, Y + 3, 28, 7);
        c.fillStyle = '#fff';
        for (let i = 0; i < 4; i++) {
            const lx = X + ((i * 8 - Math.floor(t * 30)) % 28 + 28) % 28;
            c.fillRect(lx, Y + 6, 3, 1);
        }
        c.fillStyle = '#ff7aa8';
        c.fillRect(X + 8, Y + 4 + (Math.floor(t * 3) % 2), 4, 2);
        c.fillStyle = '#ffd36e';
        c.fillRect(X + 14, Y + 7, 4, 2);
        if (Math.random() < .04)
            particula('nota', o.x + 18, o.y - 2);
    }
    else {
        c.fillStyle = 'rgba(143,202,255,.25)';
        c.fillRect(X, Y, 28, 12);
    }
}
function dormirJuntas() {
    if (dormindoAgora || FEFE.pose !== 'cama' || modalAberto() || pertoAberto())
        return;
    dormindoAgora = true;
    const fd = $('fade');
    fd.style.transition = 'opacity 1.6s';
    falar(FEFE, ISI.aqui ? 'Boa noite, amor...' : 'Boa noite, gatinhos...', 1600);
    if (ISI.aqui)
        setTimeout(() => falar(ISI, 'Boa noite ♥ *abraça mais forte*', 1600), 600);
    som.ronrom(.18, 'lola');
    setTimeout(() => { fd.style.opacity = 1; }, 900);
    const s = pick(SONHOS);
    setTimeout(() => {
        abrir('💤 Sonhando...', `<div class="mg"><canvas id="cvSonho" width="128" height="80" style="display:block;margin:0 auto;height:min(calc(92vh - 175px),250px);width:auto;max-width:100%;image-rendering:pixelated"></canvas>
      <p style="font-style:italic;margin:6px 0 2px">${s.n}</p><button class="btn" id="btnAcordar" style="width:auto;margin:4px auto 0;display:none">Acordar ☀️</button></div>`, false);
        fd.style.opacity = 0;
        const cv = $('cvSonho'), x = cv.getContext('2d');
        x.imageSmoothingEnabled = false;
        const ini = performance.now();
        const nota = () => { if (AC) {
            const m = [72, 76, 79, 76, 74, 77, 81, 77][Math.floor((performance.now() - ini) / 700) % 8];
            tom(AC.currentTime, 440 * Math.pow(2, (m - 69) / 12), .6, .03, 'sine');
        } };
        const ti = setInterval(() => { if (!$('cvSonho'))
            return clearInterval(ti); nota(); }, 700);
        setTimeout(() => { const b = $('btnAcordar'); if (b) {
            b.style.display = 'block';
            b.onclick = () => acordar(s);
        } }, 4500);
        const lp = () => { if (!$('cvSonho')) {
            if (dormindoAgora)
                acordar(s, true);
            return;
        } s.f(x, (performance.now() - ini) / 1000); requestAnimationFrame(lp); };
        requestAnimationFrame(lp);
    }, 2600);
}
function acordar(s, jaFechou) {
    if (!dormindoAgora)
        return;
    dormindoAgora = false;
    if (!jaFechou)
        fechar();
    const fd = $('fade');
    fd.style.transition = 'opacity .8s';
    fd.style.opacity = 1;
    setTimeout(() => {
        fd.style.opacity = 0;
        fd.style.transition = '';
        gatos.forEach(g => { const st = S.gatos[g.id]; st.energia = lim(st.energia + 25); st.alegria = lim(st.alegria + 6); });
        if (AC) {
            [523, 659, 784].forEach((f, i) => tom(AC.currentTime + i * .15, f, .4, .05, 'triangle'));
        }
        falar(FEFE, ISI.aqui ? 'Bom dia, amor...' : 'Bom dia, gatinhos!', 2000);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, pick(['Bom dia, dorminhoca ♥', 'Você roncou. Fofíssimo.', 'Sonhei com você. De novo.', 'Mais 5 minutinhos...']), 2400), 1200);
        setTimeout(() => falar(FEFE, `Sonhei que ${s.conto}`, 3200), 3400);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, pick(['Que lindo! Sonha comigo de novo hoje', 'KKKK só você mesmo', 'Bem a nossa cara']), 2400), 6800);
        const na = gatos.filter(g => g.estado === 'na_cama');
        if (na.find(g => g.id === 'lola'))
            setTimeout(() => { falar(G('lola'), 'Café da manhã? Café da manhã?', 2000); som.miau('lola'); }, 2200);
        const th = G('tho');
        if (th.estado === 'na_cama')
            setTimeout(() => { falar(th, 'BOM DIA!!! *pula na sua cara*', 1800); som.miau('tho', 1.3); }, 4600);
        if (!S.feitos.sono) {
            S.feitos.sono = true;
            ganhar(2);
        }
        const m = marcos();
        m.sonhos = (m.sonhos || 0) + 1;
        if (m.sonhos === 1)
            setTimeout(() => toast('Primeira noite dormindo juntinhas no jogo ♥'), 1200);
        salvar();
    }, 900);
}
function travDe(id) { try {
    const g = gatos.find(q => q.id === id);
    return g && g.trav ? TRAVESSURAS[g.trav.id] : null;
}
catch (e) {
    return null;
} }
function desenharTrav(c2d, id, x, y) { const T = travDe(id); if (!T)
    return; c2d.drawImage(spr(T.g, T.cor, 'trv' + Object.keys(TRAVESSURAS).find(k => TRAVESSURAS[k] === T)), x + T.x, y + T.y); }
function travGrandeSVG(id) { const T = travDe(id); if (!T)
    return ''; const g = T.g.flatMap(r => { const l = [...r].map(c => c + c).join(''); return [l, l]; }); return rectsSVG(g.map(r => [...r]), T.cor, T.x * 2 + 3, T.y * 2 + 6); }
function vestirSozinho() {
    const cands = gatos.filter(g => !S.gatos[g.id].dormindo && !g.trav && g !== gatoPerto && ['parado', 'andando'].includes(g.estado));
    if (!cands.length)
        return;
    const peso = { tho: 3, lola: 1.2, clarinha: .5 };
    let tot = cands.reduce((a, g) => a + peso[g.id], 0), r = Math.random() * tot, g = cands[0];
    for (const c of cands) {
        r -= peso[c.id];
        if (r <= 0) {
            g = c;
            break;
        }
    }
    const k = pick(Object.keys(TRAVESSURAS));
    g.trav = { id: k, ate: performance.now() + 90000 };
    particula('poeira', g.x, g.y - 6, 3);
    som.pop();
    setTimeout(() => {
        if (!g.trav)
            return;
        falar(FEFE, FALA_TRAV[k](g.id), 2200);
        setTimeout(() => { if (g.trav) {
            falar(g, pick(RESP_TRAV[g.id]), 2000);
            som.miau(g.id, 1.1);
        } }, 1500);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, pick(['KKKKKK tira foto!', 'Eu não aguento esses gatos', 'Ficou perfeito']), 2000), 3200);
    }, 400);
}
function iniciarEsconde() {
    const tho = G('tho');
    if (esconde || MAPA !== 'quarto' || S.gatos.tho.dormindo)
        return;
    const off = n => (n && S.pos && S.pos[n]) || { dx: 0, dy: 0 };
    const lugares = ESCONDERIJOS.concat(tem('caixa') ? [{ n: 'na caixa', dono: 'caixa', x: 241, y: 224, hx: 252, hy: 213, achou: 'Na caixa, claro.' }] : []).map(l => { const o = off(l.dono); return Object.assign({}, l, { x: l.x + o.dx, y: l.y + o.dy, hx: l.hx + o.dx, hy: l.hy + o.dy }); });
    esconde = { tho, certo: pick(lugares), lugares, ate: 0, dica: 9 };
    FEFE.alvo = null;
    falar(tho, 'Conta até 5! Sem espiar!', 2000);
    som.miau('tho', 1.2);
    const fd = $('fade');
    fd.style.transition = 'opacity .5s';
    setTimeout(() => { fd.style.opacity = .88; tho.estado = 'oculto'; tho.chegar = null; tho.trav = null; }, 1300);
    [1, 2, 3, 4, 5].forEach((n, i) => setTimeout(() => { toast(n < 5 ? `🙈 ${n}...` : '🙈 5! Lá vou eu!'); if (AC)
        tom(AC.currentTime, n < 5 ? 440 : 660, .15, .05, 'triangle'); }, 1600 + i * 850));
    setTimeout(() => { fd.style.opacity = 0; comecarBusca(); }, 1600 + 5 * 850);
}
function comecarBusca() {
    if (!esconde)
        return;
    esconde.ate = performance.now() + 60000;
    esconde.lugares.forEach(l => PONTOS.push({ obj: 'esc', esconde: true, lugar: l, nome: 'Procurar ' + l.n, x: l.x, y: l.y, r: 24, peso: -8, acao: () => procurar(l) }));
    falar(FEFE, 'Cadê o Tho? Tenho 1 minuto!', 2000);
}
function procurar(l) {
    if (!esconde || !esconde.ate)
        return;
    if (l === esconde.certo)
        return fimEsconde(true);
    const i = PONTOS.findIndex(p => p.esconde && p.lugar === l);
    if (i >= 0)
        PONTOS.splice(i, 1);
    alvoAtual = null;
    som.pop();
    falar(FEFE, pick([`Nada ${l.n}...`, 'Hmm, não tá aqui.', 'Cadê esse gato?!', 'Só poeira aqui.']), 1600);
}
function fimEsconde(achou, cancelado) {
    const e = esconde;
    if (!e)
        return;
    esconde = null;
    for (let i = PONTOS.length - 1; i >= 0; i--)
        if (PONTOS[i].esconde)
            PONTOS.splice(i, 1);
    alvoAtual = null;
    const tho = e.tho, c = e.certo;
    tho.x = c.x + (c.x > 176 ? -10 : 10);
    tho.y = c.y + 4;
    if (bloqueado(tho.x, tho.y, 6)) {
        [tho.x, tho.y] = pontoLivre();
    }
    tho.estado = 'parado';
    tho.timer = 4;
    $('fade').style.opacity = 0;
    if (cancelado)
        return;
    if (achou) {
        som.miau('tho', 1.3);
        particula('coracao', tho.x, tho.y - 16, 4);
        mostrarHumor(tho, 'feliz', 4000);
        falar(FEFE, 'ACHOU! ' + c.achou, 2400);
        setTimeout(() => falar(tho, pick(['ACHOU?! Não vale!', 'Tá, você é boa nisso.', 'Mais uma! MAIS UMA!']), 2200), 1300);
        S.gatos.tho.alegria = lim(S.gatos.tho.alegria + 15);
        if (!S.feitos.esconde) {
            S.feitos.esconde = true;
            ganhar(2);
        }
        const m = marcos();
        if (!m.esconde) {
            m.esconde = true;
            setTimeout(() => toast('Achou o Tho pela primeira vez! 🐈‍⬛'), 1800);
        }
        if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Ele tava se achando o ninja', 2000), 3400);
    }
    else {
        som.miau('tho', 1.15);
        falar(tho, `Desistiu? Eu tava ${c.n} o tempo todo!`, 2600);
        setTimeout(() => falar(FEFE, 'Ele é bom nisso...', 1800), 1800);
        setTimeout(() => zoomies(tho, 2), 2600);
    }
    salvar();
}
function alvoCaos(t) { let melhor = null; for (let k = 0; k < 12; k++) {
    const [x, y] = pontoLivre(), d = Math.hypot(x - t.x, y - t.y);
    if (d < 30)
        continue;
    let ok = true;
    for (let s = 6; s < d; s += 5) {
        if (bloqueado(t.x + (x - t.x) * s / d, t.y + (y - t.y) * s / d, 6)) {
            ok = false;
            break;
        }
    }
    if (ok)
        return [x, y];
    if (!melhor)
        melhor = [x, y];
} return melhor || pontoLivre(); }
function tapTho(g) {
    const agora = performance.now();
    if (caosAte > agora) {
        falar(g, pick(['NÃO DÁ PRA ME PEGAR!', 'VRUUUM', 'MIAAAAU']), 900);
        return true;
    }
    if (esconde)
        return false;
    thoTaps = thoTaps.filter(t => agora - t < 6000);
    thoTaps.push(agora);
    const n = thoTaps.length;
    if (n >= 8) {
        thoTaps = [];
        FEFE.alvo = null;
        modoCaos(g);
        return true;
    }
    if (n === 2) {
        FEFE.alvo = null;
        falar(g, 'hm?', 700);
        return true;
    }
    if (n === 1) {
        if (!S.gatos.tho.dormindo && ['andando', 'perseguindo', 'fugindo', 'parado', 'laser'].includes(g.estado)) {
            g.estado = 'parado';
            g.chegar = null;
            g.tx = null;
            g.timer = Math.max(g.timer || 0, 5);
        }
        FEFE.alvo = { g, x: g.x, y: g.y, raio: 16, t: 0, cb: () => { virarPara(g.x, g.y - 4); setTimeout(() => { if (thoTaps.length <= 1 && !bloqueioTela() && g.estado !== 'caos')
                chegarNoGato(g); }, 420); } };
        return true;
    }
    if (n >= 3) {
        FEFE.alvo = null;
        const F = ['?', '?!', 'hm?', 'para...', 'PARA', 'tô avisando...', 'vou surtar', 'EU VOU SURTAR'];
        falar(g, F[Math.min(F.length - 1, n - 3)], 800);
        som.miau('tho', 1 + n * .03);
        mostrarHumor(g, n > 6 ? 'bravo' : 'feliz', 1200);
        if (g.estado === 'andando' || g.estado === 'parado') {
            g.estado = 'parado';
            g.timer = 3;
        }
        return true;
    }
    return false;
}
function modoCaos(g) {
    S.gatos.tho.dormindo = false;
    caosAte = performance.now() + 12000;
    g.estado = 'caos';
    g.chegar = null;
    g.vel = 140;
    g.tx = null;
    g.trav = null;
    g.alt = 0;
    g.pose24 = null;
    falar(g, 'MODO CAOS ATIVADO!!!', 1800);
    som.miau('tho', 1.45);
    shake = 6;
    setTimeout(() => falar(FEFE, 'Ai não. AI NÃO.', 1600), 900);
    if (ISI.aqui)
        setTimeout(() => falar(ISI, pick(['Corre que ele surtou!', 'KKKKKKKK', 'Tô filmando!!']), 1800), 1800);
    gatos.forEach(o => {
        if (o === g || S.gatos[o.id].dormindo || o === gatoPerto || ['na_cama', 'colo', 'na_rede', 'escondido'].includes(o.estado))
            return;
        o.estado = 'fugindo';
        o.par = g;
        o.timer = 11;
        o.tx = null;
        o.chegar = null;
        falar(o, o.id === 'lola' ? 'SOCORRO!' : '...de novo não.', 1400);
    });
}
function fimCaos(tho) {
    tho.estado = 'parado';
    tho.timer = 4;
    tho.tx = null;
    tho.vel = 30;
    caosAte = 0;
    shake = 0;
    if (MAPA !== 'quarto')
        return;
    falar(tho, 'Fui eu. E daí?', 2600);
    setTimeout(() => falar(FEFE, pick(['Meu quarto...', 'Eu te amo, mas QUE ISSO.', 'Respira, Fefe. Respira.']), 2200), 1700);
    S.gatos.tho.alegria = lim(S.gatos.tho.alegria + 20);
    const m = marcos();
    if (!m.caos) {
        m.caos = true;
        ganhar(3);
        setTimeout(() => toast('Conquista: sobreviveu ao modo Tho caótico! 🌪️'), 2400);
    }
    salvar();
}
function atualizarExtras(dt) {
    const agora = performance.now();
    const vis = MAPA === 'quarto' && FEFE.pose === 'cama' && !dormindoAgora && !bloqueioTela();
    if ((btnDormir.style.display === 'block') !== vis) {
        btnDormir.style.display = vis ? 'block' : 'none';
        btnDormir.textContent = ISI.aqui ? '💤 Dormir juntinhas' : '💤 Dormir';
    }
    if (shake > 0)
        shake = Math.max(0, shake - dt * 7);
    const tho = G('tho');
    if (!tho)
        return;
    if (tho.estado === 'caos') {
        if (MAPA !== 'quarto' || agora > caosAte)
            fimCaos(tho);
        else if (tho !== gatoPerto) {
            shake = Math.max(shake, 1.2);
            if (tho.tx == null || Math.hypot(tho.tx - tho.x, tho.ty - tho.y) < 4) {
                [tho.tx, tho.ty] = alvoCaos(tho);
                tho.melD = 1e9;
                tho.semProg = 0;
                if (Math.random() < .45) {
                    som.crash();
                    shake = Math.max(shake, 5);
                    particula(pick(['caco', 'folha', 'poeira']), tho.x, tho.y - 8, 3);
                }
                else
                    som.miau('tho', 1.25 + Math.random() * .35);
                if (Math.random() < .3)
                    falar(tho, pick(['VRUUUM', '!!!', 'MIAAAU', '*derruba tudo*', 'PARKOUR!']), 700);
            }
            const dx = tho.tx - tho.x, dy = tho.ty - tho.y, d = Math.hypot(dx, dy) || 1, v = 140 * dt, nx = tho.x + dx / d * v, ny = tho.y + dy / d * v;
            let mov = false;
            const preso = bloqueado(tho.x, tho.y, 6);
            if (preso || !bloqueado(nx, tho.y, 6)) {
                tho.x = nx;
                mov = true;
            }
            if (preso || !bloqueado(tho.x, ny, 6)) {
                tho.y = ny;
                mov = true;
            }
            if (!mov) {
                tho.tx = null;
                tho.presoT = (tho.presoT || 0) + dt;
                if (tho.presoT > .4) {
                    const [px, py] = pontoLivre();
                    tho.x = px;
                    tho.y = py;
                    tho.presoT = 0;
                    particula('poeira', px, py - 4, 4);
                }
            }
            else
                tho.presoT = 0;
            if (tho.tx != null) {
                const dd = Math.hypot(tho.tx - tho.x, tho.ty - tho.y);
                if (dd < (tho.melD || 1e9) - .8) {
                    tho.melD = dd;
                    tho.semProg = 0;
                }
                else {
                    tho.semProg = (tho.semProg || 0) + dt;
                    if (tho.semProg > .25) {
                        tho.tx = null;
                        tho.semProg = 0;
                    }
                }
            }
            if (Math.abs(dx) > .5)
                tho.dir = dx > 0 ? 1 : -1;
            if (Math.random() < dt * 8)
                particula('poeira', tho.x, tho.y - 2);
        }
    }
    if (esconde && esconde.ate) {
        if (MAPA !== 'quarto')
            fimEsconde(false, true);
        else if (agora > esconde.ate)
            fimEsconde(false);
        else {
            esconde.dica -= dt;
            if (esconde.dica <= 0) {
                esconde.dica = 9;
                const c = esconde.certo, d = Math.hypot(c.x - FEFE.x, c.y - FEFE.y);
                som.miau('tho', .95);
                falar(FEFE, d < 70 ? 'Ouvi um miado pertinho...' : d < 150 ? 'O miado veio mais ou menos daqui...' : 'Esse miado tá longe...', 1800);
                const rest = Math.ceil((esconde.ate - agora) / 1000);
                if (rest <= 30 && !esconde.aviso) {
                    esconde.aviso = true;
                    toast(`⏳ ${rest}s pra achar o Tho!`);
                }
            }
        }
    }
    if (MAPA === 'quarto' && !esconde && tho.estado !== 'caos') {
        travT -= dt;
        if (travT <= 0) {
            travT = 55 + Math.random() * 50;
            vestirSozinho();
        }
    }
    gatos.forEach(g => { if (g.trav && agora > g.trav.ate && g !== gatoPerto)
        g.trav = null; });
}
function extrasDesenho(lista) {
    if (esconde && esconde.ate && (performance.now() % 4200) < 1300) {
        const c = esconde.certo, cor = GATOS.tho.cor, fr = Math.floor(performance.now() / 300) % 2;
        lista.push({ b: c.hy + 1, f: () => ctx.drawImage(spr(RABO_G[fr], { O: cor.O, T: cor.T }, 'rtho' + fr), c.hx - 3, c.hy - 7) });
    }
}
function acaoExtra(a) {
    const g = gatoPerto;
    if (!g)
        return;
    if (a === 'tirar' && g.trav) {
        const T = TRAVESSURAS[g.trav.id];
        g.trav = null;
        renderGatoPerto();
        som.pop();
        montarPainelPerto();
        falarPerto(g.id === 'tho' ? 'Ei! Era meu chapéu!' : g.id === 'lola' ? 'Ahh, eu tava linda...' : 'Finalmente.');
        toast(`Você tirou ${T.n}`);
        return;
    }
    if (a === 'esconde') {
        fecharPerto('ok');
        setTimeout(iniciarEsconde, 350);
    }
}
