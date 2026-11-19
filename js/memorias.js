const memPosTint = (c) => {
    const t = performance.now() / 1000;
    c.fillStyle = 'rgba(255,240,250,.07)';
    c.fillRect(0, 0, TW, TH);
    for (let i = 0; i < 14; i++) {
        const x = (i * 67 + Math.sin(t * .6 + i) * 20) % TW, y = (i * 41 + t * 8) % TH;
        c.fillStyle = 'rgba(255,255,255,.6)';
        c.fillRect(Math.round(x), Math.round(TH - y), 1, 1);
    }
};
let presentes = false;
