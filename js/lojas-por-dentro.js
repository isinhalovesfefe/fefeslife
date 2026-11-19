Object.assign(LOJAS.sorvC, { falasFefe: ['Quero todos os sabores', 'Pistache ou morango?'] });
Object.assign(LOJAS.discos, { falasFefe: ['Esse lugar é um sonho', 'Quero levar a loja inteira'] });
Object.assign(LOJAS.padaria, { falasFefe: ['Que cheirinho de pão', 'Pão de queijo quentinho...'] });
Object.assign(LOJAS.petshop, { falasFefe: ['Olha os filhotinhos!', 'Os meus gatos iam amar isso'] });
Object.assign(LOJAS.livraria, { falasFefe: ['Quero ler tudo', 'Silêncio de livraria é tão bom'] });
Object.assign(LOJAS.flores, { falasFefe: ['Que cheiro de flor', 'Parece um jardim encantado'] });
Object.assign(LOJAS.burger, { falasFefe: ['Que cheiro de batata frita', 'Tô com fome agora'] });
Object.assign(LOJAS.acai, { falasFefe: ['Clima de praia aqui dentro', 'Açaí é vida'] });
Object.assign(LOJAS.mercado, { falasFefe: ['O que falta lá em casa?', 'Ração... ração... cadê?'] });
Object.assign(LOJAS.academia, { falasFefe: ['Só de olhar já cansei', 'Hoje é dia de perna?'] });
const SABORES = [['Morango', '#ff8fb0'], ['Chocolate', '#7a4a30'], ['Pistache', '#9fd08a'], ['Flocos', '#f4f1ec'], ['Maracujá', '#ffd36e'], ['Açaí', '#5d3a8a']];
const LAYOUT = {
    sorvete: { W: 224, H: 176, parede: (R, C, W) => { for (let x = 0; x < W; x += 12) {
            R(x, 0, 6, 52, '#ffd6e6');
            R(x + 6, 0, 6, 52, '#fff6fa');
        } R(W / 2 - 30, 8, 60, 20, '#2a1d30'); R(W / 2 - 29, 9, 58, 18, '#ff7aa8'); for (let i = 0; i < 3; i++) {
            C(W / 2 - 16 + i * 16, 15, 4, ['#fff', '#9fd08a', '#7a4a30'][i]);
            R(W / 2 - 18 + i * 16, 18, 5, 7, '#e8c070');
        } },
        piso: ['#d6f5e8', '#ffffff'],
        moveis: (o) => {
            o.vitrine(56, 54, 112, '#c8e8ff', (R) => { for (let i = 0; i < 8; i++) {
                R(6 + i * 13, 8, 10, 8, '#2a1d30');
                R(7 + i * 13, 9, 8, 6, SABORES[i % 6][1]);
                R(8 + i * 13, 9, 3, 2, '#fff');
            } });
            [[30, 120], [194, 120], [30, 150], [194, 150]].forEach(([x, y], i) => o.banco(x, y, '#ff7aa8'));
            o.mesaRedonda(112, 140, '#fff6fa');
        },
        acao: { nome: 'Escolher um sabor', f: escolherSorvete }, staff: [112, 60], escuro: 0 },
    discos: { W: 224, H: 176, parede: (R, C, W) => { R(0, 0, W, 52, '#221d38'); [[10, '#ff5c8d'], [50, '#5b8cff'], [150, '#ffd36e'], [190, '#7bd389']].forEach(([x, c]) => { R(x, 8, 26, 30, '#2a1d30'); R(x + 1, 9, 24, 28, c); C(x + 13, 23, 8, '#111'); C(x + 13, 23, 2, '#fff'); }); R(W / 2 - 28, 10, 56, 14, '#2a1d30'); R(W / 2 - 27, 11, 54, 12, '#3a1060'); },
        piso: ['#3a2a20', '#2e2018'],
        moveis: (o) => {
            o.balcao(60, 54, 104, '#5e3d2e');
            o.objDraw('vitrola', 100, 50, 24, 10, (c, x, y) => { c.fillStyle = '#2a1d30'; c.fillRect(x, y, 24, 10); c.fillStyle = '#111'; const r = performance.now() / 200; c.beginPath(); c.arc(x + 12, y + 5, 4, 0, Math.PI * 2); c.fill(); c.fillStyle = '#ff5c8d'; c.fillRect(x + 12 + Math.round(Math.cos(r) * 2) - 1, y + 5 + Math.round(Math.sin(r) * 2) - 1, 2, 2); });
            [[40, 118], [150, 118]].forEach(([x, y], i) => o.caixote(x, y, i));
            o.ponto('cabine', 190, 150, 'Ouvir um disco com fone', () => { try {
                tocarMusica(pick(Object.keys(DISCOS)));
            }
            catch (e) { } falar(FEFE, '*bate o pé no ritmo*', 1800); particula('nota', FEFE.x, FEFE.y - 28, 3); setTimeout(() => { if (String(MAPA).startsWith('int_'))
                pararMusica(); }, 9000); nec('diversao', 8); });
            o.cabine(186, 120);
        },
        neon: [[112, 17, 40, 'rgba(200,80,255,.4)'], [23, 23, 26, 'rgba(255,90,140,.3)'], [203, 23, 26, 'rgba(120,255,140,.25)']], staff: [112, 58], escuro: .35 },
    padaria: { W: 224, H: 176, parede: (R, C, W) => { R(0, 0, W, 52, '#fff1c2'); for (let y = 6; y < 48; y += 8)
            for (let x = ((y / 8) % 2) * 8; x < W; x += 16)
                R(x, y, 8, 8, '#f6e2a8'); R(12, 10, 40, 26, '#2a1d30'); R(13, 11, 38, 24, '#2f4a3a'); for (let i = 0; i < 4; i++)
            R(16, 14 + i * 5, 20 + (i * 7) % 14, 2, '#f4f1ec'); C(190, 20, 10, '#2a1d30'); C(190, 20, 9, '#fff'); R(190, 13, 1, 7, '#2a1d30'); R(190, 20, 5, 1, '#2a1d30'); },
        piso: ['#f0dcb0', '#e2c890'],
        moveis: (o) => {
            o.vitrine(52, 54, 120, '#ffe8c0', (R) => { for (let i = 0; i < 9; i++) {
                R(6 + i * 12, 10, 9, 6, '#2a1d30');
                R(7 + i * 12, 10, 7, 5, ['#d9a046', '#b8783a', '#e8c070', '#ff9ec4'][i % 4]);
            } });
            o.objDraw('cafeteira', 150, 40, 14, 14, (c, x, y) => { c.fillStyle = '#2a1d30'; c.fillRect(x, y, 14, 14); c.fillStyle = '#9aa0b0'; c.fillRect(x + 1, y + 1, 12, 12); c.fillStyle = '#2a1d30'; c.fillRect(x + 4, y + 9, 6, 4); const t = performance.now() / 300; c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(x + 5 + Math.round(Math.sin(t)), y - 4 - (t * 4 % 5), 1, 3); });
            [[24, 110], [24, 134], [24, 158]].forEach(([x, y]) => o.banco(x, y, '#c98f5f'));
            o.balcaoLateral(8, 104, '#a8714a');
            o.ponto('cafezinho', 112, 150, 'Tomar um cafezinho', () => { falar(FEFE, 'Um pingado e um pão de queijo!', 1800); setTimeout(() => comerPrato({ n: 'Cafezinho', ic: '☕' }, () => { }), 1000); nec('energia', 10); });
        },
        staff: [112, 60], escuro: 0 },
    pet: { W: 224, H: 176, parede: (R, C, W) => { R(0, 0, W, 52, '#d6f5d6'); [[8, 10], [60, 10]].forEach(([x, y]) => { R(x, y, 44, 28, '#2a1d30'); R(x + 1, y + 1, 42, 26, '#6fb7e0'); R(x + 1, y + 20, 42, 7, '#e8d6a8'); }); R(176, 8, 30, 34, '#2a1d30'); for (let i = 0; i < 30; i += 4)
            R(177 + i, 9, 1, 32, '#c9b8a0'); },
        piso: ['#f4f1ec', '#dfe8df'],
        moveis: (o) => { o.balcao(120, 54, 88, '#7bd389'); o.peixes(); o.passarinho(191, 26); o.cercadinho(30, 120); o.ponto('filhotes', 62, 154, 'Brincar com os filhotinhos', () => { o.filhotes.forEach(d => { d.felizAte = performance.now() + 3000; }); latir(); falar(FEFE, 'AAAA QUE FOFURA', 1800); if (ISI.aqui)
            setTimeout(() => falar(ISI, 'Vamos levar um? 🥺', 1800), 900); particula('coracao', 62, 128, 5); nec('social', 10); primeiraVez('filhotes', 1); }); },
        staff: [164, 58], escuro: 0 },
    livraria: { W: 240, H: 200, parede: (R, C, W) => { R(0, 0, W, 52, '#5e3d2e'); for (let sx = 6; sx < W - 6; sx += 58) {
            R(sx, 4, 54, 46, '#2a1d30');
            R(sx + 1, 5, 52, 44, '#7a4f3a');
            for (let k = 0; k < 3; k++) {
                const yy = 7 + k * 14;
                for (let i = 0; i < 50; i += 4)
                    R(sx + 2 + i, yy, 3, 11, ['#c8242e', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff', '#ff8a3d', '#f4f1ec'][(i + k * 3 + sx) % 7]);
                R(sx + 1, yy + 12, 52, 1, '#5e3d2e');
            }
        } },
        piso: ['#a8714a', '#94603c'],
        moveis: (o) => { o.balcao(150, 60, 76, '#5e3d2e'); o.estante(30, 96); o.estante(30, 140); o.poltrona(190, 134); o.gatoLoja(60, 180); o.ponto('leitura', 190, 166, 'Ler um pouquinho', () => { try {
            abrirLivro();
        }
        catch (e) { } nec('diversao', 8); }); },
        luzes: [[200, 124, 40, 'rgba(255,210,140,.35)']], staff: [188, 64], escuro: .12 },
    flores: { W: 224, H: 176, parede: (R, C, W) => { R(0, 0, W, 52, '#bfe3ff'); for (let x = 0; x < W; x += 28)
            R(x, 0, 2, 52, '#f4f1ec'); R(0, 24, W, 2, '#f4f1ec'); for (let i = 0; i < 20; i++) {
            const x = (i * 23) % W;
            R(x, 2, 1, 8 + (i % 4) * 3, '#3f8a3a');
            C(x, 12 + (i % 4) * 3, 3, '#5fae6a');
        } },
        piso: ['#e8e2d0', '#d8d0b8'],
        moveis: (o) => { o.balcao(140, 54, 70, '#8a5a3a'); for (let i = 0; i < 5; i++)
            o.vaso(24 + i * 22, 100, i); for (let i = 0; i < 5; i++)
            o.vaso(24 + i * 22, 140, i + 2); o.ponto('buque', 112, 166, 'Montar um buquê', montarBuque); },
        staff: [175, 58], escuro: 0 },
    burger: { W: 224, H: 176, parede: (R, C, W) => { R(0, 0, W, 52, '#c8242e'); R(0, 40, W, 12, '#f4f1ec'); for (let x = 0; x < W; x += 8)
            R(x, 44, 4, 4, '#c8242e'); R(W / 2 - 34, 6, 68, 20, '#2a1d30'); R(W / 2 - 33, 7, 66, 18, '#1a1418'); },
        piso: ['#f4f1ec', '#2a2a30'],
        moveis: (o) => { o.balcao(52, 54, 120, '#f4f1ec'); o.chapa(130, 40); [[26, 104], [26, 144]].forEach(([x, y]) => o.cabine2(x, y)); [[198, 104], [198, 144]].forEach(([x, y]) => o.cabine2(x, y)); o.jukebox(110, 110); },
        neon: [[112, 16, 44, 'rgba(255,200,80,.35)']], letreiro: 'BURGER', staff: [112, 58], escuro: .08 },
    acai: { W: 224, H: 176, parede: (R, C, W) => { R(0, 0, W, 52, '#5d3a8a'); R(0, 30, W, 22, '#7bd389'); for (let x = 0; x < W; x += 6)
            R(x, 30, 3, 3, '#5d3a8a'); R(20, 6, 10, 40, '#2a1d30'); R(21, 7, 8, 38, '#ffd36e'); R(23, 10, 4, 32, '#ff8a3d'); R(190, 6, 10, 40, '#2a1d30'); R(191, 7, 8, 38, '#8fcaff'); R(193, 10, 4, 32, '#f4f1ec'); },
        piso: ['#d9b88a', '#c9a878'],
        moveis: (o) => { o.vitrine(60, 54, 104, '#ead6ff', (R) => { for (let i = 0; i < 6; i++) {
            R(6 + i * 16, 8, 12, 8, '#2a1d30');
            R(7 + i * 16, 9, 10, 6, ['#e8c878', '#ffd36e', '#ff5c8d', '#f4f1ec', '#fff6c8', '#c08a4a'][i]);
        } }); o.coqueiro(196, 150); o.coqueiro(16, 150); o.mesaRedonda(70, 140, '#ffd36e'); o.mesaRedonda(154, 140, '#8fcaff'); },
        acao: { nome: 'Montar meu açaí', f: montarAcai }, staff: [112, 60], escuro: 0 },
    mercado: { W: 256, H: 208, parede: (R, C, W) => { R(0, 0, W, 52, '#fff1c2'); for (let sx = 6; sx < W - 40; sx += 50) {
            R(sx, 10, 46, 36, '#2a1d30');
            R(sx + 1, 11, 44, 34, '#cfe8ff');
            for (let k = 0; k < 3; k++)
                for (let i = 0; i < 40; i += 5)
                    R(sx + 3 + i, 13 + k * 11, 4, 8, ['#c8242e', '#ffd36e', '#7bd389', '#f4f1ec', '#5b8cff'][(i + k) % 5]);
        } },
        piso: ['#f4f1ec', '#e8e2d0'],
        moveis: (o) => { o.caixa(200, 150); [[30, 80], [30, 120], [120, 80], [120, 120]].forEach(([x, y]) => o.gondola(x, y)); o.frutas(206, 90); o.ponto('fruta', 206, 124, 'Pegar uma fruta', () => { falar(FEFE, pick(['Uma maçã bem vermelha!', 'Banana pro lanche', 'Morangos!']), 1600); nec('fome', 6); }); },
        acaoNoCaixa: true, staff: [220, 158], escuro: 0 },
    academia: { W: 256, H: 208, parede: (R, C, W) => { R(0, 0, W, 52, '#3a3a44'); R(8, 8, W - 16, 36, '#9fc8e8'); R(8, 8, W - 16, 2, '#fff'); for (let i = 0; i < 6; i++)
            R(20 + i * 40, 14, 2, 28, 'rgba(255,255,255,.25)'); },
        piso: ['#2a2a30', '#32323a'],
        moveis: (o) => {
            o.balcao(176, 58, 70, '#ff8a3d');
            o.esteira(30, 96);
            o.esteira(70, 96);
            o.halteres(130, 96);
            o.saco(210, 130);
            o.supino(60, 150);
            o.ponto('saco', 210, 162, 'Socar o saco de pancada', () => { shake = Math.max(shake, 4); som.pop(); falar(FEFE, pick(['TOMA!', 'Isso é por todas as segundas-feiras', '*soco* *soco*']), 1400); o.sacoBalanca = performance.now(); nec('diversao', 6); nec('energia', -4); });
            o.ponto('agua', 240, 96, 'Beber água', () => { falar(FEFE, 'Hidratação é tudo', 1500); nec('energia', 4); });
            o.bebedouro(234, 62);
        },
        staff: [210, 64], escuro: 0 },
};
window.construirLoja = function (obj) {
    const L = LOJAS[obj], D = LAYOUT[L.tipo] || LAYOUT.sorvete, W = D.W, H = D.H, PISO = 52, objs = [], cols = [], pts = [], dinam = [];
    const add = (nome, x, y, img, base, col, draw) => { objs.push({ nome, x, y, img, base: base != null ? base : y + img.height, draw }); if (col)
        cols.push(col); };
    const o = { filhotes: [],
        vitrine: (x, y, w, vidro, itensFn) => add('balcaoL', x, y, pinta(w, 28, (R) => { R(0, 0, w, 28, '#2a1d30'); R(1, 1, w - 2, 18, vidro); R(1, 1, w - 2, 3, 'rgba(255,255,255,.6)'); itensFn(R); R(1, 19, w - 2, 8, '#8a5a3a'); }), y + 28, { x, y: y + 10, w, h: 18 }),
        balcao: (x, y, w, cor) => add('balcaoL', x, y, pinta(w, 26, (R) => { R(0, 0, w, 26, '#2a1d30'); R(1, 1, w - 2, 8, cor); R(1, 1, w - 2, 2, 'rgba(255,255,255,.35)'); R(1, 9, w - 2, 16, '#5e3d2e'); for (let i = 8; i < w; i += 16)
            R(i, 11, 1, 13, 'rgba(0,0,0,.3)'); }), y + 26, { x, y: y + 10, w, h: 16 }),
        balcaoLateral: (x, y, cor) => add('balcaoLat', x, y, pinta(8, 64, (R) => { R(0, 0, 8, 64, '#2a1d30'); R(1, 1, 6, 62, cor); }), y + 64, { x, y, w: 8, h: 64 }),
        banco: (x, y, cor) => add('banqL' + x + y, x - 5, y - 8, pinta(10, 10, (R, C) => { C(5, 3, 4, '#2a1d30'); C(5, 3, 3, cor); R(4, 6, 2, 4, '#2a1d30'); }), y + 2, { x: x - 4, y: y - 4, w: 8, h: 5 }),
        mesaRedonda: (x, y, cor) => add('mesaR' + x, x - 12, y - 14, pinta(24, 18, (R, C) => { C(12, 7, 9, '#2a1d30'); C(12, 7, 8, cor); R(10, 14, 4, 4, '#2a1d30'); }), y + 3, { x: x - 9, y: y - 6, w: 18, h: 8 }),
        caixote: (x, y, i) => add('caixote' + i, x - 18, y - 16, pinta(36, 22, (R) => { R(0, 0, 36, 22, '#2a1d30'); R(1, 1, 34, 20, '#a8714a'); for (let k = 0; k < 6; k++) {
            R(3 + k * 5, 2, 4, 12, '#111');
            R(4 + k * 5, 4, 2, 2, ['#ff5c8d', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff', '#ff8a3d'][(k + i) % 6]);
        } R(1, 14, 34, 1, '#7a4f3a'); }), y + 6, { x: x - 18, y: y - 6, w: 36, h: 12 }),
        cabine: (x, y) => add('cabineL', x - 12, y, pinta(26, 30, (R) => { R(0, 0, 26, 30, '#2a1d30'); R(1, 1, 24, 28, '#3a1060'); R(4, 6, 18, 8, '#ffd36e'); R(8, 16, 10, 4, '#111'); R(6, 15, 3, 6, '#ff5c8d'); R(17, 15, 3, 6, '#ff5c8d'); }), y + 30, { x: x - 12, y: y + 14, w: 26, h: 16 }),
        objDraw: (nome, x, y, w, h, fn) => objs.push({ nome, x, y, img: pinta(w, h, () => { }), base: y + h, draw: (c, ob) => fn(c, ob.x, ob.y) }),
        estante: (x, y) => add('estante' + y, x, y - 26, pinta(110, 30, (R) => { R(0, 0, 110, 30, '#2a1d30'); R(1, 1, 108, 28, '#7a4f3a'); for (let k = 0; k < 2; k++) {
            for (let i = 0; i < 104; i += 4)
                R(3 + i, 3 + k * 13, 3, 10, ['#c8242e', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff', '#ff8a3d', '#f4f1ec'][(i + k * 5 + y) % 7]);
        } }), y + 4, { x, y: y - 8, w: 110, h: 12 }),
        poltrona: (x, y) => add('poltrona', x - 12, y - 20, pinta(24, 24, (R) => { R(0, 0, 24, 24, '#2a1d30'); R(1, 1, 22, 10, '#b8323f'); R(1, 11, 4, 12, '#b8323f'); R(19, 11, 4, 12, '#b8323f'); R(5, 11, 14, 10, '#d84a58'); R(18, -0, 2, 1, '#ffd36e'); }), y + 4, { x: x - 12, y: y - 6, w: 24, h: 10 }),
        gatoLoja: (x, y) => {
            const g = { x, y };
            objs.push({ nome: 'gatoLoja', x: x - 10, y: y - 20, img: pinta(20, 10, (R) => { R(0, 0, 20, 10, '#2a1d30'); for (let i = 0; i < 5; i++)
                    R(1 + i * 4, 1, 3, 8, ['#c8242e', '#5b8cff', '#ffd36e', '#7bd389', '#c08cff'][i]); }), base: y + 1, draw: (c, ob) => { c.drawImage(ob.img, ob.x, ob.y + 6); const gx = ob.x + 4, gy = ob.y - 4, r = (x, y, w, h, k) => { c.fillStyle = k; c.fillRect(gx + x, gy + y, w, h); }; r(0, 2, 13, 7, '#2a1d30'); r(1, 3, 11, 5, '#e6a050'); r(9, 0, 5, 5, '#2a1d30'); r(10, 1, 3, 3, '#e6a050'); r(9, -1, 1, 1, '#2a1d30'); r(13, -1, 1, 1, '#2a1d30'); r(3, 4, 1, 3, '#c8803a'); r(6, 4, 1, 3, '#c8803a'); r(-2, 6, 3, 2, '#2a1d30'); r(-1, 6, 2, 1, '#e6a050'); r(10, 2, 1, 1, '#2a1d30'); r(12, 2, 1, 1, '#2a1d30'); if (Math.random() < .008)
                    particula('zz', ob.x + 12, ob.y - 8); } });
            pts.push({ obj: 'gatoLoja', nome: 'Fazer carinho no gato da livraria', x, y: y + 12, acao: () => { particula('coracao', x, y - 18, 3); som.miau('lola', 1.2); falar(FEFE, 'Oi, gatinho de livraria ♥', 1600); setTimeout(() => toast('Ele se chama Machado. Ele ronrona baixinho.'), 800); nec('social', 5); } });
        },
        vaso: (x, y, i) => add('vaso' + x + y, x - 8, y - 22, pinta(16, 26, (R, C) => { R(3, 16, 10, 10, '#2a1d30'); R(4, 17, 8, 8, ['#c98f5f', '#d77fa1', '#8fcaff', '#e8d6a8'][i % 4]); for (let k = 0; k < 4; k++) {
            R(5 + k * 2, 6 + (k % 2) * 3, 1, 10, '#3f8a3a');
            C(5 + k * 2, 5 + (k % 2) * 3, 2, ['#ff5c8d', '#ffd36e', '#fff', '#c08cff', '#ff8a3d'][(i + k) % 5]);
        } }), y + 4, { x: x - 5, y: y - 4, w: 10, h: 6 }),
        chapa: (x, y) => objs.push({ nome: 'chapa', x, y, img: pinta(30, 12, () => { }), base: y + 12, draw: (c, ob) => { c.fillStyle = '#2a1d30'; c.fillRect(ob.x, ob.y, 30, 12); c.fillStyle = '#5a5a66'; c.fillRect(ob.x + 1, ob.y + 1, 28, 6); const t = performance.now() / 100; for (let i = 0; i < 4; i++) {
                c.fillStyle = ['#ff8a3d', '#ffd36e'][i % 2];
                c.fillRect(ob.x + 4 + i * 6, ob.y - 2 - Math.round(Math.abs(Math.sin(t + i)) * 3), 3, 3);
            } c.fillStyle = '#7a3a2a'; c.fillRect(ob.x + 5, ob.y + 2, 6, 3); c.fillRect(ob.x + 16, ob.y + 2, 6, 3); } }),
        cabine2: (x, y) => add('cab2' + x + y, x - 16, y - 14, pinta(32, 22, (R) => { R(0, 0, 32, 22, '#2a1d30'); R(1, 1, 30, 6, '#c8242e'); R(1, 15, 30, 6, '#c8242e'); R(6, 7, 20, 8, '#f4f1ec'); }), y + 8, { x: x - 16, y: y - 6, w: 32, h: 14 }),
        jukebox: (x, y) => {
            objs.push({ nome: 'jukebox', x: x - 10, y: y - 26, img: pinta(20, 30, () => { }), base: y + 4, draw: (c, ob) => { c.fillStyle = '#2a1d30'; c.fillRect(ob.x, ob.y, 20, 30); c.fillStyle = '#ff8a3d'; c.fillRect(ob.x + 1, ob.y + 1, 18, 28); c.fillStyle = '#ffd36e'; c.fillRect(ob.x + 3, ob.y + 3, 14, 10); const t = Math.floor(performance.now() / 200); for (let i = 0; i < 4; i++) {
                    c.fillStyle = ['#ff5c8d', '#5b8cff', '#7bd389', '#c08cff'][(i + t) % 4];
                    c.fillRect(ob.x + 3 + i * 4, ob.y + 16, 3, 10);
                } } });
            cols.push({ x: x - 10, y: y - 6, w: 20, h: 10 });
            pts.push({ obj: 'jukebox', nome: 'Colocar uma música na jukebox', x, y: y + 14, acao: () => { try {
                    if (musica)
                        pararMusica();
                    tocarMusica(pick(['lofi', 'bossa']));
                }
                catch (e) { } falar(FEFE, 'Essa é das boas!', 1600); particula('nota', x, y - 30, 4); if (ISI.aqui) {
                    setTimeout(() => { falar(ISI, 'Dança comigo?', 1500); dancar(5000); }, 1200);
                } setTimeout(() => { if (String(MAPA).startsWith('int_'))
                    pararMusica(); }, 10000); } });
        },
        coqueiro: (x, y) => add('coqL' + x, x - 12, y - 34, pinta(24, 38, (R, C) => { R(3, 26, 18, 12, '#2a1d30'); R(4, 27, 16, 10, '#c98f5f'); R(11, 10, 3, 17, '#8a5a3a'); [[-10, 0], [10, 0], [-7, -5], [7, -5]].forEach(([dx, dy]) => { for (let k = 0; k < 8; k++)
            R(12 + Math.round(dx * k / 8), 10 + Math.round(dy * k / 8) + Math.round(k * k / 20), 3, 2, '#4f9a5a'); }); }), y + 4, { x: x - 8, y: y - 4, w: 16, h: 6 }),
        caixa: (x, y) => add('balcaoL', x - 20, y - 12, pinta(48, 24, (R) => { R(0, 0, 48, 24, '#2a1d30'); R(1, 1, 46, 8, '#5b8cff'); R(1, 9, 46, 14, '#e8e2d0'); R(30, -0, 14, 8, '#2a1d30'); R(31, 1, 12, 6, '#7bd389'); }), y + 12, { x: x - 20, y: y - 2, w: 48, h: 14 }),
        gondola: (x, y) => add('gond' + x + y, x, y - 14, pinta(70, 22, (R) => { R(0, 0, 70, 22, '#2a1d30'); R(1, 1, 68, 20, '#e8e2d0'); for (let k = 0; k < 2; k++)
            for (let i = 2; i < 68; i += 5)
                R(i, 3 + k * 9, 4, 6, ['#c8242e', '#ffd36e', '#7bd389', '#5b8cff', '#ff8a3d'][(i + k + x) % 5]); }), y + 8, { x, y: y - 6, w: 70, h: 14 }),
        frutas: (x, y) => add('frutas', x - 16, y - 14, pinta(32, 20, (R, C) => { R(0, 8, 32, 12, '#2a1d30'); R(1, 9, 30, 10, '#a8714a'); for (let i = 0; i < 5; i++)
            C(5 + i * 6, 6, 3, ['#c8242e', '#ffd36e', '#ff8a3d', '#7bd389', '#ff5c8d'][i]); }), y + 6, { x: x - 16, y: y - 6, w: 32, h: 12 }),
        esteira: (x, y) => objs.push({ nome: 'esteira' + x, x, y, img: pinta(22, 32, () => { }), base: y + 32, draw: (c, ob) => { c.fillStyle = '#2a1d30'; c.fillRect(ob.x, ob.y, 22, 32); c.fillStyle = '#5b8cff'; c.fillRect(ob.x + 2, ob.y + 2, 18, 5); c.fillStyle = '#1d1d22'; c.fillRect(ob.x + 4, ob.y + 9, 14, 21); c.fillStyle = '#3a3a44'; for (let i = 0; i < 21; i += 4)
                c.fillRect(ob.x + 4, ob.y + 9 + ((i + performance.now() / 40) % 21), 14, 1); } }),
        halteres: (x, y) => add('halteres', x, y, pinta(40, 20, (R) => { R(0, 14, 40, 6, '#2a1d30'); R(1, 15, 38, 4, '#5a5a66'); for (let i = 0; i < 5; i++) {
            R(3 + i * 7, 6, 6, 8, '#2a1d30');
            R(4 + i * 7, 7, 4, 6, '#9aa0b0');
        } }), y + 20, { x, y: y + 8, w: 40, h: 12 }),
        saco: (x, y) => { objs.push({ nome: 'saco', x: x - 8, y: y - 30, img: pinta(16, 34, () => { }), base: y + 4, draw: (c, ob) => { const d = performance.now() - (o.sacoBalanca || 0), a = d < 1200 ? Math.sin(d / 80) * (1 - d / 1200) * 4 : 0; c.fillStyle = '#2a1d30'; c.fillRect(ob.x + 7, ob.y - 10, 2, 12); c.save(); c.translate(ob.x + 8, ob.y); c.rotate(a * .08); c.fillStyle = '#2a1d30'; c.fillRect(-7, 0, 14, 30); c.fillStyle = '#c8242e'; c.fillRect(-6, 1, 12, 28); c.fillStyle = '#e8434f'; c.fillRect(-6, 1, 3, 28); c.restore(); } }); cols.push({ x: x - 6, y: y - 6, w: 12, h: 8 }); },
        supino: (x, y) => add('supino', x - 20, y - 10, pinta(40, 16, (R) => { R(0, 0, 40, 3, '#2a1d30'); R(2, -0, 6, 8, '#5a5a66'); R(32, 0, 6, 8, '#5a5a66'); R(10, 6, 20, 6, '#2a1d30'); R(11, 7, 18, 4, '#3a3a44'); }), y + 6, { x: x - 20, y: y - 4, w: 40, h: 10 }),
        bebedouro: (x, y) => add('bebedouro', x - 6, y, pinta(12, 24, (R) => { R(0, 0, 12, 24, '#2a1d30'); R(1, 1, 10, 8, '#8fcaff'); R(1, 9, 10, 14, '#f4f1ec'); }), y + 24, { x: x - 6, y: y + 14, w: 12, h: 10 }),
        cercadinho: (x, y) => {
            objs.push({ nome: 'cercado', x, y, img: pinta(64, 30, () => { }), base: y + 30, draw: (c, ob) => {
                    c.fillStyle = '#e8d6a8';
                    c.fillRect(ob.x + 2, ob.y + 4, 60, 24);
                    o.filhotes.forEach((d, i) => { const t = performance.now() / 1000; if (!d.alvoT || t > d.alvoT) {
                        d.alvoT = t + 1 + Math.random() * 2;
                        d.tx = ob.x + 12 + Math.random() * 40;
                        d.ty = ob.y + 20 + Math.random() * 6;
                    } d.x += (d.tx - d.x) * .03; d.y += (d.ty - d.y) * .03; desenharCachorro(c, d, Math.round(d.x), Math.round(d.y), Math.abs(d.tx - d.x) > 1); });
                    c.fillStyle = '#2a1d30';
                    c.fillRect(ob.x, ob.y + 2, 64, 2);
                    c.fillRect(ob.x, ob.y + 28, 64, 2);
                    c.fillRect(ob.x, ob.y + 2, 2, 28);
                    c.fillRect(ob.x + 62, ob.y + 2, 2, 28);
                    for (let i = 6; i < 62; i += 6)
                        c.fillRect(ob.x + i, ob.y + 22, 1, 7);
                } });
            cols.push({ x, y: y + 2, w: 64, h: 28 });
            o.filhotes.push(Object.assign(novoCachorro({ x: x + 20, y: y + 22, raca: 'luluLaranja' }), { coleira: null }), Object.assign(novoCachorro({ x: x + 40, y: y + 22, raca: 'labAmarelo' }), { coleira: null }));
        },
        peixes: () => objs.push({ nome: 'peixes', x: 8, y: 10, img: pinta(100, 30, () => { }), base: -1, draw: (c) => { const t = performance.now() / 1000; [[8, 10], [60, 10]].forEach(([ax, ay], k) => { for (let i = 0; i < 3; i++) {
                const fx = ax + 6 + ((t * (8 + i * 3) + i * 15 + k * 7) % 34), fy = ay + 5 + i * 5 + Math.round(Math.sin(t * 2 + i) * 1);
                c.fillStyle = ['#ff8a3d', '#ffd36e', '#ff5c8d'][i];
                c.fillRect(Math.round(fx), fy, 4, 2);
                c.fillRect(Math.round(fx) - 1, fy, 1, 2);
            } }); } }),
        passarinho: (x, y) => objs.push({ nome: 'passaro', x, y, img: pinta(10, 8, () => { }), base: -1, draw: (c) => { const p = Math.floor(performance.now() / 400) % 3; c.fillStyle = '#2a1d30'; c.fillRect(x - 1, y - 1 + (p === 1 ? -1 : 0), 8, 6); c.fillStyle = '#ffd36e'; c.fillRect(x, y + (p === 1 ? -1 : 0), 6, 4); c.fillStyle = '#ff8a3d'; c.fillRect(x + 6, y + 1, 2, 1); if (p === 2 && Math.random() < .02)
                falar({ x: x + 3, y: y + 30, mapa: MAPA }, 'piu piu!', 800); } }),
        ponto: (nome, x, y, txt, f) => pts.push({ obj: nome, nome: txt, x, y, acao: f }),
    };
    const fundo = pinta(W, H, (R, C) => {
        for (let y = PISO; y < H; y += 8)
            for (let x = 0; x < W; x += 8)
                R(x, y, 8, 8, ((x + y) / 8) % 2 ? D.piso[0] : D.piso[1]);
        D.parede(R, C, W);
        R(0, 0, W, 3, '#2a1d30');
        R(0, PISO - 3, W, 3, 'rgba(0,0,0,.25)');
        R(0, PISO, W, 1, '#2a1d30');
        if (D.letreiro) {
            for (let i = 0; i < D.letreiro.length; i++)
                R(W / 2 - 26 + i * 9, 11, 6, 10, '#ffd36e');
        }
    });
    D.moveis(o);
    const A = ACOES_LOJA[obj], st = D.staff;
    const acaoPrincipal = D.acao ? D.acao.f : (A ? A.acao : null), nomeAcao = D.acao ? D.acao.nome : (A ? A.nome : 'Falar com o atendente');
    if (acaoPrincipal)
        pts.push({ obj: 'balcaoL', nome: nomeAcao, x: st[0], y: st[1] + (D.acaoNoCaixa ? 16 : 34), acao: acaoPrincipal });
    if (D.acao && A)
        pts.push({ obj: 'balcaoL2', nome: A.nome, x: st[0] + 30, y: st[1] + 34, acao: A.acao });
    objs.push({ nome: 'saida', x: W / 2 - 14, y: H - 10, img: pinta(28, 10, (R) => { R(0, 0, 28, 10, '#0c0a10'); R(2, 2, 24, 8, '#000'); R(0, 0, 28, 2, '#c9b8d6'); }), base: H - 9 });
    pts.push({ obj: 'saida', nome: 'Sair da loja', x: W / 2, y: H - 16, acao: () => trocarCena('cidade') });
    const luzes = (D.neon || []).concat(D.luzes || []);
    CENAS['int_' + L.id] = { OBJ: objs, COL: cols, PONTOS: pts, fundo, TW: W, TH: H, PISO_Y: 0, MUNDO: { x0: 8, x1: W - 8, y0: 82, y1: H - 6 }, entrada: [W / 2, H - 22],
        chegada: L.falasFefe || ['Que lugar fofo!'], chegadaSozinha: L.falasFefe || ['Que lugar fofo!'], bg: '#2a1d30', lojaObj: obj, escuro: D.escuro || 0, luzes: luzes.length ? luzes : undefined, staffPos: st };
};
const _construirNPCs39 = construirNPCs;
window.construirNPCs = function () {
    _construirNPCs39();
    if (!String(MAPA).startsWith('int_'))
        return;
    const C = CENAS[MAPA], st = C.staffPos;
    if (!st)
        return;
    const at = NPCS.find(n => n.nome === 'atendente');
    if (at) {
        at.x = st[0];
        at.y = st[1];
    }
};
let mapaAnt39 = null;
let pombos = [], musico = null;
const _cidadeDin39 = desenharCidadeDin;
window.desenharCidadeDin = function (lista) { _cidadeDin39(lista); desenharRuaViva(lista); };
Object.keys(CENAS).forEach(k => { if (k.startsWith('int_') && k !== MAPA)
    delete CENAS[k]; });
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'filhotes', ic: '🐶', n: 'Tia dos filhotes', d: 'Brincar com os filhotinhos do pet shop', ok: () => V('filhotes') });
