const os = document.getElementById("os");
const selectOS = document.getElementById("selectOS");
const uap = new UAParser();
let detectedOS = uap.getOS();
if (detectedOS.name == "iOS" || detectedOS.name == "iPadOS" || uap.getDevice().model == "iPad" || (uap.getDevice().type == "tablet" && detectedOS.name == "macOS")) {
    detectedOS.name = "iOS/iPadOS";
}
function showContent(OS) {
    document.querySelectorAll("main section.hidden").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(OS).style.display = "block";
    selectOS.value = OS;
}
if (detectedOS.name == "iOS" && detectedOS.version <= 17.0) { document.getElementById("ts").style.display = "block"; }
os.innerText = detectedOS.name;
showContent(detectedOS.name);

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