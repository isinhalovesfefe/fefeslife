function botaoFlutuante(id, txt) {
    const b = document.createElement('button');
    b.id = id;
    b.textContent = txt;
    b.style.cssText = btnLaser.style.cssText;
    b.style.display = 'none';
    document.body.appendChild(b);
    b.onpointerdown = e => e.stopPropagation();
    return b;
}
function empilharBotoes() {
    const livre = MAPA === 'quarto' && !bloqueioTela() && !montando && !esconde;
    const vis = {
        btnLaser: btnLaser.style.display === 'block',
        btnCamera: livre && tem('camera'),
        btnLuz: livre && (ehNoite24() || luzModo > 0),
        btnJanela: livre && (estaChovendo() || janelaAberta)
    };
    let i = 0;
    [btnLaser, btnCamera, btnLuz, btnJanela].forEach(b => { const v = vis[b.id]; if (b !== btnLaser)
        b.style.display = v ? 'block' : 'none'; if (v) {
        b.style.bottom = (44 + i * 42) + 'px';
        i++;
    } });
}
function escolherTV() {
    if (MAPA !== 'quarto')
        return;
    abrir('📺 TV', `<div style="display:flex;flex-direction:column;gap:10px;padding:6px 0">
    <button class="btn" id="tvJogo" style="margin:0">🎮 Jogar videogame</button>
    <button class="btn" id="tvFilme" style="margin:0;background:#c08cff">🎬 Ver um filme</button></div>`, true);
    $('tvJogo').onclick = () => { fechar(); noiteDeJogos(); };
    $('tvFilme').onclick = () => { fechar(); noiteDeFilme(); };
}
function noiteDeFilme() {
    if (MAPA !== 'quarto')
        return;
    sentarJuntas({ f: ['pc', 156, 128, 150, 168, 164], i: ['sentadaCostas', 176, 128, 150, 192, 164],
        fala: () => pick(['Eu escolho o filme!', 'Traz a pipoca, amor', 'Sem dormir no meio hein']) });
    FEFE.dir = 'up';
    if (!ISI.aqui)
        falar(FEFE, 'Noite de filme com os gatinhos...', 1600);
    setTimeout(() => { if (FEFE.pose === "assento")
        sessaoFilme(); }, 900);
}
function sessaoFilme() {
    const juntas = ISI.aqui, DUR = 40;
    abrir('Noite de filme 🎬', `<div class="mg"><canvas id="cvFilme" width="128" height="80" style="display:block;margin:0 auto;height:min(calc(92vh - 200px),240px);width:auto;max-width:100%;image-rendering:pixelated;background:#0d0a12"></canvas>
    <p id="filmeMsg" style="margin:6px 0;min-height:20px;font-size:13px">Apaguem a luz... vai começar 🍿</p>
    <div class="lanes" style="gap:6px;flex-wrap:wrap"><button class="btn branco" id="fPipoca" style="width:auto;margin:0">🍿 Pipoca</button><button class="btn" id="fTho" style="width:auto;margin:0;display:none;background:#ffb36b">🐾 Tirar o Tho</button></div></div>`, true, true);
    tvLigada = true;
    const cv = $('cvFilme'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    let t = 0, ult = performance.now(), pipoca = 0, pipocaAnim = 0, thoNaTela = 0, thoFeito = false, fim = false, pipocas = [];
    const msg = s => { const m = $('filmeMsg'); if (m)
        m.textContent = s; };
    $('fPipoca').onclick = () => {
        pipoca++;
        pipocaAnim = performance.now();
        som.pop();
        for (let i = 0; i < 3; i++)
            pipocas.push({ x: 58 + Math.random() * 12, y: 66, vx: Math.random() * 2 - 1, vy: -1.5 - Math.random(), v: 1 });
        if (pipoca === 1)
            msg(juntas ? `Você e a ${NOME_MINHA} disputam a mesma pipoca 🍿` : 'Nhac nhac 🍿');
        else if (pipoca === 8)
            msg('Calma, vai acabar antes do filme 😂');
        else if (juntas && pipoca === 4)
            falar(ISI, 'Para de comer tudo!', 1400);
    };
    $('fTho').onclick = () => { thoNaTela = 0; thoFeito = true; $('fTho').style.display = 'none'; som.miau('tho', 1.1); msg('Tho, sai da frente da TV! 😾'); setTimeout(() => msg(juntas ? '...e vocês voltam a se encostar ♥' : '...ufa, voltou o filme'), 1600); };
    const CT = GATOS.tho.cor, estrelas = [...Array(18)].map((_, i) => [(i * 37) % 86 + 21, (i * 17) % 26 + 8]);
    const gatoSil = (px, py, cor, flip) => { x.fillStyle = cor; x.fillRect(px, py, 7, 4); x.fillRect(px + (flip ? -2 : 6), py - 3, 3, 3); x.fillRect(px + (flip ? -2 : 6), py - 4, 1, 1); x.fillRect(px + (flip ? 0 : 8), py - 4, 1, 1); x.fillRect(px + (flip ? 6 : -1), py - 2, 2, 1); x.fillRect(px + (flip ? 7 : -2), py - 4, 1, 2); x.fillRect(px + 1, py + 4, 1, 2); x.fillRect(px + 5, py + 4, 1, 2); };
    const tela = (tt) => {
        x.fillStyle = '#1d1a48';
        x.fillRect(21, 6, 86, 48);
        x.fillStyle = '#2e2a66';
        x.fillRect(21, 30, 86, 24);
        if (tt < 6) {
            x.fillStyle = '#0d0a12';
            x.fillRect(21, 6, 86, 48);
            x.fillStyle = '#ffd36e';
            x.font = 'bold 7px monospace';
            x.fillText('DOIS GATOS', 40, 26);
            x.fillText('E A LUA', 48, 36);
            if (tt > 4) {
                x.globalAlpha = (tt - 4) / 2;
                x.fillStyle = '#1d1a48';
                x.fillRect(21, 6, 86, 48);
                x.globalAlpha = 1;
            }
            return;
        }
        estrelas.forEach(([sx, sy], i) => { x.fillStyle = (Math.floor(tt * 2 + i) % 5) ? '#c9b8f0' : '#fff'; x.fillRect(sx, sy, 1, 1); });
        const ly = Math.round(16 - Math.min(4, (tt - 6) / 6));
        x.fillStyle = '#fff6c8';
        x.fillRect(84, ly, 9, 9);
        x.fillRect(83, ly + 1, 11, 7);
        x.fillStyle = '#e8dca0';
        x.fillRect(86, ly + 3, 2, 2);
        x.fillRect(90, ly + 5, 1, 1);
        x.fillStyle = '#3a2840';
        x.fillRect(21, 44, 86, 10);
        x.fillStyle = '#4a3450';
        for (let i = 21; i < 107; i += 6)
            x.fillRect(i, 44, 4, 1);
        x.fillStyle = '#2a1d30';
        x.fillRect(30, 36, 8, 8);
        x.fillStyle = '#ffd36e';
        x.fillRect(32, 38, 4, 3);
        const k = Math.min(1, Math.max(0, (tt - 8) / 14)), a = Math.round(30 + k * 22), b = Math.round(92 - k * 24);
        const pulo = (tt > 8 && tt < 22) ? Math.round(Math.abs(Math.sin(tt * 5))) : 0;
        gatoSil(a, 38 - pulo, '#120d18', false);
        gatoSil(b, 38 - pulo, '#120d18', true);
        if (tt > 23 && tt < 31) {
            const h = Math.round((tt - 23) * 2);
            coracaoPx(x, '#ff5c8d', 60, 30 - h, 2);
        }
        if (tt > 28 && tt < 33) {
            const s = (tt - 28) / 5;
            x.fillStyle = '#fff';
            x.fillRect(Math.round(100 - s * 70), Math.round(10 + s * 10), 2, 1);
            x.fillStyle = 'rgba(255,255,255,.4)';
            x.fillRect(Math.round(102 - s * 70), Math.round(9 + s * 10), 4, 1);
        }
        if (tt > 33) {
            x.fillStyle = 'rgba(13,10,18,' + Math.min(.85, (tt - 33) / 3) + ')';
            x.fillRect(21, 6, 86, 48);
            if (tt > 35) {
                x.fillStyle = '#ffd36e';
                x.font = 'bold 8px monospace';
                x.fillText('FIM ♥', 52, 32);
            }
        }
    };
    const lp = () => {
        const c = $('cvFilme');
        if (!c || !$('modal').classList.contains('on')) {
            tvLigada = false;
            if (FEFE.pose)
                levantar();
            return;
        }
        requestAnimationFrame(lp);
        const agora = performance.now();
        let dt = Math.min(.1, (agora - ult) / 1000);
        ult = agora;
        if (!thoNaTela || thoNaTela < 1)
            t += dt;
        x.fillStyle = '#0d0a12';
        x.fillRect(0, 0, 128, 80);
        const glow = x.createRadialGradient(64, 30, 4, 64, 30, 70);
        glow.addColorStop(0, 'rgba(120,110,200,.25)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = glow;
        x.fillRect(0, 0, 128, 80);
        x.fillStyle = '#2a1d30';
        x.fillRect(18, 3, 92, 54);
        x.fillStyle = '#1b1622';
        x.fillRect(19, 4, 90, 52);
        x.fillStyle = '#3a3348';
        x.fillRect(54, 57, 20, 3);
        x.fillRect(44, 60, 40, 2);
        tela(t);
        if (!thoFeito && t > DUR * .45 && !thoNaTela) {
            thoNaTela = .01;
            $('fTho').style.display = '';
            msg('Bem na hora boa... o Tho deitou na frente da TV 😑');
            som.miau('tho', .9);
        }
        if (thoNaTela) {
            thoNaTela = Math.min(1, thoNaTela + dt * 2);
            const ty = Math.round(80 - thoNaTela * 44);
            x.save();
            x.translate(38, ty);
            x.scale(3.6, 3.6);
            gatoPequeno(x, 'tho', Math.floor(agora / 900) % 4 ? 'feliz' : 'dormindo', 0, 0);
            x.restore();
            const rab = Math.round(Math.sin(agora / 200) * 3);
            x.fillStyle = CT.O || '#2a1d30';
            x.fillRect(88 + rab, ty + 34, 10, 3);
        }
        const cab = (cx, cor, cor2) => { x.fillStyle = cor; x.fillRect(cx - 9, 62, 18, 18); x.fillRect(cx - 7, 60, 14, 2); x.fillStyle = cor2; x.fillRect(cx - 7, 62, 3, 10); x.fillStyle = 'rgba(150,140,230,.25)'; x.fillRect(cx - 7, 60, 14, 1); };
        let pf;
        try {
            pf = paletaFefe();
        }
        catch (e) {
            pf = {};
        }
        cab(36, pf.H || '#17121c', pf.h || '#3d3049');
        if (juntas) {
            cab(92, ISI_COR.H, ISI_COR.h);
            x.fillStyle = '#120d18';
            x.fillRect(43, 70, 8, 10);
            x.fillRect(77, 70, 8, 10);
        }
        const pb = pipocaAnim && agora - pipocaAnim < 200 ? -1 : 0;
        x.fillStyle = '#2a1d30';
        x.fillRect(53, 67 + pb, 22, 13);
        x.fillStyle = '#fff';
        x.fillRect(54, 68 + pb, 20, 12);
        x.fillStyle = '#e8343f';
        for (let i = 0; i < 5; i++)
            x.fillRect(55 + i * 4, 68 + pb, 2, 12);
        const resto = Math.max(0, 6 - Math.floor(pipoca / 2));
        x.fillStyle = '#fff6c8';
        for (let i = 0; i < resto * 2; i++)
            x.fillRect(55 + (i * 5) % 18, 65 + pb - ((i * 3) % 3) + (i > 6 ? 1 : 0), 3, 3);
        x.fillStyle = '#ffd36e';
        for (let i = 0; i < resto; i++)
            x.fillRect(57 + (i * 7) % 16, 66 + pb, 1, 1);
        pipocas = pipocas.filter(p => p.v > 0);
        pipocas.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .12; p.v -= .02; x.fillStyle = '#fff6c8'; x.fillRect(Math.round(p.x), Math.round(p.y), 2, 2); });
        if (!fim && t >= DUR) {
            fim = true;
            msg(juntas ? 'Que filme lindo... igual a gente ♥' : 'Que filme fofo ♥');
            som.plim();
            (S.vistos || (S.vistos = {})).filme = true;
            if (!S.feitos.filme) {
                S.feitos.filme = true;
                ganhar(2);
            }
            gatos.forEach(g => { const st = S.gatos[g.id]; st.alegria = lim(st.alegria + 6); });
            salvar();
            if (juntas)
                setTimeout(() => falar(ISI, 'Próxima sexta a gente vê outro?', 2000), 800);
        }
    };
    requestAnimationFrame(lp);
    const tho = G('tho');
    if (tho && !S.gatos.tho.dormindo && tho !== gatoPerto && ['parado', 'andando'].includes(tho.estado))
        irPara(tho, 176, 104, () => { tho.estado = 'parado'; tho.timer = 40; }, 40);
}
function poseDoGato(g) {
    const st = S.gatos[g.id];
    if (g.pose24 && performance.now() < g.pose24.ate)
        return g.pose24.k;
    if (st.dormindo || g.estado === 'dormindo' || g.estado === 'na_cama' || g.estado === 'na_rede')
        return 'dormindo';
    if (g.estado === 'comendo')
        return 'comendo';
    if (g.estado === 'laser')
        return 'laser';
    if (g.estado === 'caos')
        return 'caos';
    if (g.id === 'clarinha' && janelaAberta && Math.hypot(g.x - 243, g.y - 72) < 16)
        return 'chuva';
    const s = raioDeSol();
    if (s && Math.hypot(g.x - s.cx, g.y - s.cy) < 16)
        return 'sol';
    return 'normal';
}
function tocarFoto(wx, wy) {
    const g = gatos.find(g => g.estado !== 'escondido' && g.estado !== 'oculto' && wx > g.x - 11 && wx < g.x + 11 && wy > g.y - 19 && wy < g.y + 5);
    if (!g) {
        toast('Toque em cima de um gatinho 📷');
        return;
    }
    modoFoto = false;
    btnCamera.textContent = '📷 Foto';
    try {
        $('toast').classList.remove('on');
    }
    catch (e) { }
    let pose = poseDoGato(g);
    if (!FIGURINHAS.some(f => f.g === g.id && f.p === pose))
        pose = 'normal';
    const fl = document.createElement('div');
    fl.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:50;pointer-events:none;transition:opacity .5s';
    document.body.appendChild(fl);
    requestAnimationFrame(() => requestAnimationFrame(() => { fl.style.opacity = '0'; }));
    setTimeout(() => fl.remove(), 600);
    som.foto();
    const F = S.figurinhas || (S.figurinhas = {}), k = g.id + '_' + pose, nova = !F[k], fig = FIGURINHAS.find(f => f.g === g.id && f.p === pose);
    if (nova) {
        F[k] = diaKey(new Date());
        (S.vistos || (S.vistos = {})).figurinha = true;
        ganhar(fig.rara ? (fig.rara > 1 ? 6 : 3) : 1);
    }
    if (FIGURINHAS.every(f => F[f.g + '_' + f.p]))
        S.vistos.albumCompleto = true;
    salvar();
    if (g.id === 'clarinha' && pose === 'sorriso')
        falar(FEFE, 'EU CONSEGUI. A CLARINHA SORRIU!!', 2400);
    else if (g.id === 'tho' && pose === 'invertido')
        falar(g, 'eu sou um morcego', 1600);
    else if (g.id === 'clarinha')
        pensar(g, pick(['pelo menos pega meu lado bom', 'sem flash da próxima', '...ficou boa?']), 2000);
    setTimeout(() => {
        const c = canvasFigurinha(fig, true);
        abrir(nova ? (fig.rara ? '✨ Figurinha RARA!' : '📒 Nova figurinha!') : '📷 Foto', `<div style="text-align:center"><div id="figNova" style="display:inline-block;background:#fff;padding:8px 8px 22px;box-shadow:0 0 0 3px #2a1d30;transform:rotate(-3deg)"></div>
      <p style="margin:12px 0 0"><b>${esc(fig.n)}</b></p><p style="margin:2px 0 0;font-size:12px;opacity:.7">${nova ? 'Colada no álbum 📒' : 'Essa você já tinha! Que tal outra pose?'}</p></div>`, true);
        c.style.cssText = 'width:150px;height:150px;image-rendering:pixelated;display:block';
        $('figNova').appendChild(c);
    }, 350);
}
function canvasFigurinha(f, tem) {
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 32;
    const x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    const fundo = { normal: '#ffe3ec', dormindo: '#2e2a66', comendo: '#fff0c8', sol: '#ffe8a0', barriga: '#d8f0ff', chuva: '#8a9bc8', sorriso: '#ffd6f0', laser: '#ffd0d0', caos: '#ffcf8f', invertido: '#e0d8ff' }[f.p] || '#eee';
    x.fillStyle = fundo;
    x.fillRect(0, 0, 32, 32);
    if (!tem) {
        x.fillStyle = '#c9c2d0';
        x.fillRect(0, 0, 32, 32);
        x.fillStyle = '#8a8296';
        x.font = 'bold 18px monospace';
        x.fillText('?', 11, 23);
        return c;
    }
    if (f.p === 'sol') {
        x.fillStyle = 'rgba(255,255,255,.5)';
        x.fillRect(0, 0, 32, 10);
    }
    if (f.p === 'dormindo') {
        x.fillStyle = '#fff';
        [[4, 4], [26, 6], [20, 3], [8, 10]].forEach(([a, b]) => x.fillRect(a, b, 1, 1));
    }
    if (f.p === 'chuva') {
        x.fillStyle = 'rgba(220,235,255,.8)';
        for (let i = 0; i < 10; i++)
            x.fillRect((i * 7) % 30, (i * 11) % 20, 1, 3);
    }
    if (f.p === 'laser') {
        x.fillStyle = '#ff2a3c';
        x.fillRect(25, 26, 2, 2);
    }
    x.drawImage(poseGatoCanvas(f.g, f.p), 0, 0);
    if (f.p === 'comendo') {
        x.fillStyle = '#2a1d30';
        x.fillRect(18, 26, 13, 5);
        x.fillStyle = '#ff7aa8';
        x.fillRect(19, 26, 11, 4);
        x.fillStyle = '#b07a4a';
        x.fillRect(20, 25, 9, 1);
    }
    if (f.p === 'dormindo') {
        x.fillStyle = '#fff';
        x.font = 'bold 6px monospace';
        x.fillText('z', 26, 8);
        x.fillText('Z', 29, 4);
    }
    if (f.p === 'caos') {
        x.fillStyle = 'rgba(0,0,0,.18)';
        x.fillRect(6, 29, 20, 2);
    }
    if (f.p === 'sorriso') {
        x.fillStyle = '#ffd36e';
        [[4, 6], [27, 8], [25, 20]].forEach(([a, b]) => { x.fillRect(a, b - 1, 1, 3); x.fillRect(a - 1, b, 3, 1); });
    }
    if (f.p === 'caos') {
        x.fillStyle = 'rgba(255,255,255,.8)';
        x.fillRect(3, 18, 6, 1);
        x.fillRect(2, 22, 5, 1);
        x.fillRect(4, 26, 6, 1);
    }
    if (f.rara) {
        x.fillStyle = '#ffd36e';
        x.fillRect(0, 0, 32, 1);
        x.fillRect(0, 31, 32, 1);
        x.fillRect(0, 0, 1, 32);
        x.fillRect(31, 0, 1, 32);
    }
    return c;
}
function patinhas(x, id, cx, ty) { const cor = GATOS[id].cor; x.fillStyle = cor.O || '#2a1d30'; [[-5, 1], [-2, 0], [1, 0], [4, 1]].forEach(([dx, dy]) => { x.fillRect(cx + dx - 1, ty + dy - 1, 3, 4); }); x.fillStyle = cor.B || '#fff'; [[-5, 1], [-2, 0], [1, 0], [4, 1]].forEach(([dx, dy]) => { x.fillRect(cx + dx, ty + dy, 1, 2); }); }
function sorrisoPx(x, cx, cy) { x.fillStyle = '#2a1d30'; x.fillRect(cx - 3, cy, 1, 1); x.fillRect(cx - 2, cy + 1, 2, 1); x.fillRect(cx, cy + 1, 2, 1); x.fillRect(cx + 2, cy, 1, 1); x.fillStyle = 'rgba(255,120,160,.7)'; x.fillRect(cx - 6, cy - 1, 2, 1); x.fillRect(cx + 4, cy - 1, 2, 1); }
function abrirFigurinhas() {
    const F = S.figurinhas || {}, n = FIGURINHAS.filter(f => F[f.g + '_' + f.p]).length;
    abrir(`📒 Figurinhas ${n}/${FIGURINHAS.length}`, `<div style="font-size:12px;opacity:.7;text-align:center;margin:-2px 0 8px">${tem('camera') ? 'Tire fotos com o botão 📷 no quarto. Tem poses raras ✨' : 'Compre a câmera instantânea na lojinha pra começar 📷'}</div>
    <div id="figGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px"></div>`, true, true);
    FIGURINHAS.forEach(f => {
        const ok = !!F[f.g + '_' + f.p], d = document.createElement('div');
        d.style.cssText = 'background:#fff;padding:4px 4px 2px;box-shadow:0 0 0 2px #2a1d30;text-align:center;font-size:10px;line-height:1.15;color:#2a1d30';
        const c = canvasFigurinha(f, ok);
        c.style.cssText = 'width:100%;aspect-ratio:1;image-rendering:pixelated;display:block';
        d.appendChild(c);
        const l = document.createElement('div');
        l.style.cssText = 'padding:3px 0 1px;min-height:22px';
        l.textContent = ok ? f.n : (f.rara ? (f.rara > 1 ? '✨✨ raríssima' : '✨ rara') : '???');
        d.appendChild(l);
        $('figGrid').appendChild(d);
    });
}
function atualizarPoses(dt) {
    gatos.forEach(g => { if (g.pose24 && (performance.now() > g.pose24.ate || !['parado', 'dormindo'].includes(g.estado)))
        g.pose24 = null; });
    if (MAPA !== 'quarto' || bloqueioTela())
        return;
    poseT -= dt;
    if (poseT > 0)
        return;
    poseT = 35 + Math.random() * 25;
    const livres = gatos.filter(g => g.estado === 'parado' && g !== gatoPerto && !g.pose24 && !S.gatos[g.id].doente && !g.trav);
    if (!livres.length)
        return;
    const g = pick(livres), agora = performance.now();
    if (g.id === 'clarinha') {
        if (Math.random() < .06) {
            g.pose24 = { k: 'sorriso', ate: agora + 5000 };
            g.timer = Math.max(g.timer || 0, 5.5);
            particula('brilho', g.x, g.y - 14, 2);
        }
        return;
    }
    g.pose24 = { k: g.id === 'tho' ? 'invertido' : 'barriga', ate: agora + 12000 };
    g.timer = Math.max(g.timer || 0, 12.5);
    if (g.id === 'tho')
        pensar(g, pick(['o mundo é diferente daqui', 'sangue subindo pra cabeça... bom', 'eu sou um morcego']), 2200);
    else
        pensar(g, pick(['carinho na barriga? (é uma armadilha)', 'barriguinha pro alto...', 'tô relaxada']), 2200);
}
function desenharPose24(g) {
    const p = g.pose24;
    if (!p)
        return false;
    const x = Math.round(g.x), y = Math.round(g.y);
    if (p.k === 'sorriso') {
        ctx.fillStyle = 'rgba(0,0,0,.22)';
        ctx.fillRect(x - 6, y - 1, 12, 2);
        gatoPequeno(ctx, g.id, 'feliz', x - 7, y - 14);
        sorrisoPx(ctx, x, y - 6);
        if (Math.floor(performance.now() / 300) % 2) {
            ctx.fillStyle = '#ffd36e';
            ctx.fillRect(x + 7, y - 16, 1, 3);
            ctx.fillRect(x + 6, y - 15, 3, 1);
        }
        return true;
    }
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fillRect(x - 7, y - 1, 14, 2);
    const w = Math.round(Math.sin(performance.now() / 260));
    ctx.save();
    ctx.translate(x - 7, y);
    ctx.scale(1, -1);
    gatoPequeno(ctx, g.id, p.k === 'invertido' ? 'feliz' : 'dormindo', 0, 0);
    ctx.restore();
    patinhas(ctx, g.id, x, y - 15 + w);
    const rab = GATOS[g.id].cor;
    ctx.fillStyle = rab.O || '#2a1d30';
    ctx.fillRect(x + 6, y - 3 + w, 4, 2);
    return true;
}
function ehNoite24() { const h = new Date().getHours(); return h >= 19 || h < 6; }
function setLuz(m) { luzModo = m; luzApagada = m === 2; btnLuz.textContent = TXT_LUZ[m]; }
function luzAbajur() {
    const c = _cvNoite || (_cvNoite = document.createElement('canvas'));
    if (c.width !== TW || c.height !== TH) {
        c.width = TW;
        c.height = TH;
    }
    const x = c.getContext('2d');
    x.globalCompositeOperation = 'source-over';
    x.clearRect(0, 0, TW, TH);
    x.fillStyle = 'rgba(8,6,34,.62)';
    x.fillRect(0, 0, TW, TH);
    x.globalCompositeOperation = 'destination-out';
    const furo = (cx, cy, r, a) => { const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(.6, `rgba(0,0,0,${a * .5})`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); };
    const cr = OBJ.find(o => o.nome === 'criado'), lx = cr ? cr.x + 8 : 68, ly = cr ? cr.y + 6 : 36;
    furo(lx, ly, 70, .95);
    furo(45, 50, 34, .55);
    furo(243, 50, 34, .55);
    if (tvLigada)
        furo(176, 104, 34, .55);
    ctx.drawImage(c, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    const luz = (cx, cy, r, cor) => { const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, cor); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); };
    luz(lx, ly, 58, 'rgba(255,150,70,.32)');
    luz(45, 46, 30, 'rgba(110,140,255,.14)');
    luz(243, 46, 30, 'rgba(110,140,255,.14)');
    ctx.globalCompositeOperation = 'source-over';
}
function desenharEscuro24() {
    if (!luzModo || MAPA !== 'quarto')
        return;
    if (luzModo === 1)
        return luzAbajur();
    const t = performance.now() / 1000;
    ctx.fillStyle = 'rgba(4,3,10,.9)';
    ctx.fillRect(-50, -50, TW + 100, TH + 100);
    ctx.globalCompositeOperation = 'lighter';
    [[30, 10], [228, 10]].forEach(([wx, wy]) => { ctx.fillStyle = 'rgba(90,110,200,.18)'; ctx.fillRect(wx + 1, wy + 1, 28, 24); ctx.fillStyle = 'rgba(70,90,180,.07)'; ctx.beginPath(); ctx.moveTo(wx, wy + 26); ctx.lineTo(wx + 30, wy + 26); ctx.lineTo(wx + 40, wy + 70); ctx.lineTo(wx + 6, wy + 70); ctx.fill(); });
    if (tvLigada) {
        const gr = ctx.createRadialGradient(176, 110, 2, 176, 110, 40);
        gr.addColorStop(0, 'rgba(120,130,255,.3)');
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gr;
        ctx.fillRect(136, 70, 80, 80);
    }
    gatos.forEach((g, i) => {
        if (['escondido', 'oculto', 'dormindo', 'na_cama', 'na_rede'].includes(g.estado) || S.gatos[g.id].dormindo)
            return;
        const fase = (t * 0.37 + i * 1.7) % 4, pisca = fase < .12;
        if (pisca)
            return;
        const x = Math.round(g.x), y = Math.round(g.y - (g.alt || 0)), cor = COR_OLHO[g.id] || '#fff';
        const gr = ctx.createRadialGradient(x, y - 8, 0, x, y - 8, 7);
        gr.addColorStop(0, cor + '55');
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gr;
        ctx.fillRect(x - 7, y - 15, 14, 14);
        ctx.fillStyle = cor;
        ctx.fillRect(x - 4, y - 9, 2, 2);
        ctx.fillRect(x + 2, y - 9, 2, 2);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 4, y - 9, 1, 1);
        ctx.fillRect(x + 2, y - 9, 1, 1);
    });
    ctx.globalCompositeOperation = 'source-over';
}
function atualizarEscuro() {
    if (luzModo && (!ehNoite24() || MAPA !== 'quarto'))
        setLuz(0);
}
function pascoaDe(ano) { const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1; return new Date(ano, mes - 1, dia); }
function ehPascoa() { const d = agoraJogo(), p = pascoaDe(d.getFullYear()), hoje = new Date(d.getFullYear(), d.getMonth(), d.getDate()); const dif = (p - hoje) / 864e5; return dif >= 0 && dif <= 7; }
function ehHalloween() { return entreDatas(agoraJogo(), [10, 25], [10, 31]); }
function desenharFantasia(c2d, id, x, y) {
    if (!ehHalloween())
        return;
    if (id === 'lola') {
        c2d.fillStyle = '#2a1d30';
        c2d.fillRect(x + 3, y - 4, 8, 5);
        c2d.fillStyle = '#ff8a3d';
        c2d.fillRect(x + 4, y - 3, 6, 3);
        c2d.fillStyle = '#e06a20';
        c2d.fillRect(x + 6, y - 3, 1, 3);
        c2d.fillStyle = '#3f8a3a';
        c2d.fillRect(x + 6, y - 6, 2, 2);
    }
    else if (id === 'tho') {
        const a = ACESSORIOS.bruxa;
        c2d.drawImage(spr(a.peq.g, { O: '#2a1d30', P: '#6a3a8a', Y: '#ff8a3d' }, 'hwBruxa'), x + a.peq.x, y + a.peq.y);
    }
    else if (id === 'clarinha') {
        c2d.fillStyle = 'rgba(250,250,255,.92)';
        c2d.fillRect(x + 1, y + 1, 12, 12);
        c2d.fillRect(x + 2, y, 10, 1);
        c2d.fillRect(x, y + 4, 1, 9);
        c2d.fillRect(x + 13, y + 4, 1, 9);
        c2d.fillStyle = 'rgba(250,250,255,.92)';
        for (let i = 0; i < 14; i += 3)
            c2d.fillRect(x + i, y + 13, 2, 1);
        c2d.fillStyle = '#2a1d30';
        c2d.fillRect(x + 3, y + 5, 2, 2);
        c2d.fillRect(x + 9, y + 5, 2, 2);
        c2d.fillRect(x + 6, y + 9, 2, 1);
    }
}
function imgAbobora() { return pinta(12, 10, (R) => { R(1, 2, 10, 8, '#2a1d30'); R(0, 3, 12, 6, '#2a1d30'); R(2, 3, 8, 6, '#ff8a3d'); R(1, 4, 10, 4, '#ff8a3d'); R(4, 3, 1, 6, '#e06a20'); R(7, 3, 1, 6, '#e06a20'); R(5, 0, 2, 3, '#3f8a3a'); R(3, 5, 2, 1, '#ffd36e'); R(7, 5, 2, 1, '#ffd36e'); R(4, 7, 4, 1, '#ffd36e'); }); }
function imgOvo(i) { const [a, b] = OVOS_CORES[i % 6]; return pinta(6, 8, (R) => { R(1, 0, 4, 8, '#2a1d30'); R(0, 2, 6, 5, '#2a1d30'); R(2, 1, 2, 6, a); R(1, 2, 4, 4, a); R(1, 4, 4, 1, b); R(2, 2, 1, 1, '#fff'); }); }
function construirSazonal24() {
    if (ehHalloween()) {
        [[24, 96], [312, 98], [150, 64]].forEach(([x, y], i) => { const img = imgAbobora(); OBJ.push({ nome: 'abobora', sazonal: true, x, y, img, base: y + 10, draw: (c, o) => { c.drawImage(o.img, o.x, o.y); if (Math.floor(performance.now() / 300 + i) % 3) {
                c.fillStyle = 'rgba(255,210,90,.5)';
                c.fillRect(o.x + 3, o.y + 5, 6, 3);
            } } }); });
    }
    if (ehPascoa()) {
        const ano = agoraJogo().getFullYear(), achados = (S.ovos && S.ovos[ano]) || [];
        const cands = [[22, 72], [96, 70], [128, 98], [210, 70], [300, 72], [330, 120], [62, 150], [120, 200], [230, 206], [326, 206], [96, 128], [262, 150], [180, 190], [40, 214]];
        let r = ano;
        const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
        const ok = cands.filter(([x, y]) => !bloqueado(x, y, 5)).sort(() => rnd() - .5).slice(0, 6);
        ok.forEach(([x, y], i) => {
            if (achados.includes(i))
                return;
            const img = imgOvo(i);
            OBJ.push({ nome: 'ovo' + i, sazonal: true, x: x - 3, y: y - 8, img, base: y });
            PONTOS.push({ obj: 'ovo' + i, sazonal: true, nome: 'Pegar o ovinho 🥚', x, y: y + 6, acao: () => pegarOvo(i) });
        });
    }
}
function pegarOvo(i) {
    const ano = agoraJogo().getFullYear();
    S.ovos = S.ovos || {};
    const L = S.ovos[ano] || (S.ovos[ano] = []);
    if (L.includes(i))
        return;
    L.push(i);
    for (let k = OBJ.length - 1; k >= 0; k--)
        if (OBJ[k].nome === 'ovo' + i)
            OBJ.splice(k, 1);
    for (let k = PONTOS.length - 1; k >= 0; k--)
        if (PONTOS[k].obj === 'ovo' + i)
            PONTOS.splice(k, 1);
    alvoAtual = null;
    ganhar(1);
    som.plim();
    particula('coracao', FEFE.x, FEFE.y - 20, 2);
    if (L.length >= 6) {
        (S.vistos || (S.vistos = {})).pascoa = true;
        ganhar(5);
        falar(FEFE, 'Achei todos os ovinhos!! 🐰', 2400);
        setTimeout(() => { const t = G('tho'); if (t)
            falar(t, 'eu ia comer um... juro que não', 2000); }, 1200);
    }
    else
        falar(FEFE, `Ovinho ${L.length}/6 🥚`, 1400);
    salvar();
}
function desenharSazonal24(lista) {
    if (MAPA !== 'quarto')
        return;
    const t = performance.now() / 1000;
    if (ehHalloween())
        lista.push({ b: -0.3, f: () => {
                ctx.strokeStyle = 'rgba(240,240,255,.55)';
                ctx.lineWidth = 1;
                [[2, 2, 1], [350, 2, -1]].forEach(([cx, cy, s]) => { for (let r = 6; r <= 18; r += 6) {
                    ctx.beginPath();
                    ctx.moveTo(cx + s * r, cy);
                    ctx.lineTo(cx + s * r * .7, cy + r * .7);
                    ctx.lineTo(cx, cy + r);
                    ctx.stroke();
                } [[1, 0], [.7, .7], [0, 1]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + s * a * 20, cy + b * 20); ctx.stroke(); }); });
                [[30, 10], [228, 10]].forEach(([wx, wy], j) => {
                    for (let i = 0; i < 2; i++) {
                        const bx = wx + ((t * 12 + i * 13 + j * 7) % 28), by = wy + 5 + Math.round(Math.sin(t * 3 + i) * 3) + i * 8, asa = Math.floor(t * 8 + i) % 2;
                        ctx.fillStyle = '#120d18';
                        ctx.fillRect(Math.round(bx), by, 2, 2);
                        ctx.fillRect(Math.round(bx) - 2, by - asa, 2, 1);
                        ctx.fillRect(Math.round(bx) + 2, by - asa, 2, 1);
                    }
                });
                const ay = 8 + Math.round((Math.sin(t * .6) + 1) * 8);
                ctx.fillStyle = 'rgba(240,240,255,.5)';
                ctx.fillRect(120, 0, 1, ay);
                ctx.fillStyle = '#120d18';
                ctx.fillRect(119, ay, 3, 3);
                ctx.fillRect(118, ay + 1, 1, 1);
                ctx.fillRect(122, ay + 1, 1, 1);
            } });
    if (ehPascoa())
        lista.push({ b: -0.3, f: () => {
                const cores = ['#ff9ec4', '#8fcaff', '#ffd36e', '#7bd389', '#c08cff'];
                for (let x = 8; x < 344; x += 12) {
                    const y = 4 + Math.round(Math.sin(x / 40) * 3);
                    ctx.fillStyle = '#4a3a30';
                    ctx.fillRect(x, y, 12, 1);
                    ctx.fillStyle = '#2a1d30';
                    ctx.fillRect(x + 4, y + 1, 5, 6);
                    ctx.fillStyle = cores[(x / 12 | 0) % 5];
                    ctx.fillRect(x + 5, y + 2, 3, 4);
                }
            } });
    if (ehHalloween() || ehPascoa())
        lista.push({ b: 9000, f: () => {
                const txt = ehHalloween() ? 'Feliz Halloween!' : 'Feliz Páscoa!';
                if (dataEspecial())
                    return;
                ctx.font = 'bold 7px monospace';
                const w = ctx.measureText(txt).width + 10, x = Math.round(176 - w / 2), y = 17, c0 = ehHalloween() ? '#ff8a3d' : '#ff9ec4';
                ctx.fillStyle = '#2a1d30';
                ctx.fillRect(x - 1, y - 1, w + 2, 11);
                ctx.fillStyle = c0;
                ctx.fillRect(x, y, w, 9);
                ctx.fillStyle = '#fff';
                ctx.fillText(txt, x + 5, y + 7);
            } });
}
function checarSazonal24() { const k = diaKey(agoraJogo()); if (k !== sazonalDia24 && MAPA === 'quarto') {
    sazonalDia24 = k;
    try {
        construirSazonal();
    }
    catch (e) { }
} }
function abrirJanela() {
    janelaAberta = true;
    btnJanela.textContent = '🪟 Fechar a janela';
    som.pop();
    (S.vistos || (S.vistos = {})).chuva = true;
    salvar();
    falar(FEFE, pick(['Cheirinho de chuva ♥', 'Que ventinho gostoso...', 'Vem sentir, Clarinha!']), 2000);
    somChuva(true);
    janelaGatoT = 1.2;
}
function fecharJanela() {
    janelaAberta = false;
    btnJanela.textContent = '🪟 Abrir a janela';
    somChuva(false);
    const c = G('clarinha');
    if (c && Math.hypot(c.x - 243, c.y - 72) < 16)
        pensar(c, 'ei. eu tava usando.', 1800);
}
function somChuva(on) {
    try {
        if (on) {
            if (chuvaNo || !audio() || !S.som)
                return;
            const s = AC.createBufferSource();
            s.buffer = ruido();
            s.loop = true;
            const f = AC.createBiquadFilter();
            f.type = 'lowpass';
            f.frequency.value = 1100;
            const g = AC.createGain();
            g.gain.value = 0.0001;
            g.gain.exponentialRampToValueAtTime(.06, AC.currentTime + 1.2);
            s.connect(f);
            f.connect(g);
            g.connect(mestre);
            s.start();
            chuvaNo = { s, g };
        }
        else if (chuvaNo) {
            const n = chuvaNo;
            chuvaNo = null;
            n.g.gain.setTargetAtTime(0.0001, AC.currentTime, .3);
            setTimeout(() => { try {
                n.s.stop();
            }
            catch (e) { } }, 1500);
        }
    }
    catch (e) { }
}
function atualizarJanela(dt) {
    if (!janelaAberta)
        return;
    if (!estaChovendo() || MAPA !== 'quarto') {
        fecharJanela();
        return;
    }
    if (bloqueioTela())
        return;
    janelaGatoT -= dt;
    if (janelaGatoT > 0)
        return;
    janelaGatoT = 22 + Math.random() * 10;
    const c = G('clarinha');
    if (!c || S.gatos.clarinha.dormindo || c === gatoPerto || !['parado', 'andando'].includes(c.estado) || c.trav)
        return;
    if (Math.hypot(c.x - 243, c.y - 72) < 10)
        return;
    irPara(c, 243, 72, () => {
        c.estado = 'parado';
        c.timer = 14;
        c.dir = 1;
        mostrarHumor(c, 'feliz', 9000);
        pensar(c, pick(['cheiro de chuva...', '*snif snif*', 'o mundo lá fora tá molhado. ótimo.']), 2600);
        if (Math.random() < .5)
            setTimeout(() => som.miau('clarinha', .9), 900);
    }, 26);
}
function desenharJanela24(lista) {
    if (!janelaAberta || MAPA !== 'quarto')
        return;
    const t = performance.now() / 1000, wx = 228, wy = 10;
    lista.push({ b: -0.15, f: () => {
            ctx.fillStyle = 'rgba(60,75,110,.75)';
            ctx.fillRect(wx + 2, wy + 2, 26, 22);
            ctx.fillStyle = 'rgba(190,215,255,.8)';
            for (let i = 0; i < 12; i++) {
                const x = wx + 3 + ((i * 7 + Math.floor(t * 4)) % 24), y = wy + 2 + ((i * 11 + t * 70) % 20);
                ctx.fillRect(Math.round(x), Math.round(y), 1, 3);
            }
            ctx.fillStyle = '#efe6f5';
            ctx.fillRect(wx - 3, wy + 1, 4, 24);
            ctx.fillRect(wx + 29, wy + 1, 4, 24);
            ctx.fillStyle = 'rgba(143,202,255,.6)';
            ctx.fillRect(wx - 2, wy + 3, 2, 20);
            ctx.fillRect(wx + 30, wy + 3, 2, 20);
            const bal = Math.round(Math.sin(t * 2.2) * 2);
            ctx.fillStyle = 'rgba(255,158,196,.85)';
            ctx.fillRect(wx + 1 + bal, wy + 1, 4, 20 + bal);
            ctx.fillRect(wx + 25 - bal, wy + 1, 4, 19 - bal);
            ctx.fillStyle = 'rgba(220,235,255,.45)';
            for (let i = 0; i < 5; i++) {
                const k = (t * .6 + i / 5) % 1, x = Math.round(wx + 6 + i * 4 - k * 30), y = Math.round(wy + 28 + k * 36 + i * 3);
                ctx.fillRect(x, y, Math.round(6 - k * 4), 1);
            }
            if (Math.floor(t * 6) % 3 === 0) {
                ctx.fillStyle = 'rgba(190,215,255,.8)';
                ctx.fillRect(wx + 6 + Math.floor(t * 7) % 18, wy + 27, 1, 1);
            }
        } });
}
function atualizarExtras24(dt) { atualizarPoses(dt); atualizarEscuro(); atualizarJanela(dt); checarSazonal24(); empilharBotoes(); }
function extrasDesenho24(lista) { desenharSazonal24(lista); desenharJanela24(lista); }
