$('modal').addEventListener('click', e => { if (e.target.id === 'modal' || e.target.closest('[data-fechar]'))
    fechar(); });
let ultimoAlvo = null;
addEventListener('keydown', e => {
    audio();
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    teclas[k] = true;
    if (k === ' ' || k === 'e' || k === 'Enter') {
        e.preventDefault();
        if (pertoAberto())
            return;
        if (modalAberto() && k !== 'Enter')
            fechar();
        else
            interagir();
    }
    if (k === 'Escape') {
        if (pertoAberto())
            fecharPerto('ok');
        else
            fechar();
    }
});
addEventListener('keyup', e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; teclas[k] = false; });
let toque = null;
tela.addEventListener('pointerdown', e => { audio(); if (bloqueioTela())
    return; toque = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), joy: false }; try {
    tela.setPointerCapture(e.pointerId);
}
catch (_) { } });
tela.addEventListener('pointermove', e => {
    if (!toque || e.pointerId !== toque.id)
        return;
    let dx = e.clientX - toque.x, dy = e.clientY - toque.y;
    const d = Math.hypot(dx, dy), max = 40;
    if (!toque.joy && d > 12) {
        toque.joy = true;
        FEFE.alvo = null;
        const b = $('base');
        b.style.display = 'block';
        b.style.left = (toque.x - 52) + 'px';
        b.style.top = (toque.y - 52) + 'px';
        $('dicaJoy').style.display = 'none';
    }
    if (toque.joy) {
        if (d > max) {
            dx = dx / d * max;
            dy = dy / d * max;
        }
        $('pino').style.transform = `translate(${dx}px,${dy}px)`;
        joy = d < 8 ? { x: 0, y: 0 } : { x: dx / max, y: dy / max };
    }
});
const fimToque = e => {
    if (!toque || e.pointerId !== toque.id)
        return;
    const t = toque;
    toque = null;
    joy = { x: 0, y: 0 };
    $('base').style.display = 'none';
    if (!t.joy && performance.now() - t.t < 450 && e.type === 'pointerup' && !bloqueioTela())
        tocarMundo(t.x, t.y);
};
tela.addEventListener('pointerup', fimToque);
tela.addEventListener('pointercancel', fimToque);
$('btnA').addEventListener('pointerdown', e => { e.preventDefault(); audio(); interagir(); });
$('btnSom').onclick = () => { S.som = !S.som; salvar(); if (audio())
    mestre.gain.setTargetAtTime(S.som ? 1 : 0, AC.currentTime, .05); atualizarHUD(); };
$('btnTela').onclick = telaCheia;
$('btnCheia').onclick = async () => { await telaCheia(); jogarAssim = true; redimensionar(); };
$('btnAssim').onclick = () => { jogarAssim = true; redimensionar(); };
addEventListener('resize', redimensionar);
document.addEventListener('contextmenu', e => { if (e.target.tagName !== 'IMG')
    e.preventDefault(); });
$('icCor').innerHTML = iconeSVG('coracao', 13);
$('btnLoja').innerHTML = iconeSVG('sacola', 15);
$('btnLoja').onclick = () => { if (!pertoAberto())
    abrirLoja(); };
$('icCel').innerHTML = iconeSVG('celular', 15);
$('btnCel').onclick = () => { if (!pertoAberto())
    abrirCelular(); };
atualizarBadgeCel();
$('btnConq').onclick = () => { if (!pertoAberto())
    abrirConquistas(); };
$('btnAjuda').onclick = () => { if (!pertoAberto() && !modalAberto())
    iniciarTutorial(); };
imagensDecor();
construirQuarto();
construirFundo();
construirDecor();
montarFefe();
montarIsinha();
atualizarTempo();
salvar();
redimensionar();
atualizarHUD();
gatos.forEach((g, i) => { if (S.gatos[g.id].dormindo) {
    [g.x, g.y] = CAMA_GATO[i];
    g.estado = 'dormindo';
} });
{
    const [cx, cy] = alvoCamera();
    cam.x = cx;
    cam.y = cy;
}
setTimeout(() => mostrarInicio(() => { if (!S.tutoFeito)
    setTimeout(iniciarTutorial, 500);
else
    setTimeout(() => falar(FEFE, cartasNovas() > 0 ? 'Tem cartinha nova no criado-mudo!' : 'Oi, gatinhos!', 3000), 400); }));
setTimeout(atualizarBadgeConq, 0);
