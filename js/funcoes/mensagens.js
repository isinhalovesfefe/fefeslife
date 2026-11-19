function atualizarMsgsIsi(dt) {
    if (ISI.aqui || msgPend || bloqueioTela())
        return;
    msgT -= dt;
    if (msgT > 0)
        return;
    msgT = 180 + Math.random() * 150;
    const h = horaAgora();
    const lista = (h >= 22 || h < 2) ? MSGS_NOITE.concat(MSGS_ISI) : MSGS_ISI;
    let c;
    do {
        c = pick(lista);
    } while (lista.length > 1 && S.ultMsgIsi === c.m);
    S.ultMsgIsi = c.m;
    msgPend = c;
    atualizarBadgeCel();
    som.plim();
    toast(`💬 ${NOME_MINHA}: ${c.m}`);
}
