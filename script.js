console.clear()
//create HTML body in one line
$('#body')
    .append(
        $('<div>').attr('id', 'headerRow').attr('class', 'header-row')
            .append(
                $('<h1>').attr('style', 'text-align: center')
                    .text('21'))
            .append(
                $('<h3>').attr('style', 'text-align: center')
                    .text('money: ')
                    .append('<p>').attr('id', 'money')
            ))
    .append(
        $('<div>').attr('class', 'button-row')
            .append(
                $('<button>').attr('id', 'hit').text('Hit Me!')
            )
            .append(
                $('<button>').attr('id', 'hold').text('Hold')
            )
    )
    .append(
        $('<p>').attr('id', 'hitValue')
    )
    .append(
        $('<p>').attr('id', 'bust')
    )
    .append(
        $('<div>').attr('class', 'final-row')
            .append(
                $('<div>').attr('id', 'betDiv')
            )
            .append(
                $('<p>').attr('id', 'playerValue')
            )
            .append(
                $('<p>').attr('id', 'computerValue')
            )
            .append(
                $('<p>').attr('id', 'winLoose')
            )
            .append(
                $('<div>').attr('id', 'playAgain')
            )
    )


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


//tableValue = an assignment of the hitme() function that returns a random card value from the deck.
let tableValue = 0;
//totalvalue = the total value of each tableValue 'hit'.
let totalvalue = 0;
//computerValue = the value of the computer.
let computerValue = 0;

//money value
let money = 5000;
//bet value
let bet = 0;

//HTML elements for data.
hit = $('#hit')
hold = $('#hold')
value = $('#hitValue')
moneyValue = $('#money').text('$' + money)

function placeBet() {
    //disable buttons first
    $('#hit').prop('disabled', true);
    $('#hold').prop('disabled', true);
    //create bet box and bet button
    $('#betDiv').append(
        $('<input>').attr('type', 'number').attr('id', 'betBox')
            .attr('min', '100').attr('max', money).attr('step', '100')
            .attr('placeholder', '100').attr('value', '100')
    )
    $('#betDiv').append(
        $('<button>').attr('id', 'submitBet').text('bet')
    )
    //on submit of the bet, assign the bet value
    $('#submitBet').click(e => {
        bet = $('#betBox').val()
        console.log(bet)
        $('#hit').prop('disabled', false);
        $('#hold').prop('disabled', false);
        $('#submitBet').remove()
        $('#betBox').remove()
    })
}

placeBet()

//reset function
function RESET() {
    playAgain = $("#playAgain").append($("<button>").text("play again?").attr('id', 'playAgainButton'))
    $('#playAgainButton').click(e => {
        //play again resets all values IN PROGRESS
        $('#hitValue').text(' ');
        $('#playerValue').text(' ');
        $('#computerValue').text(' ');
        $('#winLoose').text(' ');
        $('#bust').text(' ');
        tableValue = 0;
        totalvalue = 0;
        computerValue = 0;
        $('#hit').prop('disabled', false);
        $('#hold').prop('disabled', false);
        $("#playAgainButton").remove()
        $('#submitBet').remove()
        $('#betBox').remove()
        placeBet()
    })
}


hit.click(e => {
    tableValue = + hitMe(Deck)[1]
    totalvalue += tableValue
    value.text(totalvalue)
    if (totalvalue > 21) {
        value.text(totalvalue)
        $('#bust').text('BUST!').attr('style', 'color: red;')
        $('#hit').prop('disabled', true);
        $('#hold').prop('disabled', true);
        money = money - bet
        moneyValue = $('#money').text(' ').text('$' + money)
        RESET();
    }
    else {
        console.log(totalvalue);
    }
})

hold.click(e => {
    //disable the buttons
    $('#hit').prop('disabled', true);
    $('#hold').prop('disabled', true);

    //creates a random value for the computer 
    computerValue = Math.floor(Math.random() * (21 - 15 + 1)) + 15

    //display on screen
    playerValue = $("#playerValue").text('final value: ' + totalvalue)
    dealerValue = $('#computerValue').text('house value: ' + computerValue)

    if (totalvalue > computerValue) {
        state = $('#winLoose').text('YOU WIN!').attr('style', 'color: green')
        money = (money + (bet * 2))
        moneyValue = $('#money').text(' ').text('$' + money)

    }
    if (totalvalue < computerValue) {
        state = $('#winLoose').text('YOU LOOSE!').attr('style', 'color: red')
        money = (money - bet)
        moneyValue = $('#money').text(' ').text('$' + money)

    }
    else if (totalvalue == computerValue) {
        state = $('#winLoose').text('TIE!').attr('style', 'color: black')
    }
    //generate play again button
    RESET();
})



