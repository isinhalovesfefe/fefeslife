function paginasLivro(medidor) {
    const cabe = html => { if (!medidor)
        return html.length < 1200; medidor.innerHTML = html; return medidor.scrollHeight <= medidor.clientHeight + 1; };
    const pags = [{ tipo: 'capa' }, { tipo: 'dedic' }];
    let atual = [], par = '';
    const html = (ps) => ps.map(x => `<p>${esc(x)}</p>`).join('');
    const fecha = () => { if (par.trim()) {
        atual.push(par.trim());
        par = '';
    } if (atual.length) {
        pags.push({ tipo: 'texto', ps: atual });
        atual = [];
    } };
    LIVRO.paragrafos.forEach(p => {
        const frases = p.match(/[^.!?;]+[.!?;]+[»”"]?\s*|[^.!?;]+$/g) || [p];
        frases.forEach(f => {
            const tenta = atual.concat([(par + f).trim()]);
            if (!cabe(html(tenta)) && (atual.length || par)) {
                fecha();
                par = f;
            }
            else
                par += f;
        });
        if (par.trim()) {
            atual.push(par.trim());
            par = '';
        }
    });
    fecha();
    pags.push({ tipo: 'fim' });
    return pags;
}
function abrirLivro() {
    let pags = [], i = 0;
    abrir('📖 ' + LIVRO.titulo, `<div class="leitor"><div class="pagina px" id="livroPag"></div>
    <div class="livroNav"><button class="btn branco" id="livroAnt" style="width:auto;margin:0">◀</button><span id="livroNum"></span><button class="btn" id="livroProx" style="width:auto;margin:0">▶</button></div></div>`, false, true);
    const mostra = (dir) => {
        const p = pags[i], el = $('livroPag');
        if (!el)
            return;
        el.classList.remove('vira', 'viraV');
        void el.offsetWidth;
        if (dir)
            el.classList.add(dir > 0 ? 'vira' : 'viraV');
        if (p.tipo === 'capa')
            el.innerHTML = `<div class="capaL"><div class="capaT">${esc(LIVRO.titulo)}</div><div class="capaA">${esc(LIVRO.autor)}</div><div class="capaAno">${esc(LIVRO.ano)}</div><div class="capaN">${esc(LIVRO.nota)}</div></div>`;
        else if (p.tipo === 'dedic')
            el.innerHTML = `<div class="dedic">${esc(DEDICATORIA_LIVRO)}<span class="ass">${esc(ASSINATURA)}</span></div>`;
        else if (p.tipo === 'fim')
            el.innerHTML = `<div class="capaL"><div class="capaT" style="font-size:22px">Fim</div><div class="capaN">Viena, novembro de 1915</div><div style="font-size:30px;margin-top:14px">♥</div></div>`;
        else
            el.innerHTML = p.ps.map(x => `<p>${esc(x)}</p>`).join('');
        $('livroNum').textContent = `${i + 1} / ${pags.length}`;
        $('livroAnt').disabled = i === 0;
        $('livroProx').disabled = i === pags.length - 1;
        S.livroPag = i;
        if (i === pags.length - 1) {
            (S.vistos || (S.vistos = {})).livro = true;
            if (!S.feitos.livro) {
                S.feitos.livro = true;
                ganhar(3);
            }
        }
        salvar();
    };
    $('livroAnt').onclick = () => { if (i > 0) {
        i--;
        som.pop();
        mostra(-1);
    } };
    $('livroProx').onclick = () => { if (i < pags.length - 1) {
        i++;
        som.pop();
        mostra(1);
    } };
    const tecla = e => { if (!$('livroPag'))
        return removeEventListener('keydown', tecla); if (e.key === 'ArrowRight') {
        $('livroProx').click();
        e.preventDefault();
    } if (e.key === 'ArrowLeft') {
        $('livroAnt').click();
        e.preventDefault();
    } };
    addEventListener('keydown', tecla);
    let x0 = null;
    const pg = $('livroPag');
    pg.addEventListener('pointerdown', e => x0 = e.clientX);
    pg.addEventListener('pointerup', e => { if (x0 == null)
        return; const d = e.clientX - x0; x0 = null; if (d < -40)
        $('livroProx').click();
    else if (d > 40)
        $('livroAnt').click(); });
    pags = paginasLivro($('livroPag'));
    i = Math.min(S.livroPag || 0, pags.length - 1);
    mostra(0);
}
function imgLivro() { return pinta(12, 8, (R) => { R(0, 0, 12, 8, '#2a1d30'); R(1, 1, 10, 6, '#7a2a3a'); R(1, 1, 1, 6, '#c9a032'); R(3, 3, 6, 1, '#e8c87a'); R(10, 1, 1, 6, '#f4ecd0'); }); }
