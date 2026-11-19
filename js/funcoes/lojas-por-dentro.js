function falaSemAlvo() {
    const M = MAPA, noite = ehNoiteRua();
    if (M === 'quarto')
        return pick(['Hmm...', 'Cadê os gatos?', 'Que quarto lindo']);
    if (M === 'cidade') {
        if (FEFE.y > CID2.CALC - 10)
            return pick(noite ? ['O mar à noite é lindo', 'Que barulhinho de onda', 'Olha a lua no mar'] : ['Que cheiro de mar!', 'Olha as ondas!', 'Dia perfeito de praia', 'Quero um açaí agora']);
        return pick(noite ? ['A cidade fica linda à noite', 'Que noite gostosa', 'Olha as luzes!'] : ['Que dia gostoso pra passear', 'Olha aquele cachorrinho!', 'Bora explorar', 'A cidade tá movimentada hoje']);
    }
    if (M === 'parque')
        return pick(noite ? ['Que noite tranquila', 'Olha os vaga-lumes!'] : ['Que ar puro', 'Cadê os patinhos?', 'Amo esse parque']);
    if (M === 'cafe')
        return pick(['Que cheirinho de café', 'Amo esse lugar']);
    if (M === 'cinema')
        return pick(['Que cheiro de pipoca', 'Qual filme a gente vê?']);
    if (M === 'show')
        return pick(['QUE SOM!', 'Tô arrepiada', 'Amo essa banda']);
    if (M === 'cozinha')
        return pick(['O que eu cozinho hoje?', 'Tô com fome...', 'Tho, sai do balcão!']);
    if (M === 'estrelas')
        return pick(['Que céu lindo', 'Olha quantas estrelas']);
    if (M.startsWith('mem_'))
        return pick(['Que saudade desse dia...', 'Lembro de tudo', 'Foi perfeito']);
    if (M.startsWith('int_')) {
        const L = LOJAS[(CENAS[M] || {}).lojaObj];
        return pick((L && L.falasFefe) || ['Que lugar fofo', 'Hmm...']);
    }
    return pick(['Hmm...', 'Que lugar legal']);
}
function curvarCarros() {
    if (MAPA !== 'cidade')
        return;
    const { RUA } = CID, { H3, V3, V4 } = CID2, VS = [CID.V1, CID.V2, V3, V4], s = c => Math.abs(c.vx || c.vy || 80);
    CARROS.forEach(c => {
        if (c.vy > 0) {
            if (c.vira === undefined)
                c.vira = Math.random() < .5 ? 'L' : 'R';
            const alvoY = c.vira === 'L' ? H3 + 26 : H3 + 78;
            if (c.y >= alvoY) {
                const v = s(c);
                c.y = alvoY;
                c.vy = 0;
                c.vx = c.vira === 'L' ? -v : v;
                c.w = 68;
                c.h = 30;
                c.vira = undefined;
                c.virou = performance.now();
            }
        }
        else if (c.vy < 0 && c.y > H3 + RUA) {
            c.vy = Math.abs(c.vy);
            c.x -= 52;
            c.y = -70;
        }
        else if (c.vx && Math.abs(c.y - (H3 + 78)) < 2 && c.vx > 0 && performance.now() - (c.virou || 0) > 1500) {
            VS.forEach(vx => { const xl = vx + 78; if (Math.abs(c.x - xl) < 2 && Math.random() < .4) {
                const v = s(c);
                c.x = xl;
                c.vx = 0;
                c.vy = -v;
                c.w = 30;
                c.h = 68;
                c.virou = performance.now();
            } });
        }
        else if (c.vx && Math.abs(c.y - (H3 + 26)) < 2 && c.vx < 0 && performance.now() - (c.virou || 0) > 1500) {
            VS.forEach(vx => { const xl = vx + 78; if (Math.abs(c.x - xl) < 2 && Math.random() < .4) {
                const v = s(c);
                c.x = xl;
                c.vx = 0;
                c.vy = -v;
                c.w = 30;
                c.h = 68;
                c.virou = performance.now();
            } });
        }
    });
}
function escolherSorvete() {
    abrir('Qual sabor? 🍦', `<div class="grade">${SABORES.map(([n, c], i) => `<button class="px" data-sab="${i}"><span style="display:block;width:26px;height:20px;margin:0 auto;background:${c};border-radius:12px 12px 4px 4px;box-shadow:0 0 0 2px #2a1d30"></span>${n}</button>`).join('')}</div>`);
    document.querySelectorAll('[data-sab]').forEach(b => b.onclick = () => {
        const [n] = SABORES[+b.dataset.sab];
        fechar();
        falar(FEFE, `Uma bola de ${n.toLowerCase()}, por favor!`, 1800);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, `E pra mim de ${pick(SABORES.filter(s => s[0] !== n))[0].toLowerCase()}!`, 1800), 900);
        setTimeout(() => comerPrato({ n: 'Sorvete de ' + n, ic: '🍦' }, () => { if (!S.feitos.sorvC) {
            S.feitos.sorvC = true;
            ganhar(1);
        } }), 1200);
    });
}
function montarAcai() {
    const T = ['Granola', 'Banana', 'Morango', 'Leite em pó', 'Leite condensado', 'Paçoca'];
    let sel = [];
    const des = () => {
        abrir('Monta o seu açaí 🍧', `<p style="margin:0 0 8px;font-size:13px">Escolha até 3 acompanhamentos:</p><div class="grade">${T.map((t, i) => `<button class="px ${sel.includes(i) ? 'sel' : ''}" data-top="${i}">${t}</button>`).join('')}</div><div style="text-align:center;margin-top:10px"><button class="btn" id="acaiOk" style="width:auto">Pronto!</button></div>`);
        document.querySelectorAll('[data-top]').forEach(b => b.onclick = () => { const i = +b.dataset.top; sel = sel.includes(i) ? sel.filter(x => x !== i) : sel.length < 3 ? sel.concat(i) : sel; som.pop(); des(); });
        $('acaiOk').onclick = () => { fechar(); falar(FEFE, sel.length ? `Com ${sel.map(i => T[i].toLowerCase()).join(', ')}!` : 'Puro, por favor!', 2000); setTimeout(() => comerPrato({ n: 'Açaí', ic: '🍧' }, () => { if (!S.feitos.acaiC) {
            S.feitos.acaiC = true;
            ganhar(2);
        } }), 1200); };
    };
    des();
}
function montarBuque() {
    const F = [['Girassol', '#ffd36e'], ['Rosa', '#ff5c8d'], ['Margarida', '#f4f1ec'], ['Lavanda', '#c08cff'], ['Tulipa', '#ff8a3d']];
    let sel = [];
    const des = () => {
        abrir('Monta um buquê 💐', `<p style="margin:0 0 8px;font-size:13px">Escolha 3 flores:</p><div class="grade">${F.map(([n, c], i) => `<button class="px ${sel.includes(i) ? 'sel' : ''}" data-fl="${i}"><span style="display:block;width:18px;height:18px;margin:0 auto;background:${c};border-radius:50%;box-shadow:0 0 0 2px #2a1d30"></span>${n}</button>`).join('')}</div><div style="text-align:center;margin-top:10px"><button class="btn" id="buqOk" style="width:auto">Embrulhar!</button></div>`);
        document.querySelectorAll('[data-fl]').forEach(b => b.onclick = () => { const i = +b.dataset.fl; sel = sel.includes(i) ? sel.filter(x => x !== i) : sel.length < 3 ? sel.concat(i) : sel; som.pop(); des(); });
        $('buqOk').onclick = () => {
            if (!sel.length)
                return toast('Escolhe pelo menos uma flor 🌸');
            fechar();
            som.plim();
            particula('coracao', FEFE.x, FEFE.y - 26, 4);
            if (ISI.aqui) {
                falar(FEFE, `Um buquê pra você, ${NOME_MINHA} ♥`, 2000);
                setTimeout(() => { falar(ISI, 'VOCÊ É A NAMORADA MAIS FOFA DO MUNDO', 2200); necIsi('carinho', 30); }, 1100);
            }
            else
                falar(FEFE, 'Vou levar pra casa ♥', 1800);
            nec('social', 8);
            if (!S.feitos.buque) {
                S.feitos.buque = true;
                ganhar(2);
                salvar();
            }
        };
    };
    des();
}
function cumprimentoLoja() {
    if (MAPA === mapaAnt39)
        return;
    mapaAnt39 = MAPA;
    if (!String(MAPA).startsWith('int_'))
        return;
    const L = LOJAS[(CENAS[MAPA] || {}).lojaObj];
    if (!L)
        return;
    setTimeout(() => { const at = NPCS.find(n => n.nome === 'atendente'); if (at && String(MAPA).startsWith('int_')) {
        at.ultFala = performance.now();
        falar(at, `${saudacao()} ${L.staff}`, 2600);
    } }, 1700);
}
function iniciarRuaViva() {
    pombos = [];
    for (let i = 0; i < 9; i++)
        pombos.push({ x: 600 + Math.random() * 220, y: 450 + Math.random() * 150, vx: 0, vy: 0, voa: 0, t: Math.random() * 5 });
    musico = novaPessoa({ x: 660, y: 470, dir: 'down', tipo: 'parado', masc: true, falas: null });
}
function atualizarRuaViva(dt) {
    if (MAPA !== 'cidade')
        return;
    if (!musico)
        iniciarRuaViva();
    pombos.forEach(p => {
        p.t += dt;
        if (p.voa > 0) {
            p.voa -= dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (p.voa <= 0) {
                p.x = 600 + Math.random() * 220;
                p.y = 450 + Math.random() * 150;
            }
            return;
        }
        if (Math.hypot(FEFE.x - p.x, FEFE.y - p.y) < 28 || (FEFE.bike && Math.hypot(FEFE.x - p.x, FEFE.y - p.y) < 50)) {
            p.voa = 4;
            const a = Math.atan2(p.y - FEFE.y, p.x - FEFE.x);
            p.vx = Math.cos(a) * 90;
            p.vy = Math.sin(a) * 60 - 60;
        }
        else if (Math.random() < dt * .6) {
            p.x += Math.random() * 8 - 4;
            p.y += Math.random() * 6 - 3;
        }
    });
    const h = horaAgora();
    if (musico && h >= 9 && h < 21 && Math.random() < dt * .7)
        particula('nota', musico.x + (Math.random() * 8 - 4), musico.y - 26, 1);
}
function desenharRuaViva(lista) {
    if (MAPA !== 'cidade' || !musico)
        return;
    const t = performance.now() / 1000, h = horaAgora();
    pombos.forEach((p, i) => lista.push({ b: p.voa > 0 ? 99000 : p.y, f: () => {
            const x = Math.round(p.x), y = Math.round(p.y), bica = p.voa <= 0 && Math.floor(t * 3 + i) % 4 === 0, asa = p.voa > 0 && Math.floor(t * 10 + i) % 2;
            if (p.voa <= 0) {
                ctx.fillStyle = 'rgba(0,0,0,.18)';
                ctx.fillRect(x - 3, y, 6, 1);
            }
            ctx.fillStyle = '#2a1d30';
            ctx.fillRect(x - 3, y - 4, 7, 4);
            ctx.fillStyle = '#8a8d96';
            ctx.fillRect(x - 2, y - 3, 5, 2);
            ctx.fillStyle = '#5a5d66';
            ctx.fillRect(x + 2, y - 5 + (bica ? 2 : 0), 2, 2);
            if (asa) {
                ctx.fillStyle = '#8a8d96';
                ctx.fillRect(x - 5, y - 6, 4, 1);
                ctx.fillRect(x + 2, y - 6, 4, 1);
            }
        } }));
    if (h >= 9 && h < 21)
        lista.push({ b: musico.y, f: () => {
                const fr = musico.fr.down[0];
                ctx.drawImage(fr, Math.round(musico.x) - 8, Math.round(musico.y) - 26);
                const s = Math.floor(t * 4) % 2;
                ctx.fillStyle = '#2a1d30';
                ctx.fillRect(musico.x - 7, musico.y - 13, 12, 6);
                ctx.fillStyle = '#c98f5f';
                ctx.fillRect(musico.x - 6, musico.y - 12, 8, 4);
                ctx.fillStyle = '#5e3d2e';
                ctx.fillRect(musico.x + 2, musico.y - 11, 8, 2);
                ctx.fillStyle = '#fff';
                ctx.fillRect(musico.x - 3 + s, musico.y - 11, 1, 2);
                ctx.fillStyle = '#2a1d30';
                ctx.fillRect(musico.x - 2, musico.y - 1, 10, 4);
                ctx.fillStyle = '#5e3d2e';
                ctx.fillRect(musico.x - 1, musico.y, 8, 2);
            } });
    if (h >= 8 && h < 19)
        lista.push({ b: 845, f: () => {
                [[712, 0], [748, 1.7]].forEach(([bx, ph]) => {
                    const a = Math.sin(t * 2.4 + ph) * 8;
                    ctx.fillStyle = '#2a1d30';
                    ctx.fillRect(bx, 800, 1, 26 + Math.round(Math.abs(a) / 4));
                    const kx = Math.round(bx + a), ky = 826;
                    ctx.fillStyle = '#5e3d2e';
                    ctx.fillRect(kx - 4, ky, 9, 2);
                    ctx.fillStyle = ['#ff7aa8', '#5b8cff'][ph ? 1 : 0];
                    ctx.fillRect(kx - 2, ky - 7, 5, 6);
                    ctx.fillStyle = '#f0c8a8';
                    ctx.fillRect(kx - 2, ky - 11, 5, 4);
                    ctx.fillStyle = '#3a2418';
                    ctx.fillRect(kx - 2, ky - 12, 5, 2);
                });
            } });
}
function pontoMusico() {
    const C = CENAS.cidade;
    if (!C || C._musico)
        return;
    C._musico = true;
    const LP = MAPA === 'cidade' ? PONTOS : C.PONTOS;
    LP.push({ obj: 'musico', nome: 'Ouvir o músico de rua', x: 660, y: 490, acao: () => {
            const h = horaAgora();
            if (h < 9 || h >= 21)
                return falar(FEFE, 'O músico já foi embora...', 1600);
            try {
                if (!musica)
                    tocarMusica('bossa');
            }
            catch (e) { }
            falar(FEFE, '*joga uma moedinha* Toca uma bossa nova?', 2000);
            setTimeout(() => falar({ x: 660, y: 470, mapa: 'cidade' }, 'Essa é pro casal mais bonito da praça ♪', 2200), 1400);
            if (ISI.aqui)
                setTimeout(() => { falar(ISI, 'Dança comigo?', 1500); dancar(6000); }, 3200);
            setTimeout(() => { if (MAPA === 'cidade')
                pararMusica(); }, 12000);
            nec('diversao', 8);
        } });
}
function atualizarExtras39(dt) { curvarCarros(); cumprimentoLoja(); atualizarRuaViva(dt); pontoMusico(); }
