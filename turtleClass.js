class turtleClass{
    canvas
    ctx
    height
    width

    xCorrente = 0;
    yCorrente = 0;
    angoloCorrente = 0;

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = canvas.height;
        this.width = canvas.width;
    }

    penDown(x, y, angoloPartenza){
        this.xCorrente = x;
        this.yCorrente = y;
        this.angoloCorrente = angoloPartenza;
        this.ctx.beginPath();
        this.ctx.moveTo(this.xCorrente, this.yCorrente);
    }

    penUp(){
        this.ctx.stroke();
    }

    ruotare(angolo){
        let numeroDaSottrarre = 0;
        if(this.angoloCorrente + angolo >= 360){
            numeroDaSottrarre = (Math.floor(this.angoloCorrente+angolo / 360))*360;
        }
        this.angoloCorrente += angolo - numeroDaSottrarre;
    }

    avanti(lunghezza){
        this.xCorrente += lunghezza*Math.cos((this.angoloCorrente * Math.PI / 180));
        this.yCorrente += lunghezza*Math.sin(this.angoloCorrente * Math.PI / 180);
        this.ctx.lineTo(this.xCorrente, this.yCorrente);
    }
}