// textos, nomes e datas do jogo
const NOME_DELA = 'Fefe';
const ASSINATURA = 'com todo o meu amor ♥';
const MENSAGEM_BOAS_VINDAS = 'Oi, princesa! Fiz esse quartinho pra você cuidar da Lola, da Clarinha e do Tho (e de mim também, né kkk).\nVem que eu te mostro como funciona ♥';
const NOME_MINHA = 'Isinha';
const FALAS_ISINHA = ['Te amo, Fefe!', 'Que saudade de você', 'Seus gatos são os melhores do mundo', 'Bora pedir uma pizza?', 'Você tá linda hoje', 'Me dá um abraço?', 'A Lola gosta mais de mim, admite'];
const RECADOS_ISINHA = ['Bom dia, amor! Já deu comida pros gatos?', 'Pensei em você agora', 'Hoje eu sonhei com você', 'Tô com saudade. Me chama pra fazer alguma coisa?', 'Você é a melhor coisa da minha vida', 'Manda foto dos gatos!', 'Te amo mais que ontem'];
const MEMORIAS = [
    { id: 'mem_date', data: '21/01/26', titulo: 'Nosso 1º date',
        legenda: 'Vinho num restaurante todo vermelho.',
        falas: [['isi', 'Tô meio nervosa, não vou mentir'], ['fefe', 'Eu também kkkk'], ['isi', 'Mas tô amando estar aqui com você'], ['fefe', 'Um brinde a isso?']] },
    { id: 'mem_beijo', data: '21/01/26', titulo: 'Nosso 1º beijo',
        legenda: 'No banquinho do jardim da praia, de frente pro mar.',
        falas: [['fefe', 'Que dia bonito...'], ['isi', 'Bonita é você'], ['fefe', 'Para, boba...'], ['isi', 'Posso te beijar?']] },
    { id: 'mem_pedido', data: '25/04/26', titulo: 'O pedido de namoro',
        legenda: 'Numa varanda.',
        falas: [['isi', 'Fefe, senta aqui comigo?'], ['fefe', 'Que foi? Você tá estranha kkk'], ['isi', 'É que eu tô muito feliz com você. Então...']] },
    { id: 'mem_namorados', data: '12/06/26', titulo: 'Nosso 1º Dia dos Namorados',
        legenda: 'Um jantar chique.',
        falas: [['isi', 'Feliz Dia dos Namorados, amor'], ['fefe', 'O primeiro de muitos ♥'], ['isi', 'Trouxe uma coisinha pra você...']] },
];
const MENSAGEM_PC = 'Nova mensagem!\n\nOi, princesa.\nSe você tá lendo isso, é porque tava fuçando no computador, né? kkkk\n\nSó queria te lembrar que eu te amo muito, que tenho o maior orgulho de você e que meu lugar favorito no mundo é do seu ladinho.\n\nBeijo da sua Isinha ♥';
const CARTINHAS = [
    { gato: 'lola', titulo: 'Bem-vinda!', texto: 'Fefe, fiz esse joguinho só pra você.\nCuida bem da gente que todo dia tem uma cartinha nova aqui no criado-mudo.' },
    { gato: 'tho', titulo: 'Um segredo', texto: 'Um segredo: eu sorrio feito boba toda vez que chega mensagem sua. Pode perguntar pro Floki e pro Kaiser, eles já perceberam kkkk ♥' },
    { gato: 'clarinha', titulo: 'Lembra daquele dia?', texto: 'Lembra do nosso primeiro date? Aquele restaurante todo vermelho, o vinho, você linda ali na minha frente... Acho que foi ali que eu soube que ia ser você.' },
    { gato: 'lola', titulo: 'Vale-presente', texto: 'Este bilhete vale: um dia inteirinho de mimos!\nCafuné, filminho, a comidinha que você escolher e beijos ilimitados.\nÉ só me mostrar ;)' },
    { gato: 'tho', titulo: 'Motivos', texto: '3 motivos pelos quais eu te amo:\n1. Seu sorriso, que deixa qualquer dia bom\n2. O jeito que você cuida de quem você ama (a Lola, a Clarinha e o Tho que o digam)\n3. Porque com você eu posso ser eu mesma' },
    { gato: 'clarinha', titulo: 'Pra um dia difícil', texto: 'Se hoje tá sendo um dia difícil, respira fundo, princesa. Vai passar.\nE enquanto não passa, lembra que eu tô aqui, sempre do seu lado, pro que você precisar.\nTe amo muito.' },
    { gato: 'lola', titulo: 'Uma semana!', texto: 'Uma semana cuidando da gente!\nVocê é a melhor mamãe de gato do mundo, e a melhor namorada também.\nObrigada por existir, meu amor ♥' },
];
const ANIVERSARIO_DELA = '20/11';
const DATA_TESTE = '';
const CHUVA_TESTE = false;
const MENSAGENS_DATAS = {
    aniversario: 'Feliz aniversário, minha princesa! 🥳\n\nHoje é o dia da pessoa mais especial da minha vida, e eu quis te dar um presente que tivesse um pedacinho de tudo que te representa e nos representa: o seu quarto (um pouquinho diferente né kkk, quis colocar umas coisinhas que me lembram de você nele), a Lola, a Clarinha, o Tho, o nosso primeiro date...\n\nObrigada por cada risada, cada cafuné e até cada cosquinha, cada conversa até tarde. Você deixa tudo mais leve e mais bonito, e eu tenho muita sorte de ser sua.\n\nQue esse novo ano seja cheio de coisas boas, de sonhos realizados e de muitos momentos nossos. Eu vou estar do seu lado em todos eles.\n\nTe amo muito, muito, muito ♥',
    namoro: 'Feliz aniversário de namoro, meu amor!\nObrigada por ter dito sim naquela varanda. Foi a melhor resposta que eu já ouvi na vida.\nQue venham muitos e muitos anos juntas ♥',
    namorados: 'Feliz Dia dos Namorados, princesa!\nLembra do nosso primeiro, naquele jantar? Eu escolheria você em todos os Dias dos Namorados da minha vida ♥',
    natal: 'Feliz Natal, amor!\nEsse ano eu ganhei o melhor presente de todos: você.\nQue o nosso Natal seja cheio de comida boa, cafuné e gatinhos tentando derrubar a árvore kkkk ♥',
    anonovo: 'Feliz ano novo, minha princesa!\nObrigada por ter feito esse ano ser tão especial. Que o próximo seja ainda mais nosso: mais dates, mais risadas, mais abraços e muito amor ♥',
    mesversario: 'Hoje faz {meses} meses que a gente namora!\nParece que foi ontem que eu te pedi em namoro naquela varanda, e ao mesmo tempo parece que eu te conheço a vida inteira.\nTe amo, meu amor ♥',
};
const QUIZ = [
    { p: 'Onde foi o nosso primeiro date?', o: ['Num restaurante todo vermelho, tomando vinho', 'No cinema', 'Numa pizzaria', 'No parque'], c: 0 },
    { p: 'Quando foi o nosso primeiro beijo?', o: ['21/01/26', '25/04/26', '12/06/26', '14/02/26'], c: 0 },
    { p: 'Onde foi o primeiro beijo?', o: ['Num banco de frente pro mar', 'No carro', 'Na porta de casa', 'Num show'], c: 0 },
    { p: 'Onde eu te pedi em namoro?', o: ['No sofá da varanda de um amigo seu', 'Num restaurante', 'Na praia', 'Por mensagem'], c: 0 },
    { p: 'Em que dia a gente começou a namorar?', o: ['25/04/26', '21/01/26', '12/06/26', '01/05/26'], c: 0 },
    { p: 'Qual gato é todo pretinho de olhos verdes?', o: ['Tho', 'Lola', 'Clarinha', 'Nenhum'], c: 0 },
    { p: 'Quem gosta de carinho mas prefere ficar sozinha?', o: ['Clarinha', 'Lola', 'Tho', 'Eu kkkk'], c: 0 },
];
const MOTIVOS = [
    'O jeito que você cuida da Lola, da Clarinha e do Tho.',
    'Porque você disse sim.',
    'Porque um vinho num restaurante virou a melhor noite da minha vida.',
    'Porque eu sinto saudade até quando a gente acabou de se despedir.',
    'Porque com você até o silêncio é gostoso.',
    'Porque você me faz rir até quando eu tô de mau humor.',
    'Porque o seu abraço é o meu lugar favorito.',
    'Porque você é linda de todos os jeitos, até de pijama e descabelada.',
    'Porque você me apoia em tudo que eu invento.',
    'Porque o nosso primeiro beijo foi perfeito.',
    'Porque o Floki e o Kaiser também te amam.',
    'Porque com você o futuro parece bonito.',
    'Porque você é minha melhor amiga e minha namorada ao mesmo tempo.',
    'Porque você aguenta o Tho, então acho que vai me aguentar também kkk',
    'Porque cada dia com você é um presente.',
    'Porque eu amo o seu jeitinho, inteirinho.',
];
const DEDICATORIA_LIVRO = 'Fefe, esse texto fala de como as coisas bonitas valem mais justamente porque passam. Cada momento com você é assim: eu quero viver todos com calma, prestando atenção em cada detalhe, porque sei o quanto eles são preciosos. Que a gente tenha muitos, muitos momentos bonitos juntas ♥';
const LIVRO = {
    titulo: 'Sobre a transitoriedade',
    autor: 'Sigmund Freud',
    ano: '1915',
    nota: 'Traduzido do original alemão, Vergänglichkeit (1916)',
    paragrafos: [
        'Há algum tempo, fiz um passeio por uma paisagem de verão em flor, na companhia de um amigo calado e de um jovem poeta, já bastante conhecido apesar da pouca idade. O poeta admirava a beleza da natureza ao nosso redor, mas não conseguia se alegrar com ela. Incomodava-o pensar que toda aquela beleza estava destinada a desaparecer, que no inverno ela teria sumido, assim como toda a beleza humana e tudo de belo e nobre que os homens criaram ou ainda poderão criar. Tudo o que ele, de outro modo, teria amado e admirado parecia-lhe desvalorizado pelo destino da transitoriedade a que estava condenado.',
        'Sabemos que dessa preocupação com o caráter passageiro de tudo o que é belo e perfeito podem nascer dois movimentos diferentes da alma. Um leva ao doloroso cansaço do mundo, como o do jovem poeta; o outro, à revolta contra o fato constatado. Não, é impossível que todas essas maravilhas da natureza e da arte, do nosso mundo de sentimentos e do mundo lá fora, terminem realmente em nada. Seria absurdo e sacrílego acreditar nisso. Elas precisam, de algum modo, poder durar, longe de qualquer influência destruidora.',
        'Mas essa exigência de eternidade revela com clareza demais que é fruto dos nossos desejos para que possa reivindicar algum valor de realidade. Também o que é doloroso pode ser verdadeiro. Eu não conseguia me decidir nem a negar a transitoriedade de todas as coisas, nem a arrancar uma exceção para o belo e o perfeito. Mas contestei ao poeta pessimista que a transitoriedade do belo trouxesse consigo a sua desvalorização.',
        'Pelo contrário: ela aumenta o seu valor! O valor da transitoriedade é um valor de raridade no tempo. A limitação da possibilidade de desfrutar algo o torna ainda mais precioso. Eu disse que não entendia como a ideia de que o belo é passageiro pudesse estragar a nossa alegria com ele. Quanto à beleza da natureza, ela volta a cada ano depois de ser destruída pelo inverno, e esse retorno, comparado à duração da nossa vida, pode até ser chamado de eterno. A beleza do corpo e do rosto humanos, nós a vemos desaparecer ainda dentro da nossa própria vida, mas essa fugacidade lhe acrescenta um novo encanto. Uma flor que floresce uma única noite nem por isso nos parece menos esplêndida.',
        'Também não conseguia entender por que a beleza e a perfeição de uma obra de arte ou de uma realização intelectual deveriam perder valor por serem limitadas no tempo. Pode chegar um dia em que os quadros e as estátuas que hoje admiramos se desfaçam em pó, ou em que venha depois de nós uma geração que já não entenda as obras dos nossos poetas e pensadores, ou até uma era geológica em que toda a vida na Terra se cale. Mas o valor de todo esse belo e perfeito é definido apenas pela sua importância para a nossa vida afetiva; ele não precisa sobreviver a ela e é, portanto, independente da duração absoluta.',
        'Eu considerava essas reflexões incontestáveis, mas percebi que não causavam nenhuma impressão no poeta nem no amigo. Dessa falha concluí que algum forte fator afetivo estava turvando o julgamento deles, e mais tarde acreditei tê-lo encontrado. Deve ter sido a revolta da alma contra o luto que estragava para eles o prazer com o belo. A ideia de que aquela beleza era passageira dava àquelas almas sensíveis um gosto antecipado do luto pela sua perda; e, como a alma recua instintivamente diante de tudo o que é doloroso, eles sentiam o seu prazer com o belo prejudicado pela ideia da sua transitoriedade.',
        'O luto pela perda de algo que amamos ou admiramos parece tão natural ao leigo que ele o considera evidente por si mesmo. Para o psicólogo, porém, o luto é um grande enigma, um daqueles fenômenos que não se explicam por si, mas aos quais se reconduzem outras obscuridades. Imaginamos possuir uma certa capacidade de amar — chamada libido — que, no início do desenvolvimento, estava voltada para o próprio eu. Mais tarde, embora muito cedo, ela se afasta do eu e se volta para os objetos, que assim, de certo modo, trazemos para dentro do nosso eu.',
        'Se os objetos são destruídos ou se os perdemos, a nossa capacidade de amar, a libido, fica novamente livre. Ela pode tomar outros objetos como substitutos ou voltar temporariamente para o eu. Mas por que esse desprendimento da libido em relação aos seus objetos deva ser um processo tão doloroso, isso não entendemos, e por enquanto não conseguimos deduzi-lo de nenhuma hipótese. Vemos apenas que a libido se agarra aos seus objetos e não quer abrir mão dos que perdeu, nem mesmo quando o substituto já está à disposição. Isso, então, é o luto.',
        'A conversa com o poeta aconteceu no verão anterior à guerra. Um ano depois, a guerra eclodiu e roubou do mundo as suas belezas. Ela não destruiu apenas a beleza das paisagens por onde passou e as obras de arte que tocou pelo caminho; quebrou também o nosso orgulho das conquistas da nossa cultura, o nosso respeito por tantos pensadores e artistas, as nossas esperanças de uma superação definitiva das diferenças entre povos e raças. Manchou a nobre imparcialidade da nossa ciência, expôs a nossa vida pulsional na sua nudez, soltou em nós os espíritos maus que julgávamos domados para sempre por séculos de educação pelos melhores dentre nós. Tornou de novo pequena a nossa pátria e de novo distante o resto do mundo. Roubou-nos tanto do que amávamos e nos mostrou a fragilidade de muita coisa que considerávamos estável.',
        'Não é de admirar que a nossa libido, tão empobrecida de objetos, tenha se ligado com mais intensidade ainda ao que nos restou, que o amor à pátria, a ternura pelos que nos são próximos e o orgulho do que temos em comum tenham de repente se fortalecido. Mas aqueles outros bens, agora perdidos, terão eles realmente perdido o valor para nós, por se mostrarem tão perecíveis e tão pouco resistentes? Para muitos de nós parece que sim, mas, de novo, injustamente, eu acho. Creio que os que pensam assim, e parecem dispostos a uma renúncia permanente porque o que era precioso não se mostrou duradouro, estão apenas em luto pela perda.',
        'Sabemos que o luto, por mais doloroso que seja, chega ao fim por si mesmo. Quando ele renunciou a tudo o que foi perdido, consome-se a si próprio, e então a nossa libido fica de novo livre para, enquanto ainda somos jovens e cheios de vida, substituir os objetos perdidos por outros, se possível igualmente ou ainda mais preciosos. É de esperar que com as perdas desta guerra não seja diferente. Quando o luto for superado, se verá que a nossa alta estima pelos bens da cultura não sofreu com a experiência da sua fragilidade. Reconstruiremos tudo o que a guerra destruiu, talvez sobre um terreno mais firme e de modo mais duradouro do que antes.',
    ],
};
const FRASES_ESTRELAS = [
    'Pedi pra gente ficar junta pra sempre',
    'Você é minha estrela favorita',
    'Já pensou a gente vendo isso de uma praia?',
    'Pedi mais noites assim com você',
    'Nenhuma estrela brilha igual seu sorriso',
    'Se eu pudesse, ficava aqui com você a noite toda',
];
const BILHETES = [
    'Bom dia, meu amor! Não esquece de beber água ♥',
    'Só passando pra lembrar que eu te amo muito',
    'Você é a melhor coisa que me aconteceu',
    'Hoje é um ótimo dia pra eu te dar um abraço',
    'Os gatinhos me contaram que você é a melhor mãe do mundo',
    'Saudade de você, mesmo quando você tá aqui do lado',
    'Promessa: muitos filmes, comidinhas e cafunés',
];
const FALAS_CHAMADA = [
    'Oi amor! Tava com saudade',
    'Oiii, linda! Como você tá?',
    'O Floki tá aqui pedindo atenção kkkk',
    'O Kaiser mandou um beijo pra você',
    'Como tão a Lola, a Clarinha e o Tho?',
    'Já comeu hoje? Come direitinho, hein',
    'Queria tanto estar aí agora',
    'Te amo, viu? Muito.',
];
const CARTA_SECRETA = 'Fefe, se você achou isso, é porque explorou cada cantinho desse quarto... igual você faz comigo.\n\nEsse joguinho foi feito com muito carinho, pensando em cada detalhe: nos gatinhos, nas nossas datas, nos nossos lugares. Porque tudo que é nosso merece ser guardado.\n\nObrigada por ter me escolhido. Eu te escolho todos os dias, de novo e de novo.';
