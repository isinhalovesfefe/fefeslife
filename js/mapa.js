const _redim41 = redimensionar;
window.redimensionar = function () {
    _redim41();
    if (String(MAPA).startsWith('int_') && typeof TH !== 'undefined' && Z * TH > innerHeight * 1.12 && Z > 2) {
        Z = Z - 1;
        vw = innerWidth / Z;
        vh = innerHeight / Z;
    }
};
const _abrirMapa41 = abrirMapa;
window.abrirMapa = function () {
    _abrirMapa41();
    const cv = $('cvMapa');
    if (!cv)
        return;
    const p = cv.parentElement.querySelector('p');
    if (p)
        p.innerHTML += '<br><b>Toque num lugar já descoberto pra ir direto pra lá ✨</b>';
    cv.style.cursor = 'pointer';
    cv.addEventListener('click', e => {
        const r = cv.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width * CID2.W, my = (e.clientY - r.top) / r.height * CID2.H;
        let best = null, bd = 90;
        (S.lugares || []).forEach(id => { const L = LUGARES.find(l => l.id === id); if (!L)
            return; const d = Math.hypot(L.x - mx, L.y - my); if (d < bd) {
            bd = d;
            best = L;
        } });
        if (!best)
            return toast('Descubra esse lugar primeiro andando por aí 🗺️');
        fechar();
        const ir = () => {
            let x = best.x, y = best.y + 18;
            for (let r2 = 0; r2 < 80 && bloqueado(x, y); r2 += 6) {
                for (const [dx, dy] of [[0, r2], [r2, 0], [-r2, 0], [0, -r2]])
                    if (!bloqueado(best.x + dx, best.y + 18 + dy)) {
                        x = best.x + dx;
                        y = best.y + 18 + dy;
                        r2 = 999;
                        break;
                    }
            }
            FEFE.x = x;
            FEFE.y = y;
            FEFE.alvo = null;
            if (ISI.aqui) {
                ISI.x = x + 14;
                ISI.y = y + 2;
            }
            const [cx, cy] = alvoCamera();
            cam.x = cx;
            cam.y = cy;
            falar(FEFE, `Chegamos: ${best.n}!`, 1600);
        };
        if (MAPA === 'cidade')
            fadeEntao(ir);
        else {
            trocarCena('cidade');
            const t0 = performance.now(), esp = () => { if (MAPA === 'cidade' && CENAS.cidade)
                setTimeout(ir, 120);
            else if (performance.now() - t0 < 4000)
                setTimeout(esp, 60); };
            esp();
        }
    });
};
const _atTrilha41 = atualizarTrilha;
window.atualizarTrilha = function () {
    _atTrilha41();
    const pts = [FEFE].concat(ISI.aqui ? [ISI] : []).map(p => aTela(p.x, p.y));
    const dormindo = FEFE.pose === 'cama' || ISI.pose === 'cama';
    [painelNec, painelIsi].forEach(el => {
        if (!el || !el.isConnected)
            return;
        const r = el.getBoundingClientRect();
        const cobre = pts.some(([x, y]) => x > r.left - 12 && x < r.right + 12 && y > r.top && y - 28 * Z < r.bottom);
        const op = dormindo ? '0' : cobre ? '.15' : '';
        if (el.style.opacity !== op) {
            el.style.opacity = op;
            el.style.transition = 'opacity .3s';
            el.style.pointerEvents = op ? 'none' : '';
        }
    });
};
