function iniciarTutorial() { tuto = { i: 0, x: FEFE.x, y: FEFE.y }; mostrarPasso(); }
function mostrarPasso() {
    const p = TUTO[tuto.i];
    tuto.x = FEFE.x;
    tuto.y = FEFE.y;
    document.querySelectorAll('.brilha').forEach(e => e.classList.remove('brilha'));
    if (p.brilho)
        $(p.brilho).classList.add('brilha');
    $('tuto').innerHTML = `<div class="passo">${tuto.i + 1} de ${TUTO.length}</div><div style="white-space:pre-wrap">${esc(p.texto())}</div><div class="linha"><button class="pular" id="tPular">pular tutorial</button>${p.botao ? `<button class="px" id="tOk" style="background:var(--rosa);color:#fff">${p.botao}</button>` : ''}</div>`;
    $('tuto').classList.add('on');
    $('tPular').onclick = () => fimTutorial(false);
    if (p.botao)
        $('tOk').onclick = () => avancarTutorial();
}
function avancarTutorial() {
    const p = TUTO[tuto.i];
    som.pop();
    if (p.fim)
        return fimTutorial(true);
    tuto.i++;
    mostrarPasso();
}
function fimTutorial(completo) {
    $('tuto').classList.remove('on');
    document.querySelectorAll('.brilha').forEach(e => e.classList.remove('brilha'));
    if (completo && !S.tutoPresente) {
        S.tutoPresente = true;
        ganhar(5);
    }
    tuto = null;
    S.tutoFeito = true;
    if (!S.tutoFeitoEm)
        S.tutoFeitoEm = Date.now();
    salvar();
}
function checarTutorial() { if (!tuto)
    return; const p = TUTO[tuto.i]; if (p.ok && p.ok())
    avancarTutorial(); }
