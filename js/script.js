const inputs=document.querySelector(".inputs"),
resetbtn=document.querySelector(".reset-btn"),
hint=document.querySelector(".hint span"),
guessletter=document.querySelector(".guess-left span"),
wrongletter=document.querySelector(".wrong-letter span"),
typinginput=document.querySelector(".typing-input");


let word,maxguesses,corrects=[],incorrects=[];
function randomWord(){
    //get random object from wordlist
    let ranObj=wordList[Math.floor(Math.random() * wordList.length)];
    word=ranObj.word; //get word of random object
    maxguesses=8;corrects=[];incorrects=[];
    console.log(word);
    hint.innerText=ranObj.hint;
    guessletter.innerText=maxguesses;
    wrongletter.innerText=incorrects;
    let html="";
    for (let i = 0; i < word.length; i++) {
        html+='<input type="text" disabled>';
    }
    inputs.innerHTML=html;
}
randomWord();

function initGame(e){
    let key=e.target.value;
    //to get only alphabets
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
    && !corrects.includes(key)){
        console.log(key);
        if(word.includes(key)){
            // if user letter found in word
            //console.log("letter found");
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in input value
                if(word[i]===key){
                    alert("correct letter");
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value=key;
                }
                
            }
        }
        else{
            //console.log("letter not found");
            maxguesses--;
            alert("incorrect letter");
            incorrects.push(` ${key}` );
        }
        guessletter.innerText=maxguesses;
        wrongletter.innerText=incorrects;
    }
    typinginput.value="";
    setTimeout(() => {
        if(corrects.length===word.length){
            //if user found all letters
            alert(`congrats! you found the word ${word.toUpperCase()}`);
            randomWord(); //calling againg to reset game
        }
        else if(maxguesses<1){
            //if user could not guess all letters
            alert("game over!");
            for (let i = 0; i < word.length; i++) {
                //showing all letters in input
                inputs.querySelectorAll("input")[i].value=word[i];
            }
        }
    })
    

}

resetbtn.addEventListener("click",randomWord);
typinginput.addEventListener("input",initGame);
document.addEventListener("keydown",() => typinginput.focus());