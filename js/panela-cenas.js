const APEL_P_FEFE = ['princesa', 'princesinha', 'minha princesa', 'meu amor', 'minha gatinha', 'amor', 'Fefe', 'gatinha', 'minha princesinha', 'meu anjinho'];
const APEL_P_ISI = ['princesa', 'princesinha', 'minha princesa', 'meu amor', 'minha gatinha', 'amor', 'gatinha', 'minha princesinha', 'meu anjinho', NOME_MINHA];
const _todosApel = [...new Set(APEL_P_FEFE.concat(APEL_P_ISI, [NOME_DELA]))].sort((a, b) => b.length - a.length).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const RE_VOC = new RegExp(`(^|[,;] ?|\\b(?:Te amo|Vem|Oi|Obrigada|Boa noite|Bom dia|Feliz aniversário|Vem cá),? )(${_todosApel.join('|')})(?=\\s*(?:[,!?.…♥:)]|$))`, 'gi');
const CENAS_TRIO = [
    { g: 'tho', perto: 1, s: [['tho', '*morde o cabelo da Isinha*'], ['I', 'THO! Meu cabelo não é brinquedo!'], ['F', 'Ele te ama, amor kkkk'], ['I', 'Que amor mais estranho esse']] },
    { g: 'tho', perto: 1, s: [['tho', '*deita em cima do celular da Isinha*'], ['I', 'Tho... eu tava respondendo uma mensagem'], ['tho', 'miau.'], ['F', 'Agora o celular é dele, princesa']] },
    { g: 'tho', perto: 1, s: [['tho', 'MIAAAAAU'], ['I', 'AI, Tho, no meu ouvido não!'], ['F', 'Ele quer comida de novo'], ['I', 'Ele comeu faz dez minutos!']] },
    { g: 'tho', perto: 1, s: [['tho', '*ataca o pé da Isinha*'], ['I', 'AI! Fefe, seu filho me atacou!'], ['F', 'Ele só tá brincando, amor'], ['I', 'Brincando com a minha dor, né']] },
    { g: 'tho', perto: 1, s: [['tho', '*senta exatamente onde a Isinha ia sentar*'], ['I', 'Tho, sai daí, por favor'], ['tho', '*não sai*'], ['F', 'Ele não vai sair, gatinha kkkk'], ['I', 'Eu desisto']] },
    { g: 'tho', perto: 1, s: [['tho', '*encara a Isinha sem piscar*'], ['I', 'Fefe... por que ele tá me olhando assim?'], ['F', 'Ele tá planejando alguma coisa'], ['I', 'Tô com medo']] },
    { g: 'tho', perto: 1, s: [['tho', '*empurra o copo da Isinha da mesa*'], ['I', 'THO!!!'], ['tho', '*olha nos olhos e empurra mais um pouco*'], ['F', 'Clássico kkkkk'], ['I', 'Esse gato é um vilão']] },
    { g: 'tho', perto: 1, s: [['tho', '*sobe nas costas da Isinha*'], ['I', 'Fefe, socorro, ele tá subindo em mim'], ['F', 'Fica parada que ele desce'], ['tho', '*não desce*'], ['I', 'Ele NÃO desce']] },
    { g: 'tho', perto: 1, s: [['tho', '*lambe a mão da Isinha e morde logo depois*'], ['I', 'Por que ele lambe e morde?!'], ['F', 'É o jeito dele de dizer que te ama, princesa'], ['I', 'Me ama de um jeito violento']] },
    { g: 'lola', perto: 1, s: [['lola', '*sobe no colo da Isinha*'], ['I', 'Fefe, a Lola me escolheu hoje 🥺'], ['F', 'Traidora kkkk'], ['lola', 'prrrr ♥']] },
    { g: 'lola', perto: 1, s: [['lola', '*dá uma cabeçadinha na Isinha*'], ['I', 'Ela me deu uma cabeçadinha!!'], ['F', 'Isso é amor de gato, meu anjinho']] },
    { g: 'lola', s: [['lola', 'miau ♥'], ['F', 'A Lola tá pedindo carinho, amor'], ['I', 'Pra mim ou pra você?'], ['F', 'Pras duas, ela é esperta']] },
    { g: 'clarinha', perto: 1, s: [['clarinha', '*passa reto pela Isinha*'], ['I', 'Clarinha, oi... nada?'], ['clarinha', '...'], ['F', 'Ela te cumprimentou do jeito dela']] },
    { g: 'clarinha', s: [['clarinha', '*deita longe, mas fica olhando pra Isinha*'], ['I', 'Acho que ela gosta de mim de longe'], ['F', 'É o máximo que ela dá, princesinha']] },
    { g: 'clarinha', perto: 1, s: [['clarinha', '*deixa a Isinha fazer carinho UMA vez*'], ['I', 'FEFE, ELA DEIXOU'], ['F', 'Momento histórico'], ['clarinha', 'chega.']] },
    { g: 'tho', s: [['F', 'Amor, quem você acha que é o mais bagunceiro?'], ['I', 'O Tho, sem dúvida'], ['tho', 'MIAU?!'], ['F', 'Ele ouviu kkkk']] },
    { g: 'lola', s: [['I', 'Se a Lola fosse gente, ela seria uma princesa'], ['F', 'E a Clarinha, uma bibliotecária brava'], ['I', 'E o Tho... um meme'], ['tho', '*derruba alguma coisa*']] },
    { g: 'clarinha', s: [['I', 'Princesa, qual deles é o seu favorito?'], ['F', 'Não posso escolher!!'], ['lola', 'miau? (sou eu)'], ['clarinha', '...(sou eu)']] },
    { g: 'lola', s: [['F', 'Amor, olha os três dormindo juntinhos um dia desses'], ['I', 'Melhor foto do mundo'], ['tho', '*ronca*'], ['I', 'Ele ronca?!']] },
];
window.atualizarGatosJuntas = function (dt) {
    if (MAPA !== 'quarto' || !ISI.aqui || ISI.pose || ISI.atv || ISI.estado !== 'seguindo' || bloqueioTela() || performance.now() < conversaAte || FEFE.pose)
        return;
    gatoMomentoT -= dt;
    if (gatoMomentoT > 0)
        return;
    gatoMomentoT = 30 + Math.random() * 30;
    const ok = CENAS_TRIO.filter(c => c.s.every(([q]) => q === 'F' || q === 'I' || (G(q) && !S.gatos[q].dormindo && !['oculto', 'escondido', 'caos'].includes(G(q).estado))));
    if (!ok.length)
        return;
    const tho = ok.filter(c => c.g === 'tho' && c.perto);
    const c = (tho.length && Math.random() < .4) ? pick(tho) : pick(ok);
    conversaAte = performance.now() + 6000;
    if (c.perto) {
        const g = G(c.g);
        irPara(g, ISI.x + (g.x < ISI.x ? -9 : 9), ISI.y + 3, () => { g.dir = ISI.x > g.x ? 1 : -1; cenaFalas(c.s); }, c.g === 'tho' ? 80 : 45);
        setTimeout(() => { if (g.estado === 'andando') {
            g.x = ISI.x + 9;
            g.y = ISI.y + 3;
        } }, 5000);
    }
    else
        cenaFalas(c.s);
};
