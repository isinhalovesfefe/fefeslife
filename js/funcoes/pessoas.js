function iconeNec(ic) { const d = EMOJI_PX[ic], w = d ? d[0][0].length : 16, h = d ? d[0].length : 16, s = Math.min(13 / w, 11 / h); return `<img src="${urlEmoji(ic)}" style="width:${Math.round(w * s)}px;height:${Math.round(h * s)}px;image-rendering:pixelated;display:block;margin:0 auto">`; }
function basesNPC() { if (_baseNPC)
    return _baseNPC; let fe = null; try {
    fe = gradesFefe(0, false);
}
catch (e) { } _baseNPC = [framesIsinha()].concat(fe ? [fe] : []); return _baseNPC; }
function gridCanvas(g, pal) {
    const c = document.createElement('canvas');
    c.width = g[0].length;
    c.height = g.length;
    const x = c.getContext('2d');
    g.forEach((r, y) => { for (let i = 0; i < r.length; i++) {
        const k = r[i];
        if (k !== '.' && pal[k]) {
            x.fillStyle = pal[k];
            x.fillRect(i, y, 1, 1);
        }
    } });
    return c;
}
function novaPessoa(o = {}) {
    const B = basesNPC(), base = o.base != null ? B[o.base % B.length] : pick(B), pele = o.pele || pick(PELE_NPC), cab = o.cabelo || pick(CABELO_NPC), top = o.top || pick(ROUPA_NPC), cal = o.calca || pick(CALCA_NPC);
    const pal = Object.assign({}, base === B[0] ? ISI_COR : FEFE_COR, { H: cab[0], h: cab[1], S: pele[0], s: pele[1], A: o.braco || pele[0], m: o.braco || pele[0], T: top, t: o.estampa || top, J: cal[0], j: cal[1], B: o.sapato || pick(['#2a2a30', '#f3f3f3', '#8a5a3a', '#1d1b22']), b: cal[0], E: '#2a1d30', W: '#ffffff' });
    const fr = {};
    ['down', 'up', 'left', 'right'].forEach(d => fr[d] = base[d].map(g => gridCanvas(g, pal)));
    return { fr, x: o.x || 0, y: o.y || 0, dir: o.dir || 'down', anda: false, t: Math.random() * 5, tipo: o.tipo || 'passeia', mapa: o.mapa || MAPA, vel: o.vel || 22, pausa: Math.random() * 3, falas: o.falas || null, ultFala: 0, corte: o.corte || 0, pula: !!o.pula, rota: o.rota || null, ri: 0, bandeja: !!o.bandeja, nome: o.nome || '' };
}
function caminhoLivre(x0, y0, x1, y1) { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 4); for (let i = 1; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n;
    if (bloqueado(x, y, 4))
        return false;
} return true; }
function pontoNPC(n) { for (let k = 0; k < 30; k++) {
    const x = MUNDO.x0 + 10 + Math.random() * (MUNDO.x1 - MUNDO.x0 - 20), y = MUNDO.y0 + 10 + Math.random() * (MUNDO.y1 - MUNDO.y0 - 20);
    if (!bloqueado(x, y, 5) && caminhoLivre(n.x, n.y, x, y))
        return [x, y];
} return null; }
function pontoLivreCena() { for (let k = 0; k < 60; k++) {
    const x = MUNDO.x0 + 10 + Math.random() * (MUNDO.x1 - MUNDO.x0 - 20), y = MUNDO.y0 + 10 + Math.random() * (MUNDO.y1 - MUNDO.y0 - 20);
    if (!bloqueado(x, y, 6))
        return [x, y];
} return null; }
function construirNPCs() {
    NPCS = [];
    npcMapa = MAPA;
    const M = MAPA;
    if (M === 'parque') {
        for (let i = 0; i < 6; i++) {
            const p = pontoLivreCena();
            if (p)
                NPCS.push(novaPessoa({ x: p[0], y: p[1], tipo: 'passeia', falas: FALAS_NPC.parque, vel: 18 + Math.random() * 10 }));
        }
        const p = pontoLivreCena();
        if (p) {
            const c = novaPessoa({ x: p[0], y: p[1], tipo: 'passeia', falas: ['Oi! Ele é bonzinho, pode fazer carinho', 'Vem, Bolinha!'], vel: 20 });
            c.cachorro = { x: p[0] - 10, y: p[1] };
            NPCS.push(c);
        }
        const j = pontoLivreCena();
        if (j)
            NPCS.push(novaPessoa({ x: j[0], y: j[1], tipo: 'passeia', falas: ['*correndo* ufa ufa', 'Bom diaaa!'], vel: 48, top: '#ff8a3d' }));
    }
    else if (M === 'cidade') {
        const { W, H, H1, H2, V1, V2, RUA, CAL } = CID;
        const linhasH = [H1 - CAL / 2 + 5, H1 + RUA + CAL / 2 + 5, H2 - CAL / 2 + 5, H2 + RUA + CAL / 2 + 5], linhasV = [V1 - CAL / 2, V1 + RUA + CAL / 2, V2 - CAL / 2, V2 + RUA + CAL / 2];
        for (let i = 0; i < 22; i++) {
            const horiz = i % 2 === 0;
            if (horiz) {
                const y = pick(linhasH), x = 40 + Math.random() * (W - 80), x2 = Math.random() < .5 ? 30 : W - 30;
                NPCS.push(novaPessoa({ x, y, tipo: 'rota', rota: [[x2, y], [x2 === 30 ? W - 30 : 30, y]], falas: FALAS_NPC.cidade, vel: 16 + Math.random() * 12 }));
            }
            else {
                const x = pick(linhasV), y = 40 + Math.random() * (H - 80), y2 = Math.random() < .5 ? 30 : H - 30;
                NPCS.push(novaPessoa({ x, y, tipo: 'rota', rota: [[x, y2], [x, y2 === 30 ? H - 30 : 30]], falas: FALAS_NPC.cidade, vel: 16 + Math.random() * 12 }));
            }
        }
        const CORES_DOG = [['#e6a050', '#f6dcb0', '#e6a050'], ['#8a8d96', '#eceae6', '#5a5d66'], ['#3a2a20', '#c8a070', '#3a2a20'], ['#f4f1ec', '#ffffff', '#d8d2c8'], ['#2a2a30', '#5a5a66', '#2a2a30']];
        for (let i = 0; i < 6; i++) {
            const y = pick(linhasH), x = 60 + Math.random() * (W - 120), x2 = Math.random() < .5 ? 30 : W - 30;
            const n = novaPessoa({ x, y, tipo: 'rota', rota: [[x2, y], [x2 === 30 ? W - 30 : 30, y]], vel: 15 + Math.random() * 6, falas: ['Oi! Pode fazer carinho, ele é bonzinho', 'Ele adora gente!', 'Vem, Pipoca!', 'Cuidado, ele é curioso', 'Fala oi, Thor!'] });
            n.cachorro = { x: x - 12, y, cor: pick(CORES_DOG) };
            NPCS.push(n);
        }
    }
    else if (M === 'show') {
        for (let i = 0; i < 14; i++) {
            const x = 30 + (i % 7) * 38 + Math.random() * 12, y = 110 + Math.floor(i / 7) * 46 + Math.random() * 16;
            if (bloqueado(x, y, 4))
                continue;
            NPCS.push(novaPessoa({ x, y, dir: 'up', tipo: 'publico', pula: true, falas: FALAS_NPC.show }));
        }
    }
    else if (M === 'cafe') {
        NPCS.push(novaPessoa({ x: 176, y: 58, dir: 'down', tipo: 'parado', nome: 'barista', top: '#f4f1ec', estampa: '#7a4f3a', falas: ['Bem-vindas! O de sempre?', 'Saindo um cafezinho!', 'Hoje tem bolo de cenoura fresquinho'] }));
        NPCS.push(novaPessoa({ x: 156, y: 92, dir: 'up', tipo: 'parado', falas: FALAS_NPC.cafe }));
        NPCS.push(novaPessoa({ x: 218, y: 94, dir: 'up', tipo: 'parado', falas: FALAS_NPC.cafe }));
        NPCS.push(novaPessoa({ x: 120, y: 96, tipo: 'garcom', bandeja: true, top: '#1d1b22', estampa: '#f4f1ec', calca: ['#1d1b22', '#141318'], falas: FALAS_NPC.garcom, vel: 28 }));
    }
    else if (M === 'mem_namorados' || M === 'mem_date') {
        const p = pontoLivreCena();
        if (p)
            NPCS.push(novaPessoa({ x: p[0], y: p[1], tipo: 'garcom', bandeja: true, top: M === 'mem_date' ? '#1d1b22' : '#f4f1ec', estampa: M === 'mem_date' ? '#8a1820' : '#1d1b22', calca: ['#1d1b22', '#141318'], falas: M === 'mem_date' ? ['Mais um vinho?', 'Uma tábua de queijos pra vocês?', 'Fiquem à vontade ♥'] : ['Boa noite! Mesa pra duas?', 'Feliz Dia dos Namorados!', 'A sobremesa já vem'], vel: 24 }));
        const q = pontoLivreCena();
        if (q && M === 'mem_namorados')
            NPCS.push(novaPessoa({ x: q[0], y: q[1], tipo: 'passeia', vel: 16, falas: ['Que lugar lindo', 'Boa noite!'] }));
    }
    else if (M === 'cinema') {
        const p = pontoLivreCena();
        if (p)
            NPCS.push(novaPessoa({ x: p[0], y: p[1], tipo: 'passeia', vel: 14, falas: ['Shhh! Vai começar!', 'Pipoca grande, por favor'] }));
    }
}
function andarNPC(n, tx, ty, dt) {
    const dx = tx - n.x, dy = ty - n.y, d = Math.hypot(dx, dy);
    if (d < 1.5) {
        n.anda = false;
        return true;
    }
    const v = n.vel * dt;
    n.x += dx / d * Math.min(v, d);
    n.y += dy / d * Math.min(v, d);
    n.anda = true;
    n.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    return false;
}
function atualizarNPCs(dt) {
    if (npcMapa !== MAPA) {
        construirNPCs();
        garcomVisitou = false;
    }
    if (!NPCS.length)
        return;
    const ag = performance.now();
    if (!FEFE.pose)
        garcomVisitou = false;
    NPCS.forEach(n => {
        n.t += dt;
        if (n.tipo === 'passeia') {
            if (n.alvo) {
                if (andarNPC(n, n.alvo[0], n.alvo[1], dt)) {
                    n.alvo = null;
                    n.pausa = 1.5 + Math.random() * 4;
                }
            }
            else {
                n.anda = false;
                n.pausa -= dt;
                if (n.pausa <= 0) {
                    n.alvo = pontoNPC(n);
                    if (!n.alvo)
                        n.pausa = 2;
                }
            }
        }
        else if (n.tipo === 'rota') {
            const [tx, ty] = n.rota[n.ri];
            if (andarNPC(n, tx, ty, dt))
                n.ri = (n.ri + 1) % n.rota.length;
        }
        else if (n.tipo === 'garcom') {
            if (FEFE.pose === 'assento' && !garcomVisitou && !n.indo) {
                n.indo = true;
                const ang = Math.random() * Math.PI * 2;
                let alvo = null;
                for (let k = 0; k < 16 && !alvo; k++) {
                    const a = ang + k * .4, x = FEFE.x + Math.cos(a) * 24, y = FEFE.y + Math.sin(a) * 14;
                    if (!bloqueado(x, y, 5))
                        alvo = [x, y];
                }
                n.alvo = alvo || [FEFE.x + 20, FEFE.y];
                n.atendendo = true;
            }
            if (n.alvo) {
                if (andarNPC(n, n.alvo[0], n.alvo[1], dt) || n.travou > 4) {
                    const atend = n.atendendo;
                    n.alvo = null;
                    n.travou = 0;
                    n.pausa = atend ? 4 : 2 + Math.random() * 3;
                    if (atend) {
                        n.atendendo = false;
                        n.indo = false;
                        garcomVisitou = true;
                        n.dir = FEFE.x > n.x ? 'right' : 'left';
                        const fr = MAPA === 'cafe' ? (pedidoCafe ? ['Aqui está! Bom apetite ☕', 'Prontinho, quentinho!'] : ['O que vão querer hoje?', 'Já escolheram?']) : MAPA === 'mem_date' ? ['Mais uma taça de vinho?', 'Uma tábua de frios pra vocês?'] : ['Feliz Dia dos Namorados! A sobremesa já vem', 'Desejam mais alguma coisa?'];
                        falar(n, pick(fr), 2600);
                        if (ISI.aqui)
                            setTimeout(() => falar(ISI, pick(['Obrigada!', 'Que atendimento bom', 'Obrigadaaa ♥'])), 1400);
                    }
                }
                else
                    n.travou = (n.travou || 0) + (n.anda ? 0 : dt);
            }
            else {
                n.anda = false;
                n.pausa -= dt;
                if (n.pausa <= 0 && !n.indo) {
                    n.alvo = pontoNPC(n);
                    n.pausa = 2;
                }
            }
        }
        else {
            n.anda = false;
        }
        if (n.cachorro) {
            const c = n.cachorro, lado = (n.dir === 'left' ? 12 : -12), dx = n.x + (n.dir === 'left' || n.dir === 'right' ? -lado * -1 : -12) - c.x, dy = n.y + 2 - c.y;
            if (Math.hypot(dx, dy) > 3) {
                c.x += dx * Math.min(1, dt * 3);
                c.y += dy * Math.min(1, dt * 3);
            }
        }
        if (n.falas && ag - n.ultFala > 25000 && Math.hypot(n.x - FEFE.x, n.y - FEFE.y) < 22 && !bloqueioTela() && Math.random() < dt * 1.5) {
            n.ultFala = ag;
            falar(n, pick(n.falas), 2200);
        }
        if (n.tipo === 'publico' && ag - n.ultFala > 9000 && Math.random() < dt * .08) {
            n.ultFala = ag;
            falar(n, pick(n.falas), 1500);
        }
    });
}
function desenharNPCs(lista) {
    if (npcMapa !== MAPA || !NPCS.length)
        return;
    const ag = performance.now();
    NPCS.forEach((n, i) => {
        lista.push({ b: n.y, f: () => {
                const fr = n.fr[n.dir], k = n.anda ? Math.floor(n.t * 7) % 4 : 0, im = fr[k] || fr[0];
                const pulo = n.pula ? Math.max(0, Math.round(Math.sin(ag / 170 + i * 1.3) * 3)) : 0, x = Math.round(n.x) - 8, y = Math.round(n.y) - 26 - pulo;
                ctx.fillStyle = 'rgba(0,0,0,.2)';
                ctx.fillRect(Math.round(n.x) - 5, Math.round(n.y) - 1, 10, 2);
                if (!n.anda && !n.pula)
                    desenharRespirando(im, x, y, 13, Math.floor((ag + i * 700) / 1800) % 2 === 1);
                else
                    ctx.drawImage(im, x, y);
                if (n.bandeja) {
                    const bx = n.dir === 'left' ? x - 1 : x + 11;
                    ctx.fillStyle = '#2a1d30';
                    ctx.fillRect(bx, y + 13, 8, 2);
                    ctx.fillStyle = '#d9dbe6';
                    ctx.fillRect(bx + 1, y + 13, 6, 1);
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(bx + 2, y + 10, 3, 3);
                }
                if (n.pula && Math.sin(ag / 170 + i * 1.3) > .9) {
                    ctx.fillStyle = n.fr.down ? '#f8dcc8' : '#fff';
                }
            } });
        if (n.cachorro)
            lista.push({ b: n.cachorro.y, f: () => { const c = n.cachorro, b = Math.round(Math.abs(Math.sin(ag / 120))) * (n.anda ? 1 : 0); try {
                    pomPx(ctx, Math.round(c.x) - 6, Math.round(c.y) - 10 - b, c.cor || ['#e6a050', '#f6dcb0', '#e6a050']);
                }
                catch (e) { } ctx.fillStyle = '#2a1d30'; ctx.fillRect(Math.round(c.x) + 2, Math.round(c.y) - 14, Math.round(n.x - c.x) - 6, 1); } });
    });
}
