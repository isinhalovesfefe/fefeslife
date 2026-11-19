let AC = null, mestre = null, ruidoBuf = null;
const ARQ_SONS = {
    lola: ['sons/lola1.mp3', 'sons/lola2.mp3'],
    clarinha: ['sons/clarinha1.mp3', 'sons/clarinha2.mp3'],
    tho: ['sons/tho1.mp3', 'sons/tho2.mp3', 'sons/tho3.mp3'],
    thoEstranho: ['sons/tho_estranho.mp3'],
    ronrom: ['sons/ronrom.mp3'],
};
const BUF = {};
let carregando = false;
const VOZ_REAL = { lola: { rate: 1.0, vol: .75 }, clarinha: { rate: 1.1, vol: .45 }, tho: { rate: .92, vol: .9 } };
const VOZ = { lola: { f: 560, sobe: 1.35, cai: .82, dur: .62, vol: .2 }, clarinha: { f: 780, sobe: 1.12, cai: .92, dur: .3, vol: .11 }, tho: { f: 390, sobe: 1.7, cai: .55, dur: .78, vol: .26 } };
let ronromNo = null;
const som = {
    miau(id, tom2 = 1) {
        if (!audio())
            return;
        if (BUF[id] && BUF[id].length) {
            const vr = VOZ_REAL[id];
            let lista = BUF[id];
            if (id === 'tho' && BUF.thoEstranho && Math.random() < .2)
                lista = BUF.thoEstranho;
            tocarBuffer(pick(lista), vr.rate * tom2 * (.95 + Math.random() * .1), vr.vol);
            return;
        }
        const v = VOZ[id], a = AC, t = a.currentTime, f = v.f * (.9 + Math.random() * .2) * tom2, d = v.dur * (.85 + Math.random() * .3);
        const o = a.createOscillator(), o2 = a.createOscillator(), bp = a.createBiquadFilter(), lp = a.createBiquadFilter(), g = a.createGain();
        o.type = 'sawtooth';
        o2.type = 'triangle';
        [o, o2].forEach((x, i) => { const k = i ? 1.006 : 1; x.frequency.setValueAtTime(f * .9 * k, t); x.frequency.linearRampToValueAtTime(f * v.sobe * k, t + d * .35); x.frequency.linearRampToValueAtTime(f * v.cai * k, t + d); });
        bp.type = 'bandpass';
        bp.Q.value = 2.5;
        bp.frequency.setValueAtTime(f * 1.4, t);
        bp.frequency.linearRampToValueAtTime(f * 3.2, t + d * .4);
        bp.frequency.linearRampToValueAtTime(f * 1.5, t + d);
        lp.type = 'lowpass';
        lp.frequency.value = 3800;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v.vol, t + .06);
        g.gain.setValueAtTime(v.vol, t + d * .55);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(bp);
        o2.connect(bp);
        bp.connect(lp);
        lp.connect(g);
        g.connect(mestre);
        o.start(t);
        o2.start(t);
        o.stop(t + d + .05);
        o2.stop(t + d + .05);
    },
    ronrom(vol, id) {
        if (!audio())
            return;
        const a = AC;
        if (!ronromNo && BUF.ronrom && BUF.ronrom.length) {
            const s = a.createBufferSource();
            s.buffer = BUF.ronrom[0];
            s.loop = true;
            s.loopStart = .03;
            s.loopEnd = s.buffer.duration - .03;
            const out = a.createGain();
            out.gain.value = 0.0001;
            s.connect(out);
            out.connect(mestre);
            s.start(0, .03);
            ronromNo = { out, s, real: true };
        }
        if (ronromNo && ronromNo.real && id)
            ronromNo.s.playbackRate.setTargetAtTime(id === 'tho' ? .9 : id === 'clarinha' ? 1.08 : 1, a.currentTime, .1);
        if (!ronromNo) {
            const s = a.createBufferSource();
            s.buffer = ruido();
            s.loop = true;
            const lp = a.createBiquadFilter();
            lp.type = 'lowpass';
            lp.frequency.value = 220;
            const am = a.createGain();
            am.gain.value = .5;
            const lfo = a.createOscillator();
            lfo.frequency.value = 23;
            const lg = a.createGain();
            lg.gain.value = .5;
            lfo.connect(lg);
            lg.connect(am.gain);
            const o = a.createOscillator();
            o.frequency.value = 46;
            const og = a.createGain();
            og.gain.value = .25;
            o.connect(og);
            og.connect(am);
            const out = a.createGain();
            out.gain.value = 0.0001;
            s.connect(lp);
            lp.connect(am);
            am.connect(out);
            out.connect(mestre);
            s.start();
            lfo.start();
            o.start();
            ronromNo = { out, s, lfo, o };
        }
        ronromNo.out.gain.setTargetAtTime(Math.max(0.0001, ronromNo.real ? Math.min(1, vol * 1.6) : vol), a.currentTime, .25);
    },
    chiado() { if (!audio())
        return; ruidoCurto(AC.currentTime, .7, 'highpass', 2600, .22); },
    crash() { if (!audio())
        return; const t = AC.currentTime; ruidoCurto(t, .45, 'bandpass', 900, .5, .7); tom(t + .05, 2100, .25, .08, 'triangle'); tom(t + .12, 2700, .2, .06, 'triangle'); tom(t + .2, 1800, .3, .05, 'triangle'); },
    foto() { if (!audio())
        return; const t = AC.currentTime; ruidoCurto(t, .05, 'highpass', 3000, .4); ruidoCurto(t + .09, .06, 'highpass', 2000, .35); },
    plim() { if (!audio())
        return; const t = AC.currentTime; tom(t, 1320, .12, .06); tom(t + .08, 1760, .18, .06); },
    pop() { if (!audio())
        return; tom(AC.currentTime, 600, .08, .05, 'sine', 900); },
    roupa() { if (!audio())
        return; ruidoCurto(AC.currentTime, .25, 'bandpass', 1800, .15, 1.5); },
    agua() { if (!audio())
        return; const t = AC.currentTime; for (let i = 0; i < 5; i++)
        tom(t + i * .07, 700 + Math.random() * 700, .08, .04, 'sine', 1400); },
    nota() { if (!audio())
        return; const n = [60, 62, 64, 67, 69, 72][Math.floor(Math.random() * 6)]; tom(AC.currentTime, 440 * Math.pow(2, (n - 69) / 12), .6, .08, 'triangle'); },
};
let musica = null;
const DISCOS = {
    dreamy: { n: 'Dreamy', acordes: [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]], dur: 3.2, passo: .4 },
    lofi: { n: 'Lo-fi', acordes: [[50, 53, 57, 60], [55, 59, 62, 65], [48, 52, 55, 59], [57, 60, 64, 67]], dur: 2.4, passo: .3 },
    bossa: { n: 'Bossa', acordes: [[57, 60, 64, 67], [50, 54, 57, 60], [55, 59, 62, 65], [48, 52, 55, 59]], dur: 2.0, passo: .25 },
};
