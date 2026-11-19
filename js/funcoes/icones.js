function iconeBotao(b) {
    const txt = (b.textContent || '').trim();
    if (b.querySelector('svg') && b.dataset.lbl === txt)
        return;
    if (b.querySelector('svg') && !txt)
        return;
    const L = txt.replace(/^[^A-Za-zÀ-ÿ]+/, '');
    let ic = 'camera';
    if (b.id === 'btnLaser')
        ic = /Guardar/i.test(L) ? 'mao' : 'laser';
    else if (b.id === 'btnLuz')
        ic = /abajur/i.test(L) ? 'abajur' : /Acender/i.test(L) ? 'luzOff' : 'luzOn';
    else if (b.id === 'btnJanela')
        ic = 'janela';
    b.innerHTML = iconeSVG(ic, 22) + `<span style="display:none">${esc(L)}</span>`;
    b.dataset.lbl = b.textContent.trim();
    b.title = L;
    b.setAttribute('aria-label', L);
}
