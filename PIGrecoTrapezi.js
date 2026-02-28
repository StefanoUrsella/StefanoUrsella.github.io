const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

const lunghezzaAssi = 450;

// Impostazioni del grafico
const raggio = 450;
const punto0X = 10;
const punto0Y = 500;

//Interazione con HTML
const slider = document.getElementById("slider");
const scrittaSlider = document.getElementById("scrittaSlider");
const scrittaStatistiche = document.getElementById("scrittaStatistiche");

let numeroTrapezi = Number(slider.value);

slider.addEventListener("input", (e) => {
    numeroTrapezi = Number(e.target.value);
    scrittaSlider.textContent = "Trapezi: " + numeroTrapezi;
    esegui();
});

//calcola una delle due altezze di un trapezio
function trovaAltezza(x) {
    return Math.sqrt(1 - (x * x));//teorema di Pitagora, "\sqrt(raggio^2 - x^2)" ("r = 1")-->mi da il cateto dell'altezza
}

function esegui() {
    ctx.clearRect(0, 0, width, height);

    //Disegnare gli assi cartesiani
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(punto0X, 35);//impostarsi verticalmente sopra al punto (0,0)
    ctx.lineTo(punto0X, punto0Y);//scendere per creare Asse Y
    ctx.lineTo(lunghezzaAssi, punto0Y);//andare orizontalmente per creare Asse X
    ctx.stroke();

    //Disegnare cerchio "perfetto" in rosso (così lo posso distinguere)
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.arc(punto0X, punto0Y, raggio, 0, 1.5 * Math.PI, true);//partenzaX, partenzaY, raggio, angoloPartenza, angoloArrivo, sensoDiRotazione(antiorario)
    ctx.stroke();

    // 4. CALCOLO E DISEGNO DEI TRAPEZI
    let lunghezzaRaggio = 1;
    let baseTrapezio = lunghezzaRaggio / numeroTrapezi;//"baseTrapezio" == "h" | larghezza della base di ogni trapezio | -->in realtà è la altezza (i trapezi sono storti)
    let sommaAree = 0;

    for (let i = 0; i < numeroTrapezi; i++) {
        let x1 = i * baseTrapezio;//"inizio" della base del trapezio
        let x2 = x1 + baseTrapezio;//"fine" della base del trapezio

        let y1 = trovaAltezza(x1);//altezza del "primo punto" del trapezio-->in realtà è "baseMaggiore" (b1)
        let y2 = trovaAltezza(x2);//altezza del "secondo punto" del trapezio-->in realtà è "baseMinore" (b2)

        //areaTrapezio = (baseMaggiore + baseMinore) * altezza / 2
        let areaTrapezio = (y1 + y2) * baseTrapezio / 2;
        sommaAree += areaTrapezio;//"+=" perché è un "for()"-->questa è la area di un singolo trapezio

        //convertire le coordinate in pixel per disegnarli
        let px1 = punto0X + (x1 * raggio);
        let px2 = punto0X + (x2 * raggio);
        let py1 = punto0Y - (y1 * raggio);//sottraggo perché le "y" sono storte
        let py2 = punto0Y - (y2 * raggio);//sottraggo perché le "y" sono storte

        //Disegnare il trapezio (questo è un "for()")
        ctx.beginPath();
        ctx.moveTo(px1, punto0Y);//basso sinistra
        ctx.lineTo(px2, punto0Y);//basso destra
        ctx.lineTo(px2, py2);//alto destra
        ctx.lineTo(px1, py1);//sinistra su
        ctx.closePath();//chiude il trapezio-->linea Basso Sinistra

        ctx.fillStyle = "rgba(52, 219, 57, 0.5)";//stile per riempire il trapezio
        ctx.fill();//riempire il trapezio
        ctx.strokeStyle = "green";
        ctx.lineWidth = 1;
        ctx.stroke();//disegnare il contorno del trapezio
    }

    let piGrecoStimato = sommaAree * 4;
    scrittaStatistiche.textContent = "PI: " + piGrecoStimato;
}

//Prima iterazione
scrittaSlider.textContent = "Trapezi: " + numeroTrapezi;
esegui();