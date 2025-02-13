const os = document.getElementById("os");
const selectOS = document.getElementById("selectOS");
const detectedOS = detectOS();
function detectOS() {
    var ua = window.navigator.userAgent.toLowerCase();
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
os.innerText = detectedOS;
showContent(detectedOS);

// セレクトボックスの変更イベントを監視
selectOS.addEventListener('change', (event) => {
    showContent(event.target.value);
});