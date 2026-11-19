function pertoAberto() { return !!gatoPerto; }
function pataLevantada(g, esq) {
    const n = g.map(r => r.slice()), [x0, x1] = esq ? [8, 14] : [17, 23];
    for (let y = 24; y <= 27; y++)
        for (let x = x0; x <= x1; x++)
            n[y][x] = y < 27 ? g[y + 1][x] : ((x === x0 || x === x1) ? 'O' : 'b');
    return n;
}
function gatoGrandeSVG(id, h, amassa) {
    const c = GATOS[id], st = S.gatos[id], cor = Object.assign({}, c.cor);
    const aplicaLaco = g => g;
    const g = aplicaLaco(montarGato(c.tipo, h));
    let pisc = '';
    if (h !== 'dormindo' && h !== 'feliz') {
        const f = aplicaLaco(montarGato(c.tipo, h, true));
        const dif = f.map((r, y) => r.map((ch, x) => ch !== g[y][x] ? ch : '.'));
        pisc = `<g class="pisc">${rectsSVG(dif, cor)}</g>`;
    }
    const rabo = (fr, cls) => `<g class="${cls}">${rectsSVG(fr.map(r => [...r]), { O: cor.O, T: cor.T }, 27, 14)}</g>`;
    const corpo = amassa ? `<g class="pA">${rectsSVG(pataLevantada(g, true), cor)}</g><g class="pB">${rectsSVG(pataLevantada(g, false), cor)}</g>` : rectsSVG(g, cor);
    return `<svg viewBox="-3 -1 42 31"><rect x="2" y="28" width="28" height="2" fill="rgba(0,0,0,.25)"/><g class="bob">${rabo(RABO[0], 'rA')}${rabo(RABO[1], 'rB')}${corpo}${pisc}${acessorioGrandeSVG(id)}</g></svg>`;
}
function desenharFundoPerto() {
    let s = '';
    const R = (x, y, w, h, f) => { s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`; };
    R(0, 0, 96, 42, '#5d4470');
    for (let y = 4; y < 40; y += 8)
        for (let x = ((y / 8) % 2) * 6 + 2; x < 96; x += 12) {
            R(x, y, 1, 1, '#8a6d9e');
        }
    R(8, 6, 24, 20, '#2a1d30');
    R(9, 7, 22, 18, '#efe6f5');
    const [c1, c2] = corCeu(new Date().getHours());
    R(10, 8, 20, 16, c1);
    R(10, 8, 20, 6, c2);
    R(19, 8, 2, 16, '#efe6f5');
    R(10, 15, 20, 2, '#efe6f5');
    R(4, 6, 4, 22, '#a24d6b');
    R(32, 6, 4, 22, '#a24d6b');
    R(66, 8, 16, 20, '#2a1d30');
    R(67, 9, 14, 18, '#1f1a2e');
    R(71, 13, 6, 6, '#ffb52e');
    R(72, 14, 4, 4, '#ffcf5e');
    R(0, 40, 96, 2, '#c9b8d6');
    R(0, 42, 96, 1, '#2a1d30');
    R(0, 43, 96, 23, '#c98f5f');
    for (let y = 43; y < 66; y += 5) {
        R(0, y + 4, 96, 1, '#a8714a');
        for (let x = ((y / 5) % 2) * 14; x < 96; x += 28)
            R(x, y, 1, 4, '#a8714a');
    }
    [[22, 54, 52, 1], [18, 55, 60, 1], [16, 56, 64, 7], [18, 63, 60, 1], [22, 64, 52, 1]].forEach(([x, y, w, h]) => R(x, y, w, h, '#c96d93'));
    [[23, 55, 50, 1], [19, 56, 58, 1], [17, 57, 62, 5], [19, 62, 58, 1], [23, 63, 50, 1]].forEach(([x, y, w, h]) => R(x, y, w, h, '#f3a6c4'));
    [[21, 58, 54, 1], [21, 60, 54, 1]].forEach(([x, y, w, h]) => R(x, y, w, h, '#f8c3d8'));
    document.getElementById('fundoP').innerHTML = s;
}
function renderGatoPerto(hTemp) {
    if (!gatoPerto)
        return;
    const st = S.gatos[gatoPerto.id];
    const h = hTemp || (sessao.humor && performance.now() < sessao.humorAte ? sessao.humor : humor(st));
    const el = $('gatoP');
    el.innerHTML = gatoGrandeSVG(gatoPerto.id, h, sessao.amassaAte > performance.now());
    el.classList.toggle('dorme', h === 'dormindo');
}
function mudarHumorPerto(h, ms) { sessao.humor = h; sessao.humorAte = performance.now() + ms; renderGatoPerto(); clearTimeout(sessao.th); sessao.th = setTimeout(() => { if (gatoPerto)
    renderGatoPerto(); }, ms + 20); }
function animarGatoPerto(cls) { const el = $('gatoP'); el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 600); }
function falarPerto(t, ms = 2000) { const b = $('balaoP'); b.textContent = t; b.classList.add('on'); clearTimeout(falarPerto.t); falarPerto.t = setTimeout(() => b.classList.remove('on'), ms); }
function flutuarPerto(x, y, tipo) { const el = document.createElement('div'); el.className = 'flutP'; const [m, c] = PART[tipo]; el.innerHTML = `<svg viewBox="0 0 ${m[0].length} ${m.length}" width="100%">${rectsSVG(m, c)}</svg>`; el.style.left = (x - 13) + 'px'; el.style.top = (y - 13) + 'px'; $('cenaP').appendChild(el); setTimeout(() => el.remove(), 1000); }
function abrirPerto(g) {
    gatoPerto = g;
    g.estado = 'carinho';
    g.timer = 999;
    g.chegar = null;
    $('maoP').innerHTML = iconeSVG('mao', 62).replace(/style="height:62px"/, 'width="100%"');
    $('gatoP').style.setProperty('--ox', '0px');
    sessao = { amassaAte: 0, varinha: false, pulos: 0, ultMov: 0, ticks: 0, gostou: 0, ronrom: 0, dist: 0, toler: g.id === 'clarinha' ? 5 + Math.floor(S.confClarinha / 12) + Math.floor(Math.random() * 3) : 99, modo: 'carinho', escovadas: 0, esfregadas: 0, ganhos: 0, humor: null, humorAte: 0, falouEm: 0, bonus: false };
    desenharFundoPerto();
    $('gatoP').className = 'gatoP';
    renderGatoPerto();
    montarPainelPerto();
    $('perto').classList.add('on');
    joy = { x: 0, y: 0 };
    $('base').style.display = 'none';
    const st = S.gatos[g.id];
    if (st.dormindo)
        falarPerto('zzz...');
    else {
        som.miau(g.id);
        falarPerto(pick(FALAS[g.id].perto));
    }
}
function montarPainelPerto() {
    const g = gatoPerto, st = S.gatos[g.id], c = GATOS[g.id];
    const bot = (id, ic, txt, extra = '') => `<button class="px" data-p="${id}" ${extra}>${iconeSVG(ic, 22)}${txt}</button>`;
    $('painelP').innerHTML = `<h3>${c.nome}</h3><div class="desc">${c.desc}</div>
    <div class="barrasM">${barrasHTML(st, true)}${g.id === 'clarinha' ? `<div class="mini"><span style="display:flex;gap:5px;align-items:center">${PARTsvg('coracao', 13)}Confiança</span><div class="segs g">${segs(S.confClarinha, '#c08cff')}</div></div>` : ''}<div class="mini"><span style="display:flex;gap:5px;align-items:center">${PARTsvg('nota', 13)}Ronrom</span><div class="segs g" id="ronromBar">${segs(sessao.ronrom, '#ffd36e')}</div></div></div>
    <div class="grade">
      ${bot('comer', 'tigela', 'Comer', st.dormindo ? 'disabled' : '')}
      ${bot('brincar', 'novelo', 'Brincar', st.dormindo ? 'disabled' : '')}
      ${bot('dormir', 'lua', st.dormindo ? 'Acordar' : 'Dormir')}
      ${bot('acc', 'laco', 'Acessório', Object.keys(ACESSORIOS).some(tem) ? '' : 'disabled')}
      ${tem('varinha') ? bot('varinha', 'pena', sessao.varinha ? 'Guardar varinha' : 'Varinha') : ''}
      ${bot('escova', 'pena', sessao.modo === 'escova' ? 'Parar de escovar' : 'Escovar', st.dormindo ? 'disabled' : '')}
      ${bot('banho', 'agua2', sessao.modo === 'banho' ? 'Terminar banho' : 'Banho', st.dormindo ? 'disabled' : '')}
      ${g.trav ? bot('tirar', 'laco', 'Tirar ' + TRAVESSURAS[g.trav.id].n.replace(/^an? /, '')) : ''}
      ${g.id === 'tho' ? bot('esconde', 'novelo', 'Esconde-esconde', st.dormindo ? 'disabled' : '') : ''}
      ${st.doente ? bot('remedio', 'tigela', st.remedio ? 'Agora carinho!' : 'Remédio 💊', st.remedio ? 'disabled' : '') : ''}
      ${bot('truque', 'pena', nivelTruque(g.id) >= 3 ? 'Pedir truque' : 'Ensinar truque', st.dormindo || st.doente ? 'disabled' : '')}
    </div>
    ${Object.keys(ACESSORIOS).some(tem) ? '' : '<div style="font-size:12px;opacity:.6">acessórios ficam na lojinha</div>'}
    <button class="btn branco" id="sairP">Voltar pro quarto</button>`;
    $('painelP').querySelectorAll('[data-p]').forEach(b => b.onclick = () => acaoPerto(b.dataset.p));
    $('sairP').onclick = () => fecharPerto('ok');
}
function PARTsvg(t, h) { const [m, c] = PART[t]; return `<svg viewBox="0 0 ${m[0].length} ${m.length}" style="height:${h}px">${rectsSVG(m, c)}</svg>`; }
function acaoPerto(a) {
    if (a === 'tirar' || a === 'esconde')
        return acaoExtra(a);
    if (a === 'remedio') {
        const g = gatoPerto, st = S.gatos[g.id];
        st.remedio = true;
        sessao.gostouRem = sessao.gostou || 0;
        salvar();
        som.pop();
        mudarHumorPerto('triste', 1500);
        falarPerto(g.id === 'tho' ? 'ECA. EU FUI ENVENENADO.' : g.id === 'lola' ? '*engole* ...eca.' : 'Você me traiu com esse sachê.', 2400);
        toast('Agora faz carinho pra ajudar a sarar ♥');
        montarPainelPerto();
        return;
    }
    if (a === 'truque') {
        const g = gatoPerto, T = TRUQUES[g.id];
        if (nivelTruque(g.id) >= 3) {
            mudarHumorPerto('feliz', 2200);
            falarPerto(T.feito, 2400);
            som.miau(g.id, 1.1);
            if (!S.feitos['pede_' + g.id]) {
                S.feitos['pede_' + g.id] = true;
                ganhar(1);
                salvar();
            }
            return;
        }
        if (g.id === 'clarinha' && S.confClarinha < 50)
            return falarPerto('Truque? Eu? Não.', 2200);
        fecharPerto('ok');
        setTimeout(() => jogoTruque(g.id), 350);
        return;
    }
    const g = gatoPerto, st = S.gatos[g.id];
    if (a === 'acc') {
        const donos = Object.keys(ACESSORIOS).filter(tem);
        const i = donos.indexOf(st.acc);
        st.acc = i + 1 < donos.length ? donos[i + 1] : null;
        salvar();
        renderGatoPerto();
        som.pop();
        falarPerto(!st.acc ? 'Ufa, livre!' : g.id === 'tho' ? 'Eu tô RIDÍCULO. Amei.' : g.id === 'clarinha' ? '...tá, ficou bonito.' : 'Tô linda?!');
        return;
    }
    if (a === 'varinha') {
        sessao.varinha = !sessao.varinha;
        $('maoP').innerHTML = iconeSVG(sessao.varinha ? 'pena' : 'mao', 62).replace(/style="height:62px"/, 'width="100%"');
        montarPainelPerto();
        falarPerto(sessao.varinha ? (g.id === 'tho' ? 'PENA!!! PENA!!!' : g.id === 'clarinha' ? '...ok, isso me interessa.' : 'Oba, brincadeira!') : 'Ah, acabou?');
        if (!sessao.varinha)
            $('gatoP').style.setProperty('--ox', '0px');
        return;
    }
    if (a === 'escova') {
        sessao.modo = sessao.modo === 'escova' ? 'carinho' : 'escova';
        $('banheira').classList.remove('on');
        $('maoP').innerHTML = iconeSVG(sessao.modo === 'escova' ? 'escova' : 'mao', 62).replace(/style="height:62px"/, 'width="100%"');
        montarPainelPerto();
        if (sessao.modo === 'escova')
            falarPerto(g.id === 'lola' ? 'Oba, escovinha!' : g.id === 'tho' ? '...o que você vai fazer com isso?' : 'Só nas costas, ok?');
        return;
    }
    if (a === 'banho') {
        if (sessao.modo === 'banho') {
            terminarBanho();
            return;
        }
        if (g.id === 'tho' && Math.random() < .7) {
            falarPerto('BANHO NÃO!!! NUNCA!!!', 1400);
            som.miau('tho', 1.5);
            animarGatoPerto('treme');
            sessao.bloq = true;
            setTimeout(() => { $('gatoP').classList.add('sai'); setTimeout(() => { fecharPerto('fugiu'); toast('O Tho fugiu do banho kkkk'); }, 600); }, 700);
            return;
        }
        sessao.modo = 'banho';
        sessao.esfregadas = 0;
        $('banheira').classList.add('on');
        $('banheira').innerHTML = `<svg viewBox="0 0 60 22" width="100%">${rectsSVG(["....OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO.....", "...OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO....", "..OWBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWO...", "..OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO...", "..OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO...", "..OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO...", "..OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO...", "...OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO....", "....OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO.....", ".....OO............................................OO......"], { O: '#2a1d30', W: '#f4f1ec', B: '#9fd8f5' })}</svg>`;
        $('maoP').innerHTML = iconeSVG('agua2', 62).replace(/style="height:62px"/, 'width="100%"');
        montarPainelPerto();
        mudarHumorPerto('bravo', 2500);
        falarPerto(g.id === 'lola' ? 'Precisa mesmo? *chora*' : g.id === 'tho' ? '...tá. Mas eu tô de olho.' : 'Isso é humilhante.', 2200);
        return;
    }
    if (a === 'dormir') {
        st.dormindo = !st.dormindo;
        salvar();
        if (st.dormindo) {
            falarPerto(`Boa noite, ${NOME_DELA}...`);
            setTimeout(() => fecharPerto('ok'), 900);
        }
        else {
            som.miau(g.id);
            falarPerto('Bom diaaa!');
            renderGatoPerto();
            montarPainelPerto();
        }
        return;
    }
    fecharPerto('ok');
    if (a === 'comer')
        escolherComida(g);
    if (a === 'brincar')
        brincar(g);
}
function fecharPerto(motivo) {
    const g = gatoPerto;
    if (!g)
        return;
    const st = S.gatos[g.id];
    $('banheira').classList.remove('on');
    document.querySelectorAll('.bolha').forEach(b => b.remove());
    if (g.id === 'clarinha') {
        const antes = S.confClarinha;
        if (motivo === 'bravo')
            S.confClarinha = Math.max(0, S.confClarinha - 5);
        else if (sessao.gostou > 0 && (S.feitos.confHoje || 0) < 10) {
            S.confClarinha = Math.min(100, S.confClarinha + 5);
            S.feitos.confHoje = (S.feitos.confHoje || 0) + 5;
        }
        if (antes < 100 && S.confClarinha >= 100)
            setTimeout(() => toast('A Clarinha confia muito em você agora... senta no tapete e espera ela ♥'), 800);
        salvar();
    }
    if (sessao.ticks > 0) {
        st.alegria = lim(st.alegria + Math.min(25, sessao.gostou * 2.5));
        salvar();
    }
    som.ronrom(0);
    $('perto').classList.remove('on');
    $('maoP').style.display = 'none';
    gatoPerto = null;
    g.estado = 'parado';
    g.timer = 2 + Math.random() * 2;
    if (motivo === 'fugiu') {
        toast(`${GATOS[g.id].nome} saiu correndo!`);
        zoomies(g, 3);
    }
    else if (motivo === 'chega') {
        const [x, y] = pontoLonge(g);
        irPara(g, x, y, null, 28);
        falar(g, 'hmpf.');
    }
    else if (motivo === 'bravo') {
        const [x, y] = pontoLonge(g);
        irPara(g, x, y, null, 45);
    }
    else if (sessao.gostou > 2) {
        mostrarHumor(g, 'feliz', 3000);
        particula('coracao', g.x, g.y - 16, 2);
    }
}
function zonaToque(cx, cy) {
    const r = $('gatoP').getBoundingClientRect();
    const vx = -3 + (cx - r.left) / r.width * 42, vy = -1 + (cy - r.top) / r.height * 31;
    if (vx < 1 || vx > 31 || vy < 1 || vy > 29)
        return null;
    if (vy < 12)
        return 'cabeca';
    if (vy < 17)
        return (vx > 9 && vx < 23) ? 'queixo' : 'cabeca';
    return (vx > 9 && vx < 23) ? 'barriga' : 'costas';
}
function varinhaMove(e) {
    const r = cena.getBoundingClientRect(), agora = performance.now();
    const off = Math.max(-.32, Math.min(.32, (e.clientX - r.left) / r.width - .5));
    $('gatoP').style.setProperty('--ox', (off * r.width * .7).toFixed(0) + 'px');
    const dt = agora - (sessao.ultT || agora), d = sessao.ultP ? Math.hypot(e.clientX - sessao.ultP[0], e.clientY - sessao.ultP[1]) : 0;
    sessao.ultT = agora;
    sessao.ultP = [e.clientX, e.clientY];
    if (dt > 0 && d / dt > 1.3 && agora - sessao.ultMov > 650) {
        sessao.ultMov = agora;
        sessao.pulos++;
        animarGatoPerto('puloP');
        mudarHumorPerto('feliz', 600);
        if (Math.random() < .3)
            som.miau(gatoPerto.id, 1.2);
        const st = S.gatos[gatoPerto.id];
        st.alegria = lim(st.alegria + 2);
        st.energia = lim(st.energia - 1);
        if (sessao.pulos % 6 === 0 && sessao.ganhos < 4) {
            sessao.ganhos++;
            ganhar(1);
        }
        if (Math.random() < .3)
            falarPerto(gatoPerto.id === 'tho' ? pick(['PEGUEI!', 'QUASE!', 'DE NOVO!']) : gatoPerto.id === 'clarinha' ? pick(['hm!', 'quase...', '*foco*']) : pick(['Hihi!', 'Pega!', 'Mais!']), 1000);
    }
}
function moverMao(e) { const r = cena.getBoundingClientRect(), m = $('maoP'); m.style.display = 'block'; m.style.left = (e.clientX - r.left) + 'px'; m.style.top = (e.clientY - r.top) + 'px'; }
function tickEscova(z, e) {
    const g = gatoPerto, id = g.id, st = S.gatos[id];
    if (sessao.bloq)
        return;
    const r = cena.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
    sessao.escovadas++;
    flutuarPerto(px + 10, py, 'pelo');
    if (id === 'clarinha' && z === 'barriga') {
        som.chiado();
        mudarHumorPerto('bravo', 1200);
        falarPerto('Barriga NÃO!', 1200);
        return;
    }
    if (id === 'tho' && sessao.escovadas > 6 && Math.random() < .35) {
        som.miau('tho', 1.4);
        falarPerto('CHEGA! *morde a escova*', 1400);
        animarGatoPerto('treme');
        sessao.bloq = true;
        setTimeout(() => { $('gatoP').classList.add('sai'); setTimeout(() => fecharPerto('fugiu'), 600); }, 700);
        return;
    }
    mudarHumorPerto('feliz', 800);
    som.ronrom(id === 'lola' ? .4 : .25, id);
    setTimeout(() => { if (!acariciando)
        som.ronrom(0); }, 500);
    sessao.gostou++;
    if (sessao.escovadas === 12) {
        falarPerto(id === 'lola' ? 'Tô brilhando! ✨' : id === 'tho' ? '...ok, foi bom.' : 'Pelinho perfeito.', 2000);
        particula('brilho', g.x, g.y - 16, 3);
        for (let i = 0; i < 4; i++)
            setTimeout(() => flutuarPerto(px + (Math.random() * 80 - 40), py - 20, 'brilho'), i * 150);
        st.alegria = lim(st.alegria + 10);
        if (!S.feitos['escova_' + id]) {
            S.feitos['escova_' + id] = true;
            ganhar(2);
        }
        salvar();
    }
}
function tickBanho(z, e) {
    const g = gatoPerto, id = g.id;
    if (sessao.bloq)
        return;
    const r = cena.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
    sessao.esfregadas++;
    for (let i = 0; i < 2; i++) {
        const b = document.createElement('span');
        b.className = 'bolha';
        const s = 8 + Math.random() * 16;
        b.style.width = b.style.height = s + 'px';
        b.style.left = (px - s / 2 + Math.random() * 40 - 20) + 'px';
        b.style.top = (py - s / 2 + Math.random() * 30 - 15) + 'px';
        cena.appendChild(b);
    }
    if (Math.random() < .3)
        flutuarPerto(px, py - 10, 'bolha');
    if (Math.random() < .2)
        falarPerto(id === 'lola' ? pick(['*olhinhos tristes*', 'Tá acabando?']) : id === 'tho' ? pick(['Isso é tortura', 'Vou lembrar disso']) : pick(['...', '*suspira*']), 1200);
    mudarHumorPerto(Math.random() < .5 ? 'bravo' : 'triste', 900);
    if (sessao.esfregadas >= 14)
        terminarBanho();
}
function terminarBanho() {
    const g = gatoPerto, id = g.id, st = S.gatos[id];
    sessao.modo = 'carinho';
    $('banheira').classList.remove('on');
    document.querySelectorAll('.bolha').forEach(b => b.remove());
    $('maoP').innerHTML = iconeSVG('mao', 62).replace(/style="height:62px"/, 'width="100%"');
    if (sessao.esfregadas >= 8) {
        falarPerto(id === 'lola' ? 'Tô cheirosa pelo menos' : id === 'tho' ? 'Nunca mais. NUNCA.' : 'Agora me deixa secar em paz.', 2400);
        animarGatoPerto('treme');
        for (let i = 0; i < 6; i++)
            setTimeout(() => flutuarPerto(150 + Math.random() * 120, 120 + Math.random() * 80, 'agua'), i * 90);
        st.alegria = lim(st.alegria - 5);
        if (!S.feitos['banho_' + id]) {
            S.feitos['banho_' + id] = true;
            ganhar(3);
        }
        salvar();
        toast(`${GATOS[id].nome} tomou banho! Cheirosinho(a) ✨`);
    }
    else
        falarPerto('Ué, acabou? Eba!');
    montarPainelPerto();
}
function tickCarinho(z, e) {
    const g = gatoPerto, st = S.gatos[g.id], id = g.id, r = cena.getBoundingClientRect();
    if (sessao.bloq)
        return;
    const px = e.clientX - r.left, py = e.clientY - r.top;
    sessao.ticks++;
    const dorme = st.dormindo, agora = performance.now();
    const fala = (t, ms) => { if (agora - sessao.falouEm > 1400) {
        falarPerto(t, ms);
        sessao.falouEm = agora;
    } };
    const gostou = (forca, hum = 'feliz') => {
        sessao.gostou++;
        sessao.ronrom = Math.min(100, sessao.ronrom + forca);
        som.ronrom(.05 + sessao.ronrom / 100 * (id === 'lola' ? .5 : id === 'tho' ? .35 : .22), id);
        flutuarPerto(px, py - 10, dorme ? 'zz' : 'coracao');
        if (!dorme)
            mudarHumorPerto(hum, 900);
        if (sessao.ganhos < 4 && sessao.gostou % 5 === 0) {
            sessao.ganhos++;
            ganhar(1);
        }
        if (sessao.ronrom >= 100 && !sessao.bonus) {
            sessao.bonus = true;
            ganhar(2);
            st.alegria = lim(st.alegria + 10);
            falarPerto(id === 'lola' ? 'Eu te amo MUITO, Fefe!' : id === 'tho' ? 'MOTOR LIGADO! PRRRRR!' : '...você é ok, Fefe. Muito ok.', 2600);
            animarGatoPerto('cabecada');
            if (id !== 'clarinha')
                som.miau(id);
        }
        $('ronromBar').innerHTML = segs(sessao.ronrom, '#ffd36e');
    };
    if (dorme) {
        gostou(4);
        if (Math.random() < .15)
            fala('zzz... prrr');
        if (id === 'clarinha' && sessao.ticks > sessao.toler) {
            sessao.bloq = true;
            falarPerto('...me deixa dormir.');
            setTimeout(() => fecharPerto('ok'), 1200);
        }
        return;
    }
    const amassar = () => { sessao.amassaAte = performance.now() + 3000; renderGatoPerto(); setTimeout(() => gatoPerto && renderGatoPerto(), 3020); fala('*amassa pãozinho*', 2200); };
    if (sessao.ticks > 14 && Math.random() < .05 && !dorme) {
        mudarHumorPerto('comendo', 900);
        fala('*bocejo*', 1200);
        return;
    }
    if (id === 'lola') {
        gostou(z === 'queixo' || z === 'cabeca' ? 9 : 7);
        if (sessao.ronrom >= 60 && sessao.amassaAte < performance.now() && Math.random() < .25)
            amassar();
        else if (Math.random() < .08) {
            const m = $('maoP');
            m.classList.remove('lambida');
            void m.offsetWidth;
            m.classList.add('lambida');
            fala('*lambe sua mão*', 1400);
        }
        if (Math.random() < .25) {
            animarGatoPerto('cabecada');
            fala('*cabeçada*', 1200);
        }
        else if (Math.random() < .35)
            fala(pick(FALAS.lola.carinho));
        if (Math.random() < .12)
            som.miau('lola', .95);
    }
    else if (id === 'clarinha') {
        if (z === 'barriga') {
            som.ronrom(0);
            som.chiado();
            mudarHumorPerto('bravo', 1500);
            animarGatoPerto('treme');
            falarPerto(pick(FALAS.clarinha.barriga), 1500);
            setTimeout(() => { $('gatoP').classList.add('sai'); setTimeout(() => fecharPerto('bravo'), 600); }, 900);
            sessao.bloq = true;
            return;
        }
        if (sessao.ticks > sessao.toler) {
            som.ronrom(0);
            falarPerto(pick(FALAS.clarinha.chega), 1600);
            som.miau('clarinha', .9);
            setTimeout(() => { $('gatoP').classList.add('sai'); setTimeout(() => fecharPerto('chega'), 600); }, 1000);
            sessao.bloq = true;
            return;
        }
        gostou(z === 'cabeca' || z === 'queixo' ? 8 : 4);
        if (sessao.gostou === 4) {
            mudarHumorPerto('dormindo', 900);
            falarPerto('*piscadinha lenta*', 2000);
            sessao.falouEm = agora;
            if (!S.vistoPiscada) {
                S.vistoPiscada = true;
                salvar();
                setTimeout(() => toast('Piscadinha lenta é o jeito dos gatos dizerem "confio em você" ♥'), 900);
            }
            return;
        }
        if (Math.random() < .3)
            fala(pick(FALAS.clarinha.carinho));
    }
    else if (id === 'tho') {
        if (Math.random() < .11 && sessao.ticks > 2) {
            som.ronrom(0);
            falarPerto(pick(FALAS.tho.foge), 1200);
            som.miau('tho', 1.3);
            animarGatoPerto('treme');
            setTimeout(() => { $('gatoP').classList.add('sai'); setTimeout(() => fecharPerto('fugiu'), 600); }, 700);
            sessao.bloq = true;
            return;
        }
        if (z === 'barriga' && Math.random() < .55) {
            mudarHumorPerto('bravo', 800);
            animarGatoPerto('treme');
            fala(pick(FALAS.tho.barriga), 1200);
            som.miau('tho', 1.4);
            return;
        }
        gostou(z === 'queixo' ? 11 : 8);
        if (sessao.ronrom >= 60 && sessao.amassaAte < performance.now() && Math.random() < .2)
            amassar();
        else if (Math.random() < .3)
            fala(pick(FALAS.tho.carinho));
        if (Math.random() < .1)
            som.miau('tho');
    }
}
