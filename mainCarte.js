const deckId = "3sly2791t1w8";

async function main() {
    let result = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    console.log("carta pescata");

    let jsonData = await result.json();
    let cardLink = jsonData.cards[0].images.svg;
    document.querySelector("#cardImage").src = cardLink;

    let carteRimaste = jsonData.remaining;
    console.log("carte rimaste: " + carteRimaste);
    scrittaStatistiche.textContent = "Carte rimaste: " + carteRimaste;

    if(carteRimaste <= 0){
        result = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        console.log("rimescolato mazzo");
    }

}

//interazione con HTML
const pulsante = document.getElementById("pulsante");
const scrittaStatistiche = document.getElementById("scrittaStatistiche");

pulsante.addEventListener("click", (e) => {
    this.main();
});
