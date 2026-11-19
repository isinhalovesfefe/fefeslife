const TRILHA = { ac: [[65, 69, 72, 76], [64, 67, 71, 74], [62, 65, 69, 72], [60, 64, 67, 71]], mel: [0, 2, 4, 7, 9] };
let trilha = null;
document.addEventListener('keydown', e => { if (e.key === 'm' || e.key === 'M')
    alternarTrilha(); });
