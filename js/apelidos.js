const APELIDOS = ['minha princesa', 'princesa', 'amor', 'gatinha'];
const apelido = () => pick(APELIDOS), Apelido = () => { const a = apelido(); return a[0].toUpperCase() + a.slice(1); };
const _falar42 = falar;
window.falar = function (alvo, txt, ms) {
    txt = trocarApelido(alvo, txt);
    return _falar42(alvo, txt, ms);
};
FALAS_ISINHA.push('Te amo, minha princesa', 'Você é a gatinha mais linda do mundo', 'Amor, vem cá', 'Princesa, já comeu hoje?', 'Minha princesa tá cansadinha?', 'Gatinha, olha a Clarinha', 'Amor, me dá um beijo?', 'Sabia que você é meu lugar favorito?', 'Princesa, tô com saudade e você tá do meu lado');
const RESP_FEFE = ['Te amo, amor', 'Hihi, para', 'Você que é, gatinha', 'Ai, princesa...', 'Para, boba ♥', 'Sim, minha princesa', 'Também te amo', 'Verdade!'];
const _acao42 = acaoIsinha;
window.acaoIsinha = function (a) {
    const F = FEFE, I = ISI, ganha = (c, s) => { necIsi('carinho', c); nec('social', s); salvar(); };
    if (a === 'conversar') {
        falar(I, pick(FALAS_ISINHA), 2600);
        setTimeout(() => falar(F, pick(RESP_FEFE)), 2000);
        ganha(6, 5);
        return;
    }
    if (a === 'elogio') {
        const E = ['Você tá linda hoje, princesa', 'Amo seu sorriso, amor', 'Seu cabelo tá perfeito, gatinha', 'Você é a pessoa mais linda que eu conheço', 'Você fica linda até de pijama'];
        falar(F, pick(E), 2400);
        setTimeout(() => { falar(I, pick(['PARA, AMOR 🙈', '*fica vermelha*', 'Você que é, minha princesa', 'Assim eu me apaixono mais']), 2400); particula('coracao', I.x, I.y - 28, 4); }, 1900);
        setTimeout(() => falar(I, pick(['Agora é minha vez: você é perfeita, princesa', 'Você é a gatinha mais linda do mundo', 'Você é meu tudo, amor'])), 4600);
        setTimeout(() => { falar(F, '*fica vermelha também*', 1800); particula('coracao', F.x, F.y - 28, 4); }, 7000);
        ganha(14, 8);
        primeiraVez('elogio', 1);
        return;
    }
    if (a === 'esquimo') {
        virarPara(I.x, I.y);
        falar(F, 'Beijinho de esquimó!', 1400);
        setTimeout(() => { particula('coracao', (F.x + I.x) / 2, F.y - 30, 3); falar(I, '*esfrega o nariz* hihi', 1600); }, 900);
        ganha(10, 5);
        return;
    }
    if (a === 'cocegas') {
        let n = 0;
        falar(F, 'Vem cá, gatinha... 😏', 1200);
        const t = setInterval(() => { n++; falar(I, pick(['HAHAHA', 'PARA AMOR', 'KKKKKK', 'SOCORRO', 'tá bom tá bom HAHA']), 700); shake = Math.max(shake, 1.5); if (n >= 5) {
            clearInterval(t);
            setTimeout(() => { falar(I, 'Agora é sua vez, princesa! 😈', 1500); setTimeout(() => { falar(F, 'NÃÃÃO HAHAHA', 1400); shake = 2; }, 1300); }, 500);
        } }, 650);
        ganha(10, 8);
        primeiraVez('cocegas', 1);
        return;
    }
    if (a === 'dancar') {
        try {
            if (!musica)
                tocarMusica(pick(['bossa', 'lofi']));
        }
        catch (e) { }
        falar(I, 'Me concede essa dança, princesa?', 1800);
        setTimeout(() => { falar(F, 'Claro, amor ♥', 1400); dancar(9000); particula('nota', I.x, I.y - 40, 5); }, 1500);
        setTimeout(() => { particula('coracao', F.x, F.y - 30, 4); falar(I, '*gira a Fefe*', 1400); }, 6000);
        setTimeout(() => { if (performance.now() > FEFE.danca)
            pararMusica(); }, 11000);
        ganha(12, 10);
        primeiraVez('dancaJuntas', 1);
        return;
    }
    if (a === 'declara') {
        const L = [[F, `${Apelido()}, posso falar uma coisa?`], [I, 'Fala, amor'], [F, pick(['Eu amo cada pedacinho de você', 'Você deixa meus dias mais leves', 'Eu escolheria você em todas as vidas', 'Obrigada por existir'])], [I, '*olhinhos brilhando*'], [I, pick(['Eu te amo tanto, minha princesa', 'Você é a melhor coisa que me aconteceu', 'Pra sempre, gatinha'])]];
        L.forEach(([q, t], i) => setTimeout(() => falar(q, t, 2400), i * 2300));
        setTimeout(() => particula('coracao', (F.x + I.x) / 2, F.y - 34, 8), L.length * 2300 - 600);
        ganha(20, 10);
        primeiraVez('declara', 2);
        return;
    }
    if (a === 'gatosJuntas') {
        falar(F, 'Amor, vamos chamar os bebês?', 1600);
        setTimeout(() => falar(I, 'Pspspsps!', 1400), 1300);
        gatos.forEach((g, k) => { if (S.gatos[g.id].dormindo)
            return; setTimeout(() => { irPara(g, (F.x + I.x) / 2 + (k - 1) * 16, F.y + 16, () => { falar(g, g.id === 'tho' ? 'MIAU!!' : 'prrr', 1200); particula('coracao', g.x, g.y - 16, 2); som.miau(g.id); }); }, 1500 + k * 400); });
        setTimeout(() => falar(I, 'Nossa família ♥', 1800), 5200);
        ganha(10, 6);
        return;
    }
    if (a === 'cantar') {
        const V = [['♪ você é meu lugar ♪', '♪ meu lugar favorito ♪'], ['♪ minha princesa ♪', '♪ minha gatinha ♪'], ['♪ la la la ♪', '♪ hmm hmm ♪']];
        const v = pick(V);
        falar(I, v[0], 1800);
        particula('nota', I.x, I.y - 34, 3);
        setTimeout(() => { falar(F, v[1], 1800); particula('nota', F.x, F.y - 34, 3); }, 1700);
        setTimeout(() => falar(I, 'Somos uma dupla e tanto, amor', 1800), 3800);
        ganha(8, 6);
        return;
    }
    if (a === 'maos') {
        ISI.maos = !ISI.maos;
        falar(F, ISI.maos ? 'Me dá a mão, princesa?' : 'Solta só um pouquinho, amor', 1600);
        if (ISI.maos)
            setTimeout(() => { falar(I, '*entrelaça os dedos*', 1600); particula('coracao', I.x, I.y - 26, 2); }, 1000);
        ganha(6, 3);
        return;
    }
    return _acao42(a);
};
const _menu42 = menuIsinha;
window.menuIsinha = function () {
    _menu42();
    const g = document.querySelector('#modal .grade');
    if (!g)
        return;
    const q = MAPA === 'quarto', b = (id, ic, txt) => `<button class="px" data-i3="${id}"><span style="font-size:22px">${ic}</span>${txt}</button>`;
    const html = b('elogio', '🥰', 'Elogiar') + b('esquimo', '👃', 'Beijo de esquimó') + b('cocegas', '🤭', 'Cócegas') + b('dancar', '💃', 'Dançar juntas') + b('declara', '💌', 'Declaração') + b('cantar', '🎤', 'Cantar juntas') + (q ? b('gatosJuntas', '🐱', 'Chamar os gatos') : b('maos', '🤝', ISI.maos ? 'Soltar a mão' : 'Dar a mão'));
    const ult = g.lastElementChild;
    ult.insertAdjacentHTML('beforebegin', html);
    g.querySelectorAll('[data-i3]').forEach(x => x.onclick = () => { fechar(); acaoIsinha(x.dataset.i3); });
};
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'declara', ic: '💌', n: 'Romântica', d: 'Fazer uma declaração pra Isinha', ok: () => V('declara') }, { id: 'dancaJuntas', ic: '💃', n: 'Par perfeito', d: 'Dançar juntas', ok: () => V('dancaJuntas') });
