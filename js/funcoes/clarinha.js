function atualizarClarinha(dt) {
    if (MAPA !== 'quarto' || bloqueioTela() || FEFE.pose || performance.now() < conversaAte)
        return;
    clarinhaT -= dt;
    if (clarinhaT > 0)
        return;
    clarinhaT = 55 + Math.random() * 45;
    const c = G('clarinha');
    if (!c || S.gatos.clarinha.dormindo || !['parado', 'andando'].includes(c.estado) || c === gatoPerto)
        return;
    const l = G('lola'), lolaOk = l && !S.gatos.lola.dormindo && ['parado', 'andando'].includes(l.estado);
    const ops = ['perna', 'piscada'];
    if (lolaOk)
        ops.push('lola', 'lola');
    if (ISI.aqui && ISI.estado === 'seguindo' && !ISI.pose)
        ops.push('isi');
    const o = pick(ops);
    conversaAte = performance.now() + 5500;
    if (o === 'perna')
        irPara(c, FEFE.x + 8, FEFE.y + 3, () => {
            c.dir = -1;
            falar(c, '*se esfrega na perna da Fefe*', 2000);
            particula('coracao', c.x, c.y - 14, 2);
            som.miau('clarinha', 1);
            setTimeout(() => falar(FEFE, pick(['Oi, meu amorzinho ♥', 'Que carinhosa você tá hoje!', 'Clarinha?! Que milagre ♥'])), 1400);
            setTimeout(() => falar(c, pick(['...só hoje, tá?', 'prrr', 'não conta pra ninguém.'])), 3200);
        }, 26);
    else if (o === 'piscada') {
        falar(c, '*olha pra Fefe e pisca devagarinho*', 2200);
        setTimeout(() => { falar(FEFE, 'Ela me deu um beijinho de gato ♥', 2000); particula('coracao', c.x, c.y - 14, 2); }, 1500);
    }
    else if (o === 'lola')
        aproximar(c, l, () => {
            falar(c, pick(['*lambe a cabeça da Lola*', '*deita encostadinha na Lola*', '*dá uma cabeçadinha na Lola*']), 2200);
            particula('coracao', (c.x + l.x) / 2, c.y - 16, 3);
            setTimeout(() => falar(l, pick(['CLARINHA?! ♥♥♥', 'prrrrrr', 'Melhor dia da minha vida!']), 1800), 1300);
            if (Math.random() < .5)
                setTimeout(() => falar(FEFE, 'Olha as duas, que fofas ♥', 1800), 2800);
        });
    else if (o === 'isi')
        irPara(c, ISI.x - 9, ISI.y + 3, () => { falar(c, '*senta do ladinho da Isinha*', 2000); setTimeout(() => falar(ISI, pick(['Amor, ela veio sozinha!!', 'Clarinha, você me ama? 🥺']), 2000), 1300); setTimeout(() => falar(c, pick(['...um pouquinho.', 'prr.', '*pisca devagar*']), 1600), 3100); particula('coracao', c.x, c.y - 14, 2); }, 26);
}
