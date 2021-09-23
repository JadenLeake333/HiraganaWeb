const hiragana = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","ら","り","る","れ","ろ","わ","を","ん"]

const extendedHiragana = ["が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ","や","ゆ","よ","きゃ","きゅ","きょ","しゃ","しゅ","しょ","ちゃ","ちゅ","ちょ","にゃ","にゅ","にょ","ひゃ","ひゅ","ひょ","みゃ","みゅ","みょ","りゃ","りゅ","りょ","ぎゃ","ぎゅ","ぎょ","じゃ","じゅ","じょ","びゃ","びゅ","びょ","ぴゃ","ぴゅ","ぴょ"]

const katakana = ["ア","イ","ウ","エ","オ","ハ","ヒ","フ","ヘ","ホ","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ","カ","キ","ク","ケ","コ","ガ","ギ","グ","ゲ","ゴ","タ","チ","ツ","テ","ト","ダ","ヂ","ヅ","デ","ド","サ","シ","ス","セ","ソ","ザ","ジ","ズ","ゼ","ゾ","ナ","ニ","ヌ","ネ","ノ","マ","ミ","ム","メ","モ","ラ","リ","ル","レ","ロ","ワ","ヰ","ヲ","ヤ","ユ","ヨ","ン","ヷ","ヸ","ヴ","ヹ","ヺ"]

const romanji = ["a","i","u","e","o","ka","ki","ku","ke","ko","sa","shi","su","se","so","ta","chi","tsu","te","to","na","ni","nu","ne","no","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ra","ri","ru","re","ro","wa","wo","n"]

const extendedRomanji = ["ga","gi","gu","ge","go","za","ji","zu","ze","zo","da","ji","zu","de","do","ba","bi","bu","be","bo","pa","pi","pu","pe","po","ya","yu","yo","kya","kyu","kyo","sha","shu","sho","cha","chu","cho","nya","nyu","nyo","hya","hyu","hyo","mya","myu","myo","rya","ryu","ryo","gya","gyu","gyo","ja","ju","jo","bya","byu","byo","pya","pyu","pyo"]

const romanjiKatakana = ["a","i","u","e","o","ha","hi","hu","he","ho","ba","bi","bu","be","bo","pa","pi","pu","pe","po","ka","ki","ku","ke","ko","ga","gi","gu","ge","go","ta","chi","tsu","te","to","da","di","du","de","do","sa","shi","su","se","so","za","zi","zu","ze","zo","na","ni","nu","ne","no","ma","mi","mu","me","mo","ra","ri","ru","re","ro","wa","wi","wo","ya","yu","yo","n","va","vi","vu","ve","vo"]


var questionString = ""
var answerString = ""

let total = 0
let streak = 0

const getCombination = () =>{

    const lists = checkInputs()

    clearInputs()

    answerString = ""
    questionString = ""
    document.getElementById("check").removeAttribute("disabled");

    let combination = document.getElementById('combinations').value

    characterList = lists[0]
    romanjiList = lists[1]

    let stringLen = Math.floor(Math.random() * combination)

    for (var i = 0; i <= stringLen; i++)
    {
        var index = Math.floor(Math.random() * (characterList.length - 1))
        questionString += characterList[index]
        answerString += romanjiList[index]
    }
    
    document.getElementById("word").innerHTML = questionString;
}

const checkAnswer = () =>{

    let attemptedAnswer = document.getElementById("answer").value

    // Keep count of total answered for % correct
    total += 1

    //If Correct
    if (attemptedAnswer.toLowerCase() === answerString.toLowerCase())
    {
        document.getElementById("correct-answer").innerHTML = "Correct!"
        document.getElementById("number-correct").innerHTML = parseInt(document.getElementById("number-correct").innerHTML) + 1
        document.getElementById("correct-answer").style.color = "green"
        document.getElementById("streak").innerHTML = parseInt(document.getElementById("streak").innerHTML) + 1
        streak += 1
        
    }else{
        //Put correct answer on page when incorrect
        document.getElementById("number-incorrect").innerHTML = parseInt(document.getElementById("number-incorrect").innerHTML) + 1
        document.getElementById("correct-answer").innerHTML = answerString
        document.getElementById("correct-answer").style.color = "red"
        
        //Reset streak and remove it from text
        document.getElementById("streak").innerHTML = 0
        streak = 0
        document.getElementById("word").removeAttribute("streak");
        document.getElementById("percentage").removeAttribute("perfect");
    }

    //Update percentage correct
    document.getElementById("percentage").innerHTML = Math.floor((parseInt(document.getElementById("number-correct").innerHTML) / total)* 100) + "%"
    document.getElementById("check").setAttribute("disabled","");

    if (streak >= 5){
      ongoingStreak()
    }
}

const clearInputs = () =>{

    document.getElementById("answer").value = ""
    document.getElementById("correct-answer").innerHTML = ""

}

const checkInputs = () =>{
    // Use to initialize the lists going to be used during the game
    // Returns an array of arrays. [0] is the character list, [1] is the romaji list
    let basicCheckbox = document.getElementById('basic').checked
    let advancedCheckbox = document.getElementById('advanced').checked
    let katakanaCheckbox = document.getElementById('katakana').checked
    let characterList = [];
    let romanjiList = [];

    if (basicCheckbox)
    {
        characterList = characterList.concat(hiragana)
        romanjiList = romanjiList.concat(romanji)
    }
    if (advancedCheckbox)
    {
        characterList = characterList.concat(extendedHiragana)
        romanjiList = romanjiList.concat(extendedRomanji)
    }
    if (katakanaCheckbox)
    {
        characterList = characterList.concat(katakana)
        romanjiList = romanjiList.concat(romanjiKatakana)
    }
    if (!basic && !advanced && !katakanaCheckbox)
        return [hiragana, romanji]
   
    return [characterList, romanjiList]
}

const ongoingStreak = () =>{
  document.getElementById("word").setAttribute("streak","true")
}




