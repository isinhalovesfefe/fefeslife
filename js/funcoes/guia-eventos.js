function abrirGuia() {
    let tot = 0, ok = 0;
    const html = GUIA.map(s => `<div style="margin:0 0 10px"><b style="font-size:14px">${s.g}</b>${s.itens.map(([t, d, f]) => {
        const v = !!f();
        tot++;
        if (v)
            ok++;
        return `<div style="display:flex;gap:8px;align-items:flex-start;padding:6px 2px;border-bottom:2px dashed #f0dbe4"><span style="font-size:15px;width:18px;flex:none">${v ? '✅' : '⬜'}</span><span><span style="${v ? 'opacity:.6;text-decoration:line-through' : ''}">${esc(t)}</span><br><small style="opacity:.7">${v ? 'Feito!' : esc(d)}</small></span></div>`;
    }).join('')}</div>`).join('');
    abrir(`Coisas pra descobrir · ${ok}/${tot}`, `<div style="font-size:13px">${html}</div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn branco" id="guiaTuto" style="width:auto;margin:0">Ver o tutorial de novo</button></div>`, true, true);
    $('guiaTuto').onclick = () => { fechar(); iniciarTutorial(); };
}
function desenharEstrelinhas(lista) {
    if (!tem('estrelinhas') || MAPA !== 'quarto')
        return;
    const pos = [[100, 8], [230, 4], [300, 30], [150, 30], [6, 10]];
    lista.push({ b: -0.35, f: () => {
            const t = performance.now() / 1000, brilha = luzModo > 0;
            pos.forEach(([x, y], i) => { ctx.globalAlpha = brilha ? .95 : .55; ctx.drawImage(IMG_DECOR.estrelinhas, x, y); });
            ctx.globalAlpha = 1;
        } });
}
function estrelinhasNoEscuro() {
    if (!tem('estrelinhas') || MAPA !== 'quarto' || !luzModo)
        return;
    const pos = [[100, 8], [230, 4], [300, 30], [150, 30], [6, 10]], t = performance.now() / 1000;
    ctx.globalCompositeOperation = 'lighter';
    pos.forEach(([x, y], i) => { const a = .55 + .35 * Math.sin(t * 1.5 + i); ctx.globalAlpha = a; ctx.drawImage(IMG_DECOR.estrelinhas, x, y); const g = ctx.createRadialGradient(x + 15, y + 7, 0, x + 15, y + 7, 18); g.addColorStop(0, 'rgba(220,255,160,.12)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - 4, y - 10, 38, 34); });
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
}
function necIsi(k, v) { const N = S.isiNec || (S.isiNec = { fome: 80, sono: 80, carinho: 70 }); N[k] = lim((N[k] || 0) + v); }
function atualizarNecIsi(dt) {
    const N = S.isiNec || (S.isiNec = { fome: 80, sono: 80, carinho: 70 });
    if (ISI.aqui && !isiAqui0) {
        const noite = ehNoite24();
        N.fome = lim(55 + Math.random() * 35);
        N.sono = lim((noite ? 40 : 65) + Math.random() * 25);
        N.carinho = lim(50 + Math.random() * 25);
        isiPedeT = 40 + Math.random() * 30;
    }
    isiAqui0 = ISI.aqui;
    const vis = ISI.aqui && !MAPA.startsWith('mem_') && painelNec.style.display !== 'none' && !S.necMini;
    if ((painelIsi.style.display !== 'none') !== vis)
        painelIsi.style.display = vis ? 'flex' : 'none';
    if (!ISI.aqui)
        return;
    NEC_ISI.forEach(n => { N[n.k] = lim(N[n.k] - n.cai * dt / 3600); });
    if (ISI.pose === 'cama' && FEFE.pose === 'cama')
        necIsi('sono', .6 * dt);
    if (ISI.pose === 'colo')
        necIsi('carinho', .25 * dt);
    if (cafuneEst && cafuneEst.dormiu && !cafuneDormiuVisto) {
        cafuneDormiuVisto = true;
        necIsi('sono', 60);
        necIsi('carinho', 30);
    }
    if (!cafuneEst)
        cafuneDormiuVisto = false;
    if (tvLigada)
        necIsi('carinho', .05 * dt);
    necIsiUI -= dt;
    if (necIsiUI <= 0) {
        necIsiUI = 1;
        painelIsi.style.top = (painelNec.offsetTop + painelNec.offsetHeight + 8) + 'px';
        NEC_ISI.forEach(n => { const b = $('necI_' + n.k); if (b)
            b.innerHTML = segs(N[n.k], N[n.k] < 20 ? '#e8434f' : n.cor); });
    }
    if (bloqueioTela() || ISI.pose || ISI.estado !== 'seguindo')
        return;
    isiPedeT -= dt;
    if (isiPedeT > 0)
        return;
    isiPedeT = 55 + Math.random() * 40;
    const baixo = NEC_ISI.filter(n => N[n.k] < 30).sort((a, b) => N[a.k] - N[b.k])[0];
    if (baixo) {
        falar(ISI, pick(PEDE_ISI[baixo.k]), 3000);
        toast(baixo.k === 'fome' ? 'Dica: peça comida e dê na boquinha dela 🥄' : baixo.k === 'sono' ? 'Dica: cafuné no colo ou deitar juntas na cama 💤' : 'Dica: fale com ela e dê um abraço 🤗');
    }
}
function atualizarEventos(dt) {
    if (faltaLuz) {
        faltaLuz.t -= dt;
        if (faltaLuz.t <= 0 || MAPA !== 'quarto') {
            const p = faltaLuz.prev;
            faltaLuz = null;
            setLuz(ehNoite24() ? p : 0);
            falar(FEFE, 'Voltou a luz! 🎉', 1800);
            const th = G('tho');
            if (th && !S.gatos.tho.dormindo)
                setTimeout(() => falar(th, 'eu que consertei', 1600), 900);
        }
    }
    if (trem) {
        trem.t -= dt;
        if (trem.t <= 0 || MAPA !== 'quarto') {
            gatos.forEach(g => { if (g.trem) {
                g.trem = false;
                g.estado = 'parado';
                g.timer = 3;
            } });
            trem = null;
        }
    }
    if (passarinho) {
        passarinho.t -= dt;
        if (passarinho.t <= 0 || MAPA !== 'quarto') {
            passarinho = null;
        }
    }
    if (MAPA !== 'quarto' || bloqueioTela() || montando || esconde || faltaLuz || trem || passarinho || encomenda)
        return;
    eventoT -= dt;
    if (eventoT > 0)
        return;
    eventoT = 720 + Math.random() * 900;
    const op = ['encomenda', 'luz', 'trem', 'montinho', 'passarinho'];
    const ev = pick(op);
    if (ev === 'encomenda')
        chegaEncomenda();
    else if (ev === 'luz')
        acabaLuz();
    else if (ev === 'trem')
        trenzinho();
    else if (ev === 'montinho')
        montinhoGatos();
    else
        visitaPassarinho();
}
function chegaEncomenda() {
    if (AC) {
        tom(AC.currentTime, 660, .25, .06, 'sine');
        tom(AC.currentTime + .3, 520, .35, .06, 'sine');
    }
    toast('Ding-dong! Chegou uma encomenda 📦');
    falar(FEFE, 'Encomenda? Eu não pedi nada...', 2000);
    const img = pinta(14, 12, (R) => { R(0, 2, 14, 10, '#2a1d30'); R(1, 3, 12, 8, '#c9925a'); R(1, 3, 12, 2, '#e0b07a'); R(6, 3, 2, 8, '#e8d6a0'); R(4, 0, 6, 3, '#2a1d30'); R(5, 1, 4, 1, '#ff7aa8'); });
    encomenda = {};
    OBJ.push({ nome: 'encomenda', semSombra: false, x: 169, y: 200, img, base: 212 });
    PONTOS.push({ obj: 'encomenda', nome: 'Abrir a encomenda 📦', x: 176, y: 220, acao: abrirEncomenda });
    const t = G('tho');
    if (t && !S.gatos.tho.dormindo)
        setTimeout(() => irPara(t, 186, 210, () => { t.estado = 'parado'; t.timer = 6; falar(t, 'CAIXA. MINHA CAIXA.', 1600); }, 60), 1500);
}
function abrirEncomenda() {
    for (let i = OBJ.length - 1; i >= 0; i--)
        if (OBJ[i].nome === 'encomenda')
            OBJ.splice(i, 1);
    for (let i = PONTOS.length - 1; i >= 0; i--)
        if (PONTOS[i].obj === 'encomenda')
            PONTOS.splice(i, 1);
    alvoAtual = null;
    encomenda = null;
    const falta = LOJA.filter(it => !tem(it.id) && it.preco <= 40 && it.aba !== 'brinq');
    let txt, ic = '🎁';
    if (falta.length && Math.random() < .65) {
        const it = pick(falta);
        S.compras.push(it.id);
        if (it.aba === 'decor')
            construirDecor();
        txt = `Veio um presente: <b>${esc(it.n)}</b>! Já tá ${it.aba === 'decor' ? 'no quarto' : it.aba === 'roupas' ? 'no guarda-roupa' : 'na lojinha, é só usar'}.`;
    }
    else {
        const n = 8 + Math.floor(Math.random() * 10);
        ganhar(n);
        txt = `Veio uma caixinha cheia de corações: <b>+${n}</b> ♥`;
        ic = '💝';
    }
    som.plim();
    salvar();
    abrir('Encomenda 📦', `<div style="text-align:center"><div style="font-size:40px">${ic}</div><p>${txt}</p><p style="font-size:12px;opacity:.7">Tinha um bilhete: "Com amor, ${esc(NOME_MINHA)} ♥"</p></div>`, true);
    const t = G('tho');
    if (t)
        setTimeout(() => falar(t, 'a caixa vazia é minha né', 1800), 1200);
}
function acabaLuz() {
    faltaLuz = { t: 30, prev: luzModo };
    luzModo = 2;
    luzApagada = true;
    btnLuz.textContent = TXT_LUZ[2];
    if (AC)
        tom(AC.currentTime, 200, .25, .06, 'square', 90);
    shake = Math.max(shake, 2);
    falar(FEFE, 'Ih! Acabou a luz!', 2000);
    setTimeout(() => { const t = G('tho'); if (t && !S.gatos.tho.dormindo)
        falar(t, 'QUEM APAGOU O SOL?!', 1800); }, 900);
    setTimeout(() => { const c = G('clarinha'); if (c && !S.gatos.clarinha.dormindo)
        pensar(c, 'finalmente, paz.', 1800); }, 2200);
}
function trenzinho() {
    const vivos = gatos.filter(g => !S.gatos[g.id].dormindo && g !== gatoPerto && !['oculto', 'escondido', 'colo', 'na_cama'].includes(g.estado));
    if (vivos.length < 2)
        return;
    trem = { t: 14 };
    toast('Trenzinho de gatos! 🚂');
    falar(G('tho') || vivos[0], 'PIUIII! TRENZINHO!', 1600);
    vivos.forEach((g, i) => { g.trem = true; g.tremI = (CAMINHO_TREM.length - i) % CAMINHO_TREM.length; const vai = () => { if (!trem || !g.trem)
        return; g.tremI = (g.tremI + 1) % CAMINHO_TREM.length; const [x, y] = CAMINHO_TREM[g.tremI]; irPara(g, x, y, vai, 62); }; setTimeout(vai, i * 450); });
    const c = G('clarinha');
    if (c && vivos.includes(c))
        setTimeout(() => pensar(c, '...só dessa vez.', 1800), 1500);
}
function montinhoGatos() {
    const vivos = gatos.filter(g => !S.gatos[g.id].dormindo && g !== gatoPerto && !['oculto', 'escondido', 'colo', 'na_cama'].includes(g.estado));
    if (vivos.length < 3)
        return trenzinho();
    const [x, y] = [176, 150];
    const ord = ['lola', 'clarinha', 'tho'].map(id => G(id));
    toast('Os gatos fizeram um montinho! 🐱🐱🐱');
    ord.forEach((g, i) => { g.x = x; g.y = y + .1 * i; g.estado = 'parado'; g.timer = 14; g.alt = i * 9; g.dir = 1; particula('poeira', x, y, 2); });
    falar(ord[2], 'eu sou o chapéu', 1800);
    setTimeout(() => { ord.forEach(o => o.alt = 0); }, 14000);
    setTimeout(() => falar(G('lola'), 'tá pesado aqui embaixo', 1600), 3500);
}
function visitaPassarinho() {
    passarinho = { t: 22, x: 243, y: 26 };
    toast('Um passarinho pousou na janela 🐦');
    gatos.forEach((g, i) => { if (S.gatos[g.id].dormindo || g === gatoPerto)
        return; setTimeout(() => irPara(g, 236 + i * 7, 70, () => { g.estado = 'parado'; g.timer = 12; g.dir = 1; falar(g, pick(['ekekekek', '*treme o bigode*', 'eu vou pegar ele', 'ek ek ek!']), 1600); }, 40), i * 400); });
}
function desenharEventos(lista) {
    if (MAPA !== 'quarto')
        return;
    if (passarinho)
        lista.push({ b: -0.1, f: () => {
                const t = performance.now() / 1000, x = Math.round(passarinho.x + Math.sin(t * .7) * 3), y = passarinho.y, p = Math.floor(t * 4) % 5 === 0;
                ctx.fillStyle = '#2a1d30';
                ctx.fillRect(x - 1, y - 1, 8, 6);
                ctx.fillStyle = '#8fb7ff';
                ctx.fillRect(x, y, 6, 4);
                ctx.fillStyle = '#ffd36e';
                ctx.fillRect(x + 6, y + (p ? 2 : 1), 2, 1);
                ctx.fillStyle = '#2a1d30';
                ctx.fillRect(x + 4, y + 1, 1, 1);
                ctx.fillStyle = '#5b7fd0';
                ctx.fillRect(x + 1, y + 2, 3, 2);
                ctx.fillStyle = '#ffb36b';
                ctx.fillRect(x + 2, y + 4, 1, 2);
                ctx.fillRect(x + 4, y + 4, 1, 2);
            } });
}
function ehAniversario() { const de = dataEspecial(); return de && de.id === 'aniversario'; }
function atualizarFesta(dt) {
    if (!ehAniversario() || MAPA !== 'quarto') {
        festaT = null;
        return;
    }
    const ano = agoraJogo().getFullYear();
    S.festa = S.festa || {};
    if (S.festa[ano] || festaRodando || bloqueioTela())
        return;
    if (festaT === null)
        festaT = 6;
    festaT -= dt;
    if (festaT > 0)
        return;
    festaRodando = true;
    if (!ISI.aqui) {
        chamarIsinhaEmCasa();
    }
    const espera = setInterval(() => {
        if (MAPA !== 'quarto') {
            clearInterval(espera);
            festaRodando = false;
            festaT = null;
            return;
        }
        if (ISI.aqui && ISI.estado === 'seguindo' && !bloqueioTela()) {
            clearInterval(espera);
            setTimeout(festaBolo, 1200);
            falar(ISI, `SURPRESA!!! Feliz aniversário, ${NOME_DELA}! 🎉`, 2600);
            gatos.forEach((g, i) => { if (!S.gatos[g.id].dormindo)
                setTimeout(() => { falar(g, g.id === 'tho' ? 'PARABÉNS!!! (tem bolo?)' : g.id === 'lola' ? 'feliz aniversário, mãe ♥' : '...parabéns. de verdade.', 2000); som.miau(g.id, 1.1); }, 700 + i * 700); });
        }
    }, 500);
}
function tocarParabens() {
    if (!audio())
        return;
    const t0 = AC.currentTime + .1, b = .32;
    const N = { G4: 392, A4: 440, B4: 494, C5: 523, D5: 587, E5: 659, F5: 698, G5: 784 };
    const mus = [['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2], ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2], ['G4', .75], ['G4', .25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2], ['F5', .75], ['F5', .25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2]];
    let t = t0;
    mus.forEach(([n, d]) => { tom(t, N[n], d * b * .95, .07, 'triangle'); t += d * b; });
}
function festaBolo() {
    const W = 96, H = 64;
    let velas = [true, true, true], confete = [], soprou = false;
    abrir(`Feliz aniversário, ${NOME_DELA}! 🎂`, `<div class="mg">${cvPx('cvBolo', W, H)}<p id="boloMsg" style="margin:6px 0;min-height:20px">Faça um pedido e assopre as velinhas!</p>
    <button class="grande" id="btnSopra">🌬️ Assoprar</button><div id="boloCarta"></div></div>`, false, true);
    const cv = $('cvBolo'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    $('btnSopra').onclick = () => {
        const i = velas.indexOf(true);
        if (i < 0)
            return;
        velas[i] = false;
        som.pop();
        if (AC)
            ruidoCurto(AC.currentTime, .25, 'lowpass', 900, .35);
        if (velas.every(v => !v)) {
            soprou = true;
            $('btnSopra').style.display = 'none';
            for (let k = 0; k < 70; k++)
                confete.push({ x: Math.random() * W, y: -Math.random() * 40, vy: 15 + Math.random() * 25, vx: Math.random() * 10 - 5, c: pick(['#ff7aa8', '#ffd36e', '#8fcaff', '#7bd389', '#c08cff', '#fff']) });
            $('boloMsg').textContent = '🎉🎉🎉';
            tocarParabens();
            ganhar(10);
            primeiraVez('festa', 0);
            S.festa[agoraJogo().getFullYear()] = true;
            salvar();
            nec('diversao', 40);
            nec('social', 40);
            necIsi('carinho', 40);
            setTimeout(() => { const c = $('boloCarta'); if (!c)
                return; c.innerHTML = `<div style="background:#fff6fa;box-shadow:0 0 0 3px #2a1d30;padding:12px 14px;margin:10px auto 0;max-width:420px;text-align:left;white-space:pre-wrap;font-size:14px;line-height:1.45">${esc(MENSAGENS_DATAS.aniversario)}\n\n<span style="opacity:.7">— ${esc(NOME_MINHA)} ♥</span></div><button class="btn" data-fechar style="width:auto;margin:10px auto 0">Fechar</button>`; }, 9500);
        }
    };
    let ult = performance.now();
    const lp = () => {
        if (!modalVivo('cvBolo')) {
            festaRodando = false;
            return;
        }
        requestAnimationFrame(lp);
        const ag = performance.now(), dt = Math.min(.1, (ag - ult) / 1000);
        ult = ag;
        x.fillStyle = '#ffe3ec';
        x.fillRect(0, 0, W, H);
        x.fillStyle = '#f3c1d3';
        x.fillRect(0, 44, W, 20);
        for (let i = 0; i < W; i += 8) {
            x.fillStyle = ['#ff7aa8', '#ffd36e', '#8fcaff', '#7bd389'][(i / 8) % 4];
            x.fillRect(i + 1, 2, 5, 3);
            x.fillRect(i + 2, 5, 3, 2);
            x.fillRect(i + 3, 7, 1, 1);
        }
        x.fillStyle = '#4a3a30';
        x.fillRect(0, 1, W, 1);
        x.fillStyle = '#2a1d30';
        x.fillRect(22, 50, 52, 4);
        x.fillStyle = '#fff';
        x.fillRect(23, 50, 50, 3);
        x.fillStyle = '#2a1d30';
        x.fillRect(27, 30, 42, 21);
        x.fillStyle = '#ffd6e6';
        x.fillRect(28, 31, 40, 19);
        x.fillStyle = '#ff9ec4';
        x.fillRect(28, 31, 40, 5);
        for (let i = 28; i < 68; i += 4)
            x.fillRect(i, 36, 2, 2);
        x.fillStyle = '#8a5a3a';
        x.fillRect(28, 42, 40, 2);
        x.fillStyle = '#fff';
        [[32, 39], [44, 46], [56, 40], [63, 47]].forEach(([a, b]) => x.fillRect(a, b, 1, 1));
        coracaoPx(x, '#ff5c8d', 45, 38, 1);
        [36, 48, 60].forEach((vx, i) => {
            x.fillStyle = '#2a1d30';
            x.fillRect(vx - 1, 21, 4, 10);
            x.fillStyle = ['#8fcaff', '#ffd36e', '#7bd389'][i];
            x.fillRect(vx, 22, 2, 9);
            x.fillStyle = '#fff';
            x.fillRect(vx, 24, 2, 1);
            x.fillRect(vx, 27, 2, 1);
            if (velas[i]) {
                const f = Math.floor(ag / 120 + i) % 2;
                x.fillStyle = '#ffb52e';
                x.fillRect(vx, 17 + f, 2, 4 - f);
                x.fillStyle = '#fff6c8';
                x.fillRect(vx, 19, 2, 2);
            }
            else if (!soprou || ag % 2000 < 1200) {
                x.fillStyle = 'rgba(200,200,210,.6)';
                x.fillRect(vx + Math.round(Math.sin(ag / 200 + i)), 14, 1, 4);
            }
        });
        gatoPequeno(x, 'lola', 'feliz', 4, 36);
        gatoPequeno(x, 'tho', 'feliz', 78, 36);
        gatoPequeno(x, 'clarinha', 'normal', 84, 22);
        confete = confete.filter(c => c.y < H + 4);
        confete.forEach(c => { c.y += c.vy * dt; c.x += c.vx * dt + Math.sin(c.y / 6) * .3; x.fillStyle = c.c; x.fillRect(Math.round(c.x), Math.round(c.y), 2, 1); });
        if (soprou && confete.length < 30 && Math.random() < .3)
            confete.push({ x: Math.random() * W, y: -2, vy: 15 + Math.random() * 25, vx: Math.random() * 10 - 5, c: pick(['#ff7aa8', '#ffd36e', '#8fcaff', '#7bd389', '#c08cff', '#fff']) });
    };
    requestAnimationFrame(lp);
}
function atualizarExtras33(dt) { atualizarNecIsi(dt); atualizarEventos(dt); atualizarFesta(dt); }
function extrasDesenho33(lista) { desenharEstrelinhas(lista); desenharEventos(lista); }
