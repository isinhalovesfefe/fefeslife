function movel(nome, x, y, img, col) { OBJ.push({ nome, x, y, img, base: y + img.height }); if (col) {
    col.dono = nome;
    COL.push(col);
} }
function construirQuarto() {
    movel('cama', 14, 38, pinta(42, 60, (R) => {
        R(0, 0, 42, 12, COR.contorno);
        R(1, 1, 40, 10, COR.madeira2);
        R(3, 3, 36, 2, COR.madeiraC);
        R(0, 12, 42, 48, COR.contorno);
        R(1, 12, 40, 47, '#f4eef8');
        R(4, 14, 15, 9, COR.contorno);
        R(5, 15, 13, 7, '#fff');
        R(5, 20, 13, 2, '#e2dcea');
        R(23, 14, 15, 9, COR.contorno);
        R(24, 15, 13, 7, '#fff');
        R(24, 20, 13, 2, '#e2dcea');
        R(1, 26, 40, 33, '#3c2f5c');
        R(1, 26, 40, 3, '#5a4785');
        R(1, 56, 40, 3, '#2c2245');
        [[6, 33], [18, 38], [30, 32], [10, 47], [26, 46], [35, 52], [15, 53]].forEach(([a, b]) => R(a, b, 2, 2, '#e9d27a'));
        R(20, 40, 4, 4, '#e9d27a');
        R(22, 40, 3, 3, '#3c2f5c');
    }), { x: 14, y: 50, w: 42, h: 46 });
    movel('criado', 60, 30, pinta(20, 36, (R, C) => {
        R(0, 16, 20, 20, COR.contorno);
        R(1, 16, 18, 19, COR.madeira);
        R(1, 16, 18, 5, COR.madeiraC);
        R(2, 25, 16, 1, COR.madeira2);
        R(9, 28, 2, 2, '#e9d27a');
        R(4, 10, 3, 7, '#f3ead9');
        R(3, 16, 5, 1, '#cbbfa8');
        C(5, 7, 5, '#c8404f');
        R(0, 9, 11, 3, '#2a1d30');
        R(1, 9, 9, 2, '#e4dccd');
        R(3, 4, 2, 2, '#fff');
        R(7, 6, 2, 2, '#fff');
        R(5, 8, 1, 1, '#fff');
        R(12, 14, 7, 5, COR.contorno);
        R(13, 15, 5, 3, '#fff6ef');
        R(15, 16, 1, 1, '#ff5c8d');
    }), { x: 60, y: 54, w: 20, h: 12 });
    movel('mesa', 98, 24, pinta(54, 40, (R) => {
        R(14, 0, 26, 18, COR.contorno);
        R(15, 1, 24, 14, '#1d1830');
        R(16, 2, 22, 12, '#3b2e5e');
        R(17, 3, 8, 2, '#ff9fc4');
        R(17, 6, 14, 1, '#c7b8ff');
        R(17, 8, 10, 1, '#c7b8ff');
        R(17, 10, 12, 1, '#c7b8ff');
        R(25, 15, 4, 4, COR.contorno);
        R(0, 18, 54, 22, COR.contorno);
        R(1, 18, 52, 10, '#8f6045');
        R(1, 28, 52, 11, COR.madeira2);
        R(3, 30, 22, 1, '#4a2f24');
        R(29, 30, 22, 1, '#4a2f24');
        R(16, 21, 22, 4, '#2a2733');
        R(17, 22, 20, 2, '#4b4757');
        R(42, 19, 9, 2, '#111');
        R(41, 20, 2, 6, '#111');
        R(50, 20, 2, 6, '#111');
        R(41, 24, 3, 3, '#e0557f');
        R(49, 24, 3, 3, '#e0557f');
        R(4, 20, 6, 6, '#2a1d30');
        R(5, 21, 4, 4, '#fff');
        R(6, 19, 1, 2, '#fff');
    }), { x: 98, y: 44, w: 54, h: 20 });
    movel('cadeira', 117, 62, pinta(18, 16, (R) => { R(0, 0, 18, 14, COR.contorno); R(1, 1, 16, 12, '#6a4f8a'); R(2, 2, 14, 4, '#8467a8'); R(2, 14, 2, 2, COR.contorno); R(14, 14, 2, 2, COR.contorno); }), { x: 119, y: 70, w: 14, h: 6 });
    movel('estante', 168, 10, pinta(46, 46, (R) => {
        R(0, 0, 46, 46, COR.contorno);
        R(1, 1, 44, 44, COR.madeira2);
        [12, 26, 40].forEach(y => { R(0, y, 46, 4, COR.contorno); R(1, y, 44, 3, COR.madeiraC); });
        const vaso = (x, y, cor) => { R(x, y - 6, 8, 6, COR.contorno); R(x + 1, y - 6, 6, 5, cor); };
        vaso(4, 12, '#e07a5f');
        vaso(20, 12, '#f0e6d8');
        vaso(34, 12, '#8fb8de');
        vaso(10, 26, '#f0e6d8');
        vaso(28, 26, '#e07a5f');
        vaso(6, 40, '#8fb8de');
        vaso(32, 40, '#f0e6d8');
        const folhas = (x, y) => { [[0, -3], [2, -5], [4, -4], [6, -3], [3, -7], [1, -6], [5, -6]].forEach(([a, b]) => R(x + a, y + b, 2, 2, '#5fae6a')); R(x + 3, y - 7, 1, 2, '#86d08f'); };
        folhas(4, 6);
        folhas(20, 6);
        folhas(34, 6);
        folhas(10, 20);
        folhas(28, 20);
        folhas(6, 34);
        folhas(32, 34);
        for (let i = 0; i < 8; i++)
            R(22 + (i % 2), 16 + i * 3, 2, 3, '#5fae6a');
        R(18, 16, 2, 10, '#4f9a5a');
        R(20, 30, 6, 8, '#2a1d30');
        R(21, 31, 4, 6, '#ffd36e');
        R(22, 32, 2, 4, '#c8404f');
    }), { x: 168, y: 46, w: 46, h: 12 });
    movel('guitarra', 218, 28, pinta(12, 34, (R, C) => {
        R(4, 0, 4, 4, COR.contorno);
        R(5, 1, 2, 2, '#3a2a20');
        R(5, 4, 2, 14, '#e8c37a');
        R(5, 6, 2, 1, '#8a6a3a');
        R(5, 10, 2, 1, '#8a6a3a');
        R(5, 14, 2, 1, '#8a6a3a');
        C(6, 24, 5, COR.contorno);
        C(6, 24, 4, '#d0702a');
        C(6, 25, 2, '#7a3a12');
        R(3, 19, 6, 3, COR.contorno);
        R(4, 19, 4, 3, '#d0702a');
        R(5, 24, 2, 1, '#e8c37a');
    }), { x: 219, y: 56, w: 10, h: 6 });
    movel('vitrola', 236, 34, pinta(32, 30, (R, C) => {
        R(0, 8, 32, 22, COR.contorno);
        R(1, 8, 30, 21, '#5a3b4a');
        R(1, 8, 30, 6, '#7a5265');
        R(3, 20, 12, 1, '#3b2530');
        R(17, 20, 12, 1, '#3b2530');
        R(2, 0, 28, 10, COR.contorno);
        R(3, 1, 26, 8, '#3b2a33');
        C(12, 5, 4, '#111');
        C(12, 5, 1, '#ff7aa8');
        R(22, 2, 2, 5, '#d9dbe6');
        R(18, 6, 5, 1, '#d9dbe6');
        R(3, 22, 4, 6, '#c8404f');
        R(7, 22, 4, 6, '#ffd36e');
        R(11, 22, 4, 6, '#5b8cff');
    }), { x: 236, y: 50, w: 32, h: 14 });
    movel('espelho', 278, 8, pinta(20, 50, (R) => {
        R(0, 0, 20, 50, COR.contorno);
        R(1, 1, 18, 48, '#d4b06a');
        R(3, 3, 14, 44, '#c7d6e2');
        for (let i = 0; i < 10; i++)
            R(5 + i, 30 - i * 2, 2, 2, '#eef5fa');
        for (let i = 0; i < 6; i++)
            R(10 + i, 38 - i * 2, 1, 2, '#eef5fa');
        R(2, 48, 4, 2, COR.contorno);
        R(14, 48, 4, 2, COR.contorno);
    }), { x: 278, y: 48, w: 20, h: 10 });
    movel('armario', 302, 6, pinta(40, 54, (R) => {
        R(0, 0, 40, 54, COR.contorno);
        R(1, 1, 38, 52, COR.madeira2);
        R(1, 1, 38, 4, COR.madeira);
        R(3, 7, 16, 42, COR.madeira);
        R(21, 7, 16, 42, COR.madeira);
        R(19, 7, 2, 42, COR.contorno);
        R(16, 26, 2, 4, '#e9d27a');
        R(22, 26, 2, 4, '#e9d27a');
        R(5, 9, 12, 1, COR.madeiraC);
        R(23, 9, 12, 1, COR.madeiraC);
    }), { x: 302, y: 44, w: 40, h: 16 });
    movel('arranhador', 318, 118, pinta(24, 46, (R, C) => {
        R(0, 38, 24, 8, COR.contorno);
        R(1, 38, 22, 7, '#d9cdb8');
        R(4, 10, 5, 28, COR.contorno);
        R(5, 10, 3, 28, '#d8c08f');
        for (let y = 12; y < 38; y += 3)
            R(5, y, 3, 1, '#b89a62');
        R(15, 20, 5, 18, COR.contorno);
        R(16, 20, 3, 18, '#d8c08f');
        for (let y = 22; y < 38; y += 3)
            R(16, y, 3, 1, '#b89a62');
        R(0, 4, 16, 7, COR.contorno);
        R(1, 5, 14, 5, '#b78ac9');
        R(12, 16, 12, 5, COR.contorno);
        R(13, 17, 10, 3, '#b78ac9');
        R(21, 21, 1, 8, '#fff');
        C(21, 31, 2, '#ff7aa8');
    }), { x: 318, y: 150, w: 24, h: 14 });
    movel('areia', 12, 206, pinta(28, 20, (R) => {
        R(0, 0, 28, 20, COR.contorno);
        R(1, 1, 26, 18, '#7d93b8');
        R(3, 3, 22, 13, '#e8d6a8');
        R(6, 6, 2, 1, '#c9b27c');
        R(16, 10, 3, 1, '#c9b27c');
        R(11, 12, 2, 1, '#c9b27c');
        R(1, 16, 26, 3, '#5d7398');
    }), { x: 12, y: 208, w: 28, h: 18 });
    {
        const img = imgTV();
        OBJ.push({ nome: 'tv', x: 158, y: 86, img, base: 86 + img.height, draw: desenharTV });
        COL.push({ x: 158, y: 102, w: 36, h: 9, dono: 'tv' });
    }
    OBJ.push({ nome: 'livro', x: 196, y: 41, img: imgLivro(), base: 57 });
    PONTOS.push({ obj: 'livro', nome: 'Ler o livro', x: 204, y: 66, acao: abrirLivro });
    OBJ.push({ nome: 'diario', x: 139, y: 30, img: imgDiario(), base: 66 });
    PONTOS.push({ obj: 'diario', nome: 'Escrever no diário', x: 144, y: 72, acao: abrirDiario });
    OBJ.push({ nome: 'pote', x: 101, y: 16, img: imgPote(), base: 65 });
    PONTOS.push({ obj: 'pote', nome: 'Tirar um motivo do pote', x: 104, y: 72, acao: abrirPotinho });
    {
        const img = imgVasos();
        OBJ.push({ nome: 'horta', x: 122, y: 200, img, base: 212, draw: desenharHorta });
        COL.push({ x: 122, y: 204, w: 36, h: 8, dono: 'horta' });
        PONTOS.push({ obj: 'horta', nome: 'Regar a hortinha', x: 140, y: 222, acao: regarHorta });
    }
    movel('monstera', 318, 190, pinta(26, 40, (R, C) => {
        R(7, 28, 12, 12, COR.contorno);
        R(8, 28, 10, 11, '#e07a5f');
        R(8, 28, 10, 2, '#c25e44');
        C(7, 14, 6, '#4f9a5a');
        C(18, 10, 7, '#5fae6a');
        C(13, 22, 5, '#5fae6a');
        C(20, 22, 4, '#4f9a5a');
        C(6, 24, 4, '#5fae6a');
        R(18, 8, 1, 6, '#86d08f');
        R(7, 12, 1, 5, '#86d08f');
        R(12, 16, 2, 12, '#3f7a48');
    }), { x: 323, y: 218, w: 16, h: 12 });
}
function corCeu(h) { if (h >= 6 && h < 9)
    return ['#ffc9a8', '#ffe8c7']; if (h >= 9 && h < 17)
    return ['#8fcaff', '#c8e8ff']; if (h >= 17 && h < 19)
    return ['#ff9a7a', '#ffcf8f']; return ['#1d1a48', '#2e2a66']; }
function construirFundo() {
    if (MAPA !== 'quarto') {
        if (CENAS.parque && MAPA === 'parque')
            fundo = fundoParque();
        return;
    }
    const TW = 352, TH = 240, PISO_Y = 50;
    const hr = new Date().getHours();
    const [c1, c2] = corCeu(hr), noite = hr >= 19 || hr < 6;
    fundo = pinta(TW, TH, (R, C) => {
        R(0, 0, TW, TH, '#c98f5f');
        for (let y = PISO_Y; y < TH; y += 6) {
            R(0, y + 5, TW, 1, '#a8714a');
            R(0, y, TW, 1, 'rgba(255,228,190,.08)');
            R(0, y + 4, TW, 1, 'rgba(120,60,50,.06)');
            for (let x = ((y / 6) % 3) * 16; x < TW; x += 48)
                R(x, y, 1, 5, '#a8714a');
        }
        for (let i = 0; i < 60; i++)
            R((i * 97) % TW, PISO_Y + ((i * 53) % (TH - PISO_Y)), 2, 1, '#d8a070');
        texturaChao(R, TW, TH, PISO_Y);
        R(0, 0, TW, PISO_Y, '#5d4470');
        for (let y = 6; y < PISO_Y - 6; y += 10)
            for (let x = ((y / 10) % 2) * 8 + 4; x < TW; x += 16) {
                R(x, y, 1, 1, '#8a6d9e');
                R(x + 1, y + 1, 1, 1, '#7a5f8e');
            }
        R(0, 0, TW, 5, '#2a1d30');
        papelDeParede(R, TW, PISO_Y);
        R(0, PISO_Y - 6, TW, 4, '#7a4a5e');
        R(0, PISO_Y - 6, TW, 1, '#9a6078');
        R(0, PISO_Y - 2, TW, 2, '#c9b8d6');
        R(0, PISO_Y, TW, 1, '#2a1d30');
        R(0, PISO_Y + 1, TW, 2, 'rgba(40,18,56,.16)');
        R(0, PISO_Y + 3, TW, 3, 'rgba(40,18,56,.07)');
        R(0, 5, TW, 4, 'rgba(20,10,30,.14)');
        R(0, 9, TW, 3, 'rgba(20,10,30,.06)');
        R(0, PISO_Y - 6, TW, 1, 'rgba(255,255,255,.12)');
        for (let i = 0; i < 10; i++) {
            const a = (10 - i) * .006;
            R(i, 0, 1, TH, `rgba(30,12,44,${a})`);
            R(TW - 1 - i, 0, 1, TH, `rgba(30,12,44,${a})`);
            R(0, TH - 1 - i, TW, 1, `rgba(30,12,44,${a})`);
        }
        const janela = (x) => {
            R(x - 4, 8, 4, 30, '#a24d6b');
            R(x + 30, 8, 4, 30, '#a24d6b');
            R(x, 10, 30, 26, '#2a1d30');
            R(x + 1, 11, 28, 24, '#efe6f5');
            R(x + 3, 13, 24, 20, c1);
            R(x + 3, 13, 24, 7, c2);
            if (noite) {
                R(x + 20, 15, 4, 4, '#fff4c2');
                R(x + 21, 15, 3, 3, c1);
                R(x + 8, 18, 1, 1, '#fff');
                R(x + 14, 26, 1, 1, '#fff');
                R(x + 6, 28, 1, 1, '#fff');
            }
            else {
                R(x + 6, 24, 8, 3, '#fff');
                R(x + 8, 22, 4, 2, '#fff');
            }
            R(x + 14, 13, 2, 20, '#efe6f5');
            R(x + 3, 22, 24, 2, '#efe6f5');
            R(x - 2, 36, 34, 3, '#2a1d30');
            R(x - 1, 35, 32, 2, '#efe6f5');
            R(x - 5, 6, 40, 2, '#2a1d30');
        };
        janela(30);
        janela(228);
        R(76, 10, 20, 26, '#2a1d30');
        R(77, 11, 18, 24, '#1f1a2e');
        C(86, 21, 5, '#ffb52e');
        for (let a = 0; a < 8; a++) {
            const an = a * Math.PI / 4;
            R(86 + Math.round(Math.cos(an) * 8), 21 + Math.round(Math.sin(an) * 8), 1, 1, '#ffb52e');
        }
        C(87, 21, 4, '#1f1a2e');
        C(85, 21, 4, '#f3ead9');
        C(87, 20, 3, '#1f1a2e');
        R(79, 31, 1, 1, '#fff');
        R(92, 13, 1, 1, '#fff');
        R(80, 14, 1, 1, '#fff');
        R(93, 30, 1, 1, '#fff');
        const tx = 112, ty = 112, tw = 120, th = 70;
        R(tx + 4, ty + th, tw - 2, 2, 'rgba(42,18,56,.14)');
        R(tx + tw, ty + 4, 2, th - 2, 'rgba(42,18,56,.11)');
        R(tx + 2, ty, tw - 4, th, '#2a1d30');
        R(tx, ty + 2, tw, th - 4, '#2a1d30');
        R(tx + 2, ty + 2, tw - 4, th - 4, '#d9b45a');
        R(tx + 4, ty + 4, tw - 8, th - 8, '#25213d');
        for (let i = 0; i < tw - 12; i += 6) {
            R(tx + 6 + i, ty + 6, 2, 2, '#d9b45a');
            R(tx + 6 + i, ty + th - 8, 2, 2, '#d9b45a');
        }
        C(tx + 38, ty + 35, 10, '#e9a93a');
        C(tx + 38, ty + 35, 7, '#ffcf5e');
        for (let a = 0; a < 12; a++) {
            const an = a * Math.PI / 6;
            R(tx + 38 + Math.round(Math.cos(an) * 14) - 1, ty + 35 + Math.round(Math.sin(an) * 14) - 1, 2, 2, '#e9a93a');
        }
        R(tx + 35, ty + 33, 2, 1, '#a8601e');
        R(tx + 40, ty + 33, 2, 1, '#a8601e');
        R(tx + 36, ty + 38, 5, 1, '#a8601e');
        C(tx + 84, ty + 35, 10, '#f3ead9');
        C(tx + 89, ty + 32, 9, '#25213d');
        [[60, 14], [66, 52], [104, 16], [108, 54], [16, 14], [18, 56], [58, 34], [100, 36]].forEach(([a, b]) => { R(tx + a, ty + b, 1, 3, '#f3ead9'); R(tx + a - 1, ty + b + 1, 3, 1, '#f3ead9'); });
        const cx = 24, cy = 172;
        R(cx + 4, cy + 22, 30, 2, 'rgba(42,18,56,.14)');
        R(cx + 34, cy + 4, 2, 18, 'rgba(42,18,56,.11)');
        R(cx + 2, cy, 30, 22, '#2a1d30');
        R(cx, cy + 2, 34, 18, '#2a1d30');
        R(cx + 2, cy + 2, 30, 18, '#d77fa1');
        R(cx + 5, cy + 5, 24, 12, '#f3c1d3');
        R(cx + 5, cy + 5, 24, 2, '#e8a5bf');
        R(252, 198, 44, 18, '#2a1d30');
        R(253, 199, 42, 16, '#8fc9a8');
        R(255, 201, 38, 12, '#a8dcbf');
        R(158, 224, 36, 14, '#2a1d30');
        R(159, 225, 34, 12, '#d77fa1');
        R(161, 227, 30, 8, '#f3c1d3');
        R(164, 230, 24, 1, '#d77fa1');
        R(164, 232, 24, 1, '#d77fa1');
        R(156, 238, 40, 2, '#2a1d30');
    });
    try {
        contornoColorido(fundo);
    }
    catch (e) { }
}
function desenharPotes(ctx) {
    const cheio = Date.now() < potesAte;
    const pote = (x, y, cor, dentro) => { ctx.fillStyle = '#2a1d30'; ctx.fillRect(x, y, 14, 9); ctx.fillStyle = cor; ctx.fillRect(x + 1, y + 1, 12, 7); ctx.fillStyle = dentro; ctx.fillRect(x + 2, y + 2, 10, 3); };
    pote(258, 202, '#ff8fb0', cheio ? '#b5743d' : '#e8b0c4');
    pote(276, 202, '#7ea6e3', '#9fd8f5');
}
