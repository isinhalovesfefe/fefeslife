function agoraJogo() { const d = new Date(); if (DATA_TESTE) {
    const [dd, mm] = DATA_TESTE.split('/').map(Number);
    d.setMonth(mm - 1);
    d.setDate(dd);
} return d; }
function diaKey(d) { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function ddmm(d) { return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`; }
function entreDatas(d, [m1, d1], [m2, d2]) { const v = (d.getMonth() + 1) * 100 + d.getDate(), a = m1 * 100 + d1, b = m2 * 100 + d2; return a <= b ? v >= a && v <= b : v >= a || v <= b; }
function dataEspecial() {
    const d = agoraJogo(), k = ddmm(d), ano = d.getFullYear();
    if (ANIVERSARIO_DELA && k === ANIVERSARIO_DELA)
        return { id: 'aniversario', faixa: `FELIZ ANIVERSÁRIO, ${NOME_DELA.toUpperCase()}!`, cores: ['#ff7aa8', '#ffd36e', '#8fcaff', '#c08cff'], msg: MENSAGENS_DATAS.aniversario, fala: 'AI! O quarto tá todo decorado!!' };
    if (k === '25/04' && ano > 2026)
        return { id: 'namoro', faixa: `${ano - 2026} ANO${ano - 2026 > 1 ? 'S' : ''} DE NAMORO ♥`, cores: ['#ff5c8d', '#ff9ec4', '#fff'], msg: MENSAGENS_DATAS.namoro, fala: 'Hoje é nosso aniversário de namoro!!' };
    if (k === '12/06')
        return { id: 'namorados', faixa: 'FELIZ DIA DOS NAMORADOS ♥', cores: ['#ff5c8d', '#ff9ec4', '#c8102e'], msg: MENSAGENS_DATAS.namorados, fala: 'Dia dos namorados! ♥' };
    if (k === '24/12' || k === '25/12')
        return { id: 'natal', faixa: 'FELIZ NATAL!', cores: ['#c8102e', '#2f9a4a', '#ffd36e'], msg: MENSAGENS_DATAS.natal, fala: 'É Natal!! Tem presente na cama!' };
    if (k === '31/12' || k === '01/01')
        return { id: 'anonovo', faixa: 'FELIZ ANO NOVO!', cores: ['#ffd36e', '#fff', '#c08cff'], msg: MENSAGENS_DATAS.anonovo, fala: 'Feliz ano novo, gatinhos!' };
    if (d.getDate() === 25 && !(d.getMonth() === 3 && ano === 2026)) {
        const meses = (ano - 2026) * 12 + (d.getMonth() - 3);
        if (meses > 0 && meses % 12)
            return { id: 'mes' + meses, mes: true, faixa: `${meses} ${meses > 1 ? 'MESES' : 'MÊS'} JUNTAS ♥`, cores: ['#ff9ec4', '#fff'], msg: MENSAGENS_DATAS.mesversario.replace('{meses}', meses), fala: `Hoje faz ${meses} ${meses > 1 ? 'meses' : 'mês'} que a gente namora ♥` };
    }
    return null;
}
function chavePresente(de) { return de.id + '_' + agoraJogo().getFullYear() + (de.mes ? '_' + agoraJogo().getMonth() : ''); }
function abrirPresente() {
    const de = dataEspecial();
    if (!de)
        return;
    const pres = S.presentes || (S.presentes = {});
    const ja = pres[chavePresente(de)];
    abrir('🎁 Um presente pra você', `<div class="mg"><div id="caixaPres" style="font-size:72px;line-height:1;animation:tremeB .15s steps(2) infinite">🎁</div><p>Toque pra abrir!</p></div>`, false);
    $('caixaPres').onclick = () => {
        som.plim();
        if (AC)
            [523, 659, 784, 1046].forEach((f, i) => tom(AC.currentTime + i * .12, f, .4, .05, 'triangle'));
        document.querySelector('.mg').innerHTML = `<div class="papel px" style="text-align:left">${esc(de.msg)}<span class="ass">${esc(ASSINATURA)}</span></div>`;
        if (!ja) {
            pres[chavePresente(de)] = true;
            ganhar(10);
            (S.vistos || (S.vistos = {})).presente = true;
            salvar();
            construirSazonal();
        }
        if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Gostou? ♥', 2000), 600);
    };
}
function estacoes() { const d = agoraJogo(); return { natal: entreDatas(d, [12, 1], [1, 6]), junina: entreDatas(d, [6, 1], [7, 31]), inverno: entreDatas(d, [6, 21], [9, 22]) }; }
function imgArvoreNatal() {
    return pinta(28, 42, (R, C) => {
        R(12, 34, 4, 6, '#5e3d2e');
        for (let i = 0; i < 4; i++) {
            const w = 8 + i * 5, y = 4 + i * 8;
            R(14 - w / 2, y, w, 9, '#2a1d30');
            R(15 - w / 2, y + 1, w - 2, 7, i % 2 ? '#2f9a4a' : '#3fae5a');
        }
        R(13, 0, 3, 4, '#ffd36e');
        R(12, 1, 5, 2, '#ffd36e');
        R(3, 38, 8, 4, '#c8102e');
        R(6, 38, 2, 4, '#ffd36e');
        R(18, 37, 7, 5, '#5b8cff');
        R(21, 37, 1, 5, '#fff');
    });
}
function construirSazonal() {
    if (MAPA !== 'quarto')
        return;
    for (let i = OBJ.length - 1; i >= 0; i--)
        if (OBJ[i].sazonal)
            OBJ.splice(i, 1);
    for (let i = COL.length - 1; i >= 0; i--)
        if (COL[i].sazonal)
            COL.splice(i, 1);
    for (let i = PONTOS.length - 1; i >= 0; i--)
        if (PONTOS[i].sazonal)
            PONTOS.splice(i, 1);
    const E = estacoes();
    if (E.natal) {
        const img = imgArvoreNatal();
        OBJ.push({ nome: 'arvoreNatal', sazonal: true, x: 244, y: 66, img, base: 108, draw: (c, o) => {
                c.drawImage(o.img, o.x, o.y);
                const t = Math.floor(performance.now() / 400);
                [[10, 9], [16, 13], [8, 18], [18, 21], [11, 25], [6, 29], [20, 28], [14, 31]].forEach(([x, y], i) => { c.fillStyle = ['#ffd36e', '#ff5c8d', '#8fcaff', '#fff'][(i + t) % 4]; c.fillRect(o.x + x, o.y + y, 1, 1); });
            } });
        COL.push({ x: 250, y: 100, w: 16, h: 8, sazonal: true, dono: 'arvoreNatal' });
        PONTOS.push({ obj: 'arvoreNatal', sazonal: true, nome: 'Olhar a árvore de Natal', x: 256, y: 116, acao: () => { falar(FEFE, pick(['Que árvore linda!', 'Tho, NÃO sobe na árvore.', 'Natal com vocês é o melhor ♥']), 2000); particula('brilho', 256, 80, 4); const th = G('tho'); if (!S.gatos.tho.dormindo && th.estado === 'parado' && Math.random() < .5)
                setTimeout(() => { falar(th, 'eu vou escalar ela.', 1600); }, 900); } });
    }
    try {
        construirSazonal24();
    }
    catch (e) {
        console.error(e);
    }
    try {
        construirQuadros();
    }
    catch (e) {
        console.error(e);
    }
    const de = dataEspecial();
    if (de && !(S.presentes && S.presentes[chavePresente(de)])) {
        const img = pinta(14, 12, (R) => { R(0, 3, 14, 9, '#2a1d30'); R(1, 4, 12, 7, de.cores[0]); R(6, 3, 2, 9, de.cores[1] || '#fff'); R(0, 5, 14, 2, de.cores[1] || '#fff'); R(3, 0, 3, 3, de.cores[1] || '#fff'); R(8, 0, 3, 3, de.cores[1] || '#fff'); });
        OBJ.push({ nome: 'presente', sazonal: true, x: 28, y: 62, img, base: 99, draw: (c, o) => { const b = Math.floor(performance.now() / 500) % 2; c.drawImage(o.img, o.x, o.y - b); } });
        PONTOS.push({ obj: 'presente', sazonal: true, nome: 'Abrir o presente!', x: 64, y: 86, acao: abrirPresente });
    }
}
function desenharSazonal(lista) {
    if (MAPA !== 'quarto')
        return;
    const E = estacoes(), de = dataEspecial(), t = performance.now() / 1000;
    if (E.junina)
        lista.push({ b: -0.5, f: () => {
                const cores = ['#ff5c8d', '#ffd36e', '#5b8cff', '#2f9a4a', '#ff8a3d'];
                for (let fio = 0; fio < 2; fio++) {
                    const x0 = fio ? 184 : 6, x1 = fio ? 344 : 176;
                    for (let x = x0; x < x1; x += 7) {
                        const y = 3 + Math.round(Math.sin((x - x0) / (x1 - x0) * Math.PI) * 5);
                        ctx.fillStyle = '#4a3a30';
                        ctx.fillRect(x, y, 7, 1);
                        ctx.fillStyle = cores[(x / 7 + fio) % 5 | 0];
                        ctx.fillRect(x + 1, y + 1, 5, 2);
                        ctx.fillRect(x + 2, y + 3, 3, 1);
                        ctx.fillRect(x + 3, y + 4, 1, 1);
                    }
                }
            } });
    if (E.inverno)
        lista.push({ b: -0.4, f: () => {
                [[30, 10], [228, 10]].forEach(([x, y]) => { ctx.fillStyle = 'rgba(240,248,255,.55)'; ctx.fillRect(x + 1, y + 1, 5, 2); ctx.fillRect(x + 1, y + 3, 2, 3); ctx.fillRect(x + 24, y + 21, 5, 3); ctx.fillRect(x + 27, y + 18, 2, 3); });
                ctx.fillStyle = '#ff8a3d';
                ctx.fillRect(74, 32, 4, 4);
                ctx.fillStyle = '#7a4a30';
                ctx.fillRect(75, 32, 2, 1);
                const v = Math.floor(t * 2) % 3;
                ctx.fillStyle = 'rgba(255,255,255,.6)';
                ctx.fillRect(75 + (v === 1 ? 1 : 0), 29 - v, 1, 2);
            } });
    if (de)
        lista.push({ b: 9000, f: () => {
                ctx.font = 'bold 7px monospace';
                const w = ctx.measureText(de.faixa).width + 10, x = Math.round(176 - w / 2), y = 17;
                ctx.fillStyle = '#4a3a30';
                ctx.fillRect(x - 14, y - 3, 14, 1);
                ctx.fillRect(x + w, y - 3, 14, 1);
                ctx.fillStyle = '#2a1d30';
                ctx.fillRect(x - 1, y - 1, w + 2, 11);
                ctx.fillStyle = de.cores[0];
                ctx.fillRect(x, y, w, 9);
                ctx.fillStyle = de.cores[1] || '#fff';
                for (let i = x; i < x + w; i += 6)
                    ctx.fillRect(i, y + 9, 3, 2);
                ctx.fillStyle = '#fff';
                ctx.fillText(de.faixa, x + 5, y + 7);
                if (!de.mes)
                    [[14, 24], [26, 18], [330, 22], [342, 30], [112, 30], [226, 28]].forEach(([bx, by], i) => { const yy = by + Math.round(Math.sin(t * 1.6 + i) * 2); ctx.fillStyle = '#2a1d30'; ctx.fillRect(bx, yy + 8, 1, 12); ctx.fillStyle = de.cores[i % de.cores.length]; ctx.fillRect(bx - 3, yy, 7, 8); ctx.fillRect(bx - 2, yy - 1, 5, 10); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(bx - 1, yy + 1, 1, 2); });
            } });
}
function estaChovendo() { if (CHUVA_TESTE)
    return true; try {
    if (climaReal && Date.now() - climaReal.quando < 3 * 3600e3)
        return codigoChuva(climaReal.code);
}
catch (e) { } const d = new Date(); const s = d.getFullYear() * 9973 + (d.getMonth() * 31 + d.getDate()) * 131 + d.getHours() * 17; const r = Math.abs(Math.sin(s) * 10000) % 1; return r < .22; }
function desenharChuva(lista) {
    if (MAPA !== 'quarto' || !estaChovendo())
        return;
    const t = performance.now() / 1000;
    lista.push({ b: -0.2, f: () => {
            [[30, 10], [228, 10]].forEach(([wx, wy]) => {
                ctx.fillStyle = 'rgba(40,50,80,.45)';
                ctx.fillRect(wx + 1, wy + 1, 28, 24);
                ctx.fillStyle = 'rgba(190,215,255,.75)';
                for (let i = 0; i < 9; i++) {
                    const x = wx + 2 + ((i * 7 + Math.floor(t * 3)) % 26), y = wy + 2 + ((i * 11 + t * 60) % 20);
                    ctx.fillRect(Math.round(x), Math.round(y), 1, 3);
                }
                ctx.fillStyle = 'rgba(220,235,255,.8)';
                for (let i = 0; i < 4; i++) {
                    const x = wx + 4 + i * 6, y = wy + 4 + ((i * 9 + t * 6) % 18);
                    ctx.fillRect(x, Math.round(y), 1, 2);
                }
                if (Math.floor(t * 10) % 97 === 0) {
                    ctx.fillStyle = 'rgba(255,255,240,.6)';
                    ctx.fillRect(wx + 1, wy + 1, 28, 24);
                }
            });
        } });
}
function atualizarChuva(dt) {
    if (MAPA !== 'quarto' || !estaChovendo() || bloqueioTela())
        return;
    const h = new Date().getHours();
    if (chuvaAvisada !== h) {
        chuvaAvisada = h;
        setTimeout(() => falar(FEFE, pick(['Tá chovendo...', 'Que chuvinha gostosa', 'Dia de ficar debaixo da coberta']), 2000), 1500);
    }
    chuvaGatoT -= dt;
    if (chuvaGatoT > 0)
        return;
    chuvaGatoT = 16 + Math.random() * 14;
    const livres = gatos.filter(g => !S.gatos[g.id].dormindo && g.estado === 'parado' && g !== gatoPerto);
    if (!livres.length)
        return;
    const g = pick(livres), jan = Math.random() < .5 ? [45, 70] : [243, 70];
    irPara(g, jan[0] + (Math.random() * 10 - 5), jan[1], () => {
        g.estado = 'parado';
        g.timer = 7;
        g.dir = 1;
        if (g.id === 'tho') {
            g.pulandoChuva = performance.now() + 3500;
            setTimeout(() => { falar(g, pick(['PEGO!! ...não peguei.', 'gota. GOTA.', 'eu vou pegar uma!']), 1600); som.miau('tho', 1.2); }, 500);
        }
        else
            pensar(g, g.id === 'lola' ? 'chuva... colo...' : 'o som da chuva é bom', 2400);
    });
}
function abrirQuiz() {
    const qs = QUIZ.slice().sort(() => Math.random() - .5).slice(0, Math.min(6, QUIZ.length));
    let i = 0, pts = 0;
    const mostra = () => {
        if (i >= qs.length) {
            const msg = pts === qs.length ? 'PERFEITO! Você me conhece demais ♥' : pts >= qs.length - 2 ? 'Quase tudo! Tô impressionada' : 'Hmm... vamos ter que passar mais tempo juntas 😏';
            $('quizC').innerHTML = `<p style="font-size:30px;margin:6px 0"><b>${pts}/${qs.length}</b></p><p>${msg}</p><button class="btn" id="quizDeNovo" style="width:auto">Jogar de novo</button>`;
            $('quizDeNovo').onclick = abrirQuiz;
            if (pts === qs.length)
                (S.vistos || (S.vistos = {})).quiz = true;
            if (!S.feitos.quiz) {
                S.feitos.quiz = true;
                ganhar(Math.max(1, pts));
            }
            salvar();
            if (ISI.aqui)
                falar(ISI, pts === qs.length ? 'Essa é minha namorada ♥' : 'Vou fingir que não vi esse placar', 2400);
            return;
        }
        const q = qs[i], ops = q.o.map((t, k) => ({ t, k })).sort(() => Math.random() - .5);
        $('quizC').innerHTML = `<div style="font-size:12px;opacity:.6">Pergunta ${i + 1} de ${qs.length}</div><p style="font-size:17px;margin:6px 0 12px"><b>${esc(q.p)}</b></p>
      <div class="quizOps">${ops.map(o => `<button class="btn branco" data-k="${o.k}" style="margin:0">${esc(o.t)}</button>`).join('')}</div>`;
        document.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
            const ok = +b.dataset.k === q.c;
            document.querySelectorAll('[data-k]').forEach(x => { x.disabled = true; if (+x.dataset.k === q.c)
                x.style.background = '#7bd389'; });
            if (!ok)
                b.style.background = '#ff9a9a';
            ok ? som.plim() : som.pop();
            if (ok)
                pts++;
            setTimeout(() => { i++; mostra(); }, 900);
        });
    };
    abrir('Quanto você me conhece? ♥', `<div class="mg" id="quizC"></div>`, true, true);
    mostra();
}
function abrirPotinho() {
    const vistos = S.motivosVistos || (S.motivosVistos = []);
    let idx = MOTIVOS.findIndex((_, k) => !vistos.includes(k));
    if (idx < 0)
        idx = Math.floor(Math.random() * MOTIVOS.length);
    if (!vistos.includes(idx))
        vistos.push(idx);
    if (vistos.length >= MOTIVOS.length)
        (S.vistos || (S.vistos = {})).motivos = true;
    if (!S.feitos.potinho) {
        S.feitos.potinho = true;
        ganhar(1);
    }
    salvar();
    som.pop();
    abrir('🫙 Potinho de motivos', `<div class="mg"><p style="font-size:12px;opacity:.65;margin:0 0 8px">Um motivo pelo qual eu te amo:</p>
    <div class="papel px" style="font-size:17px;animation:abrePapel .5s ease-out">${esc(MOTIVOS[idx])}</div>
    <p style="font-size:12px;opacity:.6">Você já tirou ${Math.min(vistos.length, MOTIVOS.length)} de ${MOTIVOS.length} papeizinhos</p>
    <button class="btn" id="maisMotivo" style="width:auto">Tirar outro</button></div>`, false);
    $('maisMotivo').onclick = abrirPotinho;
}
function imgPote() { return pinta(12, 14, (R) => { R(2, 0, 8, 3, '#2a1d30'); R(3, 1, 6, 1, '#c98f5f'); R(0, 3, 12, 11, '#2a1d30'); R(1, 4, 10, 9, '#d8eef8'); R(2, 7, 3, 2, '#ff9ec4'); R(6, 9, 3, 2, '#ffd36e'); R(3, 10, 2, 2, '#c08cff'); R(7, 5, 2, 2, '#ff5c8d'); R(2, 4, 1, 6, '#fff'); }); }
function checarDoenca(dt) {
    doencaT -= dt;
    if (doencaT > 0)
        return;
    doencaT = 20;
    gatos.forEach(g => {
        const st = S.gatos[g.id];
        if (st.doente || st.dormindo)
            return;
        const ruim = st.fome < 8 || st.alegria < 8 || (st.fome < 18 && st.alegria < 18);
        if (ruim && Date.now() - (st.curadoEm || 0) > 6 * 3600e3) {
            st.doente = true;
            st.remedio = false;
            salvar();
            setTimeout(() => { falar(FEFE, `${GATOS[g.id].nome === 'Tho' ? 'O' : 'A'} ${GATOS[g.id].nome} tá tristinh${g.id === 'tho' ? 'o' : 'a'}... acho que tá doentinh${g.id === 'tho' ? 'o' : 'a'}`, 2800); toast(`🤒 ${GATOS[g.id].nome} ficou doente! Dê remédio e carinho.`); }, 400);
        }
    });
}
function curar(g) {
    const st = S.gatos[g.id];
    st.doente = false;
    st.remedio = false;
    st.curadoEm = Date.now();
    st.fome = lim(st.fome + 25);
    st.alegria = lim(st.alegria + 30);
    st.energia = lim(st.energia + 20);
    (S.vistos || (S.vistos = {})).curou = true;
    salvar();
    som.plim();
    renderGatoPerto('feliz');
    montarPainelPerto();
    falarPerto(g.id === 'lola' ? 'Tô melhor! Obrigada, Fefe ♥' : g.id === 'tho' ? 'EU TÔ VIVO!!! VAMOS CORRER!' : '...obrigada. De verdade.', 2800);
    toast(`💚 ${GATOS[g.id].nome} sarou!`);
    ganhar(3);
}
function desenharDoentes(lista) {
    gatos.forEach(g => {
        const st = S.gatos[g.id];
        if (!st.doente || g.estado === 'oculto' || g.estado === 'escondido')
            return;
        if (g.vel > 14)
            g.vel = 14;
        lista.push({ b: g.y + .5, f: () => { const x = Math.round(g.x) + 5, y = Math.round(g.y - (g.alt || 0)) - 22 + Math.round(Math.sin(performance.now() / 300)); ctx.fillStyle = '#2a1d30'; ctx.fillRect(x - 1, y - 1, 4, 9); ctx.fillStyle = '#fff'; ctx.fillRect(x, y, 2, 6); ctx.fillStyle = '#ff5c5c'; ctx.fillRect(x, y + 3, 2, 5); ctx.fillRect(x - 1, y + 6, 4, 2); } });
    });
}
function nivelTruque(id) { return (S.truques && S.truques[id]) || 0; }
function jogoTruque(id) {
    const T = TRUQUES[id], c = GATOS[id];
    if (id === 'clarinha' && S.confClarinha < 50) {
        falarPerto('Truque? Eu? Não.', 2200);
        return;
    }
    const base = spr(gatoPixels(c.tipo, 'feliz', false), c.cor, 'g' + id + 'feliz');
    abrir(`Ensinar: ${T.n} 🐾`, `<div class="mg"><canvas id="cvTruque" width="96" height="64" style="display:block;margin:0 auto;height:min(calc(92vh - 210px),200px);width:auto;max-width:100%;image-rendering:pixelated;background:#f4eef8"></canvas>
    <p id="truqueMsg" style="margin:6px 0">Quando ${c.nome === 'Tho' ? 'o' : 'a'} ${c.nome} fizer o truque, dá o petisco!</p><button class="btn" id="btnPetisco" style="width:auto;margin:0 auto">🍗 Petisco!</button></div>`, false);
    const cv = $('cvTruque'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const tmp = document.createElement('canvas');
    tmp.width = 14;
    tmp.height = 14;
    const tc = tmp.getContext('2d');
    tc.drawImage(base, 0, 0);
    const px = tc.getImageData(7, 10, 1, 1).data;
    const corPata = `rgb(${px[0]},${px[1]},${px[2]})`;
    let rodada = 0, acertos = 0, fase = 'espera', ate = performance.now() + 1200 + Math.random() * 1500, msg = $('truqueMsg'), coracoes = [];
    const prox = () => { rodada++; if (rodada >= 5)
        return fim(); fase = 'espera'; ate = performance.now() + 1000 + Math.random() * 1800; };
    const fim = () => {
        fase = 'fim';
        const n = nivelTruque(id);
        if (acertos >= 3) {
            (S.truques || (S.truques = {}))[id] = Math.min(3, n + 1);
            const nv = S.truques[id];
            msg.innerHTML = nv >= 3 ? `<b>${c.nome} aprendeu a ${T.n.toLowerCase()}! 🎉</b>` : `<b>${acertos}/5!</b> Tá aprendendo... (${nv}/3 treinos)`;
            som.plim();
            if (nv >= 3)
                (S.vistos || (S.vistos = {})).truque = true;
        }
        else
            msg.innerHTML = `<b>${acertos}/5.</b> ${id === 'tho' ? 'Ele se distraiu com uma mosca.' : 'Vamos tentar de novo?'}`;
        if (!S.feitos['truque_' + id]) {
            S.feitos['truque_' + id] = true;
            ganhar(2);
        }
        salvar();
        $('btnPetisco').textContent = 'Treinar de novo';
        $('btnPetisco').onclick = () => jogoTruque(id);
    };
    $('btnPetisco').onclick = () => {
        if (fase === 'fim')
            return;
        audio();
        if (fase === 'acao') {
            acertos++;
            som.plim();
            coracoes.push({ x: 60, y: 16, t: 0 });
            msg.textContent = pick(['Isso!! Muito bem!', 'Bom gatinho!', 'Perfeito!']);
            fase = 'premio';
            ate = performance.now() + 700;
        }
        else {
            som.pop();
            msg.textContent = pick(['Calma, ainda não!', 'Eita, cedo demais', 'Espera o truque!']);
            fase = 'confuso';
            ate = performance.now() + 800;
        }
    };
    const lp = () => {
        if (!$('cvTruque'))
            return;
        const agora = performance.now(), t = agora / 1000;
        if (fase === 'espera' && agora > ate) {
            fase = 'acao';
            ate = agora + T.janela * 1000;
            msg.textContent = `Fefe: "${T.cmd}"`;
            som.miau(id, 1.05);
        }
        else if (fase === 'acao' && agora > ate) {
            msg.textContent = pick(['Perdeu o momento!', 'Ops, demorou!']);
            fase = 'confuso';
            ate = agora + 700;
        }
        else if ((fase === 'premio' || fase === 'confuso') && agora > ate)
            prox();
        x.fillStyle = '#f4eef8';
        x.fillRect(0, 0, 96, 64);
        x.fillStyle = '#e6d6ee';
        x.fillRect(0, 50, 96, 14);
        const S4 = 3;
        let cx = 27, cy = 8;
        x.save();
        if (fase === 'acao' && id === 'tho') {
            x.translate(48, 29);
            x.rotate(Math.sin(t * 14) * Math.PI);
            x.drawImage(base, -21, -21, 42, 42);
        }
        else if (fase === 'acao' && id === 'clarinha') {
            x.drawImage(base, cx, cy + 6, 42, 36);
        }
        else {
            x.drawImage(base, cx, cy + (fase === 'confuso' ? Math.round(Math.sin(t * 20)) : 0), 42, 42);
            if (fase === 'acao' && id === 'lola') {
                x.fillStyle = '#2a1d30';
                x.fillRect(cx + 29, cy + 19, 8, 9);
                x.fillStyle = corPata;
                x.fillRect(cx + 30, cy + 20, 6, 7);
                x.fillStyle = '#ff9ec4';
                x.fillRect(cx + 31, cy + 21, 2, 2);
                x.fillRect(cx + 34, cy + 21, 1, 2);
            }
        }
        x.restore();
        if (fase === 'confuso') {
            x.fillStyle = '#2a1d30';
            x.font = 'bold 10px monospace';
            x.fillText('?', 70, 14);
        }
        for (let r = 0; r < 5; r++) {
            x.fillStyle = r < acertos ? '#ff5c8d' : r < rodada ? '#c9b8d0' : '#fff';
            x.fillRect(30 + r * 8, 56, 6, 5);
        }
        coracoes.forEach(h => { h.t += 1 / 60; coracaoPx(x, '#ff5c8d', h.x + Math.sin(h.t * 6) * 3, h.y - h.t * 18, 2); });
        coracoes = coracoes.filter(h => h.t < 1);
        requestAnimationFrame(lp);
    };
    requestAnimationFrame(lp);
}
function horta() { return S.horta || (S.horta = { dias: [], ultima: '' }); }
function estadoHorta() {
    const h = horta(), est = Math.min(4, h.dias.length);
    let murcha = false;
    if (h.ultima && est > 0) {
        const [a, m, d] = h.ultima.split('-').map(Number);
        murcha = (Date.now() - new Date(a, m - 1, d).getTime()) / 864e5 >= 3.2;
    }
    return { est, murcha };
}
function regarHorta() {
    const h = horta(), hoje = diaKey(new Date());
    particula('agua', 142, 198, 8);
    som.agua();
    if (h.ultima === hoje)
        return falar(FEFE, 'Já reguei a hortinha hoje!', 1600);
    if (!h.dias.includes(hoje))
        h.dias.push(hoje);
    h.ultima = hoje;
    if (h.dias.length > 10)
        h.dias = h.dias.slice(-10);
    const { est } = estadoHorta();
    if (est >= 4)
        (S.vistos || (S.vistos = {})).florida = true;
    ganhar(1);
    salvar();
    falar(FEFE, ['Plantei umas sementinhas!', 'Brotou!! Olha que fofinho', 'Tá crescendo!', 'Tá quase florindo...', 'FLORIU! ♥'][est], 2000);
}
function imgVasos() { return pinta(36, 12, (R) => { for (let i = 0; i < 3; i++) {
    const x = i * 12;
    R(x + 1, 2, 10, 10, '#2a1d30');
    R(x + 2, 3, 8, 8, '#c86a3a');
    R(x + 2, 3, 8, 2, '#e08a5a');
    R(x + 3, 3, 6, 1, '#5a3a2a');
} }); }
function desenharHorta(c, o) {
    c.drawImage(o.img, o.x, o.y);
    const { est, murcha } = estadoHorta(), cores = ['#ff7aa8', '#ffd36e', '#c08cff'], verde = murcha ? '#9a8a4a' : '#4f9a3a', verde2 = murcha ? '#7a6a3a' : '#2f7a2a', t = performance.now() / 1000;
    for (let i = 0; i < 3; i++) {
        const x = o.x + i * 12 + 6, y = o.y + 3, b = murcha ? 0 : Math.round(Math.sin(t * 1.5 + i) * .6);
        if (est === 0) {
            c.fillStyle = '#5a3a2a';
            c.fillRect(x - 2, y, 1, 1);
            c.fillRect(x + 1, y, 1, 1);
            continue;
        }
        const alt = [0, 3, 6, 9, 10][est];
        c.fillStyle = verde2;
        c.fillRect(x, y - alt + b, 1, alt);
        if (est >= 1) {
            c.fillStyle = verde;
            c.fillRect(x - 2, y - 2, 2, 1);
            c.fillRect(x + 1, y - 2, 2, 1);
        }
        if (est >= 2) {
            c.fillRect(x - 3, y - 5 + b, 3, 2);
            c.fillRect(x + 1, y - 6 + b, 3, 2);
        }
        if (est >= 3) {
            c.fillRect(x - 3, y - 8 + b, 2, 2);
            c.fillRect(x + 2, y - 8 + b, 2, 2);
        }
        if (est >= 3 && !murcha) {
            c.fillStyle = est >= 4 ? cores[i] : '#a8d8a0';
            c.fillRect(x - 1, y - alt - 2 + b, 3, 3);
            if (est >= 4) {
                c.fillStyle = '#fff6a0';
                c.fillRect(x, y - alt - 1 + b, 1, 1);
            }
        }
    }
}
function piquenique() {
    if (MAPA !== 'parque' || piq)
        return;
    const X = 150, Y = 134;
    const toalha = pinta(60, 36, (R) => {
        R(0, 0, 60, 36, '#2a1d30');
        for (let y = 1; y < 35; y += 5)
            for (let x = 1; x < 59; x += 5)
                R(x, y, 5, 5, ((x + y) / 5) % 2 < 1 ? '#ff5c6a' : '#fff4f0');
        R(40, 4, 14, 10, '#2a1d30');
        R(41, 5, 12, 8, '#c98f5f');
        R(42, 5, 10, 2, '#e0b07f');
        R(44, 1, 6, 4, '#2a1d30');
        R(45, 2, 4, 2, '#c98f5f');
        R(8, 24, 8, 5, '#2a1d30');
        R(9, 25, 6, 3, '#f0d090');
        R(9, 26, 6, 1, '#7bd389');
        R(22, 26, 3, 3, '#e8243a');
        R(26, 27, 3, 3, '#e8243a');
        R(24, 24, 1, 1, '#2f9a4a');
        R(48, 22, 5, 8, '#2a1d30');
        R(49, 23, 3, 6, '#ffb36b');
    });
    const o = { nome: 'toalha', piq: true, x: X, y: Y, img: toalha, base: Y + 2 };
    OBJ.push(o);
    const visit = [['lola', X + 46, Y + 30, 'feliz'], ['clarinha', X + 4, Y + 33, 'feliz']];
    visit.forEach(([id, x, y, h]) => OBJ.push({ nome: 'piq_' + id, piq: true, x: x - 7, y: y - 14, img: spr(gatoPixels(GATOS[id].tipo, h, false), GATOS[id].cor, 'g' + id + h), base: y, draw: (c, ob) => { gatoPequeno(c, id, h, ob.x, ob.y + (Math.floor(performance.now() / 600) % 2)); } }));
    OBJ.push({ nome: 'piq_tho', piq: true, x: 0, y: 0, img: { width: 1, height: 1 }, base: 0, draw: (c, ob) => {
            const t = performance.now() / 1000, bx = X + 30 + Math.cos(t * 1.3) * 40, by = Y + 10 + Math.sin(t * 2.6) * 16, tx = bx - Math.cos(t * 1.3) * 10, ty = by + 12;
            ob.base = ty;
            gatoPequeno(c, 'tho', 'feliz', Math.round(tx - 7), Math.round(ty - 14 - Math.abs(Math.sin(t * 5)) * 3));
            c.fillStyle = Math.floor(t * 8) % 2 ? '#ffd36e' : '#fff';
            c.fillRect(Math.round(bx), Math.round(by - 14), 2, 1);
            c.fillRect(Math.round(bx) + 3, Math.round(by - 14), 2, 1);
            c.fillStyle = '#2a1d30';
            c.fillRect(Math.round(bx) + 2, Math.round(by - 14), 1, 2);
        } });
    piq = true;
    sentarJuntas({ f: ['sentada', X + 14, Y - 6, Y + 20, X + 20, Y + 44], i: ['sentada', X + 30, Y - 6, Y + 20.1, X + 40, Y + 44] });
    const falas = ISI.aqui ? [['isi', 'Trouxe tudo: sanduíche, morango e suquinho ♥'], ['fefe', 'E os gatos de mochila, né'], ['isi', 'O Tho tá correndo atrás de uma borboleta KKKK'], ['fefe', 'A Lola só quer saber do sanduíche'], ['isi', 'Isso aqui é perfeito. Você, eles, esse sol...']]
        : [['fefe', 'Piquenique com meus bebês ♥'], ['fefe', 'Tho, deixa a borboleta em paz!'], ['fefe', 'Lola, isso é MEU sanduíche']];
    roteiro(falas, () => { particula('coracao', X + 30, Y - 10, 5); som.miau('lola'); if (!S.feitos.piquenique) {
        S.feitos.piquenique = true;
        ganhar(3);
        salvar();
    } }, 'parque');
}
function limparPiq() { if (!piq)
    return; const C = CENAS.parque; if (C)
    for (let i = C.OBJ.length - 1; i >= 0; i--)
        if (C.OBJ[i].piq)
            C.OBJ.splice(i, 1); piq = null; }
function moverObjeto(o, dx, dy) {
    o.x += dx;
    o.y += dy;
    o.base += dy;
    COL.forEach(c => { if (c.dono === o.nome) {
        c.x += dx;
        c.y += dy;
    } });
    PONTOS.forEach(p => { if (p.obj === o.nome) {
        p.x += dx;
        p.y += dy;
        if (p.zona)
            p.zona = [p.zona[0] + dx, p.zona[1] + dy, p.zona[2], p.zona[3]];
    } });
}
function aplicarPosicoes() {
    if (MAPA !== 'quarto' || !S.pos)
        return;
    OBJ.forEach(o => { const p = S.pos[o.nome]; if (p && !o.posAplicada) {
        moverObjeto(o, p.dx, p.dy);
        o.posAplicada = true;
    } });
}
function modoMontar() {
    if (MAPA !== 'quarto')
        return toast('Só dá pra mover os móveis no quarto');
    montando = true;
    selMovel = null;
    FEFE.alvo = null;
    const bar = document.createElement('div');
    bar.id = 'montarBar';
    bar.innerHTML = `<span id="montarTxt">Toque num móvel com contorno pra mover</span><button class="btn branco" id="montarReset" style="width:auto;margin:0;padding:5px 10px;font-size:13px">Original</button><button class="btn" id="montarOk" style="width:auto;margin:0;padding:5px 14px;font-size:14px">Pronto</button>`;
    document.body.appendChild(bar);
    bar.onpointerdown = e => e.stopPropagation();
    $('montarOk').onclick = () => { montando = false; selMovel = null; bar.remove(); salvar(); toast('Quarto arrumado! ✨'); falar(FEFE, 'Ficou lindo!', 1600); };
    $('montarReset').onclick = () => { if (!S.pos)
        return; OBJ.forEach(o => { const p = S.pos[o.nome]; if (p) {
        moverObjeto(o, -p.dx, -p.dy);
    } }); S.pos = {}; selMovel = null; salvar(); toast('Tudo de volta pro lugar'); };
}
function tocarMontar(wx, wy) {
    const sob = OBJ.filter(o => MOVEIS_MOVEIS.includes(o.nome) && wx >= o.x && wx < o.x + o.img.width && wy >= o.y && wy < o.y + o.img.height).sort((a, b) => b.base - a.base)[0];
    if (sob) {
        selMovel = sob;
        som.pop();
        $('montarTxt').textContent = 'Agora toque no lugar novo';
        return;
    }
    if (!selMovel)
        return;
    const o = selMovel, nx = Math.round(wx - o.img.width / 2), ny = Math.round(wy - o.img.height + 4), dx = nx - o.x, dy = ny - o.y;
    const meus = COL.filter(c => c.dono === o.nome), pegadas = (meus.length ? meus : [{ x: o.x, y: o.base - 8, w: o.img.width, h: 8 }]).map(c => ({ x: c.x + dx, y: c.y + dy, w: c.w, h: c.h }));
    const M = MUNDO, porta = { x: 156, y: 214, w: 44, h: 30 };
    const bate = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    const ok = nx >= M.x0 - 4 && nx + o.img.width <= M.x1 + 4 && pegadas.every(p => p.y >= M.y0 - 2 && p.y + p.h <= M.y1 + 2 && !bate(p, porta) && !COL.some(c => c.dono !== o.nome && !meus.includes(c) && bate(p, c)));
    if (!ok) {
        som.pop();
        $('montarTxt').textContent = 'Não cabe aí! Tenta outro lugar';
        return;
    }
    moverObjeto(o, dx, dy);
    const p = (S.pos || (S.pos = {}))[o.nome] || { dx: 0, dy: 0 };
    S.pos[o.nome] = { dx: p.dx + dx, dy: p.dy + dy };
    particula('poeira', o.x + o.img.width / 2, o.base - 2, 4);
    som.plim();
    selMovel = null;
    $('montarTxt').textContent = 'Mudou! Toque em outro móvel ou em Pronto';
}
function desenharMontar(lista) {
    if (!montando || MAPA !== 'quarto')
        return;
    lista.push({ b: 99999, f: () => {
            const t = Math.floor(performance.now() / 300) % 2;
            OBJ.forEach(o => { if (!MOVEIS_MOVEIS.includes(o.nome))
                return; const s = o === selMovel; ctx.strokeStyle = s ? (t ? '#ff5c8d' : '#fff') : 'rgba(255,255,255,.7)'; ctx.lineWidth = s ? 1.5 : 1; ctx.setLineDash(s ? [] : [2, 2]); ctx.strokeRect(o.x - 1.5, o.y - 1.5, o.img.width + 3, o.img.height + 3); });
            ctx.setLineDash([]);
        } });
}
function atualizarExtras13(dt) {
    checarDoenca(dt);
    atualizarChuva(dt);
    if (MAPA !== 'parque' && piq)
        limparPiq();
    const th = G('tho');
    if (th && th.pulandoChuva) {
        if (performance.now() < th.pulandoChuva)
            th.alt = Math.abs(Math.sin(performance.now() / 90)) * 6;
        else {
            th.pulandoChuva = 0;
            th.alt = 0;
        }
    }
    if (MAPA === 'quarto' && !document.getElementById('inicio') && !bloqueioTela()) {
        const de = dataEspecial(), k = diaKey(agoraJogo());
        if (de && saudouData !== k) {
            saudouData = k;
            setTimeout(() => { falar(FEFE, de.fala, 2600); if (ISI.aqui)
                setTimeout(() => falar(ISI, 'Surpresaaa ♥', 2000), 1600); if (!de.mes)
                for (let i = 0; i < 6; i++)
                    setTimeout(() => particula(pick(['confete1', 'confete2', 'confete3']), 60 + Math.random() * 240, 40, 3), i * 250); }, 1200);
        }
    }
}
function extrasDesenho13(lista) { desenharSazonal(lista); desenharChuva(lista); desenharDoentes(lista); desenharMontar(lista); }
