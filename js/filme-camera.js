const btnCamera = botaoFlutuante('btnCamera', '📷 Foto');
const btnLuz = botaoFlutuante('btnLuz', '💡 Apagar a luz');
const btnJanela = botaoFlutuante('btnJanela', '🪟 Abrir a janela');
LOJA.push({ id: 'camera', aba: 'brinq', n: 'Câmera instantânea', preco: 30, desc: 'Fotografe os gatinhos e complete o álbum de figurinhas. Tem poses raras!' });
const FIGURINHAS = [
    { g: 'lola', p: 'normal', n: 'Lola de boa' },
    { g: 'lola', p: 'dormindo', n: 'Lola dormindo' },
    { g: 'lola', p: 'comendo', n: 'Lola comendo' },
    { g: 'lola', p: 'sol', n: 'Lola no solzinho' },
    { g: 'lola', p: 'barriga', n: 'Lola de barriga pra cima', rara: 1 },
    { g: 'clarinha', p: 'normal', n: 'Clarinha julgando' },
    { g: 'clarinha', p: 'dormindo', n: 'Clarinha dormindo' },
    { g: 'clarinha', p: 'comendo', n: 'Clarinha comendo' },
    { g: 'clarinha', p: 'sol', n: 'Clarinha no sol (dela)' },
    { g: 'clarinha', p: 'chuva', n: 'Clarinha cheirando a chuva' },
    { g: 'clarinha', p: 'sorriso', n: 'Clarinha sorrindo', rara: 2 },
    { g: 'tho', p: 'normal', n: 'Tho existindo' },
    { g: 'tho', p: 'dormindo', n: 'Tho dormindo' },
    { g: 'tho', p: 'comendo', n: 'Tho comendo' },
    { g: 'tho', p: 'laser', n: 'Tho caçando o laser' },
    { g: 'tho', p: 'caos', n: 'Tho no modo caos' },
    { g: 'tho', p: 'invertido', n: 'Tho de cabeça pra baixo', rara: 1 },
];
let modoFoto = false;
btnCamera.onclick = e => {
    e.stopPropagation();
    audio();
    modoFoto = !modoFoto;
    btnCamera.textContent = modoFoto ? '✋ Cancelar' : '📷 Foto';
    if (modoFoto) {
        FEFE.alvo = null;
        toast('Toque num gatinho pra tirar a foto 📷');
    }
};
let poseT = 35 + Math.random() * 25;
let luzModo = 0, luzApagada = false;
const TXT_LUZ = ['💡 Apagar a luz', '🍄 Apagar o abajur', '💡 Acender a luz'];
btnLuz.onclick = e => {
    e.stopPropagation();
    audio();
    som.pop();
    setLuz((luzModo + 1) % 3);
    if (luzModo === 1)
        falar(FEFE, pick(['Só o abajur... que aconchegante', 'Clima de filme', 'Luz de cogumelo ♥']), 1800);
    if (luzModo === 2) {
        (S.vistos || (S.vistos = {})).escuro = true;
        salvar();
        falar(FEFE, pick(['Boa noite, gatinhos...', 'Cadê vocês? Só vejo olhinhos', 'Hora de dormir!']), 1800);
        setTimeout(() => { const l = G('lola'); if (l && !S.gatos.lola.dormindo)
            pensar(l, 'escuro = hora de brincar', 1800); }, 1400);
    }
};
const COR_OLHO = { lola: '#7ec8ff', clarinha: '#ffd36e', tho: '#7cff6a' };
let _cvNoite = null;
const OVOS_CORES = [['#ff9ec4', '#fff'], ['#8fcaff', '#ffd36e'], ['#c08cff', '#fff'], ['#7bd389', '#ff9ec4'], ['#ffd36e', '#5b8cff'], ['#ffb36b', '#fff']];
let sazonalDia24 = '';
let janelaAberta = false, chuvaNo = null, janelaGatoT = 0;
btnJanela.onclick = e => { e.stopPropagation(); audio(); janelaAberta ? fecharJanela() : abrirJanela(); };
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'filme', ic: '🎬', n: 'Sessão pipoca', d: 'Assistir um filme até o fim', ok: () => V('filme') }, { id: 'figurinha', ic: '📷', n: 'Paparazzi', d: 'Tirar a primeira foto de um gatinho', ok: () => V('figurinha') }, { id: 'album', ic: '📒', n: 'Álbum completo', d: 'Completar todas as figurinhas', ok: () => V('albumCompleto') }, { id: 'escuro', ic: '👀', n: 'Olhinhos no escuro', d: 'Apagar a luz à noite', ok: () => V('escuro') }, { id: 'pascoa', ic: '🥚', n: 'Caça aos ovos', d: 'Achar todos os ovinhos de Páscoa', ok: () => V('pascoa') }, { id: 'chuva', ic: '🌧️', n: 'Banho de chuva', d: 'Abrir a janela num dia de chuva', ok: () => V('chuva') });
