function audio() {
    if (!AC) {
        try {
            AC = new (window.AudioContext || window.webkitAudioContext)();
            mestre = AC.createGain();
            mestre.gain.value = S.som ? 1 : 0;
            mestre.connect(AC.destination);
        }
        catch (e) {
            return null;
        }
    }
    if (AC.state === 'suspended')
        AC.resume();
    if (!carregando)
        carregarSons();
    return AC;
}
function carregarSons() {
    carregando = true;
    for (const k in ARQ_SONS)
        ARQ_SONS[k].forEach(url => {
            fetch(url).then(r => { if (!r.ok)
                throw 0; return r.arrayBuffer(); })
                .then(ab => new Promise((ok, erro) => AC.decodeAudioData(ab, ok, erro)))
                .then(b => { (BUF[k] = BUF[k] || []).push(b); })
                .catch(() => { });
        });
}
function tocarBuffer(buf, rate, vol) {
    const a = AC, s = a.createBufferSource(), g = a.createGain();
    s.buffer = buf;
    s.playbackRate.value = rate;
    g.gain.value = vol;
    s.connect(g);
    g.connect(mestre);
    s.start();
}
function ruido() { if (!ruidoBuf) {
    ruidoBuf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate);
    const d = ruidoBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
        d[i] = Math.random() * 2 - 1;
} return ruidoBuf; }
function env(g, t, a, v, d) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + d); }
function ruidoCurto(t, dur, tipo, freq, vol, q = 1) {
    const a = AC, s = a.createBufferSource();
    s.buffer = ruido();
    const f = a.createBiquadFilter();
    f.type = tipo;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = a.createGain();
    env(g, t, .01, vol, dur);
    s.connect(f);
    f.connect(g);
    g.connect(mestre);
    s.start(t, Math.random());
    s.stop(t + dur + .05);
}
function tom(t, freq, dur, vol, tipo = 'sine', ate) {
    const a = AC, o = a.createOscillator(), g = a.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(freq, t);
    if (ate)
        o.frequency.exponentialRampToValueAtTime(ate, t + dur);
    env(g, t, .01, vol, dur);
    o.connect(g);
    g.connect(mestre);
    o.start(t);
    o.stop(t + dur + .05);
}
function tocarMusica(qual) {
    if (!audio() || musica)
        return;
    const a = AC;
    const D = DISCOS[qual || S.disco || 'dreamy'] || DISCOS.dreamy;
    const out = a.createGain();
    out.gain.value = 0.0001;
    out.gain.exponentialRampToValueAtTime(.5, a.currentTime + 2);
    out.connect(mestre);
    const dl = a.createDelay();
    dl.delayTime.value = .42;
    const fb = a.createGain();
    fb.gain.value = .38;
    dl.connect(fb);
    fb.connect(dl);
    dl.connect(out);
    const lp = a.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2200;
    lp.connect(out);
    lp.connect(dl);
    const acordes = D.acordes;
    const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
    const nota = (m, t, d, v, tp) => { const o = a.createOscillator(), g = a.createGain(); o.type = tp; o.frequency.value = mtof(m); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + Math.min(.8, d * .3)); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(lp); o.start(t); o.stop(t + d + .1); };
    let i = 0, prox = a.currentTime + .1;
    const timer = setInterval(() => {
        while (prox < a.currentTime + 1.2) {
            const ac = acordes[i % 4];
            ac.forEach(m => nota(m, prox, D.dur + .2, .035, 'triangle'));
            nota(ac[0] - 12, prox, D.dur + .2, .06, 'sine');
            for (let k = 0; k * D.passo < D.dur; k++)
                if (Math.random() < .6)
                    nota(ac[Math.floor(Math.random() * 4)] + 12 + (Math.random() < .25 ? 12 : 0), prox + k * D.passo, 1.1, .045, 'sine');
            prox += D.dur;
            i++;
        }
    }, 250);
    musica = { out, timer };
}
function pararMusica() { if (!musica)
    return; const m = musica; musica = null; if (m.faixa) {
    pararFaixa(m.faixa);
    return;
} clearInterval(m.timer); m.out.gain.setTargetAtTime(0.0001, AC.currentTime, .5); setTimeout(() => m.out.disconnect(), 3000); }
