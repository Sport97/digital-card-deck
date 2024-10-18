import { Deck } from "./Deck.mjs";
import { ExternalServices } from "./ExternalServices.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await ExternalServices.fetchGameRules();
    displayGameRules(response.gameRules);
  } catch (error) {
    console.error("Error fetching game rules:", error);
  }
});

function displayGameRules(rules) {
  const rulesContainer = document.getElementById("rules-container");

  rulesContainer.innerHTML = "";

  Object.keys(rules).forEach((game) => {
    const gameRule = rules[game];

    const gameSection = document.createElement("section");
    gameSection.classList.add("game-rule");

    const name = document.createElement("h2");
    name.innerHTML = `<strong></strong> ${gameRule.name}`;

    const description = document.createElement("p");
    description.innerHTML = `<strong>Description:</strong> ${gameRule.description}`;

    const objective = document.createElement("p");
    objective.innerHTML = `<strong>Objective:</strong> ${gameRule.objective}`;

    const winningConditions = document.createElement("p");
    winningConditions.innerHTML = `<strong>Winning Conditions:</strong> ${gameRule.winningConditions}`;

    gameSection.appendChild(name);
    gameSection.appendChild(description);
    gameSection.appendChild(objective);
    gameSection.appendChild(winningConditions);

    rulesContainer.appendChild(gameSection);
  });
}
