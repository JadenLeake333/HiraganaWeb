const hiragana = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","ら","り","る","れ","ろ","わ","を","ん"]

const extendedHiragana = ["が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ","や","ゆ","よ","きゃ","きゅ","きょ","しゃ","しゅ","しょ","ちゃ","ちゅ","ちょ","にゃ","にゅ","にょ","ひゃ","ひゅ","ひょ","みゃ","みゅ","みょ","りゃ","りゅ","りょ","ぎゃ","ぎゅ","ぎょ","じゃ","じゅ","じょ","びゃ","びゅ","びょ","ぴゃ","ぴゅ","ぴょ"]

const romanji = ["a","i","u","e","o","ka","ki","ku","ke","ko","sa","shi","su","se","so","ta","chi","tsu","te","to","na","ni","nu","ne","no","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ra","ri","ru","re","ro","wa","wo","n"]

const extendedRomanji = ["ga","gi","gu","ge","go","za","ji","zu","ze","zo","da","ji","zu","de","do","ba","bi","bu","be","bo","pa","pi","pu","pe","po","ya","yu","yo","kya","kyu","kyo","sha","shu","sho","cha","chu","cho","nya","nyu","nyo","hya","hyu","hyo","mya","myu","myo","rya","ryu","ryo","gya","gyu","gyo","ja","ju","jo","bya","byu","byo","pya","pyu","pyo"]

var questionString = ""
var answerString = ""
let total = 0
let streak = 0

const getCombination = () =>{

    clearInputs()

    answerString = ""
    questionString = ""
    document.getElementById("check").removeAttribute("disabled");

    let combination = document.getElementById('combinations').value
    let stringLen = Math.floor(Math.random() * combination)

    for (var i = 0; i <= stringLen; i++)
    {
        var index = Math.floor(Math.random() * (hiragana.length - 1))
        questionString += hiragana[index]
        answerString += romanji[index]
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

const ongoingStreak = () =>{
  document.getElementById("word").setAttribute("streak","true")
}




