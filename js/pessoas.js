(function () {
    const st = document.createElement('style');
    st.textContent = `
    .necMini2{display:grid;grid-template-columns:repeat(10,1fr);gap:1px;padding:1px;background:#2a1d30;width:62px}
    .necMini2 i{height:5px;background:#f0e2ea}
    #necFefe,#necIsi{padding:3px 6px 4px !important;gap:2px !important;font-size:10px !important}
    #necFefe .lin,#necIsi .lin{display:grid;grid-template-columns:13px 62px;gap:4px;align-items:center}
    #necFefe .tit,#necIsi .tit{font-size:9px;font-weight:800;opacity:.65;letter-spacing:.4px;text-transform:uppercase;line-height:1;margin-bottom:1px}`;
    document.head.appendChild(st);
})();
const segsMini = (v, cor) => Array.from({ length: 10 }, (_, i) => `<i style="${v > i * 10 + 4 ? 'background:' + cor : ''}"></i>`).join('');
painelNec.innerHTML = `<div class="tit" id="necTit">Fefe</div>` + NEC.map(n => `<div class="lin necL"><span>${iconeNec(n.ic)}</span><div class="necMini2" id="necB_${n.k}"></div></div>`).join('');
painelIsi.innerHTML = `<div class="tit">${NOME_MINHA}</div>` + NEC_ISI.map(n => `<div class="lin"><span>${iconeNec(n.ic)}</span><div class="necMini2" id="necI_${n.k}"></div></div>`).join('');
window.desenharNec = function () {
    const F = S.fefe, mini = !!S.necMini;
    painelNec.querySelectorAll('.necL').forEach(e => e.style.display = mini ? 'none' : '');
    $('necTit').textContent = mini ? 'Fefe ▸' : 'Fefe';
    NEC.forEach(n => { const b = $('necB_' + n.k); if (!b)
        return; const v = F[n.k]; b.innerHTML = segsMini(v, v < 20 ? '#e8434f' : COR_NEC[n.k]); b.style.animation = v < 20 ? 'necPisca 1s steps(2) infinite' : ''; });
};
const _necIsiUpd = atualizarNecIsi;
window.atualizarNecIsi = function (dt) { _necIsiUpd(dt); if (painelIsi.style.display !== 'none' && Math.random() < dt * 1.2) {
    const N = S.isiNec || {};
    NEC_ISI.forEach(n => { const b = $('necI_' + n.k); if (b)
        b.innerHTML = segsMini(N[n.k] || 0, (N[n.k] || 0) < 20 ? '#e8434f' : n.cor); });
    painelIsi.style.top = (painelNec.offsetTop + painelNec.offsetHeight + 6) + 'px';
} };
desenharNec();
(function () { const st = document.createElement('style'); st.textContent = '#irCozinha img.pxe,#irBike img.pxe{height:34px;margin:2px auto 4px;display:block}'; document.head.appendChild(st); })();
const PELE_NPC = [['#f8dcc8', '#e6bfa6'], ['#f0c8a8', '#d8a888'], ['#e2ab84', '#c98d68'], ['#c98d68', '#a87050'], ['#a86b48', '#8a5236'], ['#7a4a30', '#5e3824']];
const CABELO_NPC = [['#17121c', '#3d3049'], ['#3a2418', '#5a3a28'], ['#6a4028', '#8a5a38'], ['#c0894a', '#e2b672'], ['#e8c070', '#f6dc9a'], ['#b8402a', '#d86040'], ['#ff7aa8', '#ffb0cc'], ['#9aa0b0', '#c8ccd6'], ['#2a3a6a', '#4a5a8a']];
const ROUPA_NPC = ['#5b8cff', '#ff7aa8', '#7bd389', '#ffd36e', '#c08cff', '#ff8a3d', '#f4f1ec', '#1d1b22', '#c8242e', '#2f9a4a', '#8fcaff', '#e8a5bf'];
const CALCA_NPC = [['#4b5263', '#3a3f4d'], ['#6a8cc0', '#56749f'], ['#1d1b22', '#141318'], ['#c9a878', '#a88a60'], ['#5a4a3a', '#463a2e']];
let _baseNPC = null;
let NPCS = [], npcMapa = null;
const FALAS_NPC = {
    parque: ['Bom dia!', 'Que dia lindo, né?', 'Que casal fofo', 'Seu cabelo tá lindo!', '*correndo* ufa ufa', 'Oi, moças!'],
    cidade: ['Bom dia!', 'Cuidado com a bike!', 'Que dia bonito', 'Licença!', '*mexendo no celular*', 'Oi!'],
    show: ['UHUUUU!', 'ESSA É BOA DEMAIS', '*pula*', 'TOCA RAUL!', 'Mais uma! Mais uma!', 'Que show!'],
    cafe: ['Esse café é o melhor da cidade', 'Hmmm, que cheiro', 'Vocês são tão fofas juntas'],
    garcom: ['Posso ajudar?', 'Já trago, viu?', 'Fiquem à vontade!', 'Precisando, é só chamar'],
};
let garcomVisitou = false;
