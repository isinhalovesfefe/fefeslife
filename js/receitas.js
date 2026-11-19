Object.assign(RECEITAS, {
    macarrao: { n: 'Macarrão', ic: '🍝', passos: [
            { tipo: 'ordem', txt: 'Ferva a água, na ordem certa', itens: ['Água', 'Sal', 'Macarrão'] },
            { tipo: 'tempo', txt: 'Escorra na hora do al dente!', rep: 1 },
            { tipo: 'mexer', txt: 'Misture no molho! Arraste em círculos', alvo: 1800, tempo: 7 },
            { tipo: 'temperar', txt: 'Rale o queijo por cima: exatamente 4 vezes', n: 4, ic: '🧀' }
        ] },
    paoqueijo: { n: 'Pão de queijo', ic: '🧀', passos: [
            { tipo: 'ordem', txt: 'Faça a massa, na ordem certa', itens: ['Polvilho', 'Leite', 'Óleo', 'Ovo', 'Queijo'] },
            { tipo: 'mexer', txt: 'Sove a massa! Arraste em círculos', alvo: 2000, tempo: 8 },
            { tipo: 'tocar', txt: 'Enrole as bolinhas! Toque rápido', alvo: 12, tempo: 6, ic: '🟡' },
            { tipo: 'tempo', txt: 'Tire do forno douradinho!', rep: 1 }
        ] },
    pipoca: { n: 'Pipoca', ic: '🍿', passos: [
            { tipo: 'ordem', txt: 'Na panela, na ordem certa', itens: ['Óleo', 'Milho', 'Tampa'] },
            { tipo: 'tocar', txt: 'Chacoalhe a panela! Toque rápido', alvo: 18, tempo: 6, ic: '🍳' },
            { tipo: 'temperar', txt: 'Coloque sal: exatamente 3 pitadas', n: 3, ic: '🧂' }
        ] },
    cookie: { n: 'Cookie', ic: '🍪', passos: [
            { tipo: 'ordem', txt: 'Misture, na ordem certa', itens: ['Manteiga', 'Açúcar', 'Ovo', 'Farinha', 'Gotas de chocolate'] },
            { tipo: 'mexer', txt: 'Mexa a massa! Arraste em círculos', alvo: 1900, tempo: 7 },
            { tipo: 'temperar', txt: 'Coloque 6 bolinhas de massa na forma', n: 6, ic: '🟤' },
            { tipo: 'tempo', txt: 'Tire do forno na hora certa!', rep: 1 }
        ] },
    omelete: { n: 'Omelete', ic: '🍳', passos: [
            { tipo: 'ordem', txt: 'Na tigela, na ordem certa', itens: ['Ovos', 'Sal', 'Queijo'] },
            { tipo: 'tocar', txt: 'Bata os ovos! Toque rápido', alvo: 14, tempo: 5, ic: '🥚' },
            { tipo: 'temperar', txt: 'Uma pitadinha de orégano: 2 vezes', n: 2, ic: '🌿' },
            { tipo: 'tempo', txt: 'Vire a omelete!', rep: 2 }
        ] },
    vitamina: { n: 'Vitamina de morango', ic: '🍓', passos: [
            { tipo: 'ordem', txt: 'No liquidificador, na ordem certa', itens: ['Morango', 'Leite', 'Açúcar'] },
            { tipo: 'temperar', txt: 'Coloque 2 colheres de açúcar', n: 2, ic: '🥄' },
            { tipo: 'tocar', txt: 'Bata! Toque rápido', alvo: 16, tempo: 5, ic: '🌀' }
        ] },
});
window.comer = function () {
    const k = comidaNoTapete;
    if (!k)
        return sentarTapete();
    sentarTapete();
    const C = COMIDAS_APP[k];
    falar(FEFE, k === 'japonesa' ? 'Itadakimasu!' : k === 'pizza' ? 'Pizza é vida' : 'Que hambúrguer lindo', 1800);
    setTimeout(() => comerPrato({ n: C.n, ic: C.ic }, () => {
        comidaNoTapete = null;
        const tp = PONTOS.find(p => p.obj === 'tapete');
        if (tp) {
            tp.nome = 'Sentar no tapete';
            tp.acao = sentarTapete;
        }
        if (!S.feitos.comida) {
            S.feitos.comida = true;
            ganhar(3);
        }
        salvar();
    }), 700);
};
