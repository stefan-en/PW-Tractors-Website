function adaug(){
    let username = document.getElementById('uname').value;
    let password = document.getElementById('pass').value
    let firstname = document.getElementById('fname').value;
    let lastname = document.getElementById('lname').value
    let email = document.getElementById('email').value;
    let age = document.getElementById('varsta').value
    let tara = document.getElementById('Provienienta').value;
    let marca = document.getElementById('tractorId').value;
    let culoare = document.getElementById('color').value
    let liv = document.getElementById('birthday').value;
    let timp = document.getElementById('ora').value;
    let po = document.getElementById('pw').value;
    let urs = document.getElementById('url').value;
    var obj = {}
    obj.utilizator = username;
    obj.parola = password;
    obj.fname = firstname;
    obj.lastname = lastname;
    obj.email = email;
    obj.age = age;
    obj.tara = tara;
    obj.marca = marca;
    obj.color = culoare;
    obj.livrare = liv;
    obj.timp = timp;
    obj.po = po;
    obj.urs = urs;

    let jsonString = JSON.stringify(obj);
    console.log(jsonString);
    
  //make json  
let xhr = new XMLHttpRequest();
xhr.open("POST", "/api/utilizatori");//catre ce fac post??
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");


xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.status);
    console.log(xhr.responseText);
  }};
xhr.send(jsonString);
}
