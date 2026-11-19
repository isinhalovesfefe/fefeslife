function bloqueioTela() { return modalAberto() || pertoAberto(); }
function atualizar(dt) {
    let ix = joy.x + ((teclas.ArrowRight || teclas.d) ? 1 : 0) - ((teclas.ArrowLeft || teclas.a) ? 1 : 0);
    let iy = joy.y + ((teclas.ArrowDown || teclas.s) ? 1 : 0) - ((teclas.ArrowUp || teclas.w) ? 1 : 0);
    let m = Math.hypot(ix, iy);
    if (m > 1) {
        ix /= m;
        iy /= m;
    }
    if (FEFE.pose && (m > 0.15 || FEFE.alvo))
        levantar();
    if (m > 0.15)
        FEFE.alvo = null;
    else if (FEFE.alvo && !bloqueioTela()) {
        const A = FEFE.alvo, dx = A.x - FEFE.x, dy = A.y - FEFE.y, d = Math.hypot(dx, dy);
        if (A.g) {
            A.x = A.g.x + (FEFE.x < A.g.x ? -11 : 11);
            A.y = A.g.y + 2;
        }
        if (d < 3 || (A.raio && d < A.raio)) {
            FEFE.alvo = null;
            m = 0;
            if (A.cb)
                A.cb();
        }
        else {
            ix = dx / d;
            iy = dy / d;
            m = 1;
            A.t += dt;
            if (A.t > 6) {
                FEFE.alvo = null;
            }
        }
    }
    FEFE.anda = m > 0.15 && !bloqueioTela() && !FEFE.pose;
    if (FEFE.anda) {
        const v = (FEFE.bike ? 150 : 74) * dt, x0 = FEFE.x, y0 = FEFE.y;
        if (!bloqueado(FEFE.x + ix * v, FEFE.y))
            FEFE.x += ix * v;
        if (!bloqueado(FEFE.x, FEFE.y + iy * v))
            FEFE.y += iy * v;
        FEFE.dir = Math.abs(ix) > Math.abs(iy) ? (ix > 0 ? 'right' : 'left') : (iy > 0 ? 'down' : 'up');
        FEFE.t += dt;
        FEFE.fr = Math.floor(FEFE.t / 0.14) % 4;
        if (FEFE.alvo) {
            const mov = Math.hypot(FEFE.x - x0, FEFE.y - y0);
            FEFE.alvo.preso = mov < v * .2 ? (FEFE.alvo.preso || 0) + dt : 0;
            if (FEFE.alvo.preso > .35) {
                const A = FEFE.alvo;
                FEFE.alvo = null;
                if (A.cb && Math.hypot(A.x - FEFE.x, A.y - FEFE.y) < 30)
                    A.cb();
            }
        }
    }
    else
        FEFE.t = 0;
    atualizarIsinha(dt);
    checarEntrega();
    atualizarEntregador(dt);
    atualizarCidade(dt);
    if (MAPA === 'quarto')
        gatos.forEach(g => {
            g.t += dt;
            const st = S.gatos[g.id];
            if (g === gatoPerto)
                return;
            if (st.dormindo && !['dormindo', 'andando', 'pulando', 'na_cama', 'na_rede', 'escondido', 'colo', 'oculto', 'caos', 'laser'].includes(g.estado)) {
                const [bx, by] = CAMA_GATO[gatos.indexOf(g)];
                irPara(g, bx, by, () => { g.estado = 'dormindo'; }, 26);
            }
            if (g.id === 'tho' && !st.dormindo && g.estado === 'parado') {
                g.cdFuga -= dt;
                if (g.cdFuga <= 0 && Math.hypot(g.x - FEFE.x, g.y - FEFE.y) < 20) {
                    g.cdFuga = 4;
                    if (Math.random() < .3) {
                        falar(g, '!');
                        const [x, y] = pontoLivre();
                        irPara(g, x, y, null, 85);
                    }
                }
            }
            if (g.estado === 'andando') {
                const dx = g.tx - g.x, dy = g.ty - g.y, d = Math.hypot(dx, dy);
                if (d < 1.5) {
                    g.estado = 'parado';
                    g.timer = 2 + Math.random() * 4;
                    const cb = g.chegar;
                    g.chegar = null;
                    if (cb)
                        cb();
                }
                else {
                    const v = Math.min(d, g.vel * dt), nx = g.x + dx / d * v, ny = g.y + dy / d * v;
                    if (Math.abs(dx) > .5)
                        g.dir = dx > 0 ? 1 : -1;
                    if (bloqueado(nx, ny, 6)) {
                        if (!bloqueado(nx, g.y, 6))
                            g.x = nx;
                        else if (!bloqueado(g.x, ny, 6))
                            g.y = ny;
                        else if (!g.chegar) {
                            g.estado = 'parado';
                            g.timer = 1;
                        }
                        else {
                            g.x = nx;
                            g.y = ny;
                        }
                    }
                    else {
                        g.x = nx;
                        g.y = ny;
                    }
                }
            }
            else if (g.estado === 'pulando') {
                const P = g.pulo;
                P.t += dt / 0.45;
                const k = Math.min(1, P.t);
                g.x = P.x0 + (P.x1 - P.x0) * k;
                g.y = P.y0 + (P.y1 - P.y0) * k;
                g.alt = Math.sin(Math.PI * k) * 14;
                g.dir = P.x1 >= P.x0 ? 1 : -1;
                if (k >= 1) {
                    g.alt = 0;
                    g.estado = 'parado';
                    g.timer = 2;
                    const cb = P.cb;
                    g.pulo = null;
                    if (cb)
                        cb();
                }
            }
            else if (g.estado === 'na_rede') {
                g.timer -= dt;
                if (g.timer <= 0 && !st.dormindo)
                    pular(g, 64, 104);
            }
            else if (g.estado === 'escondido') {
                g.timer -= dt;
                if (g.timer <= 0) {
                    g.x = 241;
                    g.y = 214;
                    g.estado = 'parado';
                    g.timer = 2;
                }
            }
            else if (g.estado === 'colo') {
                g.dir = 1;
                if (FEFE.pose !== 'tapete') {
                    pular(g, 196, 160);
                }
            }
            else if (g.estado === 'na_cama') {
                if (FEFE.pose !== 'cama')
                    pular(g, 62 + gatos.indexOf(g) * 6, 104);
            }
            else if (g.estado === 'parado') {
                g.timer -= dt;
                if (g.timer <= 0 && !st.dormindo)
                    proximaAcao(g);
            }
            else if (g.estado === 'dormindo') {
                if (!st.dormindo) {
                    g.estado = 'parado';
                    g.timer = 1;
                }
            }
            else if (['comendo', 'carinho', 'social'].includes(g.estado)) {
                g.timer -= dt;
                if (g.timer <= 0) {
                    g.estado = 'parado';
                    g.timer = 2 + Math.random() * 2;
                }
            }
            else if (g.estado === 'perseguindo' || g.estado === 'fugindo') {
                g.timer -= dt;
                const o = g.par;
                if (g.timer <= 0 || !o) {
                    g.estado = 'parado';
                    g.timer = 2;
                    g.par = null;
                    if (g.id === 'tho')
                        falar(g, 'Ufa!');
                    return;
                }
                let tx, ty, vel;
                if (g.estado === 'perseguindo') {
                    tx = o.x;
                    ty = o.y;
                    vel = 68;
                }
                else {
                    if (!g.tx || Math.hypot(g.tx - g.x, g.ty - g.y) < 6 || Math.hypot(o.x - g.x, o.y - g.y) < 10) {
                        let best = null, bd = -1;
                        for (let i = 0; i < 8; i++) {
                            const [x, y] = pontoLivre();
                            const dd = Math.hypot(x - o.x, y - o.y);
                            if (dd > bd) {
                                bd = dd;
                                best = [x, y];
                            }
                        }
                        [g.tx, g.ty] = best;
                    }
                    tx = g.tx;
                    ty = g.ty;
                    vel = 62;
                }
                const dx = tx - g.x, dy = ty - g.y, d = Math.hypot(dx, dy) || 1, v = vel * dt, nx = g.x + dx / d * v, ny = g.y + dy / d * v;
                if (!bloqueado(nx, g.y, 6))
                    g.x = nx;
                if (!bloqueado(g.x, ny, 6))
                    g.y = ny;
                g.dir = dx > 0 ? 1 : -1;
                if (Math.random() < dt * 2)
                    particula('poeira', g.x, g.y - 2);
            }
            else if (g.estado === 'brincando') {
                g.timer -= dt;
                if (novelo) {
                    const dx = novelo.x - g.x, dy = novelo.y + 2 - g.y, d = Math.hypot(dx, dy);
                    if (d > 6) {
                        g.x += dx / d * 55 * dt;
                        g.y += dy / d * 55 * dt;
                        g.dir = dx > 0 ? 1 : -1;
                    }
                    else {
                        novelo.vx += (Math.random() - .5) * 160;
                        novelo.vy += (Math.random() - .5) * 160;
                    }
                }
                if (g.timer <= 0)
                    fimBrincadeira(g);
            }
        });
    atualizarExtras(dt);
    checarConquistas(dt);
    atualizarPensa(dt);
    atualizarExtras13(dt);
    atualizarExtras21(dt);
    atualizarExtras24(dt);
    atualizarNec(dt);
    atualizarExtras31(dt);
    atualizarExtras33(dt);
    atualizarNPCs(dt);
    atualizarExtras35(dt);
    atualizarExtras37(dt);
    atualizarExtras39(dt);
    atualizarTrilha();
    atualizarExtras42();
    atualizarExtras43(dt);
    atualizarClarinha(dt);
    atualizarMsgsIsi(dt);
    atualizarBuzinas(dt);
    if (MAPA === 'quarto')
        socialT -= dt;
    if (socialT <= 0) {
        socialT = 14 + Math.random() * 16;
        eventoSocial();
    }
    if (novelo) {
        novelo.x += novelo.vx * dt;
        novelo.y += novelo.vy * dt;
        novelo.vx *= Math.pow(.25, dt);
        novelo.vy *= Math.pow(.25, dt);
        if (novelo.x < MUNDO.x0 + 6 || novelo.x > MUNDO.x1 - 6) {
            novelo.vx *= -1;
            novelo.x = Math.max(MUNDO.x0 + 6, Math.min(MUNDO.x1 - 6, novelo.x));
        }
        if (novelo.y < MUNDO.y0 + 10 || novelo.y > MUNDO.y1 - 2) {
            novelo.vy *= -1;
            novelo.y = Math.max(MUNDO.y0 + 10, Math.min(MUNDO.y1 - 2, novelo.y));
        }
    }
    for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vida -= dt;
        if (p.vida <= 0)
            particulas.splice(i, 1);
    }
    if (performance.now() < vitrolaAte) {
        if (MAPA === 'quarto' && Math.random() < dt * 2.5)
            particula('nota', 252, 34);
    }
    else if (musica)
        pararMusica();
    const [cx, cy] = alvoCamera();
    cam.x += (cx - cam.x) * Math.min(1, dt * 6);
    cam.y += (cy - cam.y) * Math.min(1, dt * 6);
}
