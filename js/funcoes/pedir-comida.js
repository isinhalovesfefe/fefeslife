function appComida() {
    if (S.pedido) {
        const falta = Math.max(0, Math.ceil((S.pedido.chega - Date.now()) / 1000));
        return abrir('Pedir comida', `<div class="cel" style="color:#fff;padding:20px;text-align:center"><div style="font-size:42px">${COMIDAS_APP[S.pedido.k].ic}</div><p>Seu pedido de <b>${COMIDAS_APP[S.pedido.k].n}</b> está a caminho!</p><p style="opacity:.7">${falta > 0 ? `chega em uns ${falta} segundos` : (MAPA === 'quarto' ? 'chegando agora!' : 'chega quando você voltar pra casa')}</p><button class="btn" id="voltarApp">Voltar</button></div>`, false), $('voltarApp').onclick = abrirCelular;
    }
    abrir('Pedir comida', `<div class="cel"><div class="celTopo"><button class="voltarCel" id="celVoltar">‹</button><b>O que vai ser hoje?</b></div>
    <div style="padding:12px;display:flex;flex-direction:column;gap:10px">${Object.entries(COMIDAS_APP).map(([k, c]) => `<button class="contato" data-comida="${k}" style="border:2px solid #3a3046"><span style="font-size:30px">${c.ic}</span><span><b>${c.n}</b><small>entrega rapidinha na casa da Fefe</small></span></button>`).join('')}</div></div>`, false);
    $('celVoltar').onclick = abrirCelular;
    document.querySelectorAll('[data-comida]').forEach(b => b.onclick = () => {
        const k = b.dataset.comida;
        S.pedido = { k, chega: Date.now() + 18000 };
        salvar();
        som.plim();
        fechar();
        toast(`Pedido feito! ${COMIDAS_APP[k].n} chegando na sua casa.`);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, k === 'japonesa' ? 'Pede bastante salmão!' : k === 'pizza' ? 'Metade calabresa, metade 4 queijos!' : 'Com bastante batata!'), 900);
    });
}
function checarEntrega() {
    if (!S.pedido || MAPA !== 'quarto' || entregador || bloqueioTela() || Date.now() < S.pedido.chega)
        return;
    entregador = { x: 176, y: 262, estado: 'entrando', k: S.pedido.k, mapa: 'quarto' };
    if (audio()) {
        const t = AC.currentTime;
        tom(t, 880, .4, .08, 'sine');
        tom(t + .35, 660, .6, .08, 'sine');
    }
    toast('Ding-dong! A comida chegou!');
    gatos.forEach(g => { if (!S.gatos[g.id].dormindo && Math.random() < .6)
        setTimeout(() => falar(g, g.id === 'tho' ? 'COMIDA?!' : g.id === 'lola' ? 'Quem é?' : '...'), 400 + Math.random() * 800); });
}
function atualizarEntregador(dt) {
    if (!entregador || MAPA !== 'quarto')
        return;
    const e = entregador;
    if (e.estado === 'entrando') {
        e.y = Math.max(222, e.y - 50 * dt);
        if (e.y <= 222) {
            e.estado = 'esperando';
            falar(e, 'Entrega pra Fefe!', 2400);
            if (!PONTOS.find(p => p.entrega))
                PONTOS.push({ obj: 'entregador', entrega: true, nome: 'Pegar a comida', x: 176, y: 214, acao: pegarComida });
        }
    }
    if (e.estado === 'saindo') {
        e.y += 50 * dt;
        if (e.y > 262)
            entregador = null;
    }
}
function desenharEntregador(c) {
    const e = entregador, x = Math.round(e.x), y = Math.round(e.y), b = Math.floor(performance.now() / 300) % 2 * (e.estado === 'esperando' ? 0 : 1);
    const R = (a, bb, w, h, cor) => { c.fillStyle = cor; c.fillRect(x + a, y + bb, w, h); };
    R(-5, -1, 10, 2, 'rgba(0,0,0,.22)');
    R(-4, -24 - b, 8, 8, '#2a1d30');
    R(-3, -23 - b, 6, 6, '#e2ab84');
    R(-5, -25 - b, 10, 3, '#d63e4f');
    R(-1, -21 - b, 1, 1, '#2a1d30');
    R(2, -21 - b, 1, 1, '#2a1d30');
    R(-5, -16 - b, 10, 10, '#2a1d30');
    R(-4, -15 - b, 8, 8, '#d63e4f');
    R(-4, -6, 3, 6, '#2a1d30');
    R(1, -6, 3, 6, '#2a1d30');
    if (e.estado !== 'saindo') {
        R(-7, -14 - b, 14, 9, '#2a1d30');
        R(-6, -13 - b, 12, 7, '#ffd36e');
        R(-2, -11 - b, 4, 3, '#d63e4f');
    }
}
function pegarComida() {
    const k = entregador.k;
    entregador.estado = 'saindo';
    falar(entregador, 'Bom apetite!', 1800);
    const i = PONTOS.findIndex(p => p.entrega);
    if (i >= 0)
        PONTOS.splice(i, 1);
    S.pedido = null;
    salvar();
    comidaNoTapete = k;
    som.plim();
    const tp = PONTOS.find(p => p.obj === 'tapete');
    if (tp) {
        tp.nome = `Comer ${COMIDAS_APP[k].n.toLowerCase()}`;
        tp.acao = comer;
    }
    falar(FEFE, 'Obrigada! Hmmm, que cheiro bom');
    toast('A comida ficou no tapete. Vai lá comer!');
}
function comer() {
    const k = comidaNoTapete;
    if (!k)
        return sentarTapete();
    sentarTapete();
    particula('coracao', 172, 120, 3);
    falar(FEFE, k === 'japonesa' ? 'Itadakimasu!' : k === 'pizza' ? 'Pizza é vida' : 'Que hambúrguer lindo', 2200);
    if (ISI.aqui)
        setTimeout(() => falar(ISI, pick(['Me dá um pedaço?', 'Melhor programa: comer com você', 'Hmmmm!'])), 1400);
    const tho = G('tho'), lola = G('lola'), cla = G('clarinha');
    if (!S.gatos.tho.dormindo)
        setTimeout(() => irPara(tho, 158, 160, () => { falar(tho, k === 'japonesa' ? '*rouba um salmão*' : '*rouba um pedaço*'); som.miau('tho', 1.2); setTimeout(() => { falar(FEFE, 'THOOOO!'); zoomies(tho, 2); }, 900); }, 70), 2500);
    if (!S.gatos.lola.dormindo)
        setTimeout(() => irPara(lola, 192, 158, () => { falar(lola, 'Me dá? Só um pouquinho?'); som.miau('lola', 1.1); lola.estado = 'social'; lola.timer = 4; }, 40), 1200);
    if (!S.gatos.clarinha.dormindo)
        setTimeout(() => falar(cla, '*cheira de longe e vai embora*'), 3200);
    setTimeout(() => { comidaNoTapete = null; const tp = PONTOS.find(p => p.obj === 'tapete'); if (tp) {
        tp.nome = 'Sentar no tapete';
        tp.acao = sentarTapete;
    } falar(FEFE, 'Que delícia... tô cheia'); if (!S.feitos.comida) {
        S.feitos.comida = true;
        ganhar(3);
        salvar();
    } }, 9000);
}
function desenharComida(c, k, x, y) {
    const R = (a, b, w, h, cor) => { c.fillStyle = cor; c.fillRect(x + a, y + b, w, h); };
    if (k === 'hamburguer') {
        R(0, 0, 14, 10, '#2a1d30');
        R(1, 1, 12, 3, '#d9a046');
        R(2, 1, 1, 1, '#fff');
        R(6, 2, 1, 1, '#fff');
        R(1, 4, 12, 1, '#7bd389');
        R(1, 5, 12, 2, '#7a3a1e');
        R(1, 7, 12, 2, '#d9a046');
        R(16, 4, 8, 6, '#2a1d30');
        R(17, 5, 6, 4, '#d63e4f');
        R(17, 2, 1, 3, '#ffd36e');
        R(19, 1, 1, 4, '#ffd36e');
        R(21, 2, 1, 3, '#ffd36e');
    }
    if (k === 'pizza') {
        R(0, 0, 22, 14, '#2a1d30');
        R(1, 1, 20, 12, '#c9925a');
        R(3, 2, 16, 10, '#e9a93a');
        R(4, 3, 14, 8, '#ffd36e');
        [[6, 4], [12, 5], [9, 8], [15, 8]].forEach(([a, b]) => R(a, b, 2, 2, '#d63e4f'));
        R(11, 2, 1, 10, '#c9925a');
        R(3, 7, 16, 1, '#c9925a');
    }
    if (k === 'japonesa') {
        R(0, 2, 24, 10, '#2a1d30');
        R(1, 3, 22, 8, '#a8714a');
        [[3, '#ff8a5b'], [8, '#ff8a5b'], [13, '#f4f1ec'], [18, '#ff8a5b']].forEach(([a, cor]) => { R(a, 4, 4, 5, '#1d1d22'); R(a + 1, 5, 2, 3, cor); });
        R(2, 0, 1, 3, '#f4f1ec');
        R(4, 0, 1, 3, '#f4f1ec');
    }
}
