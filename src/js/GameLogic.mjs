import { Deck } from "./Deck.mjs";
import { Card } from "./Card.mjs";

export class Game {
  constructor() {
    this.deck = new Deck();
    this.playerHand = [];
    this.dealerHand = [];
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gameActive = false;
    this.playerTurn = true;
  }

  async startNewGame() {
    await this.deck.createDeck();
    this.playerHand = [];
    this.dealerHand = [];
    this.gameActive = true;
    this.playerTurn = true;

    await this.drawPlayerCards(2);
    await this.drawDealerCards(2);
    this.updateUI();
  }

  async drawPlayerCards(num) {
    try {
      const response = await this.deck.drawCards(num);
      console.log("API response for drawing cards:", response);

      if (response && response.cards && Array.isArray(response.cards)) {
        this.playerHand.push(
          ...response.cards.map(
            (card) =>
              new Card(
                card.code,
                card.suit,
                card.value,
                card.value,
                card.color,
                card.image,
                "",
              ),
          ),
        );
        this.updateScore();
        this.updateUI();
        this.checkPlayerBust();
      } else {
        throw new Error(
          "Invalid response structure: " + JSON.stringify(response),
        );
      }
    } catch (error) {
      console.error("Error drawing player cards:", error);
    }
  }

  async drawDealerCards(num) {
    try {
      const response = await this.deck.drawCards(num);
      console.log("API response for drawing dealer cards:", response);

      if (response && response.cards && Array.isArray(response.cards)) {
        this.dealerHand.push(
          ...response.cards.map(
            (card) =>
              new Card(
                card.code,
                card.suit,
                card.value,
                card.value,
                card.color,
                card.image,
                "",
              ),
          ),
        );
        this.updateDealerScore();
        this.updateUI();
        this.checkDealerBust();
      } else {
        throw new Error(
          "Invalid response structure for dealer cards: " +
            JSON.stringify(response),
        );
      }
    } catch (error) {
      console.error("Error drawing dealer cards:", error);
    }
  }

  updateScore() {
    this.playerScore = this.calculateScore(this.playerHand);
    document.getElementById("player-score").textContent = this.playerScore;
  }

  updateDealerScore() {
    this.dealerScore = this.calculateScore(this.dealerHand);
    document.getElementById("dealer-score").textContent = this.dealerScore;
  }

  async dealerPlay() {
    while (this.calculateScore(this.dealerHand) < 17) {
      await this.drawDealerCards(1);
    }
    this.checkGameOutcome();
  }

  calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      if (card.value === "ACE") {
        score += 11;
        aceCount++;
      } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    });

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  checkPlayerBust() {
    if (this.playerScore > 21) {
      this.endGame("Player busts, Dealer win");
    }
    return this.playerScore < 21;
  }

  checkDealerBust() {
    if (this.dealerScore > 21) {
      this.checkGameOutcome();
    }
    return this.dealerScore <= 21;
  }

  checkGameOutcome() {
    if (this.dealerScore > 21) {
      this.endGame("Dealer busts, Player win");
    } else if (this.playerScore > this.dealerScore) {
      this.endGame("Player win");
    } else if (this.playerScore < this.dealerScore) {
      this.endGame("Player lose");
    } else {
      this.endGame("It's a tie");
    }
  }

  endGame(resultMessage) {
    this.gameActive = false;
    this.playerTurn = false;
    this.displayDealerScore();
    document.getElementById("game-result").textContent = resultMessage;
  }

  updateUI() {
    this.displayPlayerHand();
    this.displayDealerHand();
  }

  displayPlayerHand() {
    const container = document.getElementById("player-hand");
    container.innerHTML = "";
    this.playerHand.forEach((card) => {
      const cardDiv = document.createElement("div");
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = `${card.rank} of ${card.suit}`;
      cardDiv.appendChild(img);
      container.appendChild(cardDiv);
    });
  }

  displayDealerHand() {
    const revealDealerHand = document.getElementById("dealer-hand");
    const backOfCard = `<img
    src="https://deckofcardsapi.com/static/img/back.png"
    alt="Back of Card"
    class="back-card"
  />`;
    revealDealerHand.innerHTML = backOfCard;
    this.dealerHand.forEach((card) => {
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = `${card.rank} of ${card.suit}`;
      img.classList.add("front-card");
      revealDealerHand.appendChild(img);
    });
  }

  displayDealerScore() {
    const revealDealerScore = document.getElementById("dealer-score");
    revealDealerScore.classList.remove("hidden");
    const dealerScoreElement = document.getElementById("dealer-score");
    const revealCard = document.querySelector(".back-card");
    revealDealerScore.innerHTML = "";
    revealCard.style.display = "none";
    dealerScoreElement.classList.remove("hidden");
    dealerScoreElement.textContent = `Dealer Score: ${this.calculateScore(this.dealerHand)}`;
  }
}
