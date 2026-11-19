function previewFefe(roupa, fone) { return spr(gradesFefe(roupa, fone).down[0], paletaFefe(roupa)); }
function abrirArmario() {
    som.roupa();
    abrir('Guarda-roupa da Fefe', `<div class="grade" style="grid-template-columns:repeat(auto-fill,minmax(96px,1fr))">${ROUPAS.map((r, i) => `<button class="px ${S.roupa === i ? 'sel' : ''}" data-r="${i}" ${roupaLiberada(i) ? '' : 'disabled'}><span class="pv" data-r="${i}"></span>${r.n}${roupaLiberada(i) ? '' : `<small>🔒 ${ROUPAS[i].loja === 'roupa_show' ? 'compre num show' : 'na lojinha'}</small>`}</button>`).join('')}</div>
    <button class="btn ${S.fone ? '' : 'branco'}" id="btnFone">${S.fone ? 'Tirar o fone de ouvido' : 'Colocar fone de ouvido'}</button>`);
    document.querySelectorAll('.pv').forEach(el => { const c = previewFefe(+el.dataset.r, S.fone); c.className = 'roupaPrev'; el.appendChild(c); });
    document.querySelectorAll('[data-r]').forEach(b => { if (b.tagName === 'BUTTON')
        b.onclick = () => { S.roupa = +b.dataset.r; salvar(); montarFefe(); fechar(); som.roupa(); FEFE.dir = 'down'; particula('brilho', FEFE.x, FEFE.y - 24, 5); falar(FEFE, pick(['Ficou ótimo!', 'Gostei desse!', 'Pronta!', 'Look do dia ✨'])); }; });
    $('btnFone').onclick = () => { S.fone = !S.fone; salvar(); montarFefe(); som.pop(); abrirArmario(); };
}
function frenteComPose(p, olhoFechado) {
    const g = gradesFefe().down[0].map(r => [...r]);
    const P = (x, y, c) => { if (g[y] && g[y][x] !== undefined)
        g[y][x] = c; };
    if (olhoFechado || p === 'feliz' || p === 'beijo') {
        P(5, 7, 'S');
        P(10, 7, 'S');
    }
    if (p === 'pisca') {
        P(10, 7, 'S');
        P(9, 8, 'E');
        P(6, 10, 'L');
        P(9, 10, 'L');
    }
    if (p === 'feliz') {
        P(6, 10, 'L');
        P(9, 10, 'L');
        P(7, 11, 'L');
        P(8, 11, 'L');
        P(7, 10, 'W');
        P(8, 10, 'W');
    }
    if (p === 'beijo') {
        P(7, 10, 'L');
        P(8, 10, 'L');
        P(7, 11, 'L');
    }
    if (p === 'selfie') {
        for (let y = 5; y <= 12; y++)
            for (let x = 9; x <= 12; x++)
                P(x, y, (x === 9 || x === 12 || y === 5 || y === 12) ? 'Q' : 'q');
        P(10, 6, 'k');
        P(11, 6, 'k');
        P(10, 7, 'k');
        P(11, 9, 'z');
        P(10, 10, 'z');
        [[8, 9], [8, 10], [8, 11], [9, 12], [10, 12], [11, 12]].forEach(([x, y]) => P(x, y, 'S'));
    }
    return g.map(r => r.join(''));
}
function gatosPertoDoEspelho() { return gatos.filter(g => Math.hypot(g.x - 288, g.y - 64) < 70 && g !== gatoPerto); }
function cenaEspelho(p, olhoFechado) {
    const W = 48, H = 40;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const x = c.getContext('2d');
    const R = (a, b, w, h, cor) => { x.fillStyle = cor; x.fillRect(a, b, w, h); };
    R(0, 0, W, H, '#5d4470');
    for (let yy = 3; yy < 26; yy += 6)
        for (let xx = ((yy / 6) % 2) * 4 + 2; xx < W; xx += 8)
            R(xx, yy, 1, 1, '#8a6d9e');
    R(0, 26, W, 1, '#c9b8d6');
    R(0, 27, W, 1, '#2a1d30');
    R(0, 28, W, 12, '#c98f5f');
    for (let yy = 28; yy < H; yy += 4)
        R(0, yy + 3, W, 1, '#a8714a');
    R(2, 4, 10, 14, '#2a1d30');
    R(3, 5, 8, 12, '#efe6f5');
    const [c1] = corCeu(new Date().getHours());
    R(4, 6, 6, 10, c1);
    R(6, 6, 2, 10, '#efe6f5');
    R(38, 8, 8, 10, '#1f1a2e');
    R(40, 11, 3, 3, '#ffb52e');
    const pal = paletaFefe();
    pal.Q = '#0e0d12';
    pal.q = '#3d3b4c';
    pal.k = '#9aa0b8';
    pal.z = '#ff7aa8';
    const dupla = ISI.aqui && MAPA === 'quarto';
    x.drawImage(spr(frenteComPose(p, olhoFechado), pal), dupla ? 9 : 16, 12);
    if (dupla)
        x.drawImage(isiSpr[olhoFechado ? 'piscando' : (p === 'feliz' || p === 'beijo' ? 'feliz' : 'frente')], 24, 12);
    const gs = gatosPertoDoEspelho().slice(0, 2);
    gs.forEach((g, i) => { const cg = GATOS[g.id], st = S.gatos[g.id]; const h = humor(st) === 'triste' ? 'normal' : humor(st); gatoPequeno(x, g.id, h, i === 0 ? 2 : 33, 25); });
    if (p === 'beijo') {
        x.drawImage(spr(...PART.coracao, 'pc'), 27, 12);
    }
    if (p === 'feliz') {
        x.drawImage(spr(...PART.brilho, 'pb'), 30, 9);
        x.drawImage(spr(...PART.brilho, 'pb'), 12, 14);
    }
    x.fillStyle = 'rgba(255,255,255,.18)';
    for (let i = 0; i < 8; i++)
        x.fillRect(36 - i, 2 + i * 2, 2, 2);
    return c;
}
function abrirEspelho() {
    FEFE.dir = 'up';
    abrir('Espelho', `<div class="espelhoBox"><div class="moldura"><canvas id="cvEsp" width="48" height="40"></canvas></div>
     <div class="poses"><b>Pose</b><div class="grade">${POSES.map(p => `<button class="px ${pose === p.id ? 'sel' : ''}" data-pose="${p.id}">${p.n}</button>`).join('')}</div>
     <button class="btn" id="btnFoto" style="display:flex;gap:8px;justify-content:center;align-items:center">${iconeSVG('camera', 16)} Tirar foto</button>
     <button class="btn branco" id="btnAlbum" style="margin-top:6px">Álbum (${S.album.length})</button>
     <div style="font-size:12px;opacity:.65">chame os gatos pra perto do espelho pra eles saírem na foto</div></div></div>`, false, true);
    const desenhaEsp = (fechado) => { const cv = document.getElementById('cvEsp'); if (!cv)
        return; const c2 = cv.getContext('2d'); c2.imageSmoothingEnabled = false; c2.clearRect(0, 0, 48, 40); c2.drawImage(cenaEspelho(pose, fechado), 0, 0); };
    desenhaEsp(false);
    clearInterval(espelhoTimer);
    let n = 0;
    espelhoTimer = setInterval(() => { if (!document.getElementById('cvEsp')) {
        clearInterval(espelhoTimer);
        return;
    } n++; desenhaEsp(n % 30 === 0); }, 120);
    document.querySelectorAll('[data-pose]').forEach(b => b.onclick = () => { pose = b.dataset.pose; som.pop(); document.querySelectorAll('[data-pose]').forEach(x => x.classList.toggle('sel', x === b)); desenhaEsp(false); });
    $('btnFoto').onclick = tirarFoto;
    $('btnAlbum').onclick = verAlbum;
}
function ampliar(dataUrl, cb) {
    const img = new Image();
    img.onload = () => { const c = document.createElement('canvas'); c.width = img.width * 10; c.height = img.height * 10; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(img, 0, 0, c.width, c.height); cb(c.toDataURL('image/png')); };
    img.src = dataUrl;
}
function tirarFoto() {
    som.foto();
    const f = $('flash');
    f.style.opacity = 1;
    setTimeout(() => f.style.opacity = 0, 160);
    const c = cenaEspelho(pose, false);
    const url = c.toDataURL('image/png');
    const d = new Date(), data = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    S.album.push({ img: url, data });
    if (S.album.length > 24)
        S.album.shift();
    if (!S.feitos.selfie) {
        S.feitos.selfie = true;
        ganhar(1);
    }
    salvar();
    verFoto(S.album.length - 1, true);
}
function verFoto(i, nova, origem) {
    const f = S.album[i];
    if (!f)
        return;
    ampliar(f.img, url => {
        abrir(nova ? 'Foto tirada! ✨' : 'Foto', `<div style="text-align:center"><div class="polaroid"><img src="${url}" alt="foto no espelho"><span>${f.data}</span></div>
      <p style="font-size:13px;opacity:.7">segure o dedo na foto pra salvar no celular</p></div>
      <div style="display:flex;gap:10px"><button class="btn branco" id="vfVoltar">${origem === 'juntas' ? 'Fechar' : nova ? 'Voltar pro espelho' : 'Voltar pro álbum'}</button>${nova ? '' : '<button class="btn branco" id="vfApagar">Apagar</button>'}</div>`, false, true);
        $('vfVoltar').onclick = origem === 'juntas' ? fechar : nova ? abrirEspelho : verAlbum;
        if (!nova)
            $('vfApagar').onclick = () => { S.album.splice(i, 1); salvar(); verAlbum(); };
    });
}
function verAlbum() {
    if (!S.album.length)
        return abrir('Álbum', `<p>Nenhuma foto ainda. Faz uma pose no espelho!</p><button class="btn branco" id="alVoltar">Voltar pro espelho</button>`, false), $('alVoltar').onclick = abrirEspelho;
    abrir('Álbum', `<div class="album">${S.album.map((f, i) => `<button data-f="${i}"><img src="${f.img}"><div style="font-size:12px;margin-top:4px">${f.data}</div></button>`).join('')}</div><button class="btn branco" id="alVoltar">Voltar pro espelho</button>`, false, true);
    document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => verFoto(+b.dataset.f, false));
    $('alVoltar').onclick = abrirEspelho;
}
