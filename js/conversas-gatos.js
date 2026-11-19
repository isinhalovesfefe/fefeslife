(function () {
    const st = document.createElement('style');
    st.textContent = `
  #btnLaser,#btnCamera,#btnLuz,#btnJanela{width:38px!important;height:38px!important;padding:0!important;font-size:0!important;border-radius:50%!important;left:12px!important;display:none;align-items:center;justify-content:center}
  #btnLaser img.pxe,#btnCamera img.pxe,#btnLuz img.pxe,#btnJanela img.pxe{height:20px!important;margin:0!important;vertical-align:middle}
  .necMini2{width:66px !important} .necMini2 i{height:5px !important}
  #necFefe,#necIsi{padding:3px 6px 4px !important;font-size:10px !important}
  #necFefe .lin,#necIsi .lin{grid-template-columns:13px 66px !important;gap:4px !important}`;
    document.head.appendChild(st);
})();
window.empilharBotoes = function () {
    const livre = MAPA === 'quarto' && !bloqueioTela() && !montando && !esconde;
    const vis = { btnLaser: btnLaser.style.display !== 'none', btnCamera: livre && tem('camera'), btnLuz: livre && (ehNoite24() || luzModo > 0), btnJanela: livre && (estaChovendo() || janelaAberta) };
    let i = 0;
    [btnLaser, btnCamera, btnLuz, btnJanela].forEach(b => {
        const v = vis[b.id];
        if (b !== btnLaser)
            b.style.display = v ? 'flex' : 'none';
        else if (v)
            b.style.display = 'flex';
        if (v) {
            b.style.bottom = (46 + i * 46) + 'px';
            i++;
        }
        b.title = b.textContent.replace(/^\S+\s/, '');
        b.setAttribute('aria-label', b.title);
    });
};
btnLuz.addEventListener('click', () => setTimeout(() => toast(['Luz acesa', 'Só o abajur aceso', 'Luz apagada'][luzModo] || ''), 30));
btnLaser.addEventListener('click', () => setTimeout(() => toast(laser ? 'Laser ligado! Arraste pela tela 🔴' : 'Laser guardado'), 30));
let conversaAte = 0;
const DUR_CONVERSA = { declara: 13000, elogio: 9000, cocegas: 7000, dancar: 8000, cantar: 6000, conversar: 5000, esquimo: 3500 };
const _acao43 = acaoIsinha;
window.acaoIsinha = function (a) { if (DUR_CONVERSA[a])
    conversaAte = performance.now() + DUR_CONVERSA[a]; return _acao43(a); };
const _roteiro43 = roteiro;
window.roteiro = function (falas, depois, mapa) { conversaAte = performance.now() + 900 + falas.length * 2500 + 1500; return _roteiro43(falas, depois, mapa); };
const SOBRE_GATO = /Lola|Clarinha|Tho\b|gatinh[oa]s?\b(?! mais linda)|bebê|psps|Vem cá,? bebê|Que fofura|meu bebê/i;
const _falar43 = falar;
window.falar = function (alvo, txt, ms) {
    if (performance.now() < conversaAte && (alvo === FEFE || alvo === ISI) && typeof txt === 'string' && SOBRE_GATO.test(txt) && !/^Gatinha|gatinha[,!.]|, gatinha|minha gatinha/i.test(txt))
        return;
    if (performance.now() < conversaAte && alvo && alvo.tipo && alvo !== FEFE && alvo !== ISI && Math.hypot(alvo.x - FEFE.x, alvo.y - FEFE.y) < 60)
        return;
    return _falar43(alvo, txt, ms);
};
const _vidaIsi43 = atualizarVidaIsinha;
window.atualizarVidaIsinha = function (dt) { if (performance.now() < conversaAte)
    return; return _vidaIsi43(dt); };
window.andarNPC = function (n, tx, ty, dt) {
    const dx = tx - n.x, dy = ty - n.y, d = Math.hypot(dx, dy);
    if (d < 1.5) {
        n.anda = false;
        return true;
    }
    const v = Math.min(n.vel * dt, d), nx = n.x + dx / d * v, ny = n.y + dy / d * v;
    if (!n.ehCao && !n.cine && n.tipo !== 'parado' && n.tipo !== 'rota' && bloqueado(nx, ny, 4)) {
        if (!bloqueado(nx, n.y, 4))
            n.x = nx;
        else if (!bloqueado(n.x, ny, 4))
            n.y = ny;
        else {
            n.anda = false;
            n.travou = (n.travou || 0) + dt;
            if (n.travou > 1.5) {
                n.travou = 0;
                return true;
            }
            return false;
        }
    }
    else {
        n.x = nx;
        n.y = ny;
    }
    n.anda = true;
    n.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    return false;
};
const _atNPC43 = atualizarNPCs;
window.atualizarNPCs = function (dt) {
    if (String(MAPA).startsWith('mem_') && performance.now() < conversaAte)
        NPCS.forEach(n => { if (n.tipo === 'garcom') {
            n.indo = true;
            n.alvo = null;
            n.anda = false;
        } });
    else if (String(MAPA).startsWith('mem_'))
        NPCS.forEach(n => { if (n.tipo === 'garcom' && n.indo && !n.alvo && !n.atendendo)
            n.indo = false; });
    return _atNPC43(dt);
};
let gatoMomentoT = 25;
const _acao43b = acaoIsinha;
window.acaoIsinha = function (a) {
    if (a === 'varinha') {
        conversaAte = 0;
        falar(ISI, 'Peguei a varinha! Quem quer?', 1600);
        const ac = gatos.filter(g => !S.gatos[g.id].dormindo);
        let n = 0;
        const t = setInterval(() => {
            n++;
            ac.forEach((g, k) => irPara(g, ISI.x + Math.cos(n + k * 2) * 26, ISI.y + Math.sin(n + k * 2) * 14, null, 90));
            particula('brilho', ISI.x + 10, ISI.y - 20, 2);
            if (n === 2)
                falar(FEFE, 'Olha o Tho pulando kkkk', 1500);
            if (n === 4)
                falar(ISI, 'A Lola é rápida demais!', 1500);
            if (n >= 6) {
                clearInterval(t);
                ac.forEach(g => { g.estado = 'parado'; g.timer = 3; g.vel = 30; falar(g, g.id === 'clarinha' ? '...ok, foi divertido.' : 'MIAU!', 1400); S.gatos[g.id].alegria = lim((S.gatos[g.id].alegria || 0) + 12); });
                setTimeout(() => falar(FEFE, 'Elas cansaram, amor kkkk', 1600), 800);
                salvar();
            }
        }, 900);
        necIsi('carinho', 8);
        nec('diversao', 10);
        primeiraVez('varinhaJuntas', 1);
        return;
    }
    return _acao43b(a);
};
const _menu43 = menuIsinha;
window.menuIsinha = function () {
    _menu43();
    if (MAPA !== 'quarto')
        return;
    const g = document.querySelector('#modal .grade');
    if (!g)
        return;
    g.lastElementChild.insertAdjacentHTML('beforebegin', `<button class="px" data-i4="varinha"><span style="font-size:22px">🪄</span>Brincar com os gatos</button>`);
    g.querySelector('[data-i4]').onclick = () => { fechar(); acaoIsinha('varinha'); };
};
