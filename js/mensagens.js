const MSGS_ISI = [
    { m: 'Oi, amor! Tô com saudade 🥺', r: [['Eu também, muita!', 'Então vem cá logo kkkk ♥'], ['Vem pra cá!', 'Tô indo!! Chego rapidinho ♥', 'vem'], ['Saudade de você também, princesa ♥', '🥺🥺🥺']] },
    { m: 'O que você tá fazendo, princesa?', r: [['Cuidando dos gatinhos', 'Manda um beijo pra eles! ♥'], ['Pensando em você', 'Para que eu fico boba kkkk ♥'], ['Nada, e você?', 'Também nada... pensando em você ♥']] },
    { m: 'O Floki fez bagunça aqui em casa de novo kkkk', r: [['Kkkkk o que ele fez?', 'Roubou minha meia e saiu correndo pela casa'], ['Igualzinho o Tho!', 'Eles iam ser melhores amigos kkkk'], ['Manda foto!', '📸 *foto do Floki com cara de culpado*']] },
    { m: 'Já comeu hoje, amor?', r: [['Já sim!', 'Boa, princesa ♥'], ['Ainda não...', 'Vai comer agora, senão eu brigo! kkkk'], ['Tô indo cozinhar!', 'Guarda um pouquinho pra mim 🥺']] },
    { m: 'Tava lembrando do nosso primeiro date...', r: [['Que noite perfeita ♥', 'A melhor da minha vida'], ['Bora repetir?', 'Bora!! Escolhe o dia ♥'], ['Você tava tão linda', 'VOCÊ que tava 🥺']] },
    { m: 'Te amo, sabia?', r: [['Sabia! Te amo mais', 'Impossível kkkk ♥'], ['Também te amo, gatinha', '🥰🥰🥰'], ['Prova kkkk', 'Tô indo aí te dar um beijo pra provar', 'vem']] },
    { m: 'Vamos ver um filme juntas hoje?', r: [['Bora!', 'Eu levo a pipoca 🍿', 'vem'], ['Só se for romance', 'Combinado, princesa ♥'], ['Terror!', 'Só se você segurar minha mão kkkk']] },
    { m: 'O Kaiser mandou um beijo pra você e pros gatinhos', r: [['Manda outro pra ele!', 'Ele abanou o rabo todo feliz kkkk'], ['Que fofo 🥺', 'Ele te ama, igual a dona dele ♥'], ['E o Floki?', 'O Floki tá dormindo de barriga pra cima kkkk']] },
    { m: 'Me conta como foi seu dia, amor', r: [['Foi tranquilo ♥', 'Que bom, princesa! Fico feliz'], ['Foi corrido...', 'Ai, amor... quer um cafuné? Eu vou aí', 'vem'], ['Melhor agora que você mandou mensagem', 'Para, eu tô sorrindo pro celular 🥺']] },
    { m: 'Pensei numa coisa: você é muito linda', r: [['Hihi, para ♥', 'Não paro não kkkk'], ['Você que é!', 'Empate então ♥'], ['Obrigada, amor ♥', 'Só falei a verdade, princesa']] },
    { m: 'Tô morrendo de saudade do seu abraço', r: [['Vem buscar então', 'Já tô calçando o tênis kkkk ♥', 'vem'], ['Eu também 🥺', 'Amanhã eu te dou mil abraços'], ['Abraço virtual 🤗', 'Recebido! Mas o real é melhor kkkk']] },
];
const MSGS_NOITE = [{ m: 'Boa noite, amor... já tá na cama?', r: [['Tô sim, e você?', 'Também... sonha comigo ♥'], ['Ainda não', 'Vai dormir, princesa! Amanhã a gente se fala ♥'], ['Tava esperando sua mensagem', 'Ownnn 🥺 boa noite, te amo']] }];
let msgPend = null, msgT = 90;
const _badge50 = atualizarBadgeCel;
window.atualizarBadgeCel = function () { _badge50(); if (msgPend)
    $('bdgCel').classList.add('on'); };
const _chatIsi50 = abrirChatIsinha;
window.abrirChatIsinha = function () {
    if (!msgPend)
        return _chatIsi50();
    const c = msgPend;
    chat.push({ de: 'ela', txt: c.m });
    msgPend = null;
    atualizarBadgeCel();
    renderCelular(false, true);
    const box = document.querySelector('.opcoesCel');
    if (!box)
        return;
    box.innerHTML = c.r.map((r, i) => `<button data-resp="${i}">${esc(r[0])}</button>`).join('');
    box.querySelectorAll('[data-resp]').forEach(b => b.onclick = () => {
        const r = c.r[+b.dataset.resp];
        chat.push({ de: 'eu', txt: r[0] });
        som.pop();
        renderCelular(true, true);
        setTimeout(() => {
            if (!modalAberto())
                return;
            chat.push({ de: 'ela', txt: r[1] });
            som.plim();
            renderCelular(false, false);
            nec('social', 8);
            if (r[2] === 'vem')
                setTimeout(() => { fechar(); if (MAPA !== 'quarto') {
                    toast(`${NOME_MINHA} vai te encontrar em casa ♥`);
                }
                else
                    chamarIsinhaEmCasa(); }, 1600);
        }, 1400);
    });
};
$('toast').style.pointerEvents = 'auto';
$('toast').addEventListener('click', () => { if (msgPend && !bloqueioTela()) {
    try {
        abrirChatIsinha();
    }
    catch (e) { }
} });
