let dataAvisada = '';
let chuvaGatoT = 6, chuvaAvisada = -1;
let doencaT = 5;
setInterval(() => { try {
    if (gatoPerto && sessao) {
        const st = S.gatos[gatoPerto.id];
        if (st.doente && st.remedio && (sessao.gostou || 0) >= (sessao.gostouRem || 0) + 3)
            curar(gatoPerto);
    }
}
catch (e) { } }, 400);
const TRUQUES = { lola: { n: 'Dar a patinha', cmd: 'Patinha!', janela: .85, feito: '*dá a patinha* ♥' }, tho: { n: 'Rolar', cmd: 'Rola!', janela: .55, feito: '*rola* *rola* *cai do tapete*' }, clarinha: { n: 'Sentar', cmd: 'Senta!', janela: .9, feito: '*senta, elegantíssima*' } };
let piq = null;
const MOVEIS_MOVEIS = ['arranhador', 'areia', 'monstera', 'tv', 'aquario', 'caixa', 'luminaria', 'girassol', 'horta', 'arvoreNatal'];
let montando = false, selMovel = null;
let saudouData = '';
CONQUISTAS.splice(CONQUISTAS.length - 1, 0, { id: 'enfermeira', ic: '💊', n: 'Enfermeira de gato', d: 'Cuidar de um gatinho doente até sarar', ok: () => V('curou') }, { id: 'truque', ic: '🐾', n: 'Adestradora', d: 'Ensinar um truque completo', ok: () => V('truque') }, { id: 'motivos', ic: '🫙', n: 'Todos os motivos', d: 'Ler todos os papeizinhos do potinho', ok: () => V('motivos') }, { id: 'florida', ic: '🌷', n: 'Mão verde', d: 'Fazer a hortinha florir', ok: () => V('florida') }, { id: 'piquenique', ic: '🧺', n: 'Piquenique', d: 'Fazer um piquenique no parque', ok: () => V('piquenique') }, { id: 'presente', ic: '🎁', n: 'Dia especial', d: 'Abrir um presente de data especial', ok: () => V('presente') });
