function tocarBuzina(tipo, vol, carro) {
    if (!audio())
        return;
    const L = BUF[tipo];
    if (!L || !L.length) {
        if (_buzinaSint)
            _buzinaSint();
        return;
    }
    let i = Math.floor(Math.random() * L.length);
    if (carro) {
        if (carro.vozBuz == null)
            carro.vozBuz = Math.floor(Math.random() * 20);
        i = carro.vozBuz % L.length;
    }
    tocarBuffer(L[i], .97 + Math.random() * .06, vol);
}
function buzinaCarro(c) {
    c.nBuz = (c.nBuz || 0) + 1;
    const d = Math.hypot(c.x - FEFE.x, c.y - FEFE.y), vol = .55 * Math.max(.25, 1 - d / 350);
    if (c.tipoBuz == null)
        c.tipoBuz = pick(['buzCurta', 'buzCurta', 'buzMedia', 'buzBibi']);
    const tipo = c.nBuz >= 3 ? 'buzBrava' : c.tipoBuz;
    tocarBuzina(tipo, vol, c);
    return tipo === 'buzBrava' ? pick(['BIIIIIII!', 'SAI DA RUA!', 'BI-BI-BI!!']) : tipo === 'buzBibi' ? 'BIBIBI!' : 'BI-BI!';
}
function atualizarBuzinas(dt) {
    if (MAPA !== 'cidade') {
        return;
    }
    CARROS.forEach(c => { if (!c.esperando)
        c.nBuz = 0; });
    buzAmbT -= dt;
    if (buzAmbT > 0)
        return;
    const h = horaAgora(), noite = h >= 22 || h < 6;
    buzAmbT = (noite ? 60 : 22) + Math.random() * (noite ? 60 : 35);
    if (FEFE.y > CID2.CALC - 10)
        return;
    const perto = CARROS.filter(c => { const d = Math.hypot(c.x - FEFE.x, c.y - FEFE.y); return d > 60 && d < 420; });
    if (!perto.length)
        return;
    const c = pick(perto), d = Math.hypot(c.x - FEFE.x, c.y - FEFE.y);
    tocarBuzina(pick(['buzCurta', 'buzCurta', 'buzMedia', 'buzBibi']), .32 * Math.max(.15, 1 - d / 420), c);
}
