function pensar(alvo, txt, ms = 2600) { falar(alvo, '💭 ' + txt, ms); }
function estiloBalao(el, alvo, txt) {
    const t = txt.trim(), letras = t.replace(/[^A-Za-zÀ-ú]/g, '');
    let c = '';
    if (t.startsWith('💭'))
        c = 'pensa';
    else if (/^\*.*\*$/.test(t))
        c = 'fazendo';
    else if (/♥|te amo|amor/i.test(t))
        c = 'amor';
    else if (t.includes('!!') || (letras.length >= 4 && letras === letras.toUpperCase()))
        c = 'grito';
    else if (/^\.\.\./.test(t) || /^prr/i.test(t))
        c = 'sussurro';
    if (c)
        el.classList.add(c);
    const cor = alvo === FEFE ? '#ff7aa8' : alvo === ISI ? '#e2b672' : (alvo && COR_FALA[alvo.id]) || null;
    if (cor)
        el.style.setProperty('--cor', cor);
}
function arrumarBaloes(vis) {
    vis.forEach(v => { v.w = v.b.el.offsetWidth; v.h = v.b.el.offsetHeight + 6; });
    vis.sort((a, b) => b.y - a.y);
    const ok = [];
    vis.forEach(v => {
        for (let tent = 0; tent < 10; tent++) {
            const o = ok.find(o => Math.abs(v.x - o.x) < (v.w + o.w) / 2 + 4 && v.y > o.y - o.h && v.y - v.h < o.y);
            if (!o)
                break;
            if (o.y - o.h - 2 - v.h >= 92)
                v.y = o.y - o.h - 2;
            else {
                v.x = v.x >= o.x ? o.x + (o.w + v.w) / 2 + 6 : o.x - (o.w + v.w) / 2 - 6;
            }
        }
        v.x = Math.max(v.w / 2 + 6, Math.min(innerWidth - v.w / 2 - 6, v.x));
        ok.push(v);
    });
    vis.forEach(v => { v.b.el.style.left = Math.round(v.x) + 'px'; v.b.el.style.top = Math.round(v.y) + 'px'; });
}
function checarConquistas(dt) {
    conqT -= dt;
    if (conqT > 0)
        return;
    conqT = 1;
    const vs = S.vistos || (S.vistos = {}), cq = S.conq || (S.conq = {});
    for (const k in S.feitos)
        if (k !== 'dia' && S.feitos[k])
            vs[k] = true;
    if (sessao && sessao.gostou >= 4)
        vs.chamego = true;
    let mudou = false;
    CONQUISTAS.forEach(c => { if (!cq[c.id] && c.ok()) {
        cq[c.id] = Date.now();
        conqFila.push(c);
        mudou = true;
    } });
    if (mudou) {
        salvar();
        atualizarBadgeConq();
    }
}
function nConq() { return CONQUISTAS.filter(c => S.conq && S.conq[c.id]).length; }
function atualizarBadgeConq() { const b = $('btnConq'); if (b)
    b.title = `Conquistas ${nConq()}/${CONQUISTAS.length}`; }
function abrirConquistas() {
    const cq = S.conq || {};
    abrir(`Conquistas 🏆 ${nConq()}/${CONQUISTAS.length}`, `<div class="conqLista">${CONQUISTAS.map(c => {
        const tem = !!cq[c.id];
        const nome = tem || !c.secreta ? c.n : '???', desc = tem ? c.d : (c.secreta ? c.secreta : c.d);
        return `<div class="conq px ${tem ? 'tem' : ''}"><span class="ci">${tem ? c.ic : '🔒'}</span><span><b>${esc(nome)}</b><br><small>${esc(desc)}</small></span></div>`;
    }).join('')}</div>`, true, true);
}
function tocouJanela(wx, wy) {
    if (MAPA !== 'quarto' || wy < 10 || wy > 36)
        return false;
    if (!((wx >= 30 && wx <= 60) || (wx >= 228 && wx <= 258)))
        return false;
    const agora = performance.now();
    janelaToques = janelaToques.filter(t => agora - t < 4000);
    janelaToques.push(agora);
    const n = janelaToques.length;
    particula('brilho', wx, wy + 6, 2);
    if (AC)
        tom(AC.currentTime, 600 + n * 120, .2, .04, 'sine');
    if (n >= 5) {
        janelaToques = [];
        surpresa();
        return true;
    }
    if (n === 1)
        falar(FEFE, pick(['Que céu bonito...', 'Olha essa janela', 'Hmm, brilhou alguma coisa?']), 1600);
    else if (n === 3)
        falar(FEFE, 'Tem alguma coisa brilhando lá fora...', 1800);
    return true;
}
function surpresa() {
    if (modalAberto())
        return;
    som.plim();
    abrir('✨ Uma estrela cadente!', `<div class="mg"><canvas id="cvEstrela" width="128" height="72" style="display:block;margin:0 auto;height:min(calc(92vh - 200px),230px);width:auto;max-width:100%;image-rendering:pixelated"></canvas>
    <p id="estrelaMsg" style="margin:6px 0">Faça um pedido...</p><button class="btn" id="btnPedido" style="width:auto;margin:0 auto">🌠 Fazer um pedido</button></div>`, false);
    const cv = $('cvEstrela'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const ini = performance.now(), est = [];
    for (let i = 0; i < 50; i++)
        est.push([Math.random() * 128, Math.random() * 60, Math.random()]);
    let fogos = [];
    const lp = () => {
        if (!$('cvEstrela'))
            return;
        const t = (performance.now() - ini) / 1000;
        x.fillStyle = '#141030';
        x.fillRect(0, 0, 128, 72);
        x.fillStyle = '#221a48';
        x.fillRect(0, 36, 128, 36);
        est.forEach(([a, b, c]) => { x.fillStyle = (Math.sin(t * 3 + c * 9) > .3) ? '#fff' : '#7d74b8'; x.fillRect(Math.round(a), Math.round(b), 1, 1); });
        const k = (t % 3.2) / 1.4;
        if (k < 1) {
            const sx = 10 + k * 100, sy = 6 + k * 30;
            for (let i = 0; i < 14; i++) {
                x.fillStyle = `rgba(255,244,194,${1 - i / 14})`;
                x.fillRect(Math.round(sx - i * 2.2), Math.round(sy - i * .66), 2, 1);
            }
            x.fillStyle = '#fff';
            x.fillRect(Math.round(sx), Math.round(sy) - 1, 2, 3);
        }
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 58, 128, 14);
        x.fillStyle = '#3b2a48';
        x.fillRect(0, 58, 128, 2);
        x.drawImage(fefeSpr.pc, 48, 40);
        x.drawImage(isiSpr.sentadaCostas, 62, 40);
        gatoPequeno(x, 'lola', 'feliz', 30, 46);
        gatoPequeno(x, 'clarinha', 'feliz', 86, 46);
        gatoPequeno(x, 'tho', 'feliz', 100, 46);
        fogos.forEach(f => { f.v += 1 / 60; f.p.forEach(p => { const px = f.x + Math.cos(p) * f.v * 22, py = f.y + Math.sin(p) * f.v * 22 + f.v * f.v * 6; coracaoPx(x, f.c, px, py); }); });
        fogos = fogos.filter(f => f.v < 1.4);
        if (cv.dataset.fogos && Math.random() < .04)
            fogos.push({ x: 20 + Math.random() * 88, y: 10 + Math.random() * 20, v: 0, c: pick(['#ff5c8d', '#ffd36e', '#8fcaff', '#ff9ec4']), p: Array.from({ length: 8 }, (_, i) => i * Math.PI / 4) });
        requestAnimationFrame(lp);
    };
    requestAnimationFrame(lp);
    $('btnPedido').onclick = () => {
        cv.dataset.fogos = 1;
        if (AC)
            [523, 659, 784, 1046].forEach((f, i) => tom(AC.currentTime + i * .18, f, .5, .05, 'triangle'));
        const prim = !V('segredo');
        (S.vistos || (S.vistos = {})).segredo = true;
        salvar();
        $('estrelaMsg').innerHTML = '';
        $('btnPedido').outerHTML = `<div class="papel px" style="text-align:left;max-height:none">${esc(CARTA_SECRETA)}<span class="ass">${esc(ASSINATURA)}</span></div>`;
        if (prim)
            setTimeout(() => { ganhar(5); }, 800);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Você achou! ♥', 2400), 400);
    };
}
function mostrarInicio(aoJogar) {
    const d = document.createElement('div');
    d.id = 'inicio';
    d.className = 'inicio';
    d.innerHTML = `<canvas id="cvInicio" width="192" height="108"></canvas>
    <div class="inicioUI"><h1 class="tituloJogo">Fefe's Life</h1><div class="subJogo">feito com amor pela ${esc(NOME_MINHA)} ♥</div>
    <div style="display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap"><button class="btn" id="btnJogar" style="margin:0">${S.tutoFeito ? 'Continuar' : 'Jogar'}</button>${S.tutoFeito ? '<button class="btn branco" id="btnNovoJogo" style="margin:0;font-size:13px;padding:8px 12px;width:auto">Novo jogo</button>' : ''}</div>${(() => { try {
        return localStorage.getItem(CHAVE + '-anterior') ? '<button class="btn branco" id="btnJogoAnt" style="margin-top:6px;font-size:12px;padding:5px 10px;width:auto;opacity:.85">↩ Voltar pro jogo anterior</button>' : '';
    }
    catch (e) {
        return '';
    } })()}<div class="infoJogo">🏆 ${nConq()}/${CONQUISTAS.length} conquistas</div></div>`;
    document.body.appendChild(d);
    const cv = $('cvInicio'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const ini = performance.now();
    const est = Array.from({ length: 40 }, () => [Math.random() * 192, Math.random() * 60, Math.random() * 6]);
    const lp = () => {
        if (!document.getElementById('cvInicio'))
            return;
        const t = (performance.now() - ini) / 1000;
        const gr = x.createLinearGradient(0, 0, 0, 108);
        gr.addColorStop(0, '#2a1d4a');
        gr.addColorStop(.6, '#8a4f8f');
        gr.addColorStop(1, '#ff9ec4');
        x.fillStyle = gr;
        x.fillRect(0, 0, 192, 108);
        est.forEach(([a, b, c]) => { x.fillStyle = Math.sin(t * 2 + c) > 0 ? '#fff' : '#c9b8f0'; x.fillRect(Math.round(a), Math.round(b), 1, 1); });
        for (let i = 0; i < 7; i++) {
            const y = 108 - ((t * 10 + i * 17) % 110);
            coracaoPx(x, i % 2 ? '#ff5c8d' : '#ffd9e6', (i * 29 + 8) % 184, y);
        }
        x.fillStyle = '#5d4470';
        x.fillRect(0, 86, 192, 22);
        x.fillStyle = '#c48a5a';
        x.fillRect(0, 90, 192, 18);
        for (let i = 0; i < 192; i += 16) {
            x.fillStyle = '#a86f45';
            x.fillRect(i, 90, 1, 18);
        }
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 89, 192, 1);
        const b = Math.floor(t * 3) % 2;
        x.drawImage(fefeSpr.down[0], 80, 64 + b);
        x.drawImage(isiSpr.feliz || isiSpr.frente, 96, 64 + (1 - b));
        const vai = (id, off, vel, y) => { const p = ((t * vel + off) % 220) - 14, dir = Math.floor((t * vel + off) / 220) % 2; const X = dir ? 178 - p : p; gatoPequeno(x, id, 'feliz', Math.round(X), y + (Math.floor(t * 6) % 2)); };
        vai('lola', 0, 22, 80);
        vai('tho', 90, 38, 84);
        vai('clarinha', 160, 14, 78);
        requestAnimationFrame(lp);
    };
    requestAnimationFrame(lp);
    $('btnJogar').onclick = () => { audio(); som.pop(); d.classList.add('sai'); setTimeout(() => { d.remove(); aoJogar(); }, 450); };
    const nj = $('btnNovoJogo');
    if (nj)
        nj.onclick = () => {
            som.pop();
            if (!nj.dataset.conf) {
                nj.dataset.conf = 1;
                nj.textContent = 'Tem certeza? Toque de novo';
                nj.style.background = '#ffd6e6';
                return;
            }
            try {
                salvar();
                localStorage.setItem(CHAVE + '-anterior', JSON.stringify(S));
                localStorage.removeItem(CHAVE);
            }
            catch (e) { }
            location.reload();
        };
    const ja = $('btnJogoAnt');
    if (ja)
        ja.onclick = () => {
            som.pop();
            if (!ja.dataset.conf) {
                ja.dataset.conf = 1;
                ja.textContent = 'Trocar pelo jogo anterior? Toque de novo';
                return;
            }
            try {
                const ant = localStorage.getItem(CHAVE + '-anterior');
                salvar();
                localStorage.setItem(CHAVE + '-anterior', JSON.stringify(S));
                localStorage.setItem(CHAVE, ant);
            }
            catch (e) { }
            location.reload();
        };
}
function atualizarPensa(dt) {
    if (MAPA !== 'quarto' || bloqueioTela() || document.getElementById('inicio'))
        return;
    pensaT -= dt;
    if (pensaT > 0)
        return;
    pensaT = 28 + Math.random() * 30;
    if (baloes.length)
        return;
    const livres = gatos.filter(g => !S.gatos[g.id].dormindo && ['parado', 'andando'].includes(g.estado) && g !== gatoPerto);
    if (Math.random() < .25 && !FEFE.pose)
        return pensar(FEFE, PENSAMENTOS.fefe());
    if (livres.length) {
        const g = pick(livres);
        pensar(g, pick(PENSAMENTOS[g.id]));
    }
}
