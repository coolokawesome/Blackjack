console.clear()

//deck
Deck = [
    ['d1', 1],
    ['d2', 2],
    ['d3', 3],
    ['d4', 4],
    ['d5', 5],
    ['d6', 6],
    ['d7', 7],
    ['d8', 8],
    ['d9', 9],
    ['d10', 10],
    ['dj', 10],
    ['dq', 10],
    ['dk', 10],]

//hitMe pulls a random card from an associative array 
function hitMe(X) {
    let randomCard = Math.floor(Math.random() * X.length);
    return X[randomCard];
}


//play again resets all values IN PROGRESS
function playAgain() {
    $('#playerValue').text('');
    $('#computerValue').text('');
    $('#winLoose').text('');

}


//tableValue = an assignment of the hitme() function that returns a random card value from the deck.
let tableValue = 0;
//totalvalue = the total value of each tableValue 'hit'.
let totalvalue = 0;
//computerValue = the value of the computer.
let computerValue = 0;

button = document.getElementById('button')
hold = document.getElementById('hold')

//get the <p> id=value.
value = $('#value')



button.addEventListener('click', (e => {
    tableValue = + hitMe(Deck)[1]
    totalvalue += tableValue
    value.text(totalvalue)
    if (totalvalue > 21) {
        value.text(totalvalue).attr('style', 'color: lightgrey')
        $('#bust').text('BUST!').attr('style', 'color: red;')
        button.disabled = true
        hold.disabled = true
    }
    else {
        console.log(totalvalue);
    }
}))

hold.addEventListener('click', (e => {
    //disable the buttons
    button.disabled = true;
    hold.disabled = true;
    //sets the final value of the player

    //creates a random value for the computer 
    computerValue = Math.floor(Math.random() * (21 - 15 + 1)) + 15

    //display on screen
    playerValue = $("#playerValue")
    playerValue.text('final value: ' + totalvalue)
    console.log('final player value', totalvalue)

    dealerValue = $('#computerValue')
    dealerValue.text('house value: ' + computerValue)
    console.log('final computer value', computerValue)

    if (totalvalue > computerValue) {
        state = $('#winLoose').text('YOU WIN!').attr('style', 'color: green')
    }
    if (totalvalue < computerValue) {
        state = $('#winLoose').text('YOU LOOSE!').attr('style', 'color: red')
    }
    else if (totalvalue == computerValue) {
        state = $('#winLoose').text('TIE. TRY AGAIN!').attr('style', 'color: black')
    }
    playAgain = $("#playAgain").append($("<button>").text("play again?").attr('id', 'playAgainButton'))

    $('#playAgainButton').click(e => {
        console.log('play again')
        let tableValue = 0;
        //totalvalue = the total value of each tableValue 'hit'.
        let totalvalue = 0;
        //computerValue = the value of the computer.
        let computerValue = 0;
        button.disabled = false;
        hold.disabled = false;

    })
}))

