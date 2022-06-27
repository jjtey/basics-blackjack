var playerCard = [];
var computerCard = [];
let dealButton = document.getElementById("submit-button");
let hitButton = document.getElementById("submit-buttonHit");
let standButton = document.getElementById("submit-buttonStand");
var playerScore = "";
var computerScore = "";
var cardDeck = [];
var shuffledDeck = [];
var gameState = "";
var winner = "";
var suits = ["♦️", "♣️", "♥️", "♠️"];
dealButton.style.display = "inline";
hitButton.style.display = "none";
standButton.style.display = "none";

var main = function (input) {
  cardDeck = makeDeck();
  shuffledDeck = shufflecardDeck(cardDeck);
  gameState = "drawCards";
  //if game state = xx, deal the cards -> which is each player/dealer draws 2 cards
  if (!playerScore) {
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
    return showCards(playerCard, computerCard);
  }
  console.log(playerCard[0].rank);
  console.log(playerCard[1].rank);
  console.log(playerScore);
  //check for any Blackjacks (immediate win unless draw)
  if ((gameState = "checkForBlackjack")) {
    if (playerScore == 21 && computerScore == 21) {
      gameState = "playerDraws";
      return (
        playerAndDealerHands +
        `<br><br>Both you and the dealer got a blackjack! <br><br><b>It's a draw! 🤔</b>`
      );
    } else if (playerScore == 21) {
      gameState = "playerWins";
      return (
        playerAndDealerHands +
        `<br><br>You got a blackjack!<br><br> <b>You win! 🎉🎉</b>`
      );
    } else if (computerScore == 21) {
      gameState = "playerLoses";
      return (
        playerAndDealerHands +
        `<br><br>The dealer got a blackjack! <br><br><br> <b>You lose! 💸</b>`
      );
    } else {
      gameState = "hitOrStand";
      dealButton.style.display = "none";
    }
    console.log(gameState);
  }
  console.log(gameState);
  if ((gameState = "compareAfterStanding") && !winner) {
    console.log(gameState);
    console.log(winner);
    return decideWinner(playerScore, computerScore);
  } else {
    return showCards(playerCard, computerCard);
  }
};
//if no Blackjacks, player is prompted to 'hit' or 'stand'
//player can keep 'hitting' until ready or 'stand' or if hand exceeds 21, immediately show both player/dealer hands -> can only draw or lose
//computer will automatically 'hit' or 'stand' -> logic could be computer only 'stands' when hands is 18 and above
//when both 'stand', reveal cards and decide winner.;

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

function showCards(playerCard, computerCard) {
  playerAndDealerHands = `You drew:`;
  console.log(playerCard);
  console.log(typeof playerCard);
  console.log(Object.keys(playerCard).length);
  var playerSize = playerCard.length;
  var computerSize = computerCard.length;
  console.log(playerSize);
  console.log(computerSize);
  for (i = 0; i < playerSize; i += 1) {
    playerAndDealerHands += `<br>${playerCard[i].name} ${playerCard[i].suit}`;
    console.log(playerAndDealerHands);
  }
  playerAndDealerHands += `<br><br>The Dealer drew:`;
  for (j = 0; j < computerSize; j += 1) {
    playerAndDealerHands += `<br>${computerCard[j].name} ${computerCard[j].suit}`;
  }
  return playerAndDealerHands;
}

function calculateScore(playerCard) {
  var playerScore = Object.keys(playerCard).reduce(function (previous, key) {
    return previous + playerCard[key].rank;
  }, 0);
  return playerScore;
}

function decideWinner(playerScore, computerScore) {
  if (
    (playerScore > computerScore && playerScore <= 21) ||
    (computerCard > 21 && playerScore <= 21)
  ) {
    gameState = "playerWins";
    winner =
      showCards(playerCard, computerCard) +
      `<br><br> <b>Your hand wins the dealer's! 🎉🎉 </b>`;
  } else if (
    playerScore == computerScore ||
    (playerScore > 21 && computerScore > 21)
  ) {
    gameState = "playerDraws";
    winner =
      showCards(playerCard, computerCard) +
      `<br><br> <b>You are tied with the dealer! 🤔</b>`;
  } else if (
    playerScore > 21 ||
    (computerScore > playerScore && computerScore <= 21)
  ) {
    gameState = "playerLoses";
    winner =
      showCards(playerCard, computerCard) + `<br><br> <b>You lose! 💸</b>`;
  }
}

function playerHit(playerCard, shuffledDeck) {
  playerCard.push(shuffledDeck.pop());
  playerScore = calculateScore(playerCard);
  if (playerScore > 21) {
    return `You busted! Press "Stand" to see if the Dealer busted or not! 🤞`;
  }
  return showCards(playerCard, computerCard);
}

function playerStand() {
  dealButton.style.display = "inline";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  gameState = "compareAfterStanding";
  if (computerCard < 18) {
    computerCard.push(shuffledDeck.pop());
    computerScore = calculateScore(computerCard);
  }
  return decideWinner(playerScore, computerScore);
}
