const PONTOS = [
    { obj: 'criado', nome: 'Ler as cartinhas', x: 70, y: 68, acao: () => listaCartas() },
    { obj: 'mesa', nome: 'Olhar o computador', x: 126, y: 68, acao: () => abrir('Computador', `<div class="tela-pc">${esc(MENSAGEM_PC)}</div>`) },
    { obj: 'cadeira', nome: 'Sentar no PC', x: 126, y: 84, acao: sentarPC },
    { obj: 'estante', nome: 'Regar as plantas', x: 191, y: 62, acao: regar },
    { obj: 'guitarra', nome: 'Tocar guitarra', x: 224, y: 66, acao: () => jogoRitmo() },
    { obj: 'porta', nome: 'Sair do quarto', x: 176, y: 228, zona: [158, 224, 36, 14], acao: () => { abrir('Pra onde?', `<div class="grade"><button class="px" id="irCozinha">🍳<br>Cozinha</button><button class="px" id="irBike">🚲<br>Andar de bike</button></div>`); $('irCozinha').onclick = () => { fechar(); trocarCena('cozinha'); }; $('irBike').onclick = () => { fechar(); trocarCena('cidade'); }; } },
    { obj: 'vitrola', nome: 'Tocar um disco', x: 252, y: 68, acao: vitrola },
    { obj: 'espelho', nome: 'Olhar no espelho', x: 288, y: 63, acao: abrirEspelho },
    { obj: 'armario', nome: 'Trocar de roupa', x: 322, y: 65, acao: abrirArmario },
    { obj: 'cama', nome: 'Deitar na cama', x: 35, y: 100, acao: deitar },
    { obj: 'tapete', nome: 'Sentar no tapete', x: 172, y: 152, acao: sentarTapete, zona: [150, 134, 44, 34] },
    { obj: 'potes', nome: 'Encher os potes', x: 274, y: 198, acao: () => escolherComida(null) },
    { obj: 'areia', nome: 'Limpar a caixinha', x: 26, y: 204, acao: areia },
    { obj: 'arranhador', nome: 'Olhar o arranhador', x: 330, y: 168, acao: () => falar(FEFE, 'O lugar favorito do Tho') },
    { obj: 'tv', nome: 'Ligar a TV', x: 176, y: 120, acao: () => escolherTV() },
];
let alvoAtual = null;
