function abrir(t, html, comBotao = true, larga = false) {
    $('janelaM').classList.toggle('larga', !!larga);
    $('janelaM').innerHTML = `<div class="tituloM"><span>${t}</span><button data-fechar>x</button></div><div class="corpoM">${html}${comBotao ? '<button class="btn" data-fechar>Fechar</button>' : ''}</div>`;
    $('modal').classList.add('on');
    joy = { x: 0, y: 0 };
    $('base').style.display = 'none';
    FEFE.alvo = null;
    window._abertoEm = performance.now();
}
function fechar() { $('modal').classList.remove('on'); clearInterval(espelhoTimer); }
function modalAberto() { return $('modal').classList.contains('on'); }
function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2800); }
function atualizarHUD() {
    $('coracoes').textContent = S.coracoes;
    $('streak').textContent = S.streak;
    const d = new Date();
    $('relogio').textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    $('btnSom').textContent = S.som ? '♪' : '♪̸';
    $('btnSom').style.opacity = S.som ? 1 : .5;
}
function atualizarAlvoUI() {
    const a = bloqueioTela() ? null : alvoProximo();
    const chave = a ? a.tipo === 'isinha' ? 'isi' : (a.tipo === 'gato' ? 'g' + a.g.id + Math.round(S.gatos[a.g.id].fome) + Math.round(S.gatos[a.g.id].alegria) + Math.round(S.gatos[a.g.id].energia) + S.gatos[a.g.id].dormindo : a.p.nome) : '';
    if (chave === ultimoAlvo)
        return;
    ultimoAlvo = chave;
    $('rotA').classList.toggle('on', !!a);
    if (a && a.tipo === 'isinha') {
        $('rotA').classList.add('on');
        $('rotA').textContent = `Falar com a ${NOME_MINHA}`;
        $('painelGato').classList.remove('on');
        ultimoAlvo = 'isi';
        return;
    }
    if (FEFE.pose) {
        $('rotA').classList.add('on');
        $('rotA').textContent = 'Levantar';
        $('painelGato').classList.remove('on');
        ultimoAlvo = 'pose';
        return;
    }
    $('rotA').textContent = !a ? '' : a.tipo === 'gato' ? `Carinho ${a.g.id === 'tho' ? 'no' : 'na'} ${GATOS[a.g.id].nome}` : a.p.nome;
    if (a && a.tipo === 'gato') {
        $('painelGato').innerHTML = `<b>${GATOS[a.g.id].nome}${S.gatos[a.g.id].dormindo ? ' (dormindo)' : ''}</b>${barrasHTML(S.gatos[a.g.id])}`;
        $('painelGato').classList.add('on');
    }
    else
        $('painelGato').classList.remove('on');
}
function posicionarBaloes() {
    const agora = performance.now(), vis = [];
    for (let i = baloes.length - 1; i >= 0; i--) {
        const b = baloes[i];
        if (agora > b.ate) {
            b.el.remove();
            baloes.splice(i, 1);
            continue;
        }
        b.el.style.display = bloqueioTela() ? 'none' : 'block';
        if (b.mapa && b.mapa !== MAPA) {
            b.el.style.display = 'none';
            continue;
        }
        if (b.el.style.display === 'none')
            continue;
        const [sx, sy] = aTela(b.alvo.x, b.alvo.y - (b.alvo === ISI ? 38 : b.alvo === FEFE ? 30 : 18));
        vis.push({ b, x: sx, y: Math.max(40, sy) });
    }
    arrumarBaloes(vis);
}
async function telaCheia() { try {
    await document.documentElement.requestFullscreen();
}
catch (e) { } try {
    await screen.orientation.lock('landscape');
}
catch (e) { } }
