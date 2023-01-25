function parsare(){

    let username = document.getElementById('fnameConn').value;
    let password = document.getElementById('pnameConn').value;
    let button = document.getElementById('button');
var xmlhttp = new XMLHttpRequest();
var url = "resurse/utilizatori.json";


//xmlhttp.setRequestHeader("Content-Type","resurse/json")
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr);
    }
    
    for(var cheie of myArr){
        console.log(cheie)
        console.log(username)
        console.log(password)
        if(cheie.utilizator == username && cheie.parola == password){
        button.style.background = "green"
        }
        else{
            button.style.background ="red"
        }
    }
};
xmlhttp.open("GET",url,true);
xmlhttp.send();
}