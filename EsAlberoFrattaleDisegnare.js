canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");

let height = canvas.height;
let width = canvas.width;

let turtle = {
    xCorrente : 0,
    yCorrente : 0,
    angoloCorrente : 0,
    penDown(x, y, angoloPartenza){
        this.xCorrente = x;
        this.yCorrente = y;
        this.angoloCorrente = angoloPartenza;
        this.ctx.beginPath();
        this.ctx.moveTo(this.xCorrente, this.yCorrente);
    },
    penUp(){
        this.ctx.stroke();
    },
    ruotare(angolo){
        let numeroDaSottrarre = 0;
        if(this.angoloCorrente + angolo >= 360){
            numeroDaSottrarre = (Math.floor(this.angoloCorrente+angolo / 360))*360;
        }
        this.angoloCorrente += angolo - numeroDaSottrarre;
    },
    avanti(lunghezza){
        this.xCorrente += lunghezza*Math.cos((this.angoloCorrente * Math.PI / 180));
        this.yCorrente += lunghezza*Math.sin(this.angoloCorrente * Math.PI / 180);
        this.ctx.lineTo(this.xCorrente, this.yCorrente);
    },
}
turtle.ctx = ctx;

function ricorsivoCreaAlbero(lunghezza, numeroIterazioni){
    if(numeroIterazioni == 0){
        //vado avanti, poi vado indietro così che poi posso girarmi per fare il ramo dell'altra direzione
        turtle.avanti(lunghezza);
        turtle.avanti(-lunghezza);
    }else{
        lunghezza = lunghezza/1.5;
        numeroIterazioni -= 1;

        //faccio tronco, ruoto a sinistra, chiamo ricorsivamente-->faccio tutti i rami a sinistra
        turtle.avanti(lunghezza);
        turtle.ruotare(-30);
        ricorsivoCreaAlbero(lunghezza, numeroIterazioni);
        //giro per tornare centrale
        turtle.ruotare(30);

        //giro per andare a sinistra-->continuo a rifare ma per destra
        turtle.ruotare(30);
        ricorsivoCreaAlbero(lunghezza, numeroIterazioni);
        //resetto con rotazione centrale-->arretro così da non essere "in punta"
        turtle.ruotare(-30);
        turtle.avanti(-lunghezza);
    }
}

let numero = 0;

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
    turtle.penDown(250, 450, -90);

    let lunghezzaLinea = 200;

    ricorsivoCreaAlbero(lunghezzaLinea, numero);

    turtle.penUp();
}

esegui();