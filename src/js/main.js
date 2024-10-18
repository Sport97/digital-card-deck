import { Deck } from "./Deck.mjs";

const ui = {
  updateDeckState(deck) {
    document.getElementById("total-cards").textContent =
      `Cards Remaining: ${deck.remaining}`;
    document.getElementById("shuffle-button").disabled =
      deck.remaining === 52 ? false : true;
    document.querySelectorAll(".draw-button").forEach((button) => {
      button.disabled = deck.remaining > 0 ? false : true;
    });
    document.getElementById("cards-number-input").disabled =
      deck.remaining > 0 ? false : true;
  },

  displayDrawnCards(cards) {
    const container = document.getElementById("drawn-cards-container");
    container.innerHTML = "";
    cards.forEach((card) => {
      const img = document.createElement("img");
      img.src = card.image;
      container.appendChild(img);
    });
  },
};

let deck;

const disablePresetButtons = () => {
  document.querySelectorAll(".draw-button").forEach((button) => {
    button.disabled = true;
  });
};

document.getElementById("create-deck-button").addEventListener("click", () => {
  deck = new Deck();
  deck.createDeck().then(() => {
    ui.updateDeckState(deck);
    document.querySelectorAll(".draw-button").forEach((button) => {
      button.disabled = false;
    });
  });
});

document.getElementById("shuffle-button").addEventListener("click", () => {
  deck.shuffleDeck();
  ui.updateDeckState(deck);
});

document.querySelectorAll(".draw-button").forEach((button) => {
  button.addEventListener("click", () => {
    const numCards = button.getAttribute("data-count");
    deck.drawCards(numCards).then((cards) => {
      ui.displayDrawnCards(cards);
      ui.updateDeckState(deck);
    });
  });
});

disablePresetButtons();
