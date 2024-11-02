// パッド要素の取得
const pads = document.querySelectorAll('.pad');
let audioElements = [];

// キーとサウンドの対応
const keyToPadMap = {
    'q': 'sounds/sound1.mp3',
    'w': 'sounds/sound2.mp3',
    'e': 'sounds/sound3.mp3',
    'r': 'sounds/sound4.mp3',
    'a': 'sounds/sound5.mp3',
    's': 'sounds/sound6.mp3',
    'd': 'sounds/sound7.mp3',
    'f': 'sounds/sound8.mp3'
};

// パッドのクリックでサウンド再生
pads.forEach(pad => {
    pad.addEventListener('click', () => {
        playSound(pad.getAttribute('data-sound'), pad);
    });
});

// キーボード入力でサウンド再生
document.addEventListener('keydown', (event) => {
    const soundSrc = keyToPadMap[event.key.toLowerCase()];
    if (soundSrc) {
        const pad = document.querySelector(`.pad[data-sound="${soundSrc}"]`);
        playSound(soundSrc, pad);
    }
});

// サウンドを再生し、エフェクトを追加
function playSound(soundSrc, pad) {
    const audio = new Audio(soundSrc);
    audio.play();
    audioElements.push(audio);

    // ビジュアルエフェクト
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 100);

    // 背景効果
    flashBackground();
}

// 背景フラッシュ効果
function flashBackground() {
    document.body.style.backgroundColor = '#333';
    setTimeout(() => {
        document.body.style.backgroundColor = '#111';
    }, 100);
}

// 停止ボタン
document.getElementById('stop-button').addEventListener('click', () => {
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    audioElements = [];
    
    // 停止ボタンのビジュアルエフェクト
    const stopButton = document.getElementById('stop-button');
    stopButton.classList.add('active');
    setTimeout(() => stopButton.classList.remove('active'), 100);
});