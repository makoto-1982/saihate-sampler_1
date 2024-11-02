// サウンドを事前ロード
const sounds = {
    'sound1': new Audio('sounds/sound1.mp3'),
    'sound2': new Audio('sounds/sound2.mp3'),
    'sound3': new Audio('sounds/sound3.mp3'),
    'sound4': new Audio('sounds/sound4.mp3'),
    'sound5': new Audio('sounds/sound5.mp3'),
    'sound6': new Audio('sounds/sound6.mp3'),
    'sound7': new Audio('sounds/sound7.mp3'),
    'sound8': new Audio('sounds/sound8.mp3')
};

// パッドとボタン要素を取得
const pads = document.querySelectorAll('.pad');
const stopButton = document.getElementById('stop-button');
const toggleSimultaneousButton = document.getElementById('toggle-simultaneous');
let isSimultaneous = true; // 同時発音の初期状態
let audioElements = []; // 再生中の音を管理するための配列

// キーとサウンドの対応
const keyToPadMap = {
    'q': 'sound1',
    'w': 'sound2',
    'e': 'sound3',
    'r': 'sound4',
    'a': 'sound5',
    's': 'sound6',
    'd': 'sound7',
    'f': 'sound8'
};

// 同時発音切り替えボタンのクリックイベント
toggleSimultaneousButton.addEventListener('click', () => {
    isSimultaneous = !isSimultaneous;
    toggleSimultaneousButton.textContent = `同時発音：${isSimultaneous ? 'ON' : 'OFF'}`;
    toggleSimultaneousButton.classList.toggle('on', isSimultaneous);
    toggleSimultaneousButton.classList.toggle('off', !isSimultaneous);
});

// パッドのクリックでサウンドを再生
pads.forEach(pad => {
    pad.addEventListener('click', () => {
        const soundId = pad.getAttribute('data-sound');
        playSound(soundId, pad);
    });
});

// キーボード入力でサウンドを再生
document.addEventListener('keydown', (event) => {
    const soundId = keyToPadMap[event.key.toLowerCase()];
    if (soundId) {
        const pad = document.querySelector(`.pad[data-sound="${soundId}"]`);
        playSound(soundId, pad);
    }
});

// サウンドを再生し、ビジュアルエフェクトを追加
function playSound(soundId, pad) {
    const audio = sounds[soundId];
    audio.currentTime = 0; // 再生位置をリセット

    if (!isSimultaneous) {
        // 同時発音がOFFの場合、他の音を停止
        audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        audioElements = [];
    }

    audio.play();
    audioElements.push(audio);

    // パッドのビジュアルエフェクト
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 100);

    // 背景のフラッシュエフェクト
    flashBackground();
}

// 背景のフラッシュエフェクト
function flashBackground() {
    document.body.style.backgroundColor = '#333';
    setTimeout(() => {
        document.body.style.backgroundColor = '#111';
    }, 100);
}

// 停止ボタンのクリックで全サウンドを停止
stopButton.addEventListener('click', () => {
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    audioElements = [];

    // 停止ボタンのビジュアルエフェクト
    stopButton.classList.add('active');
    setTimeout(() => stopButton.classList.remove('active'), 100);
});
