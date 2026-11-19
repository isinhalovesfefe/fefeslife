const IMG_DECOR = {};
const miniFotos = {};
const LOJA = [
    { id: 'pisca', aba: 'decor', n: 'Pisca-pisca', preco: 30, desc: 'Luzinhas na parede que piscam à noite.' },
    { id: 'aquario', aba: 'decor', n: 'Aquário', preco: 40, desc: 'Os gatos ficam hipnotizados.' },
    { id: 'caixa', aba: 'decor', n: 'Caixa de papelão', preco: 15, desc: 'O esconderijo oficial do Tho.' },
    { id: 'rede', aba: 'decor', n: 'Rede de janela', preco: 35, desc: 'O cantinho favorito da Clarinha.' },
    { id: 'mural', aba: 'decor', n: 'Mural de fotos', preco: 20, desc: 'Mostra as fotos do espelho.' },
    { id: 'luminaria', aba: 'decor', n: 'Luminária de lua', preco: 25, desc: 'Luz quentinha à noite.' },
    { id: 'girassol', aba: 'decor', n: 'Girassol', preco: 12, desc: 'Um vaso de alegria.' },
    ...Object.entries(ACESSORIOS).map(([id, a]) => ({ id, aba: 'gatos', n: a.n, preco: a.preco, desc: 'Serve em qualquer gato. Coloque na tela de carinho.' })),
    { id: 'roupa_gatinha', aba: 'roupas', n: 'Fantasia de gatinha', preco: 25, desc: 'Com orelhinhas!', roupa: 6 },
    { id: 'roupa_florido', aba: 'roupas', n: 'Vestido florido', preco: 20, desc: 'Pra dias de sol.', roupa: 7 },
    { id: 'roupa_xadrez', aba: 'roupas', n: 'Xadrez vermelho', preco: 20, desc: 'Estilo grunge.', roupa: 9 },
    { id: 'varinha', aba: 'brinq', n: 'Varinha de pena', preco: 20, desc: 'Brinque com eles na tela de carinho.' },
];
const ABAS = { decor: 'Decoração', gatos: 'Gatos', roupas: 'Roupas', brinq: 'Brinquedos' };
let abaLoja = 'decor';
