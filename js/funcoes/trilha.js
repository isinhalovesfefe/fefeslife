function iniciarTrilha() {
    if (trilha || !audio())
        return;
    const a = AC;
    const out = a.createGain();
    out.gain.value = 0.0001;
    out.connect(mestre);
    const dl = a.createDelay();
    dl.delayTime.value = .55;
    const fb = a.createGain();
    fb.gain.value = .32;
    dl.connect(fb);
    fb.connect(dl);
    dl.connect(out);
    const lp = a.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1800;
    lp.connect(out);
    lp.connect(dl);
    const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
    const nota = (m, t, d, v, tp) => { const o = a.createOscillator(), g = a.createGain(); o.type = tp; o.frequency.value = mtof(m); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(lp); o.start(t); o.stop(t + d + .05); };
    const BAT = 60 / 66;
    let i = 0, prox = a.currentTime + .3, ult = 72;
    const timer = setInterval(() => {
        while (prox < a.currentTime + 1.5) {
            const ac = TRILHA.ac[i % 4];
            nota(ac[0] - 24, prox, BAT * 4, .05, 'sine');
            [1, 2, 3].forEach((k, j) => nota(ac[k], prox + BAT * (j * .5 + 1), BAT * 3, .018, 'triangle'));
            for (let b = 0; b < 8; b++) {
                if (Math.random() < (b % 2 ? .35 : .6)) {
                    const op = TRILHA.mel.map(s => 72 + s).concat(TRILHA.mel.map(s => 84 + s)).filter(m => Math.abs(m - ult) <= 5);
                    ult = pick(op.length ? op : [72, 76, 79]);
                    nota(ult, prox + b * BAT / 2, 1.6, .03, 'sine');
                    nota(ult + 12, prox + b * BAT / 2, .6, .006, 'sine');
                }
            }
            prox += BAT * 4;
            i++;
        }
    }, 300);
    trilha = { out, timer, vol: 0 };
}
function atualizarTrilha() {
    if (S.trilha === undefined)
        S.trilha = true;
    if (!AC || !S.som || !S.trilha) {
        if (trilha)
            trilha.out.gain.setTargetAtTime(0.0001, AC.currentTime, .4);
        return;
    }
    iniciarTrilha();
    if (!trilha)
        return;
    const calar = musica || ['show', 'cinema'].includes(MAPA) || (typeof modalFilme !== 'undefined' && modalFilme);
    const alvo = calar ? 0.0001 : .55;
    if (Math.abs(alvo - trilha.vol) > .01) {
        trilha.vol = alvo;
        trilha.out.gain.setTargetAtTime(alvo, AC.currentTime, 1.2);
    }
}
function alternarTrilha() { S.trilha = !S.trilha; salvar(); trilha && (trilha.vol = -1); toast(S.trilha ? 'Trilha sonora ligada ♪' : 'Trilha sonora desligada'); }
