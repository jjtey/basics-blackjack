var playerCard = [];
var computerCard = [];
let dealButton = document.getElementById("submit-button");
let hitButton = document.getElementById("submit-buttonHit");
let standButton = document.getElementById("submit-buttonStand");
let resetButton = document.getElementById("submit-buttonReset");
var playerScore = "";
var computerScore = "";
var cardDeck = [];
var shuffledDeck = [];
var gameState = "";
var winner = "";
var suits = ["♦️", "♣️", "♥️", "♠️"];
var computerScoreFinal = "";
var computerCardFinal = [];
dealButton.style.display = "inline";
hitButton.style.display = "none";
standButton.style.display = "none";
resetButton.style.display = "none";

var main = function () {
  cardDeck = makeDeck();
  shuffledDeck = shufflecardDeck(cardDeck);
  gameState = "drawCards";
  //if game state = xx, deal the cards -> which is each player/dealer draws 2 cards
  dealCards(shuffledDeck, playerCard, computerCard);
  if (playerScore == 21 || computerScore == 21) {
    dealButton.style.display = "none";
    hitButton.style.display = "none";
    standButton.style.display = "none";
    resetButton.style.display = "inline";
    return checkBlackjack(playerScore, computerScore);
  }
  return showCards(playerCard, computerCard, playerScore, computerScore);
};

function makeDeck() {
  cardDeck = new Array();
  for (suitsIndex = 0; suitsIndex < suits.length; suitsIndex += 1) {
    //loop through each suit & within each suit, loop through each rank
    //for ranks == 1, 11, 12, 13 -> allocate different name from their rank
    for (var currentRank = 1; currentRank <= 13; currentRank += 1) {
      var currentName = currentRank;
      var currentValue = currentRank;
      if (currentRank == 1) {
        currentName = "Ace";
        currentValue = 11;
      } else if (currentRank == 11) {
        currentName = "Jack";
        currentValue = 10;
      } else if (currentRank == 12) {
        currentName = "Queen";
        currentValue = 10;
      } else if (currentRank == 13) {
        currentName = "King";
        currentValue = 10;
      }
      var card = {
        rank: currentValue,
        suit: suits[suitsIndex],
        name: currentName,
      };
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

function dealCards(shuffledDeck, playerCard, computerCard) {
  //assigns 2 cards to player/dealer and scores them
  dealButton.style.display = "none";
  hitButton.style.display = "inline";
  standButton.style.display = "inline";
  playerCard.push(shuffledDeck.pop());
  computerCard.push(shuffledDeck.pop());
  playerCard.push(shuffledDeck.pop());
  computerCard.push(shuffledDeck.pop());
  playerScore = calculateScore(playerCard);
  computerScore = calculateScore(computerCard);
  gameState = "checkForBlackjack";
}

function checkBlackjack(playerScore, computerScore) {
  //added immediate win condition
  if (playerScore == 21 && computerScore == 21) {
    gameState = "playerDraws";
    return (
      showCards(playerCard, computerCard, playerScore, computerScore) +
      `<br><br>Both you and the dealer got a blackjack! <br><br><b>It's a draw! 🤔</b>`
    );
  } else if (playerScore == 21) {
    gameState = "playerWins";
    return (
      showCards(playerCard, computerCard, playerScore, computerScore) +
      `<br><br>You got a blackjack!<br><br> <b>You win! 🎉🎉</b>`
    );
  } else if (computerScore == 21) {
    gameState = "playerLoses";
    return (
      showCards(playerCard, computerCard, playerScore, computerScore) +
      `<br><br>The dealer got a blackjack! <br><br><br> <b>You lose! 💸</b>`
    );
  } else {
    gameState = "hitOrStand";
    dealButton.style.display = "none";
  }
}

function showCards(playerCard, computerCard, playerScore, computerScore) {
  //function displays what is in each player/dealer's hand
  playerAndDealerHands = `You drew:`;
  var playerSize = playerCard.length;
  var computerSize = computerCard.length;
  for (i = 0; i < playerSize; i += 1) {
    playerAndDealerHands += `<br>${playerCard[i].name} ${playerCard[i].suit}`;
  }
  playerAndDealerHands += `<br>You have <u>${playerScore}</u> points!<br><br>The Dealer drew:`;
  for (j = 0; j < computerSize; j += 1) {
    playerAndDealerHands += `<br>${computerCard[j].name} ${computerCard[j].suit}`;
  }
  playerAndDealerHands += `<br>The Dealer has <u>${computerScore}</u> points!`;
  return playerAndDealerHands;
}

function calculateScore(playerCard) {
  //scores player/dealer's card, with logic for assigning score to "Ace"
  var playerScore = Object.keys(playerCard).reduce(function (previous, key) {
    return previous + playerCard[key].rank;
  }, 0);
  var noOfAces = Object.keys(playerCard).reduce(function (n, key) {
    return n + (playerCard[key].rank === 11);
  }, 0);
  if (noOfAces == 2 && playerCard.length == 2) {
    playerScore = 21;
  }
  while (playerScore > 21 && noOfAces > 0) {
    playerScore -= 10;
    if (playerScore <= 21) {
      break;
    }
    noOfAces -= 1;
  }
  return playerScore;
}

function playerHit(playerCard, shuffledDeck) {
  //adds card to player (when hit button is pressed)
  playerCard.push(shuffledDeck.pop());
  playerScore = calculateScore(playerCard);
  if (playerScore > 21) {
    hitButton.style.display = "none";
    return `You've busted! Press <b>"Stand"</b> to see if the Dealer busted or not! 🤞`;
  }
  return showCards(playerCard, computerCard, playerScore, computerScore);
}

function playerStand(computerCard, shuffledDeck, computerScore, playerScore) {
  //compares player/dealer scores when game is resolved (when stand button is pressed)
  dealButton.style.display = "none";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  resetButton.style.display = "inline";
  while (computerScore < 17) {
    computerCard.push(shuffledDeck.pop());
    computerScore = calculateScore(computerCard);
  }
  computerScoreFinal = computerScore;
  computerCardFinal = computerCard;
  return decideWinner(playerScore, this.computerScoreFinal);
}

function decideWinner(playerScore, computerScore) {
  //winning conditions for player/dealer
  if (
    (playerScore > computerScore && playerScore <= 21) ||
    (computerScore > 21 && playerScore <= 21)
  ) {
    gameState = "playerWins";
    return (winner =
      showCards(playerCard, computerCard, playerScore, computerScore) +
      `<br><br> <b>You win! 🎉🎉 </b>`);
  } else if (
    playerScore == computerScore ||
    (playerScore > 21 && computerScore > 21)
  ) {
    gameState = "playerDraws";
    return (winner =
      showCards(playerCard, computerCard, playerScore, computerScore) +
      `<br><br> <b>You are tied with the dealer! 🤔</b>`);
  } else if (
    (playerScore > 21 && computerScore <= 21) ||
    (computerScore > playerScore && computerScore <= 21)
  ) {
    gameState = "playerLoses";
    return (winner =
      showCards(playerCard, computerCard, playerScore, computerScore) +
      `<br><br> <b>You lose! 💸</b>`);
  }
}

function resetGame() {
  dealButton.style.display = "inline";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  resetButton.style.display = "none";
  playerCard = [];
  computerCard = [];
  return `Welcome to Blackjack! Click the <b>\"Deal\"</b> button to get started!`;
}
