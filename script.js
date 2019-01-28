// select all the cards 
// create an event for each of them 

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if (this === firstCard) return;
    // toggle means if the element is there, remove it and its not, added
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // first click (first card flip)
        hasFlippedCard = true;
        firstCard = this;
        /*console.log({hasFlippedCard, firstCard});*/
    } else {
        // second click (second card flip)
        hasFlippedCard = false;
        secondCard = this;
        /*console.log({hasFlippedCard, secondCard})*/

        checkifmatch();
    }
}

function checkifmatch() {

    //do cards match?
    /*console.log(firstCard.dataset.framework); //display the if the two cards are really clicked using data-framework
    console.log(secondCard.dataset.framework);*/

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    // Conditional ternary opertator
    // the ? means if and the : means else 
    isMatch ? disablecards() : reflip();

    //normmal if condition
    /* if (isMatch) {
        // if they match remove the flipcard effect and make it unclickable
        disablecards();
    } else {
        // if they dont match, make it flip and go to another a card
        // create a timeout to see the cards for a few seconds
        reflip();
    }*/
}

    function disablecards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function reflip() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard(){
        [hasFlippedCard,lockBoard] = [false, false];
        [firstCard,secondCard] = [null, null];
        
    }

    // add braket to make it immediatly invoked funcation expresssion
    // it means it will be executed right after it's definetion
    (function shuffle(){
        cards.forEach( card => {
            // to assign each card a  random number between 1 to 12 
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();


    cards.forEach(card => card.addEventListener('click', flipCard))