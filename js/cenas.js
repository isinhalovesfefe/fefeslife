const CENAS = {};
const POSTES = [[176, 96], [226, 176], [52, 112], [330, 112]];
let precisaDecor = false;
let patosAte = 0;
const CACHORRO = { x: 234, y: 196, mapa: 'parque' };
const CONSTROI = { cozinha: () => construirCozinha(), mem_date: () => construirMemDate(), mem_beijo: () => construirMemBeijo(), mem_pedido: () => construirMemPedido(), mem_namorados: () => construirMemNamorados(), cidade: () => construirCidade(), parque: () => construirParque(), cinema: () => construirCinema(), show: () => construirShow(), estrelas: () => construirEstrelas(), cafe: () => construirCafe() };
let filme = null;
const PELUCIAS = [{ n: 'Gatinho de pelúcia', c: '#e39a4f' }, { n: 'Ursinho', c: '#a8714a' }, { n: 'Polvo roxo', c: '#c08cff' }, { n: 'Sapinho', c: '#7bd389' }, { n: 'Coelhinho', c: '#fff' }];
let showSom = null, lanternasAte = 0;
const PALCO = { x: 150, y: 46, mapa: 'show' };
const CEU_ESTRELAS = Array.from({ length: 150 }, (_, i) => { const x = (i * 73 + ((i * i) % 41)) % 320, y = (i * 37 + ((i * i * 3) % 29)) % 104; return [x, y, (i % 9 === 0) ? 2 : 1, i]; });
const CONSTELACOES = [
    { nome: 'o Gatinho', pts: [[60, 48], [66, 36], [72, 46], [84, 46], [90, 36], [96, 48], [94, 62], [78, 70], [62, 62], [60, 48]] },
    { nome: 'o Coração', pts: [[160, 40], [150, 30], [138, 34], [136, 46], [160, 68], [184, 46], [182, 34], [170, 30], [160, 40]] },
    { nome: 'a Lua da Fefe', pts: [[220, 70], [234, 60], [248, 64], [256, 76], [250, 88], [236, 90]] },
];
let ceuT = 0, constVista = 0;
let estrelaCadente = 0;
let pedidoCafe = null;
