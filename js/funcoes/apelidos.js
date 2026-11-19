function atualizarExtras42() {
    if (!ISI.aqui || !ISI.maos || ISI.pose || ISI.estado === 'saindo')
        return;
    const tx = FEFE.x + 12, ty = FEFE.y + 1;
    if (FEFE.anda)
        ISI.dir = FEFE.dir;
    if (Math.hypot(tx - ISI.x, ty - ISI.y) < 60) {
        ISI.x += (tx - ISI.x) * .25;
        ISI.y += (ty - ISI.y) * .25;
    }
    if (Math.random() < .002)
        particula('coracao', (FEFE.x + ISI.x) / 2, FEFE.y - 30, 1);
}
