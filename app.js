let deck = [];
let usedCards = [];

async function loadDeck() {
    try {
        const response = await fetch("deck.json");
        deck = await response.json();
        deck = deck.cards;
    } catch (error) {
        console.error("Fout bij laden van deck:", error);
    }
}

// Trek een willekeurige kaart die nog niet gebruikt is
function getRandomCard() {
    if (usedCards.length === deck.length) {
        usedCards = []; // reset als alles op is
    }

    let card;
    do {
        card = deck[Math.floor(Math.random() * deck.length)];
    } while (usedCards.includes(card.id));

    usedCards.push(card.id);
    return card;
}

// Toon de vraag en opties
function displayCard(card) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
        <h2>${card.question}</h2>
        <div id="options"></div>
    `;

    const optionsDiv = document.getElementById("options");

    for (let key of Object.keys(card.options)) {
        const btn = document.createElement("button");
        btn.textContent = `${key}: ${card.options[key]}`;
        btn.className = "option-button";
        btn.onclick = () => checkAnswer(card, key);
        optionsDiv.appendChild(btn);
    }
}

// Check het antwoord
function checkAnswer(card, chosen) {
    const cardContainer = document.getElementById("card-container");

    if (chosen === card.correct) {
        cardContainer.innerHTML += `<p style="color: green; font-weight: bold;">Goed!</p>`;
    } else {
        cardContainer.innerHTML += `
            <p style="color: red; font-weight: bold;">Fout.</p>
            <p>Het juiste antwoord is: <strong>${card.correct}</strong> — ${card.options[card.correct]}</p>
        `;
    }

    // Voeg een knop toe voor nieuwe kaart
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Trek volgende kaart";
    nextBtn.onclick = drawCard;
    nextBtn.style.marginTop = "15px";
    cardContainer.appendChild(nextBtn);
}

// Trek kaart functie
function drawCard() {
    const card = getRandomCard();
    displayCard(card);
}

// Initialiseer
document.addEventListener("DOMContentLoaded", async () => {
    await loadDeck();
    document.getElementById("draw-card").onclick = drawCard;
});
