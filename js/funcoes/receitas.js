function comerPrato(d, aoFim) {
    const W = 96, H = 64, juntas = ISI.aqui;
    abrir(`Hora de comer! ${d.ic}`, `<div class="mg"><canvas id="cvPrato" width="${W}" height="${H}" style="display:block;margin:0 auto;height:min(calc(92vh - 230px),220px);width:auto;max-width:100%;image-rendering:pixelated;cursor:pointer;touch-action:none"></canvas>
    <p id="pratoMsg" style="margin:6px 0;min-height:20px;font-size:13px">Toque na comida pra dar uma mordida 😋</p>
    <div class="lanes" id="pratoBtns" style="gap:6px;flex-wrap:wrap;min-height:44px"></div></div>`, false, true);
    const cv = $('cvPrato'), x = cv.getContext('2d');
    x.imageSmoothingEnabled = false;
    const camada = document.createElement('canvas');
    camada.width = W;
    camada.height = H;
    const cx = camada.getContext('2d');
    cx.imageSmoothingEnabled = false;
    let total = 0, resto = 0, migalhas = [], fim = false, evento = null, eventoT = 4500 + Math.random() * 2500, ult = performance.now(), mordidas = 0, pronto = false;
    const msg = s => { const m = $('pratoMsg'); if (m)
        m.textContent = s; };
    const img = new Image();
    img.onload = () => { cx.drawImage(img, 24, 8, 48, 48); const dd = cx.getImageData(0, 0, W, H).data; for (let i = 3; i < dd.length; i += 4)
        if (dd[i] > 100)
            total++; resto = total; pronto = true; };
    img.src = urlEmoji(d.ic, 30) || '';
    const contar = () => { const dd = cx.getImageData(0, 0, W, H).data; let n = 0; for (let i = 3; i < dd.length; i += 4)
        if (dd[i] > 100)
            n++; return n; };
    const morder = (px, py, r, quem) => {
        cx.globalCompositeOperation = 'destination-out';
        cx.fillStyle = '#000';
        for (let yy = -r; yy <= r; yy++)
            for (let xx = -r; xx <= r; xx++) {
                const dist = Math.hypot(xx, yy);
                if (dist <= r - (((xx * 7 + yy * 13) & 3) === 0 ? 1 : 0))
                    cx.fillRect(Math.round(px + xx), Math.round(py + yy), 1, 1);
            }
        cx.globalCompositeOperation = 'source-over';
        const antes = resto;
        resto = contar();
        const tirou = antes - resto;
        for (let i = 0; i < 5; i++)
            migalhas.push({ x: px + Math.random() * 8 - 4, y: py, vx: Math.random() * 1.6 - .8, vy: -1 - Math.random(), v: 1 });
        if (quem === 'fefe' && tirou > 0) {
            nec('fome', 62 * tirou / Math.max(1, total));
        }
        if (resto < total * .07 && !fim) {
            fim = true;
            cx.clearRect(0, 0, W, H);
            terminar();
        }
        return tirou;
    };
    const pontoNaComida = () => { const dd = cx.getImageData(0, 0, W, H).data; for (let k = 0; k < 200; k++) {
        const X = 24 + Math.floor(Math.random() * 48), Y = 8 + Math.floor(Math.random() * 48);
        if (dd[(Y * W + X) * 4 + 3] > 100)
            return [X, Y];
    } return [48, 32]; };
    const botoes = () => {
        const B = $('pratoBtns');
        if (!B)
            return;
        let h = '';
        if (evento)
            h += `<button class="btn" id="pEvSim" style="width:auto;margin:0;background:#ffb36b">${evento.sim}</button><button class="btn branco" id="pEvNao" style="width:auto;margin:0">${evento.nao}</button>`;
        else if (juntas && !fim)
            h += `<button class="btn branco" id="pIsi" style="width:auto;margin:0">🥄 Dar na boquinha da ${NOME_MINHA}</button>`;
        if (fim)
            h += `<button class="btn" data-fechar style="width:auto;margin:0">Fechar</button>`;
        B.innerHTML = h;
        if ($('pIsi'))
            $('pIsi').onclick = () => {
                const [a, b] = pontoNaComida();
                morder(a, b, 6, 'isi');
                som.pop();
                nec('social', 8);
                necIsi('fome', 12);
                necIsi('carinho', 4);
                falar(ISI, pick(['Hmmm! Que delícia, amor', 'Aviãozinhooo', 'Mais um pedaço?', 'Você cozinha muito bem ♥']), 2000);
                msg(pick([`A ${NOME_MINHA} amou 💕`, 'Dividir comida é amor']));
                if (!fim)
                    botoes();
            };
        if ($('pEvSim'))
            $('pEvSim').onclick = () => { const e = evento; evento = null; e.sim_f(); botoes(); };
        if ($('pEvNao'))
            $('pEvNao').onclick = () => { const e = evento; evento = null; e.nao_f(); botoes(); };
    };
    const novoEvento = () => {
        const noQuarto = MAPA === 'quarto';
        const cand = noQuarto ? gatos.filter(g => !S.gatos[g.id].dormindo) : (MAPA === 'cozinha' ? [{ id: 'tho' }] : []);
        if (!cand.length)
            return;
        const g = pick(cand), nome = GATOS[g.id].nome;
        if (g.id === 'clarinha') {
            msg('A Clarinha cheirou o prato... e foi embora. Crítica gastronômica.');
            return;
        }
        const dar = () => {
            const [a, b] = pontoNaComida();
            morder(a, b, 4, g.id);
            som.miau(g.id, 1.1);
            const st = S.gatos[g.id];
            st.alegria = lim(st.alegria + 8);
            st.fome = lim((st.fome || 0) + 5);
            msg(g.id === 'tho' ? 'O Tho engoliu sem mastigar 😹' : 'A Lola comeu com toda delicadeza ♥');
            if (noQuarto)
                falar(G(g.id), g.id === 'tho' ? 'MAIS' : 'obrigada ♥', 1400);
        };
        const negar = () => {
            if (g.id === 'tho') {
                const [a, b] = pontoNaComida();
                morder(a, b, 8, 'tho');
                som.miau('tho', 1.3);
                shake = Math.max(shake, 2);
                msg('O Tho roubou um pedação mesmo assim! 😾');
                if (noQuarto)
                    falar(G('tho'), '*sai correndo com a comida*', 1600);
            }
            else {
                msg('A Lola ficou olhando com olhinhos tristes... 🥺');
            }
        };
        evento = { sim: `Dar um pedacinho pr${g.id === 'tho' ? 'o' : 'a'} ${nome}`, nao: g.id === 'tho' ? 'Xô, Tho!' : 'Agora não', sim_f: dar, nao_f: () => { if (g.id === 'tho') {
                som.pop();
                msg('Xô, Tho! Ele saiu bufando 😾');
            }
            else
                negar(); } };
        msg(g.id === 'tho' ? 'O Tho subiu e tá de olho no seu prato... 👀' : 'A Lola tá pedindo com a patinha 🐾');
        evento.t = performance.now();
        if (noQuarto) {
            const gg = G(g.id);
            if (gg && gg !== gatoPerto)
                irPara(gg, Math.min(FEFE.x + 12, MUNDO.x1 - 8), FEFE.y + 4, () => { gg.estado = 'parado'; gg.timer = 6; }, 45);
        }
        botoes();
    };
    const terminar = () => {
        msg(pick(['Que delícia... tô cheia ♥', 'Limpei o prato!', 'Comi tudinho 😋']));
        som.plim();
        particula('coracao', FEFE.x, FEFE.y - 24, 3);
        falar(FEFE, 'Tô cheia ♥', 1600);
        if (juntas)
            setTimeout(() => falar(ISI, 'Nota 10, chef!', 1800), 700);
        evento = null;
        botoes();
        try {
            aoFim && aoFim();
        }
        catch (e) { }
        salvar();
    };
    cv.onpointerdown = e => {
        if (!pronto || fim)
            return;
        const r = cv.getBoundingClientRect(), px = (e.clientX - r.left) * W / r.width, py = (e.clientY - r.top) * H / r.height;
        const dd = cx.getImageData(Math.max(0, Math.round(px) - 3), Math.max(0, Math.round(py) - 3), 7, 7).data;
        let tem = false;
        for (let i = 3; i < dd.length; i += 4)
            if (dd[i] > 100) {
                tem = true;
                break;
            }
        if (!tem) {
            msg('Toque em cima da comida 😋');
            return;
        }
        morder(px, py, 7, 'fefe');
        mordidas++;
        som.pop();
        if (AC)
            ruidoCurto(AC.currentTime, .06, 'bandpass', 1800, .25);
        if (!fim && mordidas % 3 === 1)
            msg(pick(['Nhac!', 'Hmmmm', 'Que delícia', '*mastiga feliz*', 'Isso tá muito bom']));
    };
    const lp = () => {
        if (!$('cvPrato') || !$('modal').classList.contains('on')) {
            return;
        }
        requestAnimationFrame(lp);
        const agora = performance.now(), dt = Math.min(.1, (agora - ult) / 1000);
        ult = agora;
        if (pronto && !fim && !evento) {
            eventoT -= dt * 1000;
            if (eventoT <= 0) {
                eventoT = 6000 + Math.random() * 4000;
                novoEvento();
            }
        }
        if (evento && evento.t && agora - evento.t > 4200 && evento.nao.startsWith('Xô')) {
            const e = evento;
            evento = null;
            const [a, b] = pontoNaComida();
            morder(a, b, 8, 'tho');
            som.miau('tho', 1.3);
            msg('Demorou! O Tho roubou um pedaço 😾');
            botoes();
        }
        x.fillStyle = '#c98f5f';
        x.fillRect(0, 0, W, H);
        x.fillStyle = '#b87e50';
        for (let yy = 0; yy < H; yy += 8)
            x.fillRect(0, yy, W, 1);
        x.fillStyle = 'rgba(42,18,56,.25)';
        x.beginPath();
        x.ellipse(50, 36, 34, 24, 0, 0, Math.PI * 2);
        x.fill();
        x.fillStyle = '#2a1d30';
        x.beginPath();
        x.ellipse(48, 33, 34, 24, 0, 0, Math.PI * 2);
        x.fill();
        x.fillStyle = '#f4f1ec';
        x.beginPath();
        x.ellipse(48, 33, 33, 23, 0, 0, Math.PI * 2);
        x.fill();
        x.fillStyle = '#dcd6e4';
        x.beginPath();
        x.ellipse(48, 33, 25, 17, 0, 0, Math.PI * 2);
        x.fill();
        x.fillStyle = '#fff';
        x.fillRect(26, 16, 6, 1);
        x.fillRect(24, 18, 3, 1);
        x.fillStyle = '#ff9ec4';
        x.fillRect(84, 18, 10, 28);
        x.fillStyle = '#ff7aa8';
        x.fillRect(84, 18, 10, 2);
        x.fillStyle = '#b9bcc6';
        x.fillRect(88, 22, 2, 20);
        x.fillRect(86, 20, 1, 4);
        x.fillRect(88, 20, 1, 4);
        x.fillRect(90, 20, 1, 4);
        x.fillRect(86, 23, 5, 1);
        x.drawImage(camada, 0, 0);
        migalhas = migalhas.filter(m => m.v > 0);
        migalhas.forEach(m => { m.x += m.vx; m.y += m.vy; m.vy += .15; m.v -= .03; x.fillStyle = '#e8c890'; x.fillRect(Math.round(m.x), Math.round(m.y), 1, 1); });
        if (!pronto) {
            x.fillStyle = '#2a1d30';
            x.font = 'bold 7px monospace';
            x.fillText('...', 44, 34);
        }
    };
    botoes();
    requestAnimationFrame(lp);
}
