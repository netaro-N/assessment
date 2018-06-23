(function () {//result = result.replace( /(<br>|<b>|<\/b>)/g, '');
    'use strict';
    const assessmentButton = document.getElementById('assessment');
    const radioBtnElements = document.getElementsByName('Nation');
    const feelElements = document.getElementById('feel');
    const wantBtnElements = document.getElementById('want');
    const userNameInput = document.getElementById('user-name');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
    * 指定した要素の子どもを全て削除する
    * @param {HTMLElement} element HTMLの要素
    */
   function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

    assessmentButton.onclick = () => {
        let userName = userNameInput.value;
        let radioElementValue = null;
        if(userName.length === 0){
            userName = 'ユーザー';
        }
        
        for (let i = 0; i < radioBtnElements.length; i++) {
            if (radioBtnElements[i].checked) {
                radioElementValue = radioBtnElements[i].value; 
            }
        }

        //ユーザーの値を作成
        let usersValue = Number(radioElementValue) + Number(feelElements.value) + Number(wantBtnElements.value) ;
        console.log('ユーザーの値は'+usersValue+'です');
        
        //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerHTML = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        let result = assessment(usersValue,userName);
        paragraph.innerHTML = result;
        resultDivided.appendChild(paragraph);

        //ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたへのおすすめ作家')
        + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href' , hrefValue);
        anchor.className = 'twitter-hashtag-button';
        result = result.replace(/<br>/g, '\n');
        result = result.replace( /(<b>|<\/b>)/g, '');
        anchor.setAttribute('data-text',result);
        anchor.innerHTML = 'Tweet #あなたへのおすすめ作家';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    };

    const japanAnswers = [
        '{userName}さんにおすすめの作家は<br><b>曲亭馬琴</b>です。<br>「南総里見八犬伝」<br>で奇想天外な物語に挑戦してください。',
        '{userName}さんにおすすめの作家は<br><b>三島由紀夫</b>です。<br>「美しい星」<br>で珍しいSF物語を体験できるでしょう。',
        '{userName}さんにおすすめの作家は<br><b>宮沢賢治</b>です。<br>「春と修羅」<br>の力強い詩で元気を出しましょう。',
        '{userName}さんにおすすめの作家は<br><b>紫式部</b>です。<br>「源氏物語」<br>で文学史に燦然と輝く古典に挑みましょう。',
        '{userName}さんにおすすめの作家は<br><b>谷崎潤一郎</b>です。<br>「春琴抄」<br>で耽美な谷崎ワールドを味わいましょう。',
        '{userName}さんにおすすめの作家は<br><b>川端康成</b>です。<br>「眠れる美女」<br>のデカダンスは療養に良いかもしれません。',
        '{userName}さんにおすすめの作家は<br><b>江戸川乱歩</b>です。<br>「幽霊塔」<br>はあの宮崎駿さんも影響を受けました。',
        '{userName}さんにおすすめの作家は<br><b>大江健三郎</b>です。<br>「万延元年のフットボール」<br>で時空を超えた文学体験をしましょう。',
        '{userName}さんにおすすめの作家は<br><b>司馬遼太郎</b>です。<br>「燃えよ剣」<br>を読んで、心から元気になりましょう。'
    ];
    const foreignAnswers = [
        '{userName}さんにおすすめの作家は<br><b>チャールズ・ディケンズ</b>です。<br>「デイヴィッド・コパフィールド」<br>に挑んで、生きていく精神力を養いましょう。',
        '{userName}さんにおすすめの作家は<br><b>トルストイ</b>です。<br>「戦争と平和」<br>の一大長編に挑めば情熱が奮い立つでしょう。',
        '{userName}さんにおすすめの作家は<br><b>ジュール・ヴェルヌ</b>です。<br>「十五少年漂流記」<br>を読めば、幼き頃のあの興奮が蘇るでしょう。',
        '{userName}さんにおすすめの作家は<br><b>ブロンテ姉妹</b>です。<br>「ジェーンエア」と「嵐が丘」<br>を読んで多様な恋心に触れましょう。',
        '{userName}さんにおすすめの作家は<br><b>フランソワーズ・サガン</b>です。<br>「悲しみよこんにちは」<br>でフランス独特の恋愛を愉しみましょう。',
        '{userName}さんにおすすめの作家は<br><b>プルースト</b>です。<br>「失われた時を求めて」<br>を読んで記憶の芸術に浸ってみましょう。',
        '{userName}さんにおすすめの作家は<br><b>シェイクスピア</b>です。<br>「ハムレット」<br>をあなたはどう演出するのか愉しみです。',
        '{userName}さんにおすすめの作家は<br><b>アレクサンドル・デュマ</b>です。<br>「モンテクリスト伯」<br>はエンタメの全てを兼ね備えているでしょう。',
        '{userName}さんにおすすめの作家は<br><b>コナンドイル</b>です。<br>「シャーロックホームズ」シリーズ<br>の名作たちを寝床で読むのは最高です。'
    ];
    /**
     * 選択した値（usersValue）を渡すと、診断結果を返す関数
     * @param {number} usersValue ユーザーの選択した値
     * @return {string} 診断結果
     */
    let result = null;
    function assessment(usersValue, userName) {
        //海外の処理
        if (usersValue >= 200) {
            usersValue = usersValue - 200;
             result = foreignAnswers[usersValue];
            //日本の処理
        } else {
            usersValue = usersValue - 100;
             result = japanAnswers[usersValue];
        };
        result = result.replace(/\{userName}/g, userName);
        return result;
    };


})();
