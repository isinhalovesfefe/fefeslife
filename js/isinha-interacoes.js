const _vSeen = k => { (S.vistos || (S.vistos = {}))[k] = true; };
const modalVivo = id => $(id) && $('modal').classList.contains('on');
const cvPx = (id, W, H, alt) => `<canvas id="${id}" width="${W}" height="${H}" style="display:block;margin:0 auto;height:${alt || 'min(calc(92vh - 230px),220px)'};width:auto;max-width:100%;image-rendering:pixelated;touch-action:none"></canvas>`;
window.menuIsinha = function () {
    const bot = (id, ic, txt) => `<button class="px" data-i2="${id}">${ic}${txt}</button>`, q = MAPA === 'quarto';
    abrir(`${NOME_MINHA} ♥`, `<div class="grade">
    ${bot('abraco', iconeSVG('coracao', 22), 'Abraço')}
    ${bot('beijo', PARTsvg('coracao', 20), 'Beijinho')}
    ${bot('conversar', PARTsvg('nota', 22), 'Conversar')}
    ${bot('selfie', iconeSVG('camera', 20), 'Selfie juntas')}
    ${q ? bot('cafune', '<span style="font-size:22px">🤲</span>', 'Cafuné no colo') : ''}
    ${q ? bot('travesseiro', '<span style="font-size:22px">🛏️</span>', 'Guerra de travesseiro') : ''}
    ${q ? bot('skincare', '<span style="font-size:22px">🧖</span>', 'Noite de skincare') : ''}
    ${q ? bot('desenhar', '<span style="font-size:22px">🎨</span>', 'Desenhar juntas') : ''}
    ${q && ehNoite24() ? bot('estrelas', '<span style="font-size:22px">🌠</span>', 'Olhar as estrelas') : ''}
    ${MAPA === 'show' ? bot('ombros', PARTsvg('nota', 22), 'Subir nos ombros') : ''}
    ${MAPA === 'cafe' || q ? bot('velha', PARTsvg('brilho', 22), 'Jogo da velha') : ''}
    ${q ? bot('tchau', iconeSVG('lua', 22), 'Tchau') : bot('casa', iconeSVG('sacola', 22), 'Voltar pra casa')}
  </div>`);
    document.querySelectorAll('[data-i2]').forEach(b => b.onclick = () => { fechar(); acaoIsinha(b.dataset.i2); });
};
const _acaoIsiOrig = acaoIsinha;
window.acaoIsinha = function (a) {
    ISI.atv = null;
    if (a === 'abraco')
        return abracoApertado();
    if (a === 'cafune')
        return cafune();
    if (a === 'travesseiro')
        return guerraTravesseiro();
    if (a === 'skincare')
        return noiteSkincare();
    if (a === 'desenhar')
        return desenharJuntas();
    if (a === 'estrelas')
        return olharEstrelas();
    return _acaoIsiOrig(a);
};
const _mascCache = new WeakMap();
var PAL_DESENHO = ['#ffffff', '#2a1d30', '#ff5c8d', '#ff9ec4', '#c8242e', '#ffb36b', '#ffd36e', '#7bd389', '#2f9a4a', '#8fcaff', '#5b8cff', '#c08cff', '#8a5a3a', '#9aa0b0', '#f8dcc8', '#e2ab84'];
var SLOTS_QUADRO = [[114, 3], [133, 3], [152, 4]];
let bilhete = null;
const LUGARES_BILHETE = [
    { n: 'no espelho', x: 286, y: 30, px: 288, py: 66 },
    { n: 'no criado-mudo', x: 66, y: 28, px: 70, py: 70 },
    { n: 'na estante', x: 186, y: 24, px: 190, py: 62 },
    { n: 'na janela', x: 239, y: 24, px: 243, py: 66 },
    { n: 'na cabeceira da cama', x: 30, y: 40, px: 62, py: 104 },
    { n: 'embaixo do Tho', tho: true },
];
let fefeParadaT = 0, isiAtvT = 14;
const _atualizarIsiOrig = atualizarIsinha;
window.atualizarIsinha = function (dt) {
    if (ISI.atv && ISI.aqui && !ISI.pose) {
        if (FEFE.anda || bloqueioTela()) {
            ISI.atv = null;
            ISI.estado = 'seguindo';
            return _atualizarIsiOrig(dt);
        }
        const A = ISI.atv;
        A.t -= dt;
        if (A.alvo) {
            const g = A.gato ? G(A.gato) : null;
            const tx = g ? g.x + (ISI.x < g.x ? -12 : 12) : A.alvo[0], ty = g ? g.y + 2 : A.alvo[1];
            if (moverIsinha(tx, ty, 58, dt, false)) {
                A.alvo = null;
                ISI.anda = false;
                A.chegou && A.chegou();
            }
        }
        else
            ISI.anda = false;
        if (A.t <= 0) {
            ISI.atv = null;
            ISI.estado = 'seguindo';
        }
        return;
    }
    return _atualizarIsiOrig(dt);
};
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'abracoApertado', ic: '🤗', n: 'Abraço de urso', d: 'Dar o abraço mais apertado do mundo', ok: () => V('abracoApertado') }, { id: 'cafune', ic: '🤲', n: 'Cafuné mágico', d: `Fazer a ${NOME_MINHA} dormir no seu colo`, ok: () => V('cafune') }, { id: 'travesseiro', ic: '🛏️', n: 'Guerra de plumas', d: 'Jogar uma guerra de travesseiro', ok: () => V('travesseiro') }, { id: 'unhas', ic: '💅', n: 'Manicure do amor', d: 'Pintar as unhas juntas', ok: () => V('unhas') }, { id: 'quadro', ic: '🖼️', n: 'Artistas', d: 'Pendurar um desenho na parede', ok: () => V('quadro') }, { id: 'estrelas', ic: '🌠', n: 'Pedido às estrelas', d: 'Fazer um pedido numa estrela cadente', ok: () => V('estrelas') }, { id: 'bilhete', ic: '💌', n: 'Recadinho', d: `Achar um bilhetinho da ${NOME_MINHA}`, ok: () => V('bilhete') });
var COR_NEC = { fome: '#ffb36b', energia: '#5b8cff', diversao: '#c08cff', social: '#ff7aa8' };
(function () {
    painelNec.style.padding = '6px 10px 7px';
    painelNec.style.gap = '3px';
    painelNec.style.fontSize = '13px';
    const icone = ic => { const d = EMOJI_PX[ic], w = d ? d[0][0].length : 16, h = d ? d[0].length : 16, s = Math.min(20 / w, 17 / h); return `<img src="${urlEmoji(ic)}" style="width:${Math.round(w * s)}px;height:${Math.round(h * s)}px;image-rendering:pixelated;display:block;margin:0 auto">`; };
    painelNec.innerHTML = `<b id="necTit" style="text-align:center;font-size:14px;margin-bottom:2px">Fefe</b>` + NEC.map(n => `<div class="necL" style="display:grid;grid-template-columns:22px 66px 112px;gap:6px;align-items:center"><span>${icone(n.ic)}</span><span class="necNome">${n.n}</span><div class="segs g" id="necB_${n.k}"></div></div>`).join('');
})();
window.desenharNec = function () {
    const F = S.fefe, mini = !!S.necMini;
    $('necTit').style.display = mini ? 'none' : '';
    painelNec.querySelectorAll('.necNome').forEach(e => e.style.display = mini ? 'none' : '');
    painelNec.querySelectorAll('.necL').forEach(e => e.style.gridTemplateColumns = mini ? '22px 84px' : '22px 66px 112px');
    NEC.forEach(n => { const b = $('necB_' + n.k); if (!b)
        return; const v = F[n.k]; b.innerHTML = segs(v, v < 20 ? '#e8434f' : COR_NEC[n.k]); b.style.animation = v < 20 ? 'necPisca 1s steps(2) infinite' : ''; });
};
desenharNec();
let cafuneEst = null;
const _rotCache = new WeakMap();
(function () {
    const dentro = (wx, wy) => { const c = cabecaColo(); return wx >= c.x - 4 && wx <= c.x + c.w + 6 && wy >= c.y - 4 && wy <= c.y + c.h + 4; };
    let ativo = false;
    window.addEventListener('pointerdown', e => {
        const E = cafuneEst;
        if (!E || E.dormiu || bloqueioTela() || e.target !== tela)
            return;
        const [wx, wy] = aMundo(e.clientX, e.clientY);
        if (!dentro(wx, wy))
            return;
        e.stopPropagation();
        ativo = true;
        E.mao = [wx, wy];
        E.ult = [wx, wy];
    }, { capture: true });
    window.addEventListener('pointermove', e => {
        const E = cafuneEst;
        if (!ativo || !E)
            return;
        e.stopPropagation();
        const [wx, wy] = aMundo(e.clientX, e.clientY);
        E.mao = [wx, wy];
        if (E.ult && dentro(wx, wy) && !E.dormiu)
            E.sono = Math.min(100, E.sono + Math.hypot(wx - E.ult[0], wy - E.ult[1]) * 1.1);
        E.ult = [wx, wy];
    }, { capture: true });
    const solta = e => { if (!ativo)
        return; ativo = false; e.stopPropagation(); if (cafuneEst) {
        cafuneEst.ult = null;
        setTimeout(() => { if (cafuneEst && !ativo)
            cafuneEst.mao = null; }, 500);
    } };
    window.addEventListener('pointerup', solta, { capture: true });
    window.addEventListener('pointercancel', solta, { capture: true });
})();
