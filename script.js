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
['dk', 10],

]


function hitMe(X) {
    let randomCard = Math.floor(Math.random() * X.length);
    return X[randomCard];
}

let tableValue = 0;
let totalvalue = null;
button = document.getElementById('button')
value = $('#value')
button.addEventListener('click', (e => {
    tableValue =+ hitMe(Deck)[1]
    totalvalue += tableValue
    value.text(totalvalue)
    if (totalvalue > 21) {
        value.text(totalvalue).attr('style', 'color: lightgrey')
        $('#bust').text('BUST!').attr('style', 'color: red;')
        button.disabled = true
    }
    else {
        console.log(totalvalue);
    }
}))

