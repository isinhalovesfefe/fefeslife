const NEC = [
    { k: 'fome', ic: '🍔', n: 'Fome', cai: 8 },
    { k: 'energia', ic: '⚡', n: 'Energia', cai: 5 },
    { k: 'diversao', ic: '🎮', n: 'Diversão', cai: 7 },
    { k: 'social', ic: '💗', n: 'Carinho', cai: 6 },
];
const DICA_NEC = {
    fome: ['Tô com fome... bora pedir uma comidinha?', 'Minha barriga tá roncando', 'Acho que vou cozinhar alguma coisa'],
    energia: ['*boceja* tô morta de sono...', 'Preciso deitar um pouquinho', 'Minhas pálpebras estão pesando'],
    diversao: ['Que tédio... bora jogar alguma coisa?', 'Queria ver um filminho', 'Bora ouvir uma música?'],
    social: ['Tô com saudade da Isinha...', 'Preciso de um chameguinho', 'Vou ligar pra Isinha'],
};
(function iniciarNec() {
    const F = S.fefe || (S.fefe = { fome: 80, energia: 85, diversao: 75, social: 75, t: Date.now() });
    NEC.forEach(n => { if (typeof F[n.k] !== 'number')
        F[n.k] = 75; });
    const horas = Math.max(0, (Date.now() - (F.t || Date.now())) / 3600e3);
    NEC.forEach(n => { F[n.k] = lim(F[n.k] - Math.min(60, n.cai * horas)); });
    F.t = Date.now();
})();
const painelNec = document.createElement('div');
painelNec.id = 'necFefe';
painelNec.className = 'px';
painelNec.style.cssText = 'position:fixed;top:58px;left:12px;z-index:5;padding:5px 8px 6px;display:flex;flex-direction:column;gap:3px;cursor:pointer;font-size:11px;font-weight:700;color:#2a1d30;user-select:none';
painelNec.innerHTML = `<div style="font-size:10px;opacity:.65;letter-spacing:.5px;margin-bottom:1px" id="necTit">FEFE</div>` + NEC.map(n => `<div class="necL" style="display:flex;align-items:center;gap:5px"><span style="width:14px;text-align:center;font-size:11px">${n.ic}</span><span class="necNome" style="width:52px">${n.n}</span><span style="width:64px;height:7px;background:#e6dcef;box-shadow:0 0 0 1px #2a1d30;position:relative;overflow:hidden"><span id="necB_${n.k}" style="position:absolute;left:0;top:0;bottom:0;width:50%;background:#7bd389;transition:width .6s,background .6s"></span></span></div>`).join('');
document.body.appendChild(painelNec);
painelNec.onpointerdown = e => e.stopPropagation();
painelNec.onclick = e => { e.stopPropagation(); S.necMini = !S.necMini; salvar(); som.pop(); desenharNec(); };
const _stNec = document.createElement('style');
_stNec.textContent = '@keyframes necPisca{50%{box-shadow:0 0 0 1px #e8434f}} .necGanho{position:fixed;z-index:6;font-weight:800;font-size:12px;color:#2f9a4a;pointer-events:none;transition:transform 1.1s,opacity 1.1s;text-shadow:0 1px 0 #fff}';
document.head.appendChild(_stNec);
let necComidaAntes = null, necDormindo = false, necDicaT = 40, necUI = 0;
envolverNec('piquenique', () => { nec('fome', 30); nec('social', 15); });
envolverNec('chamadaVideo', () => nec('social', 35));
envolverNec('selfieJuntas', () => nec('social', 12));
envolverNec('jogoKart', () => nec('diversao', 20));
envolverNec('jogoRitmo', () => nec('diversao', 18));
envolverNec('jogoDaVelha', () => nec('diversao', 15));
envolverNec('jogoTruque', () => nec('diversao', 10));
envolverNec('abrirLivro', () => nec('diversao', 8));
envolverNec('abrirDiario', () => nec('diversao', 5));
envolverNec('sessaoFilme', () => { nec('diversao', 15); if (ISI.aqui)
    nec('social', 10); });
desenharNec();
