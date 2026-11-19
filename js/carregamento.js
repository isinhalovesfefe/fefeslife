// segura os timers ate todos os arquivos carregarem
(function () {
  const st = window.setTimeout, si = window.setInterval, ct = window.clearTimeout, ci = window.clearInterval, raf = window.requestAnimationFrame;
  const fila = [], real = new Map(), cancelados = new Set();
  let pronto = false, n = 1e9;
  const guardar = (tipo, f, t, a) => { const id = ++n; fila.push([tipo, f, t, a, id]); return id; };
  window.setTimeout = (f, t, ...a) => pronto ? st(f, t, ...a) : guardar('t', f, t, a);
  window.setInterval = (f, t, ...a) => pronto ? si(f, t, ...a) : guardar('i', f, t, a);
  window.requestAnimationFrame = f => pronto ? raf(f) : guardar('r', f, 0, []);
  const limpar = (orig) => id => { if (real.has(id)) return orig(real.get(id)); if (id > 1e9) cancelados.add(id); else orig(id); };
  window.clearTimeout = limpar(ct); window.clearInterval = limpar(ci);
  window.liberarJogo = () => {
    pronto = true;
    for (const [tipo, f, t, a, id] of fila) {
      if (cancelados.has(id)) continue;
      real.set(id, tipo === 't' ? st(f, t, ...a) : tipo === 'i' ? si(f, t, ...a) : raf(f));
    }
    fila.length = 0;
  };
})();
