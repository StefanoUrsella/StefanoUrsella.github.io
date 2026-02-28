class Truppa{

    truppaFazione;
    vitaPrimaUnita;

    constructor(truppaFazione){
        this.truppaFazione = truppaFazione;

        this.hp = 2;
        this.danno = 1;
        this.difesa = 0;
        this.attacco = 0;
        this.attacchi = 1;
        this.morale = 8;
        this.truppeIniziali = 1;
        this.truppe = 1;
        this.moraleRimasto = 8;

        this.tiriAttacco1 = [];
        this.tiriDifesa1 = [];
        this.tiriAttacco2 = [];
        this.tiriDifesa2 = [];

        if(truppaFazione == 1){
            this.inputHP = document.getElementById("inputHP1");
            this.inputDANNO = document.getElementById("inputDANNO1");
            this.inputDIFESA = document.getElementById("inputDIFESA1");
            this.inputATTACCO = document.getElementById("inputATTACCO1");
            this.inputATTACCHI = document.getElementById("inputATTACCHI1");
            this.inputMORALE = document.getElementById("inputMORALE1");
            this.inputTREUPPEINIZIALI = document.getElementById("inputTruppeIniziali1");
            this.inputTRUPPE = document.getElementById("inputTRUPPE1");
            this.displayMORALERIMASTO = document.getElementById("moraleRimasto1");
            this.displayVITARIMASTA = document.getElementById("vitaComplessiva1");
        }else if(truppaFazione == 2){
            this.inputHP = document.getElementById("inputHP2");
            this.inputDANNO = document.getElementById("inputDANNO2");
            this.inputDIFESA = document.getElementById("inputDIFESA2");
            this.inputATTACCO = document.getElementById("inputATTACCO2");
            this.inputATTACCHI = document.getElementById("inputATTACCHI2");
            this.inputMORALE = document.getElementById("inputMORALE2");
            this.inputTREUPPEINIZIALI = document.getElementById("inputTruppeIniziali2");
            this.inputTRUPPE = document.getElementById("inputTRUPPE2");
            this.displayMORALERIMASTO = document.getElementById("moraleRimasto2");
            this.displayVITARIMASTA = document.getElementById("vitaComplessiva2");
        }

        this.inputHP.value = this.hp;
        this.inputDANNO.value = this.danno;
        this.inputDIFESA.value = this.difesa;
        this.inputATTACCO.value = this.attacco;
        this.inputATTACCHI.value = this.attacchi;
        this.inputMORALE.value = this.morale;
        this.inputTREUPPEINIZIALI.value = this.truppeIniziali;
        this.inputTRUPPE.value = this.truppe;
        this.displayMORALERIMASTO.textContent = this.moraleRimasto;

        //Inizializzar l'HP quando si carica la pagina
        this.vitaPrimaUnita = this.hp;

        //Quando l'utente cambia HP, si aggiorna
        this.inputHP.addEventListener("change", (e) => {
            this.hp = Number(e.target.value);
            this.vitaPrimaUnita = this.hp;
            console.log("Nuova vita massima impostata: " + this.vitaPrimaUnita);
        });

        //Aggiornare le variabili dai campi di testo
        this.inputDANNO.addEventListener("change", (e) => this.danno = Number(e.target.value));
        this.inputDIFESA.addEventListener("change", (e) => this.difesa = Number(e.target.value));
        this.inputATTACCO.addEventListener("change", (e) => this.attacco = Number(e.target.value));
        this.inputATTACCHI.addEventListener("change", (e) => this.attacchi = Number(e.target.value));
        this.inputMORALE.addEventListener("change", (e) => this.morale = Number(e.target.value));
        this.inputTREUPPEINIZIALI.addEventListener("change", (e) => this.truppeIniziali = Number(e.target.value));
        this.inputTRUPPE.addEventListener("change", (e) => this.truppe = Number(e.target.value));
    }

    aggiornareMorale(){
        //this.moraleMassimo = Number(this.inputTREUPPEINIZIALI.value) * Number(this.inputMORALE.value);
        this.moraleRimasto = Math.round(this.morale * this.truppe / this.truppeIniziali);
        this.displayMORALERIMASTO.textContent = this.moraleRimasto;
    }

    setHP(hp){
        this.hp = hp;
        this.inputHP.value = hp;
    }

    getHP(){
        return this.hp;
    }

    setDANNO(danno){
        this.danno = danno;
        this.inputDANNO.value = danno;
    }

    getDANNO(){
        return this.danno;
    }

    setDIFESA(difesa){
        this.difesa = difesa;
        this.inputDIFESA.value = difesa;
    }

    getDIFESA(){
        return this.difesa;
    }

    setATTACCO(attacco){
        this.attacco = attacco;
        this.inputATTACCO.value = attacco;
    }

    getATTACCO(){
        return this.attacco
    }

    setATTACCHI(attacchi){
        this.attacchi = attacchi;
        this.inputATTACCHI.value = attacchi;
    }

    getATTACCHI(){
        return this.attacchi
    }

    setMORALE(morale){
        this.morale = morale;
        this.inputMORALE.value = morale;
    }

    getMORALE(){
        return this.morale;
    }

    setTRUPPE(truppe){
        this.truppe = truppe;
        this.inputTRUPPE.value = truppe;
    }

}

class Codice{

    constructor(){
        this.buttonRissa = document.getElementById("buttonRissa");
        this.buttonRissa.addEventListener("click", () => this.onButtonRissaClick());

        this.buttonMorale = document.getElementById("buttonMorale");
        this.buttonMorale.addEventListener("click", () => this.onButtonMoraleClick());

        this.modificatoreMorale1 = document.getElementById("modificatoreMorale1");
        this.modificatoreMorale2 = document.getElementById("modificatoreMorale2");

        this.boxRisultato = document.getElementById("boxRisultato");

        this.vincitoreScontro = 0;

        this.truppa1 = new Truppa(1);
        this.truppa2 = new Truppa(2);
    }

    onButtonRissaClick(){
        console.log("pulsnte cliccato");
        this.stampareInput(this.truppa1);
        this.stampareInput(this.truppa2);
        
        this.truppa1.aggiornareMorale();
        this.truppa2.aggiornareMorale();

        this.modificatoreMorale1.textContent = this.truppa1.moraleRimasto;
        this.modificatoreMorale2.textContent = this.truppa2.moraleRimasto;

        this.modificatoreAttacco1 = document.getElementById("modificatoreAttacco1");
        this.modificatoreDifesa1 = document.getElementById("modificatoreDifesa1");
        this.modificatoreAttacco2 = document.getElementById("modificatoreAttacco2");
        this.modificatoreDifesa2 = document.getElementById("modificatoreDifesa2");

        this.modificatoreAttacco1.textContent = this.truppa1.attacco;
        this.modificatoreDifesa1.textContent = this.truppa2.difesa;
        this.modificatoreAttacco2.textContent = this.truppa2.attacco;
        this.modificatoreDifesa2.textContent = this.truppa1.difesa;

        this.attacco1 = this.truppa1.attacco;
        this.difesa1 = this.truppa1.difesa;
        this.attacco2 = this.truppa2.attacco;
        this.difesa2 = this.truppa2.difesa;
 
        this.tiriAttacco1 = [];
        this.tiriDifesa1 = [];
        this.tiriAttacco2 = [];
        this.tiriDifesa2 = [];

        this.lanciaDadiCombattimento(this.truppa1.truppe*this.truppa1.attacchi, "attacco1");
        this.lanciaDadiCombattimento(this.truppa1.truppe*this.truppa1.attacchi, "difesa1");
        this.lanciaDadiCombattimento(this.truppa2.truppe*this.truppa2.attacchi, "attacco2");
        this.lanciaDadiCombattimento(this.truppa2.truppe*this.truppa2.attacchi, "difesa2");

        console.log(this.tiriAttacco1);
        console.log(this.tiriDifesa1);
        console.log(this.tiriAttacco2);
        console.log(this.tiriDifesa2);


        //aspettare 2.5 secondi prima di calcolare i danni
        setTimeout(() => {
            console.log("--- INIZIO CALCOLO DANNI ---");
            this.danniInflitti1 = this.calcolareDanni(this.tiriAttacco1, this.tiriDifesa1, this.truppa1.danno, this.truppa2);
            this.danniInflitti2 = this.calcolareDanni(this.tiriAttacco2, this.tiriDifesa2, this.truppa2.danno, this.truppa1);
            
            // Aggiorna anche il morale alla fine
            this.truppa1.aggiornareMorale();
            this.truppa2.aggiornareMorale();

            this.modificatoreMorale1.textContent = this.truppa1.moraleRimasto;
            this.modificatoreMorale2.textContent = this.truppa2.moraleRimasto;

            this.modificatoreMorale1.style.visibility = "hidden";
            this.modificatoreMorale2.style.visibility = "hidden";

            if(this.danniInflitti1 > this.danniInflitti2){
                this.vincitoreScontro = 1;

                this.modificatoreMorale1.style.visibility = "hidden";
                this.modificatoreMorale2.style.visibility = "visible";
            }else if(this.danniInflitti2 > this.danniInflitti1){
                this.vincitoreScontro = 2;

                this.modificatoreMorale1.style.visibility = "visible";
                this.modificatoreMorale2.style.visibility = "hidden";
            }else{
                this.vincitoreScontro = 0;

                this.modificatoreMorale1.style.visibility = "hidden";
                this.modificatoreMorale2.style.visibility = "hidden";
            }

            this.scrivereCoseScontro(this.vincitoreScontro, this.danniInflitti1, this.danniInflitti2);
        }, 2500);

    }

    scrivereCoseScontro(vincitoreScontro, danni1, danni2){
        this.testoDaScrivere = "1 ha inflitto: " + danni1 + " danni | 2 ha inflitto: " + danni2 + " danni";
        if(vincitoreScontro == 0){
            this.testoDaScrivere += " | pareggio";
        }else if(vincitoreScontro == 1){
            this.testoDaScrivere += " | vince 1-->2 tira per il morale";
        }else if(vincitoreScontro == 2){
            this.testoDaScrivere += " | vince 2-->1 tira per il morale";
        }

        this.boxRisultato.innerText = this.testoDaScrivere;
    }

    onButtonMoraleClick(){
        this.risultatoMorale = 0;
        this.lanciaDadiMorale();
        //aspettare 2.5 secondi prima di fare la roba (sennò rischia che le variabili non sono ancora aggiornate)
        setTimeout(() => {
            this.valoreMoraleControllare = 0;
            if(this.vincitoreScontro == 1){
                this.valoreMoraleControllare = this.truppa2.moraleRimasto;
                this.scrivereCoseMorale(this.risultatoMorale, this.valoreMoraleControllare, 2);

            }else if(this.vincitoreScontro == 2){
                this.valoreMoraleControllare = this.truppa2.moraleRimasto;
                this.scrivereCoseMorale(this.risultatoMorale, this.valoreMoraleControllare, 1);

            }else if(this.vincitoreScontro == 0){
                this.valoreMoraleControllare = 0;
                this.scrivereCoseMorale(this.risultatoMorale, this.valoreMoraleControllare, 0);

            }
        }, 2500);
    }

    scrivereCoseMorale(moraleTirato, moraleControllare, perdente){
        this.testoDaScrivere;

        if(moraleTirato > moraleControllare && perdente == 1){
            this.testoDaScrivere = "Le truppe di 1 vanno in rotta";
        }else if(moraleTirato > moraleControllare && perdente == 2){
            this.testoDaScrivere = "Le truppe di 2 vanno in rotta";
        }else if(moraleTirato <= moraleControllare && perdente == 1){
            this.testoDaScrivere = "Le truppe di 1 resistono e rimangono a combattere";
        }else if(moraleTirato <= moraleControllare && perdente == 2){
            this.testoDaScrivere = "Le truppe di 2 resistono e rimangono a combattere";
        }else{
            this.testoDaScrivere = "Nessuno mostra segni di cedimento";
        }

        this.boxRisultato.innerText = this.testoDaScrivere;
    }

    calcolareDanni(attacco, difesa, danno, bersaglio){
        let danniInflitti = 0;
        for(let i=0; i<attacco.length; i++){
            if(attacco[i]>difesa[i]){

                if(danno >= bersaglio.vitaPrimaUnita){
                    danniInflitti += bersaglio.vitaPrimaUnita;
                }else{
                    danniInflitti += danno;
                }

                bersaglio.vitaPrimaUnita -= danno;

                if(bersaglio.vitaPrimaUnita <= 0){
                    let truppeRimaste = bersaglio.truppe-1;
                    if( truppeRimaste >= 0){
                        bersaglio.setTRUPPE(truppeRimaste);
                    }
                    bersaglio.vitaPrimaUnita = bersaglio.hp;//sennò vitaPrimaUnita non rimane il valore che aveva prima di morire
                }
            }
        }
        return danniInflitti;
    }

    aggiornareListeDadi(risultatoDado, tipoDadi){
        if(tipoDadi == "attacco1"){
            this.tiriAttacco1.push(risultatoDado+this.attacco1);
            this.tiriAttacco1 = this.ordinareListeBoubleSort(this.tiriAttacco1);

        }else if(tipoDadi == "difesa1"){
            this.tiriDifesa1.push(risultatoDado+this.difesa2);
            this.tiriDifesa1 = this.ordinareListeBoubleSort(this.tiriDifesa1);

        }else if(tipoDadi == "attacco2"){
            this.tiriAttacco2.push(risultatoDado+this.attacco2);
            this.tiriAttacco2 = this.ordinareListeBoubleSort(this.tiriAttacco2);

        }else if(tipoDadi == "difesa2"){
            this.tiriDifesa2.push(risultatoDado+this.difesa1);
            this.tiriDifesa2 = this.ordinareListeBoubleSort(this.tiriDifesa2);

        }
    }

    ordinareListeBoubleSort(tiri){
        for(let i=0; i<tiri.length; i++){
            for(let j=0; j<tiri.length-i-1; j++){
                if(tiri[j]<tiri[j+1]){
                    let valoreTemporaneo = tiri[j+1];
                    tiri[j+1] = tiri[j];
                    tiri[j] = valoreTemporaneo;
                }
            }
        }

        return tiri;
    }

    stampareInput(truppa){
        console.log("HP: " + truppa.inputHP.value + "\nDANNO: " + truppa.inputDANNO.value + "\nDIFESA: " + truppa.inputDIFESA.value + "\nATTACCO: " + truppa.inputATTACCO.value + "\nATTACCHI: " + truppa.inputATTACCHI.value + "\nMORALE: " + truppa.inputMORALE.value);
    }


    //DADI
    lanciaDadiCombattimento(numeroDadi, tipoDadi) {
        let durataAnimazione = 1000;
        //let durataVisibile = 90000;    (non voglio più che i dadi scompaiano)
        
        let contenitoreDadi;

        if(tipoDadi == "attacco1"){
            contenitoreDadi = document.getElementById("contenitoreDadiAttacco1");
        }else if(tipoDadi == "difesa1"){
            contenitoreDadi = document.getElementById("contenitoreDadiDifesa1");
        }else if(tipoDadi == "attacco2"){
            contenitoreDadi = document.getElementById("contenitoreDadiAttacco2");
        }else if(tipoDadi == "difesa2"){
            contenitoreDadi = document.getElementById("contenitoreDadiDifesa2");
        }
        
        const vecchiDadi = contenitoreDadi.querySelectorAll('.dadoAttacco, .dadoDifesa');/*prendi tutti i dadi vecchi*/
        vecchiDadi.forEach(d => d.remove());/*cancella tutti i dadi vecchi*/

        const dadi = [];

        //creazione dadi
        for (let i = 0; i < numeroDadi; i++) {
            const dado = document.createElement("div"); //"dado" è un nuovo elemento "generico" (è un "div")
            if(tipoDadi == "attacco1" || tipoDadi == "attacco2"){
                dado.classList.add("dadoAttacco"); //li dico che classe CSS deve usare il dado
            }else if(tipoDadi == "difesa1" || tipoDadi == "difesa2"){
                dado.classList.add("dadoDifesa"); //li dico che classe CSS deve usare il dado
            }
            
            dado.textContent = "-";
            contenitoreDadi.appendChild(dado);
            dadi.push(dado);//aggiungo i "dado" alla lista di "dadi"
        }

        //animazione dadi
        const intervalli = dadi.map(dado => {//"intervalli" contiene tutti i "setInterval" di ogni dado             //"map" esegue un metodo su tutti gli elementi di un array
            return setInterval(() => {//"setInterval" esegue una funzione ogni TOT tempo
                dado.textContent = Math.floor(Math.random() * 6) + 1;
            }, 50); //"50" è la velocità con cui viene iterato "setInterval"
        });

        //fermare animazioni dopo TOT tempo
        setTimeout(() => {
            intervalli.forEach(interval => clearInterval(interval));// passa ogni "interval" (ID per i dadi) contenuto in "intervalli"-->lo passa a "clearInterval"-->cancella il timer

            // Risultato finale
            dadi.forEach(dado => {
                dado.textContent = Math.floor(Math.random() * 6) + 1;
                this.aggiornareListeDadi(Number(dado.textContent), tipoDadi);
            });

            // 4. Scomparsa dopo Y ms (tolta perché non voglio più che scompaiano)
            /*setTimeout(() => {
                const vecchiDadi = contenitoreDadi.querySelectorAll('.dadoAttacco, .dadoDifesa');/*prendi tutti i dadi vecchi*/
            /*    vecchiDadi.forEach(d => d.remove());/*cancella tutti i dadi vecchi*/
            /*}, durataVisibile); // quando scatta questo tempo-->i si fa il "setTimeout()"-->i dadi vengono cancellati
            */

        }, durataAnimazione);// quando scatta questo tempo-->i si fa il "setTimeout()"-->ferma l'animazione
    }


    lanciaDadiMorale() {
        let durataAnimazione = 1000;
        
        let contenitoreDadi;
        contenitoreDadi = document.getElementById("contenitoreDadiMorale");
        
        const vecchiDadi = contenitoreDadi.querySelectorAll('.dadoMorale');/*prendi tutti i dadi vecchi*/
        vecchiDadi.forEach(d => d.remove());/*cancella tutti i dadi vecchi*/

        const dadi = [];

        //creazione dadi
        const dado = document.createElement("div"); //"dado" è un nuovo elemento "generico" (è un "div")
        dado.classList.add("dadoMorale"); //li dico che classe CSS deve usare il dado
        
        dado.textContent = "-";
        contenitoreDadi.appendChild(dado);
        dadi.push(dado);//aggiungo i "dado" alla lista di "dadi"

        //animazione dadi
        const intervalli = dadi.map(dado => {//"intervalli" contiene tutti i "setInterval" di ogni dado             //"map" esegue un metodo su tutti gli elementi di un array
            return setInterval(() => {//"setInterval" esegue una funzione ogni TOT tempo
                dado.textContent = Math.floor(Math.random() * 10) + 1;
            }, 50); //"50" è la velocità con cui viene iterato "setInterval"
        });

        //fermare animazione dopo TOT tempo
        setTimeout(() => {
            intervalli.forEach(interval => clearInterval(interval));// passa ogni "interval" (ID per i dadi) contenuto in "intervalli"-->lo passa a "clearInterval"-->cancella il timer

            // Risultato finale
            dadi.forEach(dado => {
                dado.textContent = Math.floor(Math.random() * 10) + 1;
                this.risultatoMorale = Number(dado.textContent);
            });

        }, durataAnimazione);// quando scatta questo tempo-->i si fa il "setTimeout()"-->ferma l'animazione
    }

}

//Per creare la classe, sennò non c'è nulla che la crea
const codice = new Codice();
