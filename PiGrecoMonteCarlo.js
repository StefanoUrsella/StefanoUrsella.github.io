const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

const latoQuadrato = 500;
const offsetX = 1;
const offsetY = 1;

const raggio = latoQuadrato / 2;
const centroX = latoQuadrato / 2 + offsetX;
const centroY = latoQuadrato / 2 + offsetY;

let puntiTotali = 0;
let puntiNelCerchio = 0;
let piGrecoStimato = 0;

inizializza();

//punti da disegnare
let puntiDaDisegnare = 0;

//interazione con HTML
const scrittaSlider = document.getElementById("scrittaSlider");
const scrittaStatistiche = document.getElementById("scrittaStatistiche");

const slider = document.getElementById("slider");
slider.addEventListener("input", (e) => {//"input" perché "change" farebbe quando rilascio-->"input" fa man mano che slido | per pulsanti si usa "click"
    puntiDaDisegnare = Number(e.target.value);
    scrittaSlider.textContent = "punti: " + puntiDaDisegnare;

    ctx.clearRect(0, 0, canvas.width, canvas.height);//calcellare il contenuto del canvas (per rimuovere i punti)

    inizializza();
    esegui();
});

//ogni volta che muovi lo slider
function inizializza(){
    puntiTotali = 0;
    puntiNelCerchio = 0;
    piGrecoStimato = 0;

    //disegnare Cerchio
    ctx.beginPath();
    ctx.arc(centroX, centroY, raggio, 0, 2 * Math.PI);//partenzaX, partenzaY, raggio, angoloPartenza, angoloArrivo
    ctx.lineWidth = 2;
    ctx.stroke();

    //disegnare Rettangolo
    ctx.lineWidth = 2;//va rifefinito dopo ogni "stroke()"
    ctx.strokeRect(offsetX, offsetY, latoQuadrato, latoQuadrato);
}

//funzione che fa il tutto
function esegui() {
    for (let i = 0; i < puntiDaDisegnare; i++) {
        let x = (Math.random() * 2) - 1;//"Math.random()" va da 0 a 1 --> così facendo trovo un numero da -1 a 1
        let y = (Math.random() * 2) - 1;

        puntiTotali++;

        //trasformare le coordinate (-1, 1) in coordinate con dimensioni giuste per il canvas
        let px = centroX + (x * raggio);//moltiplico "numero da 1 a -1" * raggio-->ho numero a caso di grandezza del quadrato-->lo sommo al centro-->ora è centrato
        let py = centroY - (y * raggio);//qui sottraggo perché le "y" sono dall'alto verso il basso sugli schermi

        //verificare se il punto è nel cerchio
        if (x * x + y * y <= 1) {//x e y hanno come valore massimo 1-->si lavora con "r=1" --> se "x^2 + y^2 <= 1"-->uno dei due valore è abbastanza piccolo da far finire il coso nel cerchio, ma "1^2 + 1^2" è 1x e 1y-->è comunque nel rettangolo ma non nel cerchio
            puntiNelCerchio++;
            ctx.fillStyle = "rgba(212, 255, 39, 0.8)";//disegna con giallo ("0.8" è la trasparenza)
        } else {
            ctx.fillStyle = "rgba(255, 0, 0, 0.8)";//disegna con rosso ("0.8" è la trasparenza)
        }

        //punto da 1 pixel
        ctx.fillRect(px, py, 1, 1);
    }

    piGrecoStimato = 4 * (puntiNelCerchio / puntiTotali);
    scrittaStatistiche.textContent = "PI: " + piGrecoStimato;
    console.log(piGrecoStimato);
}

//Prima iterazione
scrittaSlider.textContent = "punti: " + puntiDaDisegnare;
esegui();