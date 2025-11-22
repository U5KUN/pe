var newsJson = async function () {
    try {
        const response = await fetch("https://raw.githubusercontent.com/u5kun/pe/main/news/news.json", {
            method: "GET"
        });

        return await response.json();
    } catch (e) {
        // エラー時はローカルファイルを試す
        try {
            const response = await fetch("news.json");
            return await response.json();
        } catch (e2) {
            console.error("ニュースの読み込みに失敗しました:", e2);
            return [];
        }
    }
}

// ニュースを表示する関数
async function displayNews() {
    var newsData = await newsJson();
    var newsList = document.querySelector("#newsList ul");

    if (!newsList) {
        return;
    }

    // リストをクリア
    newsList.innerHTML = "";

    // 日付で降順ソート（新しいものが上）
    newsData.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    // 各ニュースアイテムを表示
    for (var i = 0; i < newsData.length; i++) {
        var news = newsData[i];
        var elem = document.createElement("li");

        // タイプに応じたラベル
        var tags = {
            "new": '<span class="newsTag new">変更</span>',
            "fix": '<span class="newsTag fix">修正</span>'
        };
        var tagLabel = "";
        if (news.tags) {
            for (var j = 0; j < news.tags.length; j++) {
                tagLabel += tags[news.tags[j]];
            }
        }

        var osTags = {
            "iOS/iPadOS": '<img src="../img/a.svg">',
            "Android": '<img src="../img/g.svg">'
        };

        var osLabel
        if (news.system.includes("client")) {
            for (var j = 0; j < news.os.length; j++) {
                osLabel += osTags[news.os[j]];
            }
        }

        // 日付を日本語形式に変換
        var date = new Date(news.date);
        var formattedDate = date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // リンクの処理
        var linkContent = "";
        if (news.linktype === "url" && news.url) {
            linkContent = '<a href="' + news.url + '">' + news.title + '</a>';
        } else {
            linkContent = '<a>' + news.title + '</a>';
        }

        // HTMLを作成
        elem.innerHTML = '<div class="news-item">' +
            '<div class="news-header">' +
            tagLabel + osLabel
            '<span class="news-date">' + formattedDate + '</span>' +
            '</div>' +
            '<div class="news-title">' + linkContent + '</div>' +
            '</div>';

        newsList.appendChild(elem);
    }
}

// ページ読み込み時にニュースを表示
displayNews();