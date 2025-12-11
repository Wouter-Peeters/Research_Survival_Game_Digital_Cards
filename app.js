let cards = [];

async function loadDeck() {
    const response = await fetch("deck.json"); // <- Je FAIR dataset
    const data = await response.json();
    cards = data.cards;
}

function drawCard() {
    if (cards.length === 0) return;
    
    const index = Math.floor(Math.random() * cards.length);
    const card = cards[index];

    document.getElementById("card").innerHTML = `
        <h2>Vraag ${card.id}</h2>
        <p>${card.question}</p>
        <button onclick="showAnswer(${card.id})">Toon antwoord</button>
        <div id="answer-${card.id}"></div>
    `;
}

function showAnswer(id) {
    const card = cards.find(c => c.id === id);
    document.getElementById(`answer-${id}`).innerHTML = `
        <p><strong>Antwoord:</strong> ${card.correct}</p>
    `;
}

loadDeck();
