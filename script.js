console.clear()
//create HTML body in one line
$('#body')
    .append(
        $('<div>').attr('id', 'headerRow').attr('class', 'header-row')
            .append(
                $('<h1>').attr('style', 'text-align: center')
                    .text(''))
            .append(
                $('<h3>').attr('style', 'text-align: center')
                    .text('money: ')
                    .append('<p>').attr('id', 'money')
            ))
    .append(
        $('<div>').attr('class', 'button-row')
            
            .append(
                $('<div>').attr('class', 'row d-flex justify-content-center')
                .append(
                    $('<button>').attr('id', 'hit').text('Hit Me!').attr('class', 'btn btn-primary col-5 d-flex justify-content-center rounded-5 p-5 m-1')
                    )
                .append(
                    $('<button>').attr('id', 'hold').text('stand').attr('class', 'col-5 btn btn-success d-flex justify-content-center rounded-5 p-5 m-1')
                    )
                    .append(
                        $('<div>').attr('id', 'betDiv').attr('class', 'col-12 d-flex justify-content-center')
                        )
        )
            
    )
    .append(
        $('<p>').attr('id', 'hitValue')
    )
    .append(
        $('<div>').attr('id', 'cardRow')
    )
    .append(
        $('<p>').attr('id', 'bust')
    )
    .append(
        $('<div>').attr('class', 'final-row')
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

cash =  new Audio('sounds/cash.wav')
hitFx  =  new Audio('sounds/hit.wav')
loss =  new Audio('sounds/loss.wav')

function placeBet() {
    //disable buttons first
    $('#hit').prop('disabled', true);
    $('#hold').prop('disabled', true);
    //create bet box and bet button
    $('#betDiv').append(
        $('<input>').attr('type', 'number').attr('id', 'betBox')
            .attr('min', '100').attr('max', money).attr('step', '100')
            .attr('placeholder', '100').attr('value', '100').attr('class', 'rounded-2 input-lg mt-5 mb-5')
    )
    $('#betDiv').append(
        $('<button>').attr('id', 'submitBet').text('bet').attr('class', 'btn btn-success mt-5 mb-5')
    )
    //on submit of the bet, assign the bet value
    $('#submitBet').click(e => {
        bet = $('#betBox').val()
        console.log(bet)
        $('#hit').prop('disabled', false);
        $('#hold').prop('disabled', false);
        $('#submitBet').remove()
        $('#betBox').remove()
        $('#hit').click().click()
    })
}

placeBet()

//reset function
function RESET() {
    playAgain = $("#playAgain").append($("<button>").text("play again?").attr('id', 'playAgainButton').attr('class', 'btn btn-primary rounded-5'))
    $('#playAgainButton').click(e => {
        //play again resets all values IN PROGRESS
        $('#body').attr('style', 'rgb(235, 198, 163)')
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
        $('.card').remove()
        placeBet()
    })
}


hit.click(e => {
    let hitValue = hitMe(Deck)[1]
    tableValue =+ hitValue
    totalvalue += tableValue
    value.text(totalvalue)
    hitFx.play()
    if (totalvalue > 21) {
        value.text(totalvalue)
        $('#bust').text('BUST!').attr('style', 'color: white;').attr('class', 'display-5')
        loss.play()
        $('#body').attr('style', 'background-color: rgb(238, 96, 96)').attr('class', 'justify-content-center')
        $('#hit').prop('disabled', true);
        $('#hold').prop('disabled', true);
        money = money - bet
        moneyValue = $('#money').text(' ').text('$' + money)
        RESET();
    }
    else {
        console.log(totalvalue);
    }
    getCardRow = $('#cardRow')
    getCard = $('<div>').attr('class', 'card')
    cardText1 = $('<p>').attr('class', 'card-text').text(hitValue)
    cardText2 = $('<p>').attr('class', 'card-text-2').text(hitValue)
    getCard.append(cardText1)
    getCard.append(cardText2)
    getCardRow.append(getCard)
})

hold.click(e => {
    //disable the buttons
    $('#hit').prop('disabled', true);
    $('#hold').prop('disabled', true);

    //creates a random value for the computer 
    computerValue = Math.floor(Math.random() * (21 - 16 + 1)) + 16

    //display on screen
    playerValue = $("#playerValue").text('Player: ' + totalvalue)
    dealerValue = $('#computerValue').text('house: ' + computerValue)

    if (totalvalue > computerValue) {
        state = $('#winLoose').text('YOU WIN!').attr('style', 'color: green')
        .attr('class', 'display-5 justify-content-center')
        cash.play()
        money = (money + (bet * 2))
        moneyValue = $('#money').text(' ').text('$' + money)
        $('#body').attr('style', 'background-color: rgb(167, 231, 161)')

    }
    if (totalvalue < computerValue) {
        state = $('#winLoose').text('YOU LOOSE!').attr('style', 'color: white')
        .attr('class', 'display-5 justify-content-center')
        loss.play()
        money = (money - bet)
        moneyValue = $('#money').text(' ').text('$' + money)
        $('#body').attr('style', 'background-color: rgb(238, 96, 96)')

    }
    else if (totalvalue == computerValue) {
        state = $('#winLoose').text('TIE!').attr('style', 'color: black')
        .attr('class', 'display-5 justify-content-center')
    }
    $('.final-row').attr('class', 'display-5 d justify-content-center')
    //generate play again button
    RESET();
})





