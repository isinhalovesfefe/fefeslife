function tatuar(F) {
    const out = {};
    for (const d in F)
        out[d] = F[d].map(fr => {
            const g = fr.map(r => [...r]);
            if (d === 'down') {
                [[5, 13], [4, 14], [10, 16], [11, 17]].forEach(([x, y]) => troca(g, x, y, 'A', 'z'));
                troca(g, 7, 9, 'S', 'n');
                troca(g, 8, 9, 'S', 'n');
            }
            else if (d === 'up') {
                [[4, 15], [11, 16]].forEach(([x, y]) => troca(g, x, y, 'A', 'z'));
            }
            else {
                const lado = d === 'right';
                troca(g, lado ? 8 : 7, 15, 'A', 'z');
                troca(g, lado ? 12 : 3, 10, 'OS', 'n');
            }
            return g.map(r => r.join(''));
        });
    return out;
}
function abrirDiario() {
    const D = S.diario || (S.diario = []), hoje = diaKey(new Date());
    let e = D.find(x => x.d === hoje);
    let humor = e ? e.h : '😊';
    const dataBonita = k => { const [a, m, d] = k.split('-').map(Number); const t = new Date(a, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }); return t.charAt(0).toUpperCase() + t.slice(1); };
    const antigos = D.filter(x => x.d !== hoje).sort((a, b) => a.d < b.d ? 1 : -1);
    abrir('📔 Diário da Fefe', `<div class="diario">
    <div class="diaData">${esc(dataBonita(hoje))}</div>
    <div class="diaHumores">${HUMORES_DIARIO.map(h => `<button class="px ${h === humor ? 'sel' : ''}" data-h="${h}">${h}</button>`).join('')}</div>
    <textarea id="diaTexto" rows="4" placeholder="Querido diário, hoje...">${e ? esc(e.t) : ''}</textarea>
    <div style="text-align:center"><button class="btn" id="diaSalvar" style="width:auto;margin:6px 0 0">Guardar</button></div>
    ${antigos.length ? `<div class="diaLista">${antigos.map(x => `<div class="diaItem"><b>${x.h || ''} ${esc(dataBonita(x.d))}</b><div>${esc(x.t)}</div></div>`).join('')}</div>` : '<p style="font-size:12px;opacity:.6;text-align:center;margin:10px 0 0">As páginas dos outros dias vão aparecendo aqui.</p>'}
  </div>`, true, true);
    document.querySelectorAll('[data-h]').forEach(b => b.onclick = () => { humor = b.dataset.h; document.querySelectorAll('[data-h]').forEach(x => x.classList.toggle('sel', x === b)); som.pop(); });
    $('diaSalvar').onclick = () => {
        const t = $('diaTexto').value.trim();
        if (!t) {
            toast('Escreve alguma coisinha primeiro ♥');
            return;
        }
        if (!e) {
            e = { d: hoje };
            D.push(e);
        }
        e.t = t.slice(0, 4000);
        e.h = humor;
        (S.vistos || (S.vistos = {})).diario = true;
        if (!S.feitos.diario) {
            S.feitos.diario = true;
            ganhar(1);
        }
        salvar();
        som.plim();
        toast('Guardado no diário 📔');
        fechar();
    };
}
function imgDiario() { return pinta(11, 8, (R) => { R(0, 0, 11, 8, '#2a1d30'); R(1, 1, 9, 6, '#7a5ab0'); R(1, 1, 1, 6, '#ffd36e'); R(4, 3, 4, 1, '#c9b8f0'); R(9, 1, 1, 6, '#f4ecd0'); }); }
function raioDeSol() {
    const d = new Date(), h = d.getHours() + d.getMinutes() / 60;
    if (h < 7 || h > 17.5 || estaChovendo())
        return null;
    const k = Math.max(-1, Math.min(1, (h - 12.25) / 5.25));
    const w = 30, alt = 16 + Math.abs(k) * 10, x = Math.round(243 - w / 2 - k * 42), y = Math.round(66 + Math.abs(k) * 4);
    return { x, y, w, alt, k, cx: x + w / 2, cy: y + alt / 2 };
}
function desenharSol(lista) {
    if (MAPA !== 'quarto')
        return;
    const s = raioDeSol();
    if (!s)
        return;
    const t = performance.now() / 1000;
    lista.push({ b: -0.1, f: () => {
            const sk = Math.round(s.k * -8);
            ctx.fillStyle = 'rgba(255,236,150,.1)';
            ctx.beginPath();
            ctx.moveTo(229, 36);
            ctx.lineTo(257, 36);
            ctx.lineTo(s.x + s.w + sk, s.y);
            ctx.lineTo(s.x + sk, s.y);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,226,130,.34)';
            ctx.beginPath();
            ctx.moveTo(s.x + sk, s.y);
            ctx.lineTo(s.x + s.w + sk, s.y);
            ctx.lineTo(s.x + s.w, s.y + s.alt);
            ctx.lineTo(s.x, s.y + s.alt);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,230,.6)';
            for (let i = 0; i < 5; i++) {
                const px = s.x + ((i * 11 + t * 3) % s.w), py = s.y - 6 + ((i * 7 + t * 2) % (s.alt + 4));
                ctx.fillRect(Math.round(px), Math.round(py), 1, 1);
            }
        } });
}
function atualizarSol(dt) {
    if (MAPA !== 'quarto' || bloqueioTela())
        return;
    const s = raioDeSol();
    if (!s)
        return;
    if (solGato && (solGato.estado !== 'parado' || Math.hypot(solGato.x - s.cx, solGato.y - s.cy) > 14))
        solGato = null;
    solT -= dt;
    if (solT > 0 || solGato)
        return;
    solT = 18 + Math.random() * 12;
    if (bloqueado(s.cx, s.cy, 6))
        return;
    const livre = g => !S.gatos[g.id].dormindo && !S.gatos[g.id].doente && ['parado', 'andando'].includes(g.estado) && g !== gatoPerto && !g.trav;
    const cl = G('clarinha');
    let g = (cl && livre(cl) && Math.random() < .75) ? cl : pick(gatos.filter(livre));
    if (!g)
        return;
    solGato = g;
    irPara(g, s.cx + (Math.random() * 6 - 3), s.cy, () => { g.estado = 'parado'; g.timer = 35; mostrarHumor(g, 'dormindo', 33000); pensar(g, g.id === 'clarinha' ? 'meu sol. meu.' : g.id === 'lola' ? 'quentinho...' : 'eu sou um lagarto agora', 2400); }, 22);
}
function imgPresenteGato(k) {
    return pinta(9, 7, (R) => {
        if (k === 'meia') {
            R(1, 0, 4, 5, '#2a1d30');
            R(2, 1, 2, 4, '#ff9ec4');
            R(1, 4, 7, 3, '#2a1d30');
            R(2, 5, 5, 1, '#ff9ec4');
            R(2, 2, 2, 1, '#fff');
        }
        else if (k === 'folha') {
            R(1, 2, 6, 3, '#2a1d30');
            R(2, 1, 4, 5, '#2a1d30');
            R(2, 2, 4, 3, '#5fbf5a');
            R(3, 1, 2, 5, '#5fbf5a');
            R(3, 3, 3, 1, '#2f7a3a');
            R(6, 4, 2, 1, '#2f7a3a');
        }
        else {
            R(1, 1, 6, 5, '#2a1d30');
            R(2, 2, 4, 3, '#c8242e');
            R(3, 2, 2, 1, '#ff8a8a');
            R(2, 1, 4, 1, '#8a8d96');
        }
    });
}
function atualizarPresentes(dt) {
    if (MAPA !== 'quarto' || presenteAtivo || bloqueioTela())
        return;
    presenteT -= dt;
    if (presenteT > 0)
        return;
    presenteT = 220 + Math.random() * 220;
    const livres = gatos.filter(g => !S.gatos[g.id].dormindo && !S.gatos[g.id].doente && ['parado', 'andando'].includes(g.estado) && g !== gatoPerto);
    if (!livres.length)
        return;
    const peso = { lola: 1, tho: 1.3, clarinha: .4 };
    let r = Math.random() * livres.reduce((a, g) => a + peso[g.id], 0), g = livres[0];
    for (const c of livres) {
        r -= peso[c.id];
        if (r <= 0) {
            g = c;
            break;
        }
    }
    if (g.id === 'clarinha') {
        pensar(g, 'presentes? eu? por favor.', 2600);
        return;
    }
    const k = g.id === 'lola' ? 'meia' : pick(['folha', 'tampinha']);
    let [x, y] = [44 + Math.random() * 22, 106];
    if (bloqueado(x, y, 5))
        [x, y] = pontoLivre();
    presenteAtivo = { k, g: g.id };
    irPara(g, x, y, () => {
        const img = imgPresenteGato(k);
        OBJ.push({ nome: 'presenteGato', x: Math.round(x - 4), y: Math.round(y - 6), img, base: y + 1 });
        PONTOS.push({ obj: 'presenteGato', nome: `Pegar o presente d${g.id === 'tho' ? 'o' : 'a'} ${GATOS[g.id].nome}`, x: Math.round(x), y: Math.round(y + 8), acao: pegarPresenteGato });
        som.miau(g.id, 1.1);
        falar(g, g.id === 'lola' ? 'Trouxe pra você! ♥' : '*deixa isso aqui e sai correndo*', 2200);
        if (g.id === 'tho')
            setTimeout(() => zoomies(g, 1), 900);
    }, 34);
}
function pegarPresenteGato() {
    const p = presenteAtivo;
    if (!p)
        return;
    presenteAtivo = null;
    for (let i = OBJ.length - 1; i >= 0; i--)
        if (OBJ[i].nome === 'presenteGato')
            OBJ.splice(i, 1);
    for (let i = PONTOS.length - 1; i >= 0; i--)
        if (PONTOS[i].obj === 'presenteGato')
            PONTOS.splice(i, 1);
    alvoAtual = null;
    falar(FEFE, p.k === 'meia' ? 'Uma meia... a MINHA meia. Obrigada, Lola ♥' : p.k === 'folha' ? 'Uma folhinha! Que lindo, Tho' : 'Uma tampinha... você é muito estranho. Te amo.', 2600);
    som.plim();
    ganhar(1);
    (S.vistos || (S.vistos = {})).presenteGato = true;
    salvar();
}
function ligarLaser() {
    const th = G('tho');
    laser = { x: Math.min(MUNDO.x1 - 10, FEFE.x + 40), y: FEFE.y };
    btnLaser.textContent = '✋ Guardar laser';
    FEFE.alvo = null;
    toast('Toque no chão pra mexer o laser 🔴');
    falar(FEFE, 'Tho... olha isso...', 1600);
    if (th && th !== gatoPerto && !['oculto', 'caos', 'escondido'].includes(th.estado)) {
        S.gatos.tho.dormindo = false;
        th.estado = 'laser';
        th.chegar = null;
        th.vel = 120;
        setTimeout(() => falar(th, '!!!!!', 900), 500);
    }
    const l = G('lola');
    if (l && !S.gatos.lola.dormindo && l.estado === 'parado' && Math.random() < .6)
        setTimeout(() => { if (laser) {
            l.estado = 'laser';
            l.vel = 45;
            pensar(l, 'luz vermelha...', 1600);
        } }, 1400);
    const c = G('clarinha');
    if (c && !S.gatos.clarinha.dormindo)
        setTimeout(() => pensar(c, '...que infantil.', 2000), 2200);
}
function desligarLaser() {
    laser = null;
    btnLaser.textContent = '🔴 Laser';
    gatos.forEach(g => { if (g.estado === 'laser') {
        g.estado = 'parado';
        g.timer = 3;
        g.vel = 30;
    } });
    const th = G('tho');
    if (th)
        setTimeout(() => falar(th, 'CADÊ?! CADÊ A LUZ?!', 1800), 300);
    S.gatos.tho.alegria = lim(S.gatos.tho.alegria + 12);
    if (!S.feitos.laser) {
        S.feitos.laser = true;
        ganhar(2);
    }
    salvar();
}
function atualizarLaser(dt) {
    const vis = tem('laser') && MAPA === 'quarto' && !bloqueioTela() && !montando && !esconde;
    if ((btnLaser.style.display === 'block') !== vis)
        btnLaser.style.display = vis ? 'block' : 'none';
    if (!laser)
        return;
    if (MAPA !== 'quarto') {
        desligarLaser();
        return;
    }
    laser.x += Math.sin(performance.now() / 90) * .15;
    laserBate -= dt;
    gatos.forEach(g => {
        if (g.estado !== 'laser')
            return;
        const dx = laser.x - g.x, dy = laser.y - g.y, d = Math.hypot(dx, dy);
        if (d < 4) {
            if (g.id === 'tho' && Math.random() < dt * 2) {
                falar(g, pick(['PEGUEI!', '...cadê?', 'é MEU']), 800);
                particula('poeira', g.x, g.y - 2, 2);
            }
            return;
        }
        const v = (g.vel || 60) * dt, nx = g.x + dx / d * v, ny = g.y + dy / d * v;
        g.dir = dx > 0 ? 1 : -1;
        if (!bloqueado(nx, ny, 6)) {
            g.x = nx;
            g.y = ny;
        }
        else if (g.id === 'tho' && laserBate <= 0) {
            laserBate = 1.1;
            som.crash();
            shake = Math.max(shake, 3);
            particula('poeira', g.x, g.y - 6, 4);
            falar(g, pick(['AI!', '*bate na parede*', 'eu tô bem!!', 'foi de propósito']), 1000);
            g.x -= dx / d * 6;
            g.y -= dy / d * 6;
            if (bloqueado(g.x, g.y, 6)) {
                g.x += dx / d * 6;
                g.y += dy / d * 6;
            }
        }
        else {
            if (!bloqueado(nx, g.y, 6))
                g.x = nx;
            else if (!bloqueado(g.x, ny, 6))
                g.y = ny;
        }
    });
}
function desenharLaser(lista) { if (!laser || MAPA !== 'quarto')
    return; lista.push({ b: 9998, f: () => { const x = Math.round(laser.x), y = Math.round(laser.y); ctx.fillStyle = 'rgba(255,40,60,.35)'; ctx.fillRect(x - 2, y - 1, 5, 3); ctx.fillRect(x - 1, y - 2, 3, 5); ctx.fillStyle = '#ff2a3c'; ctx.fillRect(x - 1, y - 1, 3, 3); ctx.fillStyle = '#ffd0d6'; ctx.fillRect(x, y, 1, 1); } }); }
function chamadaVideo() {
    let fase = 'chamando', ini = performance.now(), acenar = 0, beijos = [], fala = -1, falandoAte = 0, raf;
    abrir(`📹 ${NOME_MINHA}`, `<div class="mg"><canvas id="cvVideo" width="128" height="80" style="display:block;margin:0 auto;height:min(calc(92vh - 210px),220px);width:auto;max-width:100%;image-rendering:pixelated;background:#1b1622"></canvas>
    <p id="vidMsg" style="margin:6px 0;min-height:20px">Chamando...</p>
    <div class="lanes" style="gap:6px;flex-wrap:wrap"><button class="btn branco" data-v="acenar" style="width:auto;margin:0" disabled>👋 Acenar</button><button class="btn branco" data-v="beijo" style="width:auto;margin:0" disabled>😘 Beijo</button><button class="btn branco" data-v="falar" style="width:auto;margin:0" disabled>💬 Conversar</button><button class="btn" data-v="sair" style="width:auto;margin:0;background:#e0304a">📵</button></div></div>`, false);
    const cv = $('cvVideo'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const toque = setInterval(() => { if (fase !== 'chamando' || !$('cvVideo'))
        return clearInterval(toque); if (AC) {
        tom(AC.currentTime, 880, .15, .04, 'sine');
        tom(AC.currentTime + .2, 880, .15, .04, 'sine');
    } }, 1100);
    setTimeout(() => { if (!$('cvVideo'))
        return; fase = 'on'; ini = performance.now(); som.plim(); document.querySelectorAll('[data-v]').forEach(b => b.disabled = false); $('vidMsg').textContent = pick(FALAS_CHAMADA.slice(0, 2)); falandoAte = performance.now() + 2200; }, 2300);
    const pele = '#f8dcc8';
    const lp = () => {
        if (!$('cvVideo')) {
            clearInterval(toque);
            return;
        }
        const agora = performance.now(), t = (agora - ini) / 1000;
        x.fillStyle = '#e9dccb';
        x.fillRect(0, 0, 128, 80);
        x.fillStyle = '#d8c8b4';
        x.fillRect(0, 58, 128, 22);
        x.fillStyle = '#c9b49c';
        x.fillRect(0, 57, 128, 1);
        x.fillStyle = '#2a1d30';
        x.fillRect(8, 8, 26, 20);
        x.fillStyle = '#8fcaff';
        x.fillRect(9, 9, 24, 18);
        x.fillStyle = '#fff';
        x.fillRect(12, 12, 6, 3);
        x.fillStyle = '#2a1d30';
        x.fillRect(20, 9, 1, 18);
        x.fillRect(9, 17, 24, 1);
        x.fillStyle = '#2a1d30';
        x.fillRect(100, 10, 16, 20);
        x.fillStyle = '#c8242e';
        x.fillRect(101, 11, 14, 18);
        x.fillStyle = '#1d1b22';
        x.fillRect(104, 14, 8, 6);
        if (fase === 'chamando') {
            x.fillStyle = 'rgba(27,22,34,.75)';
            x.fillRect(0, 0, 128, 80);
            x.fillStyle = '#fff';
            x.font = 'bold 8px monospace';
            x.fillText(`Chamando ${NOME_MINHA}...`, 24, 36);
            const p = Math.floor(t * 2) % 3;
            for (let i = 0; i < 3; i++) {
                x.fillStyle = i === p ? '#ff7aa8' : '#5a4a6a';
                x.fillRect(56 + i * 6, 44, 4, 4);
            }
            requestAnimationFrame(lp);
            return;
        }
        const fx = ((t * 14) % 190) - 30, kx = ((t * 11 + 90) % 200) - 34;
        pomPx(x, Math.round(fx), 62 + Math.round(Math.abs(Math.sin(t * 6))), ['#8a8d96', '#eceae6', '#5a5d66']);
        pomPx(x, Math.round(kx), 64 + Math.round(Math.abs(Math.sin(t * 5 + 1))), ['#e6a050', '#f6dcb0', '#e6a050']);
        const falando = agora < falandoAte, pisca = Math.floor(t * 1.2) % 5 === 0 && (t % 0.83) < .15;
        const spr0 = pisca ? isiSpr.piscando : (falando && Math.floor(t * 6) % 2 ? isiSpr.feliz : isiSpr.frente);
        const b = Math.round(Math.sin(t * 1.5));
        x.drawImage(spr0, 0, 0, 16, 21, 36, 2 + b, 56, 74);
        if (acenar > agora) {
            const ang = Math.sin(t * 14) * 3;
            x.fillStyle = '#1f1d24';
            x.fillRect(86, 52 + b, 8, 12);
            x.fillStyle = pele;
            x.fillRect(88 + Math.round(ang), 36 + b, 6, 16);
            x.fillRect(86 + Math.round(ang), 30 + b, 10, 8);
        }
        beijos = beijos.filter(h => agora - h.t < 1600);
        beijos.forEach(h => { const k = (agora - h.t) / 1600; coracaoPx(x, '#ff5c8d', h.x + Math.sin(k * 8) * 4, 52 - k * 46, 2); });
        x.fillStyle = '#2a1d30';
        x.fillRect(96, 52, 30, 26);
        x.fillStyle = '#3a2f44';
        x.fillRect(97, 53, 28, 24);
        x.drawImage(fefeSpr.down[0], 0, 0, 16, 16, 101, 54, 22, 22);
        const s = Math.floor(t), mm = String(Math.floor(s / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0');
        x.fillStyle = 'rgba(0,0,0,.45)';
        x.fillRect(2, 2, 26, 8);
        x.fillStyle = '#fff';
        x.font = '6px monospace';
        x.fillText(`${mm}:${ss}`, 5, 8);
        raf = requestAnimationFrame(lp);
    };
    requestAnimationFrame(lp);
    document.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
        const v = b.dataset.v, agora = performance.now();
        audio();
        if (v === 'sair') {
            fechar();
            clearInterval(toque);
            if (fase === 'on') {
                toast(`Chamada encerrada · ${NOME_MINHA} ♥`);
                if (!S.feitos.chamada) {
                    S.feitos.chamada = true;
                    ganhar(1);
                    salvar();
                }
            }
            return;
        }
        if (v === 'acenar') {
            acenar = agora + 1800;
            $('vidMsg').textContent = pick(['Oiiii amor! 👋', 'Oi, linda!', 'Tchauzinho! Mentira, ainda não kkkk']);
            falandoAte = agora + 1600;
            som.pop();
        }
        if (v === 'beijo') {
            for (let i = 0; i < 5; i++)
                beijos.push({ x: 44 + Math.random() * 40, t: agora + i * 120 });
            $('vidMsg').textContent = pick(['Recebi! Mandei outro 😘', 'Mwah! ♥', 'Guardei esse beijo aqui']);
            falandoAte = agora + 1500;
            som.plim();
        }
        if (v === 'falar') {
            fala = (fala + 1) % FALAS_CHAMADA.length;
            $('vidMsg').textContent = FALAS_CHAMADA[fala];
            falandoAte = agora + 2400;
            if (AC)
                tom(AC.currentTime, 520 + Math.random() * 120, .08, .03, 'triangle');
        }
    });
}
function codigoChuva(c) { return (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95; }
async function buscarClima() {
    try {
        const ctrl = new AbortController();
        const tmo = setTimeout(() => ctrl.abort(), 7000);
        const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.96&longitude=-46.33&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=4', { signal: ctrl.signal });
        clearTimeout(tmo);
        const j = await r.json();
        climaReal = { temp: j.current.temperature_2m, code: j.current.weather_code, dias: j.daily.time.map((t, i) => ({ t, code: j.daily.weather_code[i], max: j.daily.temperature_2m_max[i], min: j.daily.temperature_2m_min[i] })), quando: Date.now() };
        S.climaCache = climaReal;
        salvar();
    }
    catch (e) {
        if (S.climaCache && Date.now() - S.climaCache.quando < 6 * 3600e3)
            climaReal = S.climaCache;
    }
}
function abrirTempo() {
    const c = climaReal;
    if (!c) {
        abrir('☀️ Tempo em Santos', `<div class="mg"><p>Não consegui ver a previsão agora 😕</p><p style="font-size:13px;opacity:.7">Precisa de internet. Por enquanto o clima do jogo é de mentirinha.</p></div>`, true);
        buscarClima();
        return;
    }
    const [ic, txt] = climaInfo(c.code), dia = t => { const [a, m, d] = t.split('-').map(Number); return new Date(a, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''); };
    abrir('☀️ Tempo em Santos', `<div class="mg"><div style="font-size:46px;line-height:1">${ic}</div><p style="font-size:26px;margin:4px 0"><b>${Math.round(c.temp)}°</b></p><p style="margin:0 0 10px">${txt}</p>
    <div style="display:flex;gap:8px;justify-content:center">${c.dias.slice(1, 4).map(d => `<div class="px" style="padding:6px 10px;background:#f4eef8;text-align:center;font-size:13px"><b>${dia(d.t)}</b><div style="font-size:22px">${climaInfo(d.code)[0]}</div>${Math.round(d.max)}° / ${Math.round(d.min)}°</div>`).join('')}</div>
    <p style="font-size:11px;opacity:.55;margin:10px 0 0">Dados: Open-Meteo · atualizado ${new Date(c.quando).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p></div>`, true);
}
function atualizarExtras21(dt) { atualizarSol(dt); atualizarPresentes(dt); atualizarLaser(dt); }
function extrasDesenho21(lista) { desenharSol(lista); desenharLaser(lista); }
