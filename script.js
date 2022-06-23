var playerCard1 = "";
var playerCard2 = "";
var computerCard1 = "";
var computerCard2 = "";

var main = function (input) {
  var cardDeck = makeDeck();
  var shuffledDeck = shufflecardDeck(cardDeck);
  // var gameState = drawCards;
  // //can consider an option to "cut" the deck (to replicate actual game, otherwise inconsequential)
  // //if game state = xx, deal the cards -> which is each player/dealer draws 2 cards
  // while ((gameState = drawCards)) {
  //   playerCard1 = shuffledDeck.pop();
  //   computerCard1 = shuffledDeck.pop();
  //   playerCard2 = shuffledDeck.pop();
  //   computerCard1 = shuffledDeck.pop();
  //   gameState = checkForBlackjack;
  // }
  //do we want to simulate the way cards are dealt?
  //show the 2 cards
  //check for any Blackjacks (immediate win unless draw)
  //if no Blackjacks, player is prompted to 'hit' or 'stand'
  //player can keep 'hitting' until ready or 'stand' or if hand exceeds 21, immediately show both player/dealer hands -> can only draw or lose
  //computer will automatically 'hit' or 'stand' -> logic could be computer only 'stands' when hands is 18 and above
  //when both 'stand', reveal cards and decide winner.
};

function makeDeck() {
  var cardDeck = []; //create 4 suits
  var suits = ["diamonds", "clubs", "hearts", "spades"];
  for (suitsIndex = 0; suitsIndex < suits.length; suitsIndex += 1) {
    var currentSuit = suits[suitsIndex];
    console.log(`current suit: ${currentSuit}`);
    //loop through each suit & within each suit, loop through each rank
    //for ranks == 1, 11, 12, 13 -> allocate different name from their rank
    for (var currentRank = 1; currentRank <= 13; currentRank += 1) {
      var currentName = currentRank;
      console.log(`current rank: ${currentRank}`);
      if (currentRank == 1) {
        currentName = "ace";
      } else if (currentRank == 11) {
        currentName = "jack";
        currentRank = 10;
      } else if (currentRank == 12) {
        currentName = "queen";
        currentRank = 10;
      } else if (currentRank == 13) {
        currentName = "king";
        currentRank = 10;
      }
      var card = { rank: currentRank, suit: currentSuit, name: currentName };
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
