const params = new URLSearchParams(window.location.search);
const OSParam = params.get("os");
const osElement = document.getElementById("os");
const selectOS = document.getElementById("selectOS");

const uap = new UAParser();
let detectedOS = uap.getOS();
let device = uap.getDevice();
if (detectedOS.name == "iOS" || detectedOS.name == "iPadOS" || (device.type == "tablet" && (detectedOS.name == "macOS" || device.vendor == "Apple" || device.model == "iPad"))) {
    detectedOS.name = "iOS/iPadOS";
}

function showContent(OS) {
    document.querySelectorAll("main section.hidden").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(OS).style.display = "block";
    selectOS.value = OS;
}

osElement.innerText = detectedOS.name;

if(OSParam) {
    if (["iOS/iPadOS", "macOS", "Windows", "Android"].includes(OSParam)) {
        showContent(OSParam);
    } else {
        showContent(detectedOS.name);
    }
} else {
    showContent(detectedOS.name);
}

selectOS.addEventListener('change', (e) => {
    showContent(e.target.value);
});

document.querySelectorAll(".copy button").forEach((button) => {
    button.addEventListener('click', (e) => {
        const textArea = e.target.closest('.copy').querySelector('textarea');
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
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