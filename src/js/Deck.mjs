import { ExternalServices } from "./ExternalServices.mjs";

export class Deck {
  constructor() {
    this.deckId = null;
    this.cards = [];
    this.remaining = 0;
  }

  async createDeck() {
    const deckData = await ExternalServices.fetchDeck();
    this.deckId = deckData.deck_id;
    this.remaining = deckData.remaining;
  }

  async shuffleDeck() {
    await ExternalServices.shuffleDeck(this.deckId);
  }

  async drawCards(num) {
    if (this.remaining === 0) {
      throw new Error("No cards left to draw");
    }

    const data = await ExternalServices.drawCards(this.deckId, num);
    this.remaining -= num;

    return { data, cards: data.cards };
  }
}
