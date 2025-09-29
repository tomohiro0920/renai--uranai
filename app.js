// script.js

// 【重要】Googleフォームの送信先URLとフィールドIDを設定しました

// 1. 送信先URL (フォームの action 属性の値)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdvS8Q8dX5-zS_HtbDCiEtCZYXghxbbtUSnbpmvRC23FGqY3w/formResponse"; 

const FIELD_IDS = {
    // 2. 「あなたの名前」の項目ID (name="entry.472936702")
    YOUR_NAME: "entry.472936702", 
    
    // 3. 「好きな人の名前」の項目ID (name="entry.833997718")
    CRUSH_NAME: "entry.833997718", 
    
    // 診断結果のフィールドIDは不要なので、ここでは定義しません
};

// 診断結果のパターン (A, B, C, D)
const results = {
    A: {
        title: "✨A",
        detail: "多分一番いい"
    },
    B: {
        title: "😊 B",
        detail: "二番目にいい"
    },
    C: {
        title: "🤔 C",
        detail: "3番目にいい"
    },
    D: {
        title: "🚀 D",
        detail: "４番目にいい"
    }
};

// ----------------------------------------------------

function startDiagnosis() {
    // HTML側でこれらのIDを持つinputタグを用意してください
    const yourName = document.getElementById('yourName').value.trim();
    const crushName = document.getElementById('crushName').value.trim();

    // 入力チェック
    if (!yourName || !crushName) {
        alert("あなたの名前と好きな人の名前、両方を入力してください。");
        return;
    }

    // 1. ランダムで結果を決定 (A, B, C, Dの中からランダムに一つ選ぶ)
    const resultKeys = Object.keys(results);
    const randomIndex = Math.floor(Math.random() * resultKeys.length);
    const resultKey = resultKeys[randomIndex]; // 例: 'A'

    const finalResult = results[resultKey];

    // 2. 画面に結果を表示
    const resultHtml = `
        <h3 style="color: purple;">${finalResult.title}</h3>
        <p>${finalResult.detail}</p>
        <p style="margin-top: 20px;">診断に使われたお名前：<br>
        あなた：${yourName} / 好きな人：${crushName}</p>
    `;

    document.getElementById('final-result').innerHTML = resultHtml;
    document.getElementById('input-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'block';

    // 3. Googleフォームへデータを送信
    // 診断結果のフィールドは削除し、名前だけを送信します
    const dataToSend = {
        // 正しく置き換わったIDをキーとして使用
        [FIELD_IDS.YOUR_NAME]: yourName,
        [FIELD_IDS.CRUSH_NAME]: crushName,
    };
    sendToGoogleForm(dataToSend);
}


// Googleフォームへのデータ送信関数 (変更なし)
function sendToGoogleForm(data) {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    fetch(GOOGLE_FORM_URL , {
        method: 'POST',
        mode: 'no-cors', 
        body: formData
    })
    .then(() => {
        console.log("データ収集用のGoogleフォームに送信されました。");
    })
    .catch(error => {
        console.error("送信エラー:", error);
    });
}
