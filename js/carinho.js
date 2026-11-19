let gatoPerto = null, sessao = null;
const segs = (v, cor) => Array.from({ length: 10 }, (_, i) => `<i style="${v > i * 10 + 4 ? 'background:' + cor : ''}"></i>`).join('');
let acariciando = false, ultimoP = null;
const cena = $('cenaP');
cena.addEventListener('pointerdown', e => { audio(); acariciando = true; ultimoP = [e.clientX, e.clientY]; cena.setPointerCapture(e.pointerId); moverMao(e); });
cena.addEventListener('pointermove', e => {
    moverMao(e);
    if (gatoPerto && sessao.varinha) {
        varinhaMove(e);
        return;
    }
    if (!acariciando || !gatoPerto)
        return;
    const d = Math.hypot(e.clientX - ultimoP[0], e.clientY - ultimoP[1]);
    ultimoP = [e.clientX, e.clientY];
    const z = zonaToque(e.clientX, e.clientY);
    $('maoP').classList.toggle('mexe', !!z);
    if (!z)
        return;
    sessao.dist += d;
    if (sessao.dist > 55) {
        sessao.dist = 0;
        if (sessao.modo === 'escova')
            tickEscova(z, e);
        else if (sessao.modo === 'banho')
            tickBanho(z, e);
        else
            tickCarinho(z, e);
    }
});
const soltarCena = () => {
    acariciando = false;
    $('maoP').classList.remove('mexe');
    if (gatoPerto) {
        som.ronrom(0);
        const id = gatoPerto.id;
        if (!sessao.bloq && !sessao.varinha && sessao.gostou > 3 && id !== 'tho' && Math.random() < .35) {
            sessao.amassaAte = performance.now() + 700;
            renderGatoPerto();
            setTimeout(() => gatoPerto && renderGatoPerto(), 720);
            falarPerto('*toca sua mão com a patinha*', 1800);
        }
    }
};
cena.addEventListener('pointerup', soltarCena);
cena.addEventListener('pointercancel', soltarCena);
cena.addEventListener('pointerleave', () => { if (!acariciando)
    $('maoP').style.display = 'none'; });
$('maoP').innerHTML = iconeSVG('mao', 62).replace('style="height:62px"', 'width="100%"');
