export class ExternalServices {
    static async fetchDeck() {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      if (!response.ok) {
        throw new Error("Failed to fetch a new deck");
      }
      return response.json();
    }
  
    static async drawCards(deckId, count) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
      if (!response.ok) {
        throw new Error("Failed to draw cards");
      }
      return response.json();
    }

    static async fetchGameRules() {
      try {
          const response = await fetch("../json/gameRules.json");
  
          if (response.ok) {
              try {
                  const data = await response.json();

                  return data;
              } catch (jsonError) {
                  console.error("Error parsing JSON:", jsonError);
              }
          } else {
              throw new Error("Network response was not ok");
          }
      } catch (error) {
          console.error("Error fetching game rules:", error);
      }
  }
}
  