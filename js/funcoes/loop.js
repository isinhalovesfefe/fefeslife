// loop principal do jogo
function loop(t) {
    const dt = Math.max(0, Math.min(0.05, (t - ultimo) / 1000));
    ultimo = t;
    requestAnimationFrame(loop);
    try {
        atualizar(dt);
        desenhar();
        posicionarBaloes();
        atualizarAlvoUI();
        checarTutorial();
    }
    catch (e) {
        console.error(e);
    }
}
