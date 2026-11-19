function nec(k, v) { const F = S.fefe; const a = F[k]; F[k] = lim(F[k] + v); if (v >= 10 && a < 90)
    mostrarGanhoNec(k, v); }
function corNec(v) { return v > 60 ? '#5fbf5a' : v > 30 ? '#f0b93a' : '#e8434f'; }
function desenharNec() {
    const F = S.fefe, mini = !!S.necMini;
    painelNec.querySelectorAll('.necNome').forEach(e => e.style.display = mini ? 'none' : '');
    $('necTit').style.display = mini ? 'none' : '';
    painelNec.querySelectorAll('.necL > span:last-child').forEach(e => e.style.width = mini ? '34px' : '64px');
    NEC.forEach(n => {
        const b = $('necB_' + n.k);
        if (!b)
            return;
        const v = F[n.k];
        b.style.width = v + '%';
        b.style.background = corNec(v);
        b.parentNode.style.animation = v < 20 ? 'necPisca 1s steps(2) infinite' : '';
    });
}
function mostrarGanhoNec(k, v) {
    if (S.necMini)
        return;
    const b = $('necB_' + k);
    if (!b)
        return;
    const r = b.parentNode.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'necGanho';
    el.textContent = '+' + Math.round(v);
    el.style.left = (r.right + 5) + 'px';
    el.style.top = (r.top - 4) + 'px';
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transform = 'translateY(-10px)'; el.style.opacity = '0'; }));
    setTimeout(() => el.remove(), 1200);
}
function atualizarNec(dt) {
    const F = S.fefe;
    if (!F)
        return;
    NEC.forEach(n => { F[n.k] = lim(F[n.k] - n.cai * dt / 3600); });
    const agora = performance.now();
    necComidaAntes = comidaNoTapete;
    if (FEFE.pose === 'cama')
        nec('energia', .4 * dt);
    else if (FEFE.pose)
        nec('energia', .06 * dt);
    if (dormindoAgora && !necDormindo)
        nec('energia', 60);
    necDormindo = dormindoAgora;
    if (tvLigada)
        nec('diversao', .3 * dt);
    if (agora < vitrolaAte)
        nec('diversao', .08 * dt);
    if (laser)
        nec('diversao', .25 * dt);
    if (FEFE.danca && agora < FEFE.danca)
        nec('diversao', .3 * dt);
    if (MAPA === 'cidade' || MAPA === 'parque')
        nec('diversao', .12 * dt);
    if (ISI.aqui)
        nec('social', .1 * dt);
    if (gatoPerto)
        nec('social', .2 * dt);
    if (FEFE.pose === 'cama' && gatos.some(g => g.estado === 'na_cama'))
        nec('social', .05 * dt);
    F.t = Date.now();
    const vis = !MAPA.startsWith('mem_') && !(typeof esconde !== 'undefined' && esconde && esconde.ate);
    if ((painelNec.style.display !== 'none') !== vis)
        painelNec.style.display = vis ? 'flex' : 'none';
    necUI -= dt;
    if (necUI <= 0) {
        necUI = 1;
        desenharNec();
    }
    if (bloqueioTela() || FEFE.pose)
        return;
    necDicaT -= dt;
    if (necDicaT > 0)
        return;
    necDicaT = 70 + Math.random() * 50;
    const baixo = NEC.filter(n => F[n.k] < 25).sort((a, b) => F[a.k] - F[b.k])[0];
    if (baixo)
        falar(FEFE, pick(DICA_NEC[baixo.k]), 2600);
}
function envolverNec(nome, fn) {
    const orig = window[nome];
    if (typeof orig !== 'function')
        return;
    const novo = function () { try {
        fn.apply(this, arguments);
    }
    catch (e) { } return orig.apply(this, arguments); };
    window[nome] = novo;
    const troca = L => L && L.forEach(p => { if (p.acao === orig)
        p.acao = novo; });
    troca(PONTOS);
    try {
        Object.values(CENAS).forEach(c => troca(c.PONTOS));
    }
    catch (e) { }
}
