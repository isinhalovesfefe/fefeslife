function imagensDecor() {
    IMG_DECOR.aquario = pinta(28, 38, (R, C) => {
        R(2, 24, 24, 14, COR.contorno);
        R(3, 24, 22, 13, COR.madeira);
        R(3, 24, 22, 3, COR.madeiraC);
        R(5, 30, 18, 1, COR.madeira2);
        R(0, 2, 28, 23, COR.contorno);
        R(1, 3, 26, 21, '#9fd8f5');
        R(1, 3, 26, 4, '#c8ecff');
        R(1, 20, 26, 4, '#e8d6a8');
        R(4, 21, 2, 1, '#c9b27c');
        R(16, 22, 3, 1, '#c9b27c');
        R(5, 12, 1, 8, '#5fae6a');
        R(6, 14, 1, 6, '#4f9a5a');
        R(21, 10, 1, 10, '#5fae6a');
        R(22, 13, 1, 7, '#4f9a5a');
        R(13, 19, 4, 2, '#8f8574');
        R(0, 0, 28, 3, COR.contorno);
        R(1, 1, 26, 1, '#5d7398');
    });
    IMG_DECOR.caixa = pinta(24, 20, (R) => {
        R(0, 4, 24, 16, COR.contorno);
        R(1, 5, 22, 14, '#c9925a');
        R(1, 5, 22, 3, '#2a1d30');
        R(2, 6, 20, 1, '#4a3020');
        R(0, 0, 8, 6, COR.contorno);
        R(1, 1, 6, 4, '#d9a46a');
        R(16, 0, 8, 6, COR.contorno);
        R(17, 1, 6, 4, '#d9a46a');
        R(4, 12, 16, 1, '#b07a45');
        R(10, 9, 4, 1, '#b07a45');
    });
    IMG_DECOR.luminaria = pinta(14, 34, (R, C) => {
        R(2, 30, 10, 4, COR.contorno);
        R(3, 30, 8, 3, '#cbbfa8');
        R(6, 12, 2, 18, '#cbbfa8');
        C(7, 7, 6, COR.contorno);
        C(7, 7, 5, '#ffe79a');
        C(9, 5, 4, '#2a1d30');
        C(9, 5, 3, '#e9d27a');
        C(10, 5, 3, '#5d4470');
    });
    IMG_DECOR.girassol = pinta(16, 30, (R, C) => {
        R(3, 20, 10, 10, COR.contorno);
        R(4, 20, 8, 9, '#e07a5f');
        R(4, 20, 8, 2, '#c25e44');
        R(7, 9, 2, 11, '#4f9a5a');
        R(3, 13, 4, 2, '#5fae6a');
        R(9, 15, 4, 2, '#5fae6a');
        C(8, 6, 6, '#ffcf3e');
        C(8, 6, 3, '#7a4a2a');
        R(7, 5, 1, 1, '#a8601e');
        R(9, 7, 1, 1, '#a8601e');
    });
}
function construirDecor() {
    if (MAPA !== 'quarto') {
        precisaDecor = true;
        return;
    }
    for (let i = OBJ.length - 1; i >= 0; i--)
        if (OBJ[i].decor)
            OBJ.splice(i, 1);
    for (let i = COL.length - 1; i >= 0; i--)
        if (COL[i].decor)
            COL.splice(i, 1);
    for (let i = PONTOS.length - 1; i >= 0; i--)
        if (PONTOS[i].decor)
            PONTOS.splice(i, 1);
    const add = (nome, x, y, img, col, ponto, draw) => { OBJ.push({ nome, x, y, img, base: y + img.height, decor: true, draw }); if (col)
        COL.push(Object.assign({ decor: true, dono: nome }, col)); if (ponto)
        PONTOS.push(Object.assign({ obj: nome, decor: true }, ponto)); };
    if (tem('aquario'))
        add('aquario', 282, 100, IMG_DECOR.aquario, { x: 282, y: 128, w: 28, h: 10 }, { nome: 'Olhar o aquário', x: 296, y: 146, acao: () => { falar(FEFE, 'Oi, peixinhos!'); gatos.forEach((g, i) => { if (!S.gatos[g.id].dormindo && g.estado === 'parado' && Math.random() < .6) {
                const [x, y] = ASSISTIR_AQUARIO[i];
                irPara(g, x, y, () => { g.estado = 'social'; g.timer = 4; falar(g, g.id === 'tho' ? 'PEIXE!!!' : '*olha*'); }, 40);
            } }); } }, (c, o) => {
            c.drawImage(o.img, o.x, o.y);
            const t = performance.now() / 1000;
            const peixe = (px, py, cor) => { c.fillStyle = cor; c.fillRect(Math.round(px), Math.round(py), 3, 2); c.fillRect(Math.round(px) + (Math.cos(t) > 0 ? -1 : 3), Math.round(py), 1, 2); };
            peixe(o.x + 12 + Math.sin(t * .8) * 9, o.y + 10 + Math.sin(t * 1.3) * 2, '#ff8a3d');
            peixe(o.x + 14 + Math.sin(t * .6 + 2) * 8, o.y + 15 + Math.cos(t) * 2, '#ffd36e');
            if (Math.floor(t * 2) % 3 === 0) {
                c.fillStyle = '#fff';
                c.fillRect(o.x + 20, o.y + 6 - (Math.floor(t * 4) % 4), 1, 1);
            }
        });
    if (tem('caixa'))
        add('caixa', 230, 198, IMG_DECOR.caixa, null, { nome: 'Espiar a caixa', x: 241, y: 222, acao: () => {
                const tho = G('tho');
                if (tho.estado === 'escondido') {
                    tho.estado = 'parado';
                    tho.x = 241;
                    tho.y = 222;
                    som.miau('tho', 1.3);
                    falar(tho, 'BU!!!');
                    falar(FEFE, 'AI, THO!');
                    setTimeout(() => zoomies(tho, 2), 700);
                }
                else
                    falar(FEFE, 'Vazia... por enquanto.');
            } }, (c, o) => {
            c.drawImage(o.img, o.x, o.y);
            const tho = G('tho');
            if (tho && tho.estado === 'escondido') {
                const pis = Math.floor(performance.now() / 1800) % 5 === 0;
                c.fillStyle = '#24212a';
                c.fillRect(o.x + 7, o.y + 3, 10, 4);
                c.fillRect(o.x + 7, o.y + 1, 2, 2);
                c.fillRect(o.x + 15, o.y + 1, 2, 2);
                c.fillStyle = pis ? '#24212a' : '#a8d65c';
                c.fillRect(o.x + 9, o.y + 4, 2, 1);
                c.fillRect(o.x + 13, o.y + 4, 2, 1);
            }
        });
    if (tem('luminaria'))
        add('luminaria', 65, 100, IMG_DECOR.luminaria, { x: 66, y: 128, w: 12, h: 6 }, { nome: 'Olhar a luminária', x: 72, y: 138, acao: () => falar(FEFE, 'Uma luazinha só minha') });
    if (tem('girassol'))
        add('girassol', 96, 196, IMG_DECOR.girassol, { x: 98, y: 218, w: 12, h: 8 }, { nome: 'Regar o girassol', x: 104, y: 230, acao: regar });
    if (tem('mural'))
        PONTOS.push({ obj: 'mural', decor: true, nome: 'Ver o mural de fotos', x: 160, y: 62, acao: verAlbum, zona: [150, 8, 18, 20] });
    if (tem('rede'))
        PONTOS.push({ obj: 'rede', decor: true, nome: 'Olhar a rede', x: 62, y: 104, acao: () => { const c = G('clarinha'); falar(FEFE, c.estado === 'na_rede' ? 'A Clarinha no trono dela' : 'A rede da Clarinha'); } });
    construirSazonal();
    aplicarPosicoes();
}
function desenharParede(c) {
    if (tem('pisca')) {
        const noite = (() => { const h = new Date().getHours(); return h >= 18 || h < 7; })(), t = Math.floor(performance.now() / 500);
        for (let x = 0; x < TW; x++) {
            c.fillStyle = '#2a1d30';
            c.fillRect(x, 8 + Math.round(2 * Math.sin(x / 22)), 1, 1);
        }
        for (let x = 6, i = 0; x < TW; x += 11, i++) {
            const y = 9 + Math.round(2 * Math.sin(x / 22));
            const cor = ['#ff7aa8', '#ffd36e', '#8fcaff'][i % 3];
            c.fillStyle = (noite && (i + t) % 4 === 0) ? '#fff' : cor;
            c.fillRect(x, y, 2, 2);
        }
    }
    if (tem('mural')) {
        c.fillStyle = '#2a1d30';
        c.fillRect(150, 8, 18, 20);
        c.fillStyle = '#c9925a';
        c.fillRect(151, 9, 16, 18);
        const fotos = S.album.slice(-3);
        fotos.forEach((f, i) => {
            const x = 152 + (i % 2) * 8, y = 10 + Math.floor(i / 2) * 9;
            c.fillStyle = '#fff';
            c.fillRect(x, y, 7, 7);
            let im = miniFotos[f.img];
            if (!im) {
                im = new Image();
                im.src = f.img;
                miniFotos[f.img] = im;
            }
            if (im.complete && im.naturalWidth)
                c.drawImage(im, 8, 4, 32, 32, x + 1, y + 1, 5, 5);
            else {
                c.fillStyle = '#5d4470';
                c.fillRect(x + 1, y + 1, 5, 5);
            }
        });
        if (!fotos.length) {
            c.fillStyle = '#fff';
            c.fillRect(153, 11, 6, 5);
            c.fillRect(160, 16, 6, 5);
        }
        c.fillStyle = '#ff5c8d';
        c.fillRect(158, 9, 1, 1);
    }
    if (tem('rede')) {
        c.fillStyle = '#2a1d30';
        c.fillRect(31, 29, 2, 6);
        c.fillRect(57, 29, 2, 6);
        for (let x = 32; x <= 58; x++) {
            const y = 34 + Math.round(3 * Math.sin((x - 32) / 26 * Math.PI));
            c.fillStyle = '#2a1d30';
            c.fillRect(x, y - 1, 1, 1);
            c.fillStyle = (x % 4 < 2) ? '#ff9fbf' : '#fff3f8';
            c.fillRect(x, y, 1, 2);
        }
    }
}
function previewItem(it) {
    const c = document.createElement('canvas');
    if (it.aba === 'decor') {
        if (IMG_DECOR[it.id]) {
            c.width = IMG_DECOR[it.id].width;
            c.height = IMG_DECOR[it.id].height;
            c.getContext('2d').drawImage(IMG_DECOR[it.id], 0, 0);
        }
        else {
            c.width = 30;
            c.height = 16;
            const x = c.getContext('2d');
            if (it.id === 'pisca') {
                x.fillStyle = '#2a1d30';
                for (let i = 0; i < 30; i++)
                    x.fillRect(i, 6 + Math.round(2 * Math.sin(i / 5)), 1, 1);
                ['#ff7aa8', '#ffd36e', '#8fcaff'].forEach((k, i) => { x.fillStyle = k; for (let j = i * 3; j < 30; j += 9)
                    x.fillRect(j, 7 + Math.round(2 * Math.sin(j / 5)), 2, 2); });
            }
            if (it.id === 'mural') {
                c.width = 18;
                c.height = 20;
                x.fillStyle = '#2a1d30';
                x.fillRect(0, 0, 18, 20);
                x.fillStyle = '#c9925a';
                x.fillRect(1, 1, 16, 18);
                x.fillStyle = '#fff';
                x.fillRect(2, 2, 7, 7);
                x.fillRect(9, 10, 7, 7);
                x.fillStyle = '#8fcaff';
                x.fillRect(3, 3, 5, 5);
                x.fillStyle = '#ff9fbf';
                x.fillRect(10, 11, 5, 5);
            }
            if (it.id === 'rede') {
                for (let i = 0; i < 30; i++) {
                    const y = 4 + Math.round(5 * Math.sin(i / 29 * Math.PI));
                    x.fillStyle = '#2a1d30';
                    x.fillRect(i, y - 1, 1, 1);
                    x.fillStyle = (i % 4 < 2) ? '#ff9fbf' : '#fff3f8';
                    x.fillRect(i, y, 1, 3);
                }
            }
        }
    }
    else if (it.aba === 'gatos') {
        c.width = 16;
        c.height = 20;
        const x = c.getContext('2d');
        const a = ACESSORIOS[it.id];
        x.drawImage(spr(gatoPixels('tortie', 'feliz', false), GATOS.lola.cor, 'glolafeliz'), 1, 6);
        x.drawImage(spr(a.peq.g, a.cor, 'ap' + it.id), 1 + a.peq.x, 6 + a.peq.y);
    }
    else if (it.aba === 'roupas') {
        const p = previewFefe(it.roupa, false);
        c.width = p.width;
        c.height = p.height;
        c.getContext('2d').drawImage(p, 0, 0);
    }
    else if (it.id === 'camera') {
        c.width = 18;
        c.height = 14;
        const x = c.getContext('2d');
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 2, 18, 12);
        x.fillStyle = '#ff9ec4';
        x.fillRect(1, 3, 16, 10);
        x.fillStyle = '#fff';
        x.fillRect(1, 10, 16, 3);
        x.fillStyle = '#2a1d30';
        x.fillRect(6, 4, 7, 7);
        x.fillStyle = '#8fcaff';
        x.fillRect(7, 5, 5, 5);
        x.fillStyle = '#fff';
        x.fillRect(8, 6, 1, 1);
        x.fillStyle = '#ffd36e';
        x.fillRect(13, 0, 3, 2);
    }
    else if (it.id === 'laser') {
        c.width = 20;
        c.height = 12;
        const x = c.getContext('2d');
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 3, 14, 6);
        x.fillStyle = '#8a8d96';
        x.fillRect(1, 4, 12, 4);
        x.fillStyle = '#ff2a3c';
        x.fillRect(14, 5, 6, 2);
        x.fillRect(4, 5, 2, 2);
    }
    else {
        const [m, cc] = ICONES.pena;
        const p = spr(m, cc);
        c.width = p.width;
        c.height = p.height;
        c.getContext('2d').drawImage(p, 0, 0);
    }
    return c;
}
function abrirLoja(aba) {
    if (aba)
        abaLoja = aba;
    const itens = LOJA.filter(i => i.aba === abaLoja);
    abrir(`Lojinha · ${S.coracoes} ♥`, `<button class="btn branco" id="btnMontar" style="width:auto;margin:0 0 10px;font-size:14px">🪑 Mudar os móveis de lugar</button><div class="abas">${Object.entries(ABAS).map(([k, v]) => `<button class="px ${k === abaLoja ? 'sel' : ''}" data-aba="${k}">${v}</button>`).join('')}</div>
    <div class="itensLoja">${itens.map(it => `<div class="itemLoja px ${tem(it.id) ? 'comprado' : ''}"><span class="pvL" data-id="${it.id}"></span><b>${it.n}</b><small>${it.desc}</small>
      <button data-comprar="${it.id}" ${tem(it.id) || S.coracoes < it.preco ? 'disabled' : ''}>${tem(it.id) ? 'Comprado ✓' : `${it.preco} ♥`}</button></div>`).join('')}</div>
    <p style="font-size:12px;opacity:.65;margin:12px 0 0">Ganhe corações fazendo carinho, dando comida, brincando, regando as plantas, limpando a caixinha, lendo cartinhas e tirando fotos.</p>`, false, true);
    document.querySelectorAll('.pvL').forEach(el => el.appendChild(previewItem(LOJA.find(i => i.id === el.dataset.id))));
    document.querySelectorAll('[data-aba]').forEach(b => b.onclick = () => { som.pop(); abrirLoja(b.dataset.aba); });
    document.querySelectorAll('[data-comprar]').forEach(b => b.onclick = () => comprar(b.dataset.comprar));
    $('btnMontar').onclick = () => { fechar(); setTimeout(modoMontar, 200); };
}
function comprar(id) {
    const it = LOJA.find(i => i.id === id);
    if (!it || tem(id) || S.coracoes < it.preco)
        return;
    S.coracoes -= it.preco;
    S.compras.push(id);
    salvar();
    atualizarHUD();
    som.plim();
    setTimeout(som.plim, 120);
    if (it.aba === 'decor') {
        if (MAPA === 'quarto')
            construirDecor();
        else {
            precisaDecor = true;
        }
        toast(`${it.n} no quarto! ✨`);
    }
    else if (it.aba === 'gatos')
        toast(`${it.n} comprado! Coloque na tela de carinho de um gato.`);
    else if (it.aba === 'roupas')
        toast(`${it.n} já está no guarda-roupa!`);
    else
        toast(`${it.n} comprada! Use na tela de carinho.`);
    abrirLoja();
}
