setInterval(() => { try {
    if (!S.tutoFeito)
        return;
    if (!S.tutoFeitoEm) {
        S.tutoFeitoEm = Date.now();
        salvar();
    }
    const d = $('dicaJoy');
    if (d && Date.now() - S.tutoFeitoEm > 5 * 60e3 && d.style.display !== 'none')
        d.style.display = 'none';
}
catch (e) { } }, 5000);
