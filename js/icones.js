Object.assign(ICONES, {
    laser: [[".....r...r..", "......r.r...", "..rr..RRR...", ".....RWRR.rr", "....ORRRO...", "...OGGGO.r..", "..OGGGO..r..", ".OGGGO......", "OGKGO.......", "OGGO........", "OOO.........", "............"], { O: '#2a1d30', G: '#9aa0b0', K: '#ff5c8d', R: '#ff2e4a', W: '#fff', r: '#ff7a8a' }],
    luzOn: [["r....rr....r", ".r........r.", "....OOOO....", "...OYYYYO...", "r.OYWYYYYO.r", "..OYWYYYYO..", "..OYYYYYYO..", "...OYYYYO...", "....OYYO....", "....OGGO....", "....OGGO....", ".....OO....."], { O: '#2a1d30', Y: '#ffd36e', W: '#fff6c8', G: '#9aa0b0', r: '#ffd36e' }],
    luzOff: [["............", "............", "....OOOO....", "...OYYYYO...", "..OYWYYYYO..", "..OYWYYYYO..", "..OYYYYYYO..", "...OYYYYO...", "....OYYO....", "....OGGO....", "....OGGO....", ".....OO....."], { O: '#2a1d30', Y: '#c9c4d6', W: '#ece8f4', G: '#9aa0b0' }],
    abajur: [["............", "...OOOOOO...", "..ORRWRRRO..", ".ORWRRRRWRO.", ".ORRRRWRRRO.", "..OOOOOOOO..", ".....OO.....", "....OYYO....", "....OYYO....", "...OOOOOO...", "..OBBBBBBO..", "..OOOOOOOO.."], { O: '#2a1d30', R: '#ff6b6b', W: '#fff', Y: '#fff0c8', B: '#a8714a' }],
    janela: [["OOOOOOOOOOOO", "OBBBBOBBBBBO", "OBWBBOBBWBBO", "OBBBBOBBBBBO", "OOOOOOOOOOOO", "OBBBBOBBBBBO", "OBBBBOBBBBBO", "OBBBWOBBBBBO", "OOOOOOOOOOOO", "PP........PP", "PP........PP", "P..........P"], { O: '#2a1d30', B: '#8fcaff', W: '#fff', P: '#ff9ec4' }],
});
const _empilhar51 = empilharBotoes;
window.empilharBotoes = function () { _empilhar51(); [btnLaser, btnCamera, btnLuz, btnJanela].forEach(b => { iconeBotao(b); const sp = b.querySelector('span'); if (sp) {
    b.title = sp.textContent;
    b.setAttribute('aria-label', sp.textContent);
} }); };
