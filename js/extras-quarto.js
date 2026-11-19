let ultimo = performance.now();
let shake = 0, tvLigada = false, travT = 35, thoTaps = [], caosAte = 0, esconde = null, dormindoAgora = false;
const marcos = () => S.marcos || (S.marcos = {});
const btnDormir = document.createElement('button');
btnDormir.id = 'btnDormir';
btnDormir.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:6;display:none;font:inherit;font-weight:700;font-size:15px;padding:9px 18px;background:#5b4a8a;color:#fff;border:none;box-shadow:0 0 0 3px #2a1d30,inset 0 -4px 0 rgba(0,0,0,.25);cursor:pointer';
document.body.appendChild(btnDormir);
btnDormir.onpointerdown = e => e.stopPropagation();
btnDormir.onclick = e => { e.stopPropagation(); audio(); dormirJuntas(); };
const coracaoPx = (x, cor, X, Y, s = 1) => { x.fillStyle = cor; [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]].forEach(([a, b]) => x.fillRect(Math.round(X + a * s), Math.round(Y + b * s), s, s)); };
const SONHOS = [
    { n: 'Voando sobre a cidade', conto: 'a gente voava por cima da cidade, de mãos dadas, com os gatos atrás!', f: (x, t) => {
            x.fillStyle = '#1d1838';
            x.fillRect(0, 0, 128, 80);
            x.fillStyle = '#2c2558';
            x.fillRect(0, 40, 128, 40);
            for (let i = 0; i < 30; i++) {
                x.fillStyle = (i + Math.floor(t * 3)) % 7 ? '#fff' : '#ffd36e';
                x.fillRect((i * 37) % 128, (i * 13) % 40, 1, 1);
            }
            x.fillStyle = '#f4ecd0';
            x.fillRect(105, 7, 6, 10);
            x.fillRect(104, 8, 8, 8);
            x.fillStyle = '#1d1838';
            x.fillRect(108, 7, 5, 9);
            x.fillRect(107, 8, 6, 7);
            for (let i = 0; i < 12; i++) {
                const bx = ((i * 14 - t * 18) % 168 + 168) % 168 - 20, h = 18 + ((i * 7) % 4) * 7;
                x.fillStyle = i % 2 ? '#2a2235' : '#35294a';
                x.fillRect(Math.round(bx), 80 - h, 13, h);
                for (let wy = 80 - h + 3; wy < 77; wy += 5)
                    for (let wx = 2; wx < 11; wx += 4) {
                        x.fillStyle = ((i + wy + wx) % 3) ? '#ffd36e' : '#4a3a5a';
                        x.fillRect(Math.round(bx) + wx, wy, 2, 2);
                    }
            }
            const b = Math.sin(t * 2) * 3;
            x.drawImage(fefeSpr.right[0], 44, 18 + b);
            if (ISI.aqui || true)
                x.drawImage(isiSpr.right ? isiSpr.right[0] : isiSpr.frente, 58, 16 - b);
            gatoPequeno(x, 'lola', 'feliz', 22, 30 + Math.sin(t * 2 + 1) * 3);
            gatoPequeno(x, 'clarinha', 'feliz', 8, 22 + Math.sin(t * 2 + 2) * 3);
            gatoPequeno(x, 'tho', 'feliz', 30 + Math.sin(t * 3) * 6, 10 + Math.cos(t * 3) * 4);
            if (Math.floor(t * 4) % 3 === 0)
                coracaoPx(x, '#ff7aa8', 57, 12 - b);
        } },
    { n: 'A Lola gigante', conto: 'a Lola era do tamanho de um prédio e a gente dormia em cima dela!', f: (x, t) => {
            x.fillStyle = '#ffd9e6';
            x.fillRect(0, 0, 128, 80);
            x.fillStyle = '#ffc0d6';
            for (let i = 0; i < 8; i++)
                x.fillRect((i * 19 + Math.floor(t * 4)) % 128, (i * 11) % 60, 6, 3);
            x.fillStyle = '#8fd18a';
            x.fillRect(0, 68, 128, 12);
            const c = GATOS.lola, im = spr(gatoPixels(c.tipo, Math.floor(t) % 4 === 0 ? 'dormindo' : 'feliz', false), c.cor, 'g_sonho_lola' + (Math.floor(t) % 4 === 0));
            x.imageSmoothingEnabled = false;
            const s = 4.4 + Math.sin(t * 1.5) * .15;
            x.drawImage(im, 64 - 7 * s, 68 - 14 * s, 14 * s, 14 * s);
            x.drawImage(fefeSpr.right[0], 8, 44);
            x.drawImage(isiSpr.left ? isiSpr.left[0] : isiSpr.frente, 104, 44);
            for (let i = 0; i < 3; i++) {
                const y = (60 - ((t * 14 + i * 20) % 60));
                coracaoPx(x, '#ff5c8d', 20 + i * 40, y);
            }
            if (Math.floor(t * 2) % 2) {
                x.fillStyle = '#2a1d30';
                x.font = '6px monospace';
                x.fillText('PRRRRR', 88, 20);
            }
        } },
    { n: 'Um mar de gatinhos', conto: 'tinha um mar inteiro de gatinhos e a gente navegava num barquinho!', f: (x, t) => {
            x.fillStyle = '#8fcaff';
            x.fillRect(0, 0, 128, 80);
            x.fillStyle = '#fff';
            x.fillRect((t * 6) % 160 - 20, 10, 20, 4);
            x.fillRect((t * 4 + 70) % 160 - 20, 20, 14, 3);
            const ids = ['lola', 'tho', 'clarinha'];
            for (let r = 0; r < 4; r++)
                for (let i = 0; i < 11; i++) {
                    const X = ((i * 14 + r * 7 - t * (6 + r * 2)) % 154 + 154) % 154 - 14, Y = 40 + r * 10 + Math.sin(t * 2 + i + r) * 2;
                    gatoPequeno(x, ids[(i + r) % 3], 'feliz', X, Y);
                }
            const b = Math.sin(t * 2) * 2;
            x.fillStyle = '#8a5a3a';
            x.fillRect(46, 40 + b, 36, 6);
            x.fillStyle = '#6a4430';
            x.fillRect(50, 46 + b, 28, 3);
            x.fillStyle = '#fff';
            x.fillRect(63, 14 + b, 1, 26);
            x.fillStyle = '#ff9ec4';
            x.fillRect(64, 16 + b, 12, 14);
            x.drawImage(fefeSpr.down[0].width ? fefeSpr.down[0] : fefeSpr.sentada, 48, 18 + b);
            x.drawImage(isiSpr.frente, 66, 18 + b);
        } },
    { n: 'Um show só pra nós duas', conto: 'a gente tocava num show gigante e a plateia era só gato!', f: (x, t) => {
            x.fillStyle = '#140f1a';
            x.fillRect(0, 0, 128, 80);
            x.fillStyle = '#3a2f44';
            x.fillRect(0, 44, 128, 10);
            x.fillStyle = '#2a1d30';
            x.fillRect(0, 54, 128, 26);
            const cores = ['rgba(255,122,168,.25)', 'rgba(143,202,255,.25)', 'rgba(255,211,110,.25)'];
            for (let i = 0; i < 3; i++) {
                const ox = 20 + i * 44 + Math.sin(t * 1.5 + i) * 14;
                x.fillStyle = cores[i];
                x.beginPath();
                x.moveTo(20 + i * 44, 0);
                x.lineTo(ox - 14, 46);
                x.lineTo(ox + 14, 46);
                x.fill();
            }
            const d = Math.floor(t * 4) % 2;
            x.drawImage(fefeSpr.down[0], 46, 18 + d);
            x.drawImage(isiSpr.feliz || isiSpr.frente, 64, 18 - d + 1);
            ['lola', 'tho', 'clarinha', 'tho', 'lola', 'clarinha', 'lola'].forEach((id, i) => gatoPequeno(x, id, 'feliz', 4 + i * 17, 60 + ((i + d) % 2)));
            for (let i = 0; i < 4; i++) {
                x.fillStyle = ['#ffd36e', '#ff7aa8', '#8fcaff', '#7cff6a'][i];
                const y = 40 - ((t * 12 + i * 11) % 40);
                x.fillRect(30 + i * 22, y, 2, 4);
                x.fillRect(32 + i * 22, y, 2, 1);
            }
            x.fillStyle = '#ffd36e';
            x.font = '6px monospace';
            x.fillText('★ SÓ PRA VOCÊ ★', 30, 8);
        } },
    { n: 'Chuva de corações', conto: 'choveu coração a noite inteira e os gatos tentavam pegar!', f: (x, t) => {
            x.fillStyle = '#c08cff';
            x.fillRect(0, 0, 128, 80);
            x.fillStyle = '#d9b0ff';
            x.fillRect(0, 0, 128, 30);
            x.fillStyle = '#ffb0d0';
            x.fillRect(0, 62, 128, 18);
            for (let i = 0; i < 22; i++) {
                const X = (i * 29) % 128, Y = ((t * (16 + i % 5 * 4) + i * 17) % 90) - 10;
                coracaoPx(x, i % 3 ? '#ff5c8d' : '#fff', X, Y, i % 4 ? 1 : 2);
            }
            x.drawImage(fefeSpr.down[0], 46, 38);
            x.drawImage(isiSpr.feliz || isiSpr.frente, 62, 38);
            const j = Math.abs(Math.sin(t * 3)) * 8;
            gatoPequeno(x, 'tho', 'feliz', 18, 52 - j);
            gatoPequeno(x, 'lola', 'feliz', 88, 52);
            gatoPequeno(x, 'clarinha', 'feliz', 104, 52 - Math.abs(Math.sin(t * 2 + 1)) * 3);
        } },
];
const TRAVESSURAS = {
    meia: { n: 'a meia', cor: { O: '#2a1d30', W: '#f4f0ff', R: '#ff5c8d' }, g: ["..OOOO..", ".OWRWRO.", ".OWWWWOO", "..OOWWWO", "....OOO."], x: 3, y: -3 },
    xuxinha: { n: 'a xuxinha', cor: { O: '#2a1d30', P: '#ff9ec4', p: '#c95d8a' }, g: [".OPO.", "OPpPO", ".OPO."], x: 9, y: -1 },
    folha: { n: 'a folha', cor: { G: '#5fbf5a', g: '#2f7a3a' }, g: ["....GG", "..GGgG", ".GGgG.", "GgG...", "g....."], x: 5, y: -3 },
    caixinha: { n: 'a caixinha', cor: { O: '#2a1d30', K: '#d9a066', k: '#a8723e' }, g: ["OOOOOOOO", "OKKKKKKO", "OKkkkkKO", "OKKKKKKO", "OOOOOOOO"], x: 3, y: -4 },
};
const FALA_TRAV = {
    meia: id => `${GATOS[id].nome.toUpperCase()}, isso é a minha meia?!`,
    xuxinha: () => 'Minha xuxinha! Eu tava procurando!',
    folha: () => 'Você rolou na monstera de novo?',
    caixinha: () => 'Por que tem uma caixa na sua cabeça?!',
};
const RESP_TRAV = { tho: ['Sou um chapéu agora.', 'Achei. É meu.', 'Eu tô lindo, aceita.'], lola: ['Tô na moda!', 'Combinei com você!', 'Linda, né?'], clarinha: ['...não comenta.', 'Foi um acidente.', '...'] };
const ESCONDERIJOS = [
    { n: 'debaixo da cama', x: 62, y: 106, hx: 52, hy: 101, achou: 'Debaixo da cama! Clássico.' },
    { n: 'no armário', x: 322, y: 68, hx: 338, hy: 59, achou: 'No meio das minhas roupas, Tho?!' },
    { n: 'atrás da vitrola', x: 252, y: 70, hx: 268, hy: 63, achou: 'Atrás da vitrola, espertinho.' },
    { n: 'atrás da monstera', dono: 'monstera', x: 306, y: 220, hx: 344, hy: 229, achou: 'Camuflado na planta!' },
    { n: 'debaixo da mesa', x: 104, y: 72, hx: 100, hy: 65, achou: 'Debaixo da mesa!' },
    { n: 'atrás do arranhador', dono: 'arranhador', x: 312, y: 172, hx: 342, hy: 163, achou: 'Atrás do arranhador, óbvio.' },
    { n: 'na caixinha de areia', dono: 'areia', x: 48, y: 212, hx: 30, hy: 212, achou: 'THO. Na caixa de areia?!' },
    { n: 'atrás da TV', dono: 'tv', x: 176, y: 120, hx: 197, hy: 107, achou: 'Atrás da TV! Por isso tava quentinha.' },
];
