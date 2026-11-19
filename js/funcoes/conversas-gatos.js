function atualizarGatosJuntas(dt) {
    if (MAPA !== 'quarto' || !ISI.aqui || ISI.pose || ISI.atv || bloqueioTela() || performance.now() < conversaAte || FEFE.pose)
        return;
    gatoMomentoT -= dt;
    if (gatoMomentoT > 0)
        return;
    gatoMomentoT = 35 + Math.random() * 30;
    const acord = gatos.filter(g => !S.gatos[g.id].dormindo && g.estado !== 'oculto' && g.estado !== 'escondido' && g.estado !== 'caos' && g !== gatoPerto);
    if (!acord.length)
        return;
    const g = pick(acord), id = g.id;
    const M = {
        lola: [() => { irPara(g, ISI.x + 6, ISI.y + 4, () => { falar(g, 'prrrr ♥', 1600); particula('coracao', g.x, g.y - 14, 2); setTimeout(() => falar(ISI, 'Amor, a Lola tá se esfregando em mim!', 2200), 700); setTimeout(() => falar(FEFE, 'Ela te ama, né?', 1800), 2600); }, 40); },
            () => { irPara(g, (FEFE.x + ISI.x) / 2, FEFE.y + 10, () => { falar(g, 'miau?', 1200); setTimeout(() => falar(FEFE, 'A Lola quer atenção das duas', 2000), 800); setTimeout(() => { falar(ISI, 'Carinho duplo pra ela!', 1800); particula('coracao', g.x, g.y - 14, 4); }, 2600); }, 40); }],
        clarinha: [() => { irPara(g, ISI.x - 8, ISI.y + 6, () => { falar(g, '*cheira a Isinha*', 1600); setTimeout(() => falar(ISI, 'Princesa, olha! A Clarinha veio até mim 🥺', 2400), 900); setTimeout(() => falar(g, '...tá. pode ficar.', 1600), 3200); }, 30); },
            () => { falar(ISI, 'Clarinha, vem cá... por favorzinho?', 2000); setTimeout(() => { falar(g, 'Hm. Não.', 1400); }, 1500); setTimeout(() => falar(FEFE, 'Ela é assim mesmo, amor kkkk', 1800), 3000); }],
        tho: [() => { irPara(g, ISI.x + 4, ISI.y + 2, () => { falar(g, '*se joga no pé da Isinha*', 1600); setTimeout(() => falar(ISI, 'THO! Meu pé! kkkk', 1800), 800); setTimeout(() => falar(FEFE, 'Ele faz isso comigo também', 1800), 2600); }, 70); },
            () => { irPara(g, ISI.x, ISI.y - 6, () => { falar(g, 'MIAU MIAU MIAU', 1400); setTimeout(() => falar(ISI, 'Amor, acho que ele quer comida', 1900), 800); setTimeout(() => falar(FEFE, 'Ele SEMPRE quer comida', 1800), 2600); }, 60); },
            () => { falar(g, '*olha pro nada*', 1600); setTimeout(() => falar(ISI, 'Gatinha... o Tho tá vendo fantasma de novo', 2400), 1200); setTimeout(() => falar(FEFE, 'Normal. Ele é estranho kkkk', 1800), 3400); }],
    };
    pick(M[id] || M.lola)();
}
function atualizarExtras43(dt) { atualizarGatosJuntas(dt); }
