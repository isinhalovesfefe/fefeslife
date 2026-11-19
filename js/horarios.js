(function () {
    const st = document.createElement('style');
    st.textContent = `
  .necMini2{width:74px !important} .necMini2 i{height:6px !important}
  #necFefe,#necIsi{padding:4px 7px 5px !important;font-size:11px !important}
  #necFefe .lin,#necIsi .lin{grid-template-columns:15px 74px !important;gap:5px !important}
  #necFefe .tit,#necIsi .tit{font-size:10px !important}
  #necFefe .lin img,#necIsi .lin img{transform:scale(1.15)}`;
    document.head.appendChild(st);
})();
const HORARIOS = { cafe: [9, 22, 'O café abre às 9h ☕', 'O café já fechou, abre amanhã às 9h ☕'], cinema: [13, 24, 'O cinema abre às 13h 🎬', 'O cinema já fechou 🎬'] };
const _trocarCenaHora = trocarCena;
window.trocarCena = function (nome) {
    if (HORARIOS[nome] && !estaAberto(nome)) {
        const H = HORARIOS[nome], h = horaAgora();
        toast(h < H[0] ? H[2] : H[3]);
        falar(FEFE, pick(['Ah, tá fechado...', 'Poxa, fechado!', 'Fica pra outra hora']), 1800);
        if (ISI.aqui)
            setTimeout(() => falar(ISI, 'A gente volta outro dia ♥', 1600), 900);
        return;
    }
    return _trocarCenaHora(nome);
};
const SO_DE_DIA = /sol|dia lindo|dia bonito|dia bom|calor|protetor|bora pra água|dia de praia/i;
const FALAS_NOITE = ['Boa noite!', 'Que noite gostosa', 'Olha a lua!', '*passeando tranquilo*', 'Tá fresquinho hoje'];
const _cParque = CONSTROI.parque, _cCidade = CONSTROI.cidade;
CONSTROI.parque = () => { _cParque(); chegadaDaHora('parque', { chegada: ['Que dia lindo!', 'Olha os patinhos!'] }, { chegada: ['Que noite gostosa', 'O parque fica lindo à noite', 'Olha os vaga-lumes!'] }); };
CONSTROI.cidade = () => { _cCidade(); chegadaDaHora('cidade', { chegada: ['Bora pedalar!', 'Cuidado com os carros, amor!'], chegadaSozinha: ['Bora pedalar!', 'Que dia bom pra andar de bike'] }, { chegada: ['Pedalar de noite com você...', 'Olha as luzes da cidade!'], chegadaSozinha: ['Pedalar de noite é uma delícia', 'A cidade fica linda à noite'] }); };
['parque', 'cidade'].forEach(k => { if (CENAS[k])
    chegadaDaHora(k, k === 'parque' ? { chegada: ['Que dia lindo!', 'Olha os patinhos!'] } : { chegada: ['Bora pedalar!', 'Cuidado com os carros, amor!'], chegadaSozinha: ['Bora pedalar!', 'Que dia bom pra andar de bike'] }, k === 'parque' ? { chegada: ['Que noite gostosa', 'O parque fica lindo à noite'] } : { chegada: ['Pedalar de noite com você...'], chegadaSozinha: ['A cidade fica linda à noite'] }); });
const _baseMasc = {};
const CABELO_HOMEM = [['#17121c', '#3d3049'], ['#3a2418', '#5a3a28'], ['#6a4028', '#8a5a38'], ['#c0894a', '#e2b672'], ['#9aa0b0', '#c8ccd6'], ['#b8402a', '#d86040'], ['#2a2a30', '#4a4a55']];
window.novaPessoa = function (o = {}) {
    const B = basesNPC(), masc = o.masc != null ? o.masc : Math.random() < .5;
    const base = masc ? baseMasculina(Math.random() < .4) : (o.base != null ? B[o.base % B.length] : pick(B));
    const pele = o.pele || pick(PELE_NPC), cab = o.cabelo || (masc ? pick(CABELO_HOMEM) : pick(CABELO_NPC)), top = o.top || pick(ROUPA_NPC), cal = o.calca || pick(CALCA_NPC);
    const palBase = (masc || base === B[0]) ? ISI_COR : FEFE_COR;
    const pal = Object.assign({}, palBase, { H: cab[0], h: cab[1], S: pele[0], s: pele[1], A: o.braco || pele[0], m: o.braco || pele[0], T: top, t: o.estampa || top, J: cal[0], j: cal[1], B: o.sapato || pick(['#2a2a30', '#f3f3f3', '#8a5a3a', '#1d1b22']), b: cal[0], E: '#2a1d30', W: '#ffffff' });
    const fr = {};
    ['down', 'up', 'left', 'right'].forEach(d => fr[d] = base[d].map(g => gridCanvas(g, pal)));
    return { fr, x: o.x || 0, y: o.y || 0, dir: o.dir || 'down', anda: false, t: Math.random() * 5, tipo: o.tipo || 'passeia', mapa: o.mapa || MAPA, vel: o.vel || 22, pausa: Math.random() * 3, falas: o.falas || null, ultFala: 0, corte: o.corte || 0, pula: !!o.pula, rota: o.rota || null, ri: 0, bandeja: !!o.bandeja, nome: o.nome || '', masc };
};
let horaNPCs = -1;
const _construirNPCsHora = construirNPCs;
window.construirNPCs = function () {
    _construirNPCsHora();
    horaNPCs = new Date().getHours();
    const h = horaAgora(), f = fatorMovimento(h), M = MAPA;
    if (M.startsWith('mem_'))
        return;
    const { AREIA, MAR } = CID2;
    NPCS = NPCS.filter(n => {
        if (n.ehCao)
            return true;
        if (n.tipo === 'garcom' || (n.tipo === 'parado' && n.nome === 'barista'))
            return true;
        if (M === 'show')
            return Math.random() < Math.max(.55, f);
        if (M === 'cidade') {
            if (n.falas && n.falas.some(t => /^Olha o|Picolé|Camarão|Mate/.test(t)))
                return h >= 8 && h < 18;
            if (n.y > AREIA && n.y < MAR)
                return h >= 7 && h < 19 && Math.random() < f;
        }
        return Math.random() < f;
    });
    NPCS.forEach(n => { if (n.falas) {
        n.falasBase = n.falas;
        n.falas = falasDaHora(n.falasBase);
    } });
    if (!NPCS.some(n => !n.ehCao && n.tipo !== 'garcom' && n.nome !== 'barista') && (M === 'cidade' || M === 'parque') && Math.random() < .7) {
        const p = pontoLivreCena();
        if (p)
            NPCS.push(novaPessoa({ x: p[0], y: p[1], tipo: 'passeia', vel: 16, falas: falasDaHora(['Boa noite!', '*boceja*']) }));
    }
};
const _atualizarNPCsHora = atualizarNPCs;
window.atualizarNPCs = function (dt) {
    if (npcMapa === MAPA && horaNPCs !== -1 && new Date().getHours() !== horaNPCs && !bloqueioTela())
        construirNPCs();
    return _atualizarNPCsHora(dt);
};
