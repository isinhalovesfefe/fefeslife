const FEFE_COR = { A: '#e2ab84', m: '#e2ab84', X: '#151419', x: '#4a4a58', O: '#0b0810', H: '#17121c', h: '#3d3049', S: '#e2ab84', s: '#c98d68', E: '#1a1020', R: '#e88f8f', L: '#b85c6a', T: '#2c2836', t: '#f0d27a', J: '#4b5263', j: '#3a3f4d', b: '#111014', B: '#2a2a30', P: '#d9dbe6' };
const FEFE_FRENTE_L = [
    "....OOOO", "...OHHHH", "..OHHhHH", "..OHhHHH", ".OHHHHHh", ".OHHSSSS", ".OHSSSSS", ".OHSSESS", ".OHSSESS", ".OHRSSSS", ".OHHSSSL",
    "OHHHOSSS", "OHHHHHOS", "OHHOAATT", "OHHOATTT", "OHHOATTT", "OHHOATtT", "OHHOATTT", ".OHOSOmm", "..OOObbb", "...OJJJJ", "...OJJJJ", "...OJJJO", "...OJJJO", "...OBBBO", "...OOOO."
];
const FEFE_COSTAS_L = [
    "....OOOO", "...OHHHH", "..OHHhHH", "..OHhHHH", ".OHHHHHh", ".OHHHHHH", ".OHHHhHH", ".OHHHHHH", ".OHHHHhH", ".OHHHHHH", ".OHHhHHH",
    "OHHHHHHH", "OHHHHHhH", "OHHOHHHH", "OHHOAHHH", "OHHOAHHH", "OHHOAHHH", "OHHOATHH", ".OHOSOmm", "..OOObbb", "...OJJJJ", "...OJJJJ", "...OJJJO", "...OJJJO", "...OBBBO", "...OOOO."
];
const FEFE_LADO = [
    ".....OOOO.......", "....OHHHHO......", "...OHHHhHHO.....", "...OHHHHHHHO....", "..OHHHHHHhHO....", "..OHHHHHSSSO....", "..OHHHHSSSSSO...", "..OHHHHSSSESO...",
    "..OHHHHSSSESO...", "..OHHHHHSSSSSO..", "..OHHHHHSSSLO...", "..OHHHHHOSSO....", "..OHHHHHHOSO....", "..OHHHHHOTTO....", "..OHHHHOATTTO...", "..OHHHHOATTTO...",
    "...OHHHOATTTO...", "...OHHHOATTTO...", "....OHHOSmmmO...", ".....OOObbbbO...", "......OJJJJO....", "......OJJJJO....", "......OJJJJO....", "......OJJJJO....", "......OBBBBBO...", "......OOOOOO...."
];
const FEFE_LADO_PASSO = [
    "......OJJJJO....", ".....OJJOJJO....", "....OJJO.OJJO...", "....OJJO.OJJO...", "...OBBBO.OBBBO..", "...OOOO..OOOO..."
];
const espelhar = L => L.map(r => r + [...r].reverse().join(''));
const GATO_L = [".O.....", ".OO....", ".OIO...", ".OIBOOO", "OBBBBBB", "OBBEEBB", "OBBEKBB", "OBBBBBN", ".OBBBbb", "..OBBbb", ".OBBBbb", ".OBBbbb", ".OBpObb", "..OOOOO"];
const GATO_BASE = espelhar(GATO_L);
const RABO_G = [["..OO", "..OTO", "...OTO", "...OTO", "..OTO.", "OTTO..", "OOO..."], ["....", "OO..", "OTO.", "OTO.", "OTO.", "OTTO.", "OOO.."]];
const ISI_COR = { O: '#1f1418', H: '#c0894a', h: '#e2b672', S: '#f8dcc8', A: '#f8dcc8', m: '#f8dcc8', s: '#e6bfa6', E: '#3a2a1a', R: '#f3a8a8', L: '#d88a92', T: '#1f1d24', t: '#e8e8e8', J: '#4b4e58', j: '#3b3d45', b: '#111014', B: '#1a1a1e', P: '#d9dbe6', W: '#ffffff' };
const ISI_FRENTE_L = [
    "....OOOO", "...OHHHH", "..OHHhHH", ".OHHhHHH", ".OHHHHHh", "OHHHSSSS", "OHHSSSSS", "OHHSSESS", "OHHSSESS", "OHHRSSSS", "OHHHSSSL",
    "OHHHOSSS", "OHHHHHOS", "OHHOAATT", "OHHOATTT", ".OHOATTT", "..OOATtT", "...OATTT", "...OSOmm", "...OObbb", "...OJJJJ", "...OJJJJ", "...OJJJO", "...OJJJO", "...OBBBO", "...OOOO."
];
const ISI_COSTAS_L = [
    "....OOOO", "...OHHHH", "..OHHhHH", ".OHHhHHH", ".OHHHHHh", "OHHHHHHH", "OHHHhHHH", "OHHHHHHH", "OHHHHhHH", "OHHHHHHH", "OHHHhHHH",
    "OHHHHHHH", "OHHHHHHH", "OHHHHhHH", "OHHOAHHH", ".OHOAHHH", "..OOAThH", "...OATTT", "...OSOmm", "...OObbb", "...OJJJJ", "...OJJJJ", "...OJJJO", "...OJJJO", "...OBBBO", "...OOOO."
];
const ISI_LADO = [
    ".....OOOO.......", "....OHHHHO......", "...OHHHhHHO.....", "..OHHHHHHHHO....", "..OHHHHHHhHO....", ".OHHHHHHSSSO....", ".OHHHHHSSSSSO...", ".OHHHHHSSSESO...",
    ".OHHHHHSSSESO...", ".OHHhHHHSSSSSO..", ".OHHHHHHSSSLO...", "..OHHHHHOSSO....", "...OHHHHHOSO....", "...OHHHHOTTO....", "...OHHHOATTTO...", "....OHHOATTTO...",
    ".....OOOATTTO...", ".......OATTTO...", ".......OSmmmO...", "......OObbbbO...", "......OJJJJO....", "......OJJJJO....", "......OJJJJO....", "......OJJJJO....", "......OBBBBBO...", "......OOOOOO...."
];
const BASE_L = [
    "................", "....OO..........", "....OIO.........", "....OIIO........", "....OIIBOOOOOOOO",
    "...OBIIBBBBBBBBB", "...OBBBBBBBBBBBB", "..OBBBBBBBBBBBBB", "..OBBBBBBBBBBBBB", "..OBBBBBBBBBBBBB",
    "..OBBBBBBBBBBBBB", "..OBBBBBBBBBBBBB", "..OBBBBBBBBBBbbb", "...OBBBBBBBBbbbb", "...OBBBBBBBBBbbb",
    "....OBBBBBBBBBBB", ".....OOOOOOOOOOO", "....OBBBBBBbbbbb", "....OBBBBBbbbbbb", "...OBBBBBbbbbbbb",
    "...OBBBBBbbbbbbb", "...OBBBBBbbbbbbb", "...OBBBBBbbbbbbb", "...OBBBBBBbbbbbb", "...OBBBBBBbbbbbb",
    "...OBBBBBOOOOObb", "...OBBBBOpppppOb", "...OBBBBOpOpOpOb", "...OOOOOOOOOOOOO"
];
const BASE = BASE_L.map(r => (r + [...r].reverse().join('')).split(''));
const RABO = [
    ["....OO..", "...OTTO.", "...OTTO.", "...OTTO.", "...OTTO.", "..OTTO..", "..OTTO..", "..OTTO..", "..OTTO..", ".OTTO...", ".OTTO...", "OTTO....", "TTO.....", "OO......"],
    ["..OO....", ".OTTO...", ".OTTO...", "..OTTO..", "...OTTO.", "...OTTO.", "...OTTO.", "..OTTO..", "..OTTO..", ".OTTO...", ".OTTO...", "OTTO....", "TTO.....", "OO......"]
];
const OLHO = {
    aberto: [".FFF.", "FWEEF", "FEKEF", "FEKEF", ".FFF."],
    baixo: [".FFF.", "FWEEF", "FEEEF", "FEKEF", ".FKF."],
    feliz: [".....", ".FFF.", "F...F", ".....", "....."],
    bravo: [".....", ".....", "FEKEF", ".FFF.", "....."],
    fechado: [".....", ".....", "F...F", ".FFF.", "....."],
};
const GATOS = {
    lola: { nome: 'Lola', tipo: 'tortie', desc: 'Amorosa e grudenta. Ama um colo.',
        cor: { O: '#3b2a30', B: '#efe3d2', b: '#fbf5ec', M: '#7a6455', P: '#c8844a', I: '#f5a9bd', p: '#7a675b', S: '#4b3c34', E: '#7fb6dd', K: '#15121a', W: '#fff', F: '#22160f', N: '#d98f96', m: '#a5485f', R: '#ff9fb9', H: '#fff', A: '#8fd0ff', L: '#ff5c8d', l: '#c2335f', T: '#6e5a4e' } },
    clarinha: { nome: 'Clarinha', tipo: 'tabby', desc: 'Gosta de carinho... mas prefere ficar na dela.',
        cor: { O: '#3b2a30', B: '#aaa49c', b: '#efedea', M: '#aaa49c', P: '#aaa49c', I: '#f5a9bd', p: '#efedea', S: '#6c655d', E: '#a7c3cf', K: '#15121a', W: '#fff', F: '#3b2a30', N: '#d49aa0', m: '#a5485f', R: '#ff9fb9', H: '#fff', A: '#8fd0ff', L: '#ff5c8d', l: '#c2335f', T: '#9a948c' } },
    tho: { nome: 'Tho', tipo: 'preto', desc: 'Maluco, atrapalhado e imprevisível.',
        cor: { O: '#0c0b0f', B: '#24212a', b: '#35303d', M: '#24212a', P: '#24212a', I: '#5a3d4a', p: '#35303d', S: '#24212a', E: '#a8d65c', K: '#0c0b0f', W: '#fff', F: '#9a93a6', N: '#6b4b57', m: '#a5485f', R: '#c0507a', H: '#bdb6c8', A: '#8fd0ff', L: '#ff5c8d', l: '#c2335f', T: '#24212a' } },
};
const FALAS = {
    lola: { perto: ['Fefe! Fefe! Fefe!', 'Te amo, sabia?', 'Colinho?', 'Prrrrr...', 'Senti saudade!'], carinho: ['Prrrrrr', 'MAIS!', 'Te amo, Fefe', 'Aí não para!', 'Que mão boa', '*derrete*'] },
    clarinha: { perto: ['...oi.', 'Tô bem aqui, obrigada.', 'Hm.'], carinho: ['prr...', 'Tá, pode.', 'Atrás da orelha...', 'Hm, gostoso.'], chega: ['Já chega, obrigada.', 'Ok, foi bom. Tchau.', 'Minha cota acabou.'], barriga: ['BARRIGA NÃO.', 'Hssss!'] },
    tho: { perto: ['MIAU!!', 'O que é isso?!', '*corre*', 'Eu não fiz nada.'], carinho: ['prrrRRR', 'Isso! Isso!', 'MAIS! NÃO! MAIS!', 'hehe'], foge: ['O QUE FOI ISSO?!', 'UMA MOSCA!', 'Depois a gente se fala!', 'Tchau!!'], barriga: ['NHAC!', '*morde de leve*', 'Barriga é armadilha!'] },
};
const ICONES = {
    peixe: [["...OOOO....", "..OBBBBO.OO", ".OBKBBBBOBO", ".OBBBBBBBBO", "..OBBBBO.OO", "...OOOO...."], { O: '#2c3e50', B: '#7ec8e3', K: '#111' }],
    tigela: [["...FFFFF...", "..FFfFFfF..", "OOOOOOOOOOO", "OPPPPPPPPPO", ".OPPWPPPPO.", "..OOOOOOO.."], { O: '#2a1d30', F: '#b5743d', f: '#7a4a2a', P: '#ff8fb0', W: '#fff' }],
    biscoito: [[".OOOOO.", "OCCdCCO", "OCCCCdO", "OdCCCCO", "OCCdCCO", ".OOOOO."], { O: '#2a1d30', C: '#e3b07a', d: '#7a4a2a' }],
    novelo: [["..OOOOO..", ".OYYyYYO.", "OYyYYYyYO", "OYYyYyYYO", "OyYYyYYyO", "OYYyYYyYO", ".OYYYyYO.", "..OOOOO.O", "........O"], { O: '#2a1d30', Y: '#ff8fb0', y: '#e0557f' }],
    lua: [["..OOOO..", ".OMMMMO.", "OMMMOO..", "OMMO....", "OMMO....", "OMMMOO..", ".OMMMMO.", "..OOOO.."], { O: '#2a1d30', M: '#ffd36e' }],
    coracao: [[".OO.OO.", "OHWHHHO", "OHHHHHO", ".OHHHO.", "..OHO..", "...O..."], { O: '#2a1d30', H: '#ff5c8d', W: '#fff' }],
    mao: [["...OO.OO...", "..OSSOSSO..", "..OSSOSSOO.", ".OOSSOSSOSO", "OSSOSSSSOSO", "OSSSSSSSSSO", ".OSSSSSSSSO", "..OSSSSSSO.", "...OSSSSO..", "....OOOO..."], { O: '#2a1d30', S: '#e2ab84' }],
    laco: [["OO...OO", "OLO.OLO", "OLLOLLO", "OLLOLLO", "OLO.OLO", "OO...OO"], { O: '#2a1d30', L: '#ff5c8d' }],
    agua2: [["..O..", ".OBO.", "OBBBO", "OBWBO", ".OOO."], { O: '#2a1d30', B: '#7ec8e3', W: '#fff' }],
    escova: [["OOOOOOO", "OYYYYYO", "OOOOOOO", ".W.W.W.", ".W.W.W."], { O: '#2a1d30', Y: '#c98f5f', W: '#e8e8e8' }],
    fome: [["...OOOO....", "..OBBBBO.OO", ".OBKBBBBOBO", ".OBBBBBBBBO", "..OBBBBO.OO", "...OOOO...."], { O: '#2a1d30', B: '#ffb36b', K: '#2a1d30' }],
    raio: [["..OO", "..O.", ".OO.", "OOOO", ".OO.", ".O..", "O..."], { O: '#5b8cff' }],
    camera: [[".....OOO...", "OOOOOOOOOOO", "OGGGGOOOGGO", "OGGGOWWOGGO", "OGGGOWWOGGO", "OGGGGOOGGGO", "OOOOOOOOOOO"], { O: '#2a1d30', G: '#9fa6b8', W: '#bfe3ff' }],
    album: [["OOOOOOOOO", "OWWWWWWWO", "OWBBBBBWO", "OWBYBBBWO", "OWBGGBBWO", "OWWWWWWWO", "OOOOOOOOO"], { O: '#2a1d30', W: '#fff', B: '#8fcaff', Y: '#ffd36e', G: '#5fae6a' }],
    celular: [["OOOOOOO", "OSSSSSO", "OSPSSSO", "OSSSSSO", "OSSSPSO", "OSSSSSO", "OOOWOOO", "OOOOOOO"], { O: '#2a1d30', S: '#8fcaff', P: '#ff7aa8', W: '#fff' }],
    sacola: [["...OOO...", "..O...O..", "OOOOOOOOO", "OPPPPPPPO", "OPPWPPPPO", "OPPPPPPPO", "OPPPPPPPO", "OOOOOOOOO"], { O: '#2a1d30', P: '#ff7aa8', W: '#fff' }],
    pena: [["......OO", "....OOWO", "...OWWO.", "..OWWO..", ".OWWO...", ".OWO....", "O.O.....", "O......."], { O: '#2a1d30', W: '#7ec8e3' }],
    fone: [["..XXXXX..", ".X.....X.", "X.......X", "XX.....XX", "XX.....XX"], { X: '#151419' }],
};
const PART = {
    coracao: [[".H.H.", "HHHHH", "HHHHH", ".HHH.", "..H.."], { H: '#ff5c8d' }],
    nota: [["..OO", "..OO", "..O.", "..O.", "OOO.", "OOO."], { O: '#ffd36e' }],
    zz: [["OOO", ".O.", "OOO"], { O: '#c9d6ff' }],
    brilho: [["..Y..", ".YWY.", "YWWWY", ".YWY.", "..Y.."], { Y: '#ffd36e', W: '#fff' }],
    agua: [[".B.", "BBB", "BBB", ".B."], { B: '#7ec8e3' }],
    folha: [[".G", "GG", "G."], { G: '#7bd389' }],
    ex: [["R", "R", "R", ".", "R"], { R: '#ff3b5c' }],
    poeira: [[".WW.", "WWWW", ".WW."], { W: '#e8dcd0' }],
    caco: [["OO", "O."], { O: '#e07a5f' }],
    pelo: [[".W.", "WWW", ".W."], { W: '#d9d4cf' }],
    confete1: [["PP", "PP"], { P: '#ff7aa8' }], confete2: [["YY", "YY"], { Y: '#ffd36e' }], confete3: [["BB", "BB"], { B: '#8fcaff' }],
    bolha: [[".W.", "W.W", ".W."], { W: '#e6f5ff' }],
};
const cache = {};
const pick = a => a[Math.floor(Math.random() * a.length)];
const $ = id => document.getElementById(id);
const CHAVE = 'gatinhos-da-fefe-v1';
const hoje = () => { const d = new Date(); return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(); };
const diasEntre = (a, b) => Math.round((new Date(b).setHours(0, 0, 0, 0) - new Date(a).setHours(0, 0, 0, 0)) / 864e5);
let S;
try {
    S = JSON.parse(localStorage.getItem(CHAVE)) || estadoNovo();
}
catch (e) {
    S = estadoNovo();
}
S.feitos = S.feitos || {};
S.album = S.album || [];
S.compras = S.compras || [];
for (const id in S.gatos) {
    const st = S.gatos[id];
    if (st.laco) {
        st.acc = 'laco';
        if (!S.compras.includes('laco'))
            S.compras.push('laco');
    }
    delete st.laco;
}
const tem = id => S.compras.includes(id);
if (S.roupa == null)
    S.roupa = 0;
if (S.som == null)
    S.som = true;
(function () {
    const h = hoje();
    if (S.ultimoDia !== h) {
        const dif = diasEntre(new Date(S.ultimoDia.replace(/-/g, '/')), new Date());
        S.streak = dif === 1 ? S.streak + 1 : 1;
        S.ultimoDia = h;
    }
    if (S.feitos.dia !== h) {
        S.feitos = { dia: h };
        S.confClarinha = Math.min(100, (S.confClarinha == null ? 10 : S.confClarinha) + 3);
    }
    if (S.confClarinha == null)
        S.confClarinha = 10;
})();
const TAXA = { fome: -7, alegria: -5, energia: -4, sono: +25 };
const lim = v => Math.max(0, Math.min(100, v));
