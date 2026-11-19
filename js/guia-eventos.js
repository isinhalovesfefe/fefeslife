const conqOk = id => { const c = CONQUISTAS.find(c => c.id === id); try {
    return c ? !!c.ok() : false;
}
catch (e) {
    return false;
} };
TAXA.fome = -4;
TAXA.alegria = -3;
TAXA.energia = -3;
const GUIA = [
    { g: 'Gatinhos', itens: [
            ['Fazer carinho num gatinho até ele amar', 'Toque num gato e passe o dedo nele', () => conqOk('chamego')],
            ['Dar banho num gatinho', 'Na tela de carinho, botão de banho', () => conqOk('banho')],
            ['A Clarinha deitar no seu colo', 'Ganhe a confiança dela aos pouquinhos e sente no tapete', () => conqOk('colo')],
            ['Os três gatos na cama com você', 'Deite na cama quando eles estiverem com sono', () => conqOk('montinho')],
            ['Brincar de laser com o Tho', 'Compre o laser na lojinha', () => V('laser')],
            ['Ganhar um presente de um gatinho', 'Eles trazem sozinhos, de vez em quando', () => V('presenteGato')],
            ['Tirar a primeira foto de um gatinho', 'Compre a câmera instantânea na lojinha', () => V('figurinha')],
            ['Completar o álbum de figurinhas', 'Tem poses raras: Tho de cabeça pra baixo, Lola de barriga pra cima e Clarinha sorrindo', () => V('albumCompleto')],
            ['Ver os olhinhos brilhando no escuro', 'À noite, apague a luz (e depois o abajur)', () => V('escuro')],
            ['Achar o Tho no esconde-esconde', 'Toque no Tho várias vezes rapidinho...', () => conqOk('esconde')],
        ] },
    { g: `Com a ${NOME_MINHA}`, itens: [
            [`Chamar a ${NOME_MINHA} pra casa`, 'No celular, em Conversas', () => !!(S.feitos && (S.feitos.abraco || S.feitos.beijo)) || V('abracoApertado')],
            ['Dar o abraço mais apertado do mundo', 'Fale com ela e segure o botão do abraço', () => V('abracoApertado')],
            [`Fazer a ${NOME_MINHA} dormir no seu colo`, 'Cafuné no colo, passando o dedo na cabeça dela', () => V('cafune')],
            ['Guerra de travesseiro', 'Fale com ela no quarto', () => V('travesseiro')],
            ['Noite de skincare', 'Máscara verde e unhas combinando', () => V('unhas') || V('mascara')],
            ['Pendurar um desenho na parede', 'Desenhar juntas', () => V('quadro')],
            ['Fazer um pedido pra uma estrela cadente', 'À noite, olhar as estrelas juntas', () => V('estrelas')],
            [`Achar um bilhetinho da ${NOME_MINHA}`, 'Eles aparecem escondidos pelo quarto de tempos em tempos', () => V('bilhete')],
            ['Videochamada', 'App Chamada no celular', () => V('chamada')],
        ] },
    { g: 'Casa e passeios', itens: [
            ['Cozinhar uma receita', 'Na cozinha (porta de baixo do quarto)', () => conqOk('chef')],
            ['Comer mordida por mordida', 'Peça comida no celular ou cozinhe', () => !!(S.feitos && (S.feitos.comida || S.feitos.comeuReceita))],
            ['Noite de jogos', 'Ligue a TV e escolha o videogame', () => conqOk('kart')],
            ['Ver um filme até o fim', 'Ligue a TV e escolha o filme', () => V('filme')],
            ['Escrever no diário', 'O caderninho roxo em cima da mesa', () => V('diario')],
            ['Dormir e sonhar', 'Deite na cama à noite', () => conqOk('sono')],
            ['Abrir a janela num dia de chuva', 'Só quando chove de verdade em Santos', () => V('chuva')],
            ['Reviver as memórias', 'App "Nós ♥" no celular', () => conqOk('memorias')],
            ['Achar a surpresa escondida do quarto', 'Tem algo nas janelas... ✨', () => conqOk('segredo')],
        ] },
];
$('btnAjuda').onclick = () => { if (!pertoAberto() && !modalAberto())
    abrirGuia(); };
$('btnAjuda').title = 'Guia';
TUTO.splice(TUTO.length - 1, 0, { texto: () => 'Essas barrinhas aqui em cima são da Fefe: fome, energia, diversão e carinho. Comer, dormir, brincar e ficar juntinho enchem elas. Toque no painel pra deixar ele menor.', botao: 'Entendi', brilho: 'necFefe' }, { texto: () => `Quando a ${NOME_MINHA} vem pra casa, dá pra fazer cafuné, dançar, cócegas, guerra de travesseiro, skincare, brincar com os gatos, olhar as estrelas... é só tocar nela.`, botao: 'Que fofo!' }, { texto: () => 'Perdeu alguma coisa? No botão "?" tem a lista de coisas pra descobrir no jogo.', botao: 'Ok!', brilho: 'btnAjuda' });
IMG_DECOR.pufe = pinta(22, 16, (R, C) => { R(1, 3, 20, 13, '#2a1d30'); R(0, 5, 22, 9, '#2a1d30'); R(2, 4, 18, 11, '#ff9ec4'); R(1, 6, 20, 7, '#ff9ec4'); R(2, 4, 18, 3, '#ffc2da'); R(2, 12, 18, 2, '#e07aa3'); R(10, 6, 2, 2, '#e07aa3'); });
IMG_DECOR.casinha = pinta(28, 26, (R) => { R(2, 8, 24, 18, '#2a1d30'); for (let i = 0; i < 9; i++)
    R(13 - i - 1, i, 2 * i + 4, 1, '#2a1d30'); for (let i = 1; i < 9; i++)
    R(13 - i, i, 2 * i + 2, 1, '#c8504e'); R(3, 9, 22, 16, '#e8c890'); R(3, 9, 22, 2, '#d4b070'); R(9, 13, 10, 12, '#2a1d30'); R(10, 14, 8, 11, '#3a2a3a'); R(11, 10, 6, 2, '#fff'); R(12, 11, 1, 1, '#c8504e'); R(15, 11, 1, 1, '#c8504e'); });
IMG_DECOR.suculentas = pinta(14, 14, (R) => { R(2, 7, 10, 7, '#2a1d30'); R(3, 8, 8, 5, '#d77fa1'); R(3, 8, 8, 1, '#f3c1d3'); [[4, 4], [7, 2], [9, 5], [5, 6], [8, 6]].forEach(([x, y]) => { R(x, y, 3, 3, '#2a1d30'); R(x + 1, y + 1, 1, 1, '#7bd389'); R(x, y + 1, 3, 1, '#5fbf5a'); }); });
IMG_DECOR.estrelinhas = pinta(30, 14, (R) => { [[2, 2], [12, 6], [22, 1], [26, 9], [7, 10]].forEach(([x, y]) => { R(x + 1, y, 1, 3, '#f0e8a0'); R(x, y + 1, 3, 1, '#f0e8a0'); }); });
LOJA.push({ id: 'pufe', aba: 'decor', n: 'Pufe rosa', preco: 22, desc: 'Fofinho pra sentar. A Lola vai roubar.' }, { id: 'casinha', aba: 'decor', n: 'Casinha de gato', preco: 35, desc: 'Uma casinha só deles (o Tho vai morar lá).' }, { id: 'suculentas', aba: 'decor', n: 'Vaso de suculentas', preco: 10, desc: 'Plantinhas que perdoam esquecimento.' }, { id: 'estrelinhas', aba: 'decor', n: 'Estrelinhas que brilham', preco: 18, desc: 'Adesivos na parede que brilham quando apaga a luz.' });
MOVEIS_MOVEIS.push('pufe', 'casinha', 'suculentas');
const _construirDecorOrig = construirDecor;
window.construirDecor = function () {
    _construirDecorOrig();
    if (MAPA !== 'quarto')
        return;
    const add = (nome, x, y, img, col, ponto) => { if (S.pos && S.pos[nome]) {
        x = S.pos[nome][0];
        y = S.pos[nome][1];
    } OBJ.push({ nome, x, y, img, base: y + img.height, decor: true }); if (col)
        COL.push(Object.assign({ decor: true, dono: nome }, col(x, y))); if (ponto)
        PONTOS.push(Object.assign({ obj: nome, decor: true }, ponto(x, y))); };
    if (tem('pufe'))
        add('pufe', 248, 140, IMG_DECOR.pufe, (x, y) => ({ x: x + 1, y: y + 8, w: 20, h: 7 }), (x, y) => ({ nome: 'Sentar no pufe', x: x + 11, y: y + 22, acao: () => {
                const o = OBJ.find(o => o.nome === 'pufe');
                FEFE.pose = 'tapete';
                FEFE.x = o.x + 11;
                FEFE.y = o.y + 12;
                FEFE.dir = 'down';
                FEFE.alvo = null;
                falar(FEFE, pick(['Que fofinho!', 'Pufe é vida', 'Ninguém me tira daqui']), 1800);
                nec('energia', 5);
                const l = G('lola');
                if (l && !S.gatos.lola.dormindo && Math.random() < .6)
                    setTimeout(() => falar(l, 'esse pufe é meu, mas tudo bem', 1800), 1200);
            } }));
    if (tem('casinha'))
        add('casinha', 14, 118, IMG_DECOR.casinha, (x, y) => ({ x: x + 2, y: y + 16, w: 24, h: 9 }), (x, y) => ({ nome: 'Espiar a casinha', x: x + 14, y: y + 34, acao: () => {
                const r = Math.random(), t = G('tho');
                if (r < .4 && t) {
                    t.estado = 'parado';
                    t.x = OBJ.find(o => o.nome === 'casinha').x + 14;
                    t.y = OBJ.find(o => o.nome === 'casinha').y + 28;
                    falar(t, 'BU! esta casa é minha agora', 1800);
                    som.miau('tho', 1.3);
                    setTimeout(() => zoomies(t, 1), 800);
                }
                else if (r < .7)
                    falar(FEFE, 'Tem uma meia aqui dentro... Lola?!', 1800);
                else
                    falar(FEFE, 'Vazia... por enquanto.', 1600);
            } }));
    if (tem('suculentas'))
        add('suculentas', 198, 196, IMG_DECOR.suculentas, null, (x, y) => ({ nome: 'Regar as suculentas', x: x + 7, y: y + 22, acao: () => { particula('agua', OBJ.find(o => o.nome === 'suculentas').x + 7, 196, 4); falar(FEFE, pick(['Bebam com moderação', 'Cresçam fortes, meninas']), 1600); nec('diversao', 3); } }));
};
const _escuroOrig = desenharEscuro24;
window.desenharEscuro24 = function () { _escuroOrig(); estrelinhasNoEscuro(); };
const NOVOS_ACC = {
    oculos: { n: 'Óculos escuros', preco: 16, cor: { O: '#1d1b22', L: '#5b6a8a' }, peq: { g: ["OOOO..OOOO", "OLLOOOOLLO", "OOOO..OOOO"], x: 2, y: 4 } },
    gravata: { n: 'Gravatinha borboleta', preco: 12, cor: { B: '#c8242e', b: '#8a1820' }, peq: { g: ["B..B", "BbbB", "B..B"], x: 5, y: 9 } },
    flor: { n: 'Florzinha', preco: 10, cor: { P: '#ff9ec4', Y: '#ffd36e' }, peq: { g: [".P.", "PYP", ".P."], x: 9, y: 0 } },
    cachecol: { n: 'Cachecol', preco: 18, cor: { S: '#ffd36e', s: '#e8a030' }, peq: { g: ["SSSSSSSS", "SsSsSsSs", "......SS", "......Ss"], x: 3, y: 9 } },
};
Object.entries(NOVOS_ACC).forEach(([id, a]) => {
    a.gde = { x: a.peq.x * 2 + 2, y: a.peq.y * 2, g: a.peq.g.flatMap(r => { const l = [...r].map(c => c + c).join(''); return [l, l]; }) };
    ACESSORIOS[id] = a;
    LOJA.push({ id, aba: 'gatos', n: a.n, preco: a.preco, desc: 'Serve em qualquer gato. Coloque na tela de carinho.' });
});
[
    { id: 'roupa_moletomrosa', n: 'Moletom rosa', preco: 22, desc: 'Quentinho e fofo.', cor: { T: '#ff9ec4', t: '#ffffff', A: '#ff9ec4', m: '#ff9ec4', J: '#4b5263', j: '#3a3f4d', B: '#f3f3f3' } },
    { id: 'roupa_macacao', n: 'Macacão jeans', preco: 24, desc: 'Estilo fazendinha.', cor: { T: '#f4f1ec', t: '#6a8cc0', J: '#6a8cc0', j: '#56749f', b: '#6a8cc0', B: '#2a2a30' } },
    { id: 'roupa_pijamagato', n: 'Pijama de gatinho', preco: 20, desc: 'Com estampinha de pata.', cor: { T: '#c8e8ff', t: '#ff9ec4', A: '#c8e8ff', m: '#c8e8ff', J: '#c8e8ff', j: '#a8cbe6', B: '#f3c1d3' } },
].forEach(r => { ROUPAS.push({ n: r.n, loja: r.id, cor: r.cor }); LOJA.push({ id: r.id, aba: 'roupas', n: r.n, preco: r.preco, desc: r.desc, roupa: ROUPAS.length - 1 }); });
const NEC_ISI = [{ k: 'fome', ic: '🍔', n: 'Fome', cor: '#ffb36b', cai: 30 }, { k: 'sono', ic: '⚡', n: 'Energia', cor: '#5b8cff', cai: 20 }, { k: 'carinho', ic: '💗', n: 'Carinho', cor: '#ff7aa8', cai: 24 }];
const PEDE_ISI = {
    fome: ['Amor, tô com fome... me dá um pedacinho de alguma coisa? 🥺', 'Bora comer? Minha barriga roncou', 'Pede uma pizza pra gente?'],
    sono: ['*boceja* tô com soninho... deita comigo?', 'Faz cafuné em mim? Tô com sono', 'Bora deitar um pouquinho?'],
    carinho: ['Me dá um abraço? 🥺', 'Cadê meu beijinho?', 'Tô carente... me dá atenção'],
};
let isiPedeT = 50, isiAqui0 = false;
const painelIsi = document.createElement('div');
painelIsi.className = 'px';
painelIsi.id = 'necIsi';
painelIsi.style.cssText = 'position:fixed;left:12px;z-index:5;padding:5px 10px 6px;display:none;flex-direction:column;gap:3px;font-size:12px;font-weight:700;color:#2a1d30;pointer-events:none';
(function () {
    const icone = ic => { const d = EMOJI_PX[ic], w = d ? d[0][0].length : 16, h = d ? d[0].length : 16, s = Math.min(18 / w, 15 / h); return `<img src="${urlEmoji(ic)}" style="width:${Math.round(w * s)}px;height:${Math.round(h * s)}px;image-rendering:pixelated;display:block;margin:0 auto">`; };
    painelIsi.innerHTML = `<b style="text-align:center;font-size:13px">${NOME_MINHA}</b>` + NEC_ISI.map(n => `<div style="display:grid;grid-template-columns:20px 58px 100px;gap:6px;align-items:center"><span>${icone(n.ic)}</span><span>${n.n}</span><div class="segs" id="necI_${n.k}"></div></div>`).join('');
})();
document.body.appendChild(painelIsi);
let necIsiUI = 0, cafuneDormiuVisto = false;
const _acaoIsiAntes = acaoIsinha;
window.acaoIsinha = function (a) {
    const ganho = { abraco: 22, beijo: 15, conversar: 6, selfie: 10, skincare: 10, desenhar: 12, estrelas: 15, travesseiro: 8, velha: 6, cafune: 5 };
    if (ganho[a])
        necIsi('carinho', ganho[a]);
    return _acaoIsiAntes(a);
};
let eventoT = 600 + Math.random() * 600, faltaLuz = null, trem = null, passarinho = null, encomenda = null;
const _atualizarEscuroOrig = atualizarEscuro;
window.atualizarEscuro = function () { if (faltaLuz)
    return; _atualizarEscuroOrig(); };
const CAMINHO_TREM = [[140, 120], [220, 120], [230, 170], [150, 180], [120, 150]];
const _fantasiaOrig = desenharFantasia;
window.desenharFantasia = function (c2d, id, x, y) {
    _fantasiaOrig(c2d, id, x, y);
    if (!ehAniversario())
        return;
    const cores = { lola: ['#ff7aa8', '#ffd36e'], clarinha: ['#8fcaff', '#fff'], tho: ['#c08cff', '#7bd389'] }[id];
    const L = [[3, 8], [4, 6], [5, 4], [6, 2]];
    L.forEach(([m, w], k) => { const yy = y - 1 - k * 2; c2d.fillStyle = '#2a1d30'; c2d.fillRect(x + m - 1, yy - 1, w + 2, 3); });
    L.forEach(([m, w], k) => { const yy = y - 1 - k * 2; c2d.fillStyle = k % 2 ? cores[1] : cores[0]; c2d.fillRect(x + m, yy, w, 2); });
    c2d.fillStyle = '#ffd36e';
    c2d.fillRect(x + 6, y - 10, 2, 2);
};
let festaT = null, festaRodando = false;
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'festa', ic: '🎂', n: 'Parabéns!', d: 'Assoprar as velinhas no seu aniversário', ok: () => V('festa') });
construirDecor();
