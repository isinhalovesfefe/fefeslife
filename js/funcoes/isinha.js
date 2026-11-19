function montarIsinha() {
    aplicarCorIsinha();
    const F = modLook(framesIsinha(), 'isi');
    isiSpr = {};
    for (const d in F)
        isiSpr[d] = F[d].map(f => spr(f, ISI_COR));
    const frente = F.down[0], costas = F.up[0];
    const muda = (g, pts) => { const n = g.map(r => [...r]); pts.forEach(([x, y, c]) => n[y][x] = c); return n.map(r => r.join('')); };
    const pernas = ["..OJJJJJJJJJJO..", ".OJJJJJjjJJJJJO.", ".OBBOJJJJJJOBBO.", "..OOOOOOOOOOOO.."];
    isiSpr.frente = spr(frente, ISI_COR);
    {
        const ls = ladoSentado(F.right[0].map(r => typeof r === 'string' ? r : r.join('')));
        isiSpr.sentadaLadoD = spr(ls, ISI_COR);
        isiSpr.sentadaLadoE = spr(espelhaG(ls), ISI_COR);
    }
    isiSpr.feliz = spr(muda(frente, [[5, 7, 'S'], [10, 7, 'S'], [6, 10, 'L'], [9, 10, 'L']]), ISI_COR);
    isiSpr.piscando = spr(muda(frente, [[5, 7, 'S'], [10, 7, 'S']]), ISI_COR);
    isiSpr.deitada = spr(muda(frente, [[5, 7, 'S'], [10, 7, 'S']]), ISI_COR);
    isiSpr.sentada = spr(frente.slice(0, 20).concat(pernas), ISI_COR);
    isiSpr.sentadaCostas = spr(costas.slice(0, 20), ISI_COR);
    isiSpr.rosto = spr(frente.slice(0, 14), ISI_COR);
    isiSpr.bikeR = spr(F.right[0].slice(0, 20), ISI_COR);
    isiSpr.bikeL = spr(F.left[0].slice(0, 20), ISI_COR);
    isiSpr.bikeD = spr(frente.slice(0, 20), ISI_COR);
    isiSpr.bikeU = spr(costas.slice(0, 20), ISI_COR);
    const lado = F.right[0].map(r => [...r]);
    lado[7][10] = 'S';
    isiSpr.ladoDorme = spr(lado.map(r => r.join('')), ISI_COR);
    isiSpr.ladoCabeca = spr(lado.slice(0, 12).map(r => r.join('')), ISI_COR);
}
function desenharIsinha() {
    if (ISI.pose === 'colo')
        return desenharIsinhaColo();
    const x = Math.round(ISI.x), y = Math.round(ISI.y);
    if (ISI.bike && !ISI.pose)
        return desenharCiclista(isiSpr, ISI, '#7bd389', ISI_COR.J);
    if (ISI.pose === 'assento')
        return ctx.drawImage(isiSpr[ISI.poseSpr], ISI.px, ISI.py - (FEFE.balanco ? Math.round(Math.sin(performance.now() / 1000 * 3) * 3) : 0));
    if (ISI.danca > performance.now()) {
        const f = Math.floor(performance.now() / 220) + 1;
        return ctx.drawImage(isiSpr[f % 4 < 2 ? 'left' : 'right'][f % 2 ? 1 : 3], x - 8, y - 26 - (f % 2));
    }
    if (ISI.pose === 'sentada') {
        ctx.fillStyle = 'rgba(0,0,0,.22)';
        ctx.fillRect(x - 7, y - 1, 14, 2);
        return vidaHumano({ anda: false }, isiSpr.sentada, x - 8, y - 23, 'isi');
    }
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fillRect(x - 5, y - 1, 10, 2);
    ctx.fillRect(x - 4, y, 8, 1);
    vidaHumano(ISI, isiSpr[ISI.dir][ISI.anda ? ISI.fr : 0], x - 8, y - 26 + (ISI.anda && ISI.fr % 2 ? 1 : 0), 'isi');
}
function moverIsinha(tx, ty, vel, dt, livre) {
    const dx = tx - ISI.x, dy = ty - ISI.y, d = Math.hypot(dx, dy);
    if (d < 1.5) {
        ISI.anda = false;
        return true;
    }
    const v = Math.min(d, vel * dt), ix = dx / d, iy = dy / d;
    if (livre) {
        ISI.x += ix * v;
        ISI.y += iy * v;
    }
    else {
        if (!bloqueado(ISI.x + ix * v, ISI.y))
            ISI.x += ix * v;
        if (!bloqueado(ISI.x, ISI.y + iy * v))
            ISI.y += iy * v;
    }
    ISI.dir = Math.abs(ix) > Math.abs(iy) ? (ix > 0 ? 'right' : 'left') : (iy > 0 ? 'down' : 'up');
    ISI.anda = true;
    ISI.t += dt;
    ISI.fr = Math.floor(ISI.t / 0.14) % 4;
    return false;
}
function atualizarIsinha(dt) {
    if (!ISI.aqui) {
        ISI.anda = false;
        return;
    }
    if (ISI.pose) {
        ISI.anda = false;
        return;
    }
    if (ISI.estado === 'entrando') {
        if (moverIsinha(176, 214, 60, dt, true)) {
            ISI.estado = 'seguindo';
            chegouIsinha();
        }
        return;
    }
    if (ISI.estado === 'saindo') {
        if (moverIsinha(176, ISI.y < 220 ? 226 : 262, 60, dt, true) && ISI.y > 250) {
            ISI.aqui = false;
            ISI.estado = 'fora';
        }
        return;
    }
    if (ISI.estado === 'abraco') {
        ISI.anda = false;
        return;
    }
    const d = Math.hypot(FEFE.x - ISI.x, FEFE.y - ISI.y);
    if (d > 30 || (ISI.anda && d > 22)) {
        const ang = Math.atan2(ISI.y - FEFE.y, ISI.x - FEFE.x);
        moverIsinha(FEFE.x + Math.cos(ang) * 20, FEFE.y + Math.sin(ang) * 12, ISI.bike ? (d > 50 ? 170 : 150) : (d > 60 ? 95 : 72), dt, false);
    }
    else {
        ISI.anda = false;
        ISI.t = 0;
        if (!FEFE.anda && d < 30) {
            const dx = FEFE.x - ISI.x, dy = FEFE.y - ISI.y;
            ISI.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        }
    }
    ISI.falaT -= dt;
    if (ISI.falaT <= 0 && !bloqueioTela()) {
        ISI.falaT = 18 + Math.random() * 20;
        falar(ISI, pick(FALAS_ISINHA), 2600);
    }
}
function chamarIsinhaEmCasa() {
    ISI.aqui = true;
    ISI.estado = 'entrando';
    ISI.x = 176;
    ISI.y = 262;
    ISI.pose = null;
    ISI.falaT = 12;
    toast(`${NOME_MINHA} chegou! ♥`);
    som.plim();
}
function chegouIsinha() {
    falar(ISI, pick([`Cheguei, amor!`, 'Oiii!', 'Trouxe saudade de presente']), 2400);
    const lola = G('lola'), tho = G('tho'), cla = G('clarinha');
    if (!S.gatos.lola.dormindo)
        setTimeout(() => { irPara(lola, ISI.x - 12, ISI.y + 2, () => { lola.dir = 1; falar(lola, `${NOME_MINHA.toUpperCase()}!!!`); som.miau('lola', 1.1); particula('coracao', lola.x, lola.y - 16, 3); lola.estado = 'parado'; lola.timer = 5; }, 60); }, 600);
    if (!S.gatos.tho.dormindo)
        setTimeout(() => { falar(tho, '!!!'); som.miau('tho', 1.3); zoomies(tho, 3); }, 1200);
    if (!S.gatos.clarinha.dormindo)
        setTimeout(() => falar(cla, `...oi, ${NOME_MINHA}.`), 2000);
}
function menuIsinha() {
    const bot = (id, ic, txt) => `<button class="px" data-i2="${id}">${ic}${txt}</button>`;
    abrir(`${NOME_MINHA} ♥`, `<div class="grade">
    ${bot('abraco', iconeSVG('coracao', 22), 'Abraço')}
    ${bot('beijo', PARTsvg('coracao', 20), 'Beijinho')}
    ${bot('conversar', PARTsvg('nota', 22), 'Conversar')}
    ${bot('selfie', iconeSVG('camera', 20), 'Selfie juntas')}
    ${MAPA === 'show' ? bot('ombros', PARTsvg('nota', 22), 'Subir nos ombros') : ''}
    ${MAPA === 'cafe' || MAPA === 'quarto' ? bot('velha', PARTsvg('brilho', 22), 'Jogo da velha') : ''}
    ${MAPA === 'quarto' ? bot('tchau', iconeSVG('lua', 22), 'Tchau') : bot('casa', iconeSVG('sacola', 22), 'Voltar pra casa')}
  </div>`);
    document.querySelectorAll('[data-i2]').forEach(b => b.onclick = () => { fechar(); acaoIsinha(b.dataset.i2); });
}
function acaoIsinha(a) {
    if (a === 'abraco' || a === 'beijo') {
        ISI.estado = 'abraco';
        const lado = FEFE.x < ISI.x ? 1 : -1;
        ISI.x = FEFE.x + lado * 10;
        ISI.y = FEFE.y;
        ISI.dir = lado > 0 ? 'left' : 'right';
        FEFE.dir = lado > 0 ? 'right' : 'left';
        particula('coracao', (FEFE.x + ISI.x) / 2, FEFE.y - 26, a === 'beijo' ? 9 : 5);
        som.plim();
        falar(ISI, a === 'beijo' ? pick(['*smack*', 'Mais um?', 'Hihi']) : pick(['Que abraço bom', 'Não solto mais', 'Meu lugar favorito']), 2200);
        setTimeout(() => falar(FEFE, a === 'beijo' ? '♥' : '*aperta*', 1800), 900);
        if (!S.feitos[a]) {
            S.feitos[a] = true;
            ganhar(2);
            salvar();
        }
        setTimeout(() => { ISI.estado = 'seguindo'; }, 2200);
    }
    if (a === 'conversar') {
        falar(ISI, pick(FALAS_ISINHA), 2600);
        setTimeout(() => falar(FEFE, pick(['Hihi', 'Te amo também', 'Verdade!', 'Para, boba', 'Hmm... talvez'])), 2000);
    }
    if (a === 'selfie')
        selfieJuntas();
    if (a === 'tchau') {
        falar(ISI, 'Tchau, amor! Te amo!', 2400);
        ISI.estado = 'saindo';
        if (!S.gatos.lola.dormindo)
            setTimeout(() => falar(G('lola'), 'Volta logo!'), 900);
    }
    if (a === 'casa')
        trocarCena('quarto');
    if (a === 'velha')
        jogoDaVelha();
    if (a === 'ombros') {
        ISI.estado = 'abraco';
        ISI.dir = 'up';
        sentarJuntas({ f: ['sentada', Math.round(ISI.x) - 8, Math.round(ISI.y) - 40, ISI.y + 1, ISI.x, ISI.y + 6] });
        falar(FEFE, 'EU TÔ VENDO TUDO!', 1800);
        setTimeout(() => falar(ISI, 'Segura firme, amor!'), 1000);
        dancar(9000);
        FEFE.danca = 0;
        particula('nota', ISI.x, ISI.y - 50, 5);
        setTimeout(() => { if (FEFE.pose === 'assento')
            levantar(); ISI.estado = 'seguindo'; }, 9000);
    }
}
function jogoDaVelha() {
    const tab = Array(9).fill('');
    let fim = false;
    const linhas = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const ganhou = p => linhas.some(l => l.every(i => tab[i] === p));
    const desenha = (msg) => {
        abrir('Jogo da velha', `<p style="text-align:center;margin:0 0 6px">${msg}</p><div class="velha">${tab.map((v, i) => `<button data-v="${i}" style="color:${v === 'X' ? '#e0557f' : '#5b8cff'}">${v}</button>`).join('')}</div>
      <div style="text-align:center;font-size:13px;opacity:.7">Você é o X, a ${NOME_MINHA} é a O</div>${fim ? '<button class="btn" id="velhaDeNovo">Revanche!</button>' : ''}`);
        document.querySelectorAll('[data-v]').forEach(b => b.onclick = () => jogar(+b.dataset.v));
        if (fim)
            $('velhaDeNovo').onclick = jogoDaVelha;
    };
    const jogaIsinha = () => {
        const livres = tab.map((v, i) => v ? null : i).filter(v => v !== null);
        const tenta = p => { for (const i of livres) {
            tab[i] = p;
            const g = ganhou(p);
            tab[i] = '';
            if (g)
                return i;
        } return null; };
        let i = tenta('O');
        if (i === null && Math.random() < .75)
            i = tenta('X');
        if (i === null)
            i = tab[4] === '' && Math.random() < .6 ? 4 : pick(livres);
        tab[i] = 'O';
    };
    const jogar = i => {
        if (fim || tab[i])
            return;
        tab[i] = 'X';
        som.pop();
        if (ganhou('X')) {
            fim = true;
            som.plim();
            if (!S.feitos.velha) {
                S.feitos.velha = true;
                ganhar(2);
                salvar();
            }
            setTimeout(() => falar(ISI, 'Você roubou! Revanche!'), 300);
            return desenha('Você ganhou! ♥');
        }
        if (tab.every(v => v)) {
            fim = true;
            return desenha('Deu velha! Empate.');
        }
        desenha(`${NOME_MINHA} tá pensando...`);
        setTimeout(() => {
            if (!modalAberto())
                return;
            jogaIsinha();
            if (ganhou('O')) {
                fim = true;
                setTimeout(() => falar(ISI, 'HAHA ganhei!'), 300);
                return desenha(`A ${NOME_MINHA} ganhou!`);
            }
            if (tab.every(v => v)) {
                fim = true;
                return desenha('Deu velha! Empate.');
            }
            desenha('Sua vez!');
        }, 650);
    };
    desenha('Sua vez!');
}
function selfieJuntas() {
    som.foto();
    const f = $('flash');
    f.style.opacity = 1;
    setTimeout(() => f.style.opacity = 0, 160);
    const c = document.createElement('canvas');
    c.width = 48;
    c.height = 40;
    const x = c.getContext('2d');
    const R = (a, b, w, h, cor) => { x.fillStyle = cor; x.fillRect(a, b, w, h); };
    if (MAPA === 'parque') {
        const [c1, c2] = corCeu(new Date().getHours());
        R(0, 0, 48, 40, c1);
        R(0, 0, 48, 10, c2);
        R(0, 26, 48, 14, '#79c26a');
        [[4, 14, 7], [40, 12, 8], [24, 18, 5]].forEach(([a, b, r]) => { x.fillStyle = '#4f9a5a'; x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); });
        R(3, 20, 2, 8, '#7a4f3a');
        R(39, 19, 2, 9, '#7a4f3a');
    }
    else {
        R(0, 0, 48, 40, '#5d4470');
        for (let yy = 3; yy < 26; yy += 6)
            for (let xx = ((yy / 6) % 2) * 4 + 2; xx < 48; xx += 8)
                R(xx, yy, 1, 1, '#8a6d9e');
        R(0, 26, 48, 1, '#c9b8d6');
        R(0, 27, 48, 13, '#c98f5f');
    }
    const pal = paletaFefe();
    pal.Q = '#0e0d12';
    pal.q = '#3d3b4c';
    pal.k = '#9aa0b8';
    pal.z = '#ff7aa8';
    x.drawImage(spr(frenteComPose('selfie', false), pal), 9, 13);
    x.drawImage(isiSpr.feliz, 23, 13);
    x.drawImage(spr(...PART.coracao, 'pc'), 21, 9);
    const d = new Date(), data = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    S.album.push({ img: c.toDataURL('image/png'), data });
    if (S.album.length > 24)
        S.album.shift();
    if (!S.feitos.selfieJuntas) {
        S.feitos.selfieJuntas = true;
        ganhar(2);
    }
    salvar();
    verFoto(S.album.length - 1, true, 'juntas');
}
function sentarJuntas(o) {
    FEFE.pose = 'assento';
    FEFE.alvo = null;
    [FEFE.poseSpr, FEFE.px, FEFE.py, FEFE.pb] = o.f;
    FEFE.saida = [o.f[4], o.f[5]];
    FEFE.aoLevantar = o.aoLevantar || null;
    FEFE.x = o.f[1] + 8;
    FEFE.y = o.f[2] + 24;
    if (ISI.aqui && o.i) {
        ISI.pose = 'assento';
        ISI.anda = false;
        [ISI.poseSpr, ISI.px, ISI.py, ISI.pb] = o.i;
        ISI.saida = [o.i[4], o.i[5]];
        ISI.x = o.i[1] + 8;
        ISI.y = o.i[2] + 24;
    }
    if (o.fala && ISI.aqui)
        setTimeout(() => falar(ISI, typeof o.fala === 'function' ? o.fala() : o.fala, 2600), 800);
}
function dancar(ms) { const ate = performance.now() + ms; FEFE.danca = ate; if (ISI.aqui)
    ISI.danca = ate; }
