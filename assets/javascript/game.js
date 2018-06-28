// variables
var words = ["mermaid", "buccaneer", "scurvy", "captain", "shipwreck", "parrot", "kraken", "skull", "pegleg", "booty", "blunderbuss", "compass", "landlubber", "cutlass"];
var hiddenWord = "";
var numGuess = 15;
var guessed = [];
var wins = 0;
var randomWord = "";

initializeGameData();

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    var userGuess = event.key;

    //Check if userGuess exists in randomWord string
    var ug = randomWord.includes(userGuess);
    if (ug === true) {
        //If userGuess exists replace _ with userGuess
        for (i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === userGuess) {
                hiddenWord = hiddenWord.substring(0, i) + userGuess + hiddenWord.substring(i + 1);
            }
        }
    } else {
        //Prevent user from inputting same guess multiple times
        if (guessed.includes(userGuess)) {
            alert("You've already tried that one.");
        } else {
            //decrement gues counter and store user input
            numGuess--;
            guessed.push(userGuess);
        }
    }
    displayInfo(hiddenWord, numGuess, guessed);
    checkWinConditions();
}

//Functions
//Display function
function displayInfo(hiddenWord, numGuess, guessed) {
    //displaying hidden word
    var displayString = hiddenWord.split('').join(' ');
    document.querySelector("#currentWord").innerHTML = displayString;
    document.querySelector("#numGuesses").innerHTML = numGuess;
    document.querySelector("#guessed").innerHTML = guessed;
    document.querySelector("#wins").innerHTML = wins;
}

function initializeGameData() {
    //set currentWord
    randomWord = words[Math.floor(Math.random() * words.length)];

    //Replacing string characters with _
    for (i = 0; i < randomWord.length; i++) {
        console.log(randomWord);
        hiddenWord += "_";
    }

    displayInfo(hiddenWord, numGuess, guessed);
}

function checkWinConditions() {
    if (hiddenWord === randomWord) {
        wins++;
        var audio = document.getElementById("soundClip");
        audio.play();
        alert("You win!");
        reset();
    } else if (numGuess <= 0) {
        alert("You lose.");
        reset();
    }
}

function reset() {
    //rest the user guesses array to empty
    guessed = [];
    //reset guess count
    numGuess = 15;
    //reset hidden word
    hiddenWord = "";
    initializeGameData()
}