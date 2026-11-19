function abrirBackup() {
    salvar();
    const codigo = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    const quando = new Date().toLocaleDateString('pt-BR');
    abrir('💾 Backup do jogo', `<div class="mg" style="text-align:left">
    <p style="margin:0 0 8px">Guarde um backup pra nunca perder o progresso (gatos, corações, roupas, conquistas, fotos...).</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:10px">
      <button class="btn" id="bkBaixar" style="width:auto;margin:0">⬇️ Baixar arquivo</button>
      <button class="btn branco" id="bkCopiar" style="width:auto;margin:0">📋 Copiar código</button>
      <label class="btn branco" style="width:auto;margin:0;cursor:pointer">📂 Carregar arquivo<input type="file" id="bkArquivo" accept=".json,.txt,application/json,text/plain" style="display:none"></label>
    </div>
    <p style="font-size:12px;opacity:.7;margin:0 0 4px">Ou cole aqui um código de backup pra restaurar:</p>
    <textarea id="bkTexto" rows="3" style="width:100%;box-sizing:border-box;font:12px monospace;resize:vertical" placeholder="cole o código aqui"></textarea>
    <div style="text-align:center;margin-top:8px"><button class="btn" id="bkRestaurar" style="width:auto;margin:0">Restaurar backup</button></div>
    <p id="bkMsg" style="font-size:13px;text-align:center;margin:8px 0 0"></p>
    <div style="text-align:center;margin-top:12px;padding-top:10px;border-top:2px dashed #e6d6de"><button class="btn branco" id="bkNovo" style="width:auto;margin:0;font-size:13px">🔄 Começar um novo jogo</button><p style="font-size:11px;opacity:.6;margin:4px 0 0">O jogo atual fica guardado: dá pra voltar pra ele na tela inicial.</p></div></div>`, true, true);
    $('bkNovo').onclick = () => {
        const b = $('bkNovo');
        if (!b.dataset.conf) {
            b.dataset.conf = 1;
            b.textContent = 'Tem certeza? Toque de novo';
            return;
        }
        try {
            salvar();
            localStorage.setItem(CHAVE + '-anterior', JSON.stringify(S));
            localStorage.removeItem(CHAVE);
        }
        catch (e) { }
        location.reload();
    };
    const msg = t => $('bkMsg').textContent = t;
    $('bkBaixar').onclick = async () => {
        const nome = `fefes-life-backup-${quando.replace(/\//g, '-')}.json`, dados = JSON.stringify(S);
        let dl = null;
        try {
            if (window.claude && window.claude.use)
                dl = await window.claude.use('downloads');
        }
        catch (e) { }
        if (dl) {
            try {
                await dl.save({ filename: nome, data: dados });
                msg('Backup baixado! Guarde o arquivo num lugar seguro ♥');
            }
            catch (e) {
                msg(e && e.code === 'declined' ? 'Download cancelado.' : 'Não deu pra baixar aqui. Use "Copiar código".');
            }
            return;
        }
        try {
            const blob = new Blob([dados], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = nome;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
            msg('Backup baixado! Guarde o arquivo num lugar seguro ♥');
        }
        catch (e) {
            msg('Não deu pra baixar aqui. Use "Copiar código".');
        }
    };
    $('bkCopiar').onclick = () => {
        const ok = () => msg('Código copiado! Cole num bloco de notas ou mande pra você mesma.');
        if (navigator.clipboard && navigator.clipboard.writeText)
            navigator.clipboard.writeText(codigo).then(ok, () => { $('bkTexto').value = codigo; $('bkTexto').select(); msg('Selecionei o código: é só copiar.'); });
        else {
            $('bkTexto').value = codigo;
            $('bkTexto').select();
            msg('Selecionei o código: é só copiar.');
        }
    };
    const restaurar = txt => {
        let dados = null;
        txt = (txt || '').trim();
        try {
            dados = JSON.parse(txt);
        }
        catch (e) {
            try {
                dados = JSON.parse(decodeURIComponent(escape(atob(txt))));
            }
            catch (_) { }
        }
        if (!dados || typeof dados !== 'object' || !dados.gatos) {
            msg('Esse backup não parece válido 😕');
            return;
        }
        if (!confirmarRestaurar())
            return;
        try {
            localStorage.setItem(CHAVE, JSON.stringify(dados));
            msg('Backup restaurado! Recarregando...');
            setTimeout(() => location.reload(), 900);
        }
        catch (e) {
            msg('Não consegui salvar o backup.');
        }
    };
    const confirmarRestaurar = () => { const b = $('bkRestaurar'); if (b.dataset.conf)
        return true; b.dataset.conf = 1; b.textContent = 'Tem certeza? Toque de novo'; msg('Isso troca o progresso atual pelo do backup.'); return false; };
    $('bkRestaurar').onclick = () => restaurar($('bkTexto').value);
    $('bkArquivo').onchange = e => { const f = e.target.files[0]; if (!f)
        return; const r = new FileReader(); r.onload = () => { $('bkTexto').value = r.result; restaurar(r.result); }; r.readAsText(f); };
}
