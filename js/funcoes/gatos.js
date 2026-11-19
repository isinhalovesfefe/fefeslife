function bloqueado(x, y, meio = 5) {
    if (x - meio < MUNDO.x0 || x + meio > MUNDO.x1 || y - 3 < MUNDO.y0 || y > MUNDO.y1)
        return true;
    for (const c of COL)
        if (x + meio > c.x && x - meio < c.x + c.w && y > c.y && y - 4 < c.y + c.h)
            return true;
    return false;
}
function pontoLivre() { for (let i = 0; i < 40; i++) {
    const x = 20 + Math.random() * 310, y = 70 + Math.random() * 150;
    if (!bloqueado(x, y, 7) && Math.hypot(x - FEFE.x, y - FEFE.y) > 16)
        return [x, y];
} return [176, 150]; }
function pontoLonge(g) {
    let melhor = null, md = -1;
    const cands = CANTOS_CLARINHA.concat(Array.from({ length: 10 }, pontoLivre));
    cands.forEach(([x, y]) => { if (bloqueado(x, y, 7))
        return; let d = Math.hypot(x - FEFE.x, y - FEFE.y); gatos.forEach(o => { if (o !== g)
        d = Math.min(d, Math.hypot(x - o.x, y - o.y)); }); if (d > md) {
        md = d;
        melhor = [x, y];
    } });
    return melhor || pontoLivre();
}
function irPara(g, x, y, cb, vel = 30) { g.tx = x; g.ty = y; g.estado = 'andando'; g.chegar = cb || null; g.vel = vel; }
function mostrarHumor(g, h, ms) { g.humorTemp = h; g.humorAte = performance.now() + ms; }
function particula(tipo, x, y, n = 1) { for (let i = 0; i < n; i++)
    particulas.push({ tipo, x: x + (Math.random() * 10 - 5), y: y - Math.random() * 4, vy: -14 - Math.random() * 8, vx: Math.random() * 8 - 4, vida: 1.2 + Math.random() * .4 }); }
function livre(g) { return !S.gatos[g.id].dormindo && (g.estado === 'parado' || g.estado === 'andando') && !g.chegar && g !== gatoPerto; }
function pular(g, x, y, cb) { g.pulo = { x0: g.x, y0: g.y, x1: x, y1: y, t: 0, cb }; g.estado = 'pulando'; g.chegar = null; }
function proximaAcao(g) {
    const r = Math.random();
    if (tem('aquario') && Math.random() < .12) {
        const [x, y] = ASSISTIR_AQUARIO[gatos.indexOf(g)];
        return irPara(g, x, y, () => { g.estado = 'social'; g.timer = 5; g.dir = x < 295 ? 1 : -1; falar(g, g.id === 'tho' ? 'PEIXE!!!' : g.id === 'lola' ? '*olha o peixinho*' : '...hipnotizante.'); }, 34);
    }
    if (g.id === 'tho' && tem('caixa') && Math.random() < .15)
        return irPara(g, 241, 214, () => { g.estado = 'escondido'; g.timer = 10 + Math.random() * 12; }, 40);
    if (g.id === 'clarinha' && tem('rede') && Math.random() < .4)
        return irPara(g, 64, 104, () => pular(g, 45, 37, () => { g.estado = 'na_rede'; g.timer = 20 + Math.random() * 25; }), 28);
    if (g.id === 'lola' && ISI.aqui && r < .2) {
        return irPara(g, ISI.x + (Math.random() < .5 ? -12 : 12), ISI.y + 3, () => { g.dir = ISI.x > g.x ? 1 : -1; falar(g, pick([`${NOME_MINHA}! ${NOME_MINHA}!`, 'Colinho, tia?', '*se esfrega na perna*'])); som.miau('lola'); particula('coracao', g.x, g.y - 16); g.estado = 'parado'; g.timer = 4; }, 34);
    }
    if (g.id === 'lola' && r < .4) {
        irPara(g, FEFE.x + (Math.random() < .5 ? -13 : 13), FEFE.y + 3, () => {
            g.dir = FEFE.x > g.x ? 1 : -1;
            if (Math.hypot(g.x - FEFE.x, g.y - FEFE.y) < 26) {
                falar(g, pick(FALAS.lola.perto));
                som.miau('lola');
                particula('coracao', g.x, g.y - 16);
                g.estado = 'parado';
                g.timer = 4;
            }
        }, 34);
        return;
    }
    if (g.id === 'tho') {
        if (r < .22)
            return zoomies(g);
        if (r < .32)
            return aprontar(g);
    }
    if (g.id === 'clarinha') {
        const [x, y] = pontoLonge(g);
        return irPara(g, x, y, null, 26);
    }
    const [x, y] = pontoLivre();
    irPara(g, x, y);
}
function zoomies(g, n = 4) {
    if (n === 4) {
        falar(g, '!!!', 900);
        som.miau('tho', 1.25);
    }
    if (n <= 0) {
        g.estado = 'parado';
        g.timer = 3;
        return;
    }
    const [x, y] = pontoLivre();
    particula('poeira', g.x, g.y - 2, 2);
    irPara(g, x, y, () => zoomies(g, n - 1), 95);
}
function aprontar(g) {
    const a = pick(ALVOS_TRAQUINAGEM);
    irPara(g, a.x, a.y, () => {
        som.crash();
        particula('caco', a.x, a.y - 14, 4);
        particula('folha', a.x, a.y - 18, 2);
        falar(g, pick(['Ops.', 'Não fui eu.', 'Tava assim já.']), 1800);
        setTimeout(() => { falar(FEFE, 'THOOOO!'); }, 600);
        setTimeout(() => zoomies(g), 900);
    }, 50);
}
function eventoSocial() {
    const livres = gatos.filter(livre);
    if (livres.length < 2)
        return;
    const tho = livres.find(g => g.id === 'tho'), lola = livres.find(g => g.id === 'lola');
    const r = Math.random();
    if (tho && r < .4) {
        const alvo = pick(livres.filter(g => g !== tho));
        return pegaPega(tho, alvo);
    }
    if (lola && r < .7) {
        const alvo = pick(livres.filter(g => g !== lola));
        return lambe(lola, alvo);
    }
    const [a, b] = livres.sort(() => Math.random() - .5);
    cheirar(a, b);
}
function aproximar(a, b, cb) {
    b.estado = 'social';
    b.timer = 8;
    b.chegar = null;
    const lado = a.x < b.x ? -12 : 12;
    irPara(a, b.x + lado, b.y, () => { a.dir = b.x > a.x ? 1 : -1; b.dir = -a.dir; a.estado = 'social'; a.timer = 3; b.timer = 3; cb(); }, 40);
}
function cheirar(a, b) {
    aproximar(a, b, () => {
        particula('coracao', (a.x + b.x) / 2, a.y - 16, 1);
        som.miau(a.id, 1.1);
        falar(a, '*cheira cheira*', 1600);
        setTimeout(() => { const c = [a, b].find(g => g.id === 'clarinha'); if (c) {
            if (clarinhaAmorosa()) {
                falar(c, pick(['*cheira de volta* prr', 'oi ♥', '*encosta o nariz*']));
                particula('coracao', c.x, c.y - 16, 1);
            }
            else {
                falar(c, 'hmpf.');
                const [x, y] = pontoLonge(c);
                irPara(c, x, y, null, 30);
            }
        } }, 1800);
    });
}
function lambe(lola, b) {
    aproximar(lola, b, () => {
        falar(lola, '*lambe lambe*', 1800);
        particula('coracao', b.x, b.y - 16, 2);
        mostrarHumor(lola, 'feliz', 2500);
        setTimeout(() => {
            if (b.id === 'clarinha') {
                if (clarinhaAmorosa()) {
                    falar(b, pick(['*lambe a Lola de volta*', 'prrr... obrigada, Lola ♥', '*fecha os olhinhos e deixa*']));
                    particula('coracao', b.x, b.y - 16, 2);
                    mostrarHumor(b, 'feliz', 2500);
                }
                else {
                    falar(b, 'Tá bom, Lola. Tá bom.');
                    const [x, y] = pontoLonge(b);
                    irPara(b, x, y, null, 30);
                }
            }
            else if (b.id === 'tho') {
                falar(b, '!!!');
                zoomies(b, 3);
            }
            else
                mostrarHumor(b, 'feliz', 2000);
        }, 1700);
    });
}
function pegaPega(tho, b) {
    falar(tho, 'Te peguei!', 1200);
    som.miau('tho', 1.2);
    tho.estado = 'perseguindo';
    tho.par = b;
    tho.timer = 4.5;
    b.estado = 'fugindo';
    b.par = tho;
    b.timer = 4.5;
    b.tx = null;
    mostrarHumor(b, 'bravo', 800);
    if (b.id === 'clarinha') {
        som.chiado();
        falar(b, 'SAI, THO!', 1400);
    }
    else if (b.id === 'lola')
        falar(b, 'Hihi! Não pega!', 1400);
}
function falar(alvo, txt, ms = 2400) {
    if (alvo === gatoPerto)
        return falarPerto(txt, ms);
    const ant = baloes.find(b => b.alvo === alvo);
    if (ant) {
        ant.el.remove();
        baloes.splice(baloes.indexOf(ant), 1);
    }
    const el = document.createElement('div');
    el.className = 'balao';
    el.textContent = txt;
    estiloBalao(el, alvo, txt);
    document.body.appendChild(el);
    baloes.push({ alvo, el, ate: performance.now() + ms, mapa: (alvo === FEFE || alvo === ISI) ? null : (alvo.mapa || 'quarto') });
}
