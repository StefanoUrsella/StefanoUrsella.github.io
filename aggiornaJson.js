const serverIDprefix = "http://";
let serverIDip = "192.168.4.53";
const serverIDpostfix = ":3000/data";

let serverId = `${serverIDprefix+serverIDip+serverIDpostfix}`;

const inputIP = document.getElementById("inputIndirizzo");

inputIP.addEventListener("change", (e) => {
    serverIDip = e.target.value;
    serverId = `${serverIDprefix+serverIDip+serverIDpostfix}`;
    localStorage.setItem("indirizzo", serverId);
    localStorage.setItem("placeholderPrecedente", serverIDip);
    //e.target.placeholder = localStorage.getItem("placeholderPrecedente");
    cambioJson();
});

//Array con le Variabii
const arrayId = [];
const arrayPosition = [];
const arrayTemperature = [];
const arrayHumidity = [];
const arrayLuminosity = [];
const arrayTimestamp = [];//AAAA-MM-DD hh:mm:ss

//Array di tutti i "blob di dati"
const arrayTutto = [];

function main(){
    cambioJson();
}

async function cambioJson() {
    if(!localStorage.getItem("indirizzo")){

    }else{
        serverId = localStorage.getItem("indirizzo");
        inputIP.placeholder = localStorage.getItem("placeholderPrecedente");
    }
    const response = await fetch(serverId);
    const jsonData = await response.json();
    
    prendiDati(jsonData);//Aggiornare gli array
    console.log(jsonData);
}

//Prendere i dati dal Json
function prendiDati(jsonData){
    //Tolgo i valori vecchi
    arrayId.length = 0;
    arrayPosition.length = 0;
    arrayTemperature.length = 0;
    arrayHumidity.length = 0;
    arrayLuminosity.length = 0;
    arrayTimestamp.length = 0;
    arrayTutto.length = 0;

    jsonData.forEach(item =>{
        arrayId.push(item.id);
        arrayPosition.push(item.position);
        arrayTemperature.push(item.temperature);
        arrayHumidity.push(item.humidity);
        arrayLuminosity.push(item.luminosity);
        arrayTimestamp.push(item.timestamp);
        arrayTutto.push(item);
    });

    const arrayUtili = ordinaDati(arrayTutto);
    console.log(arrayUtili);
    mostraDati(arrayUtili);         // Mostra gli array nell'HTML
}


//Mettere tutti i dati in "arrayOrdinato[]"
function ordinaDati(arrayTutto){
    const arrayOrdinato = [];//Array con i "gruppDati"
    const arrayPosizioniFatte = [];
    for(let i=0 ; i<arrayTutto.length ; i++){
        for(let j=0; j<=arrayPosizioniFatte.length ; j++){
            if(!arrayPosizioniFatte.includes(arrayTutto[i].position)){
                arrayPosizioniFatte.push(arrayTutto[i].position);
                let gruppoDati = new GruppoDati();
                gruppoDati.position = arrayTutto[i].position;
                arrayOrdinato.push(gruppoDati);
            }
        }
    }

    for(let i=0; i<arrayTutto.length; i++){
        let indiceCorrente = cercaIndicePosizione(arrayOrdinato, arrayTutto[i].position);
        arrayOrdinato[indiceCorrente].timestamp.push(arrayTutto[i].timestamp);
        arrayOrdinato[indiceCorrente].id.push(arrayTutto[i].id);
        arrayOrdinato[indiceCorrente].temperature.push(arrayTutto[i].temperature);
        arrayOrdinato[indiceCorrente].humidity.push(arrayTutto[i].humidity);
        arrayOrdinato[indiceCorrente].luminosity.push(arrayTutto[i].luminosity);
    }

    return arrayOrdinato;
}

//Cercare l'indice di un "gruppoDati" con una posizione specifica
function cercaIndicePosizione(array, posizione){
    for(let i=0; i<array.length; i++){
        if(array[i].position == posizione){
            return i;
        }
    }
    return null;
}


function mostraDati(arrayUtili){
    const contenitore = document.getElementById("contenitore");
    contenitore.innerHTML = "";

    for(let i = 0; i < arrayUtili.length; i++){
        const pulsante = document.createElement("a");
        pulsante.classList.add("pulsantePosizione");
        pulsante.id = `pulsante_${arrayUtili[i].position}`;
        pulsante.href = "schermataPosizione.html";

        //(".at(-1)"-->prende l'Ultimo elemento di un Array) (lo facico perché voglio l'ultimo elemento misurato)
        pulsante.innerHTML = `
            <div class="testoPulsantePosizione">${arrayUtili[i].position}</div>
            <p><br>->Ultima temperatura: ${arrayUtili[i].temperature.at(-1)}</p>
            <p>->Ultima umidità: ${arrayUtili[i].humidity.at(-1)}</p>
            <p>->Ultima luminosità: ${arrayUtili[i].luminosity.at(-1)}</p>
            <p>->Ultimo timestamp: ${arrayUtili[i].timestamp.at(-1)}</p>
        `;

        pulsante.addEventListener("click", (e) => {
            e.preventDefault();//dico al pulsante di non comportarsi come di default (sennò camba pagina prima di fare la roba che deve fare prima)
            localStorage.setItem("datiStanza", JSON.stringify(arrayUtili[i]));//salvo i dati nel "localStorage"
            window.location.href = pulsante.href;//cambio la pagina manualmente dopo che ho fatto ciò che devo fare
        });

        contenitore.appendChild(pulsante);
    }
}

//FUNZIONE MOMENTANEAMENTE INUTILE | ESISTE PER MOTIVI LEGACY
async function aggiungiDati(){
    const nuovoJson = {
            "id": "placeholder",
            "position": "placeholder",
            "temperature": "placeholder",
            "humidity": "placeholder",
            "luminosity": "placeholder",
            "timestamp": "placeholder"
    };

    const response2 = await fetch(serverId, {
        method: "POST",
        body: JSON.stringify(nuovoJson),
    });
}

main();