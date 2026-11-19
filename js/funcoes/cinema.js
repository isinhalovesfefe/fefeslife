function cenaFilme(c, X, Y, W, H, g, t) {
    const R = (x, y, w, h, k) => { c.fillStyle = k; c.fillRect(Math.round(X + x), Math.round(Y + y), Math.round(w), Math.round(h)); };
    const cena = Math.floor(t / 6) % 3, k = (t % 6) / 6;
    const ceu = (a, b) => { const gr = c.createLinearGradient(0, Y, 0, Y + H); gr.addColorStop(0, a); gr.addColorStop(1, b); c.fillStyle = gr; c.fillRect(X, Y, W, H); };
    const pessoa = (x, y, cor) => { R(x, y, 4, 4, cor); R(x - 1, y + 4, 6, 8, cor); R(x, y + 12, 1, 4, cor); R(x + 3, y + 12, 1, 4, cor); };
    if (g === 'romance') {
        if (cena === 0) {
            ceu('#ff9a7a', '#ffd36e');
            R(W / 2 - 10, H - 20, 20, 10, '#fff2a8');
            R(0, H - 12, W, 12, '#5b6fa8');
            for (let i = 0; i < W; i += 12)
                R(i + (t * 8 % 12), H - 10, 6, 1, '#8fcaff');
            const d = Math.max(0, 24 - k * 30);
            pessoa(W / 2 - 12 - d, H - 28, '#2a1d30');
            pessoa(W / 2 + 8 + d, H - 28, '#2a1d30');
            if (d <= 0) {
                const h = Math.round((t * 4) % 10);
                R(W / 2 - 2, H - 36 - h, 2, 2, '#ff5c8d');
                R(W / 2 + 1, H - 36 - h, 2, 2, '#ff5c8d');
                R(W / 2 - 1, H - 35 - h, 3, 2, '#ff5c8d');
            }
        }
        else if (cena === 1) {
            ceu('#2e2a66', '#5b6fa8');
            for (let i = 0; i < 30; i++)
                R((i * 37 + t * 40) % W, (i * 13 + t * 90) % H, 1, 3, 'rgba(220,235,255,.7)');
            R(W / 2 - 14, H - 30, 28, 4, '#ff5c8d');
            R(W / 2 - 1, H - 26, 1, 10, '#2a1d30');
            pessoa(W / 2 - 6, H - 22, '#1a1418');
            pessoa(W / 2 + 3, H - 22, '#1a1418');
        }
        else {
            ceu('#bfe3ff', '#d6f5d6');
            R(0, H - 10, W, 10, '#7bd389');
            R(W / 2 - 18, H - 16, 36, 3, '#8a5a3a');
            R(W / 2 - 16, H - 13, 2, 4, '#5e3d2e');
            R(W / 2 + 14, H - 13, 2, 4, '#5e3d2e');
            pessoa(W / 2 - 8, H - 28, '#ff7aa8');
            pessoa(W / 2 + 4, H - 28, '#5b8cff');
            for (let i = 0; i < 12; i++)
                R((i * 29 + t * 12) % W, (i * 7 + t * 14) % H, 2, 2, '#ffb3d1');
        }
    }
    else if (g === 'terror') {
        if (cena === 0) {
            ceu('#0d0b1a', '#2a1d30');
            R(0, H - 8, W, 8, '#140f14');
            R(W / 2 - 20, H - 30, 40, 22, '#1a1418');
            R(W / 2 - 24, H - 34, 48, 4, '#1a1418');
            R(W / 2 - 6, H - 24, 6, 6, Math.floor(t * 3) % 4 ? '#ffd36e' : '#2a1d30');
            R(W / 2 + 8, H - 24, 6, 6, '#2a1d30');
            if (Math.floor(t * 5) % 23 === 0) {
                R(0, 0, W, H, 'rgba(255,255,255,.8)');
            }
            R(W - 30, 6, 8, 8, '#e8e8d0');
        }
        else if (cena === 1) {
            ceu('#1a1418', '#2a1d30');
            for (let i = 0; i < W; i += 30)
                R(i, 4, 3, H - 8, '#3a2a3a');
            const gx = (k * W * 1.2) - 10, gy = 10 + Math.sin(t * 3) * 4;
            R(gx, gy, 14, 14, 'rgba(240,240,255,.85)');
            R(gx + 3, gy + 4, 2, 3, '#1a1418');
            R(gx + 9, gy + 4, 2, 3, '#1a1418');
            for (let i = 0; i < 14; i += 3)
                R(gx + i, gy + 14, 2, 2, 'rgba(240,240,255,.85)');
        }
        else {
            R(0, 0, W, H, '#050308');
            for (let i = 0; i < 6; i++) {
                if (Math.floor(t * 2 + i) % 5 === 0)
                    continue;
                const ex = (i * 37) % (W - 10) + 4, ey = (i * 13) % (H - 8) + 4;
                R(ex, ey, 2, 2, '#ff3a3a');
                R(ex + 5, ey, 2, 2, '#ff3a3a');
            }
        }
    }
    else if (g === 'animacao') {
        if (cena === 0) {
            ceu('#bfe3ff', '#fff1c2');
            ['#ff5c8d', '#ffd36e', '#7bd389', '#5b8cff', '#c08cff'].forEach((cor, i) => { c.strokeStyle = cor; c.lineWidth = 2; c.beginPath(); c.arc(X + W / 2, Y + H + 6, 40 - i * 3, Math.PI, 0); c.stroke(); });
            R(0, H - 8, W, 8, '#7bd389');
            const bx = ((t * 30) % (W + 20)) - 10, by = H - 18 - Math.abs(Math.sin(t * 5)) * 14;
            R(bx, by, 12, 10, '#ff7aa8');
            R(bx + 3, by + 3, 2, 2, '#2a1d30');
            R(bx + 7, by + 3, 2, 2, '#2a1d30');
            R(bx + 4, by + 7, 4, 1, '#2a1d30');
        }
        else if (cena === 1) {
            ceu('#d6f5d6', '#bfe3ff');
            R(0, H - 8, W, 8, '#5fae6a');
            const bfx = W / 2 + Math.sin(t * 2) * 40, bfy = 14 + Math.cos(t * 3) * 6;
            R(bfx, bfy, 3, 3, '#ffd36e');
            R(bfx + 3, bfy - 1, 3, 3, '#ff9ec4');
            const gx = bfx - 22 - Math.sin(t * 6) * 2;
            R(gx, H - 18, 12, 10, '#f6dcb0');
            R(gx + 1, H - 21, 3, 3, '#f6dcb0');
            R(gx + 8, H - 21, 3, 3, '#f6dcb0');
            R(gx + 3, H - 15, 2, 2, '#2a1d30');
            R(gx + 7, H - 15, 2, 2, '#2a1d30');
        }
        else {
            ceu('#2e2a66', '#c08cff');
            for (let i = 0; i < 7; i++) {
                const sx = 20 + i * 26, sy = H / 2 + Math.sin(t * 4 + i) * 10;
                R(sx, sy, 5, 5, '#ffd36e');
                R(sx + 1, sy + 1, 1, 1, '#2a1d30');
                R(sx + 3, sy + 1, 1, 1, '#2a1d30');
            }
        }
    }
    else if (g === 'acao') {
        if (cena === 0) {
            ceu('#ff9a7a', '#5d4470');
            for (let i = 0; i < 8; i++) {
                const bx = ((i * 40 - t * 80) % (W + 40) + W + 40) % (W + 40) - 40;
                R(bx, H - 34 - (i % 3) * 6, 24, 26 + (i % 3) * 6, '#2a1d30');
            }
            R(0, H - 8, W, 8, '#45454d');
            for (let i = 0; i < W; i += 20)
                R(((i - t * 160) % W + W) % W, H - 5, 10, 1, '#ffd36e');
            R(W / 2 - 14, H - 16, 28, 8, '#c8242e');
            R(W / 2 + 6, H - 15, 6, 3, '#bfe3ff');
            R(W / 2 - 10, H - 9, 5, 3, '#111');
            R(W / 2 + 5, H - 9, 5, 3, '#111');
        }
        else if (cena === 1) {
            ceu('#3a2a20', '#1a1418');
            const r = 6 + k * 30;
            c.fillStyle = 'rgba(255,140,40,.8)';
            c.beginPath();
            c.arc(X + W / 2, Y + H - 10, r, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(255,220,100,.8)';
            c.beginPath();
            c.arc(X + W / 2, Y + H - 10, r * .6, 0, Math.PI * 2);
            c.fill();
            pessoa(W / 2 - 60 + k * 10, H - 24, '#1a1418');
        }
        else {
            ceu('#8fcaff', '#cfe3ff');
            const hx = ((t * 40) % (W + 40)) - 20, hy = 10 + Math.sin(t * 2) * 3;
            R(hx, hy, 16, 7, '#2a2a30');
            R(hx + 16, hy + 2, 10, 2, '#2a2a30');
            R(hx - 6, hy - 3, 28, 1, '#1a1418');
            R(hx + 2, hy + 7, 12, 1, '#1a1418');
            R(0, H - 10, W, 10, '#5fae6a');
        }
    }
    else if (g === 'ficcao') {
        if (cena === 0) {
            R(0, 0, W, H, '#05030a');
            for (let i = 0; i < 40; i++) {
                const sx = (i * 53) % W, sy = (i * 29) % H, len = 2 + (t * 10 % 6);
                R(((sx - t * 60) % W + W) % W, sy, len, 1, '#fff');
            }
            R(W / 2 - 10, H / 2 - 4, 20, 8, '#cfc8dc');
            R(W / 2 + 10, H / 2 - 2, 6, 4, '#8fcaff');
            R(W / 2 - 14, H / 2 - 2, 4, 4, Math.floor(t * 8) % 2 ? '#ff8a3d' : '#ffd36e');
        }
        else if (cena === 1) {
            R(0, 0, W, H, '#0d0b2a');
            for (let i = 0; i < 25; i++)
                R((i * 41) % W, (i * 17) % H, 1, 1, '#fff');
            c.fillStyle = '#c08cff';
            c.beginPath();
            c.arc(X + W * .7, Y + H / 2, 14, 0, Math.PI * 2);
            c.fill();
            R(W * .7 - 24, H / 2, 48, 2, '#ffd36e');
            const ax = W * .25, ay = H - 18;
            R(ax, ay, 8, 10, '#7bd389');
            R(ax + 1, ay + 2, 2, 2, '#000');
            R(ax + 5, ay + 2, 2, 2, '#000');
            R(ax + 8, ay - 2 + Math.round(Math.sin(t * 8) * 2), 2, 6, '#7bd389');
        }
        else {
            ceu('#3a3a44', '#1d1d22');
            R(0, H - 8, W, 8, '#5a5a66');
            const rx = ((t * 20) % (W + 20)) - 10, pe = Math.floor(t * 6) % 2;
            R(rx, H - 26, 12, 10, '#9aa0b0');
            R(rx + 2, H - 23, 3, 2, '#8fcaff');
            R(rx + 7, H - 23, 3, 2, '#8fcaff');
            R(rx + 2, H - 16, 3, 6 + pe, '#7a7d86');
            R(rx + 7, H - 16, 3, 6 - pe + 1, '#7a7d86');
            R(rx + 5, H - 30, 2, 4, '#ff5c8d');
        }
    }
    else {
        if (cena === 0) {
            ceu('#8fcaff', '#5bb8d8');
            R(0, H - 12, W, 12, '#2f80b8');
            for (let i = 0; i < W; i += 14)
                R((i + t * 10) % W, H - 12 + Math.round(Math.sin(t * 3 + i) * 1), 8, 2, '#fff');
            const sx = ((t * 15) % (W + 40)) - 20, sy = H - 22 + Math.round(Math.sin(t * 2) * 1.5);
            R(sx, sy, 28, 8, '#7a4f3a');
            R(sx + 12, sy - 18, 2, 18, '#5e3d2e');
            R(sx + 4, sy - 16, 18, 12, '#f4f1ec');
            R(sx + 10, sy - 12, 4, 4, '#2a1d30');
        }
        else if (cena === 1) {
            ceu('#7bd389', '#2f9a4a');
            for (let i = 0; i < 8; i++) {
                R(i * 28, H - 30, 4, 30, '#5e3d2e');
                R(i * 28 - 8, H - 36, 20, 10, '#3f8a3a');
            }
            pessoa(((t * 14) % (W + 10)) - 6, H - 18, '#c98d68');
            R(((t * 14) % (W + 10)) - 7, H - 19, 8, 2, '#a8714a');
        }
        else {
            R(0, 0, W, H, '#3a2a20');
            R(W / 2 - 14, H - 18, 28, 14, '#8a5a3a');
            R(W / 2 - 14, H - 22, 28, 6, '#a8714a');
            R(W / 2 - 2, H - 16, 4, 4, '#ffd36e');
            for (let i = 0; i < 8; i++) {
                if (Math.floor(t * 3 + i) % 3)
                    continue;
                R(W / 2 - 20 + i * 6, H - 28 - (i % 3) * 6, 2, 2, '#fff6c8');
            }
        }
    }
}
function telaCinema(c, o) {
    const t = performance.now() / 1000;
    c.fillStyle = '#2a2235';
    c.fillRect(o.x, o.y, 204, 46);
    const g = filme || GENEROS[Math.floor(t / 18) % GENEROS.length][0];
    c.save();
    c.beginPath();
    c.rect(o.x + 2, o.y + 2, 200, 42);
    c.clip();
    cenaFilme(c, o.x + 2, o.y + 2, 200, 42, g, t);
    if (!filme) {
        c.fillStyle = 'rgba(0,0,0,.45)';
        c.fillRect(o.x + 2, o.y + 34, 200, 10);
        c.fillStyle = '#ffd36e';
        c.font = 'bold 7px monospace';
        c.fillText('EM BREVE: ' + (GENEROS.find(x => x[0] === g) || ['', ''])[1].replace(/[^\wÀ-ú ]/g, '').toUpperCase(), o.x + 6, o.y + 42);
    }
    c.restore();
}
function escolherFilmeCinema() {
    abrir('Qual filme?', `<div class="grade">${GENEROS.map(([k, n]) => `<button class="px" data-filme="${k}">${n}</button>`).join('')}</div>`);
    document.querySelectorAll('[data-filme]').forEach(b => b.onclick = () => { fechar(); assistirCinema(b.dataset.filme); });
}
function assistirCinema(k) {
    filme = k;
    sentarJuntas({ f: ['pc', 147, 92, 116, 128, 118], i: ['sentadaCostas', 158, 92, 116.1, 128, 118], fala: () => pick(['Shhh, vai começar!', 'Pega na minha mão?', 'Se eu chorar, finge que não viu']), aoLevantar: () => { if (ISI.aqui)
            falar(ISI, 'Que filme lindo...'); } });
    if (S.pipoca)
        setTimeout(() => falar(FEFE, '*divide a pipoca*'), 2600);
    (REACOES_FILME[k] || []).forEach(([q, txt], i) => setTimeout(() => { const quem = q ? ISI : FEFE; if (FEFE.pose === 'assento' && (quem !== ISI || ISI.aqui))
        falar(quem, txt, 2400); }, 5000 + i * 2200));
    if (!S.feitos.enc_cinema) {
        S.feitos.enc_cinema = true;
        setTimeout(() => ganhar(3), 1500);
        salvar();
    }
    nec('diversao', 15);
    (S.filmesVistos = S.filmesVistos || []).includes(k) || S.filmesVistos.push(k);
    salvar();
}
