function construirCozinha() {
    const W = 300, H = 200, objs = [], cols = [], pts = [];
    const fundo = pinta(W, H, (R, C) => {
        for (let y = 60; y < H; y += 10)
            for (let x = 0; x < W; x += 10)
                R(x, y, 10, 10, ((x + y) / 10) % 2 ? '#f4e9dc' : '#e8d6c4');
        R(0, 0, W, 60, '#fbeef2');
        for (let y = 4; y < 56; y += 8)
            for (let x = ((y / 8) % 2) * 4; x < W; x += 8)
                R(x, y, 7, 7, '#ffd9e6');
        R(0, 56, W, 4, '#c96d93');
        R(190, 8, 46, 30, '#2a1d30');
        R(191, 9, 44, 28, corCeu(new Date().getHours())[0]);
        R(212, 9, 2, 28, '#2a1d30');
        R(188, 36, 50, 3, '#fff');
    });
    objs.push({ nome: 'geladeira', x: 14, y: 18, img: pinta(30, 58, (R) => { R(0, 0, 30, 58, '#2a1d30'); R(1, 1, 28, 56, '#e6eef5'); R(1, 22, 28, 2, '#2a1d30'); R(24, 8, 2, 10, '#9fa6b8'); R(24, 28, 2, 14, '#9fa6b8'); R(5, 6, 6, 6, '#ff7aa8'); R(13, 30, 6, 4, '#ffd36e'); }), base: 76 });
    cols.push({ x: 14, y: 60, w: 30, h: 16 });
    objs.push({ nome: 'bancada', x: 50, y: 44, img: pinta(130, 32, (R, C) => {
            R(0, 0, 130, 32, '#2a1d30');
            R(1, 1, 128, 12, '#d9d4cf');
            R(1, 13, 128, 18, '#a8714a');
            for (let x = 8; x < 128; x += 30)
                R(x, 16, 22, 12, '#8f5e3c');
            for (let x = 17; x < 128; x += 30)
                R(x, 21, 4, 2, '#ffd36e');
            R(8, 2, 24, 9, '#9fa6b8');
            R(10, 3, 20, 7, '#7ea6c8');
            R(18, 0, 2, 3, '#9fa6b8');
            R(60, 2, 34, 10, '#2a1d30');
            C(68, 6, 3, '#55505f');
            C(84, 6, 3, '#55505f');
            R(100, 3, 16, 8, '#f4f1ec');
            R(102, 4, 12, 3, '#c98f5f');
        }), base: 76 });
    cols.push({ x: 50, y: 60, w: 130, h: 16 });
    objs.push({ nome: 'mesaC', x: 120, y: 118, img: pinta(60, 30, (R) => { R(0, 0, 60, 22, '#2a1d30'); R(1, 1, 58, 20, '#c98f5f'); R(1, 1, 58, 3, '#d9a070'); R(4, 22, 3, 8, '#2a1d30'); R(53, 22, 3, 8, '#2a1d30'); R(26, 6, 8, 8, '#2a1d30'); R(27, 7, 6, 6, '#fff'); R(28, 5, 4, 2, '#7bd389'); }), base: 148 });
    cols.push({ x: 120, y: 126, w: 60, h: 22 });
    objs.push({ nome: 'thoBalcao', x: 240, y: 60, img: pinta(40, 22, () => { }), base: 80, draw: (c, o) => {
            c.fillStyle = '#2a1d30';
            c.fillRect(o.x, o.y + 6, 40, 16);
            c.fillStyle = '#a8714a';
            c.fillRect(o.x + 1, o.y + 7, 38, 14);
            if (!S.gatos.tho.dormindo)
                gatoPequeno(c, 'tho', Math.floor(performance.now() / 2500) % 4 === 0 ? 'feliz' : 'normal', o.x + 14, o.y - 8);
        } });
    cols.push({ x: 240, y: 66, w: 40, h: 14 });
    pts.push({ obj: 'bancada', nome: 'Cozinhar', x: 120, y: 88, acao: menuReceitas });
    pts.push({ obj: 'geladeira', nome: 'Abrir a geladeira', x: 29, y: 88, acao: () => { falar(FEFE, pick(['Só tem ketchup e sachê dos gatos...', 'Hmm, cadê o brigadeiro de ontem?', '*fecha a geladeira de novo*'])); } });
    pts.push({ obj: 'thoBalcao', nome: 'Tirar o Tho do balcão', x: 260, y: 92, acao: () => { falar(FEFE, 'THO, DESCE DAÍ!'); setTimeout(() => falar(THO_COZ, 'Não.', 1400), 700); } });
    porta(objs, pts, W, H, '#c96d93');
    CENAS.cozinha = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 80, y1: H - 6 }, entrada: [150, 162], chegada: ['Bora cozinhar alguma coisa?', 'O Tho já tá no balcão de novo'], chegadaSozinha: ['Hora de cozinhar!', 'O Tho tá no balcão de novo...'], bg: '#e8d6c4' };
}
function menuReceitas() {
    abrir('O que vamos fazer?', `<div class="grade">${Object.entries(RECEITAS).map(([k, r]) => `<button class="px" data-rec="${k}"><span style="font-size:28px">${r.ic}</span>${r.n}</button>`).join('')}</div>`);
    document.querySelectorAll('[data-rec]').forEach(b => b.onclick = () => cozinhar(b.dataset.rec));
}
function cozinhar(k) {
    const R = RECEITAS[k];
    let i = 0, pontos = 0, max = 0;
    const timers = [];
    const limpa = () => { timers.forEach(clearTimeout); timers.length = 0; };
    const prox = (p) => { limpa(); pontos += p; i++; if (i >= R.passos.length)
        return fim(); passo(); };
    const titulo = () => `${R.ic} ${R.n} · passo ${i + 1} de ${R.passos.length}`;
    const passo = () => {
        const P = R.passos[i];
        if (P.tipo === 'ordem') {
            max += 3;
            let feito = [], erros = 0;
            const embaralhado = [...P.itens].sort(() => Math.random() - .5);
            const desenha = (aviso) => {
                abrir(titulo(), `<div class="mg"><p>${P.txt}</p><div style="min-height:24px;font-size:14px">${feito.map(x => '✓ ' + x).join(' · ') || '&nbsp;'}</div>
        <div class="itens">${embaralhado.map(it => `<button data-it="${it}" class="${feito.includes(it) ? 'ok' : ''}">${it}</button>`).join('')}</div><div id="ladraoBox" style="min-height:44px">${aviso || ''}</div></div>`, false);
                document.querySelectorAll('[data-it]').forEach(b => b.onclick = () => {
                    const it = b.dataset.it;
                    if (feito.includes(it))
                        return;
                    if (it === P.itens[feito.length]) {
                        feito.push(it);
                        som.pop();
                        if (feito.length === P.itens.length)
                            return prox(Math.max(1, 3 - erros));
                        desenha();
                    }
                    else {
                        erros++;
                        if (AC)
                            tom(AC.currentTime, 140, .12, .05, 'square');
                        desenha('<span style="color:#e0557f">Ops, ordem errada!</span>');
                    }
                });
            };
            desenha();
            timers.push(setTimeout(() => {
                if (!feito.length || !$('ladraoBox'))
                    return;
                const roubado = feito[feito.length - 1];
                $('ladraoBox').innerHTML = `<button class="ladrao" id="xoTho">O Tho tá roubando: ${roubado}! Toque pra espantar!</button>`;
                som.miau('tho', 1.2);
                let espantou = false;
                $('xoTho').onclick = () => { espantou = true; som.pop(); $('ladraoBox').innerHTML = 'Xô, Tho! 😾'; };
                timers.push(setTimeout(() => { if (espantou || !$('ladraoBox'))
                    return; feito = feito.filter(x => x !== roubado); erros++; desenha(`<span style="color:#e0557f">O Tho levou: ${roubado}. Coloca de novo!</span>`); }, 2200));
            }, 1800 + Math.random() * 1500));
        }
        if (P.tipo === 'tocar') {
            max += 3;
            let n = 0, comecou = false, fimT = 0;
            abrir(titulo(), `<div class="mg"><p>${P.txt}</p><div class="barra"><i id="bTocar" style="width:0"></i></div><button class="grande" id="btnTocar">${P.ic || '👆'} Toque!</button><p id="tTocar">${P.tempo}s</p></div>`, false);
            $('btnTocar').onpointerdown = (e) => {
                e.preventDefault();
                if (!comecou) {
                    comecou = true;
                    fimT = performance.now() + P.tempo * 1000;
                    const tk = setInterval(() => { const r = Math.max(0, (fimT - performance.now()) / 1000); if ($('tTocar'))
                        $('tTocar').textContent = r.toFixed(1) + 's'; if (r <= 0) {
                        clearInterval(tk);
                        prox(n >= P.alvo ? 3 : n >= P.alvo * .6 ? 2 : 1);
                    } }, 100);
                    timers.push(tk);
                }
                n++;
                som.pop();
                $('bTocar').style.width = Math.min(100, n / P.alvo * 100) + '%';
                if (n === P.alvo)
                    particula('brilho', FEFE.x, FEFE.y - 26, 3);
            };
        }
        if (P.tipo === 'mexer') {
            max += 3;
            mexerPanela(P, titulo(), prox);
        }
        if (P.tipo === 'temperar') {
            max += 3;
            let n = 0;
            abrir(titulo(), `<div class="mg"><p>${P.txt}</p><div id="tempCont" style="font-size:24px;min-height:34px;letter-spacing:2px">&nbsp;</div><p id="tempNum" style="margin:2px 0 8px">0 de ${P.n}</p><button class="grande" id="btnTemp">${P.ic} Colocar</button><div style="margin-top:10px"><button class="btn" id="btnTempOk" style="width:auto;margin:0 auto">Pronto!</button></div></div>`, false);
            $('btnTemp').onpointerdown = e => { e.preventDefault(); if (n >= P.n + 4)
                return; n++; som.pop(); $('tempCont').textContent = Array(n).fill(P.ic).join(''); $('tempNum').textContent = `${n} de ${P.n}`; };
            $('btnTempOk').onclick = () => {
                const dif = Math.abs(n - P.n);
                if (dif === 0)
                    som.plim();
                else if (AC)
                    tom(AC.currentTime, 140, .12, .05, 'square');
                toast(dif === 0 ? 'Na medida certinha!' : n > P.n ? 'Exagerou um pouquinho... 😅' : 'Faltou um pouquinho...');
                prox(dif === 0 ? 3 : dif === 1 ? 2 : 1);
            };
        }
        if (P.tipo === 'tempo') {
            let rep = 0, acertos = 0, pos = 0, dir = 1, tk;
            max += 3;
            const z0 = 30 + Math.random() * 40;
            abrir(titulo(), `<div class="mg"><p>${P.txt}</p><div class="barra" style="height:26px"><span class="zona" style="left:${z0}%;width:16%"></span><span class="marca" id="marca"></span></div><button class="grande" id="btnTempo">AGORA!</button><p id="msgTempo">${P.rep > 1 ? `0/${P.rep}` : ''}</p></div>`, false);
            tk = setInterval(() => { pos += dir * 2.2; if (pos > 98 || pos < 0)
                dir *= -1; const m = $('marca'); if (!m) {
                clearInterval(tk);
                return;
            } m.style.left = pos + '%'; }, 30);
            timers.push(tk);
            $('btnTempo').onclick = () => {
                rep++;
                const ok = pos >= z0 - 1 && pos <= z0 + 17;
                if (ok) {
                    acertos++;
                    som.plim();
                }
                else if (AC)
                    tom(AC.currentTime, 140, .12, .05, 'square');
                $('msgTempo').textContent = ok ? 'No ponto!' : (pos < z0 ? 'Cedo demais!' : 'Passou do ponto!');
                if (rep >= P.rep) {
                    clearInterval(tk);
                    setTimeout(() => prox(acertos === P.rep ? 3 : acertos > 0 ? 2 : 1), 600);
                }
            };
        }
    };
    const fim = () => {
        const pct = pontos / max, est = pct > .85 ? 3 : pct > .6 ? 2 : 1;
        abrir('Ficou pronto!', `<div class="mg"><div style="font-size:56px">${R.ic}</div><p style="font-size:22px;margin:4px 0">${'★'.repeat(est)}${'☆'.repeat(3 - est)}</p><p>${est === 3 ? `${R.n} perfeito! Cheirinho bom pela casa toda.` : est === 2 ? `${R.n} ficou bom!` : `${R.n}... comestível. Com amor.`}</p><button class="btn" id="comerAgora" style="background:#7bd389">🍽️ Comer agora</button></div>`);
        $('comerAgora').onclick = () => comerPrato({ n: R.n, ic: R.ic }, () => { if (!S.feitos.comeuReceita) {
            S.feitos.comeuReceita = true;
            ganhar(1);
        } });
        if (!S.feitos['rec_' + k]) {
            S.feitos['rec_' + k] = true;
            ganhar(est);
            salvar();
        }
        if (ISI.aqui)
            setTimeout(() => falar(ISI, est === 3 ? 'MEU DEUS QUE DELÍCIA' : est === 2 ? 'Tá muito bom, amor!' : 'Hmm... tá... ótimo! ♥'), 500);
        setTimeout(() => falar(THO_COZ, k === 'brigadeiro' ? '*olho no brigadeiro*' : '*cheira cheira*', 1800), 1400);
    };
    passo();
}
