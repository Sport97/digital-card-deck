import { Deck } from './Deck.mjs';
import { Card } from './Card.mjs';

export class Game {
  constructor() {
    this.deck = new Deck();
    this.playerHand = [];
  }

  async startNewGame() {
    await this.deck.createDeck();
    this.playerHand = [];
  }

  async drawPlayerCards(num) {
    const cards = await this.deck.drawCards(num);
    this.playerHand.push(...cards.map(card => new Card(card.code, card.suit, card.value, card.value, card.color, card.image, '')));
    return this.playerHand;
  }
}
