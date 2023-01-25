function IncarcaContinut() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        incarcTractoare(this);
      }
    };
    xmlhttp.open("GET", "resurse/tractoare.xml", true);
    xmlhttp.send();
  }
  function incarcTractoare(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    let table="<table><tr><th>Marca</th><th>Serie</th><th>Nume</th><th>Capacitate cilindrica</th><th>Gama putere</th><th>Putere nominala</th><th>Rezervor combustibil</th><th>Viteza maxima</th><th>Anvelope fata</th><th>Anvelope spate</th><th>Inaltime</th><th>Latime</th><th>Lungime</th><th>Garda sol</th></tr>";
    var x = xmlDoc.getElementsByTagName("tractor");

    console.log(x);

    for (i = 0; i <x.length; i++) {
      table += "<tr><td>" +
        x[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("serie")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("capacitate_cilindrica")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("gama_putere")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("putere_nominala")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("rezervor_combustibil")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("viteza_maxima")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("anvelope_fata")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("anvelope_spate")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("inaltime")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("latime")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("lungime")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("garda_sol")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
    table+="</table>";
    console.log(table)
    document.getElementById("ceva").innerHTML = table;
  }