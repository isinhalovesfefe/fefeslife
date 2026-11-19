let tuto = null;
const TUTO = [
    { texto: () => MENSAGEM_BOAS_VINDAS, botao: 'Bora!' },
    { texto: () => 'Toque no chão pra andar. Também dá pra arrastar o dedo como um controle.\n(no PC: setas ou WASD, e espaço pra interagir)', ok: () => Math.hypot(FEFE.x - tuto.x, FEFE.y - tuto.y) > 30 },
    { texto: () => 'Agora toque num gatinho pra chegar pertinho dele.', ok: () => pertoAberto() },
    { texto: () => 'Passe o dedo no gatinho pra fazer carinho! Aqui também dá pra dar comida, banho, escovar, brincar...', ok: () => !pertoAberto() || (sessao && sessao.gostou >= 4) },
    { texto: () => 'Quando quiser, aperte "Voltar pro quarto".', ok: () => !pertoAberto() },
    { texto: () => 'Cada um tem seu jeitinho: a Lola só quer colo, a Clarinha precisa ganhar sua confiança aos pouquinhos, e o Tho... apronta. (Não cutuca ele demais.)', botao: 'Anotado' },
    { texto: () => 'Carinho, comida e tarefas dão corações. Eles compram coisas na lojinha: a sacolinha lá em cima.', botao: 'Entendi', brilho: 'btnLoja' },
    { texto: () => `No celular você chama a ${NOME_MINHA}, conversa com ela, pede comida e revive nossos momentos no app "Nós ♥". Quando ela tá longe, às vezes ela manda mensagem 💬`, botao: 'Que fofo!', brilho: 'btnCel' },
    { texto: () => 'O quarto tem muita coisa: TV, guitarra, espelho, guarda-roupa, cama pra dormir e sonhar... A porta leva pra cozinha e pra cidade, a pé ou de bike. Lá fora tem praia, lojinhas e um mapa pra explorar!', botao: 'Uau!' },
    { texto: () => 'No troféu ficam suas conquistas. Algumas são secretas 👀', botao: 'Ok!', brilho: 'btnConq' },
    { texto: () => 'Todo dia tem uma cartinha nova no criado-mudo, do lado da cama. Vai lá ler a primeira!', ok: () => S.lidas.length > 0 },
    { texto: () => 'Pronto! Ah, e dizem que tem uma surpresa escondida em algum lugar do quarto... ✨\nToma 5 corações de presente ♥', botao: 'Começar!', fim: true },
];
