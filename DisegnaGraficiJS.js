const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

const inputFunzione = document.getElementById("testoFunzione");
const pulsanteDisegna = document.getElementById("pulsanteDisegna");

let width = canvas.width;
let height = canvas.height;

//(0, 0) è al centro del canvas
let punto0X = width / 2;
let punto0Y = height / 2;

//Numero di pixel che corrisponde a "1" distanza
let scala = 30;

function disegnaTutto() {
    //cancellare il contenuto del canvas
    ctx.clearRect(0, 0, width, height);

    //disegnare gli assi X e Y
    ctx.beginPath();
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 2;
    
    //Asse X
    ctx.moveTo(0, punto0Y);//(-MOLTO, 0)
    ctx.lineTo(width, punto0Y);//(MOLTO, 0)
    
    //Asse Y
    ctx.moveTo(punto0X, 0);//(0, MOLTO)
    ctx.lineTo(punto0X, height);//(0, -MOLTO)
    ctx.stroke();

    let stringaUtente = inputFunzione.value;
    let funzioneCompilata;

    try {
        //usare "math.js" per convertire "stringa"-->funzione
        funzioneCompilata = math.compile(stringaUtente);
    } catch (errore) {
        alert("Funzione non valida");
        return;//fermare il tutto perché c'è un errore
    }

    //disegnare la curva
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    for (let pixelX = 0; pixelX < width; pixelX++) {//parto dal pixel più a sinistra fino a quello più a destra del canvas (il piano è da li capire quanto in alto è il puntino da mettere)
        
        //Convertire la "x" da Pixel-->Matematica
        let mathX = (pixelX - punto0X) / scala;//pixel di distanza dal (0,0)-->diviso la "scala"

        //uso "math.js" per-->"funzioneCompilata" è la funzione | la "x"=mathX | --> x=mathX ; f(x)=funzioneCompilata | --> dammi il valore di f(x) [f(x) == y]
        let mathY = funzioneCompilata.evaluate({ x: mathX });

        //Convertire la "y" da Matematica-->Pixel
        let pixelY = punto0Y - (mathY * scala);//(sottraggo perché con i pixel-->la "y" è storta)

        //Se è il primo pixel in cui "metto la penna"-->fai "moveTo()" | sennò-->"lineTo()"
        if (pixelX == 0) {
            ctx.moveTo(pixelX, pixelY);
        } else {
            ctx.lineTo(pixelX, pixelY);
        }
    }
    
    //Chiudere la linea
    ctx.stroke();
}

//Disegnare quando si clicca "pulsanteDisegna"
pulsanteDisegna.addEventListener("click", disegnaTutto);

//Prima Iterazione
disegnaTutto();