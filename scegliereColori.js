let rosso;
let verde;
let blu;

let pulsanteCaldo = document.getElementById("pulsanteCaldo");
let pulsanteFreddo = document.getElementById("pulsanteFreddo");
let pulsanteBoh = document.getElementById("pulsanteBoh");

let cosoColore = document.getElementById("cosoColore");

const serverId = "http://localhost:3000/";

async function main(){
    const response = await fetch(`http://localhost:3000/`);
    const jsonData = await response.json();
    const nuovoJson = {
            "id": "aaaaaa",
            "position": "uuuuuuuuuuuuuuuu",
            "temperatre": 21.23424342,
            "humidity": 34.34244,
            "luminosity": 3.34424323,
            "timestamp": "eeeeeeeeeeeeeeeee"
    };

    const response2 = await fetch(`http://localhost:3000/`, {
        method: "POST",
        body: JSON.stringify(nuovoJson),
    });
}

nuovoColore();

pulsanteCaldo.addEventListener("click", (e) => {
    nuovoColore();
});
pulsanteFreddo.addEventListener("click", (e) => {
    nuovoColore();
});
pulsanteBoh.addEventListener("click", (e) => {
    nuovoColore();
});

function nuovoColore(){
    rosso = Math.floor(Math.random()*256);
    verde = Math.floor(Math.random()*256);
    blu = Math.floor(Math.random()*256);
    cambiaCosoColore();
}

function cambiaCosoColore(){
    cosoColore.style.backgroundColor = "rgb("+rosso+", "+verde+", "+blu+")";
}

main();