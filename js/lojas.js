const HOMEM_FRENTE_L = [
    "...OO.OO", "..OHHOHH", ".OHHhHHH", ".OHhHHHH", "OHHHHHhH", "OHHHHHHH", "OHSHHSHH", ".OSSSSSS", ".OSSESSS", ".OSSESSS", ".OsSSSSS", "..OSSSSS", "...OSSSS", "....OsSS",
    "..OOCCTT", ".OAACCTG", ".OAACcTG", ".OAOCcTG", ".OAOCcTT", ".OSOCcTT", ".OOOKKKK", "...OJJJJ", "...OJJJJ", "...OJJJO", "...OBBBO", "...OOOO."
];
const HOMEM_COSTAS_L = [
    "...OO.OO", "..OHHOHH", ".OHHhHHH", ".OHhHHHH", "OHHHHHhH", "OHHHHHHH", "OHHHHHHH", ".OHHHHHH", ".OHHHHHH", ".OHHHhHH", ".OHHHHHH", "..OHHHHH", "...OSSSS", "....OsSS",
    "..OOCCCC", ".OAACCCC", ".OAACCcC", ".OAOCCcC", ".OAOCCCC", ".OSOCCCC", ".OOOKKKK", "...OJJJJ", "...OJJJJ", "...OJJJO", "...OBBBO", "...OOOO."
];
const HOMEM_LADO = [
    "......OO.OO.....", ".....OHHOHHO....", "....OHHhHHHHO...", "...OHHHHHHhHO...", "...OHHHHHHHHHO..", "...OHHHHHHHSHO..", "...OHHHHHSSSSO..", "...OHHHHSSSSSO..",
    "...OHHHHSSSESO..", "...OHHHSSSSESO..", "....OHHSSSSSSSO.", "....OHSSSSSsO...", ".....OSSSSSO....", "......OsSSO.....",
    ".....OCCCTTO....", "....OCCCCTTO....", "....OACCCcTO....", "....OACCcCTO....", "....OACCcCTO....", "....OSOCCCCO....", ".....OKKKKKO....", "......OJJJJO....", "......OJJJJO....", "......OJJJJO....", "......OBBBBBO...", "......OOOOOOO..."
];
const HOMEM_LADO_PASSO = HOMEM_LADO.slice(0, 21).concat(["....OJJO.OJJO...", "....OJJO.OJJO...", "...OJJO...OJJO..", "...OBBBO..OBBBO.", "...OOOOO..OOOOO."]);
let _gradesHomem = null;
const ESTILOS_HOMEM = [
    { n: 'camiseta', p: () => { const c = pick(ROUPA_NPC); return { A: c, C: c, c: c, T: c, G: c }; } },
    { n: 'jaqueta', p: () => { const c = pick(['#5e3d2e', '#2a2a30', '#4b5263', '#6a3a2a', '#3a4a6a']), t = pick(['#f4f1ec', '#ffd36e', '#8fcaff']); return { A: c, C: c, c: '#1d1b22', T: t, G: pick([t, '#c8242e', '#2a2a30']) }; } },
    { n: 'colete', p: () => { const c = pick(['#8a8d96', '#4b5263', '#5e3d2e', '#2f5a3a']), t = pick(['#f4f1ec', '#c8e8ff', '#ffe3b8']); return { A: t, C: c, c: '#2a2a30', T: t, G: pick(['#c8242e', '#2a2a30', t]) }; } },
    { n: 'terno', p: () => { const c = pick(['#ffd36e', '#2a2a30', '#5b6fa8', '#c8242e']); return { A: c, C: c, c: '#1d1b22', T: '#f4f1ec', G: pick(['#2a2a30', '#c8242e', '#5b8cff']) }; } },
];
window.baseMasculina = function (barba) {
    const G = gradesHomem(), M = {}, topete = Math.random() < .7;
    ['down', 'up', 'left', 'right'].forEach(d => M[d] = G[d].map(g => { let x = g; if (!topete)
        x = semTopete(x); if (barba && d !== 'up')
        x = comBarba(x); return x; }));
    return M;
};
const _novaPessoa36 = novaPessoa;
window.novaPessoa = function (o = {}) {
    const masc = o.masc != null ? o.masc : Math.random() < .5;
    if (!masc)
        return _novaPessoa36(Object.assign({}, o, { masc: false }));
    const base = baseMasculina(Math.random() < .35), pele = o.pele || pick(PELE_NPC), cab = o.cabelo || pick(CABELO_HOMEM), est = pick(ESTILOS_HOMEM).p(), cal = o.calca || pick(CALCA_NPC);
    if (o.top) {
        est.C = o.top;
        est.A = o.top;
        est.T = o.estampa || o.top;
        est.G = o.estampa || o.top;
    }
    const pal = { O: '#1f1418', H: cab[0], h: cab[1], S: pele[0], s: pele[1], E: '#2a1d30', K: '#2a1d30', J: cal[0], j: cal[1], B: pick(['#2a2a30', '#5e3d2e', '#1d1b22', '#f3f3f3']), W: '#fff', ...est };
    const fr = {};
    ['down', 'up', 'left', 'right'].forEach(d => fr[d] = base[d].map(g => gridCanvas(g, pal)));
    return { fr, x: o.x || 0, y: o.y || 0, dir: o.dir || 'down', anda: false, t: Math.random() * 5, tipo: o.tipo || 'passeia', mapa: o.mapa || MAPA, vel: o.vel || 22, pausa: Math.random() * 3, falas: o.falas || null, ultFala: 0, corte: o.corte || 0, pula: !!o.pula, rota: o.rota || null, ri: 0, bandeja: !!o.bandeja, nome: o.nome || '', masc: true };
};
let aPe = false;
(function () {
    const p = PONTOS.find(p => p.obj === 'porta') || (CENAS.quarto && CENAS.quarto.PONTOS || []).find(p => p.obj === 'porta');
    const acao = () => {
        abrir('Pra onde?', `<div class="grade"><button class="px" id="irCozinha">🍳<br>Cozinha</button><button class="px" id="irPe">🚶<br>Sair a pé</button><button class="px" id="irBike">🚲<br>Andar de bike</button></div>`);
        $('irCozinha').onclick = () => { fechar(); trocarCena('cozinha'); };
        $('irPe').onclick = () => { fechar(); aPe = true; trocarCena('cidade'); };
        $('irBike').onclick = () => { fechar(); aPe = false; trocarCena('cidade'); };
    };
    if (p)
        p.acao = acao;
    window._acaoPortaNova = acao;
    const st = document.createElement('style');
    st.textContent = '#irPe img.pxe{height:34px;margin:2px auto 4px;display:block}';
    document.head.appendChild(st);
})();
const LOJAS = {
    sorvC: { id: 'sorvete', n: 'Sorveteria', parede: '#ffe3ec', piso: ['#ffffff', '#ffc2da'], h: [10, 22], staff: 'Bem-vindas! Qual sabor hoje?', clientes: ['Esse de pistache é o melhor', 'Vou de chocolate, sempre'], tipo: 'sorvete' },
    discos: { id: 'discos', n: 'Loja de discos', parede: '#2e2a48', piso: ['#5e3d2e', '#4a3024'], h: [10, 20], staff: 'Chegou vinil novo ali na prateleira!', clientes: ['Esse disco é raridade', 'Escuta esse aqui!'], tipo: 'discos' },
    padaria: { id: 'padaria', n: 'Padaria', parede: '#fff1c2', piso: ['#f0dcb0', '#e2c890'], h: [6, 20], staff: 'Pão quentinho saindo agora!', clientes: ['Me vê um café pingado', 'Seis pãezinhos, por favor'], tipo: 'padaria' },
    petshop: { id: 'pet', n: 'Pet shop', parede: '#d6f5d6', piso: ['#f4f1ec', '#dfe8df'], h: [8, 19], staff: 'Como estão as gatinhas e o Tho?', clientes: ['Meu cachorro ama esse petisco', 'Vim dar banho no meu dog'], tipo: 'pet' },
    livraria: { id: 'livraria', n: 'Livraria', parede: '#f6e6d0', piso: ['#a8714a', '#94603c'], h: [9, 21], staff: 'Fique à vontade pra folhear', clientes: ['Esse livro é lindo', '*lendo em silêncio*'], tipo: 'livraria' },
    flores: { id: 'flores', n: 'Floricultura', parede: '#e2f5e0', piso: ['#f4f1ec', '#e0ece0'], h: [8, 19], staff: 'Os girassóis chegaram hoje!', clientes: ['Vou levar umas rosas', 'Que cheirinho bom'], tipo: 'flores' },
    burger: { id: 'burger', n: 'Hamburgueria', parede: '#ffe3b8', piso: ['#ffffff', '#e8434f'], h: [11, 24], staff: 'O de sempre, X-tudo?', clientes: ['Que hambúrguer gigante', 'Pede batata também!'], tipo: 'burger' },
    acai: { id: 'acai', n: 'Açaíteria', parede: '#ead6ff', piso: ['#f4f1ec', '#d8c2f0'], h: [10, 22], staff: 'Monta o seu açaí do jeitinho que quiser!', clientes: ['Com bastante granola', 'Açaí é vida'], tipo: 'acai' },
    mercado: { id: 'mercado', n: 'Mercadinho', parede: '#fff1c2', piso: ['#f4f1ec', '#e8e2d0'], h: [7, 22], staff: 'Achou tudo que precisava?', clientes: ['Cadê o leite?', 'Tá tudo em promoção hoje'], tipo: 'mercado' },
    academia: { id: 'academia', n: 'Academia', parede: '#d0d0d8', piso: ['#3a3a44', '#32323a'], h: [6, 23], staff: 'Bora treinar! Água tá ali no canto', clientes: ['Mais uma série!', '*ufa ufa*'], tipo: 'academia' },
};
const ACOES_LOJA = {};
let portaLoja = null, isiAntesLoja = false, mapaAnt37 = null;
Object.entries(LOJAS).forEach(([obj, L]) => { HORARIOS['int_' + L.id] = [L.h[0], L.h[1], `${L.n} abre às ${L.h[0]}h`, `${L.n} já fechou por hoje`]; CONSTROI['int_' + L.id] = () => construirLoja(obj); });
const _trocarCena37 = trocarCena;
window.trocarCena = function (nome) {
    if (nome === 'cidade') {
        const C = CENAS.cidade;
        if (C) {
            if (String(MAPA).startsWith('int_') && portaLoja)
                C.entrada = portaLoja;
            else
                C.entrada = [185, 296];
        }
    }
    return _trocarCena37(nome);
};
const _construirNPCs37 = construirNPCs;
window.construirNPCs = function () {
    _construirNPCs37();
    if (!String(MAPA).startsWith('int_'))
        return;
    const C = CENAS[MAPA], L = LOJAS[C.lojaObj];
    NPCS = [];
    NPCS.push(novaPessoa({ x: 112, y: 62, dir: 'down', tipo: 'parado', nome: 'atendente', falas: [L.staff, saudacao(), 'Precisando, é só chamar'] }));
    const f = fatorMovimento(), n = Math.round(1 + f * 2);
    for (let i = 0; i < n; i++) {
        const p = pontoLivreCena();
        if (p)
            NPCS.push(novaPessoa({ x: p[0], y: p[1], tipo: 'passeia', vel: 12, falas: L.clientes }));
    }
};
