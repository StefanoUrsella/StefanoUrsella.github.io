canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");

let lunghezza = 300;
tartaruga = new turtleClass(canvas);
let numero = 0;

function ricorsivoCreaTringoli(lunghezza, numeroIterazioni){
    if(numeroIterazioni == 0){
        tartaruga.avanti(lunghezza);
    }else{
        lunghezza = lunghezza/3;
        numeroIterazioni -= 1;

        ricorsivoCreaTringoli(lunghezza, numeroIterazioni)

        tartaruga.ruotare(-60);
        ricorsivoCreaTringoli(lunghezza, numeroIterazioni);

        tartaruga.ruotare(120);
        ricorsivoCreaTringoli(lunghezza, numeroIterazioni);

        tartaruga.ruotare(-60);
        ricorsivoCreaTringoli(lunghezza, numeroIterazioni);
        //fa un--> "_/\_" --> è giusto perché lo metto dentro al "for(i<3)"-->crea un "_/\_" per lato, se "iterazioni=0"-->fa solo la linea dritta-->è un triangolo-->è giusto
    }

}


//interazione con HTML
const scrittaSlider = document.getElementById("scrittaSlider");

const slider = document.getElementById("slider");
slider.addEventListener("input", (e) => {//"input" perché "change" farebbe quando rilascio-->"input" fa man mano che slido | per pulsanti si usa "click"
    numero = Number(e.target.value);
    scrittaSlider.textContent = "iterazioni: " + numero;

    ctx.clearRect(0, 0, canvas.width, canvas.height);//calcellare il contenuto del canvas (per rimuovere i punti)

    esegui();
});

//funzione che fa le cose
function esegui(){
    tartaruga.penDown(100, 150, 0);
    for(i=0; i<3; i++){
        ricorsivoCreaTringoli(lunghezza, numero);
        tartaruga.ruotare(120);
    }
    tartaruga.penUp();
}

esegui();


