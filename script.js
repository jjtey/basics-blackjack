var playerCard = [];
var computerCard = [];
let dealButton = document.getElementById("submit-button");
let hitButton = document.getElementById("submit-buttonHit");
let standButton = document.getElementById("submit-buttonStand");
var playerScore = "";
var computerScore = "";

var main = function (input) {
  var cardDeck = makeDeck();
  var shuffledDeck = shufflecardDeck(cardDeck);
  var gameState = "drawCards";
  //if game state = xx, deal the cards -> which is each player/dealer draws 2 cards
  if ((gameState = "drawCards")) {
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
    console.log(showCards(playerCard, computerCard));
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
  if ((gameState = "hitOrStand")) {
    hitButton.addEventListener("click", function () {
      playerCard.push(shuffledDeck.pop());
      playerScore = calculateScore(playerCard);
      gameState = "hitOrStand";
      console.log(playerCard[2]);
      console.log(playerScore);
      console.log(gameState);
    });
    standButton.addEventListener("click", function () {
      dealButton.style.display = "inline";
      hitButton.style.display = "none";
      standButton.style.display = "none";
      gameState = "compareAfterStanding";
    });
  }
  console.log(gameState);
  if ((gameState = "compareAfterStanding")) {
    if (playerScore > computerScore) {
      gameState = "playerWins";
      return (
        showCards(playerCard, computerCard) +
        `<br><br> <b>Your hand wins the dealer's! 🎉🎉 </b>`
      );
    } else if (playerScore == computerScore) {
      gameState = "playerDraws";
      return (
        showCards(playerCard, computerCard) +
        `<br><br> <b>You are tied with the dealer! 🤔</b>`
      );
    } else {
      gameState = "playerLoses";
      return (
        showCards(playerCard, computerCard) + `<br><br> <b>You lose! 💸</b>`
      );
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
    playerAndDealerHands += `<br>${playerCard[i].rank} ${playerCard[i].suit}`;
    console.log(playerAndDealerHands);
  }
  playerAndDealerHands += `<br><br>The Dealer drew:`;
  for (j = 0; j < computerSize; j += 1) {
    playerAndDealerHands += `<br>${computerCard[j].rank} ${computerCard[j].suit}`;
  }
  return playerAndDealerHands;
}

function calculateScore(playerCard) {
  var playerScore = Object.keys(playerCard).reduce(function (previous, key) {
    return previous + playerCard[key].rank;
  }, 0);
  return playerScore;
}
