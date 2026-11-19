function abrirEncontro(k) {
    const e = ENCONTROS[k];
    abrir(e.titulo, `<div class="encontro"><canvas id="cvEnc" width="96" height="60"></canvas><p>${esc(e.texto())}</p></div><button class="btn" data-fechar>Voltar</button>`, false, true);
    let n = 0;
    const pinte = () => { const cv = $('cvEnc'); if (!cv) {
        clearInterval(encTimer);
        return;
    } const x = cv.getContext('2d'); x.imageSmoothingEnabled = false; desenharEncontro(x, k, n++); };
    pinte();
    clearInterval(encTimer);
    encTimer = setInterval(pinte, 280);
    if (!S.feitos['enc_' + k]) {
        S.feitos['enc_' + k] = true;
        setTimeout(() => ganhar(3), 600);
        salvar();
    }
}
function desenharEncontro(x, k, n) {
    const R = (a, b, w, h, c) => { x.fillStyle = c; x.fillRect(a, b, w, h); };
    const pal = paletaFefe();
    const fc = fefeGrades.up[0], ff = fefeGrades.down[0];
    const fefeCostas = spr(fc.slice(0, 20), pal, 'encFc' + S.roupa), fefeFrente = spr(ff.slice(0, 18), pal, 'encFf' + S.roupa);
    const isiCostas = isiSpr.sentadaCostas;
    if (k === 'cinema') {
        R(0, 0, 96, 60, '#0e0b14');
        R(10, 3, 76, 28, '#2a2235');
        const cores = ['#cfe3ff', '#ffd1e3', '#d6f5d6', '#fff1c2'];
        R(11, 4, 74, 26, cores[Math.floor(n / 8) % 4]);
        R(20, 10, 12, 10, '#8fcaff');
        R(50, 14, 18, 8, '#ff9fbf');
        R(70, 8, 8, 14, '#7bd389');
        for (let i = 0; i < 5; i++)
            R(0, 40 + i * 5, 96, 3, '#5a2232');
        x.drawImage(fefeCostas, 34, 32);
        x.drawImage(isiCostas, 48, 32);
        R(30, 46, 6, 6, '#fff');
        R(30, 46, 2, 6, '#d63e4f');
        R(34, 46, 2, 6, '#d63e4f');
        R(30, 44, 6, 2, '#ffe79a');
        for (let i = 0; i < 5; i++)
            R(0, 50 + i * 2, 96, 1, 'rgba(0,0,0,.2)');
    }
    if (k === 'estrelas') {
        for (let y = 0; y < 46; y++)
            R(0, y, 96, 1, y < 20 ? '#0b0a2a' : '#1d1a48');
        for (let i = 0; i < 40; i++) {
            const sx = (i * 37) % 96, sy = (i * 23) % 42;
            if ((i + n) % 7)
                R(sx, sy, 1, 1, '#fff');
        }
        R(78, 6, 6, 6, '#fff4c2');
        R(80, 6, 4, 4, '#0b0a2a');
        const c = (n * 3) % 140;
        if (c < 40)
            R(10 + c, 4 + c / 4, 3, 1, '#fff');
        R(0, 42, 96, 18, '#2f5a3a');
        for (let i = 0; i < 24; i++)
            R((i * 13) % 96, 42 + (i * 5) % 16, 1, 2, '#3f7a48');
        x.drawImage(fefeCostas, 34, 26);
        x.drawImage(isiCostas, 48, 26);
        if (n % 10 < 5)
            x.drawImage(spr(...PART.coracao, 'pc'), 46, 20);
    }
    if (k === 'show') {
        R(0, 0, 96, 60, '#140f1a');
        R(0, 22, 96, 8, '#2a2235');
        const cs = ['#ff7aa8', '#8fcaff', '#ffd36e', '#7bd389', '#c08cff'];
        for (let i = 0; i < 5; i++) {
            x.fillStyle = cs[(i + n) % 5];
            x.globalAlpha = .35;
            x.beginPath();
            x.moveTo(10 + i * 19, 0);
            x.lineTo(i * 19, 26);
            x.lineTo(20 + i * 19, 26);
            x.fill();
        }
        x.globalAlpha = 1;
        [[30, 12], [46, 10], [62, 12]].forEach(([a, b], i) => { R(a, b + (n + i) % 2, 4, 4, '#0a080d'); R(a - 1, b + 4 + (n + i) % 2, 6, 8, '#0a080d'); });
        for (let i = 0; i < 14; i++) {
            const hx = i * 7, hy = 40 + ((i + n) % 3);
            R(hx, hy, 5, 5, '#0a080d');
            R(hx - 1, hy + 5, 7, 15, '#0a080d');
        }
        x.drawImage(fefeCostas, 34, 38);
        x.drawImage(isiCostas, 48, 38);
        if (n % 4 < 2) {
            R(37, 34, 2, 4, pal.S || '#e2ab84');
            R(55, 34, 2, 4, '#f1c7a8');
        }
    }
    if (k === 'cafe') {
        R(0, 0, 96, 60, '#e8d6b8');
        for (let xx = 0; xx < 96; xx += 8)
            R(xx, 0, 4, 34, '#e0caa6');
        R(64, 6, 26, 20, '#2a1d30');
        R(65, 7, 24, 18, corCeu(new Date().getHours())[0]);
        R(76, 7, 2, 18, '#2a1d30');
        R(4, 8, 14, 10, '#2a1d30');
        R(5, 9, 12, 8, '#7bd389');
        x.drawImage(fefeFrente, 24, 22);
        x.drawImage(spr(framesIsinha().down[0].slice(0, 18), ISI_COR, 'encIf'), 54, 22);
        R(10, 38, 76, 4, '#2a1d30');
        R(10, 38, 76, 3, '#a8714a');
        R(14, 42, 68, 18, '#7a4f3a');
        R(36, 33, 6, 5, '#fff');
        R(42, 34, 2, 2, '#fff');
        R(54, 33, 6, 5, '#fff');
        R(60, 34, 2, 2, '#fff');
        R(37, 33, 4, 1, '#7a4a2a');
        R(55, 33, 4, 1, '#7a4a2a');
        if (n % 6 < 3) {
            R(38, 30 - (n % 3), 1, 2, '#fff');
            R(56, 29 - (n % 3), 1, 2, '#fff');
        }
        R(46, 35, 4, 3, '#ff9fbf');
    }
}
function liberadas() { return Math.min(CARTINHAS.length, diasEntre(new Date(S.inicio), new Date()) + 1); }
function cartasNovas() { let n = 0; for (let i = 0; i < liberadas(); i++)
    if (!S.lidas.includes(i))
        n++; return n; }
function rostoGato(id) { const c = document.createElement('canvas'); c.width = 14; c.height = 19; gatoPequeno(c.getContext('2d'), id, 'feliz', 0, 5); return c; }
function listaCartas() {
    const lib = liberadas();
    abrir('Caixinha de cartas', `<div class="lista">${CARTINHAS.map((c, i) => i >= lib
        ? `<div class="item px trancada">🔒 Libera em ${i - lib + 1} dia(s)</div>`
        : `<button class="item px" data-i="${i}"><span class="rg" data-g="${c.gato}"></span><span><b>${esc(c.titulo)}</b><br><small>entregue por ${GATOS[c.gato].nome}</small></span>${S.lidas.includes(i) ? '' : '<span class="nova">nova</span>'}</button>`).join('')}</div>`);
    document.querySelectorAll('.rg').forEach(el => el.appendChild(rostoGato(el.dataset.g)));
    document.querySelectorAll('[data-i]').forEach(b => b.onclick = () => lerCarta(+b.dataset.i));
}
function lerCarta(i) {
    const c = CARTINHAS[i];
    if (!S.lidas.includes(i)) {
        S.lidas.push(i);
        ganhar(2);
        salvar();
    }
    abrir(esc(c.titulo), `<div class="entregue"><span class="rg" data-g="${c.gato}"></span>${GATOS[c.gato].nome} trouxe isso pra você:</div><div class="papel px">${esc(c.texto)}<span class="ass">${esc(ASSINATURA)}</span></div><button class="btn" id="voltar">Voltar</button>`, false);
    document.querySelectorAll('.rg').forEach(el => el.appendChild(rostoGato(el.dataset.g)));
    $('voltar').onclick = listaCartas;
}
