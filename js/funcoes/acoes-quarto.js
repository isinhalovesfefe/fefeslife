function barrasHTML(st, grande) {
    const b = (ic, rot, v, cor) => `<div class="mini">${grande ? `<span style="display:flex;gap:5px;align-items:center">${iconeSVG(ic, 13)}${rot}</span>` : iconeSVG(ic, 11)}<div class="segs ${grande ? 'g' : ''}">${segs(v, cor)}</div></div>`;
    return b('fome', 'Barriga', st.fome, '#ffb36b') + b('coracao', 'Alegria', st.alegria, '#ff7aa8') + b('raio', 'Energia', st.energia, '#7da2ff');
}
function escolherComida(g) {
    abrir(g ? `O que ${GATOS[g.id].nome} vai comer?` : 'Encher os potes', `<div class="grade">${COMIDAS.map((c, i) => `<button class="px" data-c="${i}" ${c.custo && S.coracoes < c.custo ? 'disabled' : ''}>${iconeSVG(c.ic, 24)}${c.n}${c.custo ? `<small>custa ${c.custo} ♥</small>` : ''}</button>`).join('')}</div>
     ${g ? '' : '<p style="font-size:13px;opacity:.7;margin:10px 0 0">todos os gatos acordados vêm comer</p>'}`);
    document.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
        fechar();
        const c = COMIDAS[b.dataset.c];
        if (c.custo) {
            S.coracoes -= c.custo;
            atualizarHUD();
        }
        potesAte = Date.now() + 8000;
        som.agua();
        const quem = g ? [g] : gatos.filter(x => !S.gatos[x.id].dormindo);
        if (!quem.length)
            return falar(FEFE, 'Tá todo mundo dormindo...');
        falar(FEFE, quem.length > 1 ? 'Psss psss! Comida!' : `Vem, ${GATOS[quem[0].id].nome}!`);
        quem.forEach(gg => {
            const [px, py] = POTES_POS[gatos.indexOf(gg)];
            setTimeout(() => som.miau(gg.id), 300 + Math.random() * 700);
            irPara(gg, px, py, () => {
                const st = S.gatos[gg.id];
                if (st.fome > 95) {
                    falar(gg, 'Tô cheio!');
                    return;
                }
                gg.estado = 'comendo';
                gg.timer = 2.4;
                gg.dir = -1;
                setTimeout(() => { const a = st.fome; st.fome = lim(st.fome + c.fome); st.alegria = lim(st.alegria + c.alegria); if (a < 85)
                    ganhar(1); salvar(); particula('coracao', gg.x, gg.y - 16, 2); falar(gg, c.custo ? 'NHAM! Favorito!!' : gg.id === 'tho' ? 'NHAMNHAMNHAM' : 'Nham nham'); }, 2000);
            }, gg.id === 'tho' ? 75 : 48);
        });
    });
}
function brincar(g) {
    const st = S.gatos[g.id];
    if (st.energia < 15)
        return falar(g, 'Tô cansado... deixa eu dormir?');
    let x = g.x + (g.dir > 0 ? 20 : -20), y = g.y + 6;
    if (bloqueado(x, y, 6)) {
        x = 176;
        y = 150;
    }
    novelo = { x, y, vx: (Math.random() - .5) * 120, vy: (Math.random() - .5) * 120 };
    g.estado = 'brincando';
    g.timer = g.id === 'tho' ? 7 : g.id === 'clarinha' ? 3.5 : 5;
    falar(g, g.id === 'tho' ? 'NOVELO!!! MEU!!!' : g.id === 'clarinha' ? '...tá, um pouquinho.' : 'Brinca comigo!', 1500);
    som.miau(g.id, 1.15);
}
function fimBrincadeira(g) {
    const st = S.gatos[g.id];
    g.estado = 'parado';
    g.timer = 2;
    novelo = null;
    st.alegria = lim(st.alegria + 22);
    st.energia = lim(st.energia - 8);
    ganhar(2);
    salvar();
    mostrarHumor(g, 'feliz', 1600);
    particula('coracao', g.x, g.y - 16, 3);
    falar(g, g.id === 'clarinha' ? 'Chega. Foi legal.' : g.id === 'tho' ? 'DE NOVO! DE NOVO!' : 'Que divertido!');
    if (g.id === 'tho')
        setTimeout(() => zoomies(g, 2), 800);
}
function regar() { particula('agua', 192, 40, 8); particula('folha', 192, 30, 3); som.agua(); if (S.feitos.plantas)
    return falar(FEFE, 'Já reguei hoje!'); S.feitos.plantas = true; ganhar(2); salvar(); falar(FEFE, 'Bebam água, plantinhas'); }
function areia() { if (S.feitos.areia)
    return falar(FEFE, 'Já tá limpinha!'); S.feitos.areia = true; ganhar(2); salvar(); particula('brilho', 26, 205, 4); falar(FEFE, 'Eca... mas é amor'); }
function vitrola() {
    if (performance.now() < vitrolaAte) {
        vitrolaAte = 0;
        pararMusica();
        return falar(FEFE, 'Pausa na música');
    }
    vitrolaAte = performance.now() + 372000;
    if (tocarFaixa('reggae', .495)) {
        musica = { faixa: 'reggae' };
        falar(FEFE, 'Um reggaezinho pra relaxar ♪', 2400);
    }
    else {
        tocarMusica();
        falar(FEFE, 'Um som bem dreamy ♪', 2400);
    }
    gatos.forEach(g => { if (!S.gatos[g.id].dormindo && Math.random() < .5)
        setTimeout(() => falar(g, g.id === 'tho' ? '*dança*' : 'prrr ♪'), 800 + Math.random() * 1500); });
}
function deitar() {
    FEFE.pose = 'cama';
    FEFE.x = 62;
    FEFE.y = 84;
    FEFE.alvo = null;
    falar(FEFE, 'Ahh, que delícia...', 1800);
    if (ISI.aqui) {
        ISI.pose = 'cama';
        setTimeout(() => falar(FEFE, `Vem, ${NOME_MINHA}!`), 400);
        setTimeout(() => { if (FEFE.pose === 'cama')
            falar(ISI, pick(['Conchinha!', '*abraça por trás*', 'Meu lugar favorito do mundo']), 2600); }, 1600);
    }
    const acordados = gatos.filter(g => !S.gatos[g.id].dormindo && g !== gatoPerto);
    const vem = acordados.filter(g => g.id === 'lola' || (g.id === 'tho' && Math.random() < .75) || (g.id === 'clarinha' && Math.random() < .4));
    const LUGAR = { lola: [34, 80], tho: [44, 95], clarinha: [22, 92] };
    vem.forEach((g, i) => setTimeout(() => {
        if (FEFE.pose !== 'cama')
            return;
        irPara(g, 64, 88 + i * 4, () => {
            if (FEFE.pose !== 'cama')
                return;
            const [lx, ly] = LUGAR[g.id];
            pular(g, lx, ly, () => {
                if (FEFE.pose !== 'cama')
                    return;
                g.estado = 'na_cama';
                mostrarHumor(g, 'feliz', 4000);
                particula('coracao', g.x, g.y - 16, 2);
                S.gatos[g.id].alegria = lim(S.gatos[g.id].alegria + 8);
                falar(g, g.id === 'lola' ? '*deita no seu peito*' : g.id === 'tho' ? '*se joga nos seus pés*' : '...só um pouquinho.', 2200);
                if (g.id === 'lola')
                    som.ronrom(.25, 'lola');
                else
                    som.miau(g.id, .9);
                if (!S.feitos['cama_' + g.id]) {
                    S.feitos['cama_' + g.id] = true;
                    ganhar(1);
                }
                salvar();
            });
        }, 55);
    }, 700 + i * 1300));
    if (!vem.length)
        setTimeout(() => FEFE.pose === 'cama' && falar(FEFE, 'Cochilinho bom...'), 1500);
    const hr = new Date().getHours();
    if (hr >= 23 || hr < 5)
        setTimeout(() => { if (FEFE.pose === 'cama')
            dormirJuntas(); }, 5200);
}
function sentarPC() {
    FEFE.pose = 'pc';
    FEFE.x = 126;
    FEFE.y = 86;
    FEFE.alvo = null;
    setTimeout(() => { if (FEFE.pose === 'pc')
        abrir('Computador', `<div class="tela-pc">${esc(MENSAGEM_PC)}</div>`); }, 500);
    const lola = G('lola');
    if (!S.gatos.lola.dormindo && Math.random() < .5)
        setTimeout(() => { if (FEFE.pose === 'pc') {
            irPara(lola, 142, 76, () => { falar(lola, '*deita no teclado*'); lola.estado = 'social'; lola.timer = 4; }, 40);
        } }, 2500);
}
function sentarTapete() {
    FEFE.pose = 'tapete';
    FEFE.x = 172;
    FEFE.y = 152;
    FEFE.dir = 'down';
    FEFE.alvo = null;
    if (ISI.aqui) {
        ISI.pose = 'sentada';
        ISI.x = 188;
        ISI.y = 152;
    }
    falar(FEFE, 'Quem quer colo?', 1800);
    gatos.forEach((g, i) => {
        if (S.gatos[g.id].dormindo || g === gatoPerto)
            return;
        if (g.id === 'lola')
            irPara(g, ISI.aqui ? 204 : 148, 158, () => { g.dir = 1; g.estado = 'social'; g.timer = 6; falar(g, 'EU! EU QUERO!'); som.miau('lola'); particula('coracao', g.x, g.y - 16, 2); }, 40);
        if (g.id === 'tho')
            setTimeout(() => { if (FEFE.pose === 'tapete') {
                falar(g, '!!!');
                zoomies(g, 3);
            } }, 900);
        if (g.id === 'clarinha') {
            if (S.confClarinha >= 100 && (!S.coloClarinha || Math.random() < .35))
                irPara(g, 176, 162, () => { if (FEFE.pose !== 'tapete')
                    return; pular(g, 172, 156, () => { g.estado = 'colo'; colocarNoColo(g); }); }, 24);
            else if (Math.random() < .6)
                irPara(g, 200, 146, () => { g.dir = -1; g.estado = 'social'; g.timer = 6; falar(g, S.confClarinha > 60 ? '*chega mais pertinho*' : '*observa de longe*'); }, 26);
        }
    });
    if (!S.feitos.tapete) {
        S.feitos.tapete = true;
        setTimeout(() => ganhar(1), 1500);
        salvar();
    }
}
function colocarNoColo(g) {
    som.ronrom(.35, 'clarinha');
    particula('coracao', 172, 124, 3);
    mostrarHumor(g, 'feliz', 8000);
    if (!S.coloClarinha) {
        S.coloClarinha = true;
        ganhar(10);
        salvar();
        falar(FEFE, '...Clarinha?! No meu colo?!', 2600);
        setTimeout(() => falar(g, '...só hoje. prrr.', 2600), 1800);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, 'NÃO ACREDITO! Fica parada, amor!'), 3600);
        setTimeout(() => toast('Primeira vez que a Clarinha deitou no seu colo! ♥'), 1200);
    }
    else
        falar(g, pick(['prrr...', '*fecha os olhinhos*', '...meu lugar.']));
}
function levantar() {
    const p = FEFE.pose;
    FEFE.pose = null;
    if (!p)
        return;
    const cl = G('clarinha');
    if (cl && cl.estado === 'colo') {
        som.ronrom(0);
        pular(cl, 196, 160);
    }
    if (ISI.pose) {
        ISI.pose = null;
        ISI.x = FEFE.x + 14;
        ISI.y = FEFE.y + 2;
        if (p === 'cama') {
            ISI.x = 76;
            ISI.y = 92;
        }
        if (ISI.saida) {
            [ISI.x, ISI.y] = ISI.saida;
            ISI.saida = null;
        }
    }
    if (p === 'assento' && FEFE.saida) {
        [FEFE.x, FEFE.y] = FEFE.saida;
        FEFE.saida = null;
    }
    if (FEFE.aoLevantar) {
        const f = FEFE.aoLevantar;
        FEFE.aoLevantar = null;
        f();
    }
    if (p === 'pc') {
        FEFE.x = 126;
        FEFE.y = 88;
    }
    if (p === 'cama') {
        FEFE.x = 64;
        FEFE.y = 86;
        som.ronrom(0);
    }
    FEFE.dir = 'down';
}
