function recadoDoDia() { return Math.min(RECADOS_ISINHA.length, diasEntre(new Date(S.inicio), new Date()) + 1) - 1; }
function temRecadoNovo() { return (S.recadoLido == null ? -1 : S.recadoLido) < recadoDoDia(); }
function atualizarBadgeCel() { $('bdgCel').classList.toggle('on', temRecadoNovo()); }
function opcoesCel() {
    if (MAPA.startsWith('mem_'))
        return ['voltar'];
    if (MAPA !== 'quarto')
        return ['voltar', ...['parque', 'cinema', 'estrelas', 'show', 'cafe'].filter(k => k !== MAPA)];
    if (false)
        return [];
    return ISI.aqui ? ['parque', 'cinema', 'estrelas', 'show', 'cafe'] : ['casa', 'parque', 'cinema', 'estrelas', 'show', 'cafe'];
}
function abrirCelular() {
    const app = (id, cor, ic, nome, bdg) => `<button class="app" data-app="${id}"><span class="ic" style="background:${cor}">${ic}</span>${nome}${bdg ? '<span class="bdg2">1</span>' : ''}</button>`;
    abrir('Celular', `<div class="cel"><div class="apps">
    ${app('conversas', '#7bd389', PARTsvg('coracao', 26), 'Conversas', temRecadoNovo())}
    ${app('bike', '#8fcaff', '🚲', 'Andar de bike')}
    ${app('comida', '#ffb36b', '🍔', 'Pedir comida')}
    ${app('fotos', '#c08cff', iconeSVG('camera', 24), 'Fotos')}
    ${app('nos', '#ff7aa8', PARTsvg('coracao', 26), 'Nós ♥')}
    ${app('chamada', '#7bd389', '📹', 'Chamada')}
    ${app('tempo', '#8fcaff', '☀️', 'Tempo')}
    ${app('backup', '#9aa0b0', '💾', 'Backup')}
    ${app('figurinhas', '#ffb36b', '📒', 'Figurinhas')}
  </div><div style="color:#fff;opacity:.6;font-size:12px;text-align:center;padding:0 0 14px">${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div></div>`, false);
    document.querySelectorAll('[data-app]').forEach(b => b.onclick = () => {
        som.pop();
        const k = b.dataset.app;
        if (k === 'conversas')
            abrirConversas();
        if (k === 'bike') {
            if (MAPA === 'cidade')
                return toast('Você já está pedalando!');
            fechar();
            if (ISI.aqui)
                falar(ISI, 'Vou com você!');
            trocarCena('cidade');
        }
        if (k === 'comida')
            appComida();
        if (k === 'fotos')
            verAlbum();
        if (k === 'nos')
            abrirLinhaDoTempo();
        if (k === 'quiz')
            abrirQuiz();
        if (k === 'backup')
            abrirBackup();
        if (k === 'chamada')
            chamadaVideo();
        if (k === 'tempo')
            abrirTempo();
        if (k === 'figurinhas')
            abrirFigurinhas();
    });
}
function abrirConversas() {
    const ult = chat.length ? chat[chat.length - 1].txt : RECADOS_ISINHA[Math.max(0, recadoDoDia())];
    abrir('Conversas', `<div class="cel"><div class="celTopo"><button class="voltarCel" id="celVoltar">‹</button><b>Conversas</b></div>
    <button class="contato" id="ctIsi"><span id="avIsi2"></span><span><b>${NOME_MINHA} ♥</b><small>${esc(ult).slice(0, 40)}</small></span>${temRecadoNovo() ? '<span class="bdg2" style="position:static;margin-left:auto">1</span>' : ''}</button>
    <button class="contato" id="ctGatos"><span id="avGatos"></span><span><b>Gatinhos 🐾</b><small>Lola, Clarinha, Tho</small></span></button></div>`, false);
    const av = document.createElement('canvas');
    av.width = 16;
    av.height = 14;
    av.getContext('2d').drawImage(isiSpr.rosto, 0, 0);
    $('avIsi2').appendChild(av);
    const ag = document.createElement('canvas');
    ag.width = 14;
    ag.height = 14;
    gatoPequeno(ag.getContext('2d'), 'lola', 'feliz', 0, 0);
    $('avGatos').appendChild(ag);
    $('celVoltar').onclick = abrirCelular;
    $('ctIsi').onclick = abrirChatIsinha;
    $('ctGatos').onclick = () => chatGatos();
}
function chatGatos(resp) {
    if (!chatG.length) {
        const st = S.gatos;
        chatG.push({ de: 'Lola', txt: st.lola.fome < 40 ? 'fefe cadê meu sachê 😿' : pick(['te amo fefe', 'vem pra casa logo', 'eu sou a mais bonita da casa né']) });
        chatG.push({ de: 'Tho', txt: pick(['eu derrubei o copo. não fui eu.', 'tem uma mosca aqui. vou pegar', 'MIAU MIAU MIAU (bateu no teclado)', '*foto borrada*']) });
        chatG.push({ de: 'Clarinha', txt: st.clarinha.alegria < 40 ? '...cadê meu carinho na cabeça' : pick(['...', 'tô bem.', 'alguém me tira desse grupo']) });
    }
    if (resp) {
        chatG.push({ de: 'eu', txt: resp });
        setTimeout(() => { chatG.push({ de: pick(['Lola', 'Tho', 'Clarinha']), txt: resp.includes('Amo') ? pick(['AMAMOS TAMBÉM', 'prrrrr', '...ok, também te amo']) : pick(['MIAU', 'SACHÊ', '*sai do grupo e volta*']) }); som.miau(pick(['lola', 'tho', 'clarinha']), 1.1); if (modalAberto())
            chatGatos(); }, 1100);
    }
    abrir('Gatinhos 🐾', `<div class="cel"><div class="celTopo"><button class="voltarCel" id="celVoltar">‹</button><b>Gatinhos 🐾</b></div>
    <div class="chat" id="chatBox">${chatG.slice(-12).map(m => `<div class="msg ${m.de === 'eu' ? 'minha' : 'dela'}">${m.de === 'eu' ? '' : `<b style="font-size:12px;opacity:.8">${m.de}</b><br>`}${esc(m.txt)}</div>`).join('')}</div>
    <div class="opcoesCel"><button data-g="Amo vocês ♥">Amo vocês ♥</button><button data-g="Quem derrubou o copo?">Quem derrubou o copo?</button><button data-g="Já tô chegando!">Já tô chegando!</button></div></div>`, false);
    const cb = $('chatBox');
    cb.scrollTop = cb.scrollHeight;
    $('celVoltar').onclick = abrirConversas;
    document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => chatGatos(b.dataset.g));
}
function abrirChatIsinha() {
    if (temRecadoNovo()) {
        const i = recadoDoDia();
        chat.push({ de: 'ela', txt: RECADOS_ISINHA[i] });
        S.recadoLido = i;
        salvar();
        atualizarBadgeCel();
    }
    if (!chat.length)
        chat.push({ de: 'ela', txt: RECADOS_ISINHA[Math.max(0, recadoDoDia())] });
    renderCelular();
}
function renderCelular(digitando, travar) {
    abrir('Celular', `<div class="cel"><div class="celTopo"><button class="voltarCel" id="celVoltar">‹</button><span id="avIsi"></span><div><b>${NOME_MINHA} ♥</b><small>${ISI.aqui ? 'aqui do seu lado' : 'online'}</small></div></div>
    <div class="chat" id="chatBox">${chat.slice(-12).map(m => `<div class="msg ${m.de === 'ela' ? 'dela' : 'minha'}">${esc(m.txt)}</div>`).join('')}${digitando ? '<div class="msg dela digitando">digitando...</div>' : ''}</div>
    <div class="opcoesCel">${travar ? '' : opcoesCel().map(k => `<button data-cel="${k}">${ACOES_CEL[k].pergunta}</button>`).join('')}</div></div>`, false);
    const av = document.createElement('canvas');
    av.width = 16;
    av.height = 14;
    av.getContext('2d').drawImage(isiSpr.rosto, 0, 0);
    $('avIsi').appendChild(av);
    const cb = $('chatBox');
    cb.scrollTop = cb.scrollHeight;
    if ($('celVoltar'))
        $('celVoltar').onclick = abrirConversas;
    document.querySelectorAll('[data-cel]').forEach(b => b.onclick = () => pedirCel(b.dataset.cel));
}
function pedirCel(k) {
    const a = ACOES_CEL[k];
    chat.push({ de: 'eu', txt: a.pergunta });
    som.pop();
    renderCelular(true, true);
    setTimeout(() => {
        if (!modalAberto())
            return;
        chat.push({ de: 'ela', txt: a.resposta });
        som.plim();
        renderCelular(false, true);
        setTimeout(() => { fechar(); executarCel(k); }, 1300);
    }, 1300);
}
function executarCel(k) {
    if (k === 'casa')
        setTimeout(chamarIsinhaEmCasa, 1500);
    if (k === 'voltar')
        trocarCena('quarto');
    if (['parque', 'cinema', 'estrelas', 'show', 'cafe'].includes(k))
        trocarCena(k);
}
function fadeEntao(fn) { const f = $('fade'); f.style.opacity = 1; setTimeout(() => { fn(); f.style.opacity = 0; }, 650); }
