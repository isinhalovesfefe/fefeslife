const ENCONTROS = {
    cinema: { titulo: 'Cinema', texto: () => `Vocês dividiram a pipoca... e a ${NOME_MINHA} chorou no final.` },
    estrelas: { titulo: 'Vendo as estrelas', texto: () => `Deitadas na grama, contando estrelas. A ${NOME_MINHA} jurou que viu uma cadente.` },
    show: { titulo: 'Show', texto: () => `Muito barulho, muita gente, e as duas cantando tudo.` },
    cafe: { titulo: 'Cafezinho', texto: () => `Um café, um docinho e conversa até fechar o lugar.` },
};
let encTimer = null;
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
