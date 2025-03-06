const os = document.getElementById("os");
const selectOS = document.getElementById("selectOS");
const usa = navigator.userAgent;
const ios = parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(usa) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', ''));
const detectedOS = detectOS();
function detectOS() {
    var ua = usa.toLowerCase();
    let OS;
    if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
        OS = "iOS/iPadOS";
    } else if (ua.indexOf("mac os x") !== -1) {
        OS = "macOS";
    } else if (ua.indexOf("windows nt") !== -1) {
        OS = "Windows";
    } else if (ua.indexOf("android") !== -1) {
        OS = "Android";
    } else {
        OS = "不明";
    }
    return OS;
}
function showContent(OS) {
    document.querySelectorAll("main section.hidden").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(OS).style.display = "block";
    selectOS.value = OS;
}
if (ios && ios <= 17.0) { document.getElementById("ts").style.display = "block"; }
os.innerText = detectedOS;
showContent(detectedOS);

// セレクトボックスの変更イベントを監視
selectOS.addEventListener('change', (e) => {
    showContent(e.target.value);
});

document.querySelectorAll(".copy button").forEach((button) => {
    button.addEventListener('click', (e) => {
        // 親要素からテキストエリアを取得
        const textArea = e.target.closest('.copy').querySelector('textarea');
        // テキストエリアの内容をクリップボードにコピー
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                // コピー成功時の処理（オプション）
                button.textContent = 'I';
                setTimeout(() => {
                    button.textContent = 'L';
                }, 2000);
            })
            .catch(err => {
                console.error('コピーに失敗しました:', err);
                button.textContent = 'A';
                setTimeout(() => {
                    button.textContent = 'L';
                }, 2000);
            });
    });
});