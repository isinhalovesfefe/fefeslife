const EMOJI_PX = {
    '🍔': [[".OOOOOOO.", "OyywyywyO", "OyyyyyyyO", "OGGGGGGGO", "ORRRRRRRO", "OyyyyyyyO", ".OOOOOOO."], { O: '#2a1d30', y: '#f0a848', w: '#fff6d8', G: '#5fbf5a', R: '#7a3a2a' }],
    '⚡': [["....OOOO", "...OYYYO", "..OYYYO.", ".OYYYO..", "OYYYYYYO", "OOOOYYO.", "...OYYO.", "..OYYO..", "..OYO...", ".OYO....", ".OO....."], { O: '#2a1d30', Y: '#ffd36e' }],
    '🎮': [[".OOOOOOOOO.", "OPPPPPPPPPO", "OPwPPPPPrPO", "OwwwPPPgPbO", "OPwPPPPPyPO", "OPPPOOOPPPO", ".OOO...OOO."], { O: '#2a1d30', P: '#8a6dbe', w: '#fff', r: '#ff5c8d', b: '#5b8cff', g: '#7bd389', y: '#ffd36e' }],
    '💗': [[".OO.OO.", "OHWHHHO", "OHHHHHO", ".OHHHO.", "..OHO..", "...O..."], { O: '#2a1d30', H: '#ff5c8d', W: '#fff' }],
    '♥': [[".OO.OO.", "OHWHHHO", "OHHHHHO", ".OHHHO.", "..OHO..", "...O..."], { O: '#2a1d30', H: '#ff5c8d', W: '#fff' }],
    '❤': [[".OO.OO.", "OHWHHHO", "OHHHHHO", ".OHHHO.", "..OHO..", "...O..."], { O: '#2a1d30', H: '#e8343f', W: '#fff' }],
};
const _emojiURL = {};
const EMOJI_RE = /(?:\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*)/gu;
const _stEmj = document.createElement('style');
_stEmj.textContent = 'img.pxe{height:1.15em;width:auto;vertical-align:-.2em;image-rendering:pixelated;display:inline-block;margin:0 .05em}';
document.head.appendChild(_stEmj);
const PULAR_EMJ = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, OPTION: 1, TITLE: 1, svg: 1, SVG: 1, CANVAS: 1 };
const _obsEmj = new MutationObserver(ms => { for (const m of ms) {
    if (m.type === 'characterData')
        pixelizarNo(m.target);
    else
        m.addedNodes.forEach(pixelizarNo);
} });
_obsEmj.observe(document.body, { childList: true, subtree: true, characterData: true });
pixelizarNo(document.body);
