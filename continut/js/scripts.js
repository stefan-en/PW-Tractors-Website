function informationsTime(){
  let elem = document.getElementById("myTime");
  elem.innerHTML = new Date();
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("myLocation").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
}
function browser(){
    document.getElementById("myBrowser").innerHTML = "Browser name is " + navigator.userAgent;
    

}
function SO(){
    document.getElementById("mySO").innerHTML = "Browser name is " + navigator.platform;
}
function afis(){
    console.log("hello");
    setInterval(informationsTime,1000);
    getLocation();
    browser();
    SO();
}
function desen(){
    var x = null;
    var y = null;
    if(x == null){
        x = e.offSetX;
        y = e.offSetY;

    }else{
        //let ctx =..;
        ctx.fillRet(x,x,x,x,);//x1 Math.min(x,e.offsetX)    x3MAth.abs(x-e.offsetX)
        x = y = null;
    }
}
function schimbaContinut(resursa,jsFisier,jsFunctie){
    console.log(resursa);
    console.log(jsFisier);
    console.log(jsFunctie);
    fetch(resursa,{method:'GET'}).then(
        function(response){
            if(response.status == 200){
                response.text().then(function(data){
                    document.getElementById('continut').innerHTML = data
                });
            }
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    );

}
x = -1;
y = -1;
function desenez(event) {
    if (x == -1 && y == -1) {
        x = event.offsetX;
        y = event.offsetY;
    }
    else {
        let c = document.getElementById("canvas");
        let ctx = c.getContext("2d");
        var texts =[];
        ctx.strokeStyle = document.getElementById("favcolor1").value;
        ctx.fillStyle = document.getElementById("favcolor2").value;
        ctx.lineWidth = 10;
        ctx.rect(Math.min(x, event.offsetX), Math.min(y, event.offsetY), Math.abs(x - event.offsetX), Math.abs(y - event.offsetY));
        ctx.fill();
        ctx.stroke();
        x = -1;
        y = -1;
        document.getElementById("clear").addEventListener('click',function(){
            ctx.clearRect(0,0,c.width,c.height); },false);
    }
}
function adaugLinie() {
    var linie = document.getElementById("linie").value;
    var table = document.getElementById("table");
    if (linie < table.rows.length + 1 && linie > 0) {
        var row = table.insertRow(linie);
        for (var i = 1; i <= table.rows[0].cells.length; i++)
            row.insertCell();
        row.style.backgroundColor = document.getElementById("favcolor3").value;
    }
}
function adaugColoana() {
    var coloana = document.getElementById("coloana").value;
    var table = document.getElementById("table");
    if (coloana < table.rows[1].cells.length + 1) {
        for (var i = 0; i < table.rows.length; i++) {
            var cell = table.rows[i].insertCell(coloana);
            cell.style.backgroundColor = document.getElementById("favcolor3").value;
        }
    }
}