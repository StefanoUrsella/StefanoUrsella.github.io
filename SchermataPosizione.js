const tabella = document.getElementById("tabella");

function caricaDatiStanza() {
    const datiSalvati = localStorage.getItem("datiStanza");//Prendo i dati della stanza che ho salvato nel "localStorage"
    //Non ho dati nel "localStorage"-->torna alla pagina precedente
    if (!datiSalvati) {
        window.location.href = "indexStazione.html"; 
        return;
    }

    const datiStanza = JSON.parse(datiSalvati);//"JSON.parse"-->trasforma un testo in un effettvo oggetto (opposto di "JSON.stringify")

    aggiornaTabella(datiStanza);
}

function aggiornaTabella(datiStanza){
    const titoloPagina = document.getElementById("titoloPagina");
    titoloPagina.innerText = datiStanza.position;
    const corpoTabella = document.getElementById("corpoTabella");
    corpoTabella.innerHTML = "";//Svuoto l'HTML (tolgo le robe vecchie) per pettere le robe nuove

    const numeroRighe = datiStanza.id.length;//lunghezza di un array a caso
    for(let i=0; i<numeroRighe; i++){
        const nuovaRiga = document.createElement("tr");//creo una nuova riga

        //metto i dati nella nuovaRiga
        nuovaRiga.innerHTML = `
            <td>${datiStanza.id[i]}</div>
            <td>${datiStanza.temperature[i]}</p>
            <td>${datiStanza.humidity[i]}</p>
            <td>${datiStanza.luminosity[i]}</p>
            <td>${datiStanza.timestamp[i]}</p>
        `;

        corpoTabella.appendChild(nuovaRiga);
    }


    //---GRAFICO---

    //Prendere il "Canvas" del HTML
    const ctx = document.getElementById('Canvas');

    //Creare Grafico
    new Chart(ctx, {
        type: 'line',//Dire che voglio fare un grafico a "linee"
        data: {
            //Come asse "X"-->dico di usare i-->"timestamp"
            labels: datiStanza.timestamp, 
            
            //Definire le Linee che voglio disegnare:
            datasets: [
                {
                    label: 'Temperatura (°C)',//Nome della linea
                    data: datiStanza.temperature,//Dati che deve usare
                    borderColor: 'rgb(255, 99, 132)',//Colore della linea
                    tension: 0.3//Curvatura della retta ([0]=zig-zag | [0.3]=un po' arrotondato)
                },
                {
                    label: 'Umidità (%)',
                    data: datiStanza.humidity,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.3
                },
                {
                    label: 'Luminosità',
                    data: datiStanza.luminosity,
                    borderColor: 'rgb(255, 205, 86)',
                    tension: 0.3
                }
            ]
        },
        options: {//Opzioni (tipo impostazioni che ci metto)
            responsive: true,//Si adatta alla grandezza del "Canvas"
        }
    });
}

caricaDatiStanza();