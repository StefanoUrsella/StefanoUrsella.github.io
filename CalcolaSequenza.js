canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");

let height = canvas.height;
let width = canvas.width;

//valore0 = "01";
//valore1 = "10";

let iterazioni = 0;
let lunghezza = 50;

let listaValori = [0];

tartaruga = new turtleClass(canvas);
console.log(listaValori);

//interazione con HTML
const scrittaSlider = document.getElementById("scrittaSlider");

const slider = document.getElementById("slider");
slider.addEventListener("input", (e) => {//"input" perché "change" farebbe quando rilascio-->"input" fa man mano che slido | per pulsanti si usa "click"
    iterazioni = Number(e.target.value);
    scrittaSlider.textContent = "iterazioni: " + iterazioni;

    ctx.clearRect(0, 0, canvas.width, canvas.height);//calcellare il contenuto del canvas (per rimuovere i punti)

    inizializzare();
    disegnare();
});

//calcolare l'array
function inizializzare(){
    listaValori = [0];//resettare l'array

    for(i=0; i<iterazioni; i++){
        for(j=0; j<=listaValori.length; j++){
            if(listaValori[j] == 1){
                listaValori.splice(j+1, 0, 0);//[j+1 --> da dove partitre] [0 --> quante cose eliminare] [0 --> cosa inserire dopo]
                j++;
            }else if(listaValori[j] == 0){
                listaValori.splice(j+1, 0, 1);
                j++;
            }
        }
    }
}

function disegnare(){
    tartaruga.penDown(400, 400, 0);
    for(i=0; i<listaValori.length; i++){
        if(listaValori[i] == 0){
            tartaruga.avanti(lunghezza);
        }else if(listaValori[i]){
            tartaruga.ruotare(60);
        }
    }
    tartaruga.penUp();
}

inizializzare();
disegnare();
