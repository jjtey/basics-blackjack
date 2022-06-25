var playerCard1 = "";
var playerCard2 = "";
var computerCard1 = "";
var computerCard2 = "";
let dealButton = document.getElementById("submit-button");
let hitButton = document.getElementById("submit-buttonHit");
let standButton = document.getElementById("submit-buttonStand");

var main = function (input) {
  var cardDeck = makeDeck();
  var shuffledDeck = shufflecardDeck(cardDeck);
  var gameState = "drawCards";

  //can consider an option to "cut" the deck (to replicate actual game, otherwise inconsequential)
  //if game state = xx, deal the cards -> which is each player/dealer draws 2 cards
  if ((gameState = "drawCards")) {
    playerCard1 = shuffledDeck.pop();
    computerCard1 = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    computerCard2 = shuffledDeck.pop();
    gameState = "checkForBlackjack";
    showCards();
  }
  console.log(playerCard1.rank);
  console.log(playerCard2.rank);
  console.log(computerCard1.rank);
  console.log(computerCard2.rank);
  //check for any Blackjacks (immediate win unless draw)
  if ((gameState = "checkForBlackjack")) {
    if (
      playerCard1.rank + playerCard2.rank == 21 &&
      computerCard1.rank + computerCard2.rank == 21
    ) {
      gameState = "playerDraws";
      return (
        playerAndDealerHands +
        `Both you and the dealer got a blackjack! <br><br><b>It's a draw! 🤔</b>`
      );
    } else if (playerCard1.rank + playerCard2.rank == 21) {
      gameState = "playerWins";
      return (
        playerAndDealerHands +
        `You got a blackjack!<br><br> <b>You win! 🎉🎉</b>`
      );
    } else if (computerCard1.rank + computerCard2.rank == 21) {
      gameState = "playerLoses";
      return (
        playerAndDealerHands +
        `The dealer got a blackjack! <br><br> <b>You lose! 💸</b>`
      );
    } else {
      gameState = "hitOrStand";
    }
    // if ((gameState = "hitOrStand")) {
    // }

    gameState = "compareAfterStanding";
    if ((gameState = "compareAfterStanding")) {
      if (
        playerCard1.rank + playerCard2.rank >
        computerCard1.rank + computerCard2.rank
      ) {
        gameState = "playerWins";
        return (
          playerAndDealerHands +
          `<br><br> <b>Your hand wins the dealer's! 🎉🎉 </b>`
        );
      } else if (
        playerCard1.rank + playerCard2.rank ==
        computerCard1.rank + computerCard2.rank
      ) {
        gameState = "playerDraws";
        return (
          playerAndDealerHands +
          `<br><br> <b>You are tied with the dealer! 🤔</b>`
        );
      } else {
        gameState = "playerLoses";
        return playerAndDealerHands + `<br><br> <b>You lose! 💸</b>`;
      }
    }
  }
};

//if no Blackjacks, player is prompted to 'hit' or 'stand'
//player can keep 'hitting' until ready or 'stand' or if hand exceeds 21, immediately show both player/dealer hands -> can only draw or lose
//computer will automatically 'hit' or 'stand' -> logic could be computer only 'stands' when hands is 18 and above
//when both 'stand', reveal cards and decide winner.;

function makeDeck() {
  var cardDeck = []; //create 4 suits
  var suits = ["♦️", "♣️", "♥️", "♠️"];
  for (suitsIndex = 0; suitsIndex < suits.length; suitsIndex += 1) {
    var currentSuit = suits[suitsIndex];
    //loop through each suit & within each suit, loop through each rank
    //for ranks == 1, 11, 12, 13 -> allocate different name from their rank
    for (var currentRank = 1; currentRank <= 13; currentRank += 1) {
      var currentName = currentRank;
      var currentValue = currentRank;
      if (currentRank == 1) {
        currentName = "ace";
        currentValue = 11;
      } else if (currentRank == 11) {
        currentName = "jack";
        currentValue = 10;
      } else if (currentRank == 12) {
        currentName = "queen";
        currentValue = 10;
      } else if (currentRank == 13) {
        currentName = "king";
        currentValue = 10;
      }
      var card = { rank: currentValue, suit: currentSuit, name: currentName };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function shufflecardDeck(cardDeck) {
  //shuffles deck
  for (cardIndex = 0; cardIndex < cardDeck.length; cardIndex += 1) {
    var randomIndex = random(cardDeck.length);
    var currentCard = cardDeck[cardIndex];
    var randomCard = cardDeck[randomIndex];
    cardDeck[cardIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
}

function random(size) {
  //randomly picks from remaining cards
  return Math.floor(Math.random() * size);
}

function showCards() {
  return (playerAndDealerHands = `You drew ${playerCard1.rank} ${playerCard1.suit} & ${playerCard2.rank} ${playerCard2.suit}.<br>The dealer drew ${computerCard1.rank} ${computerCard1.suit} & ${computerCard2.rank} ${computerCard2.suit}.<br><br>`);
}
