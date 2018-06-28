// variables
var words = ["mermaid", "buccaneer", "scurvy", "captain", "shipwreck", "parrot", "kraken", "skull", "pegleg", "booty", "blunderbuss", "compass", "landlubber", "cutlass"];
var hiddenWord = "";
var numGuess = 15;
var guessed = [];
var wins = 0;
var randomWord = "";
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

initializeGameData();

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    var userGuess = event.key.toLowerCase();

        if (event.keyCode == 32) {
            reset();
        } else if (letters.indexOf(userGuess) > -1) {
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
                    //decrement guess counter and store user input
                    numGuess--;
                    guessed.push(userGuess);
                }
            }
            displayInfo(hiddenWord, numGuess, guessed);
            checkWinConditions();
        }
    }

//Functions
//Display function
function displayInfo(hiddenWord, numGuess, guessed) {
    //displaying hidden wordwith spaces between underscores
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
        document.getElementById("winFlag").style.display = "block";
    } else if (numGuess <= 0) {
        document.getElementById("lostFlag").style.display = "block";
    }
}

function reset() {
    //rest the user guesses array to empty
    guessed = [];
    //reset guess count
    numGuess = 15;
    //reset hidden word
    hiddenWord = "";
    //hide win or lose flags
    document.getElementById("winFlag").style.display = "none";
    document.getElementById("lostFlag").style.display = "none";
    initializeGameData()
}