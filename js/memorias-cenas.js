const _construirNPCs44 = construirNPCs;
window.construirNPCs = function () {
    _construirNPCs44();
    if (MAPA !== 'mem_date')
        return;
    NPCS.forEach(n => { if (n.tipo === 'garcom') {
        n.tipo = 'rota';
        n.rota = [[92, 74], [226, 74], [226, 224], [150, 224], [226, 224], [226, 74]];
        n.ri = 0;
        n.x = 92;
        n.y = 74;
        n.vel = 16;
        n.indo = false;
        n.alvo = null;
    } });
};
let roteiroAtivo = false;
window.roteiro = function (falas, depois, mapa) {
    let i = 0;
    roteiroAtivo = true;
    const tempo = t => Math.max(2600, 1400 + String(t).length * 60);
    const total = 900 + falas.reduce((s, [, t]) => s + tempo(t) + 300, 0);
    conversaAte = performance.now() + total + 1500;
    const passo = () => {
        if (MAPA !== mapa) {
            roteiroAtivo = false;
            return;
        }
        if (i >= falas.length) {
            roteiroAtivo = false;
            if (depois)
                setTimeout(depois, 1200);
            return;
        }
        const [q, txt] = falas[i++], ms = tempo(txt);
        roteiroAtivo = 'fala';
        falar(q === 'isi' ? ISI : FEFE, txt, ms);
        roteiroAtivo = true;
        const outra = q === 'isi' ? FEFE : ISI, b = baloes.find(b => b.alvo === outra);
        if (b)
            b.ate = Math.min(b.ate, performance.now() + 250);
        setTimeout(passo, ms + 300);
    };
    setTimeout(passo, 900);
};
const _falar45 = falar;
window.falar = function (alvo, txt, ms) {
    if (roteiroAtivo === true && (alvo === FEFE || alvo === ISI))
        return;
    return _falar45(alvo, txt, ms);
};
let servico = null;
const _roteiro46 = roteiro;
window.roteiro = function (falas, depois, mapa) {
    const g = NPCS.find(n => n.rota || n.tipo === 'servindo');
    if (mapa !== 'mem_date' || !g)
        return _roteiro46(falas, depois, mapa);
    roteiroAtivo = true;
    conversaAte = 0;
    const ida = (g.x < 220 && g.y < 150) ? [[226, 74], [226, 224], [82, 222]] : (g.y > 200 ? [[150, 224], [82, 222]] : [[226, 224], [82, 222]]);
    g.tipo = 'servindo';
    g.vel = 30;
    servico = { g, cam: ida, fase: 'ida', t: 0, falas, depois, mapa };
};
const _atNPC46 = atualizarNPCs;
window.atualizarNPCs = function (dt) {
    _atNPC46(dt);
    if (!servico)
        return;
    const S2 = servico, g = S2.g;
    if (MAPA !== S2.mapa || !NPCS.includes(g)) {
        servico = null;
        roteiroAtivo = false;
        return;
    }
    if (S2.cam.length) {
        const [tx, ty] = S2.cam[0];
        if (andarNPC(g, tx, ty, dt))
            S2.cam.shift();
        return;
    }
    g.anda = false;
    if (S2.fase === 'ida') {
        S2.fase = 'servindo';
        g.dir = 'left';
        falar(g, 'Boa noite! Duas taças do nosso melhor vinho ♥', 2600);
        setTimeout(() => { if (servico !== S2)
            return; roteiroAtivo = 'fala'; falar(ISI, 'Obrigada!', 1600); roteiroAtivo = true; }, 2400);
        setTimeout(() => { if (servico !== S2)
            return; falar(g, 'Aproveitem a noite', 1800); S2.fase = 'volta'; S2.cam = [[150, 224], [226, 224]]; }, 4300);
    }
    else if (S2.fase === 'volta') {
        servico = null;
        g.tipo = 'rota';
        g.vel = 16;
        g.rota = [[226, 224], [226, 74], [92, 74], [226, 74]];
        g.ri = 0;
        roteiroAtivo = false;
        setTimeout(() => { if (MAPA === S2.mapa)
            _roteiro46(S2.falas, S2.depois, S2.mapa); }, 400);
    }
};
const _cMemPedido47 = CONSTROI.mem_pedido;
CONSTROI.mem_pedido = function () {
    _cMemPedido47();
    const C = CENAS.mem_pedido;
    if (!C)
        return;
    const sentarIsi = () => { ISI.pose = 'assento'; ISI.poseSpr = 'sentadaLadoE'; ISI.px = 143; ISI.py = 58; ISI.pb = 148.1; ISI.saida = [120, 84]; ISI.anda = false; ISI.x = 151; ISI.y = 82; };
    C.aoEntrar = () => {
        setTimeout(() => {
            if (MAPA !== 'mem_pedido')
                return;
            ISI.pose = null;
            ISI.estado = 'abraco';
            ISI.x = 118;
            ISI.y = 92;
            ISI.dir = 'down';
            C._isiSentada = false;
            roteiroAtivo = true;
            setTimeout(() => { if (MAPA !== 'mem_pedido')
                return; roteiroAtivo = 'fala'; falar(ISI, 'Fefe, senta aqui comigo?', 2800); roteiroAtivo = true; }, 1600);
            setTimeout(() => {
                if (MAPA !== 'mem_pedido')
                    return;
                ISI.dir = 'up';
                ISI.anda = true;
                const t = setInterval(() => {
                    if (MAPA !== 'mem_pedido') {
                        clearInterval(t);
                        return;
                    }
                    const dx = 120 - ISI.x, dy = 84 - ISI.y, d = Math.hypot(dx, dy);
                    if (d < 1.5) {
                        clearInterval(t);
                        sentarIsi();
                        C._isiSentada = true;
                        roteiroAtivo = false;
                        ISI.falaT = 999;
                    }
                    else {
                        ISI.x += dx / d * Math.min(1.2, d);
                        ISI.y += dy / d * Math.min(1.2, d);
                        ISI.fr = (Math.floor(performance.now() / 150) % 4);
                    }
                }, 30);
            }, 4600);
        }, 50);
    };
    const pt = C.PONTOS.find(p => p.obj === 'sofaP');
    if (!pt)
        return;
    const orig = pt.acao;
    pt.acao = () => {
        if (!C._isiSentada) {
            sentarIsi();
            C._isiSentada = true;
        }
        const M = memoria('mem_pedido'), ant = M.falas;
        M.falas = [['fefe', 'Que foi? Você tá estranha kkkkk']].concat(ant.slice(2));
        orig();
        M.falas = ant;
    };
};
