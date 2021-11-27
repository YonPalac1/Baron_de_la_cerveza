let password = document.getElementById('inputPass');
let password1 = document.getElementById('pass1');
let password2 = document.getElementById('pass2');

let viewPassword = document.getElementById('viewPasswordAdmin');
let viewNewPass = document.getElementById('viewNewPass');
let click = false;

viewPassword.addEventListener('click', (e)=>{
  if(!click){
    password.type = 'text'
    viewPassword.innerHTML = 'Ocultar contraseña'
    click = true
  }else if(click){
    password.type = 'password'
    viewPassword.innerHTML = 'Mostrar contraseña'
    click = false
  }
})
viewNewPass.addEventListener('click', (e)=>{
  if(!click){
    password1.type = 'text'
    password2.type = 'text'
    viewNewPass.innerHTML = 'Ocultar contraseña'
    click = true
  }else if(click){
    password1.type = 'password'
    password2.type = 'password'
    viewNewPass.innerHTML = 'Mostrar contraseña'
    click = false
  }
})