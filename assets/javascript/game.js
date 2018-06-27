// variables
var words = ["mermaid", "narwhal", "sharks", "fish", "shipwreck", "water", "seaweed"];
var hiddenWord = "";
var numGuess = 15;
var guessed = [];
// var wins;


//set currentWord
var randomWord = words[Math.floor(Math.random() * words.length)];

//Replacing string characters with _
for (i = 0; i < randomWord.length; i++) {
    console.log(randomWord);
    hiddenWord += "_";
}
displayInfo(hiddenWord, numGuess);

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    var userGuess = event.key;

    //Check if userGuess exists in randomWord string
    var ug = randomWord.includes(userGuess);
    if (ug === true) {
        //may need to loop through this to see if userGuess exists multiple times
        //If userGuess exists replace _ with userGuess
        for (i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === userGuess) {
                hiddenWord = hiddenWord.substring(0, i) + userGuess + hiddenWord.substring(i + 1);
            }
        }
    } else {
        if (guessed.includes(userGuess)) {
            alert("You've already tried that one.");
        } else {
            numGuess--;
            guessed.push(userGuess);
        }
    }
    displayInfo(hiddenWord, numGuess);
}

//Functions
//Display function
function displayInfo(hiddenWord, numGuess) {
    //displaying hidden word
    var displayString = hiddenWord.split('').join(' ');
    document.querySelector("#currentWord").innerHTML = displayString;
    document.querySelector("#numGuesses").innerHTML = numGuess;
    document.querySelector("#guessed").innerHTML = guessed;
}