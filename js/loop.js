// inicia o jogo
requestAnimationFrame(loop);
setInterval(() => { atualizarTempo(); salvar(); atualizarHUD(); ultimoAlvo = null; if (gatoPerto) {
    const bm = document.querySelector('#painelP .barrasM');
    if (bm)
        montarPainelPerto();
} }, 10000);
setInterval(construirFundo, 5 * 60000);
liberarJogo();
