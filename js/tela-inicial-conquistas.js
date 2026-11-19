FALAS.lola.perto.push('Você voltou!!', 'Tava te esperando', 'Me pega no colo?', 'Cheirinho de Fefe!', 'Hoje eu tô carente', 'Você é minha humana favorita');
FALAS.lola.carinho.push('Não para nunca', 'Aí, aí, aí...', '*amassa pãozinho*', 'Eu sou sua, Fefe', 'Prrrr prrr prrr');
FALAS.clarinha.perto.push('Pode ficar. Longe.', '*pisca devagar*', 'Ah. É você.', 'Tô meditando.', 'Não vou levantar.');
FALAS.clarinha.carinho.push('...continua.', 'Só um pouquinho.', '*fecha os olhos*', 'Isso é aceitável.', 'Não conta pra ninguém.');
FALAS.tho.perto.push('VOCÊ VIU AQUILO?!', 'Eu sou um tigre.', 'Tem um fantasma ali.', 'Cadê minha comida?!', 'Eu NÃO derrubei o copo.', '*olha pro nada*');
FALAS.tho.carinho.push('Tá bom, tá bom!', 'Gostei! Não gostei! Gostei!', 'prr? PRR!', 'Eu sou muito fofo, né', '*morde e lambe*');
const PENSAMENTOS = {
    lola: ['sachê...', 'Fefe... Fefe...', 'colo, colo, colo', 'será que a Isinha vem hoje?', 'eu amo todo mundo', 'soneca no peito dela'],
    clarinha: ['silêncio, por favor', 'aquele raio de sol é meu', 'o Tho é muito barulhento', '...talvez um carinho', 'eu sou uma rainha'],
    tho: ['e se eu pular ali?', 'pássaro.', 'PÁSSARO.', 'o que tem dentro da gaveta?', 'eu consigo voar', 'meu rabo tá me seguindo'],
    fefe: () => pick(['Que dia bom', 'Esses gatos...', 'Será que a Isinha tá pensando em mim?', 'Preciso regar as plantas', `Tô com saudade da ${NOME_MINHA}`, 'Eu amo esse quarto']),
};
let pensaT = 25;
const COR_FALA = { lola: '#e08a3d', clarinha: '#9aa0b0', tho: '#3a2f44' };
const V = k => !!(S.vistos && S.vistos[k]);
const CONQUISTAS = [
    { id: 'chamego', ic: '🤲', n: 'Primeiro chamego', d: 'Fazer carinho até um gatinho amar', ok: () => V('chamego') },
    { id: 'cartinha', ic: '💌', n: 'Correio felino', d: 'Ler a primeira cartinha', ok: () => S.lidas.length >= 1 },
    { id: 'cartas', ic: '📬', n: 'Colecionadora', d: 'Ler todas as cartinhas', ok: () => S.lidas.length >= CARTINHAS.length },
    { id: 'selfie', ic: '🪞', n: 'Diva do espelho', d: 'Tirar uma selfie no espelho', ok: () => V('selfie') || S.album.length > 0 },
    { id: 'selfieJ', ic: '📸', n: 'Casal do espelho', d: 'Tirar uma selfie juntas', ok: () => V('selfieJuntas') },
    { id: 'montinho', ic: '🛏️', n: 'Montinho de gatos', d: 'Os três gatos na cama com você', ok: () => V('cama_lola') && V('cama_tho') && V('cama_clarinha') },
    { id: 'colo', ic: '🩶', n: 'O impossível', d: 'A Clarinha deitar no seu colo', ok: () => !!S.coloClarinha },
    { id: 'banho', ic: '🛁', n: 'Spa felino', d: 'Dar banho num gatinho', ok: () => Object.keys(S.vistos || {}).some(k => k.startsWith('banho_')) },
    { id: 'ritmo', ic: '🎸', n: 'Banda de duas', d: 'Tocar guitarra', ok: () => V('ritmo') },
    { id: 'kart', ic: '🎮', n: 'Pé na tábua', d: 'Jogar uma noite de jogos', ok: () => V('kart') },
    { id: 'chef', ic: '🍳', n: 'Chef do coração', d: 'Cozinhar uma receita', ok: () => Object.keys(S.vistos || {}).some(k => k.startsWith('rec_')) },
    { id: 'sono', ic: '💤', n: 'Bons sonhos', d: 'Dormir de verdade e sonhar', ok: () => V('sono') },
    { id: 'esconde', ic: '🔍', n: 'Detetive de gato', d: 'Achar o Tho no esconde-esconde', ok: () => V('esconde') },
    { id: 'caos', ic: '🌪️', n: 'Sobrevivente', d: 'Aguentar o modo Tho caótico', ok: () => !!(S.marcos && S.marcos.caos) },
    { id: 'encontros', ic: '🗓️', n: 'Agenda cheia', d: 'Ir no cinema, show, café e ver as estrelas', ok: () => ['cinema', 'show', 'cafe', 'estrelas'].every(k => V('enc_' + k)) },
    { id: 'memorias', ic: '🎞️', n: 'Nossa história', d: 'Reviver todos os momentos do "Nós ♥"', ok: () => Object.keys(S.vistos || {}).filter(k => k.startsWith('mem_')).length >= MEMORIAS.length },
    { id: 'pelucia', ic: '🧸', n: 'Garra de ouro', d: 'Pegar uma pelúcia na máquina', ok: () => V('pelucia') },
    { id: 'segredo', ic: '🌠', n: 'Estrela cadente', d: 'Achar a surpresa escondida', secreta: 'Dizem que uma das janelas guarda um segredo...', ok: () => V('segredo') },
];
let conqT = 0;
const conqFila = [];
setInterval(() => { if (!conqFila.length || document.getElementById('inicio'))
    return; const c = conqFila.shift(); toast(`🏆 Conquista: ${c.n}!`); som.plim(); ganhar(2); }, 3200);
let janelaToques = [];
