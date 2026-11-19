function peixeSorteado() { let s = PEIXES.reduce((a, p) => a + p.p, 0), r = Math.random() * s; for (const p of PEIXES) {
    r -= p.p;
    if (r <= 0)
        return p;
} return PEIXES[1]; }
function pescar() {
    S.peixes = S.peixes || {};
    let fase = 'espera', timer = null, raf = null;
    abrir('Pescando', `<div class="mg"><canvas id="cvPesca" width="80" height="56" style="width:100%;max-width:320px"></canvas><p id="pescaMsg">Esperando beliscar...</p>
    <button class="grande" id="btnPesca">PUXAR!</button><div style="margin-top:12px"><button class="btn branco" id="btnColecao">Coleção (${Object.keys(S.peixes).filter(k => k !== 'bota').length}/${PEIXES.length - 1})</button></div></div>`, false);
    const cv = $('cvPesca'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    let t0 = performance.now(), mordida = t0 + 2000 + Math.random() * 3500, peixe = null;
    let barra = 20, vel = 0, peixeY = 30, peixeV = 0, prog = 30, segurando = false;
    const desenha = () => {
        if (!$('cvPesca')) {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
            return;
        }
        const t = performance.now();
        x.fillStyle = '#6fb7e0';
        x.fillRect(0, 0, 80, 56);
        x.fillStyle = '#5ea8d6';
        for (let i = 0; i < 10; i++)
            x.fillRect((i * 17 + Math.floor(t / 90)) % 80, (i * 11) % 56, 6, 1);
        x.fillStyle = '#79c26a';
        x.fillRect(0, 48, 80, 8);
        x.fillStyle = '#2a1d30';
        x.fillRect(0, 46, 80, 2);
        if (fase === 'espera' || fase === 'fisgou') {
            const dip = fase === 'fisgou' ? 3 : Math.round(Math.sin(t / 300));
            x.fillStyle = '#fff';
            x.fillRect(38, 20 + dip, 4, 2);
            x.fillStyle = '#d63e4f';
            x.fillRect(38, 22 + dip, 4, 3);
            x.fillStyle = 'rgba(255,255,255,.6)';
            x.fillRect(35, 25, 10, 1);
            x.strokeStyle = '#2a1d30';
            x.beginPath();
            x.moveTo(78, 0);
            x.lineTo(40, 20 + dip);
            x.stroke();
            if (fase === 'fisgou') {
                x.fillStyle = '#fff';
                x.fillRect(44, 10, 2, 6);
                x.fillRect(44, 17, 2, 2);
            }
            if (fase === 'espera' && t > mordida) {
                fase = 'fisgou';
                if (audio())
                    tom(AC.currentTime, 900, .1, .06);
                $('pescaMsg').textContent = 'BELISCOU! Puxa!';
                timer = setTimeout(() => { if (fase === 'fisgou') {
                    fase = 'fim';
                    $('pescaMsg').textContent = 'Escapou... tenta de novo!';
                    fimPesca(false);
                } }, 900);
            }
        }
        if (fase === 'briga') {
            const dt = 1 / 60;
            const dif = 1 + peixe.r * .7;
            vel += (segurando ? -0.9 : 0.55);
            vel *= .88;
            barra = Math.max(0, Math.min(42, barra + vel * .6));
            if (Math.random() < .04 * dif)
                peixeV = (Math.random() - .5) * 3 * dif;
            peixeY = Math.max(2, Math.min(50, peixeY + peixeV));
            peixeV *= .97;
            const dentro = peixeY > barra && peixeY < barra + 14;
            prog = Math.max(0, Math.min(100, prog + (dentro ? 0.7 : -0.5)));
            x.fillStyle = '#2a1d30';
            x.fillRect(30, 2, 14, 52);
            x.fillStyle = '#c8e8ff';
            x.fillRect(31, 3, 12, 50);
            x.fillStyle = dentro ? '#7bd389' : '#a8dcbf';
            x.fillRect(31, 3 + barra, 12, 14);
            x.fillStyle = peixe.cor;
            x.fillRect(34, 2 + peixeY, 6, 3);
            x.fillRect(32, 3 + peixeY, 2, 1);
            x.fillStyle = '#2a1d30';
            x.fillRect(48, 2, 6, 52);
            x.fillStyle = '#ff7aa8';
            x.fillRect(49, 53 - Math.round(prog / 2), 4, Math.round(prog / 2));
            if (prog >= 100) {
                fase = 'fim';
                fimPesca(true);
            }
            else if (prog <= 0) {
                fase = 'fim';
                $('pescaMsg').textContent = 'Ele fugiu! Tenta de novo.';
                fimPesca(false);
            }
        }
        if (fase !== 'fim')
            raf = requestAnimationFrame(desenha);
    };
    const btn = $('btnPesca');
    btn.onpointerdown = (e) => {
        e.preventDefault();
        audio();
        if (fase === 'espera') {
            $('pescaMsg').textContent = 'Calma, ainda não beliscou...';
            mordida += 800;
        }
        else if (fase === 'fisgou') {
            clearTimeout(timer);
            fase = 'briga';
            peixe = peixeSorteado();
            btn.textContent = 'SEGURA!';
            $('pescaMsg').textContent = 'Segure pra subir a barra e mantenha o peixe dentro dela!';
            segurando = true;
        }
        else if (fase === 'briga')
            segurando = true;
    };
    btn.onpointerup = btn.onpointerleave = () => { segurando = false; };
    const fimPesca = (ok) => {
        cancelAnimationFrame(raf);
        if (ok) {
            const novo = !S.peixes[peixe.id];
            S.peixes[peixe.id] = (S.peixes[peixe.id] || 0) + 1;
            som.plim();
            $('pescaMsg').innerHTML = `Você pescou: <b>${peixe.n}</b> (${RAR[peixe.r]})${novo && peixe.r > 0 ? '<br>Novo na coleção! ♥' : ''}`;
            if (novo && peixe.r > 0)
                ganhar(peixe.r + 1);
            salvar();
            if (ISI.aqui)
                setTimeout(() => falar(ISI, peixe.id === 'bota' ? 'KKKKK uma bota!' : peixe.r >= 3 ? 'NÃO ACREDITO!!! LENDÁRIO!' : 'Boa, amor!'), 400);
        }
        btn.textContent = 'Pescar de novo';
        btn.onpointerdown = null;
        btn.onclick = pescar;
    };
    $('btnColecao').onclick = () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
        abrir('Coleção de peixes', `<div class="lista">${PEIXES.map(p => `<div class="item px" style="cursor:default"><span style="width:26px;height:12px;background:${S.peixes[p.id] ? p.cor : '#ccc'};box-shadow:0 0 0 2px var(--o)"></span><span><b>${S.peixes[p.id] ? p.n : '???'}</b><br><small>${RAR[p.r]}${S.peixes[p.id] ? ' · pescou ' + S.peixes[p.id] + 'x' : ''}</small></span></div>`).join('')}</div><button class="btn" id="voltarPesca">Pescar</button>`, false);
        $('voltarPesca').onclick = pescar;
    };
    raf = requestAnimationFrame(desenha);
}
function jogoRitmo() {
    const juntas = ISI.aqui;
    const MEL = [60, 64, 67, 64, 62, 65, 69, 65, 64, 67, 72, 67, 65, 64, 62, 60, 64, 67, 69, 67, 65, 64, 62, 64, 60, 62, 64, 65, 67, 72];
    const notas = MEL.map((m, i) => ({ t: 2 + i * 0.62 + (i % 4 === 3 ? .2 : 0), l: [0, 1, 2][(m + i) % 3], m, ok: null }));
    const fimT = notas[notas.length - 1].t + 2;
    const LETRA = ['♪ la la la ♪', '♪ você é meu lugar ♪', '♪ hmm hmm ♪', '♪ com três gatinhos ♪', '♪ e um sofá ♪', '♪ la la la ♪'];
    abrir(juntas ? `Tocando com a ${NOME_MINHA}` : 'Tocando guitarra', `<div class="mg"><canvas id="cvRitmo" width="90" height="70" style="display:block;margin:0 auto;height:min(calc(92vh - 215px),250px);width:auto;max-width:100%;image-rendering:pixelated"></canvas>
    <p id="ritmoMsg">${juntas ? `Você toca, a ${NOME_MINHA} canta! Aperte quando a nota chegar na linha.` : 'Aperte quando a nota chegar na linha.'}</p>
    <div class="lanes"><button data-l="0" style="background:#ff7aa8">◆</button><button data-l="1" style="background:#ffd36e">◆</button><button data-l="2" style="background:#8fcaff">◆</button></div></div>`, false);
    const cv = $('cvRitmo'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const LX = [22, 45, 68], CORES = ['#ff7aa8', '#ffd36e', '#8fcaff'];
    let t0 = performance.now() + 300, acertos = 0, perfeitos = 0, raf, letraI = 0, flash = [0, 0, 0];
    const tocar = (l) => {
        audio();
        const t = (performance.now() - t0) / 1000;
        flash[l] = performance.now();
        const n = notas.find(n => n.ok === null && n.l === l && Math.abs(n.t - t) < .2);
        if (n) {
            n.ok = true;
            acertos++;
            if (Math.abs(n.t - t) < .08)
                perfeitos++;
            if (AC) {
                tom(AC.currentTime, 440 * Math.pow(2, (n.m - 69) / 12), .35, .09, 'triangle');
                tom(AC.currentTime, 440 * Math.pow(2, (n.m - 57) / 12), .4, .05, 'sine');
            }
            if (juntas && acertos % 5 === 0) {
                $('ritmoMsg').textContent = `${NOME_MINHA}: ${LETRA[letraI++ % LETRA.length]}`;
            }
        }
        else if (AC)
            tom(AC.currentTime, 110, .08, .04, 'square');
    };
    document.querySelectorAll('.lanes [data-l]').forEach(b => b.onpointerdown = (e) => { e.preventDefault(); tocar(+b.dataset.l); });
    const tecla = (e) => { const m = { a: 0, s: 1, d: 2, j: 0, k: 1, l: 2 }[e.key.toLowerCase()]; if (m != null && $('cvRitmo'))
        tocar(m); };
    addEventListener('keydown', tecla);
    const loop = () => {
        if (!$('cvRitmo')) {
            removeEventListener('keydown', tecla);
            return;
        }
        const t = (performance.now() - t0) / 1000;
        x.fillStyle = '#1d1830';
        x.fillRect(0, 0, 90, 70);
        LX.forEach((lx, i) => { x.fillStyle = '#2a2235'; x.fillRect(lx - 6, 0, 12, 70); if (performance.now() - flash[i] < 120) {
            x.fillStyle = CORES[i];
            x.globalAlpha = .4;
            x.fillRect(lx - 6, 52, 12, 8);
            x.globalAlpha = 1;
        } });
        x.fillStyle = '#fff';
        x.fillRect(10, 56, 70, 1);
        notas.forEach(n => { if (n.ok === null && t - n.t > .22)
            n.ok = false; if (n.ok)
            return; const y = 56 - (n.t - t) * 40; if (y < -6 || y > 72)
            return; x.fillStyle = n.ok === false ? '#55505f' : CORES[n.l]; x.fillRect(LX[n.l] - 4, Math.round(y) - 2, 8, 4); x.fillStyle = '#fff'; x.fillRect(LX[n.l] - 3, Math.round(y) - 2, 3, 1); });
        x.fillStyle = '#fff';
        x.font = '6px monospace';
        x.fillText(`${acertos}/${notas.length}`, 3, 7);
        if (t < fimT)
            raf = requestAnimationFrame(loop);
        else {
            removeEventListener('keydown', tecla);
            const pct = acertos / notas.length, est = pct > .85 ? 3 : pct > .6 ? 2 : 1;
            $('ritmoMsg').innerHTML = `${'★'.repeat(est)}${'☆'.repeat(3 - est)}<br>${est === 3 ? (juntas ? 'Que dupla! Show lotado garantido.' : 'Perfeito!') : est === 2 ? 'Mandou bem!' : 'Dá pra melhorar, mas foi fofo.'}`;
            if (!S.feitos.ritmo) {
                S.feitos.ritmo = true;
                ganhar(est);
                salvar();
            }
            if (juntas)
                setTimeout(() => falar(ISI, est === 3 ? 'Vamos montar uma banda!' : 'Mais uma?'), 300);
            document.querySelector('.lanes').innerHTML = '<button class="btn" id="ritmoDeNovo" style="width:auto;margin:0">Tocar de novo</button>';
            $('ritmoDeNovo').onclick = jogoRitmo;
        }
    };
    raf = requestAnimationFrame(loop);
}
