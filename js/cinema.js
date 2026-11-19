const GENEROS = [['romance', 'Romance 💕'], ['terror', 'Terror 👻'], ['animacao', 'Animação 🌈'], ['acao', 'Ação 💥'], ['ficcao', 'Ficção científica 🚀'], ['aventura', 'Aventura 🏴‍☠️']];
const REACOES_FILME = { romance: [[1, '*chorando* que lindo...'], [0, 'Você chora em tudo kkk']], terror: [[1, 'AAAAAH!'], [0, '*agarra o seu braço*']], animacao: [[0, 'KKKKKKK'], [1, 'Esse bichinho é a Lola!']],
    acao: [[0, 'BOOOM! Que explosão!'], [1, 'Ele vai conseguir? VAI?']], ficcao: [[1, 'Será que tem vida em outro planeta?'], [0, 'Aquele robô parece o Tho']], aventura: [[0, 'Eu quero morar num navio pirata'], [1, 'O tesouro era a amizade ♥']] };
const _cCinema = CONSTROI.cinema;
CONSTROI.cinema = () => { _cCinema(); const C = CENAS.cinema; const tela = C.OBJ.find(o => o.nome === 'tela'); if (tela)
    tela.draw = telaCinema; const p = C.PONTOS.find(p => p.nome === 'Sentar pra ver o filme'); if (p)
    p.acao = escolherFilmeCinema; };
if (CENAS.cinema)
    delete CENAS.cinema;
const _construirNPCs38 = construirNPCs;
window.construirNPCs = function () {
    _construirNPCs38();
    if (MAPA !== 'cinema')
        return;
    NPCS = [];
    const f = Math.max(.35, fatorMovimento());
    NPCS.push(novaPessoa({ x: 36, y: 170, dir: 'down', tipo: 'parado', nome: 'pipoqueiro', falas: ['Pipoca doce ou salgada?', 'Hoje tem promoção de combo!', saudacao()] }));
    const LIN = [84, 108, 132, 156], blocos = [[22, 88], [146, 88]];
    LIN.forEach((y, li) => blocos.forEach(([bx, bw], bi) => {
        for (let s = 0; s < bw / 11; s++) {
            const sx = bx + s * 11;
            if (li === 0 && bi === 1 && s < 3)
                continue;
            if (Math.random() > f * .42)
                continue;
            const n = novaPessoa({ x: sx + 5.5, y: y + 4, dir: 'up', tipo: 'parado' });
            n.cine = { y };
            n.semFala = true;
            NPCS.push(n);
        }
    }));
    for (let i = 0; i < Math.round(f * 3); i++) {
        const p = pontoLivreCena();
        if (p && p[1] > 160)
            NPCS.push(novaPessoa({ x: p[0], y: p[1], tipo: 'passeia', vel: 14, falas: ['Shhh! Vai começar!', 'Pipoca grande, por favor', 'Esse filme é muito bom'] }));
    }
};
const _desenharNPCs38 = desenharNPCs;
window.desenharNPCs = function (lista) {
    if (MAPA !== 'cinema' || npcMapa !== MAPA)
        return _desenharNPCs38(lista);
    const todos = NPCS;
    NPCS = todos.filter(n => !n.cine);
    try {
        _desenharNPCs38(lista);
    }
    finally {
        NPCS = todos;
    }
    const ag = performance.now() / 1000, susto = filme === 'terror' && Math.floor(ag * 5) % 23 < 2;
    todos.forEach((n, i) => {
        if (!n.cine)
            return;
        const y = n.cine.y;
        lista.push({ b: y + 8, f: () => {
                const im = n.fr.up[0], pulo = susto ? 2 : (filme === 'acao' && Math.floor(ag * 3 + i) % 9 === 0 ? 1 : 0);
                ctx.drawImage(im, 0, 0, 16, 14, Math.round(n.x) - 8, y + 4 - 14 - pulo, 16, 14);
                if (filme === 'romance' && Math.random() < .002)
                    particula('coracao', n.x, y - 12);
                if (filme === 'animacao' && Math.random() < .0015)
                    falar(n, 'kkkkk', 900);
            } });
    });
};
