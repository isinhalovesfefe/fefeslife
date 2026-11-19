const tela = document.getElementById('tela'), ctx = tela.getContext('2d');
let Z = 3, dpr = 1, vw = 0, vh = 0, cam = { x: 0, y: 0 }, jogarAssim = false;
let marcaAlvo = null;
